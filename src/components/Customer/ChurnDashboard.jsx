import { C, F, MO, R, IC, RiskBadge, RISK } from "../Shared";
import { MERCHANTS } from "./customerData";

const ChurnDash = ({ onSelect }) => {
  const atRisk = MERCHANTS.filter(m => ["0_2_weeks", "2_6_weeks"].includes(m.churnTier));
  const atRiskMRR = atRisk.reduce((s, m) => s + m.mrr, 0);
  const tiers = [
    { id: "low", ...RISK.low, count: MERCHANTS.filter(m => m.churnTier === "low").length },
    { id: "6_12_weeks", ...RISK["6_12_weeks"], count: MERCHANTS.filter(m => m.churnTier === "6_12_weeks").length },
    { id: "2_6_weeks", ...RISK["2_6_weeks"], count: MERCHANTS.filter(m => m.churnTier === "2_6_weeks").length },
    { id: "0_2_weeks", ...RISK["0_2_weeks"], count: MERCHANTS.filter(m => m.churnTier === "0_2_weeks").length },
  ];
  const sorted = [...MERCHANTS].sort((a, b) => b.churnScore - a.churnScore);

  return (
    <div>
      <h1 style={{ margin: "0 0 18px", fontSize: 20, fontWeight: 700, fontFamily: F, color: C.g700, display: "flex", alignItems: "center", gap: 8 }}><IC n="shield" s={22} c={C.g600} /> Churn Risk Dashboard</h1>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginBottom: 20 }}>
        <div style={{ backgroundColor: C.w, borderRadius: R.lg, border: `1px solid ${C.g200}`, padding: 20 }}>
          <h4 style={{ fontSize: 13, fontWeight: 600, color: C.g400, fontFamily: F, marginBottom: 12 }}>Distribution</h4>
          <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
            <svg width="80" height="80" viewBox="0 0 36 36">
              {(() => { let off = 0; return tiers.map(t => { const p = (t.count / MERCHANTS.length) * 100; const el = <circle key={t.id} cx="18" cy="18" r="14" fill="none" stroke={t.c} strokeWidth="4" strokeDasharray={`${p} ${100 - p}`} strokeDashoffset={-off} />; off += p; return el; }); })()}
            </svg>
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              {tiers.map(t => <div key={t.id} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 11, color: C.g500, fontFamily: F }}><div style={{ width: 8, height: 8, borderRadius: 2, background: t.c }} />{t.l}: {t.count}</div>)}
            </div>
          </div>
        </div>
        <div style={{ backgroundColor: C.w, borderRadius: R.lg, border: `1px solid ${C.g200}`, padding: 20 }}>
          <h4 style={{ fontSize: 13, fontWeight: 600, color: C.g400, fontFamily: F, marginBottom: 12 }}>At-Risk MRR</h4>
          <div style={{ fontSize: 36, fontWeight: 700, color: C.err, fontFamily: F }}>${atRiskMRR}</div>
          <div style={{ fontSize: 12, color: C.g400, fontFamily: F }}>{atRisk.length} merchants (0-6 weeks)</div>
        </div>
        <div style={{ backgroundColor: C.w, borderRadius: R.lg, border: `1px solid ${C.g200}`, padding: 20 }}>
          <h4 style={{ fontSize: 13, fontWeight: 600, color: C.g400, fontFamily: F, marginBottom: 12 }}>Trend (90d)</h4>
          <div style={{ display: "flex", alignItems: "flex-end", gap: 3, height: 60 }}>
            {[65,60,55,58,52,48,50,45,42,40,38,35].map((v,i) => <div key={i} style={{ flex: 1, height: `${v}%`, background: i > 9 ? C.ok : i > 6 ? C.warn : C.err, borderRadius: "2px 2px 0 0", opacity: .7 + i * .025 }} />)}
          </div>
          <div style={{ fontSize: 12, color: C.ok, fontWeight: 600, fontFamily: F, marginTop: 6 }}>{"\u2193"} 46% improvement</div>
        </div>
      </div>
      <div style={{ backgroundColor: C.w, borderRadius: R.lg, border: `1px solid ${C.g200}`, overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead><tr style={{ borderBottom: `1px solid ${C.g200}`, backgroundColor: C.g100 }}>{["Merchant", "Plan", "MRR", "Risk", "Score", "Top Factor", "Last Active"].map(h => <th key={h} style={{ padding: "9px 12px", textAlign: "left", fontSize: 10.5, fontWeight: 600, color: C.g400, fontFamily: F, textTransform: "uppercase" }}>{h}</th>)}</tr></thead>
          <tbody>{sorted.map(m => (
            <tr key={m.id} onClick={() => onSelect(m)} style={{ borderBottom: `1px solid ${C.g100}`, cursor: "pointer" }} onMouseEnter={e => e.currentTarget.style.backgroundColor = C.g100} onMouseLeave={e => e.currentTarget.style.backgroundColor = "transparent"}>
              <td style={{ padding: "9px 12px" }}><div style={{ fontSize: 13, fontWeight: 600, fontFamily: F }}>{m.shopName}</div><div style={{ fontSize: 10, color: C.g400, fontFamily: F }}>{m.domain}</div></td>
              <td style={{ padding: "9px 12px", fontSize: 12, fontFamily: F }}>{m.plan || "\u2014"}</td>
              <td style={{ padding: "9px 12px", fontSize: 12, fontWeight: 600, fontFamily: MO }}>{m.mrr > 0 ? `$${m.mrr}` : "\u2014"}</td>
              <td style={{ padding: "9px 12px" }}><RiskBadge s={m.churnTier} /></td>
              <td style={{ padding: "9px 12px", fontFamily: MO, fontSize: 12 }}>{m.churnScore.toFixed(2)}</td>
              <td style={{ padding: "9px 12px", fontSize: 11, color: C.g500, fontFamily: F }}>{m.churnFactors[0]?.replace(/_/g, " ") || "\u2014"}</td>
              <td style={{ padding: "9px 12px", fontSize: 12, color: C.g400, fontFamily: F }}>{m.lastActive}</td>
            </tr>
          ))}</tbody>
        </table>
      </div>
    </div>
  );
};

export default ChurnDash;
