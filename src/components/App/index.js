import React, {Fragment, Component} from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

import AuthRoutes from '../AuthRoutes'

import Navigation from '../Navigation';
import LandingPage from '../Landing/index';
import SignUpPage from '../SignUp';
import SignInPage from '../SignIn';
import PasswordForgetPage from '../PasswordForget';
import AdavanceFeatures from '../AdvanceRoute'
import HomePage from '../Home';
import AccountPage from '../Account';
import Dashboard from '../Dashboard';
import StockSearch from '../Shared/StockSearch';
import withAuthentication from '../Session/withAuthentication';
import * as routes from '../../constants/routes';
import Header from '../Header/Header'
import Footer from '../Footer/Fotter'
import './index.css';
import '../../assests/style/style.css';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      symbol: 'SPY',
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(symbol) {
    this.setState({ symbol: symbol });
  }

  render() {
    const { symbol } = this.state;
    return (
      <Router>
        <Fragment>
          <div className="app">
            <Header/>
            {/* <Navigation className='appHeader' /> */}
          
            <Switch>
              
              <AuthRoutes exact path={routes.LANDING} component={() => <LandingPage />} />
              <AuthRoutes exact path={routes.DASHBOARD} component={() => <Dashboard symbol={symbol} handleSubmit={this.handleSubmit} />} />
              <AuthRoutes exact path={routes.SIGN_UP} component={() => <SignUpPage />} />
              <AuthRoutes exact path={routes.SIGN_IN} component={() => <SignInPage />} />
              <AuthRoutes exact path={routes.PASSWORD_FORGET} component={() => <PasswordForgetPage />} />
              <AuthRoutes exact path={routes.ACCOUNT} component={() => <AccountPage />} />
              <AuthRoutes exact path={routes.ADAVANCED_FEATURES} component={() => <AdavanceFeatures symbol={symbol} handleSubmit={this.handleSubmit} />} />
              <AuthRoutes component={() => <h2>No Page found</h2>} />
            
            </Switch>

            <Footer/>
          </div>
        </Fragment>
      </Router>
    )
  }
}

  {/* <Route exact path={routes.LANDING} component={() => <LandingPage />} /> 
  <Route exact path={routes.SIGN_UP} component={() => <SignUpPage />} />
  <Route exact path={routes.SIGN_IN} component={() => <SignInPage />} />
  <Route exact path={routes.PASSWORD_FORGET} component={() => <PasswordForgetPage />} />
  <Route exact path={routes.HOME} component={() => <HomePage />} />
  <Route exact path={routes.ACCOUNT} component={() => <AccountPage />} />
  <Route exact path={routes.DASHBOARD} component={() => <LandingPage />} /> */}
export default withAuthentication(App);

