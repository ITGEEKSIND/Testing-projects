import { C, F } from './designTokens';
const HealthGauge = ({ score }) => {
  const color = score > 75 ? C.ok : score > 50 ? C.warn : score > 30 ? C.warnD : C.err;
  const label = score > 75 ? "Excellent" : score > 50 ? "Good" : score > 30 ? "Fair" : "Poor";
  return <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}><div style={{ width: 68, height: 68, borderRadius: "50%", border: `4px solid ${color}`, display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: color + "10" }}><span style={{ fontSize: 20, fontWeight: 800, color, fontFamily: F }}>{score}</span></div><span style={{ fontSize: 11, fontWeight: 600, color, fontFamily: F, textTransform: "uppercase", letterSpacing: .5 }}>{label}</span></div>;
};
export default HealthGauge;
