import React, {Fragment} from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

import AuthRoutes from '../AuthRoutes'

import Navigation from '../Navigation';
import LandingPage from '../Landing';
import SignUpPage from '../SignUp';
import SignInPage from '../SignIn';
import PasswordForgetPage from '../PasswordForget';
import HomePage from '../Home';
import AccountPage from '../Account';
import Dashboard from '../Dashboard';
import withAuthentication from '../Session/withAuthentication';
import * as routes from '../../constants/routes';
import AppHeader from '../../components/AppHeader'
import './index.css';
import '../../assests/style/style.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () =>
    <Router>
      <Fragment>
    
      <div className="app">
        <AppHeader/>
      {/* <Navigation className='appHeader' /> */}
      
      <Switch>
        
        <AuthRoutes exact path={routes.LANDING} component={() => <LandingPage />} />
        <AuthRoutes exact path={routes.DASHBOARD} component={() => <Dashboard />} />
        <AuthRoutes exact path={routes.SIGN_UP} component={() => <SignUpPage />} />
        <AuthRoutes exact path={routes.SIGN_IN} component={() => <SignInPage />} />
        <AuthRoutes component={() => <h2>No Page found</h2>} />
      
      </Switch>
        
      </div>
      </Fragment>
    </Router>
  

  {/* <Route exact path={routes.LANDING} component={() => <LandingPage />} /> 
  <Route exact path={routes.SIGN_UP} component={() => <SignUpPage />} />
  <Route exact path={routes.SIGN_IN} component={() => <SignInPage />} />
  <Route exact path={routes.PASSWORD_FORGET} component={() => <PasswordForgetPage />} />
  <Route exact path={routes.HOME} component={() => <HomePage />} />
  <Route exact path={routes.ACCOUNT} component={() => <AccountPage />} />
  <Route exact path={routes.DASHBOARD} component={() => <LandingPage />} /> */}
export default withAuthentication(App);

