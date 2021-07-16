import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "auth",
  initialState: { user: null, token: null },
  reducers: {
    setCredentials: (state, { payload: user }) => {
      state.user = user;
    },
    setToken: (state, { payload: { token } }) => {
      state.token = token;
    },
  },
});

export const { setCredentials, setToken } = slice.actions;

export default slice.reducer;

export const selectCurrentUser = (state) => state.auth.user;
