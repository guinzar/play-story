import * as actionTypes from "./actionTypes";

export const showHomeStories = (stories) => {
  return {
    type: actionTypes.SHOW_HOME_STORIES,
    stories: stories
  };
};
