import { Box, SimpleGrid } from "@chakra-ui/react";
import { nanoid } from "nanoid";

import Deck from "./blocks/Deck";

export default function Board() {
  const decks = [
    { name: "ON-HOLD", color: "orange.300", id: nanoid() },
    { name: "IN-PROGRESS", color: "blue.300", id: nanoid() },
    { name: "NEEDS REVIEW", color: "yellow.300", id: nanoid() },
    { name: "APPROVED", color: "green.300", id: nanoid() },
  ];

  return (
    <Box p={4}>
      <SimpleGrid minChildWidth="120px" spacing="40px">
        {decks.map((deck) => (
          <Deck key={deck.id} />
        ))}
      </SimpleGrid>
    </Box>
  );
}
