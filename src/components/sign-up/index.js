import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Grid,
  Row,
  Col,
  Panel,
  Modal,
  Button,
  Alert,
} from 'react-bootstrap';
import { isEmpty } from 'lodash';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { signInUserAction } from '../../state/auth/actionCreators';
import { signInUser } from '../../state/auth/operations';
import { auth, db } from '../../firebase';
import Form from './Form';

class SignUpPage extends React.Component {
  constructor() {
    super();
    this.state = {
      isDiscalimer: false,
      userData: null,
      dbErrorMessage: null,
    };
  }

  handleSignUpSubmit = () => {
    const { actions } = this.props;
    const { userData } = this.state;
    actions.signInUserAction(userData);
  }

  handleDiscalimerCancel = () => {
    this.setState({ isDiscalimer: false });
  }

  handleSubmit = (props) => {
    const {
      name,
      email,
      password,
    } = props;

    auth.doCreateUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        // Create a user in your own accessible Firebase Database too
        db.doCreateUser(authUser.user.uid, name, email)
          .then(() => {
            const { actions } = this.props;
            actions.signInUser({ email, password }).then((res) => {
              if (isEmpty(res)) {
                this.setState({
                  isDiscalimer: false,
                });
              } else {
                this.setState({ isDiscalimer: true, userData: res });
              }
            });
          });
      })
      .catch((err) => {
        this.setState({ dbErrorMessage: err.message });
      });
  }

  render() {
    const { isDiscalimer, dbErrorMessage } = this.state;
    return (
      <div>
        <Grid>
          { !isEmpty(dbErrorMessage) && <Alert color="danger">{dbErrorMessage}</Alert> }
          <Row>
            <Col sm={4} smOffset={4}>
              <Panel className="panel-success">
                <Panel.Heading>Sign Up</Panel.Heading>
                <Panel.Body>
                  <Form onSubmit={this.handleSubmit} />
                </Panel.Body>
              </Panel>
            </Col>
          </Row>
        </Grid>
        { isDiscalimer && (
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
                  <strong>
                    Your account has been created please click on &apos;OK&apos;for continue.
                  </strong>
                </span>
              </Modal.Body>

              <Modal.Footer>
                <Button bsStyle="danger" onClick={this.handleDiscalimerCancel}>Cancel</Button>
                <Button bsStyle="success" onClick={this.handleSignUpSubmit}>Ok</Button>
              </Modal.Footer>
            </Modal.Dialog>
          </div>
        )}
      </div>
    );
  }
}

SignUpPage.propTypes = {
  actions: PropTypes.func.isRequired,
};


const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    signInUser,
    signInUserAction,
  }, dispatch),
});

export default connect(null, mapDispatchToProps)(withRouter(SignUpPage));
