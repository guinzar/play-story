import * as actionTypes from "./actionTypes";

export const signUpChangeInput = ( fieldIndex, input ) => {
  return {
    type: actionTypes.SIGNUP_CHANGE_INPUT,
    fieldIndex: fieldIndex,
    input: input
  };
};
export const signUpDeselectInput = ( fieldIndex, input ) => {
  return {
    type: actionTypes.SIGNUP_DESELECT_INPUT,
    fieldIndex: fieldIndex,
    input: input
  };
};
export const signUpSubmit = ( fields, formValid ) => {
  return {
    type: actionTypes.SIGNUP_SUBMIT,
    fields: fields,
    formValid: formValid
  };
};
export const signUpFailed = ( field, error ) => {
  return {
    type: actionTypes.SIGNUP_FAILED,
    field: field,
    error: error
  };
};
