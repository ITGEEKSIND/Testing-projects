import { useState } from 'react';

const MODULES = [
  { id: "customer", label: "Customer", icon: "users", subs: [
    { id: "customers", label: "All Customers" },
    { id: "churn-risk", label: "Churn Risk" },
    { id: "segments", label: "Segments" },
  ]},
  { id: "email", label: "Email", icon: "mail", subs: [
    { id: "email-center", label: "Email Center" },
    { id: "customer-template", label: "Customer Template" },
    { id: "email-marketing", label: "Email Marketing" },
    { id: "email-analytics", label: "Email Analytics" },
    { id: "suppression-mgmt", label: "Suppression Mgmt" },
    { id: "suppression-ref", label: "Suppression Rules" },
  ]},
  { id: "revenue", label: "Revenue", icon: "dollar", subs: [
    { id: "mrr", label: "MRR Dashboard" },
    { id: "rev-churn", label: "Revenue Churn" },
    { id: "rev-retention", label: "Retention & Cohorts" },
  ]},
  { id: "flows", label: "Flows", icon: "activity", subs: [
    { id: "flow-list", label: "All Flows" },
    { id: "flow-log", label: "Execution Log" },
  ]},
  { id: "subscription", label: "Subscriptions", icon: "card", section: "Reports", subs: [
    { id: "sub-overview", label: "Overview" },
    { id: "sub-trials", label: "Trials" },
    { id: "sub-churn", label: "Churn" },
    { id: "sub-retention", label: "Retention" },
  ]},
  { id: "platform", label: "Platform", icon: "layers", subs: [
    { id: "plat-feed", label: "Activity Feed" },
    { id: "plat-installs", label: "Install Analytics" },
    { id: "plat-trials", label: "Trials" },
    { id: "plat-churn", label: "Logo Churn" },
    { id: "plat-retention", label: "Retention" },
  ]},
];

const iconSvg = (name, s = 16) => {
  const paths = {
    users: <><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></>,
    mail: <><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></>,
    dollar: <><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></>,
    activity: <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>,
    card: <><rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></>,
    layers: <><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></>,
    chevDown: <path d="m6 9 6 6 6-6"/>,
    settings: <><circle cx="12" cy="12" r="3"/><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/></>,
  };
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      {paths[name]}
    </svg>
  );
};

export { MODULES };

export default function Sidebar({ mod, sub, expanded, onNav, onToggle }) {
  let prevSection = "Main";

  return (
    <div className="sb">
      <div className="sb-logo">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <rect width="24" height="24" rx="4" fill="#323338"/>
          <path d="M7 8h10M7 12h7M7 16h10" stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
        </svg>
        <div><b>account editor</b><small>CRM</small></div>
      </div>
      <div className="sb-nav">
        {MODULES.map(m => {
          const section = m.section || "Main";
          const showHeader = section !== prevSection;
          prevSection = section;
          return (
            <div key={m.id}>
              {showHeader && <div className="sb-hd" style={{ marginTop: 8 }}>{section}</div>}
              {m.id === MODULES[0].id && <div className="sb-hd">Main</div>}
              <div
                className={`sb-item ${mod === m.id ? "" : ""}`}
                style={{ fontWeight: mod === m.id ? 600 : 400 }}
                onClick={() => { onToggle(expanded === m.id ? null : m.id); if (mod !== m.id) onNav(m.id, m.subs[0].id); }}
              >
                {iconSvg(m.icon)}
                {m.label}
                <span style={{ marginLeft: "auto", transform: expanded === m.id ? "rotate(0)" : "rotate(-90deg)", transition: "transform .2s" }}>
                  {iconSvg("chevDown", 14)}
                </span>
              </div>
              {expanded === m.id && m.subs.map(s => (
                <div
                  key={s.id}
                  className={`sb-item sb-indent ${sub === s.id ? "on" : ""}`}
                  onClick={() => onNav(m.id, s.id)}
                >
                  {s.label}
                </div>
              ))}
            </div>
          );
        })}
        <div className="sb-hd" style={{ marginTop: 12 }}>Settings</div>
        <div className="sb-item" style={{ opacity: .45 }}>{iconSvg("settings")} Settings</div>
      </div>
    </div>
  );
}
