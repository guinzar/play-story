import * as actionTypes from '../actions/actionTypes';

const initialState = {
  stories: []
};

const showHomeStories = ( state, action ) => {
  return {
    ...state,
    stories: action.stories.sort((story1, story2) => {
      if (story2.date > story1.date) return 1;
      if (story1.date > story2.date) return -1;
      return 0;
    })
  };
};
const reducer = ( state = initialState, action ) => {
  switch ( action.type ) {
    case actionTypes.SHOW_HOME_STORIES: return showHomeStories( state, action );
    default: return state;
  }
};

export default reducer;
