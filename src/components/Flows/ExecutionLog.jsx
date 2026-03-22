import React from "react";
import { EXEC_LOG } from "./flowData";
import { FI } from "./flowHelpers";

export default function ExecutionLog() {
  return (
    <div>
      <div className="pg-hd"><div className="pg-title">{FI.FileText(14)} Execution Log</div></div>
      <table className="table">
        <thead><tr><th>ID</th><th>Customer</th><th>Trigger</th><th>Time</th><th>Result</th><th>Duration</th><th>Actions</th></tr></thead>
        <tbody>
          {EXEC_LOG.map(log => (
            <tr key={log.id} style={{ cursor: "default" }}>
              <td style={{ fontFamily: "var(--m)", fontSize: 11 }}>{log.id}</td>
              <td style={{ fontWeight: 600 }}>{log.customer}</td>
              <td><span className="trigger-chip" style={{ background: "var(--bg2)", color: "var(--t2)", fontSize: 10 }}>{log.trigger}</span></td>
              <td style={{ fontSize: 12, color: "var(--t2)" }}>{log.time}</td>
              <td><span className={`schip ${log.result}`}>{log.result}</span></td>
              <td style={{ fontFamily: "var(--m)", fontSize: 11 }}>{log.duration}</td>
              <td style={{ fontSize: 11 }}>
                {log.actions.length > 0 ? log.actions.join(", ") : log.suppressedBy ? <span style={{ color: "#FF9800" }}>Suppressed</span> : "—"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
