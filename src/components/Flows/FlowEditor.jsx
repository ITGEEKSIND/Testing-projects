import React, { useState } from "react";
import { TRIGGER_TYPES, ACTION_TYPES, EXEC_LOG } from "./flowData";
import { FI } from "./flowHelpers";

export default function FlowEditor({ flow, onBack }) {
  const [showLog, setShowLog] = useState(false);
  const [aiPrompt, setAiPrompt] = useState("");
  const trig = TRIGGER_TYPES.find(t => t.id === flow.trigger) || { label: flow.trigger, color: "#607D8B" };
  const isPublished = flow.status === "published";

  const nodeTypeConfig = {
    trigger: { bg: trig.color, label: "Trigger" },
    action: { bg: "#0073EA", label: "Action" },
    delay: { bg: "#607D8B", label: "Delay" },
    condition: { bg: "#FF9800", label: "Condition" },
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      {/* Top bar */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 20px", borderBottom: "1px solid var(--bd)", background: "#fff" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <button className="btn btn-g" onClick={onBack}>{FI.ArrowLeft()} Back</button>
          <span style={{ fontSize: 16, fontWeight: 700 }}>{flow.name}</span>
          <span className={`schip ${flow.status}`}>{flow.status === "published" ? "Published" : "Draft"}</span>
          <span style={{ fontSize: 11, color: "var(--t3)" }}>v{flow.version}</span>
        </div>
        <div style={{ display: "flex", gap: 6 }}>
          <button className="btn btn-s btn-sm" onClick={() => setShowLog(!showLog)}>{FI.FileText()} Log</button>
          <button className="btn btn-s btn-sm">{FI.Play()} Test</button>
          {flow.status === "draft"
            ? <button className="btn btn-p btn-sm">{FI.Zap(14)} Publish</button>
            : <button className="btn btn-s btn-sm">Unpublish</button>}
        </div>
      </div>

      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
        {/* Left panel — Settings */}
        <div style={{ width: "30%", borderRight: "1px solid var(--bd)", overflow: "auto", padding: 20, background: "#fff" }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 16 }}>Flow Settings</h3>
          <div className="fg"><label className="fl">Name</label><input className="fi" defaultValue={flow.name} /></div>
          <div className="fg"><label className="fl">Description</label><textarea className="fi" style={{ minHeight: 50, resize: "vertical" }} defaultValue={flow.desc} /></div>
          <div className="fg"><label className="fl">Trigger</label>
            <select className="fsel" style={{ width: "100%" }} defaultValue={flow.trigger}>
              {TRIGGER_TYPES.map(t => <option key={t.id} value={t.id}>{t.label} ({t.category})</option>)}
            </select>
          </div>
          <div className="fg"><label className="fl">Send Limit</label>
            <select className="fsel" style={{ width: "100%" }} defaultValue="once">
              <option value="once">Once</option><option value="max_2">Max 2</option><option value="1_per_cycle">1 per billing cycle</option><option value="1_per_30d">1 per 30 days</option><option value="1_per_60d">1 per 60 days</option><option value="every_90d">Every 90 days</option>
            </select>
          </div>
          <div className="fg"><label className="fl">Tags</label><input className="fi" defaultValue={flow.tags.join(", ")} placeholder="trial, onboarding" /></div>

          {isPublished && (
            <div style={{ background: "var(--bg2)", border: "1px solid var(--bd)", borderRadius: "var(--r2)", padding: 14, marginTop: 16 }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: "var(--t2)", marginBottom: 8 }}>Execution Stats</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
                {[
                  { v: flow.executions, l: "Triggered", c: "var(--t1)" },
                  { v: Math.round(flow.executions * 0.9), l: "Executed", c: "#43A047" },
                  { v: Math.round(flow.executions * 0.1), l: "Suppressed", c: "var(--t3)" },
                ].map(s => <div key={s.l} style={{ textAlign: "center" }}><div style={{ fontSize: 18, fontWeight: 700, color: s.c }}>{s.v.toLocaleString()}</div><div style={{ fontSize: 10, color: "var(--t3)" }}>{s.l}</div></div>)}
              </div>
            </div>
          )}

          {/* AI Builder */}
          <div style={{ marginTop: 20 }}>
            <div className="ai-input">
              <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
                {FI.Sparkles()} <span style={{ fontSize: 13, fontWeight: 600 }}>AI Flow Builder</span>
              </div>
              <textarea className="ai-textarea" placeholder="Describe your automation in plain English..." value={aiPrompt} onChange={e => setAiPrompt(e.target.value)} />
              <button className="btn btn-sm btn-p" style={{ marginTop: 8 }} disabled={!aiPrompt.trim()}>{FI.Sparkles(12)} Generate Flow</button>
            </div>
          </div>
        </div>

        {/* Right panel — Visual Canvas */}
        <div className="canvas">
          <div style={{ fontSize: 11, color: "var(--t3)", marginBottom: 16, display: "flex", justifyContent: "space-between" }}>
            <span>Flow Canvas — drag to reorder, click to edit</span>
            <button className="btn btn-sm btn-s">{FI.Plus()} Add Node</button>
          </div>

          {flow.nodes && flow.nodes.length > 0 ? flow.nodes.map((node, idx) => {
            const conf = nodeTypeConfig[node.type] || { bg: "#9E9E9E", label: "Node" };
            const actionType = node.actionType ? ACTION_TYPES.find(a => a.id === node.actionType) : null;
            const isCondition = node.type === "condition";

            return (
              <div key={node.id}>
                {idx > 0 && !node.branch && <div className="node-connector" />}
                {node.branch && (
                  <div className="branch-connector">
                    <div className="branch-line" />
                    <span style={{ color: node.branch === "true" ? "#43A047" : "#E53935" }}>
                      {node.branch === "true" ? "✓ Yes" : "✕ No"}
                    </span>
                    <div className="branch-line" style={{ flex: 1 }} />
                  </div>
                )}
                <div className="node">
                  <div className="node-icon" style={{ background: isCondition ? "#FF9800" : node.type === "delay" ? "#607D8B" : node.type === "trigger" ? trig.color : actionType?.color || "#0073EA" }}>
                    {isCondition ? <>{FI.GitBranch(16)}</> : node.type === "delay" ? <>{FI.Clock(16)}</> : node.type === "trigger" ? "⚡" : actionType?.icon || "→"}
                  </div>
                  <div className="node-info">
                    <div className="node-label">{node.label}</div>
                    <div className="node-sub">
                      {node.type === "trigger" && <span className="trigger-chip" style={{ background: trig.color + "18", color: trig.color, fontSize: 10 }}>{trig.label}</span>}
                      {node.type === "delay" && <span style={{ fontFamily: "var(--m)" }}>{node.duration}</span>}
                      {node.type === "condition" && <span style={{ fontFamily: "var(--m)" }}>{node.field} {node.op} {node.val}</span>}
                      {node.type === "action" && actionType && <span style={{ fontSize: 10.5 }}>{actionType.label}</span>}
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: 3 }}>
                    <button className="btn btn-sm btn-g" style={{ padding: 3 }}>{FI.Copy(12)}</button>
                    <button className="btn btn-sm btn-g" style={{ padding: 3 }}>{FI.Trash(12)}</button>
                  </div>
                </div>
              </div>
            );
          }) : (
            <div style={{ textAlign: "center", padding: "60px 20px", color: "var(--t3)" }}>
              <div style={{ fontSize: 32, marginBottom: 12 }}>⚡</div>
              <div style={{ fontSize: 15, fontWeight: 600, color: "var(--t1)", marginBottom: 4 }}>Empty flow</div>
              <div style={{ fontSize: 12 }}>Add a trigger to get started, or use the AI builder</div>
            </div>
          )}

          {/* Action palette */}
          {flow.nodes && flow.nodes.length > 0 && (
            <div style={{ marginTop: 20, padding: 14, background: "#fff", border: "1px dashed var(--bd)", borderRadius: "var(--r2)" }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: "var(--t3)", marginBottom: 8 }}>ADD ACTION</div>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                {ACTION_TYPES.map(a => (
                  <button key={a.id} className="btn btn-sm btn-s" style={{ gap: 4 }}>
                    <span style={{ color: a.color }}>{a.icon}</span> {a.label}
                  </button>
                ))}
                <button className="btn btn-sm btn-s" style={{ gap: 4 }}><span style={{ color: "#607D8B" }}>{FI.Clock(12)}</span> Wait</button>
                <button className="btn btn-sm btn-s" style={{ gap: 4 }}><span style={{ color: "#FF9800" }}>{FI.GitBranch(12)}</span> Branch</button>
              </div>
            </div>
          )}
        </div>

        {/* Execution Log Drawer */}
        {showLog && (
          <div style={{ width: 400, borderLeft: "1px solid var(--bd)", background: "#fff", overflow: "auto", flexShrink: 0 }}>
            <div style={{ padding: "12px 16px", borderBottom: "1px solid var(--bd)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: 14, fontWeight: 700 }}>Execution Log</span>
              <button className="btn btn-g btn-sm" onClick={() => setShowLog(false)}>{FI.X()}</button>
            </div>
            {EXEC_LOG.map(log => (
              <div key={log.id} style={{ padding: "10px 16px", borderBottom: "1px solid var(--bd)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                  <span style={{ fontSize: 12, fontWeight: 600 }}>{log.customer}</span>
                  <span className={`schip ${log.result}`}>{log.result}</span>
                </div>
                <div style={{ fontSize: 11, color: "var(--t3)", marginBottom: 4 }}>
                  {log.trigger} · {log.time} · {log.duration}
                </div>
                {log.actions.length > 0 && (
                  <div style={{ fontSize: 11, color: "var(--t2)" }}>
                    {log.actions.map((a, i) => <div key={i}>{a}</div>)}
                  </div>
                )}
                {log.suppressedBy && <div style={{ fontSize: 11, color: "#FF9800", marginTop: 2 }}>Suppressed: {log.suppressedBy}</div>}
                {log.error && <div style={{ fontSize: 11, color: "#E53935", marginTop: 2 }}>{log.error}</div>}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Bottom bar */}
      <div style={{ padding: "10px 20px", borderTop: "1px solid var(--bd)", background: "var(--bg2)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ fontSize: 12, color: "var(--t3)" }}>
          {isPublished && <span>Triggered {flow.executions.toLocaleString()} times · Last: {flow.lastTriggered}</span>}
        </div>
        <div style={{ display: "flex", gap: 6 }}>
          <button className="btn btn-s" onClick={onBack}>Cancel</button>
          <button className="btn btn-p">Save {flow.status === "draft" ? "Draft" : "& Republish"}</button>
        </div>
      </div>
    </div>
  );
}
