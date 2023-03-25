import React, { useEffect } from 'react'
import Addnote from '../components/Addnote'
import { Box, Spinner, Text } from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux'
import { getNotes } from '../store/Appreducer/action'
import Notecard from '../components/Notecard'

const Notes = () => {
    const {getIsLoading,notes}=useSelector((store)=>store.appreducer);
    const dispatch=useDispatch()
    useEffect(()=>{
   dispatch(getNotes())
    },[dispatch])
    console.log(getIsLoading)
  return (
    <>
      <Addnote/>
      <Box marginTop={'2rem'}>
        {getIsLoading&&<Spinner/>}

        {notes.length===0?<Text color={'gray.500'}>You haven't created any notes yet.</Text>:<Box gap={4} width={"90%"} display={'grid'} margin={'auto'} gridTemplateColumns={{base:"repeat(1,1fr)",md:"repeat(2,1fr)",lg:"repeat(3,1fr)"}}>
        {notes?.map((el)=><Notecard key={el._id} id={el._id} title={el.title} description={el.description}/>)}
        </Box>}
      </Box>
    </>
  )
}

export default Notes
