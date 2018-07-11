import * as actionTypes from "./actionTypes";

export const setUser = (user) => {
  return {
    type: actionTypes.SET_USER,
    user: user
  };
};
export const showUserStories = (stories) => {
  return {
    type: actionTypes.SHOW_USER_STORIES,
    stories: stories
  };
};
