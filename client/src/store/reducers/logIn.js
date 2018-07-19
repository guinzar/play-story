import * as actionTypes from '../actions/actionTypes';
const alphaNumericRegex = /^[a-zA-Z0-9]{2,}$/;

const initialState = {
  fields: [
    {
      id: 'username',
      type: 'text',
      value: '',
      label: 'Username',
      touched: false,
      required: true,
      valid: false,
      validityMsg: 'Please enter a username'
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
      validityMsg: 'Please enter a password'
    }
  ],
  formValid: false
};
const validateInput = (field, input) => {
  switch( field ) {
    case 'username': return [alphaNumericRegex.test(input), 'Please enter a username'];
    case 'password': return [input.length > 0, 'Please enter a password'];
    default: return [true, ''];
  }
};
const changeInput = ( state, action ) => {
  const fieldId = state.fields[action.fieldIndex].id;
  const validity = validateInput(fieldId, action.input);
  const newFields = state.fields.map((field, i) => i === action.fieldIndex ? {
    ...state.fields[i],
    value: action.input,
    valid: validity[0],
    validityMsg: validity[1]
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
const loginSubmit = ( state, action ) => {
  return {
    ...state,
    fields: state.fields.map((field, i) => {
      return {
        ...field,
        touched: true,
      };
    })
  };
};
const loginFailed = ( state, action ) => {
  return {
    ...state,
    fields: state.fields.map((field, i) => {
      return {
        ...field,
        touched: true,
        valid: false,
        validityMsg: 'Username or Password is incorrect'
      };
    })
  };
};
const resetForm = ( state, action ) => {
  return initialState;
};
const reducer = ( state = initialState, action ) => {
  switch ( action.type ) {
    case actionTypes.LOGIN_CHANGE_INPUT: return changeInput( state, action );
    case actionTypes.LOGIN_DESELECT_INPUT: return deselectInput( state, action );
    case actionTypes.LOGIN_SUBMIT: return loginSubmit( state, action );
    case actionTypes.LOGIN_FAILED: return loginFailed( state, action );
    case actionTypes.LEAVE_PAGE: return resetForm( state, action );
    case actionTypes.LOGOUT: return resetForm( state, action );
    default: return state;
  }
};

export default reducer;
