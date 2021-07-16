import { Box, Heading } from "@chakra-ui/react";

export default function Header({ color = "tomato" }) {
  return (
    <Box
      bg={color}
      borderRadius="sm"
      overflow="hidden"
      p={2}
      m={4}
      color="white"
    >
      <Heading fontSize="md">This is the Box</Heading>
    </Box>
  );
}
