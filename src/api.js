/**
 * CRM v2 API Client
 * Connects the React frontend to the Node.js backend
 */

const API_BASE = import.meta.env.VITE_API_URL || '';
const V2_PREFIX = `${API_BASE}/api/v2`;

// ─── Token management ────────────────────────────────────

let accessToken = localStorage.getItem('crm_access_token');
let refreshToken = localStorage.getItem('crm_refresh_token');
let currentMode = localStorage.getItem('crm_mode') || 'development';

export function setTokens(access, refresh) {
  accessToken = access;
  refreshToken = refresh;
  localStorage.setItem('crm_access_token', access);
  localStorage.setItem('crm_refresh_token', refresh);
}

export function setMode(mode) {
  currentMode = mode;
  localStorage.setItem('crm_mode', mode);
}

export function getMode() {
  return currentMode;
}

export function clearAuth() {
  accessToken = null;
  refreshToken = null;
  localStorage.removeItem('crm_access_token');
  localStorage.removeItem('crm_refresh_token');
}

// ─── HTTP client ─────────────────────────────────────────

async function request(method, path, body = null, opts = {}) {
  const url = `${V2_PREFIX}${path}`;
  const separator = path.includes('?') ? '&' : '?';
  const modeParam = `${separator}mode_local_storage=${currentMode}`;
  const fullUrl = opts.skipMode ? url : `${url}${modeParam}`;

  const headers = { 'Content-Type': 'application/json' };
  if (accessToken && !opts.skipAuth) {
    headers.Authorization = `Bearer ${accessToken}`;
  }

  const config = { method, headers };
  if (body && method !== 'GET') {
    config.body = JSON.stringify({ ...body, mode_local_storage: currentMode });
  }

  let res = await fetch(fullUrl, config);

  // Auto-refresh on 401
  if (res.status === 401 && refreshToken && !opts.isRetry) {
    const refreshed = await refreshAccessToken();
    if (refreshed) {
      headers.Authorization = `Bearer ${accessToken}`;
      res = await fetch(fullUrl, { ...config, headers });
    }
  }

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || `HTTP ${res.status}`);
  return data;
}

async function refreshAccessToken() {
  try {
    const res = await fetch(`${V2_PREFIX}/auth/refresh`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken, mode: currentMode }),
    });
    const data = await res.json();
    if (data.status && data.data) {
      setTokens(data.data.accessToken, data.data.refreshToken);
      return true;
    }
    clearAuth();
    return false;
  } catch {
    clearAuth();
    return false;
  }
}

const get = (path) => request('GET', path);
const post = (path, body) => request('POST', path, body);
const put = (path, body) => request('PUT', path, body);
const del = (path, body) => request('DELETE', path, body);

// ─── Auth ────────────────────────────────────────────────

export const auth = {
  login: (email, password, mode) => post('/auth/login', { email, password, mode }),
  logout: () => post('/auth/logout'),
  me: () => get('/auth/me'),
  refresh: () => refreshAccessToken(),
};

// ─── Customers ───────────────────────────────────────────

export const customers = {
  list: (params = {}) => {
    const qs = new URLSearchParams(params).toString();
    return get(`/customers?${qs}`);
  },
  getById: (id) => get(`/customers/${id}`),
  getByDomain: (domain) => get(`/customers/domain/${domain}`),
  update: (id, data) => put(`/customers/${id}`, data),
  addTag: (id, tag) => post(`/customers/${id}/tags`, { tag }),
  removeTag: (id, tag) => del(`/customers/${id}/tags`, { tag }),
  addNote: (id, note) => post(`/customers/${id}/notes`, { note }),
  timeline: (id) => get(`/customers/${id}/timeline`),
  churnDashboard: () => get('/customers/churn-dashboard'),
  refreshHealth: (customerId) => post(`/customers/refresh-health?customerId=${customerId || ''}`),
  bulkAction: (customerIds, action, value) => post('/customers/bulk', { customerIds, action, value }),
};

// ─── Segments ────────────────────────────────────────────

export const segments = {
  list: (params = {}) => {
    const qs = new URLSearchParams(params).toString();
    return get(`/segments?${qs}`);
  },
  getById: (id) => get(`/segments/${id}`),
  create: (data) => post('/segments', data),
  update: (id, data) => put(`/segments/${id}`, data),
  remove: (id) => del(`/segments/${id}`),
  evaluate: (id) => post(`/segments/${id}/evaluate`),
  preview: (rules, matchType) => post('/segments/preview', { rules, matchType }),
};

// ─── Email ───────────────────────────────────────────────

export const email = {
  // Triggers
  listTriggers: (params = {}) => {
    const qs = new URLSearchParams(params).toString();
    return get(`/email/triggers?${qs}`);
  },
  getTrigger: (id) => get(`/email/triggers/${id}`),
  createTrigger: (data) => post('/email/triggers', data),
  updateTrigger: (id, data) => put(`/email/triggers/${id}`, data),
  deleteTrigger: (id) => del(`/email/triggers/${id}`),
  triggersByPhase: () => get('/email/triggers/by-phase'),
  testTrigger: (triggerId, customerId) => post('/email/triggers/test', { triggerId, customerId }),

  // Campaigns
  listCampaigns: (params = {}) => {
    const qs = new URLSearchParams(params).toString();
    return get(`/email/campaigns?${qs}`);
  },
  getCampaign: (id) => get(`/email/campaigns/${id}`),
  createCampaign: (data) => post('/email/campaigns', data),
  updateCampaign: (id, data) => put(`/email/campaigns/${id}`, data),
  deleteCampaign: (id) => del(`/email/campaigns/${id}`),
  sendCampaign: (id) => post(`/email/campaigns/${id}/send`),

  // Analytics
  analytics: (params = {}) => {
    const qs = new URLSearchParams(params).toString();
    return get(`/email/analytics?${qs}`);
  },
  logs: (params = {}) => {
    const qs = new URLSearchParams(params).toString();
    return get(`/email/logs?${qs}`);
  },
  suppressions: () => get('/email/suppressions'),
};

// ─── Revenue ─────────────────────────────────────────────

export const revenue = {
  dashboard: (params = {}) => {
    const qs = new URLSearchParams(params).toString();
    return get(`/revenue/dashboard?${qs}`);
  },
  churn: (params = {}) => {
    const qs = new URLSearchParams(params).toString();
    return get(`/revenue/churn?${qs}`);
  },
  cohorts: () => get('/revenue/cohorts'),
  snapshot: () => post('/revenue/snapshot'),
};

// ─── Flows ───────────────────────────────────────────────

export const flows = {
  list: (params = {}) => {
    const qs = new URLSearchParams(params).toString();
    return get(`/flows?${qs}`);
  },
  getById: (id) => get(`/flows/${id}`),
  create: (data) => post('/flows', data),
  update: (id, data) => put(`/flows/${id}`, data),
  remove: (id) => del(`/flows/${id}`),
  activate: (id) => post(`/flows/${id}/activate`),
  pause: (id) => post(`/flows/${id}/pause`),
  trigger: (id, customerId, eventData) => post(`/flows/${id}/trigger`, { customerId, eventData }),
  templates: () => get('/flows/templates'),

  // Executions
  executions: (params = {}) => {
    const qs = new URLSearchParams(params).toString();
    return get(`/flows/executions?${qs}`);
  },
  getExecution: (id) => get(`/flows/executions/${id}`),
  cancelExecution: (id) => post(`/flows/executions/${id}/cancel`),
};

// ─── Subscriptions ───────────────────────────────────────

export const subscriptions = {
  overview: () => get('/subscriptions/overview'),
  trials: () => get('/subscriptions/trials'),
  churn: () => get('/subscriptions/churn'),
  retention: () => get('/subscriptions/retention'),
};

// ─── Platform ────────────────────────────────────────────

export const platform = {
  activityFeed: (params = {}) => {
    const qs = new URLSearchParams(params).toString();
    return get(`/platform/activity?${qs}`);
  },
  installs: (params = {}) => {
    const qs = new URLSearchParams(params).toString();
    return get(`/platform/installs?${qs}`);
  },
  trials: (params = {}) => {
    const qs = new URLSearchParams(params).toString();
    return get(`/platform/trials?${qs}`);
  },
  logoChurn: (params = {}) => {
    const qs = new URLSearchParams(params).toString();
    return get(`/platform/logo-churn?${qs}`);
  },
  logoRetention: () => get('/platform/logo-retention'),
};

// ─── Health ──────────────────────────────────────────────

export const health = () => get('/health');
