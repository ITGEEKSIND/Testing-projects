import React from "react";
import { ACTIVE_TRIALS } from "./platformData";

export default function TrialsTab() {
  return (
    <div>
      <div className="metrics" style={{ gridTemplateColumns: "repeat(4,1fr)" }}>
        {[
          { v: "12", l: "Trials Started (Mar)", d: "↑ +20% vs Feb", up: true },
          { v: "6", l: "Converted", d: "↑ +20%", up: true },
          { v: "50%", l: "Conversion Rate", d: "→ Flat", up: null },
          { v: "11.2d", l: "Avg Time to Convert", d: "↑ Faster", up: true },
        ].map(m => (
          <div key={m.l} className="mc">
            <div className="mc-v">{m.v}</div>
            <div className="mc-l">{m.l}</div>
            {m.up !== null && <div className={`mc-d ${m.up ? "up" : "dn"}`}>{m.d}</div>}
            {m.up === null && <div style={{ fontSize: 10, color: "var(--t3)", marginTop: 3 }}>{m.d}</div>}
          </div>
        ))}
      </div>
      <div className="card" style={{ padding: 0 }}>
        <div style={{ padding: "14px 16px", borderBottom: "1px solid var(--bd)" }}>
          <h3 style={{ margin: 0 }}>Active Trials</h3>
        </div>
        <table className="table" style={{ border: "none" }}>
          <thead><tr><th>Shop</th><th>Plan</th><th>Ends In</th><th>Onboarding</th><th>Widget</th><th>Edits</th><th>Logins</th><th>Score</th></tr></thead>
          <tbody>
            {ACTIVE_TRIALS.map(t => {
              const scoreColor = t.score >= 80 ? "#43A047" : t.score >= 50 ? "#FF9800" : "#E53935";
              const daysLeft = parseInt(t.ends);
              return (
                <tr key={t.shop} style={{ cursor: "default" }}>
                  <td style={{ fontWeight: 600 }}>{t.shop}</td>
                  <td>{t.plan}</td>
                  <td style={{ color: daysLeft <= 3 ? "#E53935" : "var(--t1)", fontWeight: daysLeft <= 3 ? 700 : 400 }}>{t.ends}</td>
                  <td>
                    <span className="progress-bar"><span className="progress-fill" style={{ width: `${(t.onboarding / 4) * 100}%`, background: "#0073EA" }} /></span>
                    {t.onboarding}/4
                  </td>
                  <td>{t.widget ? <span style={{ color: "#43A047" }}>✓</span> : <span style={{ color: "#E53935" }}>✕</span>}</td>
                  <td>{t.edits}</td>
                  <td>{t.logins}</td>
                  <td style={{ fontWeight: 700, color: scoreColor }}>{t.score}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
