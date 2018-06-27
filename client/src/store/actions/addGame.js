import * as actionTypes from "./actionTypes";

export const initSearch = ( input ) => {
  return {
    type: actionTypes.INIT_SEARCH,
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