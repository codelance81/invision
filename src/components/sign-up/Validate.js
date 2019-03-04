const validate = (values) => {
  const errors = {};

  if (!values.name) {
    errors.name = 'Required';
  } else if (values.name.length < 2) {
    errors.name = 'Minimum be 2 characters or more';
  }
  if (!values.email) {
    errors.email = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }
  if (!values.password) {
    errors.password = 'Required';
  } else if (values.password.length < 5) {
    errors.password = 'Minimum be 5 characters or more';
  }
  if (!values.confirmPassword) {
    errors.confirmPassword = 'Required';
  } else if (values.confirmPassword.length < 5) {
    errors.confirmPassword = 'Minimum be 5 characters or more';
  } else if (values.password !== values.confirmPassword) {
    errors.confirmPassword = "Password doesn't match";
  }

  return errors;
};

export default validate;
