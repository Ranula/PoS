import axios from "axios";
import { LOG_IN, IS_AUTHENTICATED } from "./types";

// API Address
const HOST = "http://localhost:5500";

export const logIn = user => dispatch => {
  return axios.post(HOST + "/login", user).then(res => {
    return dispatch({
      type: LOG_IN,
      payload: res.data
    });
  });
};

export const isAuthenticated = (token) => dispatch => {
  return axios.get(HOST + "/isAuthenticated?token=" + token).then(res => {
      return dispatch({
        type: IS_AUTHENTICATED,
        payload: res.data
      });
    })
};
