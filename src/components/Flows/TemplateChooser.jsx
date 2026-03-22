import React from "react";
import { TEMPLATES } from "./flowData";
import { FI } from "./flowHelpers";

export default function TemplateChooser({ onClose, onSelect }) {
  return (
    <div className="modal-ov" onClick={onClose}>
      <div className="modal" style={{ width: 720 }} onClick={e => e.stopPropagation()}>
        <div className="modal-h"><h3>Create New Flow</h3><button className="btn btn-g" onClick={onClose}>{FI.X()}</button></div>
        <div className="modal-b">
          <div className="tmpl-grid">
            <div className="tmpl-card" onClick={() => onSelect(null)} style={{ borderStyle: "dashed", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
              <div style={{ fontSize: 32, color: "var(--t3)", marginBottom: 8 }}>{FI.Plus(28)}</div>
              <div className="tmpl-name">Blank Flow</div>
              <div className="tmpl-desc">Start from scratch</div>
            </div>
            {TEMPLATES.map(t => (
              <div key={t.id} className="tmpl-card" onClick={() => onSelect(t)}>
                <div className="tmpl-icon">{t.icon}</div>
                <div className="tmpl-name">{t.name}</div>
                <div className="tmpl-desc">{t.desc}</div>
                <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                  <span className="trigger-chip" style={{ background: "#F0F2F7", color: "var(--t2)", fontSize: 10 }}>{t.trigger}</span>
                  <span style={{ fontSize: 10, color: "var(--t3)" }}>{t.actions} actions</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
