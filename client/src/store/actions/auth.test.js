import * as actionTypes from './actionTypes';
import * as actions from './auth';

describe('actions-auth', () => {
  it('should create an action for token auth success', () => {
    const user = 'test';
    const expectedAction = {
      type: actionTypes.TOKEN_AUTH_SUCCESS,
      user
    };
    expect(actions.tokenAuthSuccess(user)).toEqual(expectedAction);
  });
  it('should create an action for leaving a page', () => {
    const expectedAction = {
      type: actionTypes.LEAVE_PAGE,
    };
    expect(actions.leavePage()).toEqual(expectedAction);
  });
  it('should create an action for logging out', () => {
    const expectedAction = {
      type: actionTypes.LOGOUT,
    };
    expect(actions.logOut()).toEqual(expectedAction);
  });
  it('should create an action for getting user content', () => {
    const token = 'asdf';
    const user = 'test';
    const page = 'home'
    const expectedAction = {
      type: actionTypes.GET_USER_CONTENT,
      token,
      user,
      page
    };
    expect(actions.getUserContent(token, user, page)).toEqual(expectedAction);
  });
});
