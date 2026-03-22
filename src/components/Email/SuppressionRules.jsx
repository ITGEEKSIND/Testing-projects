import { TRIGGERS } from './emailData';

export default function SuppressionRules() {
  const allRules = [];
  for (const t of TRIGGERS) {
    for (const s of t.suppressions) {
      const match = s.match(/^(S\d+):\s*(.+)$/);
      if (match) {
        const existing = allRules.find(r => r.id === match[1]);
        if (existing) { if (!existing.triggers.includes(t.id)) existing.triggers.push(t.id); }
        else allRules.push({ id: match[1], rule: match[2], triggers: [t.id] });
      }
    }
  }
  allRules.sort((a, b) => parseInt(a.id.slice(1)) - parseInt(b.id.slice(1)));

  return (
    <div>
      <div className="pg-hd">
        <div className="pg-title">Suppression Rules Reference <span className="badge">{allRules.length} rules</span></div>
      </div>
      <div style={{ background: "var(--pri-l)", border: "1px solid #9BC3F5", borderRadius: "var(--r2)", padding: "8px 14px", marginBottom: 16, fontSize: 12, display: "flex", alignItems: "center", gap: 6 }}>
        ℹ Read-only reference. Edit individual rules from each trigger's Automation tab in the template editor.
      </div>
      <table className="table">
        <thead><tr><th>ID</th><th>Suppression Condition</th><th>Affects Triggers</th></tr></thead>
        <tbody>{allRules.map(r => <tr key={r.id}>
          <td style={{ fontFamily: "var(--m)", fontWeight: 600, fontSize: 12 }}>{r.id}</td>
          <td><span className="cchip r" style={{ fontSize: 11 }}>{r.rule}</span></td>
          <td style={{ fontSize: 11 }}>{r.triggers.join(", ")}</td>
        </tr>)}</tbody>
      </table>
    </div>
  );
}
