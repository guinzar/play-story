import * as actionTypes from "./actionTypes";

export const setUserAndSort = (user, sort) => {
  return {
    type: actionTypes.SET_USER_AND_SORT,
    user: user,
    sort: sort
  };
};
export const showUserGames = (games) => {
  return {
    type: actionTypes.SHOW_USER_GAMES,
    games: games
  };
};
export const changeSort = (field) => {
  return {
    type: actionTypes.CHANGE_SORT,
    sortBy: field
  };
};
export const clickAddGame = () => {
  return {
    type: actionTypes.CLICK_ADD_GAME
  };
};
export const addGameSuccess = (game) => {
  return {
    type: actionTypes.ADD_GAME_SUCCESS,
    game: game
  }
};
export const editGame = ( game ) => {
  return {
    type: actionTypes.EDIT_GAME,
    game: game
  };
};
export const editGameSuccess = (game) => {
  return {
    type: actionTypes.EDIT_GAME_SUCCESS,
    game: game
  }
};
export const removeGameSuccess = (game) => {
  return {
    type: actionTypes.REMOVE_GAME_SUCCESS,
    game: game
  };
};
