import { Box, Button, Flex, Heading, Spacer } from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../utils/useAuth";

export default function MainHeader() {
  const { user } = useAuth();
  const { push } = useHistory();

  const handleLogout = () => {
    window.localStorage.removeItem("persist:auth");
    push("/login");
  };
  return (
    <Box bg="gray.700" borderRadius="sm" w="100%" p={4} mb={4} color="white">
      <Flex alignItems="center">
        <Heading size="md">You logged as: {user.username}</Heading>
        <Spacer />
        <Button
          onClick={handleLogout}
          bg="red.400"
          size="sm"
          _hover={{ bg: "#d4414e" }}
          _active={{ bg: "#b53742" }}
        >
          Logout
        </Button>
      </Flex>
    </Box>
  );
}
