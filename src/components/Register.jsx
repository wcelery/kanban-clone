import {
  Box,
  Button,
  Center,
  Input,
  InputGroup,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useRegisterMutation } from "../redux/api/authApi";
import { setCredentials } from "../redux/auth/authSlice";
import PasswordInput from "./blocks/PasswordInput";

export default function Register() {
  const [formState, setFormState] = React.useState({
    username: "",
    password: "",
  });

  const dispatch = useDispatch();
  const { push } = useHistory();
  const toast = useToast();

  const [register, { isLoading }] = useRegisterMutation();

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
            name="email"
            type="text"
            placeholder="Email"
          />
        </InputGroup>
        <InputGroup>
          <PasswordInput onChange={handleChange} name="password" />
        </InputGroup>
        <Button
          onClick={async () => {
            try {
              const user = await register(formState); //trigger rtk query by calling "register"
              console.log(user);
              dispatch(setCredentials(user.data));
              //push("/login");
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
          isLoading={isLoading}
        >
          Register
        </Button>
      </VStack>
    </Center>
  );
}
