import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "cards",
  initialState: { cards: null },
  reducers: {
    setCards: (state, { payload: cards }) => {
      state.cards = cards;
    },
  },
});

export const { setCards } = slice.actions;

export default slice.reducer;
