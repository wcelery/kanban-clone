import {
  Box,
  Button,
  Center,
  Input,
  InputGroup,
  VStack,
} from "@chakra-ui/react";
import PasswordInput from "./blocks/PasswordInput";

export default function Register() {
  const [formState, setFormState] = React.useState({
    username: "",
    password: "",
  });

  const handleChange = ({ target: { name, value } }) =>
    setFormState((prev) => ({ ...prev, [name]: value }));

  return (
    <Center h="500px">
      <VStack spacing="4">
        <Box>Hint: enter anything, or leave it blank and hit login</Box>
        <InputGroup>
          <Input
            onChange={handleChange}
            name="username"
            type="text"
            placeholder="Username"
          />
        </InputGroup>
        <InputGroup>
          <Input
            onChange={handleChange}
            name="username"
            type="text"
            placeholder="Email"
          />
        </InputGroup>

        <InputGroup>
          <PasswordInput onChange={handleChange} name="password" />
        </InputGroup>
        <Button isFullWidth colorScheme="green">
          Register
        </Button>
      </VStack>
    </Center>
  );
}
