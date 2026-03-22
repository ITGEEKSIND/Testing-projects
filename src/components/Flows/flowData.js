// ============================================================
// DATA — Flows Module v1.0
// ============================================================

export const TRIGGER_TYPES = [
  { id: "app.installed", label: "App Installed", category: "Event", color: "#2196F3", icon: "↓" },
  { id: "app.uninstalled", label: "App Uninstalled", category: "Event", color: "#E53935", icon: "✕" },
  { id: "charge.approved", label: "Charge Approved", category: "Event", color: "#4CAF50", icon: "✓" },
  { id: "charge.declined", label: "Charge Declined", category: "Event", color: "#FF9800", icon: "!" },
  { id: "subscription.activated", label: "Subscription Activated", category: "Event", color: "#43A047", icon: "$" },
  { id: "subscription.cancelled", label: "Subscription Cancelled", category: "Event", color: "#E53935", icon: "×" },
  { id: "charge.failed", label: "Charge Failed", category: "Event", color: "#C62828", icon: "⚠" },
  { id: "order.edit_completed", label: "Order Edit Completed", category: "Event", color: "#00BCD4", icon: "✎" },
  { id: "widget.added", label: "Widget Added", category: "Event", color: "#009688", icon: "⊞" },
  { id: "usage_threshold.reached", label: "Usage Threshold", category: "Event", color: "#FF9800", icon: "%" },
  { id: "survey.response", label: "Survey Response", category: "Event", color: "#9C27B0", icon: "?" },
  { id: "time_based", label: "Time-Based", category: "Time", color: "#607D8B", icon: "⏱" },
  { id: "manual", label: "Manual Trigger", category: "Manual", color: "#795548", icon: "▶" },
];

export const ACTION_TYPES = [
  { id: "send_email", label: "Send Email", icon: "✉", color: "#2196F3" },
  { id: "send_slack", label: "Send Slack", icon: "#", color: "#611F69" },
  { id: "update_field", label: "Update Field", icon: "✎", color: "#FF9800" },
  { id: "add_tag", label: "Add Tag", icon: "🏷", color: "#9C27B0" },
  { id: "remove_tag", label: "Remove Tag", icon: "−", color: "#607D8B" },
  { id: "assign_owner", label: "Assign Owner", icon: "👤", color: "#00BCD4" },
  { id: "apply_discount", label: "Apply Discount", icon: "%", color: "#4CAF50" },
  { id: "create_note", label: "Create Note", icon: "📝", color: "#795548" },
  { id: "webhook", label: "Webhook", icon: "↗", color: "#F44336" },
];

export const FLOWS = [
  { id: "f1", name: "Trial Activation Gamification", desc: "Multi-step trial engagement sequence", status: "published", trigger: "charge.approved", actionsCount: 7, executions: 2845, lastTriggered: "3h ago", tags: ["trial", "onboarding"], createdBy: "rahul@itgeeks.com", version: 5,
    nodes: [
      { id: "n1", type: "trigger", label: "Charge Approved", config: "charge.approved" },
      { id: "n2", type: "action", label: "Send Welcome Email", actionType: "send_email" },
      { id: "n3", type: "delay", label: "Wait 24 hours", duration: "24h" },
      { id: "n4", type: "condition", label: "Widget Added?", field: "widgetAdded", op: "is", val: "true" },
      { id: "n5", type: "action", label: "Send Widget Nudge", actionType: "send_email", branch: "false" },
      { id: "n6", type: "action", label: "Send Congrats", actionType: "send_email", branch: "true" },
      { id: "n7", type: "delay", label: "Wait 3 days", duration: "3d" },
      { id: "n8", type: "action", label: "Progress Update", actionType: "send_email" },
    ]},
  { id: "f2", name: "Churn Risk Intervention", desc: "Proactive retention when risk spikes", status: "published", trigger: "churnRisk.changed", actionsCount: 4, executions: 342, lastTriggered: "1d ago", tags: ["retention", "churn"], createdBy: "rahul@itgeeks.com", version: 3,
    nodes: [
      { id: "n1", type: "trigger", label: "Risk → 0-2 Weeks", config: "churnRisk.changed" },
      { id: "n2", type: "action", label: "Assign Owner", actionType: "assign_owner" },
      { id: "n3", type: "action", label: "Slack Alert #retention", actionType: "send_slack" },
      { id: "n4", type: "delay", label: "Wait 2 hours", duration: "2h" },
      { id: "n5", type: "action", label: "Outreach Email", actionType: "send_email" },
    ]},
  { id: "f3", name: "Usage Limit Upgrade Nudge", desc: "Facilitate plan upgrades at 80% usage", status: "published", trigger: "usage_threshold.reached", actionsCount: 4, executions: 456, lastTriggered: "5h ago", tags: ["upsell", "volume"], createdBy: "nilesh@itgeeks.com", version: 2,
    nodes: [
      { id: "n1", type: "trigger", label: "80% Usage Reached", config: "usage_threshold.reached" },
      { id: "n2", type: "action", label: "Email Volume Warning", actionType: "send_email" },
      { id: "n3", type: "action", label: "Set upsell_eligible", actionType: "update_field" },
      { id: "n4", type: "delay", label: "Wait 3 days", duration: "3d" },
      { id: "n5", type: "condition", label: "Upgraded?", field: "planUpgraded", op: "is", val: "false" },
      { id: "n6", type: "action", label: "Slack to Owner", actionType: "send_slack", branch: "true" },
    ]},
  { id: "f4", name: "Win-Back Sequence", desc: "Post-uninstall recovery with survey branching", status: "published", trigger: "app.uninstalled", actionsCount: 6, executions: 567, lastTriggered: "6h ago", tags: ["recovery", "win-back"], createdBy: "rahul@itgeeks.com", version: 4,
    nodes: [
      { id: "n1", type: "trigger", label: "App Uninstalled", config: "app.uninstalled" },
      { id: "n2", type: "delay", label: "Wait 1 hour", duration: "1h" },
      { id: "n3", type: "action", label: "Survey Email", actionType: "send_email" },
      { id: "n4", type: "delay", label: "Wait 24 hours", duration: "24h" },
      { id: "n5", type: "condition", label: "Survey Response?", field: "surveyResponse", op: "is_not_empty", val: "" },
      { id: "n6", type: "action", label: "Recovery Email (Branched)", actionType: "send_email", branch: "true" },
      { id: "n7", type: "action", label: "Generic Recovery", actionType: "send_email", branch: "false" },
    ]},
  { id: "f5", name: "New Install Welcome", desc: "First-hour survival sequence", status: "published", trigger: "app.installed", actionsCount: 3, executions: 4821, lastTriggered: "30m ago", tags: ["onboarding", "trial"], createdBy: "rahul@itgeeks.com", version: 6,
    nodes: [
      { id: "n1", type: "trigger", label: "App Installed", config: "app.installed" },
      { id: "n2", type: "action", label: "Welcome Email", actionType: "send_email" },
      { id: "n3", type: "action", label: "Set onboarding_started", actionType: "update_field" },
      { id: "n4", type: "delay", label: "Wait 5 minutes", duration: "5m" },
      { id: "n5", type: "condition", label: "Trial Started?", field: "trialStarted", op: "is", val: "false" },
      { id: "n6", type: "action", label: "Intervention Email", actionType: "send_email", branch: "true" },
    ]},
  { id: "f6", name: "Dunning Recovery", desc: "Failed payment dunning sequence", status: "draft", trigger: "charge.failed", actionsCount: 5, executions: 0, lastTriggered: "—", tags: ["dunning", "billing"], createdBy: "rahul@itgeeks.com", version: 1,
    nodes: [
      { id: "n1", type: "trigger", label: "Charge Failed", config: "charge.failed" },
      { id: "n2", type: "action", label: "Day 1 Email", actionType: "send_email" },
      { id: "n3", type: "delay", label: "Wait 3 days", duration: "3d" },
      { id: "n4", type: "action", label: "Day 3 Urgent Email", actionType: "send_email" },
      { id: "n5", type: "delay", label: "Wait 4 days", duration: "4d" },
      { id: "n6", type: "action", label: "Day 7 Final Warning", actionType: "send_email" },
      { id: "n7", type: "action", label: "Slack Alert #billing", actionType: "send_slack" },
    ]},
  { id: "f7", name: "Annual Plan Upsell (Draft)", desc: "Monthly → Annual conversion for eligible merchants", status: "draft", trigger: "time_based", actionsCount: 3, executions: 0, lastTriggered: "—", tags: ["upsell"], createdBy: "nilesh@itgeeks.com", version: 1, nodes: [] },
];

export const TEMPLATES = [
  { id: "t1", name: "Abandoned Subscription Recovery", desc: "Recovers merchants who decline the trial charge. 3-email sequence over 7 days.", trigger: "charge.declined", actions: 5, icon: "🔄" },
  { id: "t2", name: "Trial Activation Gamification", desc: "Multi-step trial engagement. Mirrors v3 Phase 2-3 email sequence.", trigger: "charge.approved", actions: 7, icon: "🎯" },
  { id: "t3", name: "Churn Risk Intervention", desc: "Proactive retention when risk spikes. Auto-assigns owner + alerts Slack.", trigger: "churnRisk.changed", actions: 4, icon: "🛡" },
  { id: "t4", name: "Usage Limit Upgrade Nudge", desc: "Facilitates plan upgrades before service interruption at 80% usage.", trigger: "usage_threshold", actions: 4, icon: "📈" },
  { id: "t5", name: "Win-Back Sequence", desc: "10-email recovery with survey branching + extended win-back at 60/90 days.", trigger: "app.uninstalled", actions: 6, icon: "💌" },
  { id: "t6", name: "New Install Welcome", desc: "First-hour survival sequence. Mirrors v3 Phase 1.", trigger: "app.installed", actions: 3, icon: "👋" },
];

export const EXEC_LOG = [
  { id: "ex1", customer: "Blue Sky Apparel", trigger: "charge.approved", time: "3h ago", result: "executed", duration: "1.2s", actions: ["Send Welcome Email ✓", "Update field ✓"] },
  { id: "ex2", customer: "Outdoor Gear Co", trigger: "usage_threshold.reached", time: "5h ago", result: "executed", duration: "0.8s", actions: ["Email Volume Warning ✓", "Set upsell_eligible ✓"] },
  { id: "ex3", customer: "Fashion Hub", trigger: "charge.approved", time: "6h ago", result: "suppressed", duration: "0.1s", actions: [], suppressedBy: "widgetAdded = false (waiting for widget)" },
  { id: "ex4", customer: "Tech Gadgets Pro", trigger: "charge.failed", time: "12h ago", result: "executed", duration: "2.1s", actions: ["Day 1 Email ✓", "Slack #billing ✓"] },
  { id: "ex5", customer: "Pet Supply World", trigger: "app.uninstalled", time: "1d ago", result: "executed", duration: "1.5s", actions: ["Survey Email ✓"] },
  { id: "ex6", customer: "Sportswear Direct", trigger: "churnRisk.changed", time: "1d ago", result: "executed", duration: "3.2s", actions: ["Assign Owner ✓", "Slack #retention ✓", "Outreach Email ✓"] },
  { id: "ex7", customer: "Green Garden Supply", trigger: "app.installed", time: "2d ago", result: "failed", duration: "0.3s", actions: ["Welcome Email ✗ (bounce)"], error: "Hard bounce — email added to suppression" },
];
