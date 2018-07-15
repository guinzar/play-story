import * as actionTypes from "./actionTypes";

export const setUserAndSortTimeline = (user, sort) => {
  return {
    type: actionTypes.SET_USER_AND_SORT_TIMELINE,
    user: user,
    sort: sort
  };
};
