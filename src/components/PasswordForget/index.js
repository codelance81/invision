import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Form, FormControl,Alert } from 'react-bootstrap';
import { auth } from '../../firebase';
import * as routes from '../../constants/routes';

const PasswordForgetPage = () =>
  <center className="mt-4">
    <div className="col-sm-4">
      <h5>Forgot Password ?</h5>
      <hr/>
      <PasswordForgetForm />
    </div>
  </center>

const updateByPropertyName = (propertyName, value) => () => ({
  [propertyName]: value,
});

const INITIAL_STATE = {
  email: '',
  error: null,
};

class PasswordForgetForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {
    const { email } = this.state;

    auth.doPasswordReset(email)
      .then(() => {
        this.setState(() => ({ ...INITIAL_STATE }));
      })
      .catch(error => {
        this.setState(updateByPropertyName('error', error));
      });

    event.preventDefault();
  }

  render() {
    const {
      email,
      error,
    } = this.state;

    const isInvalid = email === '';

    return (
     <Form onSubmit={this.onSubmit}>
        <FormControl
          value={this.state.email}
          onChange={event => this.setState(updateByPropertyName('email', event.target.value))}
          type="text"
          placeholder="Email Address"
        />
        <Button color="success" disabled={isInvalid} type="submit">
          Reset My Password
        </Button>

        { error && <Alert color="danger">{error.message}</Alert> }
      </Form>
      
    );
  }
}


const PasswordForgetLink = () =>
  <center>
    <p>
      <Link to={routes.PASSWORD_FORGET}>Forgot Password?</Link>
    </p>
  </center>

export default PasswordForgetPage;

export {
  PasswordForgetForm,
  PasswordForgetLink,
};
