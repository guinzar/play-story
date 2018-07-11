import * as actionTypes from "./actionTypes";

export const logInChangeInput = ( fieldIndex, input ) => {
  return {
    type: actionTypes.LOGIN_CHANGE_INPUT,
    fieldIndex: fieldIndex,
    input: input
  };
};
export const logInDeselectInput = ( fieldIndex, input ) => {
  return {
    type: actionTypes.LOGIN_DESELECT_INPUT,
    fieldIndex: fieldIndex,
    input: input
  };
};
export const logInSubmit = ( fields, formValid ) => {
  return {
    type: actionTypes.LOGIN_SUBMIT,
    fields: fields,
    formValid: formValid
  };
};
export const logInSuccess = ( token ) => {
  return {
    type: actionTypes.LOGIN_SUCCESS,
    token: token
  };
}
export const logInFailed = () => {
  return {
    type: actionTypes.LOGIN_FAILED
  };
};
