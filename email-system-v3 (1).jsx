import { useState, useEffect, useCallback, useRef, useMemo } from "react";

// ============================================================
// CONSTANTS & DATA — v3 FINAL (58 Triggers, 9 Phases)
// ============================================================

const PHASES = [
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

const PRIORITY_TIERS = [
  { id: "P0", label: "P0 · Critical", color: "#E53935", bg: "#FDECEA", desc: "System/billing. Always sends, overrides suppressions." },
  { id: "P1", label: "P1 · High", color: "#FB8C00", bg: "#FFF3E0", desc: "Activation & onboarding. Time-sensitive." },
  { id: "P2", label: "P2 · Medium-High", color: "#FFB300", bg: "#FFF8E1", desc: "Conversion & upgrade prompts." },
  { id: "P3", label: "P3 · Medium", color: "#43A047", bg: "#E8F5E9", desc: "Engagement & feature discovery." },
  { id: "P4", label: "P4 · Low", color: "#3949AB", bg: "#E8EAF6", desc: "Informational. Suppressed if P0-P3 fired in 24h." },
  { id: "P5", label: "P5 · Lowest", color: "#9E9E9E", bg: "#F5F5F5", desc: "Win-back & seasonal. Most easily suppressed." },
];

const SEND_LIMIT_OPTIONS = [
  { value: "once", label: "Once" },
  { value: "max_2", label: "Max 2" },
  { value: "1_per_cycle", label: "1 per billing cycle" },
  { value: "1_per_30d", label: "1 per 30 days" },
  { value: "1_per_60d", label: "1 per 60 days" },
  { value: "every_90d", label: "Every 90 days" },
];

// Full 58-trigger dataset
const TRIGGERS = [
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
function getGroupedTriggers(triggers) {
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

const VARIABLES = [
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

const AUTOMATION_LOG = [
  { time: "14:23", merchant: "bluesky-apparel.myshopify.com", trigger: "T02", result: "sent", reason: "" },
  { time: "14:18", merchant: "outdoor-gear.myshopify.com", trigger: "T02", result: "suppressed", reason: "S01: trial_started=true" },
  { time: "13:55", merchant: "tech-gadgets.myshopify.com", trigger: "T09", result: "sent", reason: "" },
  { time: "13:41", merchant: "fashion-hub.myshopify.com", trigger: "T34", result: "sent", reason: "" },
  { time: "13:22", merchant: "home-decor.myshopify.com", trigger: "T05", result: "queued", reason: "" },
  { time: "12:58", merchant: "pet-supply.myshopify.com", trigger: "T01", result: "sent", reason: "" },
  { time: "12:34", merchant: "book-nook.myshopify.com", trigger: "T02", result: "suppressed", reason: "S02: charge_approved=true" },
  { time: "12:10", merchant: "sportswear.myshopify.com", trigger: "T16", result: "sent", reason: "" },
];

const CAMPAIGNS = [
  { id: "c1", name: "Q1 Feature Launch", desc: "Announce address validation", audience: "Growth stores", count: 847, status: "sent", date: "Mar 1, 2026", open: 34.2, click: 12.8 },
  { id: "c2", name: "Annual Plan Promo", desc: "20% off annual billing", audience: "All active plans", count: 2341, status: "scheduled", date: "Mar 15, 2026", open: null, click: null },
  { id: "c3", name: "Win-back March", desc: "Monthly win-back blast", audience: "Uninstalled 30d", count: 156, status: "draft", date: null, open: null, click: null },
];

const SUPPRESSION_DATA = {
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

// ============================================================
// INLINE SVG ICONS
// ============================================================
const I = {
  Mail: (s=18) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>,
  Send: (s=18) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m22 2-7 20-4-9-9-4z"/><path d="m22 2-11 11"/></svg>,
  Users: (s=18) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
  Chart: (s=18) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="20" x2="12" y2="10"/><line x1="18" y1="20" x2="18" y2="4"/><line x1="6" y1="20" x2="6" y2="16"/></svg>,
  Settings: (s=18) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/></svg>,
  Megaphone: (s=18) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 11 18-5v12L3 13v-2z"/><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"/></svg>,
  Shield: (s=18) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/></svg>,
  Zap: (s=16) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"/></svg>,
  Plus: (s=16) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>,
  Search: (s=16) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>,
  X: (s=14) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>,
  ArrowLeft: (s=16) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>,
  Edit: (s=14) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/></svg>,
  Copy: (s=14) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="14" height="14" x="8" y="8" rx="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>,
  Trash: (s=14) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>,
  ChevDown: (s=14) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>,
  Check: (s=14) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>,
  AlertTri: (s=16) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>,
  GitBranch: (s=14) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="6" y1="3" x2="6" y2="15"/><circle cx="18" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M18 9a9 9 0 0 1-9 9"/></svg>,
  Download: (s=14) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>,
  Upload: (s=14) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>,
  Eye: (s=14) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>,
};

// ============================================================
// STYLES
// ============================================================
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Figtree:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');
*{margin:0;padding:0;box-sizing:border-box}
:root{--pri:#0073EA;--pri-h:#0060C2;--pri-l:#CCE5FF;--t1:#323338;--t2:#676879;--t3:#9699A6;--bd:#E6E9EF;--bd-h:#C5C7D0;--bg:#FFFFFF;--bg2:#F6F7FB;--bg3:#F0F2F7;--ok:#00CA72;--ok-l:#D6F5E6;--warn:#FDAB3D;--err:#E44258;--err-l:#FDE8EC;--sh:0 1px 3px rgba(0,0,0,.08);--sh2:0 4px 12px rgba(0,0,0,.1);--r:4px;--r2:8px;--f:'Figtree',sans-serif;--m:'JetBrains Mono',monospace}
body{font-family:var(--f);color:var(--t1);background:var(--bg2)}
.app{display:flex;height:100vh;overflow:hidden}
.sb{width:232px;background:var(--bg);border-right:1px solid var(--bd);display:flex;flex-direction:column;flex-shrink:0}
.sb-logo{padding:16px;border-bottom:1px solid var(--bd);display:flex;align-items:center;gap:8px}
.sb-logo b{font-size:14px}.sb-logo small{font-size:9px;text-transform:uppercase;letter-spacing:.5px;color:var(--t3);display:block}
.sb-nav{flex:1;padding:6px;overflow-y:auto}
.sb-item{display:flex;align-items:center;gap:8px;padding:7px 10px;border-radius:var(--r);cursor:pointer;font-size:13px;color:var(--t2);transition:all .12s;user-select:none}
.sb-item:hover{background:var(--bg3);color:var(--t1)}.sb-item.on{background:var(--pri-l);color:var(--pri);font-weight:500}
.sb-item.dim{opacity:.45;pointer-events:none}.sb-indent{padding-left:36px;font-size:12.5px}
.sb-hd{padding:8px 10px 3px;font-size:9.5px;font-weight:600;text-transform:uppercase;letter-spacing:.7px;color:var(--t3)}
.main{flex:1;display:flex;flex-direction:column;overflow:hidden}
.topbar{height:48px;background:var(--bg);border-bottom:1px solid var(--bd);display:flex;align-items:center;justify-content:space-between;padding:0 20px;flex-shrink:0}
.content{flex:1;overflow-y:auto;padding:20px}
.pg-hd{display:flex;align-items:center;justify-content:space-between;margin-bottom:16px}
.pg-title{font-size:22px;font-weight:700;display:flex;align-items:center;gap:8px}
.badge{padding:2px 8px;border-radius:10px;font-size:11px;font-weight:600;border:1px solid var(--bd);background:var(--bg2);color:var(--t2)}
.btn{display:inline-flex;align-items:center;gap:5px;padding:7px 14px;border-radius:var(--r);font-size:13px;font-weight:500;font-family:var(--f);cursor:pointer;border:none;transition:all .12s;white-space:nowrap}
.btn-p{background:var(--pri);color:#fff}.btn-p:hover{background:var(--pri-h)}
.btn-s{background:var(--bg);color:var(--t1);border:1px solid var(--bd)}.btn-s:hover{border-color:var(--bd-h);background:var(--bg3)}
.btn-g{background:transparent;color:var(--t2)}.btn-g:hover{background:var(--bg3);color:var(--t1)}
.btn-sm{padding:4px 8px;font-size:11px}.btn-d{background:var(--err);color:#fff}.btn-d:hover{background:#D03048}
.btn-icon{padding:5px;border-radius:var(--r)}
.fbar{display:flex;align-items:center;gap:8px;margin-bottom:16px;flex-wrap:wrap}
.fsel{padding:6px 26px 6px 9px;border:1px solid var(--bd);border-radius:var(--r);font-size:12px;font-family:var(--f);color:var(--t1);background:#fff url("data:image/svg+xml,%3Csvg width='10' height='6' viewBox='0 0 10 6' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1L5 5L9 1' stroke='%23676879' stroke-width='1.5' stroke-linecap='round'/%3E%3C/svg%3E") no-repeat right 8px center;appearance:none;cursor:pointer;min-width:130px}
.sinp-w{position:relative}.sinp-w .si{position:absolute;left:8px;top:50%;transform:translateY(-50%);color:var(--t3)}
.sinp{padding:6px 9px 6px 28px;border:1px solid var(--bd);border-radius:var(--r);font-size:12px;font-family:var(--f);color:var(--t1);width:200px}
.sinp:focus{outline:none;border-color:var(--pri);box-shadow:0 0 0 2px var(--pri-l)}
.cards{display:grid;grid-template-columns:repeat(3,1fr);gap:14px}
@media(max-width:1100px){.cards{grid-template-columns:repeat(2,1fr)}}
.tcard{background:var(--bg);border:1px solid var(--bd);border-radius:var(--r2);padding:14px;transition:all .15s;cursor:pointer;position:relative}
.tcard:hover{border-color:var(--pri);box-shadow:var(--sh2)}.tcard:hover .ca{opacity:1}
.ca{position:absolute;top:10px;right:10px;display:flex;gap:3px;opacity:0;transition:opacity .12s}
.ca button{width:26px;height:26px;border:1px solid var(--bd);background:#fff;border-radius:var(--r);cursor:pointer;display:flex;align-items:center;justify-content:center;color:var(--t2)}
.ca button:hover{background:var(--bg3);color:var(--t1)}
.tcard-top{display:flex;align-items:center;gap:6px;margin-bottom:8px;flex-wrap:wrap}
.ph-badge{padding:2px 7px;border-radius:3px;font-size:10px;font-weight:600}
.pri-badge{padding:1px 6px;border-radius:3px;font-size:10px;font-weight:700}
.tcard-name{font-size:14px;font-weight:600;color:var(--t1);margin-bottom:3px;line-height:1.3;padding-right:60px}
.tcard-id{font-family:var(--m);font-size:11px;color:var(--t3);margin-bottom:6px}
.tcard-trigger{display:inline-flex;align-items:center;gap:3px;padding:2px 7px;border-radius:3px;font-size:10.5px;font-family:var(--m);background:var(--bg2);color:var(--t2);border:1px solid var(--bd);margin-bottom:8px}
.tcard-foot{display:flex;align-items:center;justify-content:space-between;padding-top:8px;border-top:1px solid var(--bd);font-size:11px;color:var(--t3)}
.sdot{display:inline-block;width:7px;height:7px;border-radius:50%;margin-right:3px;vertical-align:middle}
.sdot.active{background:var(--ok)}.sdot.inactive{background:var(--t3)}.sdot.draft{background:var(--warn)}
.branch-card{background:var(--bg);border:1px solid var(--bd);border-radius:var(--r2);overflow:hidden;cursor:pointer;transition:all .15s}
.branch-card:hover{border-color:var(--pri);box-shadow:var(--sh2)}
.branch-header{padding:12px 14px;border-bottom:1px solid var(--bd);display:flex;align-items:center;justify-content:space-between}
.branch-header-left{display:flex;align-items:center;gap:6px}
.branch-body{display:grid;grid-template-columns:1fr 1fr;gap:0}
.branch-variant{padding:12px 14px;position:relative}
.branch-variant:first-child{border-right:1px solid var(--bd)}
.branch-variant-label{display:inline-flex;align-items:center;gap:4px;padding:2px 7px;border-radius:3px;font-size:10px;font-weight:600;margin-bottom:6px}
.branch-variant-name{font-size:13px;font-weight:600;color:var(--t1);margin-bottom:2px}
.branch-variant-cond{font-size:10.5px;font-family:var(--m);color:var(--t3)}
.branch-variant-stats{font-size:10.5px;color:var(--t3);margin-top:6px}
.branch-foot{padding:8px 14px;border-top:1px solid var(--bd);display:flex;align-items:center;justify-content:space-between;font-size:11px;color:var(--t3)}
.table{width:100%;border-collapse:collapse;background:var(--bg);border:1px solid var(--bd);border-radius:var(--r2);overflow:hidden}
.table th{padding:8px 14px;text-align:left;font-size:11px;font-weight:600;color:var(--t2);text-transform:uppercase;letter-spacing:.4px;background:var(--bg2);border-bottom:1px solid var(--bd)}
.table td{padding:10px 14px;font-size:12.5px;color:var(--t1);border-bottom:1px solid var(--bd)}
.table tr:last-child td{border-bottom:none}.table tr:hover td{background:var(--bg3)}
.schip{display:inline-flex;align-items:center;gap:3px;padding:2px 8px;border-radius:10px;font-size:11px;font-weight:500}
.schip.sent{background:var(--ok-l);color:#0A7B3E}.schip.scheduled{background:var(--pri-l);color:var(--pri)}.schip.draft{background:var(--bg2);color:var(--t2);border:1px solid var(--bd)}
.schip.cancelled{background:var(--err-l);color:var(--err)}.schip.queued{background:var(--pri-l);color:var(--pri)}
.schip.suppressed{background:var(--bg2);color:var(--t2)}.schip.failed{background:var(--err-l);color:var(--err)}
.tabs{display:flex;gap:0;border-bottom:1px solid var(--bd);margin-bottom:16px}
.tab{padding:8px 14px;font-size:13px;font-weight:500;color:var(--t2);cursor:pointer;border-bottom:2px solid transparent;transition:all .12s;user-select:none}
.tab:hover{color:var(--t1)}.tab.on{color:var(--pri);border-bottom-color:var(--pri)}
.metrics{display:grid;grid-template-columns:repeat(6,1fr);gap:10px;margin-bottom:20px}
.mc{background:var(--bg);border:1px solid var(--bd);border-radius:var(--r2);padding:14px;text-align:center}
.mc-v{font-size:24px;font-weight:700;color:var(--t1)}.mc-l{font-size:11px;color:var(--t2);font-weight:500}
.mc-d{font-size:10px;margin-top:3px}.mc-d.up{color:var(--ok)}.mc-d.dn{color:var(--err)}
.ed-layout{display:flex;height:calc(100vh - 108px);background:var(--bg);border:1px solid var(--bd);border-radius:var(--r2);overflow:hidden}
.ed-left{width:40%;border-right:1px solid var(--bd);overflow-y:auto;padding:20px}
.ed-right{width:60%;display:flex;flex-direction:column}
.ed-tabs{display:flex;border-bottom:1px solid var(--bd);background:var(--bg2)}
.ed-tab{padding:10px 18px;font-size:13px;font-weight:500;color:var(--t2);cursor:pointer;border-bottom:2px solid transparent}
.ed-tab.on{color:var(--pri);border-bottom-color:var(--pri);background:var(--bg)}
.ed-body{flex:1;overflow:hidden}
.html-ta{width:100%;height:100%;border:none;resize:none;padding:14px;font-family:var(--m);font-size:12.5px;line-height:1.6;outline:none;background:#1E1E2E;color:#CDD6F4}
.fg{margin-bottom:14px}.fl{display:block;font-size:12px;font-weight:600;color:var(--t1);margin-bottom:5px}
.fi{width:100%;padding:7px 10px;border:1px solid var(--bd);border-radius:var(--r);font-size:13px;font-family:var(--f);color:var(--t1)}
.fi:focus{outline:none;border-color:var(--pri);box-shadow:0 0 0 2px var(--pri-l)}
.fi::placeholder{color:var(--t3)}
.chk-row{display:flex;align-items:center;gap:7px;padding:3px 0;cursor:pointer}
.chk-row input[type="checkbox"]{width:15px;height:15px;accent-color:var(--pri);cursor:pointer}
.auto-sec{background:var(--bg);border:1px solid var(--bd);border-radius:var(--r2);padding:16px;margin-bottom:12px}
.auto-title{font-size:13px;font-weight:600;color:var(--t1);margin-bottom:10px;display:flex;align-items:center;gap:6px}
.cchip{display:inline-flex;align-items:center;gap:3px;padding:3px 8px;border-radius:var(--r);font-size:11px;font-family:var(--m);margin:2px 3px 2px 0}
.cchip.g{background:var(--ok-l);color:#0A7B3E}.cchip.r{background:var(--err-l);color:var(--err)}.cchip.b{background:var(--pri-l);color:var(--pri)}
.ed-foot{display:flex;align-items:center;justify-content:space-between;padding:10px 20px;border-top:1px solid var(--bd);background:var(--bg2)}
.ph-sb{width:210px;border-right:1px solid var(--bd);overflow-y:auto;background:var(--bg);flex-shrink:0}
.ph-sb-item{padding:10px 14px;cursor:pointer;border-left:3px solid transparent;transition:all .12s}
.ph-sb-item:hover{background:var(--bg3)}.ph-sb-item.on{border-left-color:var(--pri);background:var(--pri-l)}
.ph-sb-name{font-size:12px;font-weight:600;color:var(--t1)}.ph-sb-sub{font-size:10px;color:var(--t3)}
.supp-tabs{display:flex;gap:0;margin-bottom:16px}
.stab{padding:7px 14px;font-size:12px;font-weight:500;color:var(--t2);cursor:pointer;border:1px solid var(--bd);background:#fff}
.stab:first-child{border-radius:var(--r) 0 0 var(--r)}.stab:last-child{border-radius:0 var(--r) var(--r) 0}.stab:not(:first-child){border-left:none}
.stab.on{background:var(--pri);color:#fff;border-color:var(--pri)}
.env-b{padding:3px 8px;border-radius:var(--r);font-size:10px;font-weight:600;background:#E8F5E8;color:#258750;border:1px solid #C5E8C5}
.modal-ov{position:fixed;inset:0;background:rgba(0,0,0,.4);display:flex;align-items:center;justify-content:center;z-index:1000}
.modal{background:#fff;border-radius:var(--r2);box-shadow:0 8px 24px rgba(0,0,0,.12);width:500px;max-height:80vh;overflow:hidden}
.modal-h{padding:16px 20px;border-bottom:1px solid var(--bd);display:flex;align-items:center;justify-content:space-between}
.modal-h h3{font-size:16px;font-weight:700}.modal-b{padding:20px;overflow-y:auto;max-height:60vh}.modal-f{padding:12px 20px;border-top:1px solid var(--bd);display:flex;justify-content:flex-end;gap:6px}
.toast{position:fixed;bottom:20px;right:20px;padding:10px 18px;border-radius:var(--r2);font-size:13px;font-weight:500;z-index:2000;box-shadow:0 8px 24px rgba(0,0,0,.12);display:flex;align-items:center;gap:6px;animation:su .3s ease;color:#fff}
.toast.ok{background:#0A7B3E}.toast.err{background:var(--err)}
@keyframes su{from{transform:translateY(16px);opacity:0}to{transform:translateY(0);opacity:1}}
.var-pick{position:absolute;top:100%;left:0;background:#fff;border:1px solid var(--bd);border-radius:var(--r2);box-shadow:var(--sh2);z-index:100;width:300px;max-height:360px;overflow-y:auto}
.var-cat{padding:6px 10px;font-size:10px;font-weight:600;text-transform:uppercase;letter-spacing:.4px;color:var(--t3);background:var(--bg2);border-bottom:1px solid var(--bd)}
.var-item{padding:6px 10px;cursor:pointer;font-family:var(--m);font-size:11px;color:var(--pri);border-bottom:1px solid var(--bd)}
.var-item:hover{background:var(--bg3)}
.funnel{display:flex;align-items:flex-end;gap:2px;height:180px;padding:16px 0}
.funnel-s{flex:1;display:flex;flex-direction:column;align-items:center;gap:6px}
.funnel-bar{width:100%;border-radius:4px 4px 0 0;min-height:16px}
.funnel-l{font-size:10px;color:var(--t2);text-align:center;font-weight:500}
.funnel-v{font-size:13px;font-weight:700;color:var(--t1)}.funnel-p{font-size:10px;color:var(--t3)}
.wiz-steps{display:flex;align-items:center;gap:0;margin-bottom:28px;padding:16px 0}
.wiz-s{display:flex;align-items:center;gap:6px;flex:1}
.wiz-n{width:28px;height:28px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:600;border:2px solid var(--bd);color:var(--t3);background:#fff;flex-shrink:0}
.wiz-s.on .wiz-n{border-color:var(--pri);color:#fff;background:var(--pri)}.wiz-s.done .wiz-n{border-color:var(--ok);color:#fff;background:var(--ok)}
.wiz-label{font-size:12px;font-weight:500;color:var(--t3)}.wiz-s.on .wiz-label{color:var(--pri);font-weight:600}.wiz-s.done .wiz-label{color:var(--ok)}
.wiz-line{flex:1;height:2px;background:var(--bd);margin:0 6px}.wiz-line.done{background:var(--ok)}
::-webkit-scrollbar{width:5px}::-webkit-scrollbar-track{background:transparent}::-webkit-scrollbar-thumb{background:var(--bd-h);border-radius:3px}
.tl-item{display:flex;align-items:center;gap:14px;padding:12px 14px;border-bottom:1px solid var(--bd);cursor:pointer;transition:background .12s}
.tl-item:hover{background:var(--bg3)}
.tl-pos{width:36px;text-align:center;flex-shrink:0}.tl-info{flex:1;min-width:0}.tl-name{font-size:13px;font-weight:600;color:var(--t1)}
.tl-sub{font-size:11px;color:var(--t2);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.tl-meta{display:flex;align-items:center;gap:6px;flex-shrink:0}
`;

// ============================================================
// COMPONENTS
// ============================================================

function PhaseBadge({ phase }) {
  const p = PHASES.find(x => x.id === phase);
  if (!p) return null;
  return <span className="ph-badge" style={{ background: p.bg, color: p.color }}>{p.short}</span>;
}

function PriorityBadge({ priority }) {
  const t = PRIORITY_TIERS.find(x => x.id === priority);
  if (!t) return null;
  return <span className="pri-badge" style={{ background: t.bg, color: t.color }} title={t.desc}>{t.id}</span>;
}

function StatusChip({ status }) {
  return <span className={`schip ${status}`}>{status.charAt(0).toUpperCase() + status.slice(1)}</span>;
}

function Toast({ msg, type, onClose }) {
  useEffect(() => { const t = setTimeout(onClose, 3000); return () => clearTimeout(t); }, [onClose]);
  return <div className={`toast ${type}`}>{type === "ok" ? I.Check() : I.AlertTri()} {msg}</div>;
}

function VarPicker({ onSelect, onClose }) {
  return (
    <div className="var-pick" onClick={e => e.stopPropagation()}>
      {VARIABLES.map(cat => (
        <div key={cat.category}>
          <div className="var-cat">{cat.category}</div>
          {cat.items.map(v => (
            <div key={v} className="var-item" onClick={() => { onSelect(v); onClose(); }}>{v}</div>
          ))}
        </div>
      ))}
    </div>
  );
}

// ============================================================
// EMAIL CENTER — Card Grid with A/B Branch Grouping
// ============================================================

function EmailCenter({ onEdit }) {
  const [phaseF, setPhaseF] = useState("all");
  const [priF, setPriF] = useState("all");
  const [statusF, setStatusF] = useState("all");
  const [search, setSearch] = useState("");

  const filtered = TRIGGERS.filter(t => {
    if (phaseF !== "all" && t.phase !== Number(phaseF)) return false;
    if (priF !== "all" && t.priority !== priF) return false;
    if (statusF !== "all" && t.status !== statusF) return false;
    if (search) { const s = search.toLowerCase(); return t.name.toLowerCase().includes(s) || t.id.toLowerCase().includes(s) || t.event.toLowerCase().includes(s); }
    return true;
  });

  const groups = getGroupedTriggers(filtered);
  const activeCount = TRIGGERS.filter(t => t.status === "active").length;

  return (
    <div>
      <div className="pg-hd">
        <div className="pg-title">Email Center <span className="badge">{activeCount} active · 58 triggers</span></div>
        <button className="btn btn-p" onClick={() => onEdit(null)}>{I.Plus()} Create Template</button>
      </div>
      <div className="fbar">
        <select className="fsel" value={phaseF} onChange={e => setPhaseF(e.target.value)}>
          <option value="all">All Phases</option>
          {PHASES.map(p => <option key={p.id} value={p.id}>{p.short}: {p.name}</option>)}
        </select>
        <select className="fsel" value={priF} onChange={e => setPriF(e.target.value)}>
          <option value="all">All Priorities</option>
          {PRIORITY_TIERS.map(t => <option key={t.id} value={t.id}>{t.label}</option>)}
        </select>
        <select className="fsel" value={statusF} onChange={e => setStatusF(e.target.value)}>
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
          <option value="draft">Draft</option>
        </select>
        <div className="sinp-w">
          <span className="si">{I.Search()}</span>
          <input type="text" className="sinp" placeholder="Search triggers..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>
      </div>
      <div className="cards">
        {groups.map((g, gi) => {
          if (g.type === "branch") {
            const [a, b] = g.triggers;
            const phase = PHASES.find(p => p.id === a.phase);
            return (
              <div key={gi} className="branch-card">
                <div className="branch-header">
                  <div className="branch-header-left">
                    <PhaseBadge phase={a.phase} />
                    <PriorityBadge priority={a.priority} />
                    <span style={{ fontFamily: "var(--m)", fontSize: 11, color: "var(--t3)" }}>{a.id.replace(/[AB]$/, '')}*</span>
                    <span style={{ display: "inline-flex", alignItems: "center", gap: 3, color: "var(--t2)", fontSize: 11 }}>{I.GitBranch()} Branched</span>
                  </div>
                  <span className="tcard-trigger">{I.Zap()} {a.event} · {a.delay}</span>
                </div>
                <div className="branch-body">
                  {[a, b].map((v, vi) => (
                    <div key={v.id} className="branch-variant" onClick={() => onEdit(v)}>
                      <div className="branch-variant-label" style={{ background: vi === 0 ? "#E8F5E9" : "#FFF3E0", color: vi === 0 ? "#43A047" : "#FB8C00" }}>
                        {v.branchLabel}
                      </div>
                      <div className="branch-variant-name">{v.name}</div>
                      <div className="branch-variant-cond">{v.branchCondition}</div>
                      <div className="branch-variant-stats">
                        <span className={`sdot ${v.status}`} /> {v.status} · Sent {v.sendCount.toLocaleString()}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="branch-foot">
                  <span>Combined: {(a.sendCount + b.sendCount).toLocaleString()} sends</span>
                  <span>{a.updatedAt}</span>
                </div>
              </div>
            );
          }
          const t = g.triggers[0];
          return (
            <div key={gi} className="tcard" onClick={() => onEdit(t)}>
              <div className="ca">
                <button title="Edit" onClick={e => { e.stopPropagation(); onEdit(t); }}>{I.Edit()}</button>
                <button title="Duplicate">{I.Copy()}</button>
                <button title="Delete">{I.Trash()}</button>
              </div>
              <div className="tcard-top">
                <PhaseBadge phase={t.phase} />
                <PriorityBadge priority={t.priority} />
                <span style={{ fontSize: 10, fontFamily: "var(--m)", color: "var(--t3)" }}>{t.id}</span>
              </div>
              <div className="tcard-name">{t.name}</div>
              <div className="tcard-trigger">{I.Zap()} {t.event} {t.delay !== "0s" ? `· ${t.delay}` : ""}</div>
              <div className="tcard-foot">
                <span><span className={`sdot ${t.status}`} />{t.status} · Sent {t.sendCount.toLocaleString()}</span>
                <span>{t.updatedAt}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ============================================================
// TEMPLATE EDITOR — Full-page with v3 fields
// ============================================================

function TemplateEditor({ trigger, onBack, onSave }) {
  const [edTab, setEdTab] = useState("html");
  const [name, setName] = useState(trigger?.name || "");
  const [subject, setSubject] = useState(trigger ? `Subject for ${trigger.name}` : "");
  const [event, setEvent] = useState(trigger?.event || "");
  const [scheduled, setScheduled] = useState(trigger?.delaySeconds > 0);
  const [sendLimit, setSendLimit] = useState(trigger?.sendLimit || "once");
  const [priority, setPriority] = useState(trigger?.priority || "P3");
  const [status, setStatus] = useState(trigger?.status === "active");
  const [showVP, setShowVP] = useState(false);
  const [html, setHtml] = useState(trigger ? `<!-- ${trigger.id}: ${trigger.name} -->\n<html>\n<body>\n  <h1>Hello {merchant_name},</h1>\n  <p>${trigger.name} email content</p>\n</body>\n</html>` : "");

  const allEvents = [...new Set(TRIGGERS.map(t => t.event))].sort();

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 20px", borderBottom: "1px solid var(--bd)", background: "#fff" }}>
        <button className="btn btn-g" onClick={onBack}>{I.ArrowLeft()} Back to Email Center</button>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          {trigger && <span style={{ fontFamily: "var(--m)", fontSize: 12, color: "var(--t3)" }}>{trigger.id}</span>}
          <span style={{ fontSize: 12, color: "var(--t2)" }}>Status:</span>
          <span onClick={() => setStatus(!status)} style={{ cursor: "pointer", display: "flex" }}>
            {status
              ? <svg width="32" height="18" viewBox="0 0 32 18"><rect width="32" height="18" rx="9" fill="#0073EA"/><circle cx="23" cy="9" r="6" fill="white"/></svg>
              : <svg width="32" height="18" viewBox="0 0 32 18"><rect width="32" height="18" rx="9" fill="#C5C7D0"/><circle cx="9" cy="9" r="6" fill="white"/></svg>}
          </span>
        </div>
      </div>

      <div className="ed-layout" style={{ flex: 1, margin: 0, borderRadius: 0, border: "none" }}>
        <div className="ed-left">
          <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 16 }}>Settings</h3>
          <div className="fg"><label className="fl">Internal Name</label><input className="fi" value={name} onChange={e => setName(e.target.value)} placeholder="Welcome Email" /></div>
          <div className="fg">
            <label className="fl" style={{ display: "flex", justifyContent: "space-between" }}>
              Subject Line
              <span style={{ fontSize: 11, color: "var(--pri)", cursor: "pointer", position: "relative", fontWeight: 500 }} onClick={() => setShowVP(!showVP)}>
                {"{Insert Variable}"}
                {showVP && <VarPicker onSelect={v => setSubject(s => s + v)} onClose={() => setShowVP(false)} />}
              </span>
            </label>
            <input className="fi" value={subject} onChange={e => setSubject(e.target.value)} placeholder="Welcome to {store_name}" />
          </div>
          <div className="fg"><label className="fl">Trigger Event</label>
            <select className="fsel" style={{ width: "100%" }} value={event} onChange={e => setEvent(e.target.value)}>
              <option value="">Select trigger event...</option>
              {allEvents.map(ev => <option key={ev} value={ev}>{ev}</option>)}
            </select>
          </div>
          <div className="fg">
            <label className="chk-row"><input type="checkbox" checked={scheduled} onChange={e => setScheduled(e.target.checked)} /><span style={{ fontSize: 12 }}>Schedule delay</span></label>
            {scheduled && <div style={{ display: "flex", gap: 6, marginTop: 6 }}>
              <input className="fi" type="number" defaultValue={trigger?.delay?.match(/\d+/)?.[0] || 1} style={{ width: 56 }} />
              <select className="fsel" defaultValue="Minute"><option>Minute</option><option>Hour</option><option>Day</option></select>
            </div>}
          </div>
          <div className="fg"><label className="fl">Send Limit</label>
            <select className="fsel" style={{ width: "100%" }} value={sendLimit} onChange={e => setSendLimit(e.target.value)}>
              {SEND_LIMIT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </div>
          <div className="fg"><label className="fl">Priority Tier</label>
            <select className="fsel" style={{ width: "100%" }} value={priority} onChange={e => setPriority(e.target.value)}>
              {PRIORITY_TIERS.map(t => <option key={t.id} value={t.id}>{t.label}</option>)}
            </select>
            <div style={{ fontSize: 10, color: "var(--t3)", marginTop: 3 }}>{PRIORITY_TIERS.find(t => t.id === priority)?.desc}</div>
          </div>
          <div className="fg"><label className="fl">Plan Filter</label>
            {["All Plans", "Starter", "Growth", "Pro", "Scale", "Partner_test"].map(p => (
              <label key={p} className="chk-row"><input type="checkbox" defaultChecked={p === "All Plans"} /><span style={{ fontSize: 12 }}>{p}</span></label>
            ))}
          </div>

          {/* Automation Section */}
          {trigger && <>
            <div style={{ borderTop: "1px solid var(--bd)", margin: "16px 0" }} />
            <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 14, display: "flex", alignItems: "center", gap: 6 }}>{I.Zap()} Automation</h3>
            <div className="auto-sec">
              <div className="auto-title">Conditions <span style={{ fontSize: 10, color: "var(--t3)", fontWeight: 400 }}>AND — all must be true</span></div>
              {trigger.conditions.length > 0 ? trigger.conditions.map((c, i) => <span key={i} className="cchip g">{I.Check()} {c}</span>)
                : <span style={{ fontSize: 11, color: "var(--t3)" }}>No conditions</span>}
            </div>
            <div className="auto-sec">
              <div className="auto-title">Suppression Rules <span style={{ fontSize: 10, color: "var(--t3)", fontWeight: 400 }}>OR — any blocks send</span></div>
              {trigger.suppressions.length > 0 ? trigger.suppressions.map((s, i) => <span key={i} className="cchip r">{I.X()} {s}</span>)
                : <span style={{ fontSize: 11, color: "var(--t3)" }}>No suppression rules</span>}
              <div style={{ marginTop: 8 }}><button className="btn btn-sm btn-s">{I.Plus()} Add Rule</button></div>
            </div>
            <div className="auto-sec">
              <div className="auto-title">Live Statistics</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
                {[{ v: 3, l: "In Queue", c: "var(--pri)" }, { v: 47, l: "Sent Today", c: "var(--ok)" }, { v: 12, l: "Suppressed", c: "var(--t3)" }].map(s => (
                  <div key={s.l} style={{ textAlign: "center" }}>
                    <div style={{ fontSize: 18, fontWeight: 700, color: s.c }}>{s.v}</div>
                    <div style={{ fontSize: 10, color: "var(--t3)" }}>{s.l}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="auto-sec">
              <div className="auto-title">Recent Log</div>
              <table className="table" style={{ fontSize: 11 }}>
                <thead><tr><th>Time</th><th>Merchant</th><th>Result</th></tr></thead>
                <tbody>
                  {AUTOMATION_LOG.slice(0, 4).map((l, i) => (
                    <tr key={i}><td style={{ fontFamily: "var(--m)", fontSize: 10 }}>{l.time}</td><td style={{ fontSize: 10 }}>{l.merchant.split(".")[0]}</td><td><StatusChip status={l.result} /></td></tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>}
        </div>

        <div className="ed-right">
          <div className="ed-tabs">
            {[["html","HTML"],["preview","Preview"],["test","Test Send"]].map(([k,l]) => (
              <div key={k} className={`ed-tab ${edTab === k ? "on" : ""}`} onClick={() => setEdTab(k)}>{l}</div>
            ))}
          </div>
          <div className="ed-body" style={{ flex: 1 }}>
            {edTab === "html" && <textarea className="html-ta" value={html} onChange={e => setHtml(e.target.value)} placeholder="Write HTML here" spellCheck={false} />}
            {edTab === "preview" && <div style={{ padding: 20 }}><div style={{ background: "#fff", border: "1px solid var(--bd)", borderRadius: 8, padding: 28, maxWidth: 560, margin: "0 auto", minHeight: 260, fontSize: 13, color: "var(--t2)" }}>Preview renders here. Variables like {"{store_name}"} resolve to sample data.</div></div>}
            {edTab === "test" && <div style={{ padding: 20 }}><div className="fg"><label className="fl">Send test to:</label><div style={{ display: "flex", gap: 6 }}><input className="fi" placeholder="eric@accounteditor.com" style={{ flex: 1 }} /><button className="btn btn-p">{I.Send()} Send</button></div></div></div>}
          </div>
        </div>
      </div>

      <div className="ed-foot">
        <button className="btn btn-g" onClick={onBack}>Cancel</button>
        <div style={{ display: "flex", gap: 6 }}>
          <button className="btn btn-s" onClick={() => onSave("draft")}>Save Draft</button>
          <button className="btn btn-p" onClick={() => onSave("active")}>Save & Activate</button>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// CUSTOMER TEMPLATE — Phase sidebar + list view
// ============================================================

function CustomerTemplate({ onEdit }) {
  const [activePhase, setActivePhase] = useState(1);
  const phaseData = PHASES.find(p => p.id === activePhase);
  const phaseTriggers = TRIGGERS.filter(t => t.phase === activePhase);
  const groups = getGroupedTriggers(phaseTriggers);

  return (
    <div style={{ display: "flex", height: "calc(100vh - 92px)" }}>
      <div className="ph-sb">
        <div style={{ padding: "12px 14px", borderBottom: "1px solid var(--bd)" }}>
          <div style={{ fontSize: 13, fontWeight: 700 }}>Lifecycle Phases</div>
          <div style={{ fontSize: 11, color: "var(--t3)" }}>58 triggers · 9 phases</div>
        </div>
        {PHASES.map(p => {
          const count = TRIGGERS.filter(t => t.phase === p.id).length;
          return (
            <div key={p.id} className={`ph-sb-item ${activePhase === p.id ? "on" : ""}`} onClick={() => setActivePhase(p.id)}>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <div style={{ width: 5, height: 5, borderRadius: 3, background: p.color, flexShrink: 0 }} />
                <div className="ph-sb-name">{p.short}: {p.name}</div>
              </div>
              <div className="ph-sb-sub">{p.range} · {count} triggers</div>
            </div>
          );
        })}
      </div>
      <div style={{ flex: 1, overflow: "auto", background: "#fff" }}>
        <div style={{ padding: "12px 16px", borderBottom: "1px solid var(--bd)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <span style={{ fontSize: 15, fontWeight: 700 }}>{phaseData?.short}: {phaseData?.name}</span>
            <span style={{ fontSize: 12, color: "var(--t3)", marginLeft: 8 }}>{phaseData?.range} — {phaseData?.goalShort}</span>
          </div>
          <span className="ph-badge" style={{ background: phaseData?.bg, color: phaseData?.color }}>{phaseTriggers.length} triggers</span>
        </div>
        {groups.map((g, gi) => {
          if (g.type === "branch") {
            const [a, b] = g.triggers;
            return (
              <div key={gi} style={{ borderBottom: "1px solid var(--bd)" }}>
                <div style={{ padding: "10px 16px", display: "flex", alignItems: "center", gap: 8, background: "var(--bg2)" }}>
                  {I.GitBranch(12)}
                  <span style={{ fontSize: 12, fontWeight: 600, color: "var(--t1)" }}>Branched: {a.delay}</span>
                  <span className="tcard-trigger" style={{ margin: 0 }}>{a.event}</span>
                  <PriorityBadge priority={a.priority} />
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
                  {[a, b].map((v, vi) => (
                    <div key={v.id} className="tl-item" style={{ borderRight: vi === 0 ? "1px solid var(--bd)" : "none" }} onClick={() => onEdit(v)}>
                      <div>
                        <div className="branch-variant-label" style={{ background: vi === 0 ? "#E8F5E9" : "#FFF3E0", color: vi === 0 ? "#43A047" : "#FB8C00", marginBottom: 4, display: "inline-flex" }}>
                          {v.branchLabel}
                        </div>
                        <div className="tl-name">{v.name}</div>
                        <div className="tl-sub" style={{ fontFamily: "var(--m)", fontSize: 10 }}>{v.branchCondition}</div>
                      </div>
                      <div className="tl-meta"><StatusChip status={v.status} /></div>
                    </div>
                  ))}
                </div>
              </div>
            );
          }
          const t = g.triggers[0];
          return (
            <div key={gi} className="tl-item" onClick={() => onEdit(t)}>
              <div className="tl-pos">
                <span style={{ fontFamily: "var(--m)", fontSize: 11, fontWeight: 600, color: phaseData?.color }}>{t.id}</span>
              </div>
              <div className="tl-info">
                <div className="tl-name">{t.name}</div>
                <div style={{ display: "flex", gap: 5, marginTop: 4, flexWrap: "wrap", alignItems: "center" }}>
                  <span className="tcard-trigger" style={{ margin: 0 }}>{I.Zap()} {t.event} {t.delay !== "0s" ? `· ${t.delay}` : ""}</span>
                  <PriorityBadge priority={t.priority} />
                  {t.suppressions.length > 0 && <span style={{ fontSize: 10, color: "var(--t3)" }}>{t.suppressions.length} suppression{t.suppressions.length > 1 ? "s" : ""}</span>}
                </div>
              </div>
              <div className="tl-meta">
                <span style={{ fontSize: 11, color: "var(--t3)" }}>Sent {t.sendCount.toLocaleString()}</span>
                <StatusChip status={t.status} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ============================================================
// EMAIL MARKETING — Campaigns + 4-step wizard
// ============================================================

function EmailMarketing() {
  const [tab, setTab] = useState("all");
  const [wizard, setWizard] = useState(false);
  const [step, setStep] = useState(1);

  const filtered = CAMPAIGNS.filter(c => tab === "all" || c.status === tab);

  if (wizard) {
    return (
      <div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
          <button className="btn btn-g" onClick={() => { setWizard(false); setStep(1); }}>{I.ArrowLeft()} Back</button>
          <div style={{ fontSize: 16, fontWeight: 700 }}>New Campaign</div>
          <div />
        </div>
        <div className="wiz-steps">
          {["Audience", "Content", "Schedule", "Review"].map((l, i) => (
            <div key={l} style={{ display: "flex", alignItems: "center", flex: 1 }}>
              <div className={`wiz-s ${step === i + 1 ? "on" : step > i + 1 ? "done" : ""}`}>
                <div className="wiz-n">{step > i + 1 ? I.Check() : i + 1}</div>
                <div className="wiz-label">{l}</div>
              </div>
              {i < 3 && <div className={`wiz-line ${step > i + 1 ? "done" : ""}`} />}
            </div>
          ))}
        </div>
        <div style={{ background: "#fff", border: "1px solid var(--bd)", borderRadius: "var(--r2)", padding: 28, maxWidth: 600 }}>
          {step === 1 && <><h3 style={{ marginBottom: 16 }}>Audience</h3>
            <div className="fg"><label className="fl">Campaign Name *</label><input className="fi" placeholder="Q1 Feature Launch" /></div>
            <div className="fg"><label className="fl">Segment</label><select className="fsel" style={{ width: "100%" }}><option>Choose segment...</option><option>All Active</option><option>Growth Stores</option><option>Uninstalled 30d</option></select></div>
            <div style={{ background: "var(--pri-l)", padding: "10px 14px", borderRadius: "var(--r)", display: "flex", alignItems: "center", gap: 6, marginBottom: 12, fontSize: 12, fontWeight: 500 }}>{I.Users()} Estimated reach: <strong>847 merchants</strong></div>
          </>}
          {step === 2 && <><h3 style={{ marginBottom: 16 }}>Content</h3>
            <div className="fg"><label className="fl">Template</label><select className="fsel" style={{ width: "100%" }}><option>Browse Email Center...</option></select></div>
            <div className="fg"><label className="fl">Subject Line</label><input className="fi" defaultValue="Exciting new features!" /></div>
            <div className="fg"><label className="fl">Sender</label><input className="fi" defaultValue="Eric Williams" /></div>
          </>}
          {step === 3 && <><h3 style={{ marginBottom: 16 }}>Schedule</h3>
            {["Send now", "Schedule for later", "Merchant timezone"].map(o => <label key={o} className="chk-row" style={{ padding: "6px 0" }}><input type="radio" name="sched" defaultChecked={o === "Send now"} /><span style={{ fontSize: 12 }}>{o}</span></label>)}
          </>}
          {step === 4 && <><h3 style={{ marginBottom: 16 }}>Review & Send</h3>
            <div style={{ background: "var(--bg2)", border: "1px solid var(--bd)", borderRadius: "var(--r2)", padding: 16 }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, fontSize: 13 }}>
                <div><span style={{ fontSize: 11, color: "var(--t3)" }}>Audience</span><div style={{ fontWeight: 600 }}>Growth — 847</div></div>
                <div><span style={{ fontSize: 11, color: "var(--t3)" }}>Send</span><div style={{ fontWeight: 600 }}>Immediately</div></div>
              </div>
            </div>
          </>}
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 24 }}>
            <button className="btn btn-s" onClick={() => setStep(Math.max(1, step - 1))} disabled={step === 1}>Previous</button>
            {step < 4 ? <button className="btn btn-p" onClick={() => setStep(step + 1)}>Next</button>
              : <button className="btn btn-p" onClick={() => { setWizard(false); setStep(1); }}>Confirm & Send</button>}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="pg-hd">
        <div className="pg-title">Email Marketing <span className="badge">{CAMPAIGNS.length}</span></div>
        <button className="btn btn-p" onClick={() => setWizard(true)}>{I.Plus()} New Campaign</button>
      </div>
      <div className="tabs">{["all","sent","scheduled","draft","cancelled"].map(t => <div key={t} className={`tab ${tab === t ? "on" : ""}`} onClick={() => setTab(t)}>{t[0].toUpperCase() + t.slice(1)}</div>)}</div>
      <table className="table">
        <thead><tr><th>Campaign</th><th>Audience</th><th>Status</th><th>Date</th><th>Open</th><th>Click</th><th>Actions</th></tr></thead>
        <tbody>{filtered.map(c => <tr key={c.id}>
          <td><div style={{ fontWeight: 600 }}>{c.name}</div><div style={{ fontSize: 11, color: "var(--t3)" }}>{c.desc}</div></td>
          <td><div>{c.audience}</div><div style={{ fontSize: 10, color: "var(--t3)" }}>{c.count.toLocaleString()}</div></td>
          <td><StatusChip status={c.status} /></td><td style={{ fontSize: 12 }}>{c.date || "—"}</td>
          <td style={{ fontWeight: 600 }}>{c.open != null ? `${c.open}%` : "—"}</td>
          <td style={{ fontWeight: 600 }}>{c.click != null ? `${c.click}%` : "—"}</td>
          <td><button className="btn btn-sm btn-g">{c.status === "sent" ? "Report" : "Edit"}</button></td>
        </tr>)}</tbody>
      </table>
    </div>
  );
}

// ============================================================
// EMAIL ANALYTICS — Metrics + Funnel + Per-template table
// ============================================================

function EmailAnalytics() {
  const [range, setRange] = useState("30");
  const metrics = [
    { l: "Sent", v: "12,847", d: "+18%", up: true },
    { l: "Delivery", v: "97.3%", d: "+0.5%", up: true },
    { l: "Open Rate", v: "34.2%", d: "+2.1%", up: true },
    { l: "Click Rate", v: "12.8%", d: "-0.3%", up: false },
    { l: "Bounce", v: "2.7%", d: "-0.5%", up: true },
    { l: "Unsub", v: "0.4%", d: "+0.1%", up: false },
  ];
  const funnel = [
    { l: "Install", v: 4821, p: "100%", c: PHASES[0].color, h: 100 },
    { l: "Trial", v: 2845, p: "59%", c: PHASES[1].color, h: 59 },
    { l: "Widget", v: 2234, p: "78%", c: PHASES[2].color, h: 46 },
    { l: "1st Edit", v: 1678, p: "75%", c: PHASES[2].color, h: 35 },
    { l: "Day 7", v: 1523, p: "91%", c: PHASES[3].color, h: 32 },
    { l: "Convert", v: 567, p: "37%", c: PHASES[4].color, h: 12 },
    { l: "Retain", v: 456, p: "80%", c: PHASES[4].color, h: 9 },
  ];

  return (
    <div>
      <div className="pg-hd">
        <div className="pg-title">Email Analytics</div>
        <select className="fsel" value={range} onChange={e => setRange(e.target.value)}><option value="7">7 days</option><option value="30">30 days</option><option value="90">90 days</option></select>
      </div>
      <div className="metrics">{metrics.map(m => <div key={m.l} className="mc"><div className="mc-v">{m.v}</div><div className="mc-l">{m.l}</div><div className={`mc-d ${m.up ? "up" : "dn"}`}>{m.d}</div></div>)}</div>
      <div style={{ background: "#fff", border: "1px solid var(--bd)", borderRadius: "var(--r2)", padding: 20, marginBottom: 20 }}>
        <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 12 }}>Lifecycle Funnel</h3>
        <div className="funnel">{funnel.map((s, i) => <div key={s.l} className="funnel-s"><div className="funnel-v">{s.v.toLocaleString()}</div><div className="funnel-bar" style={{ height: `${s.h}%`, background: s.c }} /><div className="funnel-l">{s.l}</div><div className="funnel-p">{s.p}</div></div>)}</div>
      </div>
      <div style={{ background: "#fff", border: "1px solid var(--bd)", borderRadius: "var(--r2)", overflow: "hidden" }}>
        <div style={{ padding: "12px 16px", borderBottom: "1px solid var(--bd)" }}><h3 style={{ fontSize: 15, fontWeight: 700 }}>Per-Trigger Performance</h3></div>
        <table className="table" style={{ border: "none" }}>
          <thead><tr><th>Trigger</th><th>Pri</th><th>Sent</th><th>Delivered</th><th>Opened</th><th>Clicked</th><th>Bounced</th></tr></thead>
          <tbody>{TRIGGERS.slice(0, 12).map(t => <tr key={t.id}>
            <td><div style={{ display: "flex", alignItems: "center", gap: 6 }}><PhaseBadge phase={t.phase} /><span style={{ fontWeight: 500 }}>{t.id}: {t.name}</span></div></td>
            <td><PriorityBadge priority={t.priority} /></td>
            <td style={{ fontWeight: 600 }}>{t.sendCount.toLocaleString()}</td>
            <td>{Math.round(t.sendCount * 0.973).toLocaleString()} <span style={{ fontSize: 10, color: "var(--t3)" }}>97.3%</span></td>
            <td>{Math.round(t.sendCount * 0.342).toLocaleString()} <span style={{ fontSize: 10, color: "var(--t3)" }}>34.2%</span></td>
            <td>{Math.round(t.sendCount * 0.128).toLocaleString()} <span style={{ fontSize: 10, color: "var(--t3)" }}>12.8%</span></td>
            <td>{Math.round(t.sendCount * 0.027).toLocaleString()} <span style={{ fontSize: 10, color: "var(--t3)" }}>2.7%</span></td>
          </tr>)}</tbody>
        </table>
      </div>
    </div>
  );
}

// ============================================================
// SUPPRESSION MANAGEMENT — Address-level (Feature 8)
// ============================================================

function SuppressionMgmt() {
  const [tab, setTab] = useState("bounces");
  const [showAdd, setShowAdd] = useState(false);
  const data = SUPPRESSION_DATA[tab] || [];
  const counts = { bounces: SUPPRESSION_DATA.bounces.length, unsubscribes: SUPPRESSION_DATA.unsubscribes.length, manual: SUPPRESSION_DATA.manual.length };

  return (
    <div>
      <div className="pg-hd">
        <div className="pg-title">Email Suppression</div>
        <div style={{ display: "flex", gap: 6 }}>
          <button className="btn btn-s" onClick={() => setShowAdd(true)}>{I.Plus()} Add Manually</button>
          <button className="btn btn-s">{I.Upload()} Import</button>
          <button className="btn btn-s">{I.Download()} Export</button>
        </div>
      </div>
      <div style={{ background: "#FFF8E1", border: "1px solid #F5E6B3", borderRadius: "var(--r2)", padding: "8px 14px", marginBottom: 16, display: "flex", alignItems: "center", gap: 6, fontSize: 12 }}>
        {I.Shield()} Superadmin only — every outbound email checks this list. No bypass.
      </div>
      <div className="supp-tabs">
        <div className={`stab ${tab === "bounces" ? "on" : ""}`} onClick={() => setTab("bounces")}>Bounces ({counts.bounces})</div>
        <div className={`stab ${tab === "unsubscribes" ? "on" : ""}`} onClick={() => setTab("unsubscribes")}>Unsubscribes ({counts.unsubscribes})</div>
        <div className={`stab ${tab === "manual" ? "on" : ""}`} onClick={() => setTab("manual")}>Manual ({counts.manual})</div>
      </div>
      <table className="table">
        <thead><tr><th>Email</th><th>Store</th><th>Reason</th><th>Source</th><th>Date</th><th>Actions</th></tr></thead>
        <tbody>{data.length === 0 ? <tr><td colSpan={6} style={{ textAlign: "center", padding: 32, color: "var(--t3)" }}>No records.</td></tr>
          : data.map((r, i) => <tr key={i}><td style={{ fontFamily: "var(--m)", fontSize: 11 }}>{r.email}</td><td style={{ fontSize: 11 }}>{r.store}</td><td><StatusChip status={r.reason.includes("Hard") ? "failed" : "suppressed"} /></td><td style={{ fontSize: 11 }}>{r.source}</td><td style={{ fontSize: 11 }}>{r.date}</td><td><button className="btn btn-sm btn-g" style={{ color: "var(--err)" }}>Remove</button></td></tr>)}</tbody>
      </table>
      {showAdd && <div className="modal-ov" onClick={() => setShowAdd(false)}><div className="modal" onClick={e => e.stopPropagation()}>
        <div className="modal-h"><h3>Add to Suppression</h3><button className="btn btn-icon btn-g" onClick={() => setShowAdd(false)}>{I.X()}</button></div>
        <div className="modal-b">
          <div className="fg"><label className="fl">Email</label><input className="fi" placeholder="email@example.com" /></div>
          <div className="fg"><label className="fl">Reason</label><select className="fsel" style={{ width: "100%" }}><option>Manual block</option><option>Hard bounce</option><option>Spam complaint</option></select></div>
        </div>
        <div className="modal-f"><button className="btn btn-s" onClick={() => setShowAdd(false)}>Cancel</button><button className="btn btn-p" onClick={() => setShowAdd(false)}>Add</button></div>
      </div></div>}
    </div>
  );
}

// ============================================================
// ALL SUPPRESSION RULES — Read-only reference (S01-S42)
// ============================================================

function SuppressionRulesRef() {
  const allRules = [];
  for (const t of TRIGGERS) {
    for (const s of t.suppressions) {
      const match = s.match(/^(S\d+):\s*(.+)$/);
      if (match) {
        const existing = allRules.find(r => r.id === match[1]);
        if (existing) { if (!existing.triggers.includes(t.id)) existing.triggers.push(t.id); }
        else allRules.push({ id: match[1], rule: match[2], triggers: [t.id] });
      }
    }
  }
  allRules.sort((a, b) => parseInt(a.id.slice(1)) - parseInt(b.id.slice(1)));

  return (
    <div>
      <div className="pg-hd">
        <div className="pg-title">Suppression Rules Reference <span className="badge">{allRules.length} rules</span></div>
      </div>
      <div style={{ background: "var(--pri-l)", border: "1px solid #9BC3F5", borderRadius: "var(--r2)", padding: "8px 14px", marginBottom: 16, fontSize: 12, display: "flex", alignItems: "center", gap: 6 }}>
        ℹ Read-only reference. Edit individual rules from each trigger's Automation tab in the template editor.
      </div>
      <table className="table">
        <thead><tr><th>ID</th><th>Suppression Condition</th><th>Affects Triggers</th></tr></thead>
        <tbody>{allRules.map(r => <tr key={r.id}>
          <td style={{ fontFamily: "var(--m)", fontWeight: 600, fontSize: 12 }}>{r.id}</td>
          <td><span className="cchip r" style={{ fontSize: 11 }}>{r.rule}</span></td>
          <td style={{ fontSize: 11 }}>{r.triggers.join(", ")}</td>
        </tr>)}</tbody>
      </table>
    </div>
  );
}

// ============================================================
// MAIN APP
// ============================================================

export default function App() {
  const [page, setPage] = useState("email-center");
  const [editTrigger, setEditTrigger] = useState(null);
  const [showEditor, setShowEditor] = useState(false);
  const [toast, setToast] = useState(null);
  const [emailExp, setEmailExp] = useState(true);

  const openEditor = (trigger) => { setEditTrigger(trigger); setShowEditor(true); };
  const closeEditor = () => { setShowEditor(false); setEditTrigger(null); };
  const handleSave = (st) => { setToast({ msg: `Template ${st === "active" ? "activated" : "saved as draft"}.`, type: "ok" }); closeEditor(); };

  const emailNav = [
    { id: "email-center", label: "Email Center", icon: I.Mail() },
    { id: "customer-template", label: "Customer Template", icon: I.Users() },
    { id: "email-marketing", label: "Email Marketing", icon: I.Megaphone() },
    { id: "email-analytics", label: "Email Analytics", icon: I.Chart() },
  ];

  return (
    <>
      <style>{CSS}</style>
      <div className="app">
        <div className="sb">
          <div className="sb-logo">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><rect width="24" height="24" rx="4" fill="#323338"/><path d="M7 8h10M7 12h7M7 16h10" stroke="#fff" strokeWidth="2" strokeLinecap="round"/></svg>
            <div><b>account editor</b><small>CRM</small></div>
          </div>
          <div className="sb-nav">
            <div className="sb-hd">Main</div>
            <div className="sb-item dim">{I.Users()} Customer</div>
            <div className="sb-item" onClick={() => setEmailExp(!emailExp)} style={{ fontWeight: 600 }}>
              {I.Mail()} Email
              <span style={{ marginLeft: "auto", transform: emailExp ? "rotate(0)" : "rotate(-90deg)", transition: "transform .2s" }}>{I.ChevDown()}</span>
            </div>
            {emailExp && emailNav.map(n => (
              <div key={n.id} className={`sb-item sb-indent ${page === n.id ? "on" : ""}`} onClick={() => { setPage(n.id); setShowEditor(false); }}>{n.label}</div>
            ))}
            <div className="sb-hd" style={{ marginTop: 8 }}>Settings</div>
            <div className={`sb-item ${page === "suppression" ? "on" : ""}`} onClick={() => { setPage("suppression"); setShowEditor(false); }}>{I.Shield()} Suppression</div>
            <div className={`sb-item ${page === "supp-rules" ? "on" : ""}`} onClick={() => { setPage("supp-rules"); setShowEditor(false); }}>{I.Zap()} Rules Reference</div>
            <div className="sb-item dim">{I.Settings()} Settings</div>
          </div>
        </div>
        <div className="main">
          <div className="topbar">
            <div style={{ fontSize: 13, color: "var(--t2)" }}>
              {showEditor ? (editTrigger ? `Editing: ${editTrigger.id} — ${editTrigger.name}` : "Create New Template") : ""}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span className="env-b">Development</span>
              <span style={{ fontSize: 12, color: "var(--t2)", cursor: "pointer" }}>Sign Out</span>
            </div>
          </div>
          {showEditor
            ? <TemplateEditor trigger={editTrigger} onBack={closeEditor} onSave={handleSave} />
            : <div className="content">
                {page === "email-center" && <EmailCenter onEdit={openEditor} />}
                {page === "customer-template" && <CustomerTemplate onEdit={openEditor} />}
                {page === "email-marketing" && <EmailMarketing />}
                {page === "email-analytics" && <EmailAnalytics />}
                {page === "suppression" && <SuppressionMgmt />}
                {page === "supp-rules" && <SuppressionRulesRef />}
              </div>}
        </div>
      </div>
      {toast && <Toast msg={toast.msg} type={toast.type} onClose={() => setToast(null)} />}
    </>
  );
}
