import { getData, removeData, saveData } from "../../utils/local";
import {
  LOGOUT_SUCCESS,
  SIGNIN_FAILURE,
  SIGNIN_REQUEST,
  SIGNIN_SUCCESS,
  SIGNUP_EMAILEXIST,
  SIGNUP_FAILURE,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  WRONG_CRED,
} from "./actionType";

const initialState = {
  isAuth: getData("isAuth") || false,
  isLoading: false,
  isError: false,
  token: getData("token") || null,
  user: getData("name") || null,
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SIGNUP_REQUEST: {
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    }
    case SIGNUP_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        isError: false,
      };
    }
    case SIGNUP_FAILURE: {
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    }
    case SIGNUP_EMAILEXIST: {
      return {
        ...state,
        isLoading: false,
      };
    }
    case SIGNIN_REQUEST: {
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    }
    case WRONG_CRED: {
      return {
        ...state,
        isLoading: false,
        isError: false,
      };
    }
    case SIGNIN_SUCCESS: {
      saveData("isAuth", true);
      saveData("token", payload.token);
      saveData("name", payload.user[0].name);
      return {
        ...state,
        isLoading: false,
        isError: false,
        isAuth: true,
        token: payload.token,
        user: payload.user[0].name,
      };
    }
    case SIGNIN_FAILURE: {
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    }

    case LOGOUT_SUCCESS: {
      removeData("isAuth");
      removeData("name");
      removeData("token");
      return {
        ...state,
        isLoading: false,
        isError: false,
        isAuth: false,
      };
    }

    default:
      return state;
  }
};

export { reducer };
