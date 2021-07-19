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
import { setCredentials } from "../redux/slices/authSlice";
import PasswordInput from "./blocks/PasswordInput";
import Tip from "./blocks/Tip";

export default function Register() {
  const [formState, setFormState] = React.useState({
    username: "",
    password: "",
  });
  const [registerErr, setRegisterErr] = React.useState({});

  const dispatch = useDispatch();
  const { push } = useHistory();
  const toast = useToast();

  const [registerWith, { isLoading, error }] = useRegisterMutation();

  const handleChange = ({ target: { name, value } }) =>
    setFormState((prev) => ({ ...prev, [name]: value }));

  const handleClick = async () => {
    try {
      const user = await registerWith(formState)
        .unwrap() //trigger rtk query by calling "registerWith"
        .catch((e) => setRegisterErr(error)); //TODO - error is undefined, why?????????????????????????????
      dispatch(setCredentials(user.data));
      push("/");
    } catch (err) {
      toast({
        status: "error",
        title: `Error ${registerErr.status}`,
        description: JSON.stringify(registerErr.data),
        isClosable: true,
      });
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
