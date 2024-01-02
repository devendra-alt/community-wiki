import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    userId: null,
    isLoggedIn: false,
    userRoles: [],
    userRole: null,
  },
  reducers: {
    getAuthState: (state) => {
      if (localStorage.getItem('token')) {
        state.isLoggedIn = true;
        state.userId = localStorage.getItem('id');
        state.userRole = localStorage.getItem('selectedRole');
      }
    },
    setAuthState: (state, actions) => {
      localStorage.setItem('token', actions.payload.jwt);
      localStorage.setItem('id', actions.payload.id);
      state.userId = actions.payload.id;
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      localStorage.clear();
    },
    setUserRoles: (state, actions) => {
      state.userRoles = actions.payload;
      localStorage.setItem('selectedRoles', state.userRoles);
    },
    getUserRoles: (state) => {
      state.userRoles = localStorage.getItem('selectedRoles');
    },
    setUserRole: (state, actions) => {
      state.userRole = actions.payload;
      localStorage.setItem('selectedRole', state.userRole);
    },
    getUserRole: (state) => {
      state.userRole = localStorage.getItem('selectedRole');
    },
  },
});

export const {
  getAuthState,
  setAuthState,
  logout,
  setUserRole,
  getUserRole,
  setUserRoles,
  getUserRoles,
} = authSlice.actions;
export default authSlice.reducer;
