import {
  Button,
  Center,
  Input,
  InputGroup,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useLoginMutation } from "../redux/api/authApi";
import { setCredentials, setToken } from "../redux/slices/authSlice";
import PasswordInput from "./blocks/PasswordInput";
import Tip from "./blocks/Tip";

export default function Login() {
  const dispatch = useDispatch();
  const { push } = useHistory();
  const toast = useToast();

  const [loginWith] = useLoginMutation();

  const [formState, setFormState] = React.useState({
    username: "",
    password: "",
  });

  const handleChange = ({ target: { name, value } }) =>
    setFormState((prev) => ({ ...prev, [name]: value }));

  const handleClick = async () => {
    try {
      await loginWith(formState)
        .unwrap()
        .then((token) => {
          dispatch(setCredentials(formState));
          dispatch(setToken(token.token));
          push("/");
        })
        .catch((error) => {
          console.log(error);
          toast({
            status: "error",
            title: `Error ${error.status}`,
            description: JSON.stringify(error.data),
            isClosable: true,
          });
        });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Center h="500px">
      <VStack spacing="4">
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
        <Button onClick={handleClick} isFullWidth colorScheme="green">
          Login
        </Button>
        <Tip referTo="Register" />
      </VStack>
    </Center>
  );
}
