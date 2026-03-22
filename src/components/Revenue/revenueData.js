// ============================================================
// DATA — Revenue Module v1.0
// ============================================================

export const MRR_CURRENT = 4993;
export const ARR = MRR_CURRENT * 12;
export const ACTIVE_SUBS = 75;
export const GROWTH_RATE = 6.8;
export const MRR_GOAL = 10000;

export const MONTHLY_DATA = [
  { month: "Apr 25", start: 2100, newMrr: 156, react: 0, expansion: 39, unfrozen: 0, churn: -78, contraction: 0, frozen: 0 },
  { month: "May 25", start: 2217, newMrr: 198, react: 39, expansion: 0, unfrozen: 0, churn: -39, contraction: 0, frozen: -99 },
  { month: "Jun 25", start: 2316, newMrr: 237, react: 0, expansion: 60, unfrozen: 99, churn: -99, contraction: -60, frozen: 0 },
  { month: "Jul 25", start: 2553, newMrr: 178, react: 99, expansion: 0, unfrozen: 0, churn: -39, contraction: 0, frozen: 0 },
  { month: "Aug 25", start: 2791, newMrr: 297, react: 0, expansion: 99, unfrozen: 0, churn: -78, contraction: -39, frozen: 0 },
  { month: "Sep 25", start: 3070, newMrr: 336, react: 39, expansion: 60, unfrozen: 0, churn: -99, contraction: 0, frozen: -39 },
  { month: "Oct 25", start: 3367, newMrr: 198, react: 0, expansion: 0, unfrozen: 39, churn: -39, contraction: -60, frozen: 0 },
  { month: "Nov 25", start: 3505, newMrr: 277, react: 99, expansion: 80, unfrozen: 0, churn: -78, contraction: 0, frozen: 0 },
  { month: "Dec 25", start: 3883, newMrr: 198, react: 0, expansion: 60, unfrozen: 0, churn: -99, contraction: -39, frozen: -99 },
  { month: "Jan 26", start: 3904, newMrr: 356, react: 99, expansion: 0, unfrozen: 99, churn: -78, contraction: 0, frozen: 0 },
  { month: "Feb 26", start: 4380, newMrr: 293, react: 0, expansion: 80, unfrozen: 0, churn: -39, contraction: -41, frozen: 0 },
  { month: "Mar 26", start: 4673, newMrr: 198, react: 0, expansion: 60, unfrozen: 0, churn: -99, contraction: 0, frozen: 0 },
];
MONTHLY_DATA.forEach(m => {
  m.netNew = m.newMrr + m.react + m.expansion + m.unfrozen + m.churn + m.contraction + m.frozen;
  m.end = m.start + m.netNew;
});

export const CHURN_EVENTS = [
  { merchant: "Tech Gadgets Pro", plan: "Growth", mrrLost: 99, type: "Involuntary", date: "Mar 18, 2026", reason: "Payment failed" },
  { merchant: "Pet Supply World", plan: "Starter", mrrLost: 39, type: "Voluntary", date: "Mar 12, 2026", reason: "No value perceived" },
  { merchant: "Craft Corner", plan: "Starter", mrrLost: 39, type: "Voluntary", date: "Mar 5, 2026", reason: "Too complex" },
  { merchant: "Vintage Books", plan: "Growth", mrrLost: 99, type: "Voluntary", date: "Feb 28, 2026", reason: "Too expensive" },
  { merchant: "Yoga Essentials", plan: "Starter", mrrLost: 39, type: "Involuntary", date: "Feb 22, 2026", reason: "Store frozen" },
];

export const COHORT_DATA = [
  { cohort: "Sep 2025", m0mrr: 420, months: [100, 92, 88, 85, 82, 80, 78] },
  { cohort: "Oct 2025", m0mrr: 336, months: [100, 89, 85, 81, 78, 75] },
  { cohort: "Nov 2025", m0mrr: 510, months: [100, 95, 90, 87, 84] },
  { cohort: "Dec 2025", m0mrr: 380, months: [100, 91, 86, 82] },
  { cohort: "Jan 2026", m0mrr: 450, months: [100, 94, 89] },
  { cohort: "Feb 2026", m0mrr: 390, months: [100, 93] },
  { cohort: "Mar 2026", m0mrr: 510, months: [100] },
];

export const JOURNAL = [
  { date: "Mar 15, 2026", title: "Launched new pricing tiers", cat: "Pricing Change", desc: "Migrated from 3-tier to 5-tier pricing. Starter $39, Growth $99, Pro $179, Scale $259." },
  { date: "Feb 1, 2026", title: "Address Validation launch", cat: "Product Launch", desc: "Launched Google Places address validation as a paid add-on." },
  { date: "Jan 10, 2026", title: "Annual billing introduced", cat: "Pricing Change", desc: "Added 20% annual discount across all tiers." },
];

export const PLAN_CHURN = [
  { plan: "Starter", churned: 117, pct: 5.2 },
  { plan: "Growth", churned: 198, pct: 3.1 },
  { plan: "Pro", churned: 0, pct: 0 },
  { plan: "Scale", churned: 0, pct: 0 },
];

export const BENCHMARKS = [
  { metric: "Monthly Gross Churn", ae: "2.0%", shopify: "3-5%", saas: "3-7%" },
  { metric: "Monthly Net Churn", ae: "-0.4%", shopify: "1-3%", saas: "-1% to 2%" },
  { metric: "Annual Gross Churn", ae: "21%", shopify: "30-50%", saas: "30-40%" },
];
