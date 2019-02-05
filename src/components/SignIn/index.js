import React from 'react';
import { Grid, Row, Col, Panel } from 'react-bootstrap';
import { SignUpLink } from '../SignUp';
import { PasswordForgetLink } from '../PasswordForget'; 
import SignInForm from './SignInForm';

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

export default SignInPage;


  