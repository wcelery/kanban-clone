import { createSlice } from "@reduxjs/toolkit";
import { reorder } from "../../utils/reorder";
import { move } from "../../utils/move";

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
      try {
        Object.values(state.decks).map((deck, index) => {
          deck.cards.push(...cards?.data.filter((card) => card.row == index));
        });
      } catch (e) {
        return;
      }
    },
    setCreatedCard: (state, { payload: createdCard }) => {
      state.decks[createdCard.row].cards.push(createdCard);
    },
    setDeletedCard: (state, { payload: { id, row } }) => {
      state.decks[row].cards = state.decks[row].cards.filter(
        (card) => card.id !== id
      );
    },
    setMovedCard: (
      state,
      { payload: { oldCard, newCard, startIndex, endIndex } }
    ) => {
      const entry = state.decks[oldCard.row];
      if (entry.id == newCard.row) {
        reorder(entry.cards, startIndex, endIndex);
      } else {
        move(
          state.decks[oldCard.row].cards,
          state.decks[newCard.row].cards,
          startIndex,
          endIndex
        );
      }
    },
  },
});

export const { setCards, setMovedCard, setCreatedCard, setDeletedCard } =
  slice.actions;

export default slice.reducer;

export const selectAllDecks = (state) => Object.values(state.board.decks); //dont do this inside selector
