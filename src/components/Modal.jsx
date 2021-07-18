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
  const { onOpen, isOpen } = useDisclosure();
  const dispatch = useDispatch();
  const isSessionExpired = useSelector(selectIsExpired);
  const { push } = useHistory();

  const onClose = () => {
    dispatch(setIsSessionExpired(false));
    push("/login");
  };

  return (
    <>
      <Modal
        closeOnOverlayClick={false}
        isCentered
        onClose={onClose}
        isOpen={isOpen}
        motionPreset="slideInBottom"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Not so fast!</ModalHeader>
          <ModalBody>
            Looks like your session is expired! Click the button below to relog.
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="green" mr={3} onClick={onClose}>
              OK
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
