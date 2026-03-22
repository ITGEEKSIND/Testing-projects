import { C, F, R } from './designTokens';
import IC from './Icon';

const Btn = ({ children, v = "primary", icon, danger, onClick, style: sx = {} }) => {
  const vs = { primary: { bg: danger ? C.err : C.pri, c: "#fff", bd: "none" }, secondary: { bg: "transparent", c: danger ? C.err : C.g600, bd: `1px solid ${danger ? C.err : C.g200}` }, ghost: { bg: "transparent", c: C.g600, bd: "none" } }[v];
  return <button onClick={onClick} style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "7px 14px", borderRadius: R.md, fontSize: 13, fontWeight: 600, fontFamily: F, cursor: "pointer", backgroundColor: vs.bg, color: vs.c, border: vs.bd || "none", transition: "all .15s", whiteSpace: "nowrap", ...sx }}>{icon && <IC n={icon} s={13} c={vs.c} />}{children}</button>;
};
export default Btn;
