import React from "react";

export function PlatIc({ d, s = 18 }) {
  return <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">{d}</svg>;
}

export const PIX = {
  Activity: (s) => <PlatIc s={s} d={<polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />} />,
  Users: (s) => <PlatIc s={s} d={<><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /></>} />,
  Mail: (s) => <PlatIc s={s} d={<><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></>} />,
  Dollar: (s) => <PlatIc s={s} d={<><line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></>} />,
  Zap: (s) => <PlatIc s={s} d={<path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z" />} />,
  CC: (s) => <PlatIc s={s} d={<><rect width="20" height="14" x="2" y="5" rx="2" /><line x1="2" y1="10" x2="22" y2="10" /></>} />,
  Bar: (s) => <PlatIc s={s} d={<><line x1="12" y1="20" x2="12" y2="10" /><line x1="18" y1="20" x2="18" y2="4" /><line x1="6" y1="20" x2="6" y2="16" /></>} />,
  Set: (s) => <PlatIc s={s} d={<><circle cx="12" cy="12" r="3" /><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" /></>} />,
  Chev: (s) => <PlatIc s={s || 14} d={<path d="m6 9 6 6 6-6" />} />,
  Layers: (s) => <PlatIc s={s} d={<><polygon points="12 2 2 7 12 12 22 7 12 2" /><polyline points="2 17 12 22 22 17" /><polyline points="2 12 12 17 22 12" /></>} />,
  TrendUp: (s) => <PlatIc s={s || 14} d={<><polyline points="22 7 13.5 15.5 8.5 10.5 2 17" /><polyline points="16 7 22 7 22 13" /></>} />,
  TrendDn: (s) => <PlatIc s={s || 14} d={<><polyline points="22 17 13.5 8.5 8.5 13.5 2 7" /><polyline points="16 17 22 17 22 11" /></>} />,
};

export function platCColor(p) { return p >= 90 ? "#4CAF50" : p >= 80 ? "#8BC34A" : p >= 70 ? "#FFC107" : p >= 60 ? "#FF9800" : p >= 50 ? "#FF5722" : "#E53935"; }
export function platCBg(p) { return p >= 90 ? "#E8F5E9" : p >= 80 ? "#F1F8E9" : p >= 70 ? "#FFFDE7" : p >= 60 ? "#FFF3E0" : p >= 50 ? "#FBE9E7" : "#FDECEA"; }
