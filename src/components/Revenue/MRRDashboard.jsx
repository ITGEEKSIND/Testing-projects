import React, { useState } from "react";
import { RI } from "./revenueHelpers";
import { MRR_CURRENT, ARR, GROWTH_RATE, ACTIVE_SUBS, MRR_GOAL, MONTHLY_DATA, JOURNAL } from "./revenueData";

export default function MRRDashboard() {
  const [range, setRange] = useState("12m");
  const [viewMode, setViewMode] = useState("dates");
  const goalPct = Math.round((MRR_CURRENT / MRR_GOAL) * 100);
  const gap = MRR_GOAL - MRR_CURRENT;
  const maxEnd = Math.max(...MONTHLY_DATA.map(m => m.end));

  return (
    <div>
      <div className="pg-hd">
        <div className="pg-title">{RI.DollarSign()} MRR Dashboard</div>
        <div style={{ display: "flex", gap: 8 }}>
          <select className="fsel" value={range} onChange={e => setRange(e.target.value)}>
            <option value="3m">3 months</option><option value="6m">6 months</option><option value="12m">12 months</option><option value="all">All time</option>
          </select>
          <button className="btn btn-s">{RI.BookOpen()} Journal</button>
        </div>
      </div>

      {/* Headline Metrics */}
      <div className="metrics">
        <div className="mc"><div className="mc-v">${MRR_CURRENT.toLocaleString()}</div><div className="mc-l">Current MRR</div><div className="mc-d up">{RI.TrendUp(12)} +$320 (+6.8%)</div></div>
        <div className="mc"><div className="mc-v">${ARR.toLocaleString()}</div><div className="mc-l">ARR</div><div className="mc-d up">{RI.TrendUp(12)} +$3,840</div></div>
        <div className="mc"><div className="mc-v">+{GROWTH_RATE}%</div><div className="mc-l">MRR Growth Rate</div><div className="mc-d up">vs 5.2% 3mo avg</div></div>
        <div className="mc"><div className="mc-v">{ACTIVE_SUBS}</div><div className="mc-l">Active Subscribers</div><div className="mc-d up">{RI.TrendUp(12)} +5 this month</div></div>
      </div>

      {/* Goal Widget */}
      <div className="goal-widget">
        <div style={{ flexShrink: 0 }}>{RI.Target(24)}</div>
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
            <span style={{ fontSize: 14, fontWeight: 700 }}>$10K MRR Goal</span>
            <span style={{ fontSize: 13, fontWeight: 600, color: "var(--pri)" }}>{goalPct}%</span>
          </div>
          <div className="goal-bar-outer"><div className="goal-bar-inner" style={{ width: `${goalPct}%` }} /></div>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6, fontSize: 11, color: "var(--t2)" }}>
            <span>${gap.toLocaleString()} remaining</span>
            <span>At +6.8%/mo → Nov 2026</span>
          </div>
        </div>
        <div style={{ flexShrink: 0, textAlign: "right", fontSize: 11, color: "var(--t2)" }}>
          <div>~6 new Growth/mo</div>
          <div>or ~3 upgrades/mo</div>
        </div>
      </div>

      {/* MRR Trend Chart */}
      <div className="card">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <h3 style={{ margin: 0 }}>MRR Trend</h3>
          <div className="toggle-grp">
            <button className={`toggle-btn ${viewMode === "dates" ? "on" : ""}`} onClick={() => setViewMode("dates")}>By Dates</button>
            <button className={`toggle-btn ${viewMode === "types" ? "on" : ""}`} onClick={() => setViewMode("types")}>By Types</button>
          </div>
        </div>
        <div className="chart-bars">
          {MONTHLY_DATA.map((m, i) => (
            <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 0 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: "var(--t1)", marginBottom: 4 }}>${(m.end / 1000).toFixed(1)}k</div>
              <div style={{ width: "100%", height: `${(m.end / maxEnd) * 160}px`, background: `linear-gradient(180deg, #0073EA 0%, #CCE5FF 100%)`, borderRadius: "3px 3px 0 0", position: "relative" }}>
                {m.netNew > 0 && <div style={{ position: "absolute", top: 0, width: "100%", height: `${(m.netNew / m.end) * 100}%`, background: "#4CAF50", borderRadius: "3px 3px 0 0", opacity: 0.6 }} />}
              </div>
              <div className="chart-label">{m.month.split(" ")[0]}</div>
            </div>
          ))}
        </div>
      </div>

      {/* MRR Summary Table */}
      <div className="card" style={{ padding: 0, overflow: "auto" }}>
        <table className="table" style={{ border: "none", fontSize: 12 }}>
          <thead>
            <tr>
              <th style={{ position: "sticky", left: 0, background: "var(--bg2)", zIndex: 1 }}>Movement</th>
              {MONTHLY_DATA.map(m => <th key={m.month} style={{ textAlign: "right", whiteSpace: "nowrap" }}>{m.month}</th>)}
            </tr>
          </thead>
          <tbody>
            {[
              { label: "Starting MRR", key: "start", color: null, bold: false },
              { label: "+ New", key: "newMrr", color: "#4CAF50", bold: false },
              { label: "+ Reactivation", key: "react", color: "#66BB6A", bold: false },
              { label: "+ Expansion", key: "expansion", color: "#81C784", bold: false },
              { label: "+ Unfrozen", key: "unfrozen", color: "#A5D6A7", bold: false },
              { label: "- Churn", key: "churn", color: "#E53935", bold: false },
              { label: "- Contraction", key: "contraction", color: "#EF5350", bold: false },
              { label: "- Frozen", key: "frozen", color: "#E57373", bold: false },
              { label: "= Net New", key: "netNew", color: null, bold: true },
              { label: "= Ending MRR", key: "end", color: null, bold: true },
            ].map(row => (
              <tr key={row.label} style={{ cursor: "default" }}>
                <td style={{ position: "sticky", left: 0, background: "#fff", zIndex: 1, fontWeight: row.bold ? 700 : 500, borderRight: "1px solid var(--bd)" }}>
                  {row.color && <span style={{ display: "inline-block", width: 8, height: 8, borderRadius: 2, background: row.color, marginRight: 6, verticalAlign: "middle" }} />}
                  {row.label}
                </td>
                {MONTHLY_DATA.map(m => {
                  const val = m[row.key];
                  const isNeg = val < 0;
                  const isPos = val > 0 && row.color && row.color.startsWith("#4") || row.color?.startsWith("#6") || row.color?.startsWith("#8") || row.color?.startsWith("#A");
                  return (
                    <td key={m.month} style={{ textAlign: "right", fontFamily: "var(--m)", fontSize: 11, fontWeight: row.bold ? 700 : 400, color: isNeg ? "#E53935" : (row.key === "netNew" && val > 0) ? "#43A047" : "var(--t1)" }}>
                      {row.key === "start" || row.key === "end" ? `$${val.toLocaleString()}` : val === 0 ? "—" : `${val > 0 ? "+":""}$${val.toLocaleString()}`}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Journal Entries */}
      <div className="card">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
          <h3 style={{ margin: 0 }}>Journal Entries</h3>
          <button className="btn btn-sm btn-s">{RI.Plus()} Add Entry</button>
        </div>
        {JOURNAL.map((j, i) => (
          <div key={i} className="journal-item">
            <div className="journal-dot" />
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 4 }}>
                <span style={{ fontSize: 13, fontWeight: 600 }}>{j.title}</span>
                <span className="journal-cat">{j.cat}</span>
              </div>
              <div style={{ fontSize: 12, color: "var(--t2)" }}>{j.desc}</div>
            </div>
            <div style={{ fontSize: 11, color: "var(--t3)", flexShrink: 0 }}>{j.date}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
