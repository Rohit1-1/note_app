import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Stack,
  Textarea,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { EditIcon } from "@chakra-ui/icons";
import { useDispatch } from "react-redux";
import { getNotes, updateNotes } from "../store/Appreducer/action";

const Editnote = ({ id, title, description }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();
  const toast = useToast();
  const [notedata, setNoteData] = useState({
    title,
    description,
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNoteData({
      ...notedata,
      [name]: value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateNotes(id, notedata))
      .then((res) => {
        if (res.update_status) {
          toast({
            title: "Notes Updated Successfull",
            description: "We've updated your notes for you.",
            status: "success",
            position: "top",
            duration: 5000,
            isClosable: true,
          });
          onClose();
          dispatch(getNotes());
        } else {
          toast({
            title: "Something went wrong",
            description: "Try again later",
            status: "error",
            position: "top",
            duration: 5000,
            isClosable: true,
          });
        }
      })
      .catch((err) => {
        toast({
          title: "Something went wrong",
          description: "Try again later",
          status: "error",
          position: "top",
          duration: 5000,
          isClosable: true,
        });
      });
    console.log(notedata);
  };
  return (
    <>
      <EditIcon color={'blue.600'} _hover={{ cursor: "pointer" }} onClick={onOpen}/>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Notes</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing={4}>
              <form onSubmit={handleSubmit}>
                <FormControl id="title" isRequired marginBottom={"1rem"}>
                  <FormLabel>Title</FormLabel>
                  <Input
                    value={notedata?.title}
                    type="title"
                    name="title"
                    onChange={handleChange}
                  />
                </FormControl>
                <FormControl id="description" isRequired marginBottom={"1rem"}>
                  <FormLabel>Description</FormLabel>
                  <Textarea
                    value={notedata?.description}
                    name="description"
                    onChange={handleChange}
                  />
                </FormControl>
                <Stack spacing={10} pt={2}>
                  <Button
                    loadingText="Submitting"
                    size="lg"
                    bg={"blue.400"}
                    color={"white"}
                    _hover={{
                      bg: "blue.500",
                    }}
                    type="submit"
                    // isLoading={isLoading}
                  >
                    Add
                  </Button>
                </Stack>
              </form>
            </Stack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export { Editnote };
