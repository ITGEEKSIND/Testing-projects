// Email module data - extracted from original App.jsx

export const PHASES = [
  { id: 1, name: "Survival", short: "P1", color: "#E53935", bg: "#FDECEA", range: "0–60 min", goalShort: "Approve trial charge" },
  { id: 2, name: "Post-Activation", short: "P2", color: "#FB8C00", bg: "#FFF3E0", range: "Hours 1–24", goalShort: "Widget setup" },
  { id: 3, name: "Engagement", short: "P3", color: "#FDD835", bg: "#FFFDE7", range: "Days 2–7", goalShort: "Maintain engagement" },
  { id: 4, name: "Conversion", short: "P4", color: "#FFB300", bg: "#FFF8E1", range: "Days 8–14", goalShort: "Convert to paid" },
  { id: 5, name: "Retention", short: "P5", color: "#43A047", bg: "#E8F5E9", range: "Post-conversion", goalShort: "Ongoing value" },
  { id: 6, name: "Volume Alerts", short: "P6", color: "#00897B", bg: "#E0F2F1", range: "Ongoing", goalShort: "Manage limits" },
  { id: 7, name: "Add-Ons", short: "P7", color: "#3949AB", bg: "#E8EAF6", range: "Ongoing", goalShort: "Upsell" },
  { id: 8, name: "Recovery", short: "P8", color: "#8E24AA", bg: "#F3E5F5", range: "Post-uninstall", goalShort: "Win back" },
  { id: 9, name: "Dunning", short: "P9", color: "#C62828", bg: "#FFEBEE", range: "Payment recovery", goalShort: "Recover payment" },
];

export const PRIORITY_TIERS = [
  { id: "P0", label: "P0 · Critical", color: "#E53935", bg: "#FDECEA", desc: "System/billing. Always sends, overrides suppressions." },
  { id: "P1", label: "P1 · High", color: "#FB8C00", bg: "#FFF3E0", desc: "Activation & onboarding. Time-sensitive." },
  { id: "P2", label: "P2 · Medium-High", color: "#FFB300", bg: "#FFF8E1", desc: "Conversion & upgrade prompts." },
  { id: "P3", label: "P3 · Medium", color: "#43A047", bg: "#E8F5E9", desc: "Engagement & feature discovery." },
  { id: "P4", label: "P4 · Low", color: "#3949AB", bg: "#E8EAF6", desc: "Informational. Suppressed if P0-P3 fired in 24h." },
  { id: "P5", label: "P5 · Lowest", color: "#9E9E9E", bg: "#F5F5F5", desc: "Win-back & seasonal. Most easily suppressed." },
];

export const SEND_LIMIT_OPTIONS = [
  { value: "once", label: "Once" },
  { value: "max_2", label: "Max 2" },
  { value: "1_per_cycle", label: "1 per billing cycle" },
  { value: "1_per_30d", label: "1 per 30 days" },
  { value: "1_per_60d", label: "1 per 60 days" },
  { value: "every_90d", label: "Every 90 days" },
];

// Full 58-trigger dataset
export const TRIGGERS = [
  // Phase 1: Survival
  { id: "T01", name: "Install Confirmation", event: "app.installed", delay: "0s", delaySeconds: 0, phase: 1, priority: "P0", sendLimit: "once", status: "active", sendCount: 4821, updatedAt: "2d ago", emailRef: "Email 1",
    conditions: ["trial_started=false", "charge_approved=false"], suppressions: ["S01: trial_started=true", "S02: charge_approved=true"],
    branchOf: null, branchPair: null },
  { id: "T02", name: "5-Min Intervention", event: "app.installed", delay: "5 min", delaySeconds: 300, phase: 1, priority: "P0", sendLimit: "once", status: "active", sendCount: 3294, updatedAt: "1d ago", emailRef: "Email 2",
    conditions: ["trial_started=false", "charge_approved=false"], suppressions: ["S01: trial_started=true", "S02: charge_approved=true", "S24: email_1_bounced=true"],
    branchOf: null, branchPair: null },
  { id: "T03", name: "10-Min Rescue", event: "app.installed", delay: "10 min", delaySeconds: 600, phase: 1, priority: "P0", sendLimit: "once", status: "active", sendCount: 2187, updatedAt: "3d ago", emailRef: "Email 3",
    conditions: ["trial_started=false", "charge_approved=false"], suppressions: ["S01: trial_started=true", "S02: charge_approved=true", "S25: merchant_replied=true"],
    branchOf: null, branchPair: null },
  { id: "T04", name: "Charge Abandoned", event: "charge.declined/abandoned", delay: "0s", delaySeconds: 0, phase: 1, priority: "P1", sendLimit: "max_2", status: "active", sendCount: 891, updatedAt: "5d ago", emailRef: "Email 4",
    conditions: ["charge_approved=false", "merchant_clicked_start_trial=true"], suppressions: ["S02: charge_approved=true", "S26: new_charge_attempt_in_progress=true"],
    branchOf: null, branchPair: null },
  { id: "T04B", name: "Widget Added, Trial Not Started", event: "widget.added_to_both", delay: "1 hr", delaySeconds: 3600, phase: 1, priority: "P0", sendLimit: "once", status: "active", sendCount: 134, updatedAt: "1d ago", emailRef: "Email 4B",
    conditions: ["widget_added=true", "trial_started=false", "charge_approved=false"], suppressions: ["S01: trial_started=true", "S02: charge_approved=true"],
    branchOf: null, branchPair: null },

  // Phase 2: Post-Activation
  { id: "T05", name: "Trial Activated — Add Widget", event: "charge.approved", delay: "1 hr", delaySeconds: 3600, phase: 2, priority: "P1", sendLimit: "once", status: "active", sendCount: 2845, updatedAt: "4d ago", emailRef: "Email 5",
    conditions: ["charge_approved=true", "widget_added=false"], suppressions: ["S03: widget_added=true"],
    branchOf: null, branchPair: null },
  { id: "T05B", name: "24h Trial Active, No Widget", event: "charge.approved", delay: "24 hr", delaySeconds: 86400, phase: 2, priority: "P1", sendLimit: "once", status: "active", sendCount: 1105, updatedAt: "2d ago", emailRef: "Email 5B",
    conditions: ["charge_approved=true", "trial_active=true", "widget_added=false"], suppressions: ["S03: widget_added=true"],
    branchOf: null, branchPair: null },
  { id: "T06", name: "Widget Added — You're Live", event: "widget.added_to_both", delay: "2 hr", delaySeconds: 7200, phase: 2, priority: "P2", sendLimit: "once", status: "active", sendCount: 2234, updatedAt: "3d ago", emailRef: "Email 6",
    conditions: ["widget_on_both=true", "charge_approved=true"], suppressions: ["S04: first_edit_completed=true"],
    branchOf: null, branchPair: null },
  { id: "T07", name: "24h Checkpoint", event: "charge.approved", delay: "24 hr", delaySeconds: 86400, phase: 2, priority: "P3", sendLimit: "once", status: "active", sendCount: 1890, updatedAt: "5d ago", emailRef: "Email 7",
    conditions: ["charge_approved=true", "trial_active=true"], suppressions: ["S27: widget_added=false", "S05: total_edits>0", "S08: trial_cancelled=true"],
    branchOf: null, branchPair: null },

  // Phase 3: Engagement (with A/B branching)
  { id: "T08", name: "Low Engagement Day 2", event: "time_based", delay: "Day 2", delaySeconds: 172800, phase: 3, priority: "P2", sendLimit: "once", status: "active", sendCount: 1567, updatedAt: "2d ago", emailRef: "Email 8",
    conditions: ["trial_active=true", "total_edits=0", "dashboard_logins_48h=0"], suppressions: ["S05: total_edits>0", "S35: dashboard_logins_24h>0"],
    branchOf: null, branchPair: null },
  { id: "T09", name: "First Edit Completed", event: "order.edit_completed", delay: "0s", delaySeconds: 0, phase: 3, priority: "P1", sendLimit: "once", status: "active", sendCount: 1678, updatedAt: "6d ago", emailRef: "Email 9",
    conditions: ["total_edits=1", "trial_active=true"], suppressions: [],
    branchOf: null, branchPair: null },
  { id: "T10A", name: "Day 3 — Engaged", event: "time_based", delay: "Day 3", delaySeconds: 259200, phase: 3, priority: "P3", sendLimit: "once", status: "active", sendCount: 845, updatedAt: "3d ago", emailRef: "Email 10A",
    conditions: ["trial_active=true", "total_edits>0"], suppressions: ["S08: trial_cancelled=true"],
    branchOf: "T10", branchPair: "T10B", branchLabel: "A: Engaged", branchCondition: "total_edits > 0" },
  { id: "T10B", name: "Day 3 — Zero Edits", event: "time_based", delay: "Day 3", delaySeconds: 259200, phase: 3, priority: "P3", sendLimit: "once", status: "active", sendCount: 722, updatedAt: "3d ago", emailRef: "Email 10B",
    conditions: ["trial_active=true", "total_edits=0"], suppressions: ["S05: total_edits>0", "S08: trial_cancelled=true"],
    branchOf: "T10", branchPair: "T10A", branchLabel: "B: Zero Edits", branchCondition: "total_edits = 0" },
  { id: "T11A", name: "Day 5 — Engaged", event: "time_based", delay: "Day 5", delaySeconds: 432000, phase: 3, priority: "P3", sendLimit: "once", status: "active", sendCount: 534, updatedAt: "4d ago", emailRef: "Email 11A",
    conditions: ["trial_active=true", "total_edits>=3"], suppressions: ["S08: trial_cancelled=true"],
    branchOf: "T11", branchPair: "T11B", branchLabel: "A: Engaged", branchCondition: "total_edits ≥ 3" },
  { id: "T11B", name: "Day 5 — Zero Edits", event: "time_based", delay: "Day 5", delaySeconds: 432000, phase: 3, priority: "P3", sendLimit: "once", status: "active", sendCount: 489, updatedAt: "4d ago", emailRef: "Email 11B",
    conditions: ["trial_active=true", "total_edits=0"], suppressions: ["S05: total_edits>0", "S08: trial_cancelled=true"],
    branchOf: "T11", branchPair: "T11A", branchLabel: "B: Zero Edits", branchCondition: "total_edits = 0" },
  { id: "T11C", name: "High Edit Rate Detection", event: "usage_pattern.detected", delay: "0s", delaySeconds: 0, phase: 3, priority: "P2", sendLimit: "once", status: "active", sendCount: 67, updatedAt: "8d ago", emailRef: "Email 11C",
    conditions: ["sub_active=true", "days_since_paid>=14", "edit_rate>=7%", "total_edits>=10"], suppressions: ["S33: high_edit_rate_email_sent=true"],
    branchOf: null, branchPair: null },
  { id: "T12", name: "Day 7 Feature Overview", event: "time_based", delay: "Day 7", delaySeconds: 604800, phase: 3, priority: "P3", sendLimit: "once", status: "active", sendCount: 678, updatedAt: "5d ago", emailRef: "Email 12",
    conditions: ["trial_active=true", "total_edits>0"], suppressions: ["S06: total_edits=0", "S08: trial_cancelled=true"],
    branchOf: "T12G", branchPair: "T12B", branchLabel: "A: Engaged", branchCondition: "total_edits > 0" },
  { id: "T12B", name: "Day 7 Zero Edits Reassurance", event: "time_based", delay: "Day 7", delaySeconds: 604800, phase: 3, priority: "P2", sendLimit: "once", status: "active", sendCount: 312, updatedAt: "5d ago", emailRef: "Email 12B",
    conditions: ["trial_active=true", "total_edits=0", "widget_added=true"], suppressions: ["S05: total_edits>0", "S34: zero_edits_reassurance_sent=true"],
    branchOf: "T12G", branchPair: "T12", branchLabel: "B: Zero Edits", branchCondition: "total_edits = 0" },

  // Phase 4: Conversion
  { id: "T13", name: "Plan Fit Day 8", event: "time_based", delay: "Day 8", delaySeconds: 691200, phase: 4, priority: "P2", sendLimit: "once", status: "active", sendCount: 1102, updatedAt: "3d ago", emailRef: "Email 13",
    conditions: ["trial_active=true", "days_until_end=6"], suppressions: ["S09: plan_changed_in_last_7_days=true"],
    branchOf: null, branchPair: null },
  { id: "T14", name: "Trial Conversion Day 10", event: "time_based", delay: "Day 10", delaySeconds: 864000, phase: 4, priority: "P2", sendLimit: "once", status: "active", sendCount: 978, updatedAt: "2d ago", emailRef: "Email 14",
    conditions: ["trial_active=true", "days_until_end=4"], suppressions: ["S30: plan_changed_last_7d=true", "S29: billing_changed_to_annual=true", "S08: trial_cancelled=true"],
    branchOf: null, branchPair: null },
  { id: "T15", name: "Annual Savings Day 11", event: "time_based", delay: "Day 11", delaySeconds: 950400, phase: 4, priority: "P3", sendLimit: "once", status: "active", sendCount: 456, updatedAt: "6d ago", emailRef: "Email 15",
    conditions: ["trial_active=true", "billing=monthly", "days_until_end=3"], suppressions: ["S11: billing=annual", "S10: plan_changed_in_last_24h=true"],
    branchOf: null, branchPair: null },
  { id: "T16", name: "Trial Ends Tomorrow Day 13", event: "time_based", delay: "Day 13", delaySeconds: 1123200, phase: 4, priority: "P1", sendLimit: "once", status: "active", sendCount: 890, updatedAt: "2d ago", emailRef: "Email 16",
    conditions: ["trial_active=true", "days_until_end=1"], suppressions: [],
    branchOf: null, branchPair: null },
  { id: "T17", name: "Converted to Paid (Monthly)", event: "subscription.activated", delay: "0s", delaySeconds: 0, phase: 4, priority: "P1", sendLimit: "once", status: "active", sendCount: 1245, updatedAt: "1d ago", emailRef: "Email 17",
    conditions: ["trial_ended=true", "sub_active=true", "billing=monthly"], suppressions: [],
    branchOf: "T17G", branchPair: "T17B", branchLabel: "A: Monthly", branchCondition: "billing = monthly" },
  { id: "T17B", name: "Converted to Paid (Annual)", event: "subscription.activated", delay: "0s", delaySeconds: 0, phase: 4, priority: "P1", sendLimit: "once", status: "active", sendCount: 234, updatedAt: "1d ago", emailRef: "Email 17B",
    conditions: ["trial_ended=true", "sub_active=true", "billing=annual"], suppressions: [],
    branchOf: "T17G", branchPair: "T17", branchLabel: "B: Annual", branchCondition: "billing = annual" },

  // Phase 5: Retention
  { id: "T18", name: "Month 1 Summary", event: "time_based", delay: "30 days", delaySeconds: 2592000, phase: 5, priority: "P2", sendLimit: "once", status: "active", sendCount: 567, updatedAt: "4d ago", emailRef: "Email 18",
    conditions: ["sub_active=true", "billing_cycles>=1"], suppressions: ["S12: sub_cancelled=true"],
    branchOf: "T18G", branchPair: "T18B", branchLabel: "A: Active", branchCondition: "edits_last_30d > 0" },
  { id: "T18B", name: "Paid Inactivity (30 Days)", event: "time_based", delay: "30 days", delaySeconds: 2592000, phase: 5, priority: "P1", sendLimit: "once", status: "active", sendCount: 89, updatedAt: "4d ago", emailRef: "Email 18B",
    conditions: ["sub_active=true", "total_edits_last_30d=0", "days_since_first_charge>=30"], suppressions: ["S12: sub_cancelled=true", "S13: total_edits_last_30d>0"],
    branchOf: "T18G", branchPair: "T18", branchLabel: "B: Inactive", branchCondition: "edits_last_30d = 0" },
  { id: "T19", name: "60-Day Check-In", event: "time_based", delay: "60 days", delaySeconds: 5184000, phase: 5, priority: "P3", sendLimit: "once", status: "active", sendCount: 345, updatedAt: "7d ago", emailRef: "Email 19",
    conditions: ["sub_active=true"], suppressions: ["S12: sub_cancelled=true"],
    branchOf: null, branchPair: null },
  { id: "T19B", name: "NPS Survey (Day 61)", event: "time_based", delay: "61 days", delaySeconds: 5270400, phase: 5, priority: "P3", sendLimit: "once", status: "active", sendCount: 201, updatedAt: "7d ago", emailRef: "Email 19B",
    conditions: ["sub_active=true", "nps_sent_last_90d=false"], suppressions: ["S12: sub_cancelled=true", "S14: nps_sent_last_90d=true"],
    branchOf: null, branchPair: null },
  { id: "T20", name: "90-Day Quarterly Summary", event: "time_based", delay: "90 days", delaySeconds: 7776000, phase: 5, priority: "P3", sendLimit: "every_90d", status: "active", sendCount: 123, updatedAt: "14d ago", emailRef: "Email 20",
    conditions: ["sub_active=true"], suppressions: ["S12: sub_cancelled=true"],
    branchOf: null, branchPair: null },

  // Phase 6: Volume Alerts
  { id: "T21", name: "60% Volume Used", event: "usage_threshold.reached", delay: "0s", delaySeconds: 0, phase: 6, priority: "P3", sendLimit: "1_per_cycle", status: "active", sendCount: 456, updatedAt: "5d ago", emailRef: "Email 21",
    conditions: ["sub_active=true", "cycle_usage=60%"], suppressions: ["S15: 80%_sent=true", "S16: 100%_sent=true"],
    branchOf: null, branchPair: null },
  { id: "T22", name: "80% Volume Warning", event: "usage_threshold.reached", delay: "0s", delaySeconds: 0, phase: 6, priority: "P2", sendLimit: "1_per_cycle", status: "active", sendCount: 234, updatedAt: "7d ago", emailRef: "Email 22",
    conditions: ["sub_active=true", "cycle_usage=80%"], suppressions: ["S16: 100%_sent=true"],
    branchOf: null, branchPair: null },
  { id: "T23", name: "100-Order Grace", event: "usage_threshold.exceeded", delay: "0s", delaySeconds: 0, phase: 6, priority: "P1", sendLimit: "1_per_cycle", status: "active", sendCount: 145, updatedAt: "8d ago", emailRef: "Email 23",
    conditions: ["sub_active=true", "orders>limit", "orders<=limit+100"], suppressions: ["S17: service_stopped=true", "S32: grace_period_email_sent_this_cycle=true"],
    branchOf: null, branchPair: null },
  { id: "T24", name: "Service Stopped (Monthly)", event: "service.stopped", delay: "0s", delaySeconds: 0, phase: 6, priority: "P0", sendLimit: "1_per_cycle", status: "active", sendCount: 67, updatedAt: "10d ago", emailRef: "Email 24",
    conditions: ["sub_active=true", "billing=monthly", "orders>limit+100"], suppressions: ["S31: service_stopped_email_sent_this_cycle=true"],
    branchOf: "T24G", branchPair: "T24B", branchLabel: "A: Monthly", branchCondition: "billing = monthly" },
  { id: "T24B", name: "Service Stopped (Annual)", event: "service.stopped", delay: "0s", delaySeconds: 0, phase: 6, priority: "P0", sendLimit: "1_per_cycle", status: "active", sendCount: 23, updatedAt: "10d ago", emailRef: "Email 24B",
    conditions: ["sub_active=true", "billing=annual", "orders>limit+100"], suppressions: ["S31: service_stopped_email_sent_this_cycle=true"],
    branchOf: "T24G", branchPair: "T24", branchLabel: "B: Annual", branchCondition: "billing = annual" },
  { id: "T25", name: "Auto Plan Recommendation", event: "usage_pattern.detected", delay: "0s", delaySeconds: 0, phase: 6, priority: "P2", sendLimit: "1_per_60d", status: "active", sendCount: 89, updatedAt: "12d ago", emailRef: "Email 25",
    conditions: ["sub_active=true", "exceeded_2_of_3_cycles"], suppressions: ["S18: plan_upgraded_last_30d=true", "S37: auto_recommendation_sent_last_60d=true"],
    branchOf: null, branchPair: null },
  { id: "T25B", name: "Proactive Growth Upgrade", event: "usage_pattern.detected", delay: "0s", delaySeconds: 0, phase: 6, priority: "P3", sendLimit: "1_per_60d", status: "active", sendCount: 45, updatedAt: "15d ago", emailRef: "Email 25B",
    conditions: ["sub_active=true", "cycles>=2", "growth>30%", "usage<90%"], suppressions: ["S18: plan_upgraded_last_30d=true", "S19: cycle_usage>=90%", "S36: proactive_growth_sent_last_60d=true"],
    branchOf: null, branchPair: null },

  // Phase 7: Add-Ons
  { id: "T26", name: "Address Validation Intro", event: "time_based", delay: "7 days", delaySeconds: 604800, phase: 7, priority: "P3", sendLimit: "once", status: "active", sendCount: 345, updatedAt: "9d ago", emailRef: "Email 26",
    conditions: ["sub_active=true", "addr_valid=false"], suppressions: ["S20: address_validation_enabled=true"],
    branchOf: null, branchPair: null },
  { id: "T27", name: "Wallet Low (Annual)", event: "addr_valid.wallet_low", delay: "0s", delaySeconds: 0, phase: 7, priority: "P2", sendLimit: "1_per_30d", status: "active", sendCount: 78, updatedAt: "11d ago", emailRef: "Email 27",
    conditions: ["sub_active=true", "billing=annual", "addr_valid=true", "balance<$2"], suppressions: ["S21: billing=monthly", "S38: wallet_low_sent_last_30d=true"],
    branchOf: null, branchPair: null },
  { id: "T27B", name: "Wallet Charge Failed (Monthly)", event: "addr_valid.charge_failed", delay: "0s", delaySeconds: 0, phase: 7, priority: "P2", sendLimit: "1_per_30d", status: "active", sendCount: 34, updatedAt: "13d ago", emailRef: "Email 27B",
    conditions: ["sub_active=true", "billing=monthly", "addr_valid=true"], suppressions: ["S38: wallet_low_sent_last_30d=true"],
    branchOf: null, branchPair: null },

  // Phase 8: Recovery
  { id: "T28", name: "Uninstall Survey", event: "app.uninstalled", delay: "1 hr", delaySeconds: 3600, phase: 8, priority: "P1", sendLimit: "once", status: "active", sendCount: 567, updatedAt: "3d ago", emailRef: "Email 28",
    conditions: ["app_installed=false"], suppressions: ["S41: uninstall_survey_sent=true"],
    branchOf: null, branchPair: null },
  { id: "T28B", name: "Non-Responder Recovery", event: "time_based", delay: "Day 2", delaySeconds: 172800, phase: 8, priority: "P2", sendLimit: "once", status: "active", sendCount: 234, updatedAt: "6d ago", emailRef: "Email 28B",
    conditions: ["app_installed=false", "survey_response=null", "days_since_uninstall=2"], suppressions: ["S22: app_reinstalled=true", "S23: survey_response!=null"],
    branchOf: null, branchPair: null },
  { id: "T29", name: "Recovery A — Too Expensive", event: "survey.response", delay: "24 hr", delaySeconds: 86400, phase: 8, priority: "P2", sendLimit: "once", status: "active", sendCount: 123, updatedAt: "6d ago", emailRef: "Email 29",
    conditions: ["app_installed=false", "response=too_expensive"], suppressions: ["S22: app_reinstalled=true", "S42: recovery_email_sent=true"],
    branchOf: null, branchPair: null },
  { id: "T30", name: "Recovery B — No Value", event: "survey.response", delay: "24 hr", delaySeconds: 86400, phase: 8, priority: "P2", sendLimit: "once", status: "active", sendCount: 89, updatedAt: "6d ago", emailRef: "Email 30",
    conditions: ["app_installed=false", "response=no_value"], suppressions: ["S22: app_reinstalled=true", "S42: recovery_email_sent=true"],
    branchOf: null, branchPair: null },
  { id: "T31", name: "Recovery C — Too Complex", event: "survey.response", delay: "24 hr", delaySeconds: 86400, phase: 8, priority: "P2", sendLimit: "once", status: "active", sendCount: 56, updatedAt: "6d ago", emailRef: "Email 31",
    conditions: ["app_installed=false", "response=too_complex"], suppressions: ["S22: app_reinstalled=true", "S42: recovery_email_sent=true"],
    branchOf: null, branchPair: null },
  { id: "T31B", name: "Recovery D — Other Reason", event: "survey.response", delay: "24 hr", delaySeconds: 86400, phase: 8, priority: "P2", sendLimit: "once", status: "active", sendCount: 34, updatedAt: "6d ago", emailRef: "Email 31B",
    conditions: ["app_installed=false", "response=other"], suppressions: ["S22: app_reinstalled=true", "S42: recovery_email_sent=true"],
    branchOf: null, branchPair: null },
  { id: "T32", name: "7-Day FOMO Check-In", event: "time_based", delay: "Day 7", delaySeconds: 604800, phase: 8, priority: "P3", sendLimit: "once", status: "active", sendCount: 345, updatedAt: "9d ago", emailRef: "Email 32",
    conditions: ["app_installed=false", "days_since=7"], suppressions: ["S22: app_reinstalled=true"],
    branchOf: null, branchPair: null },
  { id: "T33", name: "30-Day Final Reactivation", event: "time_based", delay: "Day 30", delaySeconds: 2592000, phase: 8, priority: "P3", sendLimit: "once", status: "active", sendCount: 234, updatedAt: "14d ago", emailRef: "Email 33",
    conditions: ["app_installed=false", "days_since=30"], suppressions: ["S22: app_reinstalled=true"],
    branchOf: null, branchPair: null },
  { id: "T33B", name: "60-Day Extended Win-Back", event: "time_based", delay: "Day 60", delaySeconds: 5184000, phase: 8, priority: "P3", sendLimit: "once", status: "active", sendCount: 67, updatedAt: "20d ago", emailRef: "Email 33B",
    conditions: ["app_installed=false", "days_since=60"], suppressions: ["S22: app_reinstalled=true"],
    branchOf: null, branchPair: null },
  { id: "T33C", name: "90-Day Last Chance Win-Back", event: "time_based", delay: "Day 90", delaySeconds: 7776000, phase: 8, priority: "P3", sendLimit: "once", status: "active", sendCount: 23, updatedAt: "25d ago", emailRef: "Email 33C",
    conditions: ["app_installed=false", "days_since=90"], suppressions: ["S22: app_reinstalled=true"],
    branchOf: null, branchPair: null },

  // Phase 9: Dunning
  { id: "T34", name: "Payment Failed — Day 1", event: "subscription.charge_failed", delay: "0s", delaySeconds: 0, phase: 9, priority: "P0", sendLimit: "once", status: "active", sendCount: 78, updatedAt: "10d ago", emailRef: "Email 34",
    conditions: ["sub_status=expired/past_due", "billing_cycles>=1"], suppressions: ["S28: charge_recovered=true", "S39: dunning_complete=true"],
    branchOf: null, branchPair: null },
  { id: "T35", name: "Payment Failed — Day 3", event: "subscription.charge_failed", delay: "3 days", delaySeconds: 259200, phase: 9, priority: "P0", sendLimit: "once", status: "active", sendCount: 45, updatedAt: "12d ago", emailRef: "Email 35",
    conditions: ["sub_status=expired/past_due", "charge_recovered=false"], suppressions: ["S28: charge_recovered=true", "S39: dunning_complete=true"],
    branchOf: null, branchPair: null },
  { id: "T36", name: "Payment Failed — Day 7 Final", event: "subscription.charge_failed", delay: "7 days", delaySeconds: 604800, phase: 9, priority: "P0", sendLimit: "once", status: "active", sendCount: 23, updatedAt: "15d ago", emailRef: "Email 36",
    conditions: ["sub_status=expired/past_due", "charge_recovered=false"], suppressions: ["S28: charge_recovered=true", "S39: dunning_complete=true"],
    branchOf: null, branchPair: null },
  { id: "T37", name: "Service Expired (Dunning)", event: "subscription.expired", delay: "0s", delaySeconds: 0, phase: 9, priority: "P0", sendLimit: "once", status: "active", sendCount: 12, updatedAt: "18d ago", emailRef: "Email 37",
    conditions: ["sub_active=false", "charge_recovered=false", "dunning_complete=true"], suppressions: ["S28: charge_recovered=true"],
    branchOf: null, branchPair: null },
];

// Build grouped triggers for A/B display
export function getGroupedTriggers(triggers) {
  const groups = [];
  const seen = new Set();
  for (const t of triggers) {
    if (seen.has(t.id)) continue;
    if (t.branchOf && t.branchPair) {
      const pair = triggers.find(x => x.id === t.branchPair);
      if (pair && !seen.has(pair.id)) {
        groups.push({ type: "branch", groupName: t.branchOf, triggers: [t, pair] });
        seen.add(t.id);
        seen.add(pair.id);
      } else {
        groups.push({ type: "single", triggers: [t] });
        seen.add(t.id);
      }
    } else {
      groups.push({ type: "single", triggers: [t] });
      seen.add(t.id);
    }
  }
  return groups;
}

export const VARIABLES = [
  { category: "Merchant", items: ["{merchant_name}", "{store_name}"] },
  { category: "Plan & Billing", items: ["{plan_name}", "{plan_price}", "{plan_limit}", "{annual_price}", "{annual_total}", "{annual_savings}", "{first_charge_date}", "{billing_url}"] },
  { category: "Trial", items: ["{trial_days_remaining}", "{trial_end_date}"] },
  { category: "Usage", items: ["{order_count}", "{order_limit_pct}", "{orders_remaining}", "{total_edits}", "{edit_rate}", "{cycle_reset_date}", "{headroom_pct}"] },
  { category: "Impact", items: ["{prevented_cancellations}", "{support_hours_saved}", "{protected_revenue}", "{aov}"] },
  { category: "Volume Tiers", items: ["{next_tier_name}", "{next_tier_limit}", "{next_tier_price}", "{upgrade_price_diff}"] },
  { category: "Add-Ons", items: ["{addr_balance}", "{addr_balance_days}", "{booster_price_500}", "{booster_price_1000}"] },
  { category: "Recovery", items: ["{survey_response}", "{days_since_uninstall}", "{uninstall_date}", "{reinstall_url}"] },
  { category: "Dunning", items: ["{payment_method_last4}", "{payment_update_url}", "{days_since_payment_fail}"] },
  { category: "NPS & Retention", items: ["{nps_score}", "{last_edit_date}", "{days_since_last_edit}", "{widget_status}", "{month1_orders}", "{month2_orders}"] },
  { category: "Links", items: ["{dashboard_url}", "{calendly_url}", "{crisp_url}", "{widget_status_url}"] },
];

export const AUTOMATION_LOG = [
  { time: "14:23", merchant: "bluesky-apparel.myshopify.com", trigger: "T02", result: "sent", reason: "" },
  { time: "14:18", merchant: "outdoor-gear.myshopify.com", trigger: "T02", result: "suppressed", reason: "S01: trial_started=true" },
  { time: "13:55", merchant: "tech-gadgets.myshopify.com", trigger: "T09", result: "sent", reason: "" },
  { time: "13:41", merchant: "fashion-hub.myshopify.com", trigger: "T34", result: "sent", reason: "" },
  { time: "13:22", merchant: "home-decor.myshopify.com", trigger: "T05", result: "queued", reason: "" },
  { time: "12:58", merchant: "pet-supply.myshopify.com", trigger: "T01", result: "sent", reason: "" },
  { time: "12:34", merchant: "book-nook.myshopify.com", trigger: "T02", result: "suppressed", reason: "S02: charge_approved=true" },
  { time: "12:10", merchant: "sportswear.myshopify.com", trigger: "T16", result: "sent", reason: "" },
];

export const CAMPAIGNS = [
  { id: "c1", name: "Q1 Feature Launch", desc: "Announce address validation", audience: "Growth stores", count: 847, status: "sent", date: "Mar 1, 2026", open: 34.2, click: 12.8 },
  { id: "c2", name: "Annual Plan Promo", desc: "20% off annual billing", audience: "All active plans", count: 2341, status: "scheduled", date: "Mar 15, 2026", open: null, click: null },
  { id: "c3", name: "Win-back March", desc: "Monthly win-back blast", audience: "Uninstalled 30d", count: 156, status: "draft", date: null, open: null, click: null },
];

export const SUPPRESSION_DATA = {
  bounces: [
    { email: "info@closedshop.com", store: "closedshop.myshopify.com", reason: "Hard bounce", source: "Webhook", date: "Mar 10" },
    { email: "admin@teststore.com", store: "teststore.myshopify.com", reason: "Soft bounce", source: "Webhook", date: "Mar 8" },
  ],
  unsubscribes: [
    { email: "sarah@bluesky.com", store: "bluesky-apparel.myshopify.com", reason: "Unsubscribed", source: "Link click", date: "Mar 11" },
  ],
  manual: [
    { email: "spam@example.com", store: "—", reason: "Manual block", source: "Admin", date: "Mar 7" },
  ],
};
