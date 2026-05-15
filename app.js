const dataPaths = ["./data/status.json", "./data/status.sample.json"];

const embeddedSampleSnapshot = {
  result: "workers-cockpit-snapshot",
  snapshot_version: "operator_c2_cockpit_static_v0",
  generated_at: "sample",
  local_paths_included: false,
  cockpit: {
    status: "healthy_idle",
    next_safe_action: "Generate a redacted worker snapshot or serve this repository through GitHub Pages.",
    host_side_validation_required: true,
    github: { reachable: true, label_health: "ok" },
    slack: { enabled: true, mode: "slack_webhook", security_boundary: "Outbound summary only." },
    workers: {
      acer: {
        display_name: "Acer",
        branch_prefix: "acer/",
        readiness: "idle",
        ready_labels: ["acer-ready", "ARES"],
        current_branch: "main",
        working_tree_status: "clean",
        ready_issue_numbers: [],
        ready_issue_count: 0,
        active_lock: false,
        stale_lock_count: 0,
        open_pr_count: 0,
        lease_classification: "none",
        executor_mode: "packet_only",
        slack_configured: true,
        github_reachable: true,
      },
      probook: {
        display_name: "ProBook",
        branch_prefix: "probook/",
        readiness: "idle",
        ready_labels: ["probook-ready", "PRES"],
        current_branch: "main",
        working_tree_status: "clean",
        ready_issue_numbers: [],
        ready_issue_count: 0,
        active_lock: false,
        stale_lock_count: 0,
        open_pr_count: 0,
        lease_classification: "none",
        executor_mode: "packet_only",
        slack_configured: true,
        github_reachable: true,
      },
    },
    metrics: {
      ready_issue_count: 0,
      active_worker_count: 0,
      stale_lock_count: 0,
      open_pr_count: 0,
      blocked_job_count: 0,
      needs_human_approval_count: 0,
      tests_failed_count: 0,
    },
    operator_attention: [{ severity: "info", reason: "sample_data" }],
    trend_slots: [
      { name: "claim-to-completion time", status: "history_not_enabled", description: "Trend storage is intentionally deferred." },
      { name: "infrastructure vs product work mix", status: "needs_issue_taxonomy", description: "Useful after issue taxonomy is consistent." },
    ],
    boundary: {
      read_only: true,
      redacted_snapshot: true,
      no_secrets: true,
      no_private_client_data: true,
      no_worker_claims: true,
      no_runtime_behavior_change: true,
    },
  },
};

const stateLabels = {
  healthy_idle: "Healthy Idle",
  ready: "Ready",
  blocked: "Blocked",
  claimable: "Claimable",
  active: "Active",
  idle: "Idle",
  runner_blocked: "Runner Blocked",
  checkout_blocked: "Checkout Blocked",
  lease_stale: "Lease Stale",
};

function text(value, fallback = "unknown") {
  if (value === null || value === undefined || value === "") {
    return fallback;
  }
  if (typeof value === "boolean") {
    return value ? "yes" : "no";
  }
  return String(value);
}

function escapeHtml(value) {
  return text(value, "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function label(value) {
  return stateLabels[value] || text(value).replaceAll("_", " ");
}

async function loadSnapshot() {
  let lastError;
  for (const path of dataPaths) {
    try {
      const response = await fetch(path, { cache: "no-store" });
      if (!response.ok) {
        throw new Error(`${path}: ${response.status}`);
      }
      const payload = await response.json();
      return { payload, source: path };
    } catch (error) {
      lastError = error;
    }
  }
  return { payload: embeddedSampleSnapshot, source: `embedded sample (${lastError ? lastError.message : "no data file"})` };
}

function setText(id, value) {
  const element = document.getElementById(id);
  if (element) {
    element.textContent = value;
  }
}

function renderWorker(worker) {
  const readiness = text(worker.readiness, "unknown");
  const readyNumbers = worker.ready_issue_numbers && worker.ready_issue_numbers.length
    ? worker.ready_issue_numbers.join(", ")
    : "none";
  return `
    <article class="worker-card">
      <div class="worker-top">
        <div>
          <p class="label">${escapeHtml(worker.branch_prefix)} lane</p>
          <h2 class="worker-name">${escapeHtml(worker.display_name)}</h2>
        </div>
        <span class="pill ${escapeHtml(readiness)}">${escapeHtml(label(readiness))}</span>
      </div>
      <div class="worker-stats">
        ${renderStat("Ready Issues", worker.ready_issue_count)}
        ${renderStat("Active Lock", worker.active_lock)}
        ${renderStat("Stale Locks", worker.stale_lock_count)}
        ${renderStat("Open PRs", worker.open_pr_count)}
        ${renderStat("Lease", worker.lease_classification)}
        ${renderStat("Executor", worker.executor_mode)}
      </div>
      <p class="worker-detail">
        Ready labels: ${escapeHtml((worker.ready_labels || []).join(" / "))}<br />
        Branch: ${escapeHtml(worker.current_branch)} | Tree: ${escapeHtml(worker.working_tree_status)}<br />
        Ready issue refs: ${escapeHtml(readyNumbers)}<br />
        Slack: ${escapeHtml(text(worker.slack_configured))} | GitHub: ${escapeHtml(text(worker.github_reachable))}
      </p>
    </article>
  `;
}

function renderStat(name, value) {
  return `
    <div class="stat">
      <span>${escapeHtml(name)}</span>
      <strong>${escapeHtml(text(value))}</strong>
    </div>
  `;
}

function renderMetrics(metrics) {
  const entries = [
    ["Ready", metrics.ready_issue_count],
    ["Active", metrics.active_worker_count],
    ["Stale", metrics.stale_lock_count],
    ["Open PRs", metrics.open_pr_count],
    ["Blocked Jobs", metrics.blocked_job_count],
    ["Human Review", metrics.needs_human_approval_count],
    ["Tests Failed", metrics.tests_failed_count],
  ];
  return entries.map(([name, value]) => renderStat(name, value)).join("");
}

function renderAttention(items) {
  if (!items || items.length === 0) {
    return `
      <div class="attention-item info">
        <strong>No attention items</strong>
        <p>The snapshot did not report queue, lease, label, or runner blockers.</p>
      </div>
    `;
  }
  return items.map((item) => `
    <div class="attention-item ${escapeHtml(item.severity)}">
      <strong>${escapeHtml(label(item.reason))}</strong>
      <p>${item.worker_id ? `Worker: ${escapeHtml(item.worker_id)}` : "System-level signal"}</p>
    </div>
  `).join("");
}

function renderTrends(items) {
  return (items || []).map((item) => `
    <div class="trend-item">
      <strong>${escapeHtml(item.name)}</strong>
      <p>${escapeHtml(label(item.status))}: ${escapeHtml(item.description)}</p>
    </div>
  `).join("");
}

function renderBoundary(boundary) {
  return Object.entries(boundary || {}).map(([name, value]) => `
    <div class="boundary-item">
      <strong>${escapeHtml(name.replaceAll("_", " "))}</strong>
      <p>${escapeHtml(text(value))}</p>
    </div>
  `).join("");
}

function render(payload, source) {
  const cockpit = payload.cockpit || payload;
  const status = text(cockpit.status, "unknown");
  const statusDot = document.getElementById("status-dot");
  if (statusDot) {
    statusDot.className = `status-dot status-${status}`;
  }

  setText("system-status", label(status));
  setText("snapshot-time", `${text(payload.generated_at)} via ${source}`);
  setText("github-state", cockpit.github && cockpit.github.reachable ? "reachable" : "attention");
  setText("slack-state", cockpit.slack ? label(cockpit.slack.mode) : "unknown");
  setText("host-side-state", cockpit.host_side_validation_required ? "required" : "not required");
  setText("next-safe-action", text(cockpit.next_safe_action));

  document.getElementById("worker-board").innerHTML = Object.values(cockpit.workers || {})
    .map(renderWorker)
    .join("");
  document.getElementById("metrics-grid").innerHTML = renderMetrics(cockpit.metrics || {});
  document.getElementById("attention-list").innerHTML = renderAttention(cockpit.operator_attention || []);
  document.getElementById("trend-slots").innerHTML = renderTrends(cockpit.trend_slots || []);
  document.getElementById("boundary-grid").innerHTML = renderBoundary(cockpit.boundary || {});
}

loadSnapshot()
  .then(({ payload, source }) => render(payload, source))
  .catch((error) => {
    setText("system-status", "Snapshot Missing");
    setText("next-safe-action", `Generate a snapshot with: python -m command_centre.cli workers cockpit-snapshot --output docs/operator_cockpit/c2/data/status.json. ${error.message}`);
  });
