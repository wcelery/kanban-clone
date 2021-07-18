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
    setMovedCard: (state, { payload: card }) => {
      const entry = state.cards.find((item) => item.id === card.id);
      if (entry.row == card.row) {
        console.log("moved vertically");
        entry.seq_num = card.seq_num;
      } else if (entry.seq_num == card.seq_num) {
        console.log("moved horizontally");
        entry.row = card.row;
      } else {
        console.log("moved diagonally", card);
        entry.row = card.row;
        entry.seq_num = card.seq_num;
      }
    },
  },
});

export const { setCards, setMovedCard } = slice.actions;

export default slice.reducer;

export const selectAllCards = (state) => state.cards;
