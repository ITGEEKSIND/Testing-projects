// ============================================================
// DATA — Platform Module
// ============================================================
import { FLAGS } from "../Shared/designTokens";

export { FLAGS };

export const FEED = [
  { id: 1, type: "install", shop: "Bloom & Vine", domain: "bloom-vine.myshopify.com", country: "US", plan: "No subscription", time: "2 min ago", shopifyPlan: "shopify", email: "kate@bloomvine.com", history: "First install", onboarding: "Not started" },
  { id: 2, type: "trial_started", shop: "Green Garden Supply", domain: "green-garden.myshopify.com", country: "BR", plan: "Starter", time: "8 min ago", shopifyPlan: "basic", email: "maria@greengarden.com", history: "First install", onboarding: "Step 1/4" },
  { id: 3, type: "uninstall", shop: "Quick Prints Co", domain: "quick-prints.myshopify.com", country: "US", plan: "No subscription", time: "12 min ago", shopifyPlan: "basic", email: "dan@quickprints.com", history: "First install (7 min ago)", onboarding: "Not started" },
  { id: 4, type: "subscription", shop: "Blue Sky Apparel", domain: "bluesky-apparel.myshopify.com", country: "US", plan: "Growth", time: "1 hr ago", shopifyPlan: "shopify_plus", email: "sarah@bluesky.com", history: "Installed 15 days ago", onboarding: "Complete" },
  { id: 5, type: "reinstall", shop: "Book Nook Online", domain: "book-nook.myshopify.com", country: "GB", plan: "No subscription", time: "2 hr ago", shopifyPlan: "basic", email: "tom@booknook.com", history: "Reinstall #2 (uninstalled 22 days ago)", onboarding: "Step 2/4" },
  { id: 6, type: "install", shop: "Artisan Soaps", domain: "artisan-soaps.myshopify.com", country: "CA", plan: "No subscription", time: "3 hr ago", shopifyPlan: "shopify", email: "lily@artisansoaps.com", history: "First install", onboarding: "Not started" },
  { id: 7, type: "uninstall", shop: "Vintage Records", domain: "vintage-records.myshopify.com", country: "US", plan: "Starter", time: "4 hr ago", shopifyPlan: "basic", email: "james@vintagerecords.com", history: "Installed 3 days ago", onboarding: "Step 1/4" },
  { id: 8, type: "review", shop: "Outdoor Gear Co", domain: "outdoor-gear.myshopify.com", country: "CA", plan: "Pro", time: "6 hr ago", shopifyPlan: "shopify", email: "mike@outdoors.com", history: "Installed 9 months ago", onboarding: "Complete", rating: 5 },
  { id: 9, type: "trial_started", shop: "Artisan Soaps", domain: "artisan-soaps.myshopify.com", country: "CA", plan: "Starter", time: "6 hr ago", shopifyPlan: "shopify", email: "lily@artisansoaps.com", history: "First install", onboarding: "Step 1/4" },
  { id: 10, type: "install", shop: "Nordic Threads", domain: "nordic-threads.myshopify.com", country: "DE", plan: "No subscription", time: "8 hr ago", shopifyPlan: "shopify", email: "erik@nordicthreads.com", history: "First install", onboarding: "Not started" },
  { id: 11, type: "uninstall", shop: "Tiny Tots Store", domain: "tiny-tots.myshopify.com", country: "AU", plan: "No subscription", time: "10 hr ago", shopifyPlan: "basic", email: "emma@tinytots.com", history: "First install (4 min ago)", onboarding: "Not started" },
  { id: 12, type: "subscription", shop: "Fashion Hub", domain: "fashion-hub.myshopify.com", country: "US", plan: "Starter", time: "12 hr ago", shopifyPlan: "basic", email: "anna@fashionhub.com", history: "Installed 14 days ago", onboarding: "Step 3/4" },
];

export const EVENT_CONFIG = {
  install: { label: "New Install", icon: "↓", color: "#4CAF50", bg: "#E8F5E9" },
  reinstall: { label: "Reinstall", icon: "↻", color: "#2196F3", bg: "#E3F2FD" },
  uninstall: { label: "Uninstall", icon: "✕", color: "#E53935", bg: "#FDECEA" },
  trial_started: { label: "Trial Started", icon: "▶", color: "#FF9800", bg: "#FFF3E0" },
  subscription: { label: "Subscribed", icon: "$", color: "#43A047", bg: "#E8F5E9" },
  review: { label: "Review", icon: "★", color: "#FFC107", bg: "#FFFDE7" },
};

export const FIRST_HOUR = [
  { stage: "Installed", time: "0 min", pct: 100, target: 100, color: "#4CAF50" },
  { stage: "Still Here 5 min", time: "+5 min", pct: 82, target: 90, color: "#66BB6A" },
  { stage: "Still Here 10 min", time: "+10 min", pct: 68, target: 80, color: "#FFC107" },
  { stage: "Still Here 15 min", time: "+15 min", pct: 60, target: 75, color: "#FF9800" },
  { stage: "Still Here 30 min", time: "+30 min", pct: 58, target: 72, color: "#FF9800" },
  { stage: "Still Here 60 min", time: "+60 min", pct: 56.2, target: 70, color: "#E53935" },
  { stage: "Trial Started", time: "0-60 min", pct: 40, target: 55, color: "#2196F3" },
  { stage: "Widget Added", time: "0-60 min", pct: 15, target: 35, color: "#9C27B0" },
];

export const INSTALL_SOURCE = [
  { source: "App Store (organic)", installs: 45, pct: "56%", trial: "42%", conv: "11%" },
  { source: "App Store (search)", installs: 18, pct: "22%", trial: "38%", conv: "9%" },
  { source: "Direct Link", installs: 8, pct: "10%", trial: "50%", conv: "15%" },
  { source: "Referral", installs: 5, pct: "6%", trial: "60%", conv: "20%" },
  { source: "Partner", installs: 3, pct: "4%", trial: "55%", conv: "18%" },
  { source: "Unknown", installs: 1, pct: "2%", trial: "30%", conv: "5%" },
];

export const ACTIVE_TRIALS = [
  { shop: "Green Garden Supply", plan: "Starter", ends: "3 days", onboarding: 1, widget: false, edits: 0, logins: 0, score: 15 },
  { shop: "Fashion Hub", plan: "Starter", ends: "1 day", onboarding: 3, widget: true, edits: 3, logins: 2, score: 62 },
  { shop: "Nordic Threads", plan: "Growth", ends: "12 days", onboarding: 0, widget: false, edits: 0, logins: 0, score: 0 },
  { shop: "Artisan Soaps", plan: "Starter", ends: "13 days", onboarding: 1, widget: false, edits: 0, logins: 1, score: 22 },
  { shop: "Bloom & Vine", plan: "Starter", ends: "14 days", onboarding: 0, widget: false, edits: 0, logins: 0, score: 0 },
];

export const CHURN_BUCKETS = [
  { bucket: "0-15 min", pct: 35, cumul: "35%", insight: "Immediate rejection", color: "#E53935" },
  { bucket: "15-60 min", pct: 9, cumul: "44%", insight: "Setup friction", color: "#EF5350" },
  { bucket: "1-24 hr", pct: 8, cumul: "52%", insight: "Not convinced", color: "#FF9800" },
  { bucket: "1-7 days", pct: 12, cumul: "64%", insight: "Trial evaluation", color: "#FFC107" },
  { bucket: "7-14 days", pct: 10, cumul: "74%", insight: "End-of-trial", color: "#FFEB3B" },
  { bucket: "14-30 days", pct: 8, cumul: "82%", insight: "Post-trial", color: "#8BC34A" },
  { bucket: "30+ days", pct: 18, cumul: "100%", insight: "Mature churn", color: "#43A047" },
];

export const LOGO_COHORTS = [
  { cohort: "Oct 2025", n: 25, months: [100, 52, 44, 40, 36, 32] },
  { cohort: "Nov 2025", n: 30, months: [100, 55, 48, 43, 38] },
  { cohort: "Dec 2025", n: 18, months: [100, 50, 42, 38] },
  { cohort: "Jan 2026", n: 35, months: [100, 57, 50] },
  { cohort: "Feb 2026", n: 28, months: [100, 60] },
  { cohort: "Mar 2026", n: 32, months: [100] },
];

// Heatmap data: 15 days x 12 five-minute buckets for first hour
export const HEATMAP_DATA = Array.from({ length: 15 }, (_, day) =>
  Array.from({ length: 12 }, () => Math.floor(Math.random() * 5))
);
