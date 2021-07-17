import { Box, SimpleGrid } from "@chakra-ui/react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useGetCardsMutation, useMoveCardMutation } from "../redux/api/authApi";
import { selectAllCards, setCards } from "../redux/slices/boardSlice";

import Deck from "./blocks/Deck";
import MainHeader from "./blocks/MainHeader";

export default function Board() {
  const decks = [
    { name: "ON-HOLD", color: "orange.300", id: 0 },
    { name: "IN-PROGRESS", color: "blue.300", id: 1 },
    { name: "NEEDS REVIEW", color: "purple.300", id: 2 },
    { name: "APPROVED", color: "green.300", id: 3 },
  ];

  const dispatch = useDispatch();
  const [fetchCards] = useGetCardsMutation();
  const [moveCards] = useMoveCardMutation();
  const updatedCards = useSelector(selectAllCards); //because mutation is triggered by firing a function, selector is used to auto rerender the cards

  React.useEffect(async () => {
    const initialCards = await fetchCards();
    dispatch(setCards(initialCards));
  }, []);

  const onDragEnd = async (result) => {
    if (!result.destination) return;

    const { source, destination } = result;

    if (source.droppableId !== destination.droppableId) {
      const card = updatedCards?.cards?.filter(
        (card) => card.id == result.draggableId
      );
      const updatedCard = { ...card[0], row: destination.droppableId };
      moveCards(updatedCard);
    } else {
      const card = updatedCards?.cards?.filter(
        (card) => card.id == result.draggableId
      );
      const movedCard = { ...card[0], seq_num: destination.index };
      await moveCards(movedCard);
    }
  };

  /*   console.log(updatedCards); */

  return (
    <Box p={4}>
      <MainHeader />
      <DragDropContext onDragEnd={(result) => onDragEnd(result)}>
        <SimpleGrid minChildWidth="120px" spacing="40px">
          {decks.map((deck) => (
            <Droppable key={deck.id} droppableId={deck.id.toString()}>
              {(provided) => (
                <div ref={provided.innerRef}>
                  <Deck
                    key={deck.id}
                    cards={updatedCards?.cards?.filter(
                      (card) => card.row == deck.id
                    )}
                    deck={deck}
                    {...provided.droppableProps}
                  />
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </SimpleGrid>
      </DragDropContext>
    </Box>
  );
}
