import {
  Box,
  CloseButton,
  Container,
  HStack,
  Spacer,
  Text,
  VStack,
} from "@chakra-ui/react";

export default function Card({ id, text }) {
  return (
    <Container
      borderRadius="sm"
      bg="gray.200"
      color="gray.700"
      maxW="sm"
      m={4}
      p={4}
    >
      <VStack alignItems="left">
        <HStack>
          <Text>ID: {id}</Text>
          <Spacer />
          <CloseButton size="sm" />
        </HStack>
        <Box>
          <Text>{text}</Text>
        </Box>
      </VStack>
    </Container>
  );
}
