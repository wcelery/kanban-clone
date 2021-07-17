import {
  Box,
  Button,
  ButtonGroup,
  Container,
  IconButton,
  Textarea,
} from "@chakra-ui/react";
import { AiOutlinePlus } from "react-icons/ai";
import { MdClose } from "react-icons/md";
import { useDispatch } from "react-redux";

import Card from "./Card";
import Header from "./Header";
import {
  useCreateCardMutation,
  useGetCardsMutation,
} from "../../redux/api/authApi";
import { setCards } from "../../redux/slices/boardSlice";
import { useToggle } from "../../utils/useToggle";
import { Draggable } from "react-beautiful-dnd";

export default function Deck({ deck, cards }) {
  const [isOpen, setIsOpen] = useToggle();
  const [taskObject, setTaskObject] = React.useState({
    row: deck.id,
    text: "",
  });

  const [createCard, { isLoading }] = useCreateCardMutation();
  const [fetchCards] = useGetCardsMutation();

  const dispatch = useDispatch();

  const handleInput = ({ target }) => {
    const inputValue = target.value;
    setTaskObject({ ...taskObject, text: inputValue });
  };

  const handleCreateCard = async () => {
    try {
      await createCard(taskObject);
      const updatedCards = await fetchCards();
      dispatch(setCards(updatedCards));
      setTaskObject({ ...taskObject, text: "" });
    } catch (e) {
      console.log(e);
    }
  };

  const sorted = cards?.slice().sort((a, b) => a.seq_num - b.seq_num);
  console.log(sorted);

  return (
    <Container bg="gray.100" color="gray.800" maxW="sm" p={4} centerContent>
      <Header color={deck.color} title={deck.name} total={cards?.length} />
      {sorted?.map((card, index) => (
        <Draggable key={card.id} draggableId={card.id.toString()} index={index}>
          {(provided) => (
            <Card
              key={card.id}
              id={card.id}
              text={card.text}
              provided={provided}
            />
          )}
        </Draggable>
      ))}
      {isOpen ? (
        <>
          <Textarea
            value={taskObject.text}
            onChange={handleInput}
            mb={4}
            resize="none"
            placeholder="Place your thoughts here..."
          />
          <ButtonGroup size="sm" isAttached variant="outline">
            <Button onClick={handleCreateCard} isLoading={isLoading}>
              Save
            </Button>
            <IconButton
              aria-label="Close textarea"
              size="sm"
              icon={<MdClose />}
              onClick={setIsOpen}
            />
          </ButtonGroup>
        </>
      ) : (
        <Button
          leftIcon={<AiOutlinePlus />}
          color="grey.200"
          variant="outline"
          onClick={setIsOpen}
          size="sm"
        >
          Create a task
        </Button>
      )}
    </Container>
  );
}
