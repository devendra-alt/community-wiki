import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isLoggedIn: false,
    userRole: null,
    userData: null,
    templeId: null,
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
    setUserRole: (state, actions) => {
      state.userRole = actions.payload;
      localStorage.setItem('selectedRole', state.userRole);
    },
    getUserRole: (state) => {
      state.userRole = localStorage.getItem('selectedRole');
    },
    setUserData: (state, actions) => {
      state.userData = actions.payload;
      state.templeId =
        actions?.payload?.usersPermissionsUser?.data?.attributes.temples.data[0].id;
      localStorage.setItem(
        'templeId',
        actions?.payload?.usersPermissionsUser?.data?.attributes.temples.data[0]
          .id
      );
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
  setUserData,
  getUserRoles,
} = authSlice.actions;
export default authSlice.reducer;
