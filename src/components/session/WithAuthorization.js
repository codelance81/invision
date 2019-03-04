import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import AuthUserContext from './AuthUserContext';
import { firebase } from '../../firebase';
import * as routes from '../../constants/routes';

const withAuthorization = condition => (Component) => {
  class WithAuthorization extends React.Component {
    componentDidMount() {
      firebase.auth.onAuthStateChanged((authUser) => {
        if (!condition(authUser)) {
          this.props.history.push(routes.SIGN_IN);
        }
      });
    }

    render() {
      return (
        <AuthUserContext.Consumer>
          { authUser => (authUser ? <Component /> : null) }
        </AuthUserContext.Consumer>
      );
    }
  }

  WithAuthorization.propTypes = {
    history: PropTypes.instanceOf(Object).isRequired,
  };

  return withRouter(WithAuthorization);
};


export default withAuthorization;
