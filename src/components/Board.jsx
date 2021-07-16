import { Box, SimpleGrid } from "@chakra-ui/react";

import Deck from "./blocks/Deck";

export default function Board() {
  const decks = [
    { name: "ON-HOLD", color: "orange.300", id: 0 },
    { name: "IN-PROGRESS", color: "blue.300", id: 1 },
    { name: "NEEDS REVIEW", color: "yellow.300", id: 2 },
    { name: "APPROVED", color: "green.300", id: 3 },
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
