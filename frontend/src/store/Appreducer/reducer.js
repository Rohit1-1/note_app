import { ADD_NOTE_FAILURE, ADD_NOTE_REQUEST, ADD_NOTE_SUCCESS, DELETE_NOTE_FAILURE, DELETE_NOTE_REQUEST, DELETE_NOTE_SUCCESS, GET_NOTE_FAILURE, GET_NOTE_REQUEST, GET_NOTE_SUCCESS, UPDATE_NOTE_REQUEST, UPDATE_NOTE_SUCCESS } from "./actionType"

const initialState={
    notes:[],
    isLoading:false,
    getIsLoading:false,
    deleteLoading:false,
    isError:false
}

const reducer=(state=initialState,{type,payload})=>{
  switch(type){
    case(ADD_NOTE_REQUEST):{
        return{
            ...state,
            isLoading:true
        }
    }
    case(ADD_NOTE_SUCCESS):{
        return{
            ...state,
            isLoading:false
        }
    }
    case(ADD_NOTE_FAILURE):{
        return{
            ...state,
            isLoading:false,
            isError:true
        }
    }

    case(GET_NOTE_REQUEST):{
        return{
            ...state,
            getIsLoading:true
        }
    }
    case(GET_NOTE_SUCCESS):{
        return{
            ...state,
            getIsLoading:false,
            notes:payload
        }
    }
    case(GET_NOTE_FAILURE):{
        return{
            ...state,
            getIsLoading:false,
            isError:true
        }
    }
    case(UPDATE_NOTE_REQUEST):{
        return{
            ...state,
            isLoading:true
        }
    }
    case(UPDATE_NOTE_SUCCESS):{
        return{
            ...state,
            isLoading:false
        }
    }
    case(DELETE_NOTE_REQUEST):{
        return{
            ...state,
            deleteLoading:true
        }
    }
    case(DELETE_NOTE_SUCCESS):{
        return{
            ...state,
            deleteLoading:false
        }
    }
    case(DELETE_NOTE_FAILURE):{
        return{
            ...state,
            isError:true
        }
    }
    default:
        return state
  }
}

export{reducer}