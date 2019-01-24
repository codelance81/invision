import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Button,Grid, Row,Form,Col, FormGroup, FormControl,Alert, Panel, Modal } from 'react-bootstrap';
import { SignUpLink } from '../SignUp';
import { PasswordForgetLink } from '../PasswordForget';
import { auth } from '../../firebase';

const SignInPage = ({ history }) =>
  <Grid>
    <center>
      <Row>
        <Col sm={4} smOffset={4}>
          <Panel className="panel-success">
            <Panel.Heading>Sign In</Panel.Heading>
            <Panel.Body>
              <SignInForm history={history} />
            </Panel.Body>
            <Panel.Footer>
              <PasswordForgetLink />
              <SignUpLink />
            </Panel.Footer>
          </Panel>
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
  isDiscalimer: false
};



class SignInForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = () => {
    this.setState({ isDiscalimer: true });
  }

  handleDiscalimerCancel = () => {
    this.setState({ isDiscalimer: false });
  }

  handleSignInSubmit = (event) => {
    const {
      email,
      password,
    } = this.state;

    auth.doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState(() => ({ ...INITIAL_STATE }));
      })
      .catch(error => {
        this.setState({ isDiscalimer: false });
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
        <hr/>
        <Form>
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
          <Button bsStyle="success" disabled={isInvalid} onClick={this.onSubmit}>
            Sign In 
          </Button>
        </Form>
        { error && <Alert color="danger">{error.message}</Alert> }

        { this.state.isDiscalimer &&     
          <div className="static-modal">
            <Modal.Dialog>
              <Modal.Header>
                <Modal.Title>Invision Condition</Modal.Title>
              </Modal.Header>

              <Modal.Body style={{'max-height': 'calc(100vh - 210px)', 'overflow-y': 'auto'}} >
                <h3>1. YOUR AGREEMENT</h3>
                <span>
                  We are NOT financial advisors. ALL data provided is for educational or entertainment purposes only and should be treated as such. Information provided through Invision does not constitute a recommendation to execute ANY trade.
                </span>
              </Modal.Body>

              <Modal.Footer>
                <Button bsStyle="danger" onClick={this.handleDiscalimerCancel}>Cancel</Button>
                <Button bsStyle="success" onClick={this.handleSignInSubmit}>Ok</Button>
              </Modal.Footer>
            </Modal.Dialog>
          </div>             
        }
      </div>   
    );
  }
}

export default withRouter(SignInPage);

export {
  SignInForm,
};

  