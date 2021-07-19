import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "auth",
  initialState: { user: null, token: null, isSessionExpired: false },
  reducers: {
    setCredentials: (state, { payload: user }) => {
      state.user = user;
    },
    setToken: (state, { payload: { token } }) => {
      state.token = token;
    },
    setIsSessionExpired: (state, { payload: isExpired }) => {
      state.isSessionExpired = isExpired;
    },
  },
});

export const { setCredentials, setToken, setIsSessionExpired } = slice.actions;

export default slice.reducer;

export const selectCurrentUser = (state) => state.auth.user;
export const selectIsExpired = (state) => state.auth.isSessionExpired;
