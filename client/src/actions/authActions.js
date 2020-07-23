import {
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_FAIL,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  AUTH_ERROR,
  AUTH_SUCCESS,
} from "./types";
import axios from "axios";
import setAuthToken from "../utils/setAuthToken";

// LOAD USER
export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    const res = await axios.get("http://localhost:5000/api/users/getUser");
    dispatch({ type: AUTH_SUCCESS, payload: res.data.data.user });
  } catch (error) {
    dispatch({ type: AUTH_ERROR });
  }
};

// REGISTER
export const register = ({ name, email, password, passwordConfirm }) => async (
  dispatch
) => {
  dispatch({ type: REGISTER_REQUEST });
  const config = { headers: { "Content-Type": "application/json" } };
  const body = JSON.stringify({ name, email, password, passwordConfirm });
  try {
    const res = await axios.post(
      "http://localhost:5000/api/users/signup",
      body,
      config
    );
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data.data.newUser,
      token: res.data.data.token,
    });
    dispatch(loadUser());
  } catch (error) {
    console.log(error);
    dispatch({
      type: REGISTER_FAIL,
      // payload: res.data
    });
  }
};

// LOGIN
export const login = ({ email, password }) => async (dispatch) => {
  dispatch({ type: LOGIN_REQUEST });
  const config = { headers: { "Content-Type": "application/json" } };
  const body = JSON.stringify({ email, password });
  try {
    const res = await axios.post(
      "http://localhost:5000/api/users/signin",
      body,
      config
    );
    console.log(res);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data.data.token,
    });
    dispatch(loadUser());
  } catch (error) {
    console.log(error);
    dispatch({
      type: LOGIN_FAIL,
      // payload: res.data
    });
  }
};
