import { Box, Heading ,Text, useToast} from '@chakra-ui/react'
import React from 'react'
import {DeleteIcon} from "@chakra-ui/icons"
import { Editnote } from './Editnote'
import { deleteNotes, getNotes } from '../store/Appreducer/action'
import { useDispatch } from 'react-redux'

const Notecard = ({id,title,description}) => {
  const dispatch=useDispatch()
  const toast=useToast()
  const handleDelete=()=>{
    dispatch(deleteNotes(id)).then((res)=>{
      if(res===204){
        toast({
          title: "Notes Deleted Successfull",
          description: "We've deleted your notes for you.",
          status: "success",
          position: "top",
          duration: 5000,
          isClosable: true,
        });
        dispatch(getNotes())
      }
      else{
        toast({
          title: "Something went wrong",
          description: "Try again later",
          status: "error",
          position: "top",
          duration: 5000,
          isClosable: true,
        });
      }
    }).catch((err)=>{
      toast({
        title: "Something went wrong",
        description: "Try again later",
        status: "error",
        position: "top",
        duration: 5000,
        isClosable: true,
      });
    })
  }
  return (
    <Box padding={'1rem'} boxShadow={'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px'} >
      <Heading marginBottom={"0.6rem"} as="h4" size="md">{title}</Heading>
      <Text>{description}</Text>
      <Box marginTop={'1rem'} display={'flex'} gap={4} justifyContent={'center'}>
        <Editnote id={id} title={title} description={description}/>
        <DeleteIcon onClick={()=>handleDelete(id)} color={'red.600'} _hover={{cursor:"pointer"}}/>
      </Box>
    </Box>
  )
}

export default Notecard
