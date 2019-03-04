import React from 'react';
/* eslint react/prop-types: 0 */
const renderField = ({
  input, label, type, meta: { touched, error },
}) => (
  <div>
    <label className="control-label" id="label">{label}</label>
    <div>
      <input {...input} placeholder={label} type={type} className="form-control" />
      {touched && (error && (<span className="text-danger">{error}</span>))}
    </div>
  </div>
);

export default renderField;
