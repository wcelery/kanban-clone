import {
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
import { useCreateCardMutation } from "../../redux/api/authApi";
import { setCreatedCard } from "../../redux/slices/boardSlice";
import { useToggle } from "../../utils/useToggle";
import { Draggable } from "react-beautiful-dnd";

export default function Deck({ deck }) {
  const [isOpen, setIsOpen] = useToggle();
  const [taskObject, setTaskObject] = React.useState({
    row: deck.id,
    text: "",
  });

  const [createCard, { isLoading }] = useCreateCardMutation();

  const dispatch = useDispatch();

  const handleInput = ({ target }) => {
    setTaskObject({ ...taskObject, text: target.value });
  };

  const handleCreateCard = async () => {
    try {
      const createdCard = await createCard(taskObject);
      dispatch(setCreatedCard(createdCard.data));
      setTaskObject({ ...taskObject, text: "" });
      setIsOpen(false);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Container bg="gray.100" color="gray.800" maxW="sm" p={4} centerContent>
      <Header color={deck.color} title={deck.name} total={deck.cards?.length} />
      {deck.cards?.map((card, index) => (
        <Draggable key={card.id} draggableId={card.id.toString()} index={index}>
          {(provided) => (
            <Card
              key={card.id}
              id={card.id}
              text={card.text}
              row={deck.id} //god forgive me, I didnt wanted dis
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
