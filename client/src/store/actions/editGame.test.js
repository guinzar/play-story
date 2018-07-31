import * as actionTypes from './actionTypes';
import * as actions from './editGame';

describe('actions-auth', () => {
  it('should create an action for changing release date input', () => {
    const input = '2000-12-12';
    const expectedAction = {
      type: actionTypes.CHANGE_RELEASE_INPUT,
      input
    };
    expect(actions.changeReleaseInput(input)).toEqual(expectedAction);
  });
  it('should create an action for deselecting release date input', () => {
    const expectedAction = {
      type: actionTypes.ESELECT_RELEASE_INPUT,
    };
    expect(actions.deselectReleaseInput()).toEqual(expectedAction);
  });
  it('should create an action for changing game search input', () => {
    const input = 'gamename';
    const expectedAction = {
      type: actionTypes.CHANGE_SEARCH_INPUT,
      input
    };
    expect(actions.changeSearchInput(input)).toEqual(expectedAction);
  });
  it('should create an action for updating game search results', () => {
    const results = [1, 2, 3];
    const expectedAction = {
      type: actionTypes.UPDATE_SEARCH_RESULTS,
      results
    };
    expect(actions.updateSearchResults(results)).toEqual(expectedAction);
  });
  it('should create an action for updating game search results failing', () => {
    const expectedAction = {
      type: actionTypes.FETCH_RESULTS_FAILED
    };
    expect(actions.updateSearchResultsFailed(results)).toEqual(expectedAction);
  });
  it('should create an action for selecting a game', () => {
    const game = { name: 'tetris' };
    const expectedAction = {
      type: actionTypes.CHANGE_SEARCH_INPUT,
      game
    };
    expect(actions.selectGame(game)).toEqual(expectedAction);
  });
});
// export const removeSelectedGame = ( name ) => {
//   return {
//     type: actionTypes.REMOVE_SELECTED_GAME,
//     input: name
//   };
// };
// export const changePlatform = ( value ) => {
//   return {
//     type: actionTypes.CHANGE_PLATFORM,
//     value: value
//   };
// };
// export const changeEnjoyment = ( value ) => {
//   return {
//     type: actionTypes.CHANGE_ENJOYMENT,
//     value: value
//   };
// };
// export const changeCommentInput = ( input ) => {
//   return {
//     type: actionTypes.CHANGE_COMMENT_INPUT,
//     input: input
//   };
// };
// export const addPlayedYear = () => {
//   return {
//     type: actionTypes.ADD_PLAYED_YEAR
//   };
// };
// export const removePlayedYear = ( index ) => {
//   return {
//     type: actionTypes.REMOVE_PLAYED_YEAR,
//     index: index
//   };
// };
// export const changePlayedYearYear = ( index, year ) => {
//   return {
//     type: actionTypes.CHANGE_PLAYED_YEAR_YEAR,
//     index: index,
//     year: year
//   };
// };
// export const changePlayedYearAmount = ( index, amount ) => {
//   return {
//     type: actionTypes.CHANGE_PLAYED_YEAR_AMOUNT,
//     index: index,
//     amount: amount
//   };
// };
// export const editGameSubmit = ( token, username, remove, gameData ) => {
//   return {
//     type: actionTypes.EDIT_GAME_SUBMIT,
//     token: token,
//     username: username,
//     remove: remove,
//     gameData: gameData
//   };
// };
// export const editGameFailed = () => {
//   return {
//     type: actionTypes.EDIT_GAME_FAILED
//   };
// };
// export const addGameSuccess = () => {
//   return {
//     type: actionTypes.ADD_GAME_SUCCESS
//   };
// };
// export const removeGame = (id) => {
//   return {
//     type: actionTypes.REMOVE_GAME,
//     id: id
//   };
// };
