import {
  Button,
  ButtonGroup,
  Container,
  IconButton,
  Textarea,
} from "@chakra-ui/react";
import { AiOutlinePlus } from "react-icons/ai";
import { MdClose } from "react-icons/md";

import Card from "./Card";
import { useToggle } from "../../utils/useToggle";
import { useCreateCardMutation } from "../../redux/api/authApi";

export default function Deck({ cards, row }) {
  const [isOpen, setIsOpen] = useToggle();
  const [taskObject, setTaskObject] = React.useState({
    row,
    text: "",
  });

  const [createCard, { data, error, isLoading }] = useCreateCardMutation();

  const handleInput = ({ target }) => {
    const inputValue = target.value;
    setTaskObject({ ...taskObject, text: inputValue });
  };

  const handleCreateCard = async () => {
    try {
      await createCard(taskObject);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Container bg="gray.100" color="gray.800" maxW="sm" p={4} centerContent>
      {cards?.map((card) => (
        <Card key={card.id} id={card.id} text={card.text} />
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
