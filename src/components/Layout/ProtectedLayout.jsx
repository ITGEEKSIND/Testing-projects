import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import Sidebar, { MODULES } from './Sidebar';
import Topbar from './Topbar';
import { clearAuth, getMode } from '../../api';

// Customer
import { CustomerList, Detail, ChurnDash } from '../Customer';
// Email
import { EmailCenter, TemplateEditor, CustomerTemplate, EmailMarketing, EmailAnalytics, SuppressionManager as SuppressionMgmt, SuppressionRules as SuppressionRulesRef } from '../Email';
import { Toast } from '../Email/emailHelpers';
import { TemplateChooser } from '../Flows';
// Revenue
import { MRRDashboard, RevenueChurn, RevenueRetention } from '../Revenue';
// Flows
import { FlowList, FlowEditor, ExecutionLog } from '../Flows';
// Subscriptions
import { SubOverview, SubTrials, SubChurn as SubChurnPage, SubRetention as SubRetentionPage } from '../Subs';
// Platform
import { ActivityFeed, InstallAnalytics, TrialsTab, LogoChurn, LogoRetention } from '../Platform';

export default function ProtectedLayout() {
  // Auth check
  const token = localStorage.getItem('crm_access_token');
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  const [mod, setMod] = useState("customer");
  const [sub, setSub] = useState("customers");
  const [expanded, setExpanded] = useState("customer");
  const [custStore, setCustStore] = useState(null);
  const [emailEditTrigger, setEmailEditTrigger] = useState(null);
  const [emailShowEditor, setEmailShowEditor] = useState(false);
  const [emailToast, setEmailToast] = useState(null);
  const [flowEditFlow, setFlowEditFlow] = useState(null);
  const [flowShowTemplates, setFlowShowTemplates] = useState(false);

  const mode = getMode();

  const navTo = (m, s) => {
    setMod(m);
    setSub(s);
    setExpanded(m);
    setCustStore(null);
    setFlowEditFlow(null);
    setEmailShowEditor(false);
  };

  const emailOpenEditor = (t) => { setEmailEditTrigger(t); setEmailShowEditor(true); };
  const emailCloseEditor = () => { setEmailShowEditor(false); setEmailEditTrigger(null); };
  const emailHandleSave = (st) => {
    setEmailToast({ msg: `Template ${st === "active" ? "activated" : "saved as draft"}.`, type: "ok" });
    emailCloseEditor();
  };

  const flowHandleEdit = (f) => { setFlowEditFlow(f); setSub("flow-editor"); };
  const flowHandleBack = () => { setFlowEditFlow(null); setSub("flow-list"); };
  const flowHandleTemplateSelect = (t) => {
    setFlowShowTemplates(false);
    if (t) {
      flowHandleEdit(t);
    } else {
      flowHandleEdit({
        id: "new", name: "New Flow", desc: "", status: "draft",
        trigger: "app.installed", actionsCount: 0, executions: 0,
        lastTriggered: "\u2014", tags: [], createdBy: "rahul@itgeeks.com",
        version: 1, nodes: [],
      });
    }
  };

  const handleSignOut = () => {
    clearAuth();
    window.location.href = '/login';
  };

  return (
    <div className="app">
      <Sidebar
        mod={mod}
        sub={sub}
        expanded={expanded}
        onNav={navTo}
        onToggle={setExpanded}
      />
      <div className="main">
        <Topbar
          mod={mod}
          sub={sub}
          modules={MODULES}
          mode={mode}
          onSignOut={handleSignOut}
        />
        <div className="content">
          {emailToast && <Toast msg={emailToast.msg} type={emailToast.type} onClose={() => setEmailToast(null)} />}
          {flowShowTemplates && <TemplateChooser onClose={() => setFlowShowTemplates(false)} onSelect={flowHandleTemplateSelect} />}

          {/* CUSTOMER */}
          {mod === "customer" && sub === "customers" && !custStore && <CustomerList onSelect={setCustStore} />}
          {mod === "customer" && sub === "customers" && custStore && <Detail store={custStore} onBack={() => setCustStore(null)} />}
          {mod === "customer" && sub === "churn-risk" && !custStore && <ChurnDash onSelect={setCustStore} />}
          {mod === "customer" && sub === "churn-risk" && custStore && <Detail store={custStore} onBack={() => setCustStore(null)} />}
          {mod === "customer" && sub === "segments" && <CustomerList onSelect={setCustStore} />}

          {/* EMAIL */}
          {mod === "email" && !emailShowEditor && sub === "email-center" && <EmailCenter onEdit={emailOpenEditor} />}
          {mod === "email" && emailShowEditor && <TemplateEditor trigger={emailEditTrigger} onBack={emailCloseEditor} onSave={emailHandleSave} />}
          {mod === "email" && sub === "customer-template" && !emailShowEditor && <CustomerTemplate onEdit={emailOpenEditor} />}
          {mod === "email" && sub === "email-marketing" && !emailShowEditor && <EmailMarketing />}
          {mod === "email" && sub === "email-analytics" && !emailShowEditor && <EmailAnalytics />}
          {mod === "email" && sub === "suppression-mgmt" && !emailShowEditor && <SuppressionMgmt />}
          {mod === "email" && sub === "suppression-ref" && !emailShowEditor && <SuppressionRulesRef />}

          {/* REVENUE */}
          {mod === "revenue" && sub === "mrr" && <MRRDashboard />}
          {mod === "revenue" && sub === "rev-churn" && <RevenueChurn />}
          {mod === "revenue" && sub === "rev-retention" && <RevenueRetention />}

          {/* FLOWS */}
          {mod === "flows" && sub === "flow-list" && !flowEditFlow && <FlowList onEdit={flowHandleEdit} onShowTemplates={() => setFlowShowTemplates(true)} />}
          {mod === "flows" && sub === "flow-editor" && flowEditFlow && <FlowEditor flow={flowEditFlow} onBack={flowHandleBack} />}
          {mod === "flows" && sub === "flow-log" && <ExecutionLog />}

          {/* SUBSCRIPTION */}
          {mod === "subscription" && sub === "sub-overview" && <SubOverview />}
          {mod === "subscription" && sub === "sub-trials" && <SubTrials />}
          {mod === "subscription" && sub === "sub-churn" && <SubChurnPage />}
          {mod === "subscription" && sub === "sub-retention" && <SubRetentionPage />}

          {/* PLATFORM */}
          {mod === "platform" && sub === "plat-feed" && <ActivityFeed />}
          {mod === "platform" && sub === "plat-installs" && <InstallAnalytics />}
          {mod === "platform" && sub === "plat-trials" && <TrialsTab />}
          {mod === "platform" && sub === "plat-churn" && <LogoChurn />}
          {mod === "platform" && sub === "plat-retention" && <LogoRetention />}
        </div>
      </div>
    </div>
  );
}
