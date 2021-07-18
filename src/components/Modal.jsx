import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  selectIsExpired,
  setIsSessionExpired,
} from "../redux/slices/authSlice";

export default function ExpiredSessionModal() {
  const { onOpen } = useDisclosure();
  const dispatch = useDispatch();
  const isSessionExpired = useSelector(selectIsExpired);
  const { push } = useHistory();

  const onClose = () => {
    dispatch(setIsSessionExpired(false));
    push("/login");
  };

  return (
    <>
      <Button onClick={onOpen}>Open Modal</Button>
      <Modal
        closeOnOverlayClick={false}
        isCentered
        onClose={onClose}
        isOpen={isSessionExpired}
        motionPreset="slideInBottom"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Not so fast!</ModalHeader>
          <ModalBody>
            Looks like your session is expired! click the button below to relog
          </ModalBody>
          <ModalFooter>
            <Button color="green.500" mr={3} onClick={onClose}>
              OK
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
