import * as actionTypes from "./actionTypes";

export const showUserGames = (games) => {
  return {
    type: actionTypes.SHOW_USER_GAMES,
    games: games
  };
};
