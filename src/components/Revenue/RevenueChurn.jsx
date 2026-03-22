import React from "react";
import { RI } from "./revenueHelpers";
import { PLAN_CHURN, BENCHMARKS, CHURN_EVENTS } from "./revenueData";

export default function RevenueChurn() {
  const maxChurn = Math.max(...PLAN_CHURN.map(p => p.churned));
  return (
    <div>
      <div className="pg-hd"><div className="pg-title">{RI.TrendDown(18)} Revenue Churn</div></div>

      <div className="metrics" style={{ gridTemplateColumns: "repeat(3,1fr)" }}>
        <div className="mc"><div className="mc-v" style={{ color: "#43A047" }}>-0.4%</div><div className="mc-l">Net Churn Rate</div><div className="mc-d up">Net negative = expanding</div></div>
        <div className="mc"><div className="mc-v">2.0%</div><div className="mc-l">Gross Churn Rate</div><div className="mc-d up">Below 3% target</div></div>
        <div className="mc"><div className="mc-v" style={{ color: "#E53935" }}>-$99</div><div className="mc-l">Churned MRR (Mar)</div><div className="mc-d dn">1 cancellation</div></div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
        <div className="card">
          <h3>Churn by Plan</h3>
          {PLAN_CHURN.map(p => (
            <div key={p.plan} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
              <span style={{ width: 60, fontSize: 12, fontWeight: 600 }}>{p.plan}</span>
              <div style={{ flex: 1, height: 8, background: "var(--bd)", borderRadius: 4, overflow: "hidden" }}>
                <div style={{ width: `${maxChurn > 0 ? (p.churned / maxChurn) * 100 : 0}%`, height: "100%", background: "#E53935", borderRadius: 4 }} />
              </div>
              <span style={{ fontFamily: "var(--m)", fontSize: 11, width: 50, textAlign: "right" }}>${p.churned}</span>
              <span style={{ fontSize: 11, color: "var(--t3)", width: 40, textAlign: "right" }}>{p.pct}%</span>
            </div>
          ))}
        </div>
        <div className="card">
          <h3>Benchmarks</h3>
          <table className="table" style={{ border: "none", fontSize: 12 }}>
            <thead><tr><th>Metric</th><th>AE</th><th>Shopify Apps</th><th>SaaS</th></tr></thead>
            <tbody>{BENCHMARKS.map(b => (
              <tr key={b.metric} style={{ cursor: "default" }}>
                <td style={{ fontWeight: 500 }}>{b.metric}</td>
                <td style={{ fontWeight: 700, color: "#43A047" }}>{b.ae}</td>
                <td style={{ color: "var(--t2)" }}>{b.shopify}</td>
                <td style={{ color: "var(--t2)" }}>{b.saas}</td>
              </tr>
            ))}</tbody>
          </table>
        </div>
      </div>

      <div className="card" style={{ padding: 0 }}>
        <div style={{ padding: "14px 16px", borderBottom: "1px solid var(--bd)" }}><h3 style={{ margin: 0 }}>Churn Events</h3></div>
        <table className="table" style={{ border: "none" }}>
          <thead><tr><th>Merchant</th><th>Plan</th><th>MRR Lost</th><th>Type</th><th>Date</th><th>Reason</th></tr></thead>
          <tbody>{CHURN_EVENTS.map((e, i) => (
            <tr key={i} style={{ cursor: "default" }}>
              <td style={{ fontWeight: 600 }}>{e.merchant}</td>
              <td>{e.plan}</td>
              <td style={{ color: "#E53935", fontWeight: 600, fontFamily: "var(--m)" }}>-${e.mrrLost}</td>
              <td><span style={{ padding: "2px 6px", borderRadius: 3, fontSize: 10.5, fontWeight: 500, background: e.type === "Involuntary" ? "#FFF3E0" : "#FDECEA", color: e.type === "Involuntary" ? "#FF9800" : "#E53935" }}>{e.type}</span></td>
              <td style={{ fontSize: 12 }}>{e.date}</td>
              <td style={{ fontSize: 12, color: "var(--t2)" }}>{e.reason}</td>
            </tr>
          ))}</tbody>
        </table>
      </div>
    </div>
  );
}
