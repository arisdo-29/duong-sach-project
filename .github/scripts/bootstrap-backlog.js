// Tạo nhãn + milestone + issue từ .github/backlog.json.
// Chạy qua workflow "Bootstrap backlog" (actions/github-script). Chạy lại nhiều lần vẫn an toàn:
// issue nào đã có tiêu đề bắt đầu bằng [ID] thì bỏ qua.
const fs = require('fs');
const path = require('path');

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

module.exports = async ({ github, context, core }) => {
  const includeStretch = String(process.env.INCLUDE_STRETCH) === 'true';
  const dryRun = String(process.env.DRY_RUN) === 'true';
  const root = process.env.GITHUB_WORKSPACE || process.cwd();
  const backlog = JSON.parse(fs.readFileSync(path.join(root, '.github', 'backlog.json'), 'utf8'));
  const repo = context.repo;
  const log = (m) => core.info(m);

  // ---------- 1. Nhãn ----------
  for (const label of backlog.labels) {
    if (dryRun) { log(`[dry-run] nhãn: ${label.name}`); continue; }
    try {
      await github.rest.issues.getLabel({ ...repo, name: label.name });
      await github.rest.issues.updateLabel({ ...repo, name: label.name, color: label.color, description: label.description });
      log(`= nhãn đã có, cập nhật: ${label.name}`);
    } catch (e) {
      if (e.status !== 404) throw e;
      await github.rest.issues.createLabel({ ...repo, ...label });
      log(`+ tạo nhãn: ${label.name}`);
    }
  }

  // ---------- 2. Milestone ----------
  let milestoneNumber;
  const milestones = await github.paginate(github.rest.issues.listMilestones, { ...repo, state: 'all', per_page: 100 });
  const found = milestones.find((m) => m.title === backlog.milestone.title);
  if (found) {
    milestoneNumber = found.number;
    log(`= milestone đã có: #${found.number}`);
  } else if (!dryRun) {
    const { data } = await github.rest.issues.createMilestone({ ...repo, ...backlog.milestone });
    milestoneNumber = data.number;
    log(`+ tạo milestone #${data.number}`);
  }

  // ---------- 3. Issue đã tồn tại ----------
  const existing = await github.paginate(github.rest.issues.listForRepo, { ...repo, state: 'all', per_page: 100 });
  const byId = new Map();
  for (const issue of existing) {
    if (issue.pull_request) continue;
    const m = issue.title.match(/^\[([A-Z0-9]+-\d+)\]/);
    if (m) byId.set(m[1], issue.number);
  }

  // ---------- 4. Tạo issue ----------
  const team = backlog.team || {};
  const roles = backlog.roles || {};
  const created = [];
  const summaryRows = [];

  const assigneesFor = (owner) => {
    if (!owner) return [];
    const keys = owner === 'ALL' ? ['A', 'B', 'C', 'D'] : [owner];
    return keys.map((k) => (team[k] || '').trim()).filter(Boolean);
  };

  for (const item of backlog.items) {
    if (item.stretch && !includeStretch) { log(`- bỏ qua (stretch): ${item.id}`); continue; }
    if (byId.has(item.id)) {
      log(`= đã có: [${item.id}] → #${byId.get(item.id)}`);
      summaryRows.push([item.id, item.priority, `#${byId.get(item.id)} (đã có)`]);
      continue;
    }

    const ownerText = item.owner === 'ALL' ? 'Cả nhóm' : (item.owner ? `${item.owner} – ${roles[item.owner] || ''}` : 'Chưa phân công');
    const header = [
      `| Mã | Ưu tiên | Phụ trách | Ước lượng |`,
      `|---|---|---|---|`,
      `| \`${item.id}\` | **${item.priority}** | ${ownerText} | ${item.estimate || '-'} |`,
      '',
    ].join('\n');
    const body = `${header}\n${item.body}`;
    const labels = [...new Set([...(item.labels || []), `priority: ${item.priority}`, 'status: todo'])];
    const assignees = assigneesFor(item.owner);
    const title = `[${item.id}] ${item.title}`;

    if (dryRun) {
      log(`[dry-run] tạo: ${title} | nhãn: ${labels.join(', ')} | giao: ${assignees.join(', ') || '-'}`);
      continue;
    }

    const payload = { ...repo, title, body, labels, milestone: milestoneNumber };
    let data;
    try {
      ({ data } = await github.rest.issues.create({ ...payload, assignees }));
    } catch (e) {
      // Username sai hoặc chưa là collaborator → tạo không gán người, không làm hỏng cả lượt chạy.
      if (assignees.length && (e.status === 422 || e.status === 403)) {
        core.warning(`Không gán được ${assignees.join(', ')} cho ${item.id} (${e.message}). Tạo không gán người.`);
        ({ data } = await github.rest.issues.create(payload));
      } else {
        throw e;
      }
    }
    byId.set(item.id, data.number);
    created.push({ item, number: data.number, body });
    summaryRows.push([item.id, item.priority, `#${data.number}`]);
    log(`+ tạo #${data.number}: ${title}`);
    await sleep(1200); // tránh secondary rate limit khi tạo nhiều issue liên tiếp
  }

  // ---------- 5. Gắn liên kết phụ thuộc (#số issue) ----------
  for (const { item, number, body } of created) {
    const deps = (item.depends_on || []).filter((d) => byId.has(d));
    if (!deps.length) continue;
    const depLine = `\n\n**Phụ thuộc:** ${deps.map((d) => `#${byId.get(d)} (${d})`).join(', ')} — làm sau khi các issue này đã merge.`;
    await github.rest.issues.update({ ...repo, issue_number: number, body: body + depLine });
    await sleep(500);
  }

  await core.summary
    .addHeading('Backlog Đường Sách – kết quả')
    .addTable([[{ data: 'Mã', header: true }, { data: 'Ưu tiên', header: true }, { data: 'Issue', header: true }], ...summaryRows])
    .addRaw(dryRun ? '\n(dry-run: không tạo gì)\n' : `\nĐã tạo mới ${created.length} issue.\n`)
    .write();
};
