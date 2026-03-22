import { F, R } from './designTokens';

export const tagPalette = [
  { bg: "#e8f5e9", fg: "#2e7d32" }, { bg: "#e3f2fd", fg: "#1565c0" },
  { bg: "#fce4ec", fg: "#c62828" }, { bg: "#fff3e0", fg: "#e65100" },
  { bg: "#f3e5f5", fg: "#7b1fa2" }, { bg: "#e0f2f1", fg: "#00695c" },
  { bg: "#fff8e1", fg: "#f57f17" }, { bg: "#ede7f6", fg: "#4527a0" },
];
export const hashClr = (s) => { let h = 0; for (let i = 0; i < s.length; i++) h = s.charCodeAt(i) + ((h << 5) - h); return tagPalette[Math.abs(h) % tagPalette.length]; };
export const TagPill = ({ label, onRemove }) => { const tc = hashClr(label); return <span style={{ display: "inline-flex", alignItems: "center", gap: 3, padding: "2px 8px", borderRadius: R.f, fontSize: 11, fontWeight: 500, fontFamily: F, backgroundColor: tc.bg, color: tc.fg, whiteSpace: "nowrap" }}>{label}{onRemove && <span onClick={e => { e.stopPropagation(); onRemove(); }} style={{ cursor: "pointer", opacity: .7 }}>×</span>}</span>; };
