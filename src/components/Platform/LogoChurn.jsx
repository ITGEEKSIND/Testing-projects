import React from "react";
import { CHURN_BUCKETS } from "./platformData";

export default function LogoChurn() {
  const maxPct = Math.max(...CHURN_BUCKETS.map(b => b.pct));
  return (
    <div>
      <div className="metrics" style={{ gridTemplateColumns: "repeat(4,1fr)" }}>
        <div className="mc"><div className="mc-v" style={{ color: "#E53935" }}>8.2%</div><div className="mc-l">Basic Logo Churn</div><div style={{ fontSize: 10, color: "var(--t3)", marginTop: 3 }}>Target: {"<"}5%</div></div>
        <div className="mc"><div className="mc-v" style={{ color: "#FF9800" }}>7.5%</div><div className="mc-l">Net Logo Churn</div><div style={{ fontSize: 10, color: "var(--t3)", marginTop: 3 }}>Target: {"<"}3%</div></div>
        <div className="mc"><div className="mc-v" style={{ color: "#E53935" }}>43.8%</div><div className="mc-l">First-Hour Churn</div><div style={{ fontSize: 10, color: "var(--t3)", marginTop: 3 }}>Target: {"<"}25%</div></div>
        <div className="mc"><div className="mc-v" style={{ color: "#FF9800" }}>~55%</div><div className="mc-l">First-Week Churn</div><div style={{ fontSize: 10, color: "var(--t3)", marginTop: 3 }}>Target: {"<"}35%</div></div>
      </div>
      <div className="card">
        <h3>Churn by Time Bucket</h3>
        {CHURN_BUCKETS.map(b => (
          <div key={b.bucket} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
            <span style={{ width: 80, fontSize: 11, fontWeight: 600, flexShrink: 0 }}>{b.bucket}</span>
            <div style={{ flex: 1, height: 10, background: "var(--bd)", borderRadius: 5, overflow: "hidden" }}>
              <div style={{ width: `${(b.pct / maxPct) * 100}%`, height: "100%", background: b.color, borderRadius: 5 }} />
            </div>
            <span style={{ fontFamily: "var(--m)", fontSize: 12, width: 35, textAlign: "right", fontWeight: 700, color: b.color }}>{b.pct}%</span>
            <span style={{ fontSize: 10, color: "var(--t3)", width: 70, textAlign: "right" }}>({b.cumul})</span>
            <span style={{ fontSize: 10, color: "var(--t2)", width: 100, textAlign: "right" }}>{b.insight}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
