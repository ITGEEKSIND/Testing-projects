// ============================================================
// DATA — Subscriptions Module v1.0
// ============================================================

export const PLANS = [
  { slug: "starter", name: "Starter", monthly: 39, subs: 45, trials: 8, mrr: 1755, pctMrr: 35.1, avgLtv: 156, growth: 3, churn: 6.7, conv: 11.4 },
  { slug: "growth", name: "Growth", monthly: 99, subs: 22, trials: 3, mrr: 2178, pctMrr: 43.6, avgLtv: 425, growth: 1, churn: 4.5, conv: 10.0 },
  { slug: "pro", name: "Pro", monthly: 179, subs: 6, trials: 1, mrr: 1074, pctMrr: 15.5, avgLtv: 894, growth: 1, churn: 0, conv: 33.3 },
  { slug: "scale", name: "Scale", monthly: 259, subs: 2, trials: 0, mrr: 518, pctMrr: 5.8, avgLtv: 1554, growth: 0, churn: 0, conv: null },
];
export const MOVEMENTS = [
  { type: "Upgrade", from: "Starter", to: "Growth", count: 2, impact: "+$120" },
  { type: "Upgrade", from: "Growth", to: "Pro", count: 1, impact: "+$80" },
  { type: "Downgrade", from: "Growth", to: "Starter", count: 1, impact: "-$60" },
  { type: "New", from: "—", to: "Starter", count: 5, impact: "+$195" },
  { type: "New", from: "—", to: "Growth", count: 2, impact: "+$198" },
  { type: "Churned", from: "Starter", to: "—", count: 2, impact: "-$78" },
  { type: "Churned", from: "Growth", to: "—", count: 1, impact: "-$99" },
];
export const EVENTS = [
  { date: "Mar 20", merchant: "Green Garden Supply", event: "Trial Started", plan: "Starter", price: "$39/mo", prev: "—" },
  { date: "Mar 18", merchant: "Tech Gadgets Pro", event: "Cancelled", plan: "Growth", price: "$99/mo", prev: "—" },
  { date: "Mar 15", merchant: "Blue Sky Apparel", event: "Upgrade", plan: "Growth", price: "$99/mo", prev: "Starter" },
  { date: "Mar 12", merchant: "Fashion Hub", event: "Trial Started", plan: "Starter", price: "$39/mo", prev: "—" },
  { date: "Mar 10", merchant: "Home Decor Studio", event: "New Subscription", plan: "Scale", price: "$259/mo", prev: "—" },
  { date: "Mar 8", merchant: "Sportswear Direct", event: "Trial Expired", plan: "Starter", price: "$39/mo", prev: "—" },
  { date: "Mar 5", merchant: "Outdoor Gear Co", event: "Upgrade", plan: "Pro", price: "$179/mo", prev: "Growth" },
];
export const TREND = [
  { m:"Apr",a:42,st:25,gr:12,pr:4,sc:1 },{ m:"May",a:45,st:27,gr:13,pr:4,sc:1 },
  { m:"Jun",a:49,st:28,gr:15,pr:5,sc:1 },{ m:"Jul",a:52,st:29,gr:16,pr:5,sc:2 },
  { m:"Aug",a:55,st:30,gr:17,pr:6,sc:2 },{ m:"Sep",a:58,st:32,gr:18,pr:6,sc:2 },
  { m:"Oct",a:60,st:33,gr:19,pr:6,sc:2 },{ m:"Nov",a:63,st:35,gr:19,pr:7,sc:2 },
  { m:"Dec",a:66,st:37,gr:20,pr:7,sc:2 },{ m:"Jan",a:68,st:39,gr:20,pr:7,sc:2 },
  { m:"Feb",a:72,st:42,gr:21,pr:7,sc:2 },{ m:"Mar",a:75,st:45,gr:22,pr:6,sc:2 },
];
export const TRIAL_PLANS = [
  { plan:"Starter",started:35,converted:4,rate:"11.4%",days:11.8 },
  { plan:"Growth",started:10,converted:1,rate:"10.0%",days:13.2 },
  { plan:"Pro",started:3,converted:1,rate:"33.3%",days:8.5 },
  { plan:"Scale",started:0,converted:0,rate:"—",days:null },
];
export const HEALTH = [
  { name:"Install-to-Trial",val:"40%",status:"yellow",green:">50%",red:"<30%" },
  { name:"Trial-to-Paid",val:"10%",status:"yellow",green:">15%",red:"<8%" },
  { name:"First-Hour Survival",val:"56.2%",status:"yellow",green:">70%",red:"<50%" },
  { name:"Widget During Trial",val:"52%",status:"yellow",green:">60%",red:"<40%" },
  { name:"Onboarding Complete",val:"38%",status:"yellow",green:">50%",red:"<25%" },
];
export const CHURN_TENURE = [
  { bucket:"0-30 days",active:12,churned:5,rate:"41.7%",color:"#E53935",insight:"First-month critical" },
  { bucket:"31-90 days",active:18,churned:3,rate:"16.7%",color:"#FF9800",insight:"Settling period" },
  { bucket:"91-180 days",active:20,churned:2,rate:"10.0%",color:"#FFC107",insight:"Stabilizing" },
  { bucket:"181-365 days",active:15,churned:1,rate:"6.7%",color:"#8BC34A",insight:"Loyal base" },
  { bucket:"365+ days",active:10,churned:0,rate:"0%",color:"#43A047",insight:"Stickiest" },
];
export const CHURN_PLAN = [
  { plan:"Starter",active:45,churned:3,rate:"6.7%",tenure:"2.1 mo" },
  { plan:"Growth",active:22,churned:1,rate:"4.5%",tenure:"4.3 mo" },
  { plan:"Pro",active:6,churned:0,rate:"0%",tenure:"—" },
  { plan:"Scale",active:2,churned:0,rate:"0%",tenure:"—" },
];
export const CHURNED_LIST = [
  { name:"Tech Gadgets Pro",plan:"Growth",tenure:"3 mo",type:"Involuntary",date:"Mar 18",reason:"Payment failed" },
  { name:"Pet Supply World",plan:"Starter",tenure:"5 mo",type:"Voluntary",date:"Mar 12",reason:"No value" },
  { name:"Craft Corner",plan:"Starter",tenure:"1 mo",type:"Voluntary",date:"Mar 5",reason:"Too complex" },
  { name:"Book Nook",plan:"Starter",tenure:"2 mo",type:"Uninstall",date:"Feb 28",reason:"—" },
];
export const RET_CURVE = [{m:"M0",p:100},{m:"M1",p:85},{m:"M2",p:78},{m:"M3",p:73},{m:"M4",p:68},{m:"M5",p:65},{m:"M6",p:62},{m:"M7",p:60},{m:"M8",p:58},{m:"M9",p:57},{m:"M10",p:56},{m:"M11",p:55},{m:"M12",p:55}];
export const RET_PLAN = { Starter:[100,80,72,65,60,56,52], Growth:[100,90,85,82,78,75,72], Pro:[100,95,92,90,88,85,83] };
export const COHORTS = [
  { cohort:"Oct 2025",n:8,months:[100,87.5,75,75,62.5,62.5,62.5] },
  { cohort:"Nov 2025",n:10,months:[100,90,80,70,70,60] },
  { cohort:"Dec 2025",n:6,months:[100,83.3,66.7,66.7] },
  { cohort:"Jan 2026",n:12,months:[100,91.7,83.3] },
  { cohort:"Feb 2026",n:9,months:[100,88.9] },
  { cohort:"Mar 2026",n:11,months:[100] },
];
