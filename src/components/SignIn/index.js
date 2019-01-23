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
                <Modal.Title>Discalimer Popup</Modal.Title>
              </Modal.Header>

              <Modal.Body style={{'max-height': 'calc(100vh - 210px)', 'overflow-y': 'auto'}} >
                <h4>1. YOUR AGREEMENT</h4>
                <span>
                  By using this Site, you agree to be bound by, and to comply with, these Terms and Conditions. If you do not agree to these Terms and Conditions, please do not use this site.
                  PLEASE NOTE: We reserve the right, at our sole discretion, to change, modify or otherwise alter these Terms and Conditions at any time. Unless otherwise indicated, amendments will become effective immediately. Please review these Terms and Conditions periodically. Your continued use of the Site following the posting of changes and/or modifications will constitute your acceptance of the revised Terms and Conditions and the reasonableness of these standards for notice of changes. For your information, this page was last updated as of the date at the top of these terms and conditions.
                </span>
                <h4>2. PRIVACY</h4>
                <span>
                  Please review our Privacy Policy, which also governs your visit to this Site, to understand our practices.
                </span>
                <h4>3. LINKED SITES</h4>
                <span>
                  This Site may contain links to other independent third-party Web sites ("Linked Sites”). These Linked Sites are provided solely as a convenience to our visitors. Such Linked Sites are not under our control, and we are not responsible for and does not endorse the content of such Linked Sites, including any information or materials contained on such Linked Sites. You will need to make your own independent judgment regarding your interaction with these Linked Sites.
                </span>
                <h4>4. FORWARD LOOKING STATEMENTS</h4>
                <span>
                  All materials reproduced on this site speak as of the original date of publication or filing. The fact that a document is available on this site does not mean that the information contained in such document has not been modified or superseded by events or by a subsequent document or filing. We have no duty or policy to update any information or statements contained on this site and, therefore, such information or statements should not be relied upon as being current as of the date you access this site.
                </span>
                <h4>5. DISCLAIMER OF WARRANTIES AND LIMITATION OF LIABILITY</h4>
                <span>
                  THIS SITE MAY CONTAIN INACCURACIES AND TYPOGRAPHICAL ERRORS. WE DOES NOT WARRANT THE ACCURACY OR COMPLETENESS OF THE MATERIALS OR THE RELIABILITY OF ANY ADVICE, OPINION, STATEMENT OR OTHER INFORMATION DISPLAYED OR DISTRIBUTED THROUGH THE SITE. YOU EXPRESSLY UNDERSTAND AND AGREE THAT: (i) YOUR USE OF THE SITE, INCLUDING ANY RELIANCE ON ANY SUCH OPINION, ADVICE, STATEMENT, MEMORANDUM, OR INFORMATION CONTAINED HEREIN, SHALL BE AT YOUR SOLE RISK; (ii) THE SITE IS PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS; (iii) EXCEPT AS EXPRESSLY PROVIDED HEREIN WE DISCLAIM ALL WARRANTIES OF ANY KIND, WHETHER EXPRESS OR IMPLIED, INCLUDING, BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, WORKMANLIKE EFFORT, TITLE AND NON-INFRINGEMENT; (iv) WE MAKE NO WARRANTY WITH RESPECT TO THE RESULTS THAT MAY BE OBTAINED FROM THIS SITE, THE PRODUCTS OR SERVICES ADVERTISED OR OFFERED OR MERCHANTS INVOLVED; (v) ANY MATERIAL DOWNLOADED OR OTHERWISE OBTAINED THROUGH THE USE OF THE SITE IS DONE AT YOUR OWN DISCRETION AND RISK; and (vi) YOU WILL BE SOLELY RESPONSIBLE FOR ANY DAMAGE TO YOUR COMPUTER SYSTEM OR FOR ANY LOSS OF DATA THAT RESULTS FROM THE DOWNLOAD OF ANY SUCH MATERIAL.
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

  