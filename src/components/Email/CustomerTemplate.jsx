import { useState } from 'react';
import { PHASES, TRIGGERS, getGroupedTriggers } from './emailData';
import { EI } from './emailIcons';
import { PhaseBadge, PriorityBadge, StatusChip } from './emailHelpers';

export default function CustomerTemplate({ onEdit }) {
  const [activePhase, setActivePhase] = useState(1);
  const phaseData = PHASES.find(p => p.id === activePhase);
  const phaseTriggers = TRIGGERS.filter(t => t.phase === activePhase);
  const groups = getGroupedTriggers(phaseTriggers);

  return (
    <div style={{ display: "flex", height: "calc(100vh - 92px)" }}>
      <div className="ph-sb">
        <div style={{ padding: "12px 14px", borderBottom: "1px solid var(--bd)" }}>
          <div style={{ fontSize: 13, fontWeight: 700 }}>Lifecycle Phases</div>
          <div style={{ fontSize: 11, color: "var(--t3)" }}>58 triggers · 9 phases</div>
        </div>
        {PHASES.map(p => {
          const count = TRIGGERS.filter(t => t.phase === p.id).length;
          return (
            <div key={p.id} className={`ph-sb-item ${activePhase === p.id ? "on" : ""}`} onClick={() => setActivePhase(p.id)}>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <div style={{ width: 5, height: 5, borderRadius: 3, background: p.color, flexShrink: 0 }} />
                <div className="ph-sb-name">{p.short}: {p.name}</div>
              </div>
              <div className="ph-sb-sub">{p.range} · {count} triggers</div>
            </div>
          );
        })}
      </div>
      <div style={{ flex: 1, overflow: "auto", background: "#fff" }}>
        <div style={{ padding: "12px 16px", borderBottom: "1px solid var(--bd)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <span style={{ fontSize: 15, fontWeight: 700 }}>{phaseData?.short}: {phaseData?.name}</span>
            <span style={{ fontSize: 12, color: "var(--t3)", marginLeft: 8 }}>{phaseData?.range} — {phaseData?.goalShort}</span>
          </div>
          <span className="ph-badge" style={{ background: phaseData?.bg, color: phaseData?.color }}>{phaseTriggers.length} triggers</span>
        </div>
        {groups.map((g, gi) => {
          if (g.type === "branch") {
            const [a, b] = g.triggers;
            return (
              <div key={gi} style={{ borderBottom: "1px solid var(--bd)" }}>
                <div style={{ padding: "10px 16px", display: "flex", alignItems: "center", gap: 8, background: "var(--bg2)" }}>
                  {EI.GitBranch(12)}
                  <span style={{ fontSize: 12, fontWeight: 600, color: "var(--t1)" }}>Branched: {a.delay}</span>
                  <span className="tcard-trigger" style={{ margin: 0 }}>{a.event}</span>
                  <PriorityBadge priority={a.priority} />
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
                  {[a, b].map((v, vi) => (
                    <div key={v.id} className="tl-item" style={{ borderRight: vi === 0 ? "1px solid var(--bd)" : "none" }} onClick={() => onEdit(v)}>
                      <div>
                        <div className="branch-variant-label" style={{ background: vi === 0 ? "#E8F5E9" : "#FFF3E0", color: vi === 0 ? "#43A047" : "#FB8C00", marginBottom: 4, display: "inline-flex" }}>
                          {v.branchLabel}
                        </div>
                        <div className="tl-name">{v.name}</div>
                        <div className="tl-sub" style={{ fontFamily: "var(--m)", fontSize: 10 }}>{v.branchCondition}</div>
                      </div>
                      <div className="tl-meta"><StatusChip status={v.status} /></div>
                    </div>
                  ))}
                </div>
              </div>
            );
          }
          const t = g.triggers[0];
          return (
            <div key={gi} className="tl-item" onClick={() => onEdit(t)}>
              <div className="tl-pos">
                <span style={{ fontFamily: "var(--m)", fontSize: 11, fontWeight: 600, color: phaseData?.color }}>{t.id}</span>
              </div>
              <div className="tl-info">
                <div className="tl-name">{t.name}</div>
                <div style={{ display: "flex", gap: 5, marginTop: 4, flexWrap: "wrap", alignItems: "center" }}>
                  <span className="tcard-trigger" style={{ margin: 0 }}>{EI.Zap()} {t.event} {t.delay !== "0s" ? `· ${t.delay}` : ""}</span>
                  <PriorityBadge priority={t.priority} />
                  {t.suppressions.length > 0 && <span style={{ fontSize: 10, color: "var(--t3)" }}>{t.suppressions.length} suppression{t.suppressions.length > 1 ? "s" : ""}</span>}
                </div>
              </div>
              <div className="tl-meta">
                <span style={{ fontSize: 11, color: "var(--t3)" }}>Sent {t.sendCount.toLocaleString()}</span>
                <StatusChip status={t.status} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
