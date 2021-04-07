import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
} from "./types";
//loading a user
export const loadUser = () => {
  return async (dispatch) => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    try {
      const res = await axios.get("/api/auth");
      dispatch({
        type: USER_LOADED,
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: AUTH_ERROR,
      });
    }
  };
};
//registering a user
export const register = ({ name, email, password }) => {
  return async (dispatch) => {
    console.log("in actiom");
    try {
      fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      })
        .then((response) => response.json())
        .then((data) => {
          dispatch({
            type: REGISTER_SUCCESS,
            payload: data,
          });
          dispatch(loadUser());
        });
    } catch (error) {
      dispatch({
        type: REGISTER_FAIL,
      });
    }
  };
};
//login
export const login = (email, password) => {
  return async (dispatch) => {
    try {
      fetch("/api/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })
        .then((response) => response.json())
        .then((data) => {
          dispatch({
            type: LOGIN_SUCCESS,
            payload: data,
          });
          dispatch(loadUser());
        });
    } catch (error) {
      dispatch({
        type: LOGIN_FAIL,
      });
    }
  };
};
