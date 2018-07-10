import * as actionTypes from "./actionTypes";

export const changeInput = ( fieldIndex, input ) => {
  return {
    type: actionTypes.CHANGE_INPUT,
    fieldIndex: fieldIndex,
    input: input
  };
};
export const deselectInput = ( fieldIndex, input ) => {
  return {
    type: actionTypes.DESELECT_INPUT,
    fieldIndex: fieldIndex,
    input: input
  };
};
export const submitSignup = ( fields, formValid) => {
  return {
    type: actionTypes.SUBMIT_SIGNUP,
    fields: fields,
    formValid: formValid
  };
};
export const submitSignupFailed = () => {
  return {
    type: actionTypes.SUBMIT_SIGNUP_FAILED
  };
};
