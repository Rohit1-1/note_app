import axios from "axios";
import { url } from "../../utils/url";
import { getData } from "../../utils/local";
import {
  ADD_NOTE_FAILURE,
  ADD_NOTE_REQUEST,
  ADD_NOTE_SUCCESS,
  DELETE_NOTE_FAILURE,
  DELETE_NOTE_REQUEST,
  DELETE_NOTE_SUCCESS,
  GET_NOTE_FAILURE,
  GET_NOTE_REQUEST,
  GET_NOTE_SUCCESS,
  UPDATE_NOTE_FAILURE,
  UPDATE_NOTE_REQUEST,
  UPDATE_NOTE_SUCCESS,
} from "./actionType";

export const addNote = (payload) => (dispatch) => {
  try {
    dispatch(addNote_request());
    const token = getData("token") || null;
    return axios
      .post(`${url}/notes`, payload, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        dispatch({ type: ADD_NOTE_SUCCESS });
        return res.data;
        //    console.log(res)
      })
      .catch((err) => {
        if (err.response.status === 501) {
          dispatch(addNote_failure());
          return err.response.data;
        }
      });
  } catch (error) {}
};

export const addNote_request = () => {
  return {
    type: ADD_NOTE_REQUEST,
  };
};

export const addNote_failure = () => {
  return {
    type: ADD_NOTE_FAILURE,
  };
};

export const getNotes = () => (dispatch) => {
  try {
    dispatch(getNotes_request());
    const token = getData("token") || null;
    return axios
      .get(`${url}/notes`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        // console.log(res);
        dispatch({ type: GET_NOTE_SUCCESS, payload: res.data.notes });
      });
  } catch (error) {
    dispatch(getNotes_failure());
  }
};

export const getNotes_request = () => {
  return {
    type: GET_NOTE_REQUEST,
  };
};

export const getNotes_failure = () => {
  return {
    type: GET_NOTE_FAILURE,
  };
};

export const updateNotes = (id, payload) => (dispatch) => {
  try {
    dispatch(updateNotes_request());
    const token = getData("token") || null;
    return axios
      .patch(`${url}/notes/${id}`, payload, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        // console.log(res)
        dispatch({ type: UPDATE_NOTE_SUCCESS });
        return res.data;
      })
      .catch((err) => {});
  } catch (error) {}
};

export const updateNotes_request = () => {
  return {
    type: UPDATE_NOTE_REQUEST,
  };
};

export const updateNotes_failure = () => {
  return {
    type: UPDATE_NOTE_FAILURE,
  };
};

export const deleteNotes = (id) => (dispatch) => {
  try {
    dispatch(deleteNotes_request());
    const token = getData("token") || null;
    return axios
      .delete(`${url}/notes/${id}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        dispatch({ type: DELETE_NOTE_SUCCESS });
        //console.log(res)
        return res.status;
      });
  } catch (error) {
    dispatch(deleteNotes_failure());
  }
};

export const deleteNotes_request = () => {
  return {
    type: DELETE_NOTE_REQUEST,
  };
};

export const deleteNotes_failure = () => {
  return {
    type: DELETE_NOTE_FAILURE,
  };
};
