import axios from "axios";
import * as actionType from "./actionTypes";

const loginRequest = () => ({
  type: actionType.LOGIN_REQUEST,
});

const loginSuccess = () => ({
  type: actionType.LOGIN_SUCCESS,
});

const loginFailed = (data) => ({
  type: actionType.LOGIN_FAILURE,
  payload: data,
});

export const login = (email, password, history) => {
  return async (dispatch) => {
    dispatch(loginFailed(""));

    dispatch(loginRequest());
    axios
      .post("api/auth/login", { email, password })
      .then((res) => {
        dispatch(loginSuccess());
        console.log(res.data.body.user);
        localStorage.setItem("user", JSON.stringify(res.data.body.user));
        localStorage.setItem("authToken", JSON.stringify(res.data.body.token));
        // console.log(res);
        history.push("dashboard");
      })
      .catch((err) => {
        console.log(err.response);
        dispatch(loginFailed(err.response.data.message));
        // console.log();
      });
  };
};

export const getUser = () => {
  // console.log(localStorage.getItem("authToken"))
  if (typeof window == "undefined") {
    return false;
  }

  if (localStorage.getItem("user")) {
    return JSON.parse(localStorage.getItem("user"));
  } else {
    return false;
  }
};

export const logOut = () => {
  localStorage.clear();
};
