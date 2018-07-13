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
