import React from 'react';
import {
  BrowserRouter as Router,
  Switch
} from 'react-router-dom';
import classnames from 'classnames';
import { isEqual, forEach } from 'lodash';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

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
import '../../assests/stylesheets/common.css';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      symbol: 'SPY',
      symbolName: 'SPDR S&P 500',
      allSymbols: [],
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    axios.get('https://api.iextrading.com/1.0/ref-data/symbols')
      .then(res => {
        const data = res.data;				
        let allSymbols = [];
        forEach(data, symbol => {
          allSymbols.push({
            value: symbol.symbol,
            label: symbol.symbol,
            name: symbol.name,
          })
        })
        this.setState({ allSymbols: allSymbols });
      })
      .catch(err => {
        console.log(err);
      });
  }

  handleSubmit(symbol) {
    this.setState({ symbol: symbol.value, symbolName: symbol.name });
  }

  render() {
    const location = window.location.pathname;
    return (
      <Router>
        <div className={classnames({
          'app': true,
          'with-bg': !isEqual(location, '/'),
        })}>
          <Header/>
          <Switch>
            <AuthRoutes exact path={routes.LANDING} component={() => <LandingPage />} />
            <AuthRoutes exact path={routes.DASHBOARD} component={() => <Dashboard {...this.state} handleSubmit={this.handleSubmit} />} />
            <AuthRoutes exact path={routes.SIGN_UP} component={() => <SignUpPage />} />
            <AuthRoutes exact path={routes.SIGN_IN} component={() => <SignInPage />} />
            <AuthRoutes exact path={routes.PASSWORD_FORGET} component={() => <PasswordForgetPage />} />
            <AuthRoutes exact path={routes.ACCOUNT} component={() => <AccountPage />} />
            <AuthRoutes exact path={routes.ADAVANCED_FEATURES} component={() => <AdavanceFeatures {...this.state} handleSubmit={this.handleSubmit} />} />
            <AuthRoutes component={() => <h2>No Page found</h2>} />
          </Switch>
          <Footer/>
        </div>
      </Router>
    )
  }
}

export default App;

