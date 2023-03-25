import axios from "axios";
import {
  SIGNIN_FAILURE,
  SIGNIN_REQUEST,
  SIGNIN_SUCCESS,
  WRONG_CRED,
  LOGOUT_SUCCESS,
  SIGNUP_EMAILEXIST,
  SIGNUP_FAILURE,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
} from "./actionType.js";
import { url } from "../../utils/url";

export const signup = (payload) => (dispatch) => {
  try {
    dispatch(signup_request());
    return axios
      .post(`${url}/signup`, payload)
      .then((res) => {
        dispatch({ type: SIGNUP_SUCCESS });
        return res.data;
      })
      .catch((err) => {
        if (err.response.status === 409) {
          // console.log(err.response.data);
          dispatch(signup_emailexist());
          return err.response.data;
        }
        // console.log(err);
        dispatch(signup_failure());
      });
  } catch (error) {
    // console.log(error);
  }
};

export const signup_request = () => {
  return {
    type: SIGNUP_REQUEST,
  };
};

export const signup_emailexist = () => {
  return {
    type: SIGNUP_EMAILEXIST,
  };
};

export const signup_failure = () => {
  return {
    type: SIGNUP_FAILURE,
  };
};

export const signin = (payload) => (dispatch) => {
  try {
    dispatch(signin_request());
    return axios
      .post(`${url}/login`, payload)
      .then((res) => {
        // console.log(res);
        dispatch({ type: SIGNIN_SUCCESS, payload: res.data });
        return res.data;
      })
      .catch((err) => {
        if (err.response.status === 401) {
          dispatch(wrongCred());
          // console.log(err);
          return err.response.data;
        }
      });
  } catch (error) {}
};

export const signin_request = () => {
  return {
    type: SIGNIN_REQUEST,
  };
};
export const wrongCred = () => {
  return {
    type: WRONG_CRED,
  };
};
export const signin_failure = () => {
  return {
    type: SIGNIN_FAILURE,
  };
};

export const logout = () => {
  return {
    type: LOGOUT_SUCCESS,
  };
};
