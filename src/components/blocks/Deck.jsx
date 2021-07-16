import { Container } from "@chakra-ui/react";

export default function Deck({ children }) {
  return (
    <Container bg="gray.100" color="gray.800" maxW="sm" p={4} centerContent>
      {children}
    </Container>
  );
}
