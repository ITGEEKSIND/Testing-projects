import Badge from './Badge';
export const LIFECYCLE = {
  lead: { l: "Lead", c: "#616161", b: "#F5F5F5" },
  installed: { l: "Installed", c: "#1565C0", b: "#E3F2FD" },
  subscribed: { l: "Subscribed", c: "#2E7D32", b: "#E8F5E9" },
  cancelled: { l: "Cancelled", c: "#E65100", b: "#FFF3E0" },
  uninstalled: { l: "Uninstalled", c: "#C62828", b: "#FDECEA" },
  lost: { l: "Lost", c: "#424242", b: "#EEEEEE" },
};
export const SUB_STATUS = {
  on_trial: { l: "On Trial", c: "#1565C0", b: "#E3F2FD" },
  active: { l: "Active", c: "#2E7D32", b: "#E8F5E9" },
  past_due: { l: "Past Due", c: "#C62828", b: "#FDECEA" },
  frozen: { l: "Frozen", c: "#616161", b: "#F5F5F5" },
};
export const RISK = {
  low: { l: "Low Risk", c: "#2E7D32", b: "#E8F5E9" },
  "6_12_weeks": { l: "6-12 Wks", c: "#F57F17", b: "#FFFDE7" },
  "2_6_weeks": { l: "2-6 Wks", c: "#E65100", b: "#FFF3E0" },
  "0_2_weeks": { l: "0-2 Wks", c: "#C62828", b: "#FDECEA" },
};
export const LifeBadge = ({ s }) => { const m = LIFECYCLE[s]; return m ? <Badge label={m.l} color={m.c} bg={m.b} dot /> : null; };
export const SubBadge = ({ s }) => { const m = SUB_STATUS[s]; return m ? <Badge label={m.l} color={m.c} bg={m.b} /> : null; };
export const RiskBadge = ({ s }) => { const m = RISK[s]; return m ? <Badge label={m.l} color={m.c} bg={m.b} dot pulse={s === "0_2_weeks"} /> : null; };
