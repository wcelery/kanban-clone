import { Container } from "@chakra-ui/react";
import Card from "./Card";

export default function Deck({ cards }) {
  return (
    <Container bg="gray.100" color="gray.800" maxW="sm" p={4} centerContent>
      {cards?.map((card) => (
        <Card key={card.id} id={card.id} text={card.text} />
      ))}
    </Container>
  );
}
