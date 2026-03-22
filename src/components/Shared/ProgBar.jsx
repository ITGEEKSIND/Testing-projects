import { C, R } from './designTokens';
const ProgBar = ({ value, max = 100, color = C.pri, h = 6 }) => (
  <div style={{ width: "100%", backgroundColor: C.g200, borderRadius: R.f, height: h, overflow: "hidden" }}><div style={{ width: `${Math.min((value / max) * 100, 100)}%`, height: "100%", backgroundColor: color, borderRadius: R.f, transition: "width .5s" }} /></div>
);
export default ProgBar;
