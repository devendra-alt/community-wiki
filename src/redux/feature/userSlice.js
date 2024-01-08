import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    data: null,
  },
  reducers: {
    setRenderUserData: (state, actions) => {
      state.data = actions.payload;
    },
  },
});

export const { setRenderUserData } = userSlice.actions;

export default userSlice.reducer;
