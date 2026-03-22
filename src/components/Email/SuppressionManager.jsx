import { useState } from 'react';
import { SUPPRESSION_DATA } from './emailData';
import { EI } from './emailIcons';
import { StatusChip } from './emailHelpers';

export default function SuppressionManager() {
  const [tab, setTab] = useState("bounces");
  const [showAdd, setShowAdd] = useState(false);
  const data = SUPPRESSION_DATA[tab] || [];
  const counts = { bounces: SUPPRESSION_DATA.bounces.length, unsubscribes: SUPPRESSION_DATA.unsubscribes.length, manual: SUPPRESSION_DATA.manual.length };

  return (
    <div>
      <div className="pg-hd">
        <div className="pg-title">Email Suppression</div>
        <div style={{ display: "flex", gap: 6 }}>
          <button className="btn btn-s" onClick={() => setShowAdd(true)}>{EI.Plus()} Add Manually</button>
          <button className="btn btn-s">{EI.Upload()} Import</button>
          <button className="btn btn-s">{EI.Download()} Export</button>
        </div>
      </div>
      <div style={{ background: "#FFF8E1", border: "1px solid #F5E6B3", borderRadius: "var(--r2)", padding: "8px 14px", marginBottom: 16, display: "flex", alignItems: "center", gap: 6, fontSize: 12 }}>
        {EI.Shield()} Superadmin only — every outbound email checks this list. No bypass.
      </div>
      <div className="supp-tabs">
        <div className={`stab ${tab === "bounces" ? "on" : ""}`} onClick={() => setTab("bounces")}>Bounces ({counts.bounces})</div>
        <div className={`stab ${tab === "unsubscribes" ? "on" : ""}`} onClick={() => setTab("unsubscribes")}>Unsubscribes ({counts.unsubscribes})</div>
        <div className={`stab ${tab === "manual" ? "on" : ""}`} onClick={() => setTab("manual")}>Manual ({counts.manual})</div>
      </div>
      <table className="table">
        <thead><tr><th>Email</th><th>Store</th><th>Reason</th><th>Source</th><th>Date</th><th>Actions</th></tr></thead>
        <tbody>{data.length === 0 ? <tr><td colSpan={6} style={{ textAlign: "center", padding: 32, color: "var(--t3)" }}>No records.</td></tr>
          : data.map((r, i) => <tr key={i}><td style={{ fontFamily: "var(--m)", fontSize: 11 }}>{r.email}</td><td style={{ fontSize: 11 }}>{r.store}</td><td><StatusChip status={r.reason.includes("Hard") ? "failed" : "suppressed"} /></td><td style={{ fontSize: 11 }}>{r.source}</td><td style={{ fontSize: 11 }}>{r.date}</td><td><button className="btn btn-sm btn-g" style={{ color: "var(--err)" }}>Remove</button></td></tr>)}</tbody>
      </table>
      {showAdd && <div className="modal-ov" onClick={() => setShowAdd(false)}><div className="modal" onClick={e => e.stopPropagation()}>
        <div className="modal-h"><h3>Add to Suppression</h3><button className="btn btn-icon btn-g" onClick={() => setShowAdd(false)}>{EI.X()}</button></div>
        <div className="modal-b">
          <div className="fg"><label className="fl">Email</label><input className="fi" placeholder="email@example.com" /></div>
          <div className="fg"><label className="fl">Reason</label><select className="fsel" style={{ width: "100%" }}><option>Manual block</option><option>Hard bounce</option><option>Spam complaint</option></select></div>
        </div>
        <div className="modal-f"><button className="btn btn-s" onClick={() => setShowAdd(false)}>Cancel</button><button className="btn btn-p" onClick={() => setShowAdd(false)}>Add</button></div>
      </div></div>}
    </div>
  );
}
