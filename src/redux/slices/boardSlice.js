import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "board",
  initialState: {
    cards: [],
  },
  reducers: {
    setCards: (state, { payload: cards }) => {
      state.cards = cards.data;
    },
  },
});

export const { setCards } = slice.actions;

export default slice.reducer;

export const selectAllCards = (state) => state.cards;
