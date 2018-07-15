import * as actionTypes from "./actionTypes";

export const tokenAuthSuccess = (user) => {
  return {
    type: actionTypes.TOKEN_AUTH_SUCCESS,
    user: user
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
