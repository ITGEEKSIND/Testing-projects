import { C, F, R } from './designTokens';
import IC from './Icon';

const KPI = ({ icon, label, value, trend, color = C.pri }) => (
  <div style={{ flex: 1, minWidth: 130, padding: "14px 16px", backgroundColor: C.w, borderRadius: R.lg, border: `1px solid ${C.g200}` }}>
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6 }}>
      <div style={{ width: 30, height: 30, borderRadius: R.md, backgroundColor: color + "14", display: "flex", alignItems: "center", justifyContent: "center" }}><IC n={icon} s={15} c={color} /></div>
      {trend !== undefined && <span style={{ fontSize: 11, fontWeight: 600, fontFamily: F, color: trend >= 0 ? C.ok : C.err, display: "flex", alignItems: "center", gap: 2 }}><IC n={trend >= 0 ? "arrowUp" : "arrowDown"} s={11} c={trend >= 0 ? C.ok : C.err} />{Math.abs(trend)}%</span>}
    </div>
    <div style={{ fontSize: 20, fontWeight: 700, color: C.g700, fontFamily: F }}>{value}</div>
    <div style={{ fontSize: 11.5, color: C.g400, fontFamily: F }}>{label}</div>
  </div>
);
export default KPI;
