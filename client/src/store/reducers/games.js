import * as actionTypes from '../actions/actionTypes';

const initialState = {
  user: null,
  games: []
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
const addGame = ( state, action ) => {
  return {
    ...state,
    games: [...state.games, action.game]
  };
};
const reducer = ( state = initialState, action ) => {
  switch ( action.type ) {
    case actionTypes.SET_USER: return setUser( state, action );
    case actionTypes.SHOW_USER_GAMES: return showGames( state, action );
    case actionTypes.ADD_GAME_SUCCESS: return addGame( state, action );
    default: return state;
  }
};

export default reducer;
