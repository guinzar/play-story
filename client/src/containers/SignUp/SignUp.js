import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/signUp';
import PropTypes from 'prop-types';
import Input from '../../components/Form/Input';

const SignUp = ({ fields, formValid, onInputChange, onInputDeselect, onSubmitSignUp }) => {
  return (
    <React.Fragment>
      <div className="row justify-content-center">
        <div className="col-6">
          <h1>Sign Up</h1>
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
    </React.Fragment>
  );
};
const mapStateToProps = state => {
  return {
    fields: state.signUp.fields,
    formValid: state.signUp.formValid
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onInputChange: (fieldIndex, input) => dispatch(actions.changeInput(fieldIndex, input)),
    onInputDeselect: (fieldIndex, input) => dispatch(actions.deselectInput(fieldIndex, input)),
    onSubmitSignUp: (fields, formValid) => dispatch(actions.submitSignup(fields, formValid))
    // onEmailInputChange: (input) => dispatch(actions.changeEmailInput(input)),
    // onUsernameInputChange: (input) => dispatch(actions.changeUsernameInput(input))
  };
};

// addGame.propTypes = {
//   modalId: PropTypes.string.isRequired,
//   selectedGame: PropTypes.object
// };

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
