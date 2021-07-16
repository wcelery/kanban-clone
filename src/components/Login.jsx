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
import { useLoginMutation } from "../redux/api/authApi";
import { setCredentials, setToken } from "../redux/auth/authSlice";
import PasswordInput from "./blocks/PasswordInput";

export default function Login() {
  const dispatch = useDispatch();
  const { push } = useHistory();
  const toast = useToast();

  const [login, { data, isLoading }] = useLoginMutation();

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
          <PasswordInput onChange={handleChange} name="password" />
        </InputGroup>
        <Button
          onClick={async () => {
            try {
              const user = await login(formState);
              console.log(user);
              dispatch(setCredentials(formState));
              dispatch(setToken(user.data));
              push("/login");
            } catch (err) {
              toast({
                status: "error",
                title: "Error",
                description: "Oh no, there was an error!",
                isClosable: true,
              });
            }
          }}
          isFullWidth
          colorScheme="green"
        >
          Login
        </Button>
      </VStack>
    </Center>
  );
}
