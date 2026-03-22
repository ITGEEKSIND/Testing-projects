import { useState } from 'react';
import { CAMPAIGNS } from './emailData';
import { EI } from './emailIcons';
import { StatusChip } from './emailHelpers';

export default function EmailMarketing() {
  const [tab, setTab] = useState("all");
  const [wizard, setWizard] = useState(false);
  const [step, setStep] = useState(1);

  const filtered = CAMPAIGNS.filter(c => tab === "all" || c.status === tab);

  if (wizard) {
    return (
      <div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
          <button className="btn btn-g" onClick={() => { setWizard(false); setStep(1); }}>{EI.ArrowLeft()} Back</button>
          <div style={{ fontSize: 16, fontWeight: 700 }}>New Campaign</div>
          <div />
        </div>
        <div className="wiz-steps">
          {["Audience", "Content", "Schedule", "Review"].map((l, i) => (
            <div key={l} style={{ display: "flex", alignItems: "center", flex: 1 }}>
              <div className={`wiz-s ${step === i + 1 ? "on" : step > i + 1 ? "done" : ""}`}>
                <div className="wiz-n">{step > i + 1 ? EI.Check() : i + 1}</div>
                <div className="wiz-label">{l}</div>
              </div>
              {i < 3 && <div className={`wiz-line ${step > i + 1 ? "done" : ""}`} />}
            </div>
          ))}
        </div>
        <div style={{ background: "#fff", border: "1px solid var(--bd)", borderRadius: "var(--r2)", padding: 28, maxWidth: 600 }}>
          {step === 1 && <><h3 style={{ marginBottom: 16 }}>Audience</h3>
            <div className="fg"><label className="fl">Campaign Name *</label><input className="fi" placeholder="Q1 Feature Launch" /></div>
            <div className="fg"><label className="fl">Segment</label><select className="fsel" style={{ width: "100%" }}><option>Choose segment...</option><option>All Active</option><option>Growth Stores</option><option>Uninstalled 30d</option></select></div>
            <div style={{ background: "var(--pri-l)", padding: "10px 14px", borderRadius: "var(--r)", display: "flex", alignItems: "center", gap: 6, marginBottom: 12, fontSize: 12, fontWeight: 500 }}>{EI.Users()} Estimated reach: <strong>847 merchants</strong></div>
          </>}
          {step === 2 && <><h3 style={{ marginBottom: 16 }}>Content</h3>
            <div className="fg"><label className="fl">Template</label><select className="fsel" style={{ width: "100%" }}><option>Browse Email Center...</option></select></div>
            <div className="fg"><label className="fl">Subject Line</label><input className="fi" defaultValue="Exciting new features!" /></div>
            <div className="fg"><label className="fl">Sender</label><input className="fi" defaultValue="Eric Williams" /></div>
          </>}
          {step === 3 && <><h3 style={{ marginBottom: 16 }}>Schedule</h3>
            {["Send now", "Schedule for later", "Merchant timezone"].map(o => <label key={o} className="chk-row" style={{ padding: "6px 0" }}><input type="radio" name="sched" defaultChecked={o === "Send now"} /><span style={{ fontSize: 12 }}>{o}</span></label>)}
          </>}
          {step === 4 && <><h3 style={{ marginBottom: 16 }}>Review & Send</h3>
            <div style={{ background: "var(--bg2)", border: "1px solid var(--bd)", borderRadius: "var(--r2)", padding: 16 }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, fontSize: 13 }}>
                <div><span style={{ fontSize: 11, color: "var(--t3)" }}>Audience</span><div style={{ fontWeight: 600 }}>Growth — 847</div></div>
                <div><span style={{ fontSize: 11, color: "var(--t3)" }}>Send</span><div style={{ fontWeight: 600 }}>Immediately</div></div>
              </div>
            </div>
          </>}
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 24 }}>
            <button className="btn btn-s" onClick={() => setStep(Math.max(1, step - 1))} disabled={step === 1}>Previous</button>
            {step < 4 ? <button className="btn btn-p" onClick={() => setStep(step + 1)}>Next</button>
              : <button className="btn btn-p" onClick={() => { setWizard(false); setStep(1); }}>Confirm & Send</button>}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="pg-hd">
        <div className="pg-title">Email Marketing <span className="badge">{CAMPAIGNS.length}</span></div>
        <button className="btn btn-p" onClick={() => setWizard(true)}>{EI.Plus()} New Campaign</button>
      </div>
      <div className="tabs">{["all","sent","scheduled","draft","cancelled"].map(t => <div key={t} className={`tab ${tab === t ? "on" : ""}`} onClick={() => setTab(t)}>{t[0].toUpperCase() + t.slice(1)}</div>)}</div>
      <table className="table">
        <thead><tr><th>Campaign</th><th>Audience</th><th>Status</th><th>Date</th><th>Open</th><th>Click</th><th>Actions</th></tr></thead>
        <tbody>{filtered.map(c => <tr key={c.id}>
          <td><div style={{ fontWeight: 600 }}>{c.name}</div><div style={{ fontSize: 11, color: "var(--t3)" }}>{c.desc}</div></td>
          <td><div>{c.audience}</div><div style={{ fontSize: 10, color: "var(--t3)" }}>{c.count.toLocaleString()}</div></td>
          <td><StatusChip status={c.status} /></td><td style={{ fontSize: 12 }}>{c.date || "—"}</td>
          <td style={{ fontWeight: 600 }}>{c.open != null ? `${c.open}%` : "—"}</td>
          <td style={{ fontWeight: 600 }}>{c.click != null ? `${c.click}%` : "—"}</td>
          <td><button className="btn btn-sm btn-g">{c.status === "sent" ? "Report" : "Edit"}</button></td>
        </tr>)}</tbody>
      </table>
    </div>
  );
}
