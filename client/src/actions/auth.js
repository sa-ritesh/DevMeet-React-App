import { REGISTER_SUCCESS, REGISTER_FAIL } from "./types";

export const register = ({ name, email, password }) => {
  return async (dispatch) => {
    console.log("in actiom");
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
      });
  };
};
