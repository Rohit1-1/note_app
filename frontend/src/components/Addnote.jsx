import React, { useState } from "react";
import { Box, Button, FormControl, FormLabel, Input, Stack, Textarea, useToast } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { addNote, getNotes } from "../store/Appreducer/action";

const Addnote = () => {
  const [notedata,setNoteData]=useState({
    title:"",
    description:"",
  })
 const dispatch=useDispatch();
 const toast=useToast()
 const {isLoading}=useSelector((store)=>store.appreducer)

  const handleChange=(e)=>{
    const {name,value}=e.target;
    setNoteData({
      ...notedata,
      [name]:value
    })
  }
  const handleSubmit=(e)=>{
  
    e.preventDefault();
    dispatch(addNote(notedata)).then((res)=>{
      if(res.status){
        toast({
          title: "Notes Created Successfull",
          description: "We've created your notes for you.",
          status: 'success',
          position: 'top',
          duration: 5000,
          isClosable: true,
        })
        setNoteData({
          ...notedata,
          title:"",
          description:""
        })
        dispatch(getNotes())
      }
      else{
        toast({
          title: "Something went wrong",
          description: "Try again later",
          status: 'error',
          position: 'top',
          duration: 5000,
          isClosable: true,
        })
      }
    }).catch((err)=>{
      toast({
        title: "Something went wrong",
        description: "Try again later",
        status: 'error',
        position: 'top',
        duration: 5000,
        isClosable: true,
      })
    })
    console.log(notedata)
  }
  return (
    <Box width={"60%"} margin={'auto'} marginTop={"1rem"}>
      <form onSubmit={handleSubmit}>
        <FormControl id="title" isRequired marginBottom={"1rem"}>
          <FormLabel>Title</FormLabel>
          <Input value={notedata?.title} type="title" name="title" onChange={handleChange} />
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
            isLoading={isLoading}
          >
            Add
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default Addnote;
