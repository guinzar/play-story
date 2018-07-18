import React from 'react';
import PropTypes from 'prop-types';

const input = ({ id, type, label, value, onChange, onDeselect, descrip, touched, required, valid, validityMsg }) => {
  const validityClass = touched ? valid ? ' is-valid' : ' is-invalid' : '';
  return (
    <div className="form-group">
      <label htmlFor={id}>{label}:</label>
      <input value={value} onChange={onChange} onBlur={onDeselect} type={type} className={`form-control${validityClass}`} id={id} />
      {descrip ? <small className="form-text text-muted">{descrip}</small> : null}
      <div className="valid-feedback">
        Looks good!
      </div>
      <div className="invalid-feedback">
        {validityMsg}
      </div>
    </div>
  );
}
input.propTypes = {
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onDeselect: PropTypes.func.isRequired,
  descrip: PropTypes.string,
  touched: PropTypes.bool.isRequired,
  // required: PropTypes.bool.isRequired,
  valid: PropTypes.bool.isRequired,
  validityMsg: PropTypes.string.isRequired,
};

export default input;
