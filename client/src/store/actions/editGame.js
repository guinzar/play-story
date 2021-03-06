import * as actionTypes from './actionTypes';

export const changeReleaseInput = ( input ) => {
  return {
    type: actionTypes.CHANGE_RELEASE_INPUT,
    input: input
  };
};
export const deselectReleaseInput = () => {
  return {
    type: actionTypes.DESELECT_RELEASE_INPUT
  };
};
export const changeSearchInput = ( input ) => {
  return {
    type: actionTypes.CHANGE_SEARCH_INPUT,
    input: input
  };
};
export const updateSearchResults = ( results ) => {
  return {
    type: actionTypes.UPDATE_SEARCH_RESULTS,
    results: results
  };
};
export const updateSearchResultsFailed = () => {
  return {
    type: actionTypes.FETCH_RESULTS_FAILED
  };
};
export const selectGame = ( game ) => {
  return {
    type: actionTypes.SELECT_GAME,
    game: game
  }
}
export const removeSelectedGame = ( name ) => {
  return {
    type: actionTypes.REMOVE_SELECTED_GAME,
    input: name
  };
};
export const changePlatform = ( value ) => {
  return {
    type: actionTypes.CHANGE_PLATFORM,
    value: value
  };
};
export const changeEnjoyment = ( value ) => {
  return {
    type: actionTypes.CHANGE_ENJOYMENT,
    value: value
  };
};
export const changeCommentInput = ( input ) => {
  return {
    type: actionTypes.CHANGE_COMMENT_INPUT,
    input: input
  };
};
export const addPlayedYear = () => {
  return {
    type: actionTypes.ADD_PLAYED_YEAR
  };
};
export const removePlayedYear = ( index ) => {
  return {
    type: actionTypes.REMOVE_PLAYED_YEAR,
    index: index
  };
};
export const changePlayedYearYear = ( index, year ) => {
  return {
    type: actionTypes.CHANGE_PLAYED_YEAR_YEAR,
    index: index,
    year: year
  };
};
export const changePlayedYearAmount = ( index, amount ) => {
  return {
    type: actionTypes.CHANGE_PLAYED_YEAR_AMOUNT,
    index: index,
    amount: amount
  };
};
export const editGameSubmit = ( token, username, remove, gameData ) => {
  return {
    type: actionTypes.EDIT_GAME_SUBMIT,
    token: token,
    username: username,
    remove: remove,
    gameData: gameData
  };
};
export const editGameFailed = () => {
  return {
    type: actionTypes.EDIT_GAME_FAILED
  };
};
export const addGameSuccess = () => {
  return {
    type: actionTypes.ADD_GAME_SUCCESS
  };
};
export const removeGame = (id) => {
  return {
    type: actionTypes.REMOVE_GAME,
    id: id
  };
};
