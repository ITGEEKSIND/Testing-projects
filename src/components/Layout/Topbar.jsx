export default function Topbar({ mod, sub, modules, mode, onSignOut }) {
  return (
    <div className="topbar">
      <div style={{ fontSize: 13, fontWeight: 600, color: "#323338" }}>
        {modules.find(m => m.id === mod)?.label || ""}
        <span style={{ color: "#9699A6", fontWeight: 400 }}>
          {" / "}
          {modules.find(m => m.id === mod)?.subs.find(s => s.id === sub)?.label || ""}
        </span>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <span style={{
          padding: "3px 8px",
          borderRadius: 4,
          fontSize: 10,
          fontWeight: 600,
          background: mode === "production" ? "#FFF4E5" : "#E8F5E8",
          color: mode === "production" ? "#D48806" : "#258750",
          border: `1px solid ${mode === "production" ? "#FDAB3D" : "#C5E8C5"}`,
        }}>
          {mode === "production" ? "Production" : "Development"}
        </span>
        <span
          style={{ fontSize: 12, color: "#676879", cursor: "pointer" }}
          onClick={onSignOut}
        >
          Sign Out
        </span>
      </div>
    </div>
  );
}
