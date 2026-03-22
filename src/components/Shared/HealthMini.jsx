import { C, F } from './designTokens';
const HealthMini = ({ score }) => {
  const color = score > 75 ? C.ok : score > 50 ? C.warn : score > 30 ? C.warnD : C.err;
  return <div style={{ width: 28, height: 28, borderRadius: "50%", border: `2.5px solid ${color}`, display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: color + "10" }}><span style={{ fontSize: 10, fontWeight: 800, color, fontFamily: F }}>{score}</span></div>;
};
export default HealthMini;
