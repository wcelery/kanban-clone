import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "board",
  initialState: {
    decks: {
      0: { name: "ON-HOLD", color: "orange.300", id: 0, cards: [] },
      1: { name: "IN-PROGRESS", color: "blue.300", id: 1, cards: [] },
      2: { name: "NEEDS REVIEW", color: "purple.300", id: 2, cards: [] },
      3: { name: "APPROVED", color: "green.300", id: 3, cards: [] },
    },
  },
  reducers: {
    setCards: (state, { payload: cards }) => {
      Object.values(state.decks).map((deck, index) => {
        deck.cards.push(...cards?.data.filter((card) => card.row == index));
      });
    },
    setCreatedCard: (state, { payload: createdCard }) => {
      state.decks[createdCard.row].cards.push(createdCard);
    },
    setDeletedCard: (state, { payload: { id, row } }) => {
      state.decks[row].cards = state.decks[row].cards.filter(
        (card) => card.id !== id
      );
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

export const { setCards, setMovedCard, setCreatedCard, setDeletedCard } =
  slice.actions;

export default slice.reducer;

export const selectAllDecks = (state) => Object.values(state.board.decks); //dont do this inside selector
