import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import classnames from 'classnames';
import { isEqual } from 'lodash';
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
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setCurrentSymbol, setAllSymbol  } from '../../state/currentSymbol/operations';

class App extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const { actions } = this.props;
    actions.setAllSymbol();
  }

  handleSubmit(symbol) {
    const { actions } = this.props;
    actions.setCurrentSymbol(symbol);
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
            <AuthRoutes exact path={routes.DASHBOARD} component={() => <Dashboard handleSubmit={this.handleSubmit} />} />
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

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    setCurrentSymbol,
    setAllSymbol
  }, dispatch),
});

export default connect(null, mapDispatchToProps)(App);

