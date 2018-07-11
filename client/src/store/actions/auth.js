import * as actionTypes from "./actionTypes";

export const tokenAuthSuccess = (username) => {
  return {
    type: actionTypes.TOKEN_AUTH_SUCCESS,
    username: username
  };
};
export const logOut = () => {
  return {
    type: actionTypes.LOGOUT,
  };
};
export const getUserContent = (token, page) => {
  return {
    type: actionTypes.GET_USER_CONTENT,
    token: token,
    page: page
  };
};
