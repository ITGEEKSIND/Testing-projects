import { useEffect } from 'react';
import { PHASES, PRIORITY_TIERS, VARIABLES } from './emailData';
import { EI } from './emailIcons';

export function PhaseBadge({ phase }) {
  const p = PHASES.find(x => x.id === phase);
  if (!p) return null;
  return <span className="ph-badge" style={{ background: p.bg, color: p.color }}>{p.short}</span>;
}

export function PriorityBadge({ priority }) {
  const t = PRIORITY_TIERS.find(x => x.id === priority);
  if (!t) return null;
  return <span className="pri-badge" style={{ background: t.bg, color: t.color }} title={t.desc}>{t.id}</span>;
}

export function StatusChip({ status }) {
  return <span className={`schip ${status}`}>{status.charAt(0).toUpperCase() + status.slice(1)}</span>;
}

export function Toast({ msg, type, onClose }) {
  useEffect(() => { const t = setTimeout(onClose, 3000); return () => clearTimeout(t); }, [onClose]);
  return <div className={`toast ${type}`}>{type === "ok" ? EI.Check() : EI.AlertTri()} {msg}</div>;
}

export function VarPicker({ onSelect, onClose }) {
  return (
    <div className="var-pick" onClick={e => e.stopPropagation()}>
      {VARIABLES.map(cat => (
        <div key={cat.category}>
          <div className="var-cat">{cat.category}</div>
          {cat.items.map(v => (
            <div key={v} className="var-item" onClick={() => { onSelect(v); onClose(); }}>{v}</div>
          ))}
        </div>
      ))}
    </div>
  );
}
