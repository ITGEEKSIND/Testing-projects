import { useState } from 'react';
import { TRIGGERS, PHASES, PRIORITY_TIERS, getGroupedTriggers } from './emailData';
import { EI } from './emailIcons';
import { PhaseBadge, PriorityBadge, StatusChip } from './emailHelpers';

export default function EmailCenter({ onEdit }) {
  const [phaseF, setPhaseF] = useState("all");
  const [priF, setPriF] = useState("all");
  const [statusF, setStatusF] = useState("all");
  const [search, setSearch] = useState("");

  const filtered = TRIGGERS.filter(t => {
    if (phaseF !== "all" && t.phase !== Number(phaseF)) return false;
    if (priF !== "all" && t.priority !== priF) return false;
    if (statusF !== "all" && t.status !== statusF) return false;
    if (search) { const s = search.toLowerCase(); return t.name.toLowerCase().includes(s) || t.id.toLowerCase().includes(s) || t.event.toLowerCase().includes(s); }
    return true;
  });

  const groups = getGroupedTriggers(filtered);
  const activeCount = TRIGGERS.filter(t => t.status === "active").length;

  return (
    <div>
      <div className="pg-hd">
        <div className="pg-title">Email Center <span className="badge">{activeCount} active · 58 triggers</span></div>
        <button className="btn btn-p" onClick={() => onEdit(null)}>{EI.Plus()} Create Template</button>
      </div>
      <div className="fbar">
        <select className="fsel" value={phaseF} onChange={e => setPhaseF(e.target.value)}>
          <option value="all">All Phases</option>
          {PHASES.map(p => <option key={p.id} value={p.id}>{p.short}: {p.name}</option>)}
        </select>
        <select className="fsel" value={priF} onChange={e => setPriF(e.target.value)}>
          <option value="all">All Priorities</option>
          {PRIORITY_TIERS.map(t => <option key={t.id} value={t.id}>{t.label}</option>)}
        </select>
        <select className="fsel" value={statusF} onChange={e => setStatusF(e.target.value)}>
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
          <option value="draft">Draft</option>
        </select>
        <div className="sinp-w">
          <span className="si">{EI.Search()}</span>
          <input type="text" className="sinp" placeholder="Search triggers..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>
      </div>
      <div className="cards">
        {groups.map((g, gi) => {
          if (g.type === "branch") {
            const [a, b] = g.triggers;
            const phase = PHASES.find(p => p.id === a.phase);
            return (
              <div key={gi} className="branch-card">
                <div className="branch-header">
                  <div className="branch-header-left">
                    <PhaseBadge phase={a.phase} />
                    <PriorityBadge priority={a.priority} />
                    <span style={{ fontFamily: "var(--m)", fontSize: 11, color: "var(--t3)" }}>{a.id.replace(/[AB]$/, '')}*</span>
                    <span style={{ display: "inline-flex", alignItems: "center", gap: 3, color: "var(--t2)", fontSize: 11 }}>{EI.GitBranch()} Branched</span>
                  </div>
                  <span className="tcard-trigger">{EI.Zap()} {a.event} · {a.delay}</span>
                </div>
                <div className="branch-body">
                  {[a, b].map((v, vi) => (
                    <div key={v.id} className="branch-variant" onClick={() => onEdit(v)}>
                      <div className="branch-variant-label" style={{ background: vi === 0 ? "#E8F5E9" : "#FFF3E0", color: vi === 0 ? "#43A047" : "#FB8C00" }}>
                        {v.branchLabel}
                      </div>
                      <div className="branch-variant-name">{v.name}</div>
                      <div className="branch-variant-cond">{v.branchCondition}</div>
                      <div className="branch-variant-stats">
                        <span className={`sdot ${v.status}`} /> {v.status} · Sent {v.sendCount.toLocaleString()}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="branch-foot">
                  <span>Combined: {(a.sendCount + b.sendCount).toLocaleString()} sends</span>
                  <span>{a.updatedAt}</span>
                </div>
              </div>
            );
          }
          const t = g.triggers[0];
          return (
            <div key={gi} className="tcard" onClick={() => onEdit(t)}>
              <div className="ca">
                <button title="Edit" onClick={e => { e.stopPropagation(); onEdit(t); }}>{EI.Edit()}</button>
                <button title="Duplicate">{EI.Copy()}</button>
                <button title="Delete">{EI.Trash()}</button>
              </div>
              <div className="tcard-top">
                <PhaseBadge phase={t.phase} />
                <PriorityBadge priority={t.priority} />
                <span style={{ fontSize: 10, fontFamily: "var(--m)", color: "var(--t3)" }}>{t.id}</span>
              </div>
              <div className="tcard-name">{t.name}</div>
              <div className="tcard-trigger">{EI.Zap()} {t.event} {t.delay !== "0s" ? `· ${t.delay}` : ""}</div>
              <div className="tcard-foot">
                <span><span className={`sdot ${t.status}`} />{t.status} · Sent {t.sendCount.toLocaleString()}</span>
                <span>{t.updatedAt}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
