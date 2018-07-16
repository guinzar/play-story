import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as actions from '../../store/actions/logIn';
import PropTypes from 'prop-types';
import Input from '../../components/Form/Input';

const SignUp = ({ fields, formValid, onInputChange, onInputDeselect, onSubmitLogIn, token }) => {
  return (
    <div className="container">
      {token ? <Redirect to='/' /> : null}
      <div className="row justify-content-center">
        <div className="col-6">
          <h1>Log In</h1>
          <form>
            {fields.map((field, i) => <Input
              key={i}
              onChange={(e) => onInputChange(i, e.target.value)}
              onDeselect={(e) => onInputDeselect(i, e.target.value)}
              id={field.id}
              type={field.type}
              label={field.label}
              value={field.value}
              descrip={field.descrip}
              touched={field.touched}
              required={field.required}
              valid={field.valid}
              validityMsg={field.validityMsg}
            />)}
            <button
              onClick={() => onSubmitLogIn(fields.reduce((acc, field) => {
                if (field.id !== 'password2') acc[field.id] = field.value;
                return acc;
              }, {}), formValid)}
              type="button"
              className="btn btn-primary float-right">
              Log In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
const mapStateToProps = state => {
  return {
    token: state.auth.token,
    fields: state.logIn.fields,
    formValid: state.logIn.formValid
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onInputChange: (fieldIndex, input) => dispatch(actions.logInChangeInput(fieldIndex, input)),
    onInputDeselect: (fieldIndex, input) => dispatch(actions.logInDeselectInput(fieldIndex, input)),
    onSubmitLogIn: (fields, formValid) => dispatch(actions.logInSubmit(fields, formValid))
  };
};

// addGame.propTypes = {
//   modalId: PropTypes.string.isRequired,
//   selectedGame: PropTypes.object
// };

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
