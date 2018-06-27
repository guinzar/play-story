import * as actionTypes from "./actionTypes";

export const changeSearchInput = ( input ) => {
  return {
    type: actionTypes.CHANGE_SEARCH_INPUT,
    input: input
  }
}
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
