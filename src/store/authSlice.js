import { createSlice } from '@reduxjs/toolkit';
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: localStorage.getItem('crm_access_token'),
    mode: localStorage.getItem('crm_mode') || 'development',
    isAuthenticated: !!localStorage.getItem('crm_access_token'),
  },
  reducers: {
    setCredentials: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
    },
    setAuthMode: (state, action) => { state.mode = action.payload; },
    logout: (state) => { state.user = null; state.token = null; state.isAuthenticated = false; },
  },
});
export const { setCredentials, setAuthMode, logout } = authSlice.actions;
export default authSlice.reducer;
