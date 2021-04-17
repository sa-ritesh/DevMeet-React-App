import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import { setAlert } from "./alert";
import {
  ADD_COMMENT,
  ADD_POST,
  DELETE_POST,
  GET_POST,
  GET_POSTS,
  POST_ERROR,
  REMOVE_COMMENT,
  REMOVE_POST_LOADER,
  SET_POST_LOADER,
  UPDATE_LIKE,
} from "./types";
// Get Posts
export const getPosts = () => {
  return async (dispatch) => {
    try {
      dispatch({
        type: SET_POST_LOADER,
      });
      if (localStorage.token) {
        setAuthToken(localStorage.token);
      }
      const res = await axios.get(
        "https://ritesh-dev-meet.herokuapp.com/api/posts",
      );

      dispatch({
        type: GET_POSTS,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: REMOVE_POST_LOADER,
      });
    }
  };
};
//add like
export const addLike = (postId) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: SET_POST_LOADER,
      });
      if (localStorage.token) {
        setAuthToken(localStorage.token);
      }
      const res = await axios.put(
        `https://ritesh-dev-meet.herokuapp.com/api/posts/like/${postId}`,
      );

      dispatch({
        type: UPDATE_LIKE,
        payload: { postId, likes: res.data },
      });
    } catch (err) {
      console.log(err);
      dispatch({
        type: REMOVE_POST_LOADER,
      });
    }
  };
};
//remove like
export const removeLike = (postId) => {
  return async (dispatch) => {
    dispatch({
      type: SET_POST_LOADER,
    });
    try {
      if (localStorage.token) {
        setAuthToken(localStorage.token);
      }
      const res = await axios.put(
        `https://ritesh-dev-meet.herokuapp.com/api/posts/unlike/${postId}`,
      );

      dispatch({
        type: UPDATE_LIKE,
        payload: { postId, likes: res.data },
      });
    } catch (err) {
      dispatch({
        type: REMOVE_POST_LOADER,
      });
    }
  };
};

export const deletPost = (postId) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: SET_POST_LOADER,
      });
      if (localStorage.token) {
        setAuthToken(localStorage.token);
      }
      const res = await axios.delete(
        `https://ritesh-dev-meet.herokuapp.com/api/posts/${postId}`,
      );

      dispatch({
        type: DELETE_POST,
        payload: postId,
      });
      dispatch(setAlert("Post has been Deleted Successfully"), "success");
    } catch (err) {
      console.log(err);
      dispatch({
        type: REMOVE_POST_LOADER,
      });
    }
  };
};

export const addPost = (formData) => {
  return async (dispatch) => {
    dispatch({
      type: SET_POST_LOADER,
    });
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios.post(
        `https://ritesh-dev-meet.herokuapp.com/api/posts`,
        formData,
        config,
      );

      dispatch({
        type: ADD_POST,
        payload: res.data,
      });
      dispatch(setAlert("Post Created"), "success");
    } catch (err) {
      console.log(err);
      dispatch({
        type: REMOVE_POST_LOADER,
      });
    }
  };
};

export const getPost = (postId) => {
  return async (dispatch) => {
    dispatch({
      type: SET_POST_LOADER,
    });
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    try {
      const res = await axios.get(
        `https://ritesh-dev-meet.herokuapp.com/api/posts/${postId}`,
      );

      dispatch({
        type: GET_POST,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
      dispatch({
        type: REMOVE_POST_LOADER,
      });
    }
  };
};

export const addComment = (postId, formData) => {
  return async (dispatch) => {
    dispatch({
      type: SET_POST_LOADER,
    });
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios.post(
        `https://ritesh-dev-meet.herokuapp.com/api/posts/comment/${postId}`,
        formData,
        config,
      );

      dispatch({
        type: ADD_COMMENT,
        payload: res.data,
      });
      dispatch(setAlert("Comment Added"), "success");
    } catch (err) {
      console.log(err);
      dispatch({
        type: REMOVE_POST_LOADER,
      });
    }
  };
};

export const deleteComment = (postId, commentId) => {
  return async (dispatch) => {
    dispatch({
      type: SET_POST_LOADER,
    });
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    try {
      const res = await axios.delete(
        `https://ritesh-dev-meet.herokuapp.com/api/posts/comment/${postId}/${commentId}`,
      );

      dispatch({
        type: REMOVE_COMMENT,
        payload: commentId,
      });
      dispatch(setAlert("Comment Removed"), "success");
    } catch (err) {
      console.log(err);
      dispatch({
        type: REMOVE_POST_LOADER,
      });
    }
  };
};
