import * as actionTypes from '../actions/actionTypes';

const initialState = {
  user: null,
  games: [],
  sortBy: 'Release',
  sortAscending: false,
};
const sort = (g1, g2, sortBy, sortAscending) => {
  if (sortBy === 'Release') {
    if (sortAscending) return g1.release - g2.release;
    return g2.release - g1.release;
  } else if (sortBy === 'Name') {
    if (sortAscending) return g1.name > g2.name;
    return g2.name > g1.name;
  } else if (sortBy === 'Enjoyment') {
    if (sortAscending) return g1.enjoyment > g2.enjoyment;
    return g2.enjoyment > g1.enjoyment;
  }
};
const setUserAndSort = ( state, action ) => {
  if (action.sort) {
    const sort = action.sort.split('_');
    sort[0] = sort[0].charAt(0).toUpperCase() + sort[0].substr(1);
    sort[1] = sort[1] === 'asc';
    return {
      ...state,
      user: action.user,
      sortBy: sort[0],
      sortAscending: sort[1]
    };
  }
  return {
    ...state,
    user: action.user
  };
};
const showGames = ( state, action ) => {
  return {
    ...state,
    games: action.games.sort((g1, g2) => sort(g1, g2, state.sortBy, state.sortAscending))
  };
};
const changeSort = ( state, action ) => {
  console.log('changesort')
  const newSortAscending = action.sortBy === state.sortBy ? !state.sortAscending : false;
  // console.log(state.games.map(game => game.id).join(','));
  // let copy = [...state.games];
  // console.log(copy.map(game => game.id).join(','));
  // let copy = [...state.games].map(game => game.id);
  // const arr = [1,2,3]
  return {
    ...state,
    games: [...state.games].sort((g1, g2) => sort(g1, g2, action.sortBy, newSortAscending)),
    sortBy: action.sortBy,
    sortAscending: newSortAscending
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
    case actionTypes.SET_USER_AND_SORT: return setUserAndSort( state, action );
    case actionTypes.SHOW_USER_GAMES: return showGames( state, action );
    case actionTypes.CHANGE_SORT: return changeSort( state, action );
    case actionTypes.ADD_GAME_SUCCESS: return addGame( state, action );
    case actionTypes.EDIT_GAME_SUCCESS: return editGame( state, action );
    case actionTypes.REMOVE_GAME_SUCCESS: return removeGame( state, action );
    default: return state;
  }
};

export default reducer;
