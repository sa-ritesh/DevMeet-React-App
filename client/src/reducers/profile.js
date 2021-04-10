import {
  CLEAR_PROFILE,
  GET_PROFILE,
  GET_PROFILES,
  GET_REPOS,
  PROFILE_ERROR,
  REMOVE_PROFILE_LOADER,
  SET_PROFILE_LOADER,
  UPDATE_PROFILE,
} from "../actions/types";

const initialState = {
  profile: null,
  profiles: [],
  repos: [],
  loading: true,
  error: {},
};
export default function profile(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case UPDATE_PROFILE:
    case GET_PROFILE:
      return {
        ...state,
        loading: false,
        profile: payload,
      };
    case PROFILE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
        profile: null,
        repos: [],
      };
    case CLEAR_PROFILE:
      return {
        ...state,
        profile: null,
        repos: [],
        loading: false,
      };
    case GET_PROFILES:
      return {
        ...state,
        loading: false,
        profiles: payload,
      };
    case GET_REPOS:
      return {
        ...state,
        repos: payload,
        loading: false,
      };
    case SET_PROFILE_LOADER:
      return {
        ...state,
        loading: true,
      };
    case REMOVE_PROFILE_LOADER:
      return {
        ...state,
        loading: false,
      };

    default:
      return state;
  }
}
