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
import { setCards, setDeletedCard } from "../../redux/slices/boardSlice";

export default function Card({ id, text, row, provided }) {
  const [deleteCard, { isLoading }] = useDeleteCardMutation();
  const [fetchCards] = useGetCardsMutation();

  const dispatch = useDispatch();

  const handleDeleteCard = async (id) => {
    try {
      await deleteCard(id);
      dispatch(setDeletedCard({ id, row }));
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
      m={2}
      p={4}
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      zIndex={1}
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
