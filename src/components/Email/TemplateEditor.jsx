import { useState } from 'react';
import { TRIGGERS, SEND_LIMIT_OPTIONS, PRIORITY_TIERS, AUTOMATION_LOG } from './emailData';
import { EI } from './emailIcons';
import { StatusChip, VarPicker } from './emailHelpers';

export default function TemplateEditor({ trigger, onBack, onSave }) {
  const [edTab, setEdTab] = useState("html");
  const [name, setName] = useState(trigger?.name || "");
  const [subject, setSubject] = useState(trigger ? `Subject for ${trigger.name}` : "");
  const [event, setEvent] = useState(trigger?.event || "");
  const [scheduled, setScheduled] = useState(trigger?.delaySeconds > 0);
  const [sendLimit, setSendLimit] = useState(trigger?.sendLimit || "once");
  const [priority, setPriority] = useState(trigger?.priority || "P3");
  const [status, setStatus] = useState(trigger?.status === "active");
  const [showVP, setShowVP] = useState(false);
  const [html, setHtml] = useState(trigger ? `<!-- ${trigger.id}: ${trigger.name} -->\n<html>\n<body>\n  <h1>Hello {merchant_name},</h1>\n  <p>${trigger.name} email content</p>\n</body>\n</html>` : "");

  const allEvents = [...new Set(TRIGGERS.map(t => t.event))].sort();

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 20px", borderBottom: "1px solid var(--bd)", background: "#fff" }}>
        <button className="btn btn-g" onClick={onBack}>{EI.ArrowLeft()} Back to Email Center</button>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          {trigger && <span style={{ fontFamily: "var(--m)", fontSize: 12, color: "var(--t3)" }}>{trigger.id}</span>}
          <span style={{ fontSize: 12, color: "var(--t2)" }}>Status:</span>
          <span onClick={() => setStatus(!status)} style={{ cursor: "pointer", display: "flex" }}>
            {status
              ? <svg width="32" height="18" viewBox="0 0 32 18"><rect width="32" height="18" rx="9" fill="#0073EA"/><circle cx="23" cy="9" r="6" fill="white"/></svg>
              : <svg width="32" height="18" viewBox="0 0 32 18"><rect width="32" height="18" rx="9" fill="#C5C7D0"/><circle cx="9" cy="9" r="6" fill="white"/></svg>}
          </span>
        </div>
      </div>

      <div className="ed-layout" style={{ flex: 1, margin: 0, borderRadius: 0, border: "none" }}>
        <div className="ed-left">
          <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 16 }}>Settings</h3>
          <div className="fg"><label className="fl">Internal Name</label><input className="fi" value={name} onChange={e => setName(e.target.value)} placeholder="Welcome Email" /></div>
          <div className="fg">
            <label className="fl" style={{ display: "flex", justifyContent: "space-between" }}>
              Subject Line
              <span style={{ fontSize: 11, color: "var(--pri)", cursor: "pointer", position: "relative", fontWeight: 500 }} onClick={() => setShowVP(!showVP)}>
                {"{Insert Variable}"}
                {showVP && <VarPicker onSelect={v => setSubject(s => s + v)} onClose={() => setShowVP(false)} />}
              </span>
            </label>
            <input className="fi" value={subject} onChange={e => setSubject(e.target.value)} placeholder="Welcome to {store_name}" />
          </div>
          <div className="fg"><label className="fl">Trigger Event</label>
            <select className="fsel" style={{ width: "100%" }} value={event} onChange={e => setEvent(e.target.value)}>
              <option value="">Select trigger event...</option>
              {allEvents.map(ev => <option key={ev} value={ev}>{ev}</option>)}
            </select>
          </div>
          <div className="fg">
            <label className="chk-row"><input type="checkbox" checked={scheduled} onChange={e => setScheduled(e.target.checked)} /><span style={{ fontSize: 12 }}>Schedule delay</span></label>
            {scheduled && <div style={{ display: "flex", gap: 6, marginTop: 6 }}>
              <input className="fi" type="number" defaultValue={trigger?.delay?.match(/\d+/)?.[0] || 1} style={{ width: 56 }} />
              <select className="fsel" defaultValue="Minute"><option>Minute</option><option>Hour</option><option>Day</option></select>
            </div>}
          </div>
          <div className="fg"><label className="fl">Send Limit</label>
            <select className="fsel" style={{ width: "100%" }} value={sendLimit} onChange={e => setSendLimit(e.target.value)}>
              {SEND_LIMIT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </div>
          <div className="fg"><label className="fl">Priority Tier</label>
            <select className="fsel" style={{ width: "100%" }} value={priority} onChange={e => setPriority(e.target.value)}>
              {PRIORITY_TIERS.map(t => <option key={t.id} value={t.id}>{t.label}</option>)}
            </select>
            <div style={{ fontSize: 10, color: "var(--t3)", marginTop: 3 }}>{PRIORITY_TIERS.find(t => t.id === priority)?.desc}</div>
          </div>
          <div className="fg"><label className="fl">Plan Filter</label>
            {["All Plans", "Starter", "Growth", "Pro", "Scale", "Partner_test"].map(p => (
              <label key={p} className="chk-row"><input type="checkbox" defaultChecked={p === "All Plans"} /><span style={{ fontSize: 12 }}>{p}</span></label>
            ))}
          </div>

          {/* Automation Section */}
          {trigger && <>
            <div style={{ borderTop: "1px solid var(--bd)", margin: "16px 0" }} />
            <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 14, display: "flex", alignItems: "center", gap: 6 }}>{EI.Zap()} Automation</h3>
            <div className="auto-sec">
              <div className="auto-title">Conditions <span style={{ fontSize: 10, color: "var(--t3)", fontWeight: 400 }}>AND — all must be true</span></div>
              {trigger.conditions.length > 0 ? trigger.conditions.map((c, i) => <span key={i} className="cchip g">{EI.Check()} {c}</span>)
                : <span style={{ fontSize: 11, color: "var(--t3)" }}>No conditions</span>}
            </div>
            <div className="auto-sec">
              <div className="auto-title">Suppression Rules <span style={{ fontSize: 10, color: "var(--t3)", fontWeight: 400 }}>OR — any blocks send</span></div>
              {trigger.suppressions.length > 0 ? trigger.suppressions.map((s, i) => <span key={i} className="cchip r">{EI.X()} {s}</span>)
                : <span style={{ fontSize: 11, color: "var(--t3)" }}>No suppression rules</span>}
              <div style={{ marginTop: 8 }}><button className="btn btn-sm btn-s">{EI.Plus()} Add Rule</button></div>
            </div>
            <div className="auto-sec">
              <div className="auto-title">Live Statistics</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
                {[{ v: 3, l: "In Queue", c: "var(--pri)" }, { v: 47, l: "Sent Today", c: "var(--ok)" }, { v: 12, l: "Suppressed", c: "var(--t3)" }].map(s => (
                  <div key={s.l} style={{ textAlign: "center" }}>
                    <div style={{ fontSize: 18, fontWeight: 700, color: s.c }}>{s.v}</div>
                    <div style={{ fontSize: 10, color: "var(--t3)" }}>{s.l}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="auto-sec">
              <div className="auto-title">Recent Log</div>
              <table className="table" style={{ fontSize: 11 }}>
                <thead><tr><th>Time</th><th>Merchant</th><th>Result</th></tr></thead>
                <tbody>
                  {AUTOMATION_LOG.slice(0, 4).map((l, i) => (
                    <tr key={i}><td style={{ fontFamily: "var(--m)", fontSize: 10 }}>{l.time}</td><td style={{ fontSize: 10 }}>{l.merchant.split(".")[0]}</td><td><StatusChip status={l.result} /></td></tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>}
        </div>

        <div className="ed-right">
          <div className="ed-tabs">
            {[["html","HTML"],["preview","Preview"],["test","Test Send"]].map(([k,l]) => (
              <div key={k} className={`ed-tab ${edTab === k ? "on" : ""}`} onClick={() => setEdTab(k)}>{l}</div>
            ))}
          </div>
          <div className="ed-body" style={{ flex: 1 }}>
            {edTab === "html" && <textarea className="html-ta" value={html} onChange={e => setHtml(e.target.value)} placeholder="Write HTML here" spellCheck={false} />}
            {edTab === "preview" && <div style={{ padding: 20 }}><div style={{ background: "#fff", border: "1px solid var(--bd)", borderRadius: 8, padding: 28, maxWidth: 560, margin: "0 auto", minHeight: 260, fontSize: 13, color: "var(--t2)" }}>Preview renders here. Variables like {"{store_name}"} resolve to sample data.</div></div>}
            {edTab === "test" && <div style={{ padding: 20 }}><div className="fg"><label className="fl">Send test to:</label><div style={{ display: "flex", gap: 6 }}><input className="fi" placeholder="eric@accounteditor.com" style={{ flex: 1 }} /><button className="btn btn-p">{EI.Send()} Send</button></div></div></div>}
          </div>
        </div>
      </div>

      <div className="ed-foot">
        <button className="btn btn-g" onClick={onBack}>Cancel</button>
        <div style={{ display: "flex", gap: 6 }}>
          <button className="btn btn-s" onClick={() => onSave("draft")}>Save Draft</button>
          <button className="btn btn-p" onClick={() => onSave("active")}>Save & Activate</button>
        </div>
      </div>
    </div>
  );
}
