export const FLAGS = { US: "🇺🇸", CA: "🇨🇦", GB: "🇬🇧", AU: "🇦🇺", DE: "🇩🇪", BR: "🇧🇷", FR: "🇫🇷", IN: "🇮🇳", NL: "🇳🇱", JP: "🇯🇵" };

export const MERCHANTS = [
  { id: 1, shopName: "Blue Sky Apparel", domain: "bluesky-apparel.myshopify.com", contactName: "Sarah Johnson", email: "sarah@bluesky.com", phone: "+1-555-0123", country: "US", shopifyPlan: "shopify_plus", lifecycle: "subscribed", subStatus: "active", plan: "Growth", planPrice: 99, billing: "monthly", ordersUsed: 3842, orderLimit: 5000, ltv: 594, mrr: 99, edits: 247, edits30d: 31, editRate: 2.3, widgetBoth: true, logins7d: 5, churnTier: "low", churnScore: 0.12, churnFactors: [], installedAt: "Sep 15, 2025", lastActive: "2h ago", tags: ["vip", "shopify_plus"], owner: "eric@ae.com", health: 85, onboardingStep: 4 },
  { id: 2, shopName: "Outdoor Gear Co", domain: "outdoor-gear.myshopify.com", contactName: "Mike Chen", email: "mike@outdoors.com", phone: "+1-555-7890", country: "CA", shopifyPlan: "shopify", lifecycle: "subscribed", subStatus: "active", plan: "Pro", planPrice: 179, billing: "annual", ordersUsed: 7823, orderLimit: 10000, ltv: 1432, mrr: 143, edits: 589, edits30d: 67, editRate: 3.4, widgetBoth: true, logins7d: 3, churnTier: "low", churnScore: 0.08, churnFactors: [], installedAt: "Jun 1, 2025", lastActive: "1d ago", tags: ["annual", "high_volume"], owner: "nilesh@ae.com", health: 92, onboardingStep: 4 },
  { id: 3, shopName: "Fashion Hub", domain: "fashion-hub.myshopify.com", contactName: "Anna Park", email: "anna@fashionhub.com", phone: "+1-555-4567", country: "US", shopifyPlan: "basic", lifecycle: "installed", subStatus: "on_trial", plan: "Starter", planPrice: 39, billing: "monthly", ordersUsed: 45, orderLimit: 1200, ltv: 0, mrr: 0, edits: 3, edits30d: 3, editRate: 6.7, widgetBoth: false, logins7d: 2, churnTier: "6_12_weeks", churnScore: 0.35, churnFactors: ["widget_incomplete", "low_usage"], installedAt: "Mar 10, 2026", lastActive: "4h ago", tags: ["new"], owner: null, health: 42, onboardingStep: 2 },
  { id: 4, shopName: "Tech Gadgets Pro", domain: "tech-gadgets.myshopify.com", contactName: "Raj Patel", email: "raj@techgadgets.com", phone: "+91-9876543210", country: "IN", shopifyPlan: "shopify", lifecycle: "subscribed", subStatus: "past_due", plan: "Growth", planPrice: 99, billing: "monthly", ordersUsed: 2100, orderLimit: 5000, ltv: 297, mrr: 99, edits: 156, edits30d: 0, editRate: 1.9, widgetBoth: true, logins7d: 0, churnTier: "0_2_weeks", churnScore: 0.89, churnFactors: ["payment_failed", "zero_edits_30d", "no_login_7d"], installedAt: "Dec 1, 2025", lastActive: "12d ago", tags: ["dunning"], owner: "eric@ae.com", health: 18, onboardingStep: 4 },
  { id: 5, shopName: "Pet Supply World", domain: "pet-supply.myshopify.com", contactName: "Lisa Wong", email: "lisa@petsupply.com", phone: "+61-412345678", country: "AU", shopifyPlan: "shopify", lifecycle: "cancelled", subStatus: null, plan: null, planPrice: 0, billing: null, ordersUsed: 0, orderLimit: 0, ltv: 198, mrr: 0, edits: 89, edits30d: 0, editRate: 0, widgetBoth: false, logins7d: 0, churnTier: "2_6_weeks", churnScore: 0.62, churnFactors: ["cancelled", "widget_removed"], installedAt: "Aug 20, 2025", lastActive: "45d ago", tags: ["churned"], owner: null, health: 12, onboardingStep: 4 },
  { id: 6, shopName: "Home Decor Studio", domain: "home-decor.myshopify.com", contactName: "Jennifer Lee", email: "jen@homedecor.com", phone: "+1-555-8901", country: "US", shopifyPlan: "shopify_plus", lifecycle: "subscribed", subStatus: "active", plan: "Scale", planPrice: 259, billing: "monthly", ordersUsed: 15200, orderLimit: 20000, ltv: 2072, mrr: 259, edits: 1203, edits30d: 142, editRate: 4.1, widgetBoth: true, logins7d: 7, churnTier: "low", churnScore: 0.05, churnFactors: [], installedAt: "Apr 10, 2025", lastActive: "3h ago", tags: ["vip", "enterprise", "shopify_plus"], owner: "eric@ae.com", health: 95, onboardingStep: 4 },
  { id: 7, shopName: "Book Nook Online", domain: "book-nook.myshopify.com", contactName: "Tom Baker", email: "tom@booknook.com", phone: "+44-7700900000", country: "GB", shopifyPlan: "basic", lifecycle: "uninstalled", subStatus: null, plan: null, planPrice: 0, billing: null, ordersUsed: 0, orderLimit: 0, ltv: 78, mrr: 0, edits: 12, edits30d: 0, editRate: 0, widgetBoth: false, logins7d: 0, churnTier: "0_2_weeks", churnScore: 0.91, churnFactors: ["uninstalled", "low_ltv"], installedAt: "Nov 1, 2025", lastActive: "22d ago", tags: [], owner: null, health: 8, onboardingStep: 2 },
  { id: 8, shopName: "Sportswear Direct", domain: "sportswear.myshopify.com", contactName: "Chris Adams", email: "chris@sportswear.com", phone: "+1-555-2345", country: "US", shopifyPlan: "shopify", lifecycle: "subscribed", subStatus: "active", plan: "Starter", planPrice: 39, billing: "monthly", ordersUsed: 890, orderLimit: 1200, ltv: 156, mrr: 39, edits: 67, edits30d: 8, editRate: 1.8, widgetBoth: true, logins7d: 1, churnTier: "2_6_weeks", churnScore: 0.55, churnFactors: ["declining_usage", "near_limit"], installedAt: "Nov 20, 2025", lastActive: "5d ago", tags: [], owner: "nilesh@ae.com", health: 61, onboardingStep: 4 },
  { id: 9, shopName: "Luxury Watches", domain: "luxury-watches.myshopify.com", contactName: "David Kim", email: "david@luxwatch.com", phone: "+81-3-1234-5678", country: "JP", shopifyPlan: "shopify_plus", lifecycle: "subscribed", subStatus: "active", plan: "Enterprise", planPrice: 499, billing: "annual", ordersUsed: 18500, orderLimit: 50000, ltv: 4988, mrr: 416, edits: 2340, edits30d: 210, editRate: 5.2, widgetBoth: true, logins7d: 6, churnTier: "low", churnScore: 0.03, churnFactors: [], installedAt: "Jan 15, 2025", lastActive: "6h ago", tags: ["vip", "enterprise", "annual"], owner: "eric@ae.com", health: 98, onboardingStep: 4 },
  { id: 10, shopName: "Green Garden Supply", domain: "green-garden.myshopify.com", contactName: "Maria Garcia", email: "maria@greengarden.com", phone: "+55-11-98765-4321", country: "BR", shopifyPlan: "basic", lifecycle: "installed", subStatus: "on_trial", plan: "Starter", planPrice: 39, billing: "monthly", ordersUsed: 0, orderLimit: 1200, ltv: 0, mrr: 0, edits: 0, edits30d: 0, editRate: 0, widgetBoth: false, logins7d: 0, churnTier: "0_2_weeks", churnScore: 0.82, churnFactors: ["zero_edits", "no_widget", "no_login_7d"], installedAt: "Mar 18, 2026", lastActive: "3d ago", tags: [], owner: null, health: 5, onboardingStep: 1 },
];

export const MILESTONES = [
  { key: "installed", label: "Installed", done: true, desc: "App installed" },
  { key: "trial", label: "Trial Started", done: true, desc: "14-day trial" },
  { key: "widget", label: "Widget Added", done: true, desc: "Both pages" },
  { key: "first_edit", label: "First Edit", done: true, desc: "Order edited" },
  { key: "subscribed", label: "Subscribed", done: true, desc: "Paid plan" },
  { key: "upgrade", label: "Upgraded", done: true, desc: "Plan change" },
  { key: "milestone", label: "100 Edits", done: false, desc: "Edit milestone" },
  { key: "annual", label: "Annual Plan", done: false, desc: "Billing switch" },
  { key: "review", label: "Review", done: false, desc: "App Store" },
  { key: "referral", label: "Referral", done: false, desc: "Referred store" },
];

export const TIMELINE = [
  { icon: "mail", color: "#2196F3", text: 'Opened: "Your Growth plan is live"', time: "2h ago" },
  { icon: "activity", color: "#607D8B", text: "Dashboard login", time: "3h ago" },
  { icon: "trending", color: "#FFD600", text: "Reached 250 order edits", time: "1d ago" },
  { icon: "mail", color: "#9E9E9E", text: 'Sent: "Month 1 Impact Summary"', time: "2d ago" },
  { icon: "dollar", color: "#FF9800", text: "Upgraded from Starter to Growth", time: "5d ago" },
  { icon: "dollar", color: "#43A047", text: "Payment processed — $99.00", time: "15d ago" },
  { icon: "edit", color: "#00BCD4", text: "Added widget to both pages", time: "20d ago" },
  { icon: "check", color: "#4CAF50", text: "Started 14-day trial on Starter", time: "34d ago" },
  { icon: "download", color: "#2196F3", text: "Installed Account Editor", time: "34d ago" },
];

export const ORDERS = [
  { id: "#6258963214587", cust: "Leon Wanner", created: "Feb 15, 2026", status: "UNFULFILLED", edits: 3 },
  { id: "#6258963298546", cust: "Mia Reeves", created: "Feb 16, 2026", status: "PARTIALLY FULFILLED", edits: 1 },
  { id: "#6258963274985", cust: "Aisha Patel", created: "Feb 18, 2026", status: "ON HOLD", edits: 2 },
  { id: "#6258963287594", cust: "Jake Torres", created: "Feb 20, 2026", status: "FULFILLED", edits: 1 },
  { id: "#6258963213265", cust: "Emma Liu", created: "Feb 21, 2026", status: "UNFULFILLED", edits: 5 },
];

export const EMAILS = [
  { name: "Welcome to Account Editor", trigger: "T01", status: "Opened", date: "Mar 15" },
  { name: "Plan Fit — Growth looks right", trigger: "T13", status: "Opened", date: "Mar 10" },
  { name: "Day 7: Feature overview", trigger: "T12", status: "Clicked", date: "Mar 8" },
  { name: "Your first edit just happened!", trigger: "T09", status: "Opened", date: "Mar 5" },
  { name: "Day 3: Stores like yours", trigger: "T10A", status: "Opened", date: "Mar 3" },
  { name: "Your 14-day trial is live", trigger: "T05", status: "Opened", date: "Mar 1" },
];

export const SEGMENTS = [
  { name: "High-Value At-Risk", count: 2, cond: "mrr ≥ 99 AND risk in [0-2wk, 2-6wk]" },
  { name: "Trial Converting", count: 1, cond: "on_trial AND days ≤ 3 AND onboarding complete" },
  { name: "Expansion Ready", count: 3, cond: "usage ≥ 80% AND cycles ≥ 2 AND risk = low" },
  { name: "Win-Back Candidates", count: 1, cond: "Uninstalled AND ltv ≥ 50 AND days ≤ 30" },
  { name: "Zero-Edit Trial", count: 1, cond: "on_trial AND edits = 0 AND days ≥ 7" },
  { name: "Annual Upgrade Targets", count: 2, cond: "monthly AND cycles ≥ 3 AND risk = low" },
  { name: "New This Week", count: 2, cond: "installedAt in last 7 days" },
  { name: "Frozen Stores", count: 0, cond: "subStatus = frozen" },
];
