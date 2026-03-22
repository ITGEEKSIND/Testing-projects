import { useState } from "react";
import {
  C, F, MO, R, IC, Badge, Btn, KPI, HealthGauge, ProgBar, Modal,
  TagPill, LIFECYCLE, LifeBadge, SubBadge, RiskBadge,
} from "../Shared";
import { FLAGS, MILESTONES, TIMELINE, ORDERS, EMAILS } from "./customerData";

const Detail = ({ store: m, onBack }) => {
  const [tab, setTab] = useState("overview");
  const [blockModal, setBlockModal] = useState(false);
  const pct = m.orderLimit > 0 ? Math.round((m.ordersUsed / m.orderLimit) * 100) : 0;
  const initials = m.shopName.split(" ").map(w => w[0]).join("").slice(0, 2);
  const lcColor = LIFECYCLE[m.lifecycle]?.c || "#999";

  const tabs = [
    { k: "overview", l: "Overview" },
    { k: "orders", l: "Orders" },
    { k: "emails", l: "Emails" },
    { k: "metrics", l: "Usage" },
    { k: "notes", l: "Notes & Tags" },
  ];

  return (
    <div>
      {/* Back + Quick Actions */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
        <div onClick={onBack} style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: C.g500, fontFamily: F }}><IC n="chevL" s={16} c={C.g500} /> Back to Customers</div>
        <div style={{ display: "flex", gap: 6 }}>
          <Btn v="secondary" icon="note" style={{ padding: "5px 10px", fontSize: 12 }}>Note</Btn>
          <Btn v="secondary" icon="tag" style={{ padding: "5px 10px", fontSize: 12 }}>Tag</Btn>
          <Btn v="secondary" icon="mail" style={{ padding: "5px 10px", fontSize: 12 }}>Email</Btn>
          <Btn v="secondary" icon="userPlus" style={{ padding: "5px 10px", fontSize: 12 }}>Assign</Btn>
          <Btn v="secondary" icon="ext" style={{ padding: "5px 10px", fontSize: 12 }}>Shopify</Btn>
          <Btn v="secondary" icon="block" danger={m.lifecycle !== "uninstalled"} style={{ padding: "5px 10px", fontSize: 12 }} onClick={() => setBlockModal(true)}>Block</Btn>
        </div>
      </div>

      {/* Header Card */}
      <div style={{ backgroundColor: C.w, borderRadius: R.lg, border: `1px solid ${C.g200}`, padding: "18px 22px", marginBottom: 16, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ width: 52, height: 52, borderRadius: "50%", backgroundColor: lcColor, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, fontWeight: 700, color: "#fff", fontFamily: F }}>{initials}</div>
          <div>
            <div style={{ fontSize: 20, fontWeight: 700, fontFamily: F, color: C.g700 }}>{m.shopName}</div>
            <div style={{ fontSize: 12, color: C.g400, fontFamily: MO }}>{m.domain}</div>
            <div style={{ display: "flex", gap: 6, marginTop: 6 }}>
              <LifeBadge s={m.lifecycle} />
              {m.subStatus && <SubBadge s={m.subStatus} />}
              <RiskBadge s={m.churnTier} />
            </div>
          </div>
        </div>
        <HealthGauge score={m.health} />
      </div>

      {/* KPI Strip */}
      <div style={{ display: "flex", gap: 10, marginBottom: 16 }}>
        <KPI icon="dollar" label="Lifetime Value" value={`$${m.ltv.toLocaleString()}`} color={C.ok} />
        <KPI icon="trending" label="Current MRR" value={m.mrr > 0 ? `$${m.mrr}` : "\u2014"} color={C.pri} />
        <KPI icon="bag" label="Plan" value={m.plan ? `${m.plan} / $${m.planPrice}` : "\u2014"} color={C.purp} />
        <KPI icon="chart" label="Orders" value={m.orderLimit > 0 ? `${m.ordersUsed.toLocaleString()} / ${m.orderLimit.toLocaleString()} (${pct}%)` : "\u2014"} color={C.ind} />
        <KPI icon="clock" label="First Seen" value={m.installedAt} color={C.g400} />
        <KPI icon="activity" label="Last Active" value={m.lastActive} color={m.logins7d > 0 ? C.ok : C.err} />
      </div>

      {/* Contact + Plan Info */}
      <div style={{ backgroundColor: C.w, borderRadius: R.lg, border: `1px solid ${C.g200}`, padding: "14px 18px", marginBottom: 14 }}>
        <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
          {[
            { l: "Contact", v: m.contactName },
            { l: "Email", v: m.email },
            { l: "Phone", v: m.phone },
            { l: "Country", v: `${FLAGS[m.country] || ""} ${m.country}` },
            { l: "Shopify Plan", v: m.shopifyPlan },
            { l: "Billing", v: m.billing || "\u2014" },
            { l: "Owner", v: m.owner || "Unassigned" },
          ].map(f => (
            <div key={f.l} style={{ minWidth: 100 }}>
              <div style={{ fontSize: 11, color: C.g400, fontFamily: F, marginBottom: 2 }}>{f.l}</div>
              <div style={{ fontSize: 13, fontWeight: 500, color: C.g700, fontFamily: F }}>{f.v}</div>
            </div>
          ))}
        </div>
        {m.tags.length > 0 && <div style={{ display: "flex", gap: 5, marginTop: 10, alignItems: "center" }}><span style={{ fontSize: 11, color: C.g400, fontFamily: F }}>Tags:</span>{m.tags.map(t => <TagPill key={t} label={t} />)}</div>}
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: 0, borderBottom: `2px solid ${C.g200}`, marginBottom: 14 }}>
        {tabs.map(t => (
          <div key={t.k} onClick={() => setTab(t.k)} style={{ padding: "9px 18px", fontSize: 13, fontWeight: tab === t.k ? 600 : 400, color: tab === t.k ? C.pri : C.g400, borderBottom: tab === t.k ? `2px solid ${C.pri}` : "2px solid transparent", marginBottom: -2, cursor: "pointer", fontFamily: F, transition: "all .15s" }}>{t.l}</div>
        ))}
      </div>

      {/* OVERVIEW TAB */}
      {tab === "overview" && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: 16 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {/* Customer Journey */}
            <div style={{ backgroundColor: C.w, borderRadius: R.lg, border: `1px solid ${C.g200}`, padding: "16px" }}>
              <h4 style={{ margin: "0 0 14px 0", fontSize: 13, fontWeight: 600, color: C.g600, fontFamily: F }}>Customer Journey</h4>
              <div style={{ display: "flex", gap: 0, position: "relative", overflowX: "auto", padding: "0 10px" }}>
                <div style={{ position: "absolute", top: 14, left: 10, right: 10, height: 2, background: C.g300, zIndex: 0 }} />
                {MILESTONES.map(ms => (
                  <div key={ms.key} style={{ display: "flex", flexDirection: "column", alignItems: "center", minWidth: 70, position: "relative", zIndex: 1 }}>
                    <div style={{ width: 10, height: 10, borderRadius: "50%", backgroundColor: ms.done ? C.g600 : C.w, border: `2.5px solid ${C.g600}`, marginBottom: 8 }} />
                    <div style={{ fontSize: 10, fontWeight: 600, color: ms.done ? C.g600 : C.g400, fontFamily: F, textAlign: "center" }}>{ms.label}</div>
                    <div style={{ fontSize: 9, color: C.g400, fontFamily: F, textAlign: "center", marginTop: 2 }}>{ms.desc}</div>
                  </div>
                ))}
              </div>
            </div>
            {/* Activity Timeline */}
            <div style={{ backgroundColor: C.w, borderRadius: R.lg, border: `1px solid ${C.g200}`, padding: 16 }}>
              <h4 style={{ margin: "0 0 14px 0", fontSize: 13, fontWeight: 600, color: C.g600, fontFamily: F }}>Activity Timeline</h4>
              {TIMELINE.map((ev, i) => (
                <div key={i} style={{ display: "flex", gap: 12, padding: "10px 0", borderBottom: i < TIMELINE.length - 1 ? `1px solid ${C.g100}` : "none" }}>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: ev.color, marginTop: 5, flexShrink: 0 }} />
                  <div style={{ flex: 1, fontSize: 13, color: C.g600, fontFamily: F }}>{ev.text}</div>
                  <div style={{ fontSize: 11, color: C.g400, fontFamily: F, flexShrink: 0 }}>{ev.time}</div>
                </div>
              ))}
            </div>
          </div>
          {/* Right sidebar */}
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {/* Subscription Card */}
            <div style={{ backgroundColor: C.w, borderRadius: R.lg, border: `1px solid ${C.g200}`, padding: 16 }}>
              <h4 style={{ margin: "0 0 12px 0", fontSize: 13, fontWeight: 600, color: C.g600, fontFamily: F }}>Subscription</h4>
              {[["Plan", m.plan ? `${m.plan} \u2014 $${m.planPrice}/mo` : "\u2014"], ["Status", m.subStatus || "\u2014"], ["Billing", m.billing || "\u2014"], ["Renewal", "April 15, 2026"], ["Usage", m.orderLimit > 0 ? `${m.ordersUsed.toLocaleString()} / ${m.orderLimit.toLocaleString()} (${pct}%)` : "\u2014"], ["Shopify", m.shopifyPlan], ["Country", `${FLAGS[m.country] || ""} ${m.country}`], ["Installed", m.installedAt], ["Owner", m.owner || "Unassigned"]].map(([l, v]) => (
                <div key={l} style={{ display: "flex", justifyContent: "space-between", padding: "7px 0", borderBottom: `1px solid ${C.g100}`, fontSize: 12, fontFamily: F }}><span style={{ color: C.g400 }}>{l}</span><span style={{ color: C.g700, fontWeight: 600 }}>{v}</span></div>
              ))}
            </div>
            {/* Churn Risk */}
            {m.churnFactors.length > 0 && (
              <div style={{ backgroundColor: C.w, borderRadius: R.lg, border: `1px solid ${C.g200}`, padding: 16 }}>
                <h4 style={{ margin: "0 0 10px 0", fontSize: 13, fontWeight: 600, color: C.g600, fontFamily: F }}>Churn Risk</h4>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}><RiskBadge s={m.churnTier} /><span style={{ fontSize: 12, color: C.g400, fontFamily: MO }}>Score: {m.churnScore.toFixed(2)}</span></div>
                {m.churnFactors.map((f, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 6, padding: "4px 0", fontSize: 12, fontFamily: F, color: C.g600 }}><IC n="shield" s={12} c={C.err} /> {f.replace(/_/g, " ")}</div>
                ))}
              </div>
            )}
            {/* Onboarding */}
            <div style={{ backgroundColor: C.w, borderRadius: R.lg, border: `1px solid ${C.g200}`, padding: 16 }}>
              <h4 style={{ margin: "0 0 10px 0", fontSize: 13, fontWeight: 600, color: C.g600, fontFamily: F }}>Onboarding</h4>
              <ProgBar value={m.onboardingStep} max={4} color={m.onboardingStep === 4 ? C.ok : C.pri} h={8} />
              <div style={{ fontSize: 11, color: C.g400, fontFamily: F, marginTop: 4 }}>{m.onboardingStep}/4 steps complete</div>
            </div>
          </div>
        </div>
      )}

      {/* ORDERS TAB */}
      {tab === "orders" && (
        <div style={{ backgroundColor: C.w, borderRadius: R.lg, border: `1px solid ${C.g200}` }}>
          <div style={{ padding: "14px 18px", borderBottom: `1px solid ${C.g200}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h4 style={{ margin: 0, fontSize: 13, fontWeight: 600, color: C.g600, fontFamily: F }}>Orders History</h4>
          </div>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead><tr style={{ borderBottom: `1px solid ${C.g200}` }}>{["Order ID", "Customer", "Created", "Status", "Edits"].map(h => <th key={h} style={{ padding: "9px 14px", textAlign: "left", fontSize: 11, fontWeight: 600, color: C.g400, fontFamily: F, textTransform: "uppercase" }}>{h}</th>)}</tr></thead>
            <tbody>{ORDERS.map((o, i) => {
              const stC = { UNFULFILLED: { c: "#c62828", b: "#ffebee" }, "PARTIALLY FULFILLED": { c: C.g500, b: C.g100 }, "ON HOLD": { c: "#e65100", b: "#fff3e0" }, FULFILLED: { c: "#2e7d32", b: "#e8f5e9" } }[o.status] || { c: C.g500, b: C.g100 };
              return <tr key={i} style={{ borderBottom: `1px solid ${C.g100}` }}>
                <td style={{ padding: "10px 14px", fontSize: 13, fontFamily: MO, color: C.g600 }}>{o.id}</td>
                <td style={{ padding: "10px 14px", fontSize: 13, fontFamily: F, color: C.g600 }}>{o.cust}</td>
                <td style={{ padding: "10px 14px", fontSize: 12, fontFamily: F, color: C.g400 }}>{o.created}</td>
                <td style={{ padding: "10px 14px" }}><Badge label={o.status} color={stC.c} bg={stC.b} /></td>
                <td style={{ padding: "10px 14px", fontSize: 12, fontWeight: 600, fontFamily: F }}>{o.edits}</td>
              </tr>;
            })}</tbody>
          </table>
        </div>
      )}

      {/* EMAILS TAB */}
      {tab === "emails" && (
        <div style={{ backgroundColor: C.w, borderRadius: R.lg, border: `1px solid ${C.g200}` }}>
          <div style={{ padding: "14px 18px", borderBottom: `1px solid ${C.g200}` }}>
            <h4 style={{ margin: 0, fontSize: 13, fontWeight: 600, color: C.g600, fontFamily: F }}>Emails Sent</h4>
          </div>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead><tr style={{ borderBottom: `1px solid ${C.g200}` }}>{["Date", "Subject", "Trigger", "Status"].map(h => <th key={h} style={{ padding: "9px 14px", textAlign: "left", fontSize: 11, fontWeight: 600, color: C.g400, fontFamily: F, textTransform: "uppercase" }}>{h}</th>)}</tr></thead>
            <tbody>{EMAILS.map((e, i) => (
              <tr key={i} style={{ borderBottom: `1px solid ${C.g100}` }}>
                <td style={{ padding: "9px 14px", fontSize: 12, color: C.g400, fontFamily: F }}>{e.date}</td>
                <td style={{ padding: "9px 14px", fontSize: 13, fontWeight: 500, fontFamily: F, color: C.g600 }}>{e.name}</td>
                <td style={{ padding: "9px 14px" }}><span style={{ fontFamily: MO, fontSize: 11, color: C.g400, padding: "2px 6px", backgroundColor: C.g100, borderRadius: R.sm }}>{e.trigger}</span></td>
                <td style={{ padding: "9px 14px" }}><Badge label={e.status} color={e.status === "Clicked" ? "#1565c0" : e.status === "Opened" ? "#2e7d32" : C.g500} bg={e.status === "Clicked" ? "#e3f2fd" : e.status === "Opened" ? "#e8f5e9" : C.g100} /></td>
              </tr>
            ))}</tbody>
          </table>
        </div>
      )}

      {/* USAGE TAB */}
      {tab === "metrics" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div style={{ display: "flex", gap: 10 }}>
            <KPI icon="edit" label="Edits This Month" value={String(m.edits30d)} trend={12} color={C.ind} />
            <KPI icon="bag" label="Orders Used" value={m.ordersUsed.toLocaleString()} color={C.pri} />
            <KPI icon="clock" label="Edit Rate" value={`${m.editRate}%`} color={C.warn} />
            <KPI icon="chart" label="Logins (7d)" value={String(m.logins7d)} color={C.ok} />
          </div>
          <div style={{ display: "flex", gap: 14 }}>
            <div style={{ flex: 1, backgroundColor: C.w, borderRadius: R.lg, border: `1px solid ${C.g200}`, padding: 18 }}>
              <h4 style={{ margin: "0 0 14px", fontSize: 13, fontWeight: 600, color: C.g600, fontFamily: F }}>Order Volume</h4>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                {[["Used", m.ordersUsed.toLocaleString()], ["Limit", m.orderLimit.toLocaleString()], ["Usage", `${pct}%`], ["Cycle Resets", "Apr 15"]].map(([l, v]) => (
                  <div key={l}><div style={{ fontSize: 11, color: C.g400, fontFamily: F }}>{l}</div><div style={{ fontSize: 18, fontWeight: 700, fontFamily: F }}>{v}</div></div>
                ))}
              </div>
            </div>
            <div style={{ flex: 1, backgroundColor: C.w, borderRadius: R.lg, border: `1px solid ${C.g200}`, padding: 18 }}>
              <h4 style={{ margin: "0 0 14px", fontSize: 13, fontWeight: 600, color: C.g600, fontFamily: F }}>Edit Tracking</h4>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                {[["Total", String(m.edits)], ["Last 30d", String(m.edits30d)], ["Rate", `${m.editRate}%`], ["Widget", m.widgetBoth ? "Both Pages \u2713" : "Incomplete \u2715"]].map(([l, v]) => (
                  <div key={l}><div style={{ fontSize: 11, color: C.g400, fontFamily: F }}>{l}</div><div style={{ fontSize: 18, fontWeight: 700, fontFamily: F, color: v.includes("\u2715") ? C.err : C.g700 }}>{v}</div></div>
                ))}
              </div>
            </div>
          </div>
          <div style={{ backgroundColor: C.w, borderRadius: R.lg, border: `1px solid ${C.g200}`, padding: 18 }}>
            <h4 style={{ margin: "0 0 14px", fontSize: 13, fontWeight: 600, color: C.g600, fontFamily: F }}>Onboarding Progress</h4>
            <div style={{ display: "flex", gap: 16 }}>
              {["Install App", "Approve Trial", "Add Widget", "First Edit"].map((step, i) => {
                const done = i < m.onboardingStep;
                return <div key={step} style={{ flex: 1, textAlign: "center" }}>
                  <div style={{ width: 32, height: 32, borderRadius: 16, background: done ? C.ok : C.g200, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 6px", fontSize: 14, fontWeight: 600, fontFamily: F }}>{done ? "\u2713" : i + 1}</div>
                  <div style={{ fontSize: 11, color: done ? C.ok : C.g400, fontWeight: 500, fontFamily: F }}>{step}</div>
                </div>;
              })}
            </div>
          </div>
        </div>
      )}

      {/* NOTES & TAGS TAB */}
      {tab === "notes" && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: 16 }}>
          <div style={{ backgroundColor: C.w, borderRadius: R.lg, border: `1px solid ${C.g200}`, padding: 18 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 14 }}><h4 style={{ margin: 0, fontSize: 13, fontWeight: 600, color: C.g600, fontFamily: F }}>Notes</h4><Btn style={{ padding: "4px 10px", fontSize: 12 }} icon="plus">Add Note</Btn></div>
            {[
              { author: "Eric", text: "Discussed upgrade to Growth plan. Interested but wants Month 1 data first.", time: "5d ago" },
              { author: "Nilesh", text: "Helped configure widget on custom theme. Resolved via Crisp.", time: "12d ago" },
            ].map((n, i) => (
              <div key={i} style={{ padding: "12px 0", borderBottom: `1px solid ${C.g100}` }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}><span style={{ fontSize: 12, fontWeight: 600, color: C.pri, fontFamily: F }}>{n.author}</span><span style={{ fontSize: 11, color: C.g400, fontFamily: F }}>{n.time}</span></div>
                <div style={{ fontSize: 13, color: C.g600, fontFamily: F, lineHeight: 1.5 }}>{n.text}</div>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div style={{ backgroundColor: C.w, borderRadius: R.lg, border: `1px solid ${C.g200}`, padding: 16 }}>
              <h4 style={{ margin: "0 0 10px", fontSize: 13, fontWeight: 600, color: C.g600, fontFamily: F }}>Tags</h4>
              <div style={{ display: "flex", gap: 4, flexWrap: "wrap", marginBottom: 8 }}>{m.tags.map(t => <TagPill key={t} label={t} onRemove={() => {}} />)}</div>
              <input style={{ width: "100%", padding: "6px 10px", border: `1px solid ${C.g200}`, borderRadius: R.sm, fontSize: 12, fontFamily: F }} placeholder="Add tag..." />
            </div>
            <div style={{ backgroundColor: C.w, borderRadius: R.lg, border: `1px solid ${C.g200}`, padding: 16 }}>
              <h4 style={{ margin: "0 0 10px", fontSize: 13, fontWeight: 600, color: C.g600, fontFamily: F }}>Custom Fields</h4>
              {[["NPS Score", "8"], ["Industry", "Fashion"], ["Account Tier", "Standard"]].map(([l, v]) => (
                <div key={l} style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", borderBottom: `1px solid ${C.g100}`, fontSize: 12, fontFamily: F }}><span style={{ color: C.g400 }}>{l}</span><span style={{ color: C.g700, fontWeight: 600 }}>{v}</span></div>
              ))}
            </div>
          </div>
        </div>
      )}

      <Modal open={blockModal} onClose={() => setBlockModal(false)} title="Block Store">
        <div style={{ fontFamily: F }}>
          <p style={{ fontSize: 14, color: C.g600, lineHeight: 1.6 }}>Block {m.domain}? The merchant will immediately lose access.</p>
          <label style={{ fontSize: 12, fontWeight: 500, color: C.g500, marginTop: 14, display: "block" }}>Reason (optional)</label>
          <textarea style={{ width: "100%", marginTop: 5, padding: 9, borderRadius: R.md, border: `1px solid ${C.g200}`, fontSize: 13, fontFamily: F, resize: "vertical", minHeight: 55 }} placeholder="Payment dispute" />
          <div style={{ display: "flex", justifyContent: "flex-end", gap: 7, marginTop: 18 }}><Btn v="secondary" onClick={() => setBlockModal(false)}>Cancel</Btn><Btn danger>Block Store</Btn></div>
        </div>
      </Modal>
    </div>
  );
};

export default Detail;
