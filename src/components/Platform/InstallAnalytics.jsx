import React from "react";
import { FIRST_HOUR, HEATMAP_DATA, INSTALL_SOURCE } from "./platformData";

export default function InstallAnalytics() {
  return (
    <div>
      {/* First-Hour Funnel */}
      <div className="card">
        <h3>First-Hour Funnel</h3>
        <div style={{ fontSize: 11, color: "var(--t3)", marginBottom: 12 }}>
          43.8% first-hour churn · Median uninstall at 12 minutes
        </div>
        {FIRST_HOUR.map((s, i) => (
          <div key={s.stage} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
            <span style={{ width: 130, fontSize: 11, fontWeight: 600, flexShrink: 0 }}>{s.stage}</span>
            <div style={{ flex: 1, height: 28, background: "var(--bd)", borderRadius: "var(--r)", overflow: "hidden", position: "relative" }}>
              <div style={{ height: "100%", width: `${s.pct}%`, background: s.color, borderRadius: "var(--r)", display: "flex", alignItems: "center", paddingLeft: 8, color: "#fff", fontSize: 12, fontWeight: 600 }}>
                {s.pct}%
              </div>
              <div style={{ position: "absolute", top: 0, left: `${s.target}%`, height: "100%", borderLeft: "2px dashed rgba(0,0,0,.2)" }} />
            </div>
            <span style={{ fontSize: 10, color: "var(--t3)", width: 60, textAlign: "right" }}>Target: {s.target}%</span>
          </div>
        ))}
      </div>

      {/* First-Hour Heatmap */}
      <div className="card">
        <h3>First-Hour Uninstall Heatmap</h3>
        <div style={{ fontSize: 11, color: "var(--t3)", marginBottom: 12 }}>
          Darker = more uninstalls in that 5-minute window. Each row is a day (last 15 days).
        </div>
        <div style={{ display: "flex", gap: 2 }}>
          <div style={{ width: 50, display: "flex", flexDirection: "column", gap: 2, justifyContent: "flex-end" }}>
            {HEATMAP_DATA.map((_, i) => (
              <div key={i} style={{ height: 16, fontSize: 9, color: "var(--t3)", display: "flex", alignItems: "center" }}>Day {15 - i}</div>
            ))}
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ display: "flex", gap: 2, marginBottom: 4 }}>
              {Array.from({ length: 12 }, (_, i) => (
                <div key={i} style={{ flex: 1, fontSize: 8, color: "var(--t3)", textAlign: "center" }}>{i * 5}m</div>
              ))}
            </div>
            {HEATMAP_DATA.map((row, ri) => (
              <div key={ri} style={{ display: "flex", gap: 2, marginBottom: 2 }}>
                {row.map((val, ci) => (
                  <div key={ci} style={{ flex: 1, height: 16, borderRadius: 2, background: val === 0 ? "#F5F5F5" : `rgba(229, 57, 53, ${Math.min(val / 4, 1)})` }} />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Install Source */}
      <div className="card" style={{ padding: 0 }}>
        <div style={{ padding: "14px 16px", borderBottom: "1px solid var(--bd)" }}>
          <h3 style={{ margin: 0 }}>Install Source Attribution (30d)</h3>
        </div>
        <table className="table" style={{ border: "none" }}>
          <thead><tr><th>Source</th><th>Installs</th><th>% Total</th><th>Trial Rate</th><th>Conversion</th></tr></thead>
          <tbody>
            {INSTALL_SOURCE.map(s => (
              <tr key={s.source} style={{ cursor: "default" }}>
                <td style={{ fontWeight: 600 }}>{s.source}</td>
                <td style={{ fontWeight: 700 }}>{s.installs}</td>
                <td>{s.pct}</td>
                <td>{s.trial}</td>
                <td style={{ fontWeight: 600, color: parseFloat(s.conv) >= 15 ? "#43A047" : parseFloat(s.conv) >= 10 ? "#FF9800" : "#E53935" }}>{s.conv}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
