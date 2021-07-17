import {
  Box,
  CloseButton,
  Container,
  HStack,
  Spacer,
  Spinner,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import {
  useDeleteCardMutation,
  useGetCardsMutation,
} from "../../redux/api/authApi";
import { setCards } from "../../redux/slices/cardsSlice";

export default function Card({ id, text }) {
  const [deleteCard, { data, isLoading }] = useDeleteCardMutation();
  const [fetchCards, _] = useGetCardsMutation();

  const dispatch = useDispatch();

  const handleDeleteCard = async (id) => {
    try {
      await deleteCard(id);
      const updatedCards = await fetchCards();
      dispatch(setCards(updatedCards));
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Container
      borderRadius="sm"
      bg="gray.200"
      color="gray.700"
      maxW="sm"
      m={4}
      p={4}
    >
      <VStack alignItems="left">
        {isLoading ? (
          <Spinner alignSelf="center" size="xl" />
        ) : (
          <>
            <HStack>
              <Text>ID: {id}</Text>
              <Spacer />
              <CloseButton onClick={() => handleDeleteCard(id)} size="sm" />
            </HStack>
            <Box>
              <Text>{text}</Text>
            </Box>
          </>
        )}
      </VStack>
    </Container>
  );
}
