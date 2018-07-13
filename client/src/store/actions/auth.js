import * as actionTypes from "./actionTypes";

export const tokenAuthSuccess = (username) => {
  return {
    type: actionTypes.TOKEN_AUTH_SUCCESS,
    username: username
  };
};
export const leavePage = () => {
  return {
    type: actionTypes.LEAVE_PAGE,
  };
};
export const logOut = () => {
  return {
    type: actionTypes.LOGOUT,
  };
};
export const getUserContent = (token, user, page) => {
  return {
    type: actionTypes.GET_USER_CONTENT,
    token: token,
    user: user,
    page: page
  };
};
