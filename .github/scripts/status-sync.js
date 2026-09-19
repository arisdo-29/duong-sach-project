// Tự đổi nhãn "status: ..." của issue theo tiến độ:
//   issue được assign           → status: in-progress
//   PR mở (không phải draft)    → status: review   (issue được nhắc bằng "Closes #12" hoặc nhánh feat/12-...)
//   PR chuyển về draft / đóng mà không merge → status: in-progress
//   PR merge                    → status: done (+ đóng issue nếu còn mở)
//   issue đóng / mở lại         → status: done / status: todo
const STATUS = ['status: todo', 'status: in-progress', 'status: review', 'status: done', 'status: blocked'];

module.exports = async ({ github, context, core }) => {
  const repo = context.repo;

  async function setStatus(issueNumber, status) {
    let issue;
    try {
      ({ data: issue } = await github.rest.issues.get({ ...repo, issue_number: issueNumber }));
    } catch (e) {
      core.warning(`Không đọc được #${issueNumber}: ${e.message}`);
      return;
    }
    if (issue.pull_request) return; // chỉ xử lý issue, bỏ qua PR
    const names = issue.labels.map((l) => (typeof l === 'string' ? l : l.name));
    const keep = names.filter((n) => !STATUS.includes(n));
    const next = status ? [...keep, status] : keep;
    const same = next.length === names.length && next.every((n) => names.includes(n));
    if (same) return;
    await github.rest.issues.setLabels({ ...repo, issue_number: issueNumber, labels: next });
    core.info(`#${issueNumber} → ${status || '(bỏ nhãn trạng thái)'}`);
  }

  function linkedIssues(pr) {
    const text = `${pr.title || ''}\n${pr.body || ''}`;
    const nums = [...text.matchAll(/\b(?:close[sd]?|fix(?:e[sd])?|resolve[sd]?)\s*:?\s*#(\d+)/gi)].map((m) => Number(m[1]));
    const branch = (pr.head && pr.head.ref) || '';
    const b = branch.match(/^[a-z]+\/(\d+)[-_]/i); // feat/12-heritage-crud
    if (b) nums.push(Number(b[1]));
    return [...new Set(nums)].filter((n) => n !== pr.number);
  }

  const action = context.payload.action;

  if (context.eventName === 'issues') {
    const issue = context.payload.issue;
    if (action === 'assigned' && issue.state === 'open') {
      const names = issue.labels.map((l) => l.name);
      if (!names.includes('status: review')) await setStatus(issue.number, 'status: in-progress');
    } else if (action === 'closed') {
      await setStatus(issue.number, issue.state_reason === 'not_planned' ? null : 'status: done');
    } else if (action === 'reopened') {
      await setStatus(issue.number, 'status: todo');
    }
    return;
  }

  if (context.eventName === 'pull_request') {
    const pr = context.payload.pull_request;
    const nums = linkedIssues(pr);
    if (!nums.length) {
      core.info('PR không nhắc tới issue nào (thêm "Closes #<số>" vào mô tả PR).');
      return;
    }
    for (const n of nums) {
      if (action === 'closed' && pr.merged) {
        await setStatus(n, 'status: done');
        // Nếu PR không merge vào nhánh mặc định, GitHub không tự đóng issue → đóng hộ.
        const { data: issue } = await github.rest.issues.get({ ...repo, issue_number: n });
        if (!issue.pull_request && issue.state === 'open') {
          await github.rest.issues.update({ ...repo, issue_number: n, state: 'closed', state_reason: 'completed' });
        }
      } else if (action === 'closed' || action === 'converted_to_draft' || pr.draft) {
        await setStatus(n, 'status: in-progress');
      } else {
        await setStatus(n, 'status: review');
      }
    }
  }
};
