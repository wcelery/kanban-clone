import { Box, Button, SimpleGrid } from "@chakra-ui/react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useGetCardsMutation, useMoveCardMutation } from "../redux/api/authApi";
import {
  selectAllDecks,
  setCards,
  setMovedCard,
} from "../redux/slices/boardSlice";

import Deck from "./blocks/Deck";
import MainHeader from "./blocks/MainHeader";
import ExpiredSessionModal from "./Modal";

export default function Board() {
  const dispatch = useDispatch();
  const [fetchCards] = useGetCardsMutation();
  const [moveCards] = useMoveCardMutation();
  const decks = useSelector(selectAllDecks); //because mutation is triggered by firing a function, selector is used to auto rerender the cards

  React.useEffect(async () => {
    const initialCards = await fetchCards();
    dispatch(setCards(initialCards));
  }, []);

  const onDragEnd = async (result) => {
    const { source, destination } = result;

    //if move cancelled

    if (!destination) return;

    //if move end up in the same place

    if (
      source.index == destination.index &&
      source.droppableId == destination.droppableId
    ) {
      return;
    }

    if (source.droppableId !== destination.droppableId) {
      //if move diagonally
      const card = decks[source.droppableId].cards?.filter(
        (card) => card.id == result.draggableId
      );

      const movedCard = {
        ...card[0],
        row: destination.droppableId,
        seq_num: destination.index,
      };

      dispatch(
        setMovedCard({
          oldCard: card[0],
          newCard: movedCard,
          startIndex: source,
          endIndex: destination,
        })
      );
      await moveCards(movedCard);
    } else {
      //if move vertically
      const card = decks[source.droppableId].cards?.filter(
        (card) => card.id == result.draggableId
      );

      const movedCard = { ...card[0], seq_num: destination.index };
      dispatch(
        setMovedCard({
          oldCard: card[0],
          newCard: movedCard,
          startIndex: source.index,
          endIndex: destination.index,
        })
      );
      await moveCards(movedCard);
    }
  };

  const getListStyle = (isDraggingOver) => ({
    background: isDraggingOver ? "lightblue" : "",
    padding: 8,
    width: 250,
  });

  return (
    <Box p={4}>
      <MainHeader />
      <ExpiredSessionModal />
      <DragDropContext onDragEnd={(result) => onDragEnd(result)}>
        <SimpleGrid minChildWidth="250px" spacing="40px">
          {decks?.map((deck, index) => (
            <Droppable key={index} droppableId={index.toString()}>
              {(provided, snapshot) => (
                <Box
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  style={getListStyle(snapshot.isDraggingOver)}
                >
                  <Deck key={deck.id} deck={deck} />
                  {provided.placeholder}
                </Box>
              )}
            </Droppable>
          ))}
        </SimpleGrid>
      </DragDropContext>
    </Box>
  );
}
