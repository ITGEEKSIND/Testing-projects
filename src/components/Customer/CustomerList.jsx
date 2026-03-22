import { useState } from "react";
import {
  C, F, MO, R, IC, Badge, Btn, Chk, FilterChip,
  HealthMini, LifeBadge, SubBadge, RiskBadge, TagPill,
} from "../Shared";
import { MERCHANTS, SEGMENTS, FLAGS } from "./customerData";

// ── Segment Drawer (from this thread — AND/OR logic) ──────────

const SegDrawer = ({ onClose }) => {
  const [groups, setGroups] = useState([[{ dim: "lifecycle", op: "is", val: "" }]]);
  return <>
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,.3)", zIndex: 999 }} onClick={onClose} />
    <div style={{ position: "fixed", top: 0, right: 0, width: 460, height: "100vh", background: "#fff", borderLeft: `1px solid ${C.g200}`, boxShadow: "-4px 0 24px rgba(0,0,0,.1)", zIndex: 1000, display: "flex", flexDirection: "column" }}>
      <div style={{ padding: "16px 20px", borderBottom: `1px solid ${C.g200}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}><h3 style={{ fontSize: 16, fontWeight: 700, fontFamily: F }}>Segment Builder</h3><div onClick={onClose} style={{ cursor: "pointer" }}><IC n="x" s={18} c={C.g400} /></div></div>
      <div style={{ flex: 1, overflow: "auto", padding: 20 }}>
        <div style={{ marginBottom: 14 }}><label style={{ fontSize: 12, fontWeight: 600, fontFamily: F, display: "block", marginBottom: 5 }}>Name</label><input style={{ width: "100%", padding: "7px 10px", border: `1px solid ${C.g200}`, borderRadius: R.sm, fontSize: 13, fontFamily: F }} placeholder="e.g. High-Value At-Risk" /></div>
        <label style={{ fontSize: 12, fontWeight: 600, fontFamily: F, display: "block", marginBottom: 8 }}>Conditions</label>
        {groups.map((group, gi) => (
          <div key={gi}>
            {gi > 0 && <div style={{ textAlign: "center", padding: "8px 0", fontSize: 11, fontWeight: 600, color: C.pri, textTransform: "uppercase" }}>— OR —</div>}
            <div style={{ border: `1px solid ${C.g200}`, borderRadius: R.md, padding: 14, marginBottom: 12, background: C.g100 }}>
              {group.map((cond, ci) => (
                <div key={ci} style={{ display: "flex", gap: 6, marginBottom: 8, alignItems: "center" }}>
                  <select style={{ padding: "5px 8px", border: `1px solid ${C.g200}`, borderRadius: R.sm, fontSize: 12, fontFamily: F, minWidth: 120 }}>
                    <option>Lifecycle Status</option><option>Sub Status</option><option>Plan</option><option>Plan Price</option><option>Churn Risk</option><option>Country</option><option>Orders Used</option><option>Total Edits</option><option>Tags</option><option>Last Active</option>
                  </select>
                  <select style={{ padding: "5px 8px", border: `1px solid ${C.g200}`, borderRadius: R.sm, fontSize: 12, fontFamily: F }}>
                    <option>is</option><option>is not</option><option>{">"}</option><option>{"<"}</option><option>contains</option><option>in last N days</option>
                  </select>
                  <input style={{ padding: "5px 8px", border: `1px solid ${C.g200}`, borderRadius: R.sm, fontSize: 12, fontFamily: F, width: 100 }} placeholder="Value" />
                </div>
              ))}
              <div onClick={() => { const g = [...groups]; g[gi].push({ dim: "", op: "is", val: "" }); setGroups(g); }} style={{ fontSize: 12, color: C.pri, cursor: "pointer", fontWeight: 500, fontFamily: F }}>+ AND condition</div>
            </div>
          </div>
        ))}
        <div onClick={() => setGroups([...groups, [{ dim: "", op: "is", val: "" }]])} style={{ fontSize: 12, fontFamily: F }}><Btn v="secondary" style={{ padding: "5px 10px", fontSize: 12 }}>+ OR Group</Btn></div>
        <div style={{ marginTop: 24 }}>
          <label style={{ fontSize: 12, fontWeight: 600, fontFamily: F, display: "block", marginBottom: 8 }}>Pre-Built Segments</label>
          {SEGMENTS.map(s => (
            <div key={s.name} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: `1px solid ${C.g200}` }}>
              <div><div style={{ fontSize: 13, fontWeight: 600, fontFamily: F }}>{s.name}</div><div style={{ fontSize: 10.5, color: C.g400, fontFamily: F }}>{s.cond}</div></div>
              <Badge label={String(s.count)} color={C.g500} bg={C.g100} />
            </div>
          ))}
        </div>
      </div>
      <div style={{ padding: "12px 20px", borderTop: `1px solid ${C.g200}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontSize: 12, fontWeight: 500, color: C.pri, fontFamily: F }}>~{MERCHANTS.length} match</span>
        <div style={{ display: "flex", gap: 6 }}><Btn v="secondary" onClick={onClose}>Cancel</Btn><Btn onClick={onClose}>Save Segment</Btn></div>
      </div>
    </div>
  </>;
};

// ── Customer List ─────────────────────────────────────────────

const CustomerList = ({ onSelect }) => {
  const [search, setSearch] = useState("");
  const [selRows, setSelRows] = useState(new Set());
  const [f, setF] = useState({ lifecycle: [], plan: [], risk: [], country: [] });
  const [segOpen, setSegOpen] = useState(false);

  const filtered = MERCHANTS.filter(m => {
    if (search && !m.shopName.toLowerCase().includes(search.toLowerCase()) && !m.domain.toLowerCase().includes(search.toLowerCase()) && !m.contactName.toLowerCase().includes(search.toLowerCase())) return false;
    if (f.lifecycle.length && !f.lifecycle.includes(m.lifecycle)) return false;
    if (f.plan.length && !f.plan.includes(m.plan)) return false;
    if (f.risk.length && !f.risk.includes(m.churnTier)) return false;
    if (f.country.length && !f.country.includes(m.country)) return false;
    return true;
  });

  const allSel = selRows.size === filtered.length && filtered.length > 0;
  const someSel = selRows.size > 0;
  const toggle = id => { const n = new Set(selRows); n.has(id) ? n.delete(id) : n.add(id); setSelRows(n); };
  const toggleAll = () => setSelRows(allSel ? new Set() : new Set(filtered.map(m => m.id)));

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <h1 style={{ margin: 0, fontSize: 20, fontWeight: 700, fontFamily: F, color: C.g700 }}>Customers</h1>
          <Badge label={`${MERCHANTS.length} merchants`} color={C.g500} bg={C.g100} />
        </div>
        <div style={{ display: "flex", gap: 7 }}>
          <Btn v="secondary" icon="layers" onClick={() => setSegOpen(true)}>Segments</Btn>
          <Btn v="secondary" icon="download">Export</Btn>
          {someSel && <Btn v="secondary" icon="tag">Bulk ({selRows.size})</Btn>}
          <Btn icon="plus">Add Lead</Btn>
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 7, flex: 1, maxWidth: 340, padding: "6px 10px", borderRadius: R.md, border: `1px solid ${C.g200}`, backgroundColor: C.w }}>
          <IC n="search" s={14} c={C.g400} />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search merchants..." style={{ border: "none", outline: "none", flex: 1, fontSize: 13, fontFamily: F, color: C.g600, background: "transparent" }} />
          {search && <div onClick={() => setSearch("")} style={{ cursor: "pointer" }}><IC n="x" s={13} c={C.g400} /></div>}
        </div>
      </div>
      <div style={{ display: "flex", gap: 7, marginBottom: 14, flexWrap: "wrap" }}>
        <FilterChip label="Status" options={["subscribed", "installed", "cancelled", "uninstalled", "lost", "lead"]} sel={f.lifecycle} onChange={v => setF(p => ({ ...p, lifecycle: v }))} />
        <FilterChip label="Plan" options={["Starter", "Growth", "Pro", "Scale", "Enterprise"]} sel={f.plan} onChange={v => setF(p => ({ ...p, plan: v }))} />
        <FilterChip label="Risk" options={["low", "6_12_weeks", "2_6_weeks", "0_2_weeks"]} sel={f.risk} onChange={v => setF(p => ({ ...p, risk: v }))} />
        <FilterChip label="Country" options={["US", "CA", "GB", "AU", "DE", "BR", "IN", "JP"]} sel={f.country} onChange={v => setF(p => ({ ...p, country: v }))} />
        {Object.values(f).some(x => x.length > 0) && (
          <span onClick={() => setF({ lifecycle: [], plan: [], risk: [], country: [] })} style={{ fontSize: 11, color: C.pri, cursor: "pointer", fontFamily: F, fontWeight: 500, alignSelf: "center" }}>Clear all</span>
        )}
      </div>
      <div style={{ backgroundColor: C.w, borderRadius: R.lg, border: `1px solid ${C.g200}`, overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: `1px solid ${C.g200}`, backgroundColor: C.g100 }}>
              <th style={{ padding: "9px 10px", width: 36 }}><Chk checked={allSel} ind={someSel && !allSel} onChange={toggleAll} /></th>
              {["Store", "Status", "Plan", "MRR", "Health", "Risk", "Orders", "Last Active", "Country"].map(h => (
                <th key={h} style={{ padding: "9px 10px", textAlign: "left", fontSize: 10.5, fontWeight: 600, color: C.g400, fontFamily: F, textTransform: "uppercase", letterSpacing: .3 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map(m => {
              const pct = m.orderLimit > 0 ? Math.round((m.ordersUsed / m.orderLimit) * 100) : 0;
              return (
                <tr key={m.id} onClick={() => onSelect(m)} style={{ borderBottom: `1px solid ${C.g100}`, cursor: "pointer", backgroundColor: selRows.has(m.id) ? C.priL : "transparent", transition: "background .1s" }}
                  onMouseEnter={e => { if (!selRows.has(m.id)) e.currentTarget.style.backgroundColor = C.g100; }}
                  onMouseLeave={e => { e.currentTarget.style.backgroundColor = selRows.has(m.id) ? C.priL : "transparent"; }}>
                  <td style={{ padding: "9px 10px" }} onClick={e => e.stopPropagation()}><Chk checked={selRows.has(m.id)} onChange={() => toggle(m.id)} /></td>
                  <td style={{ padding: "9px 10px" }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: C.g700, fontFamily: F }}>{m.shopName}</div>
                    <div style={{ fontSize: 11, color: C.g400, fontFamily: F }}>{FLAGS[m.country] || ""} {m.domain}</div>
                  </td>
                  <td style={{ padding: "9px 10px" }}>
                    <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
                      <LifeBadge s={m.lifecycle} />
                      {m.subStatus && <SubBadge s={m.subStatus} />}
                    </div>
                  </td>
                  <td style={{ padding: "9px 10px" }}>
                    {m.plan ? <span style={{ fontSize: 12, fontWeight: 600, fontFamily: F, color: C.g700 }}>{m.plan} <span style={{ color: C.g400, fontWeight: 400 }}>${m.planPrice}/mo</span></span> : <span style={{ fontSize: 12, color: C.g400 }}>—</span>}
                  </td>
                  <td style={{ padding: "9px 10px", fontWeight: 600, fontFamily: MO, fontSize: 12 }}>{m.mrr > 0 ? `$${m.mrr}` : "—"}</td>
                  <td style={{ padding: "9px 10px" }}><HealthMini score={m.health} /></td>
                  <td style={{ padding: "9px 10px" }}><RiskBadge s={m.churnTier} /></td>
                  <td style={{ padding: "9px 10px" }}>
                    {m.orderLimit > 0 && <>
                      <div style={{ width: 60, height: 5, backgroundColor: C.g200, borderRadius: 3, overflow: "hidden", marginBottom: 2 }}><div style={{ width: `${pct}%`, height: "100%", backgroundColor: pct >= 90 ? C.err : pct >= 70 ? C.warn : C.pri, borderRadius: 3 }} /></div>
                      <span style={{ fontSize: 10, color: C.g400, fontFamily: MO }}>{pct}%</span>
                    </>}
                    {m.orderLimit === 0 && <span style={{ fontSize: 12, color: C.g400 }}>—</span>}
                  </td>
                  <td style={{ padding: "9px 10px", fontSize: 12, color: C.g500, fontFamily: F }}>{m.lastActive}</td>
                  <td style={{ padding: "9px 10px", fontSize: 12 }}>{FLAGS[m.country] || ""} {m.country}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div style={{ padding: "10px 14px", borderTop: `1px solid ${C.g200}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: 12, color: C.g400, fontFamily: F }}>Showing {filtered.length} of {MERCHANTS.length}</span>
          <div style={{ display: "flex", gap: 3 }}>
            {[1, 2, 3].map(p => <button key={p} style={{ width: 28, height: 28, border: `1px solid ${p === 1 ? C.pri : C.g200}`, borderRadius: R.sm, cursor: "pointer", fontSize: 12, fontFamily: F, backgroundColor: p === 1 ? C.pri : C.w, color: p === 1 ? "#fff" : C.g500, fontWeight: p === 1 ? 600 : 400 }}>{p}</button>)}
          </div>
        </div>
      </div>
      {segOpen && <SegDrawer onClose={() => setSegOpen(false)} />}
    </div>
  );
};

export default CustomerList;
