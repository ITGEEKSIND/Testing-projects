import { useState } from 'react';
import { TRIGGERS, PHASES } from './emailData';
import { PhaseBadge, PriorityBadge } from './emailHelpers';

export default function EmailAnalytics() {
  const [range, setRange] = useState("30");
  const metrics = [
    { l: "Sent", v: "12,847", d: "+18%", up: true },
    { l: "Delivery", v: "97.3%", d: "+0.5%", up: true },
    { l: "Open Rate", v: "34.2%", d: "+2.1%", up: true },
    { l: "Click Rate", v: "12.8%", d: "-0.3%", up: false },
    { l: "Bounce", v: "2.7%", d: "-0.5%", up: true },
    { l: "Unsub", v: "0.4%", d: "+0.1%", up: false },
  ];
  const funnel = [
    { l: "Install", v: 4821, p: "100%", c: PHASES[0].color, h: 100 },
    { l: "Trial", v: 2845, p: "59%", c: PHASES[1].color, h: 59 },
    { l: "Widget", v: 2234, p: "78%", c: PHASES[2].color, h: 46 },
    { l: "1st Edit", v: 1678, p: "75%", c: PHASES[2].color, h: 35 },
    { l: "Day 7", v: 1523, p: "91%", c: PHASES[3].color, h: 32 },
    { l: "Convert", v: 567, p: "37%", c: PHASES[4].color, h: 12 },
    { l: "Retain", v: 456, p: "80%", c: PHASES[4].color, h: 9 },
  ];

  return (
    <div>
      <div className="pg-hd">
        <div className="pg-title">Email Analytics</div>
        <select className="fsel" value={range} onChange={e => setRange(e.target.value)}><option value="7">7 days</option><option value="30">30 days</option><option value="90">90 days</option></select>
      </div>
      <div className="metrics">{metrics.map(m => <div key={m.l} className="mc"><div className="mc-v">{m.v}</div><div className="mc-l">{m.l}</div><div className={`mc-d ${m.up ? "up" : "dn"}`}>{m.d}</div></div>)}</div>
      <div style={{ background: "#fff", border: "1px solid var(--bd)", borderRadius: "var(--r2)", padding: 20, marginBottom: 20 }}>
        <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 12 }}>Lifecycle Funnel</h3>
        <div className="funnel">{funnel.map((s, i) => <div key={s.l} className="funnel-s"><div className="funnel-v">{s.v.toLocaleString()}</div><div className="funnel-bar" style={{ height: `${s.h}%`, background: s.c }} /><div className="funnel-l">{s.l}</div><div className="funnel-p">{s.p}</div></div>)}</div>
      </div>
      <div style={{ background: "#fff", border: "1px solid var(--bd)", borderRadius: "var(--r2)", overflow: "hidden" }}>
        <div style={{ padding: "12px 16px", borderBottom: "1px solid var(--bd)" }}><h3 style={{ fontSize: 15, fontWeight: 700 }}>Per-Trigger Performance</h3></div>
        <table className="table" style={{ border: "none" }}>
          <thead><tr><th>Trigger</th><th>Pri</th><th>Sent</th><th>Delivered</th><th>Opened</th><th>Clicked</th><th>Bounced</th></tr></thead>
          <tbody>{TRIGGERS.slice(0, 12).map(t => <tr key={t.id}>
            <td><div style={{ display: "flex", alignItems: "center", gap: 6 }}><PhaseBadge phase={t.phase} /><span style={{ fontWeight: 500 }}>{t.id}: {t.name}</span></div></td>
            <td><PriorityBadge priority={t.priority} /></td>
            <td style={{ fontWeight: 600 }}>{t.sendCount.toLocaleString()}</td>
            <td>{Math.round(t.sendCount * 0.973).toLocaleString()} <span style={{ fontSize: 10, color: "var(--t3)" }}>97.3%</span></td>
            <td>{Math.round(t.sendCount * 0.342).toLocaleString()} <span style={{ fontSize: 10, color: "var(--t3)" }}>34.2%</span></td>
            <td>{Math.round(t.sendCount * 0.128).toLocaleString()} <span style={{ fontSize: 10, color: "var(--t3)" }}>12.8%</span></td>
            <td>{Math.round(t.sendCount * 0.027).toLocaleString()} <span style={{ fontSize: 10, color: "var(--t3)" }}>2.7%</span></td>
          </tr>)}</tbody>
        </table>
      </div>
    </div>
  );
}
