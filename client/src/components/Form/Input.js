import React from 'react';

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

export default input;
