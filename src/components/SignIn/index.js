import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Button,Grid, Row,Form,Col, FormGroup, FormControl,Alert } from 'react-bootstrap';
import { SignUpLink } from '../SignUp';
import { PasswordForgetLink } from '../PasswordForget';
import { auth } from '../../firebase';

const SignInPage = ({ history }) =>
  <Grid>
    <center>
      <Row>
        <Col sm={4} smOffset={4}> 
          <SignInForm history={history} />
          <PasswordForgetLink />
          <SignUpLink />
        </Col>
      </Row>
    </center>
  </Grid>

const updateByPropertyName = (propertyName, value) => () => ({
  [propertyName]: value,
});

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
};

class SignInForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {
    const {
      email,
      password,
    } = this.state;

    auth.doSignInWithEmailAndPassword(email, password)
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
      password,
      error,
    } = this.state;

    const isInvalid =
      password === '' ||
      email === '';

    return (
      <div className="login">          
        <h3>Please Login !! </h3>
        <hr/>
        <Form onSubmit={this.onSubmit}>
          <FormGroup>
            <FormControl type="email"
              name="email" 
              value={email}
              placeholder="Email address" 
              onChange={event => this.setState(updateByPropertyName('email', event.target.value))}
            />            
          </FormGroup>
          <FormGroup>
            <FormControl
              value={password}
              onChange={event => this.setState(updateByPropertyName('password', event.target.value))}
              type="password"
              placeholder="Password"
          />
          </FormGroup>
          <Button bsStyle="success" disabled={isInvalid} type="submit">
            Sign In 
            </Button>
        </Form>
        { error && <Alert color="danger">{error.message}</Alert> }
      </div>   
    );
  }
}

export default withRouter(SignInPage);

export {
  SignInForm,
};

  