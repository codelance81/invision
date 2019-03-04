import React from 'react';
import PropTypes, { node } from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { includes } from 'lodash';
import { connect } from 'react-redux';
import * as routes from '../constants/routes';


const AuthRoutes = ({ path, component, isLoggedIn }) => {
  if (isLoggedIn && includes([routes.SIGN_IN, routes.SIGN_UP], path)) {
    return <Redirect to={routes.DASHBOARD} />;
  }
  if (!isLoggedIn && includes([routes.ADAVANCED_FEATURES, routes.WATCH_LIST], path)) {
    return <Redirect to={routes.SIGN_IN} />;
  }
  return <Route path={path} component={component} />;
};


const mapStateToProps = state => ({
  isLoggedIn: state.auth.isAuthenticated,
});

AuthRoutes.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  path: PropTypes.string.isRequired,
  component: PropTypes.instanceOf(node).isRequired,
};


export default connect(mapStateToProps, null)(AuthRoutes);
