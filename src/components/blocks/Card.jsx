import {
  Box,
  CloseButton,
  Container,
  HStack,
  Spacer,
  Text,
  VStack,
} from "@chakra-ui/react";

export default function Card() {
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
          <Text>ID: 1</Text>
          <Spacer />
          <CloseButton size="sm" />
        </HStack>
        <Box>
          <Text>
            rich syndicate web readinessrich syndicate web readinessrich
            syndicate web readinessrich syndicate web readinessrich syndicate
            web readiness
          </Text>
        </Box>
      </VStack>
    </Container>
  );
}
