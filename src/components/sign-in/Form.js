import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import validate from './Validate';
import renderField from '../shared/RenderField';

const FormField = (props) => {
  const { handleSubmit, pristine } = props;
  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <Field name="email" component={renderField} label="Email Address" type="email" />
      </div>
      <div className="form-group">
        <Field name="password" component={renderField} label="Password" type="password" />
      </div>
      <div className="form-group">
        <button type="submit" disabled={pristine} className="btn btn-primary">SIGN IN</button>
      </div>
    </form>
  );
};


FormField.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.func.isRequired,
};


const Form = reduxForm({
  form: 'signin',
  validate,
})(FormField);

export default Form;
