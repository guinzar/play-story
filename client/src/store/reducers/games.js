import * as actionTypes from '../actions/actionTypes';

const initialState = {
  user: null,
  games: [],
  sortBy: 'Release',
  sortAscending: false,
};
const setUser = ( state, action ) => {
  return {
    ...state,
    user: action.user
  };
};
const showGames = ( state, action ) => {
  return {
    ...state,
    games: action.games
  };
};
const changeSort = ( state, action ) => {
  const newSortAscending = action.sortBy === state.sortBy ? !state.sortAscending : state.sortAscending;
  return {
    ...state,
    games: [...state.games].sort((g1, g2) => {
      if (newSortAscending) return g2[action.sortBy.toLowerCase()] < g1[action.sortBy.toLowerCase()];
      return g2[action.sortBy.toLowerCase()] > g1[action.sortBy.toLowerCase()];
    }),
    sortBy: action.sortBy,
    sortAscending: action.sortBy === state.sortBy ? !state.sortAscending : state.sortAscending
  };
};
const addGame = ( state, action ) => {
  return {
    ...state,
    games: [...state.games, action.game]
  };
};
const editGame = ( state, action ) => {
  return {
    ...state,
    games: state.games.map(game => game.id === action.game.id ? action.game : game)
  };
};
const removeGame = ( state, action ) => {
  return {
    ...state,
    games: state.games.filter(game => game.id !== action.game.id)
  };
};
const reducer = ( state = initialState, action ) => {
  switch ( action.type ) {
    case actionTypes.SET_USER: return setUser( state, action );
    case actionTypes.SHOW_USER_GAMES: return showGames( state, action );
    case actionTypes.CHANGE_SORT: return changeSort( state, action );
    case actionTypes.ADD_GAME_SUCCESS: return addGame( state, action );
    case actionTypes.EDIT_GAME_SUCCESS: return editGame( state, action );
    case actionTypes.REMOVE_GAME_SUCCESS: return removeGame( state, action );
    default: return state;
  }
};

export default reducer;
