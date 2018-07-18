import * as actionTypes from '../actions/actionTypes';

const initialState = {
  user: null,
  stories: []
};
const setUser = ( state, action ) => {
  return {
    ...state,
    user: action.user
  };
};
const showUserStories = ( state, action ) => {
  return {
    ...state,
    stories: action.stories
  };
};
const reducer = ( state = initialState, action ) => {
  switch ( action.type ) {
    case actionTypes.SET_USER: return setUser( state, action );
    case actionTypes.SHOW_USER_STORIES: return showUserStories( state, action );
    default: return state;
  }
};

export default reducer;
