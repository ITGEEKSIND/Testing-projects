import { C, F, R } from './designTokens';
const Badge = ({ label, color, bg, dot, pulse }) => (
  <span style={{ display: "inline-flex", alignItems: "center", gap: 4, padding: "2px 8px", borderRadius: R.f, fontSize: 11, fontWeight: 600, color, backgroundColor: bg, fontFamily: F, letterSpacing: .2, whiteSpace: "nowrap" }}>
    {dot && <span style={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: color, animation: pulse ? "pulse 2s ease-in-out infinite" : "none" }} />}
    {label}
  </span>
);
export default Badge;
