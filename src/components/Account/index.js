import React from 'react';

import AuthUserContext from '../session/AuthUserContext';
import { PasswordForgetForm } from '../password-forget';
import PasswordChangeForm from '../password-change';
import withAuthorization from '../session/WithAuthorization';

const AccountPage = () => (
  <AuthUserContext.Consumer>
    {authUser => (
      <div>
        <h1>
          Account:
          {authUser.email}
        </h1>
        <PasswordForgetForm />
        <PasswordChangeForm />
      </div>
    )}
  </AuthUserContext.Consumer>
);

const authCondition = ({ authUser }) => !!authUser;

export default withAuthorization(authCondition)(AccountPage);
