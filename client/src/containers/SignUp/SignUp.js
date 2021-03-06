import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as actions from '../../store/actions/signUp';
import PropTypes from 'prop-types';
import './SignUp.css';
import Input from '../../components/Form/Input';

const signUp = ({ fields, formValid, onInputChange, onInputDeselect, onSubmitSignUp, token }) => {
  return (
    <div className="container">
      {token ? <Redirect to='/' /> : null}
      <div className="row justify-content-center">
        <div className="col-6">
          <div className="signup rounded p-2 mt-2">
            <h1>Sign Up</h1>
            <form className="pb-5">
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
                onClick={() => onSubmitSignUp(fields.reduce((acc, field) => {
                  if (field.id !== 'password2') acc[field.id] = field.value;
                  return acc;
                }, {}), formValid)}
                type="button"
                className="btn btn-primary float-right">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
const mapStateToProps = state => {
  return {
    token: state.auth.token,
    fields: state.signUp.fields,
    formValid: state.signUp.formValid 
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onInputChange: (fieldIndex, input) => dispatch(actions.signUpChangeInput(fieldIndex, input)),
    onInputDeselect: (fieldIndex, input) => dispatch(actions.signUpDeselectInput(fieldIndex, input)),
    onSubmitSignUp: (fields, formValid) => dispatch(actions.signUpSubmit(fields, formValid))
  };
};

signUp.propTypes = {
  token: PropTypes.string,
  fields: PropTypes.array.isRequired,
  formValid: PropTypes.bool.isRequired,
  onInputChange: PropTypes.func.isRequired,
  onInputDeselect: PropTypes.func.isRequired,
  onSubmitSignUp: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(signUp);
