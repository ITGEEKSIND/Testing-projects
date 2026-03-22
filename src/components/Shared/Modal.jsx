import { C, F, R } from './designTokens';
import IC from './Icon';
const Modal = ({ open, onClose, title, children }) => {
  if (!open) return null;
  return <div style={{ position: "fixed", inset: 0, zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "rgba(0,0,0,.45)" }}>
    <div style={{ backgroundColor: C.w, borderRadius: R.lg, boxShadow: "0 20px 40px rgba(0,0,0,.12)", width: 520, maxHeight: "90vh", display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <div style={{ padding: "16px 22px", borderBottom: `1px solid ${C.g200}`, display: "flex", alignItems: "center", justifyContent: "space-between" }}><h3 style={{ margin: 0, fontSize: 16, fontWeight: 700, fontFamily: F }}>{title}</h3><div onClick={onClose} style={{ cursor: "pointer" }}><IC n="x" s={18} c={C.g400} /></div></div>
      <div style={{ padding: 22, overflowY: "auto", flex: 1 }}>{children}</div>
    </div>
  </div>;
};
export default Modal;
