import React, { useState } from "react";
import { LOGO_COHORTS } from "./platformData";
import { platCColor, platCBg } from "./platformHelpers";

export default function LogoRetention() {
  const [mode, setMode] = useState("relative");
  const maxM = Math.max(...LOGO_COHORTS.map(c => c.months.length));

  return (
    <div>
      <div className="card">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
          <h3 style={{ margin: 0 }}>Logo Retention Cohorts</h3>
          <div className="toggle-grp">
            <button className={`toggle-btn ${mode === "relative" ? "on" : ""}`} onClick={() => setMode("relative")}>Relative %</button>
            <button className={`toggle-btn ${mode === "absolute" ? "on" : ""}`} onClick={() => setMode("absolute")}>Absolute #</button>
          </div>
        </div>
        <div style={{ fontSize: 11, color: "var(--t3)", marginBottom: 12 }}>
          Logo retention is lower than subscription retention — it includes all installs, most of which churn before paying.
        </div>
        <div style={{ overflowX: "auto" }}>
          <table className="ct">
            <thead>
              <tr>
                <th style={{ textAlign: "left", minWidth: 80 }}>Cohort</th>
                <th>Installs</th>
                {Array.from({ length: maxM }, (_, i) => <th key={i}>M{i}</th>)}
              </tr>
            </thead>
            <tbody>
              {LOGO_COHORTS.map(c => (
                <tr key={c.cohort}>
                  <td className="cl">{c.cohort}</td>
                  <td style={{ fontWeight: 600 }}>{c.n}</td>
                  {Array.from({ length: maxM }, (_, i) => {
                    const val = c.months[i];
                    if (val === undefined) {
                      return <td key={i} style={{ background: "#FAFAFA", color: "var(--t3)" }}>—</td>;
                    }
                    const display = mode === "relative" ? `${val}%` : String(Math.round(c.n * val / 100));
                    return (
                      <td key={i} style={{ background: platCBg(val), color: platCColor(val), fontWeight: 600 }}>
                        {display}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div style={{ display: "flex", gap: 12, marginTop: 10, fontSize: 10, color: "var(--t3)" }}>
          {[[">=90%", "#4CAF50", "#E8F5E9"], ["70-89%", "#8BC34A", "#F1F8E9"], ["50-69%", "#FFC107", "#FFFDE7"], ["30-49%", "#FF9800", "#FFF3E0"], ["<30%", "#E53935", "#FDECEA"]].map(([l, bc, bg]) => (
            <div key={l} style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <div style={{ width: 10, height: 10, borderRadius: 2, background: bg, border: `1px solid ${bc}` }} />{l}
            </div>
          ))}
        </div>
        <div style={{ marginTop: 12, padding: "10px 14px", background: "#E3F2FD", borderRadius: "var(--r)", fontSize: 12, color: "#1565C0" }}>
          Feb 2026 cohort has 60% M1 retention vs 52% for Oct 2025 — a 15% improvement. Your onboarding redesign is having measurable impact.
        </div>
      </div>
    </div>
  );
}
