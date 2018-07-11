import * as actionTypes from '../actions/actionTypes';

const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const alphaNumericRegex = /^[a-zA-Z0-9]{2,}$/;

const initialState = {
  fields: [
    {
      id: 'email',
      type: 'email',
      value: '',
      label: 'Email Address',
      descrip: '',
      touched: false,
      required: true,
      valid: false,
      validityMsg: 'Please enter a valid email address'
    },
    {
      id: 'username',
      type: 'text',
      value: '',
      label: 'Username',
      descrip: 'Your username will also be your unique profile url',
      touched: false,
      required: true,
      valid: false,
      validityMsg: 'Please enter a valid 2+ character alphanumeric name'
    },
    {
      id: 'password',
      type: 'password',
      value: '',
      label: 'Password',
      descrip: '',
      touched: false,
      required: true,
      valid: false,
      validityMsg: 'Please enter a valid password'
    },
    {
      id: 'password2',
      type: 'password',
      value: '',
      label: 'Verify Password',
      descrip: '',
      touched: false,
      required: true,
      valid: false,
      validityMsg: 'Passwords don\'t match'
    },
    {
      id: 'birthday',
      type: 'date',
      value: '',
      label: 'Birthday',
      descrip: 'Used for age to year conversions to help you place older games on your timeline',
      touched: false,
      required: false,
      valid: false,
      validityMsg: 'Invalid date selected'
    },
  ],
  formValid: false
};
const validateInput = (field, input) => {
  const invalidMsg = `Please enter a valid ${field}`;
  switch( field ) {
    case 'email': return [emailRegex.test(input), invalidMsg];
    case 'username': return [alphaNumericRegex.test(input), 'Please enter a valid 2+ character alphanumeric name'];
    case 'password': return [input.length > 0, invalidMsg];
    case 'password2': return [input.length && input[0] === input[1], 'Passwords don\'t match'];
    case 'birthday': return [input !== '', 'Invalid date selected'];
    default: return [true, ''];
  }
};
const changeInput = ( state, action ) => {
  const fieldId = state.fields[action.fieldIndex].id;
  const validity = fieldId === 'password2' ?
    validateInput(fieldId, [action.input, state.fields[action.fieldIndex - 1].value]) : validateInput(fieldId, action.input);
  const newFields = state.fields.map((field, i) => i === action.fieldIndex ? {
    ...state.fields[i],
    value: action.input,
    valid: validity[0],
    validityMsg: validity[1]
  } : fieldId === 'password' && field.id === 'password2' && field.touched ? {
    ...state.fields[i],
    value: '',
    touched: false,
    valid: false
  } : field);
  return {
    ...state,
    fields: newFields,
    formValid: newFields.every(field => field.required ? field.valid : true)
  };
};
const deselectInput = ( state, action ) => {
  return {
    ...state,
    fields: state.fields.map((field, i) => i === action.fieldIndex ?
      { ...state.fields[i], touched: true } : field)
  };
};
const submitSignUp = ( state, action ) => {
  return {
    ...state,
    fields: state.fields.map((field, i) => {
      return {
        ...field,
        touched: field.id === 'birthday' && !field.touched ? false : true,
      };
    })
  }
};
const signUpFailed = ( state, action ) => {
  return {
    ...state,
    fields: state.fields.map((field, i) => field.id === action.field ?
      {
        ...field,
        valid: false,
        validityMsg: action.error
      } : field
    )
  }
};
const resetForm = ( state, action ) => {
  return initialState;
};
const reducer = ( state = initialState, action ) => {
  switch ( action.type ) {
    case actionTypes.SIGNUP_CHANGE_INPUT: return changeInput( state, action );
    case actionTypes.SIGNUP_DESELECT_INPUT: return deselectInput( state, action );
    case actionTypes.SIGNUP_SUBMIT: return submitSignUp( state, action );
    case actionTypes.SIGNUP_FAILED: return signUpFailed( state, action );
    case actionTypes.LEAVE_PAGE: return resetForm( state, action );
    default: return state;
  }
};

export default reducer;
