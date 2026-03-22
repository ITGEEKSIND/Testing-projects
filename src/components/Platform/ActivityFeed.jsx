import React, { useState } from "react";
import { FEED, EVENT_CONFIG, FLAGS } from "./platformData";
import { PIX } from "./platformHelpers";

export default function ActivityFeed() {
  const [typeF, setTypeF] = useState("all");
  const [expanded, setExpanded] = useState(null);

  const filtered = FEED.filter(e => typeF === "all" || e.type === typeF);

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
        <span className="live-dot" />
        <span style={{ fontSize: 12, fontWeight: 600, color: "#4CAF50" }}>Live</span>
        <span style={{ fontSize: 11, color: "var(--t3)" }}>Auto-refreshing every 5s</span>
      </div>
      <div className="fbar">
        {[["all", "All Events"], ["install", "Installs"], ["reinstall", "Reinstalls"], ["uninstall", "Uninstalls"], ["trial_started", "Trials"], ["subscription", "Subscriptions"], ["review", "Reviews"]].map(([k, l]) => (
          <button
            key={k}
            className={`toggle-btn ${typeF === k ? "on" : ""}`}
            style={{ borderRadius: "var(--r)", border: "1px solid var(--bd)", marginRight: 0 }}
            onClick={() => setTypeF(k)}
          >
            {l}
          </button>
        ))}
      </div>
      <div style={{ background: "#fff", border: "1px solid var(--bd)", borderRadius: "var(--r2)", overflow: "hidden" }}>
        {filtered.map(e => {
          const cfg = EVENT_CONFIG[e.type];
          const isOpen = expanded === e.id;
          return (
            <div key={e.id}>
              <div className="feed-item" onClick={() => setExpanded(isOpen ? null : e.id)}>
                <div className="feed-icon" style={{ background: cfg.color }}>{cfg.icon}</div>
                <div className="feed-info">
                  <div className="feed-label">
                    <span className="tag-chip" style={{ background: cfg.bg, color: cfg.color }}>{cfg.label}</span>
                    {e.shop}
                    {e.rating && <span style={{ color: "#FFC107" }}>{"★".repeat(e.rating)}</span>}
                  </div>
                  <div className="feed-sub">{e.domain} {FLAGS[e.country] || ""}</div>
                </div>
                <div className="feed-right">
                  <div className="feed-time">{e.time}</div>
                  <div className="feed-plan">{e.plan}</div>
                </div>
              </div>
              {isOpen && (
                <div className="feed-detail">
                  <div>Shopify Plan: <span>{e.shopifyPlan}</span></div>
                  <div>Email: <span>{e.email}</span></div>
                  <div>History: <span>{e.history}</span></div>
                  <div>Onboarding: <span>{e.onboarding}</span></div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
