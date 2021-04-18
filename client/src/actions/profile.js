import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import {
  GET_PROFILE,
  PROFILE_ERROR,
  UPDATE_PROFILE,
  CLEAR_PROFILE,
  ACCOUNT_DELETED,
  GET_PROFILES,
  GET_REPOS,
  SET_PROFILE_LOADER,
  REMOVE_PROFILE_LOADER,
} from "./types";
import { setAlert } from "./alert";

export const getCurrentProfile = () => {
  return async (dispatch) => {
    dispatch({
      type: SET_PROFILE_LOADER,
    });
    try {
      if (localStorage.token) {
        setAuthToken(localStorage.token);
      }
      const res = await axios.get(
        "https://sa-ritesh-devmeet.herokuapp.com/api/profile/me",
      );
      dispatch({
        type: GET_PROFILE,
        payload: res.data,
      });
    } catch (err) {
      const errors = err.response.data.errors;
      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
      }
      dispatch({
        type: PROFILE_ERROR,
        payload: {
          msg: err.response.statusText,
          status: err.response.status,
        },
      });
    }
  };
};

export const createProfile = (formData, history, edit = false) => async (
  dispatch,
) => {
  try {
    dispatch({
      type: SET_PROFILE_LOADER,
    });
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }

    const res = await axios.post(
      "https://sa-ritesh-devmeet.herokuapp.com/api/profile",
      formData,
      config,
    );
    dispatch({
      type: GET_PROFILE,
      payload: res.data.profile,
    });
    dispatch(setAlert(edit ? "Profile Updated" : "Profile Created"), "success");
    history.push("/dashboard");
  } catch (error) {
    dispatch({
      type: REMOVE_PROFILE_LOADER,
    });
  }
};
// add experience
export const addExperience = (formData, history) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: SET_PROFILE_LOADER,
      });
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const res = await axios.put(
        "https://sa-ritesh-devmeet.herokuapp.com/api/profile/experience",
        formData,
        config,
      );
      dispatch({
        type: UPDATE_PROFILE,
        payload: res.data,
      });
      dispatch(setAlert("Experience Added", "success"));
      history.push("/dashboard");
    } catch (error) {
      console.log(error);
      const errors = error.response.data.errors;
      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
      }
      dispatch({
        type: PROFILE_ERROR,
        payload: {
          msg: error.response.statusText,
          status: error.response.status,
        },
      });
    }
  };
};

// add education
export const addEducation = (formData, history) => {
  return async (dispatch) => {
    dispatch({
      type: SET_PROFILE_LOADER,
    });
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const res = await axios.put(
        "https://sa-ritesh-devmeet.herokuapp.com/api/profile/education",
        formData,
        config,
      );
      dispatch({
        type: UPDATE_PROFILE,
        payload: res.data,
      });
      dispatch(setAlert("Education Added", "success"));
      history.push("/dashboard");
    } catch (error) {
      console.log(error);
      const errors = error.response.data.errors;
      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
      }
      dispatch({
        type: PROFILE_ERROR,
        payload: {
          msg: error.response.statusText,
          status: error.response.status,
        },
      });
    }
  };
};
export const deleteExperience = (id) => {
  return async (dispatch) => {
    dispatch({
      type: SET_PROFILE_LOADER,
    });
    try {
      if (localStorage.token) {
        setAuthToken(localStorage.token);
      }
      const res = await axios.delete(
        `https://sa-ritesh-devmeet.herokuapp.com/api/profile/experience/${id}`,
      );
      console.log("delete exp res-data", res.data);
      dispatch({
        type: UPDATE_PROFILE,
        payload: res.data,
      });
      dispatch(setAlert("Experience Removed", "success"));
    } catch (error) {
      dispatch({
        type: PROFILE_ERROR,
        payload: {
          msg: error.response.statusText,
          status: error.response.status,
        },
      });
    }
  };
};
export const deleteEducation = (id) => {
  return async (dispatch) => {
    dispatch({
      type: SET_PROFILE_LOADER,
    });
    try {
      if (localStorage.token) {
        setAuthToken(localStorage.token);
      }
      const res = await axios.delete(
        `https://sa-ritesh-devmeet.herokuapp.com/api/profile/education/${id}`,
      );
      dispatch({
        type: UPDATE_PROFILE,
        payload: res.data,
      });
      dispatch(setAlert("Education Removed", "success"));
    } catch (error) {
      dispatch({
        type: PROFILE_ERROR,
        payload: {
          msg: error.response.statusText,
          status: error.response.status,
        },
      });
    }
  };
};
export const deleteAccount = () => {
  return async (dispatch) => {
    if (window.confirm("Firse Sochle Bhosdike")) {
      try {
        dispatch({
          type: SET_PROFILE_LOADER,
        });
        const res = await axios.delete(
          `https://sa-ritesh-devmeet.herokuapp.com/api/profile`,
        );
        dispatch({
          type: CLEAR_PROFILE,
        });
        dispatch({
          type: ACCOUNT_DELETED,
        });
        dispatch(setAlert("Your Acoount has been permanently deleted"));
      } catch (error) {
        dispatch({
          type: PROFILE_ERROR,
          payload: {
            msg: error.response.statusText,
            status: error.response.status,
          },
        });
      }
    }
  };
};
//get all profiles
export const getProfiles = () => {
  return async (dispatch) => {
    dispatch({
      type: SET_PROFILE_LOADER,
    });
    dispatch({
      type: CLEAR_PROFILE,
    });
    try {
      const res = await axios.get(
        "https://sa-ritesh-devmeet.herokuapp.com/api/profile",
      );
      dispatch({
        type: GET_PROFILES,
        payload: res.data,
      });
    } catch (err) {
      const errors = err.response.data.errors;
      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
      }
      dispatch({
        type: PROFILE_ERROR,
        payload: {
          msg: err.response.statusText,
          status: err.response.status,
        },
      });
    }
  };
};

export const getProfileById = (userId) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: SET_PROFILE_LOADER,
      });
      const res = await axios.get(
        `https://sa-ritesh-devmeet.herokuapp.com/api/profile/user/${userId}`,
      );
      dispatch({
        type: GET_PROFILE,
        payload: res.data,
      });
    } catch (err) {
      const errors = err.response.data.errors;
      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
      }
      dispatch({
        type: PROFILE_ERROR,
        payload: {
          msg: err.response.statusText,
          status: err.response.status,
        },
      });
    }
  };
};
export const getGithubRepos = (username) => {
  return async (dispatch) => {
    try {
      const res = await axios.get(
        `https://sa-ritesh-devmeet.herokuapp.com/api/profile/github/${username}`,
      );
      dispatch({
        type: GET_REPOS,
        payload: res.data,
      });
    } catch (err) {
      dispatch(setAlert("No Github Repos Found for such User Name", "danger"));
    }
  };
};
