import {
  Box,
  Button,
  Center,
  Divider,
  Input,
  InputGroup,
  InputRightElement,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import PasswordInput from "./blocks/PasswordInput";

export default function Login() {
  const dispatch = useDispatch();
  const { push } = useHistory();
  const toast = useToast();

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
            placeholder="Email"
          />
        </InputGroup>

        <InputGroup>
          <PasswordInput onChange={handleChange} name="password" />
        </InputGroup>
        <Button isFullWidth colorScheme="green">
          Login
        </Button>
        <Divider />
      </VStack>
    </Center>
  );
}
