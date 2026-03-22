import { useState } from 'react';
import { C, F, R } from './designTokens';
import IC from './Icon';
import Chk from './Chk';
const FilterChip = ({ label, options, sel, onChange }) => {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ position: "relative" }}>
      <div onClick={() => setOpen(!open)} style={{ display: "flex", alignItems: "center", gap: 5, padding: "5px 10px", borderRadius: R.md, border: `1px solid ${sel.length > 0 ? C.pri : C.g200}`, backgroundColor: sel.length > 0 ? C.priL : C.w, cursor: "pointer", fontSize: 12, fontFamily: F, fontWeight: 500, color: sel.length > 0 ? C.pri : C.g500 }}>
        {label}{sel.length > 0 && ` (${sel.length})`}<IC n="chevD" s={11} c={sel.length > 0 ? C.pri : C.g400} />
      </div>
      {open && <>
        <div onClick={() => setOpen(false)} style={{ position: "fixed", inset: 0, zIndex: 98 }} />
        <div style={{ position: "absolute", top: "calc(100% + 4px)", left: 0, zIndex: 99, backgroundColor: C.w, borderRadius: R.md, border: `1px solid ${C.g200}`, boxShadow: "0 10px 24px rgba(0,0,0,.08)", minWidth: 170, padding: "5px 0", maxHeight: 220, overflowY: "auto" }}>
          {options.map(o => (
            <div key={o} onClick={() => onChange(sel.includes(o) ? sel.filter(x => x !== o) : [...sel, o])} style={{ padding: "6px 11px", fontSize: 12, fontFamily: F, display: "flex", alignItems: "center", gap: 7, cursor: "pointer", backgroundColor: sel.includes(o) ? C.g100 : "transparent", color: C.g600 }}>
              <Chk checked={sel.includes(o)} onChange={() => {}} />{o}
            </div>
          ))}
        </div>
      </>}
    </div>
  );
};
export default FilterChip;
