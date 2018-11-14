import React from 'react';
import {
  BrowserRouter as Router,
  Switch
} from 'react-router-dom';

import LandingPage from '../Landing/index';
import SignUpPage from '../SignUp';
import SignInPage from '../SignIn';
import PasswordForgetPage from '../PasswordForget';
import AdavanceFeatures from '../AdvanceRoute'
import AccountPage from '../Account';
import Dashboard from '../Dashboard';
import * as routes from '../../constants/routes';
import Header from '../Header/Header'
import Footer from '../Footer/Fotter'
import AuthRoutes from '../AuthRoutes';
import './index.css';
import '../../assests/style/style.css';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      symbol: 'SPY'
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
        <div className="app">
          <Header/>
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
      </Router>
    )
  }
}

export default App;

