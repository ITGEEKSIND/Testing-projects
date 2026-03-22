import { C } from './designTokens';
import IC from './Icon';

const Chk = ({ checked, onChange, ind }) => (
  <div onClick={e => { e.stopPropagation(); onChange(!checked); }} style={{ width: 16, height: 16, borderRadius: 3, cursor: "pointer", border: `1.5px solid ${checked || ind ? C.pri : C.g300}`, backgroundColor: checked || ind ? C.pri : "transparent", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
    {checked && <IC n="check" s={11} c="#fff" />}
    {ind && !checked && <div style={{ width: 8, height: 2, backgroundColor: "#fff", borderRadius: 1 }} />}
  </div>
);
export default Chk;
