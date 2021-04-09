import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import { setAlert } from "./alert";
import { GET_POSTS, POST_ERROR } from "./types";
// Get Posts
export const getPosts = () => {
  return async (dispatch) => {
    try {
      if (localStorage.token) {
        setAuthToken(localStorage.token);
      }
      const res = await axios.get("/api/posts");

      dispatch({
        type: GET_POSTS,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: POST_ERROR,
        payload: {
          msg: err.response.statusText,
          status: err.response.status,
        },
      });
    }
  };
};
