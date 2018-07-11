import * as actionTypes from '../actions/actionTypes';

const initialState = {
  token: localStorage.getItem('token'),
  username: null
};
const tokenAuthSuccess = ( state, action ) => {
  return {
    ...state,
    username: action.username
  };
};
const logInSuccess = ( state, action ) => {
  console.log('login success');
  return {
    ...state,
    token: action.token,
  };
};
const logOut = ( state, action ) => {
  localStorage.removeItem('token');
  return {
    ...state,
    token: null,
    username: null
  }
};
const reducer = ( state = initialState, action ) => {
  switch ( action.type ) {
    case actionTypes.TOKEN_AUTH_SUCCESS: return tokenAuthSuccess( state, action );
    case actionTypes.LOGIN_SUCCESS: return logInSuccess( state, action );
    case actionTypes.LOGOUT: return logOut( state, action );
    default: return state;
  }
};

export default reducer;