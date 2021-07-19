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
import { useRegisterMutation } from "../redux/api/authApi";
import { setCredentials, setToken } from "../redux/slices/authSlice";
import PasswordInput from "./blocks/PasswordInput";
import Tip from "./blocks/Tip";

export default function Register() {
  const [formState, setFormState] = React.useState({
    username: "",
    password: "",
  });

  const dispatch = useDispatch();
  const { push } = useHistory();
  const toast = useToast();

  const [registerWith, { isLoading, isError }] = useRegisterMutation();

  const handleChange = ({ target: { name, value } }) =>
    setFormState((prev) => ({ ...prev, [name]: value }));

  const handleClick = async () => {
    try {
      await registerWith(formState) //trigger rtk query by calling "registerWith"
        .unwrap()
        .then((user) => {
          console.log(user);
          dispatch(setCredentials(user));
          dispatch(setToken(user.token));
        })
        .then(() => push("/"))
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
          onClick={handleClick}
          isFullWidth
          colorScheme="green"
          isLoading={isLoading}
        >
          Register
        </Button>
        <Tip referTo="Login" />
      </VStack>
    </Center>
  );
}
