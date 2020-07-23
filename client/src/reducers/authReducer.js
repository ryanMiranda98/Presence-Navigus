import {
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_FAIL,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  AUTH_ERROR,
  AUTH_SUCCESS,
} from "../actions/types";

const initialState = {
  user: null,
  loading: false,
  isAuthenticated: false,
  token: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_REQUEST:
    case LOGIN_REQUEST:
      return { ...state, loading: true };
    case REGISTER_SUCCESS:
      localStorage.setItem("token", action.token);
      return {
        ...state,
        loading: false,
        user: action.payload,
        token: action.token,
      };
    case LOGIN_SUCCESS:
      localStorage.setItem("token", action.payload);
      return { ...state, loading: false, token: action.payload };
    case AUTH_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload,
        isAuthenticated: true,
      };
    case REGISTER_FAIL:
    case LOGIN_FAIL:
    case AUTH_ERROR:
      localStorage.removeItem("token");
      return {
        ...state,
        loading: false,
        user: null,
        token: null,
        isAuthenticated: false,
      };
    default:
      return state;
  }
};
