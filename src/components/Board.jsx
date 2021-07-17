import { Box, SimpleGrid } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useGetCardsMutation } from "../redux/api/authApi";
import { selectAllCards, setCards } from "../redux/slices/cardsSlice";

import Deck from "./blocks/Deck";

export default function Board() {
  const decks = [
    { name: "ON-HOLD", color: "orange.300", id: 0 },
    { name: "IN-PROGRESS", color: "blue.300", id: 1 },
    { name: "NEEDS REVIEW", color: "yellow.300", id: 2 },
    { name: "APPROVED", color: "green.300", id: 3 },
  ];

  const dispatch = useDispatch();
  const [fetchCards, _] = useGetCardsMutation();

  React.useEffect(async () => {
    const initialCards = await fetchCards();
    dispatch(setCards(initialCards));
  }, []);

  const updatedCards = useSelector(selectAllCards);

  return (
    <Box p={4}>
      <SimpleGrid minChildWidth="120px" spacing="40px">
        {decks.map((deck) => (
          <Deck
            key={deck.id}
            cards={updatedCards?.data.filter((card) => card.row == deck.id)}
            row={deck.id}
          />
        ))}
      </SimpleGrid>
    </Box>
  );
}
