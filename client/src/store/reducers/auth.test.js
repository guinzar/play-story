// import * as actionTypes from '../actions/actionTypes';
// import * as actions from '../actions/auth';
// import reducer from './auth';

// describe('auth reducer', () => {
//   // it('should return the initial state', () => {
//   //   expect(reducer(undefined, {})).toEqual([
//   //     {
//   //       token: null,
//   //       username: null,
//   //       birthday: null
//   //     }
//   //   ])
//   // })
//   it('should handle ADD_TODO', () => {
//     expect(
//       reducer({token: null, user: null, birthday: null},
//         actions.tokenAuthSuccess({user: 'test', birthday: '2000-12-03'}))
//     ).toEqual([
//       {
//         user: 'user',
//         birthday: '2000-12-03'
//       }
//     ]);
//   });
// })

// // const initialState = {
// //   token: localStorage.getItem('token'),
// //   username: localStorage.getItem('username'),
// //   birthday: null
// // };
// // const tokenAuthSuccess = ( state, action ) => {
// //   return {
// //     ...state,
// //     username: action.user.username,
// //     birthday: action.user.birthday
// //   };
// // };
// // const logInSuccess = ( state, action ) => {
// //   return {
// //     ...state,
// //     token: action.token,
// //   };
// // };
// // const logOut = ( state, action ) => {
// //   localStorage.removeItem('token');
// //   localStorage.removeItem('username');
// //   return {
// //     ...state,
// //     token: null,
// //     username: null,
// //     birthday: null 
// //   }
// // };
// // const reducer = ( state = initialState, action ) => {
// //   switch ( action.type ) {
// //     case actionTypes.TOKEN_AUTH_SUCCESS: return tokenAuthSuccess( state, action );
// //     case actionTypes.LOGIN_SUCCESS: return logInSuccess( state, action );
// //     case actionTypes.LOGOUT: return logOut( state, action );
// //     default: return state;
// //   }
// // };

// // export default reducer;
