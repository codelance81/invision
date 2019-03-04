import React from 'react';
import { Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { isEqual } from 'lodash';
import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.min.css';
import LandingPage from '../landing';
// import SignUpPage from '../sign-up/signUpPage';
import SignUpPage from '../sign-up';
// import SignInPage from '../sign-in';
import SignInPage from '../sign-in';
import PasswordForgetPage from '../password-forget';
import AdavanceFeatures from '../advance-route';
import AccountPage from '../Account';
import Dashboard from '../dashboard';
import * as routes from '../../constants/routes';
import Header from '../header';
import Footer from '../footer';
import WatchList from '../watch-list';
import AuthRoutes from '../AuthRoutes';
import './index.css';
import '../../assests/stylesheets/common.css';

const App = ({ pathname }) => (
  <div>
    <div className={classnames({
      app: true,
      'with-bg': !isEqual(pathname, '/'),
    })}
    >
      <Header />
      <Switch>
        <AuthRoutes exact path={routes.LANDING} component={LandingPage} />
        <AuthRoutes exact path={routes.DASHBOARD} component={Dashboard} />
        <AuthRoutes exact path={routes.SIGN_UP} component={SignUpPage} />
        <AuthRoutes exact path={routes.SIGN_IN} component={SignInPage} />
        <AuthRoutes exact path={routes.PASSWORD_FORGET} component={PasswordForgetPage} />
        <AuthRoutes exact path={routes.ACCOUNT} component={AccountPage} />
        <AuthRoutes exact path={routes.ADAVANCED_FEATURES} component={AdavanceFeatures} />
        <AuthRoutes exact path={routes.WATCH_LIST} component={WatchList} />
        <AuthRoutes component={() => <h2>No Page found</h2>} />
      </Switch>
      <Footer />
    </div>
  </div>
);

const mapStateToProps = state => ({
  pathname: state.router.location.pathname,
});


App.propTypes = {
  pathname: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, null)(App);
