import React from 'react';
import { Button,Grid, Row,Form,Col, FormGroup, FormControl,Alert, Panel, Modal } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { signInUser } from '../../state/auth/operations';

class SignInForm extends React.Component {
  constructor() {
    super();

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = () => {
    this.setState({ isDiscalimer: true });
  }

  handleDiscalimerCancel = () => {
    this.setState({ isDiscalimer: false });
  }

  handleSignInSubmit = (event) => {
    event.preventDefault();
    const {
      email,
      password,
    } = this.state;
    const { actions } = this.props;
    actions.signInUser({email, password});
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
                <Modal.Title>Disclaimer</Modal.Title>
              </Modal.Header>

              <Modal.Body style={{'max-height': 'calc(100vh - 210px)', 'overflow-y': 'auto'}} >
                <h3>Important Instructions</h3>
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
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    signInUser,
  }, dispatch),
});

const updateByPropertyName = (propertyName, value) => () => ({
  [propertyName]: value,
});

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
  isDiscalimer: false
};

export default connect(null, mapDispatchToProps)(SignInForm)