import * as actionTypes from '../actions/actionTypes';

const initialState = {
  stories: []
};
const showHomeStories = ( state, action ) => {
  return {
    ...state,
    stories: action.stories
  };
};
const reducer = ( state = initialState, action ) => {
  switch ( action.type ) {
    case actionTypes.SHOW_HOME_STORIES: return showHomeStories( state, action );
    default: return state;
  }
};

export default reducer;
