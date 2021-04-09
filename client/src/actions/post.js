import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import { setAlert } from "./alert";
import { DELETE_POST, GET_POSTS, POST_ERROR, UPDATE_LIKE } from "./types";
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
//add like
export const addLike = (postId) => {
  return async (dispatch) => {
    try {
      if (localStorage.token) {
        setAuthToken(localStorage.token);
      }
      const res = await axios.put(`/api/posts/like/${postId}`);

      dispatch({
        type: UPDATE_LIKE,
        payload: { postId, likes: res.data },
      });
    } catch (err) {
      console.log(err);
    }
  };
};
//remove like
export const removeLike = (postId) => {
  return async (dispatch) => {
    try {
      if (localStorage.token) {
        setAuthToken(localStorage.token);
      }
      const res = await axios.put(`/api/posts/unlike/${postId}`);

      dispatch({
        type: UPDATE_LIKE,
        payload: { postId, likes: res.data },
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

export const deletPost = (postId) => {
  return async (dispatch) => {
    try {
      if (localStorage.token) {
        setAuthToken(localStorage.token);
      }
      const res = await axios.delete(`/api/posts/${postId}`);

      dispatch({
        type: DELETE_POST,
        payload: postId,
      });
      dispatch(setAlert("Post has been Deleted Successfully"), "success");
    } catch (err) {
      console.log(err);
    }
  };
};
