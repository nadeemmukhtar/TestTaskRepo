import {
  AUTHENTICATE,
  SET_ERROR_TRUE,
  LOGOUT,
  OPERATION_SUCCESS,
  LOADING,
  LOADED,
} from "../types";
import axios from "axios";
export const userLogin = (values, history) => (dispatch) => {
  let user = new FormData();
  user.append("user[email]", values.email);
  user.append("user[password]", values.password);
  axios
    .post("/login", user)
    .then((res) => {
      dispatch({
        type: AUTHENTICATE,
        payload: res.headers.authorization,
      });
      history.push("/dashboard");
    })
    .catch((err) => {
      dispatch({
        type: SET_ERROR_TRUE,
        payload: "Incorrect Email or Password",
      });
    });
};
export const userSignup = (values, history) => (dispatch) => {
  let data = {
    email: values.email,
    password: values.password,
    firstname: values.first_name,
    username: values.username,
    role: values.role,
  };
  let user = new FormData();
  user.append("user[email]",data.email);
  user.append("user[password]",data.password);
  user.append("user[first_name]",data.firstname);
  user.append("user[username]",data.username);
  user.append("user[role]",data.role);

  axios
    .post("/signup", user, {
      headers: {
        "Content-Type": " multipart/form-data",
      },
    })
    .then((res) => {
      console.log(res);
         dispatch({
        type: OPERATION_SUCCESS,
        payload: "Succesfully Signed up",
      });
      history.push("/");
    })
    .catch((err) => {
      dispatch({
        type: SET_ERROR_TRUE,
        payload: "Unable to Sign up",
      });
    });
};

export const logOut = (history) => (dispatch, getState) => {
  let role = getState().AUTH.data.authorization;
  if (role === "admin") {
    history.push("/adminlogin");
  } else {
    history.push("/login");
  }
  dispatch({
    type: LOGOUT,
    payload: "Clear Store",
  });
};
export const loading = () => (dispatch) => {
  dispatch({
    type: LOADING,
    payload: "",
  });
};
export const loaded = () => (dispatch) => {
  dispatch({
    type: LOADED,
    payload: "",
  });
};
