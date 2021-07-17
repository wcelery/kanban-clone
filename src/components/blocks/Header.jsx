import { Box, Heading } from "@chakra-ui/react";

export default function Header({ color = "tomato", title, total }) {
  return (
    <Box
      bg={color}
      borderRadius="sm"
      overflow="hidden"
      p={2}
      m={4}
      color="white"
      w="100%"
    >
      <Heading fontSize="md">
        {title} ({total})
      </Heading>
    </Box>
  );
}
