import React, { useState } from "react";
import { RET_CURVE, RET_PLAN, COHORTS } from "./subsData";
import { SIX, subCColor, subCBg } from "./subsHelpers";

export default function SubRetention(){
  const [mode,setMode] = useState("relative");
  const maxM = Math.max(...COHORTS.map(c => c.months.length));
  const planColors = { Starter:"#90CAF9", Growth:"#42A5F5", Pro:"#1565C0" };

  return (
    <div>
      <div className="pg-hd">
        <div className="pg-title">{SIX.La()} Subscription Retention</div>
      </div>

      <div className="card">
        <h3>Overall Retention Curve</h3>
        <div style={{ display: "flex", alignItems: "flex-end", gap: 3, height: 140 }}>
          {RET_CURVE.map((r, i) => (
            <div
              key={i}
              style={{
                flex: 1,
                height: `${r.p}%`,
                background: r.p >= 80 ? "#4CAF50" : r.p >= 60 ? "#FFC107" : "#FF9800",
                borderRadius: "3px 3px 0 0",
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "center",
                paddingTop: 4,
                fontSize: 9,
                fontWeight: 600,
                color: "#fff",
              }}
            >
              {r.p < 100 ? `${r.p}%` : ""}
            </div>
          ))}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, color: "var(--t3)", marginTop: 4 }}>
          {RET_CURVE.map(r => (
            <span key={r.m}>{r.m}</span>
          ))}
        </div>
        <div style={{ marginTop: 10, fontSize: 12, color: "var(--t2)" }}>
          M1: <strong>85%</strong> · M6: <strong>62%</strong> · M12: <strong>55%</strong>
        </div>
      </div>

      <div className="card">
        <h3>Retention by Plan</h3>
        <div style={{ display: "flex", gap: 20 }}>
          {Object.entries(RET_PLAN).map(([plan, data]) => (
            <div key={plan} style={{ flex: 1 }}>
              <div style={{ fontSize: 12, fontWeight: 600, marginBottom: 8, display: "flex", alignItems: "center", gap: 6 }}>
                <div style={{ width: 8, height: 8, borderRadius: 2, background: planColors[plan] }} />
                {plan}
              </div>
              <div style={{ display: "flex", alignItems: "flex-end", gap: 2, height: 80 }}>
                {data.map((v, i) => (
                  <div
                    key={i}
                    style={{
                      flex: 1,
                      height: `${v}%`,
                      background: planColors[plan],
                      borderRadius: "2px 2px 0 0",
                      opacity: 0.6 + i * 0.05,
                    }}
                  />
                ))}
              </div>
              <div style={{ fontSize: 10, color: "var(--t3)", marginTop: 4 }}>
                M{data.length - 1}: {data[data.length - 1]}%
              </div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 12, padding: "10px 14px", background: "#E8F5E9", borderRadius: "var(--r)", fontSize: 12, color: "#1B5E20" }}>
          Pro retains at 83% by M6 vs Starter at 52%. Higher tiers produce stickier customers.
        </div>
      </div>

      <div className="card">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
          <h3 style={{ margin: 0 }}>Cohort Retention Matrix</h3>
          <div className="toggle-grp">
            <button className={`toggle-btn ${mode === "relative" ? "on" : ""}`} onClick={() => setMode("relative")}>
              Relative %
            </button>
            <button className={`toggle-btn ${mode === "absolute" ? "on" : ""}`} onClick={() => setMode("absolute")}>
              Absolute #
            </button>
          </div>
        </div>
        <div style={{ overflowX: "auto" }}>
          <table className="ct">
            <thead>
              <tr>
                <th style={{ textAlign: "left", minWidth: 80 }}>Cohort</th>
                <th>New</th>
                {Array.from({ length: maxM }, (_, i) => (
                  <th key={i}>M{i}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {COHORTS.map(c => (
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
                      <td key={i} style={{ background: subCBg(val), color: subCColor(val), fontWeight: 600 }}>
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
          {[
            [">=90%", "#4CAF50", "#E8F5E9"],
            ["80-89%", "#8BC34A", "#F1F8E9"],
            ["70-79%", "#FFC107", "#FFFDE7"],
            ["60-69%", "#FF9800", "#FFF3E0"],
            ["<60%", "#E53935", "#FDECEA"],
          ].map(([label, bc, bg]) => (
            <div key={label} style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <div style={{ width: 10, height: 10, borderRadius: 2, background: bg, border: `1px solid ${bc}` }} />
              {label}
            </div>
          ))}
        </div>
        <div style={{ marginTop: 12, padding: "10px 14px", background: "#E3F2FD", borderRadius: "var(--r)", fontSize: 12, color: "#1565C0" }}>
          Jan 2026 cohort retains 8% better than Oct 2025 at the same stage — onboarding improvements are working.
        </div>
      </div>
    </div>
  );
}
