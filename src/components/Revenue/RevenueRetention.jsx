import React, { useState } from "react";
import { RI, cohortColor, cohortBg } from "./revenueHelpers";
import { COHORT_DATA } from "./revenueData";

export default function RevenueRetention() {
  const [cohortMode, setCohortMode] = useState("relative");
  const maxMonth = Math.max(...COHORT_DATA.map(c => c.months.length));

  return (
    <div>
      <div className="pg-hd"><div className="pg-title">{RI.Layers()} Revenue Retention</div></div>

      <div className="metrics" style={{ gridTemplateColumns: "repeat(3,1fr)" }}>
        <div className="mc"><div className="mc-v" style={{ color: "#43A047" }}>97.2%</div><div className="mc-l">NDR (Monthly)</div><div className="mc-d up">Improving +1.4pp</div></div>
        <div className="mc"><div className="mc-v">71.5%</div><div className="mc-l">NDR (Annualized)</div><div className="mc-d up">Target: 95%+</div></div>
        <div className="mc"><div className="mc-v">$4,854</div><div className="mc-l">Retained MRR</div><div className="mc-d up">from 12-month cohorts</div></div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
        <div className="card">
          <h3>NDR by Plan</h3>
          {[
            { plan: "Starter", ndr: 92 },
            { plan: "Growth", ndr: 98 },
            { plan: "Pro", ndr: 105 },
            { plan: "Scale", ndr: 110 },
          ].map(p => (
            <div key={p.plan} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
              <span style={{ width: 60, fontSize: 12, fontWeight: 600 }}>{p.plan}</span>
              <div style={{ flex: 1, height: 8, background: "var(--bd)", borderRadius: 4, overflow: "hidden" }}>
                <div style={{ width: `${Math.min(p.ndr, 120)}%`, height: "100%", background: p.ndr >= 100 ? "#1B5E20" : p.ndr >= 90 ? "#4CAF50" : p.ndr >= 80 ? "#8BC34A" : "#FF9800", borderRadius: 4, maxWidth: "100%" }} />
              </div>
              <span style={{ fontFamily: "var(--m)", fontSize: 12, fontWeight: 700, width: 44, textAlign: "right", color: p.ndr >= 100 ? "#1B5E20" : p.ndr >= 90 ? "#4CAF50" : "#FF9800" }}>{p.ndr}%</span>
            </div>
          ))}
        </div>
        <div className="card">
          <h3>NDR by Segment</h3>
          <table className="table" style={{ border: "none", fontSize: 12 }}>
            <thead><tr><th>Segment</th><th>NDR</th><th>Trend</th></tr></thead>
            <tbody>
              {[
                { seg: "Shopify Plus", ndr: "108%", trend: "up" },
                { seg: "Growth Plan", ndr: "98%", trend: "up" },
                { seg: "Annual Billing", ndr: "102%", trend: "up" },
                { seg: "High Volume (>5k)", ndr: "95%", trend: "flat" },
              ].map(s => (
                <tr key={s.seg} style={{ cursor: "default" }}>
                  <td style={{ fontWeight: 500 }}>{s.seg}</td>
                  <td style={{ fontWeight: 700, color: parseFloat(s.ndr) >= 100 ? "#1B5E20" : "#43A047" }}>{s.ndr}</td>
                  <td>{s.trend === "up" ? <span style={{ color: "#43A047" }}>↑</span> : <span style={{ color: "var(--t3)" }}>→</span>}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Cohort Retention Table */}
      <div className="card">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
          <h3 style={{ margin: 0 }}>Revenue Retention Cohorts</h3>
          <div className="toggle-grp">
            <button className={`toggle-btn ${cohortMode === "relative" ? "on" : ""}`} onClick={() => setCohortMode("relative")}>Relative %</button>
            <button className={`toggle-btn ${cohortMode === "absolute" ? "on" : ""}`} onClick={() => setCohortMode("absolute")}>Absolute $</button>
          </div>
        </div>
        <div style={{ overflowX: "auto" }}>
          <table className="cohort-table">
            <thead>
              <tr>
                <th style={{ textAlign: "left", minWidth: 90 }}>Cohort</th>
                <th>M0 MRR</th>
                {Array.from({ length: maxMonth }, (_, i) => <th key={i}>M{i}</th>)}
              </tr>
            </thead>
            <tbody>
              {COHORT_DATA.map(c => (
                <tr key={c.cohort}>
                  <td className="cohort-label">{c.cohort}</td>
                  <td style={{ fontWeight: 600 }}>${c.m0mrr}</td>
                  {Array.from({ length: maxMonth }, (_, i) => {
                    const val = c.months[i];
                    if (val === undefined) return <td key={i} style={{ background: "#FAFAFA", color: "var(--t3)" }}>—</td>;
                    const displayVal = cohortMode === "relative"
                      ? `${val}%`
                      : `$${Math.round(c.m0mrr * val / 100)}`;
                    return (
                      <td key={i} style={{ background: cohortBg(val), color: cohortColor(val), fontWeight: 600 }}>
                        {displayVal}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div style={{ display: "flex", gap: 12, marginTop: 12, fontSize: 10, color: "var(--t3)" }}>
          {[["≥100%", "#1B5E20", "#E8F5E9"], ["90-99%", "#4CAF50", "#E8F5E9"], ["80-89%", "#8BC34A", "#F1F8E9"], ["70-79%", "#FFC107", "#FFFDE7"], ["60-69%", "#FF9800", "#FFF3E0"], ["<60%", "#E53935", "#FDECEA"]].map(([label, color, bg]) => (
            <div key={label} style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <div style={{ width: 10, height: 10, borderRadius: 2, background: bg, border: `1px solid ${color}` }} />
              <span>{label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
