import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';
import {
  Grid,
  Row,
  Col,
  Panel,
  Modal,
  Button,
  Alert,
} from 'react-bootstrap';
import { signInUser } from '../../state/auth/operations';
import { signInUserAction } from '../../state/auth/actionCreators';
import SignUpLink from '../sign-up/SignUpLink';
import { PasswordForgetLink } from '../password-forget';
import Form from './Form';

class SignInPage extends Component {
  constructor() {
    super();
    this.state = {
      isDiscalimer: false,
      userData: null,
      errorMessage: null,
    };
  }

  handleDiscalimerCancel = () => {
    this.setState({ isDiscalimer: false });
  }

  handleSubmit = (props) => {
    const {
      email,
      password,
    } = props;
    const { actions } = this.props;
    actions.signInUser({ email, password }).then((res) => {
      if (isEmpty(res)) {
        this.setState({
          errorMessage: 'Invalid Id Or Password',
        });
      } else {
        this.setState({ isDiscalimer: true, userData: res });
      }
    });
  }

  handleSignInSubmit = () => {
    const { actions } = this.props;
    const { userData } = this.state;
    actions.signInUserAction(userData);
  }

  render() {
    const { errorMessage } = this.state;
    return (
      <Grid>
        <center>
          { !isEmpty(errorMessage) && <Alert color="danger">{errorMessage}</Alert> }
          <Row>
            <Col sm={4} smOffset={4}>
              <Panel className="panel-success">
                <Panel.Heading>Sign In</Panel.Heading>
                <Panel.Body>
                  <Form onSubmit={this.handleSubmit} />
                </Panel.Body>
                <Panel.Footer>
                  <PasswordForgetLink />
                  <SignUpLink />
                </Panel.Footer>
              </Panel>
            </Col>
          </Row>
          { this.state.isDiscalimer && (
            <div className="static-modal">
              <Modal.Dialog>
                <Modal.Header>
                  <Modal.Title>Disclaimer</Modal.Title>
                </Modal.Header>

                <Modal.Body style={{ 'max-height': 'calc(100vh - 210px)', 'overflow-y': 'auto' }}>
                  <h3>Important Instructions</h3>
                  <span>
                    We are NOT financial advisors. ALL data provided is for educational or
                    entertainment purposes only and should be treated as such. Information
                    provided through Invision does not constitute a recommendation to
                    execute ANY trade.
                  </span>
                </Modal.Body>

                <Modal.Footer>
                  <Button bsStyle="danger" onClick={this.handleDiscalimerCancel}>Cancel</Button>
                  <Button bsStyle="success" onClick={this.handleSignInSubmit}>Ok</Button>
                </Modal.Footer>
              </Modal.Dialog>
            </div>
          )}
        </center>
      </Grid>
    );
  }
}


const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    signInUser,
    signInUserAction,
  }, dispatch),
});


SignInPage.propTypes = {
  actions: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(SignInPage);
