// Tạo nhãn + milestone + issue từ .github/backlog.json, và (tùy chọn) đóng issue đợt cũ bị thay thế.
// Chạy qua workflow "Bootstrap backlog" (actions/github-script). Chạy lại nhiều lần vẫn an toàn:
//   - Issue đã có cùng mã [ID] TRONG milestone hiện tại → bỏ qua (không tạo trùng).
//   - Issue cùng mã nhưng thuộc milestone khác (đợt cũ) KHÔNG chặn việc tạo mới,
//     vì đợt 22/09 dùng lại các mã FR-01…FR-14.
//   - CLOSE_LEGACY=true: với mỗi item có "replaces", đóng issue đợt cũ còn mở mang mã đó
//     (ngoài milestone hiện tại), để lại comment trỏ sang issue mới. Chỉ đóng khi issue mới
//     thật sự tồn tại (item stretch không được tạo thì issue cũ được giữ nguyên).
const fs = require('fs');
const path = require('path');

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const ID_RE = /^\[([A-Z0-9]+-\d+)\]/;

module.exports = async ({ github, context, core }) => {
  const includeStretch = String(process.env.INCLUDE_STRETCH) === 'true';
  const closeLegacy = String(process.env.CLOSE_LEGACY) === 'true';
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
  } else {
    log(`[dry-run] tạo milestone: ${backlog.milestone.title}`);
  }

  // ---------- 3. Issue đã tồn tại: tách đợt hiện tại / đợt cũ ----------
  const existing = await github.paginate(github.rest.issues.listForRepo, { ...repo, state: 'all', per_page: 100 });
  const current = new Map(); // mã → số issue trong milestone hiện tại
  const legacyOpen = new Map(); // mã → [số issue đang mở ngoài milestone hiện tại]
  for (const issue of existing) {
    if (issue.pull_request) continue;
    const m = issue.title.match(ID_RE);
    if (!m) continue;
    const inCurrent = milestoneNumber && issue.milestone && issue.milestone.number === milestoneNumber;
    if (inCurrent) current.set(m[1], issue.number);
    else if (issue.state === 'open') {
      if (!legacyOpen.has(m[1])) legacyOpen.set(m[1], []);
      legacyOpen.get(m[1]).push(issue.number);
    }
  }

  // ---------- 4. Tạo issue ----------
  const team = backlog.team || {};
  const roles = backlog.roles || {};
  const created = [];
  const summaryRows = [];
  const planned = new Set(); // mã sẽ được tạo trong lượt dry-run

  const assigneesFor = (owner) => {
    if (!owner) return [];
    const keys = owner === 'ALL' ? ['A', 'B', 'C', 'D'] : [owner];
    return keys.map((k) => (team[k] || '').trim()).filter(Boolean);
  };

  for (const item of backlog.items) {
    if (item.stretch && !includeStretch) {
      log(`- bỏ qua (stretch): ${item.id}`);
      summaryRows.push([item.id, item.priority, '(stretch – chưa tạo)']);
      continue;
    }
    if (current.has(item.id)) {
      log(`= đã có trong milestone: [${item.id}] → #${current.get(item.id)}`);
      summaryRows.push([item.id, item.priority, `#${current.get(item.id)} (đã có)`]);
      continue;
    }

    const ownerText = item.owner === 'ALL' ? 'Cả nhóm' : (item.owner ? `${item.owner} – ${roles[item.owner] || ''}` : 'Chưa phân công');
    const replacesText = (item.replaces || []).length
      ? `\n> Thay cho issue đợt cũ: ${item.replaces.map((r) => `\`${r}\``).join(', ')} (đã đóng nếu chạy với *close_legacy*).\n`
      : '';
    const header = [
      `| Mã | Ưu tiên | Phụ trách | Ước lượng |`,
      `|---|---|---|---|`,
      `| \`${item.id}\` | **${item.priority}** | ${ownerText} | ${item.estimate || '-'} |`,
      replacesText,
    ].join('\n');
    const body = `${header}\n${item.body}`;
    const labels = [...new Set([...(item.labels || []), `priority: ${item.priority}`, 'status: todo'])];
    const assignees = assigneesFor(item.owner);
    const title = `[${item.id}] ${item.title}`;

    if (dryRun) {
      log(`[dry-run] tạo: ${title} | nhãn: ${labels.join(', ')} | giao: ${assignees.join(', ') || '-'}`);
      planned.add(item.id);
      summaryRows.push([item.id, item.priority, '(dry-run)']);
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
    current.set(item.id, data.number);
    created.push({ item, number: data.number, body });
    summaryRows.push([item.id, item.priority, `#${data.number}`]);
    log(`+ tạo #${data.number}: ${title}`);
    await sleep(1200); // tránh secondary rate limit khi tạo nhiều issue liên tiếp
  }

  // ---------- 5. Gắn liên kết phụ thuộc (#số issue) ----------
  for (const { item, number, body } of created) {
    const deps = (item.depends_on || []).filter((d) => current.has(d));
    if (!deps.length) continue;
    const depLine = `\n\n**Phụ thuộc:** ${deps.map((d) => `#${current.get(d)} (${d})`).join(', ')} — làm sau khi các issue này đã merge.`;
    await github.rest.issues.update({ ...repo, issue_number: number, body: body + depLine });
    await sleep(500);
  }

  // ---------- 6. Đóng issue đợt cũ bị thay thế ----------
  const closedRows = [];
  if (closeLegacy) {
    for (const item of backlog.items) {
      const newNumber = current.get(item.id);
      for (const oldId of item.replaces || []) {
        const olds = legacyOpen.get(oldId) || [];
        for (const oldNumber of olds) {
          if (!newNumber && !planned.has(item.id)) {
            log(`~ giữ #${oldNumber} [${oldId}]: chưa có issue mới [${item.id}] (stretch?)`);
            continue;
          }
          const target = newNumber ? `#${newNumber}` : `[${item.id}] (sẽ tạo)`;
          if (dryRun) {
            log(`[dry-run] đóng #${oldNumber} [${oldId}] → thay bằng ${target}`);
            closedRows.push([`#${oldNumber}`, oldId, target]);
            continue;
          }
          await github.rest.issues.createComment({
            ...repo,
            issue_number: oldNumber,
            body: `Đóng theo hướng đi mới (SQL Server, demo 19:30 22/09/2026). Việc này được làm tiếp ở ${target} – mọi trao đổi chuyển sang issue mới. Nhánh/PR đang dở của issue này: xem docs/04-git-workflow.md mục 6.`,
          });
          await github.rest.issues.update({ ...repo, issue_number: oldNumber, state: 'closed', state_reason: 'not_planned' });
          closedRows.push([`#${oldNumber}`, oldId, target]);
          log(`x đóng #${oldNumber} [${oldId}] → ${target}`);
          await sleep(800);
        }
      }
    }
  }

  const summary = core.summary
    .addHeading('Backlog Đường Sách – kết quả')
    .addTable([[{ data: 'Mã', header: true }, { data: 'Ưu tiên', header: true }, { data: 'Issue', header: true }], ...summaryRows]);
  if (closeLegacy) {
    summary
      .addHeading('Issue đợt cũ đã đóng', 3)
      .addTable([[{ data: 'Issue cũ', header: true }, { data: 'Mã cũ', header: true }, { data: 'Thay bằng', header: true }], ...closedRows]);
  }
  await summary
    .addRaw(dryRun ? '\n(dry-run: không tạo/đóng gì)\n' : `\nĐã tạo mới ${created.length} issue${closeLegacy ? `, đóng ${closedRows.length} issue cũ` : ''}.\n`)
    .write();
};
