import * as actionTypes from "./actionTypes";

export const showUserGames = (games) => {
  return {
    type: actionTypes.SHOW_USER_GAMES,
    games: games
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
