import React, { useState } from "react";
import { FLOWS, TRIGGER_TYPES } from "./flowData";
import { FI } from "./flowHelpers";

export default function FlowList({ onEdit, onShowTemplates }) {
  const [statusF, setStatusF] = useState("all");
  const [search, setSearch] = useState("");

  const filtered = FLOWS.filter(f => {
    if (statusF !== "all" && f.status !== statusF) return false;
    if (search) return f.name.toLowerCase().includes(search.toLowerCase()) || f.desc.toLowerCase().includes(search.toLowerCase());
    return true;
  });

  const pubCount = FLOWS.filter(f => f.status === "published").length;

  return (
    <div>
      <div className="pg-hd">
        <div className="pg-title">{FI.Zap()} Flows <span className="badge">{pubCount} published · {FLOWS.length} total</span></div>
        <div style={{ display: "flex", gap: 6 }}>
          <button className="btn btn-s" onClick={onShowTemplates}>{FI.FileText()} Templates</button>
          <button className="btn btn-p" onClick={onShowTemplates}>{FI.Plus()} New Flow</button>
        </div>
      </div>
      <div className="fbar">
        <div className="sinp-w"><span className="si">{FI.Search()}</span><input className="sinp" placeholder="Search flows..." value={search} onChange={e => setSearch(e.target.value)} /></div>
        <select className="fsel" value={statusF} onChange={e => setStatusF(e.target.value)}>
          <option value="all">All Status</option><option value="published">Published</option><option value="draft">Draft</option>
        </select>
      </div>
      <table className="table">
        <thead><tr><th>Flow Name</th><th>Status</th><th>Trigger</th><th>Actions</th><th>Executions</th><th>Last Triggered</th><th>Tags</th><th></th></tr></thead>
        <tbody>
          {filtered.map(f => {
            const trig = TRIGGER_TYPES.find(t => t.id === f.trigger) || { label: f.trigger, color: "#607D8B" };
            return (
              <tr key={f.id} onClick={() => onEdit(f)}>
                <td><div style={{ fontWeight: 600 }}>{f.name}</div><div style={{ fontSize: 10.5, color: "var(--t3)" }}>{f.desc}</div></td>
                <td><span className={`schip ${f.status}`}>{f.status === "published" ? "Published" : "Draft"}</span></td>
                <td><span className="trigger-chip" style={{ background: trig.color + "18", color: trig.color }}>{trig.label}</span></td>
                <td style={{ fontWeight: 600 }}>{f.actionsCount}</td>
                <td style={{ fontFamily: "var(--m)", fontSize: 12 }}>{f.executions.toLocaleString()}</td>
                <td style={{ fontSize: 12, color: "var(--t2)" }}>{f.lastTriggered}</td>
                <td>{f.tags.map(t => <span key={t} className="tag-chip">{t}</span>)}</td>
                <td><div style={{ display: "flex", gap: 4 }}><button className="btn btn-sm btn-g" onClick={e => { e.stopPropagation(); onEdit(f); }}>{FI.Play()}</button><button className="btn btn-sm btn-g">{FI.Copy()}</button><button className="btn btn-sm btn-g">{FI.Trash()}</button></div></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
