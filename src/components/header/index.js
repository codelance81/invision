import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  Button,
} from 'react-bootstrap';
import PropTypes from 'prop-types';
import { isEqual } from 'lodash';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as routes from '../../constants/routes';
import '../../assests/stylesheets/header.css';
import { signOutUser } from '../../state/auth/operations';


class Header extends React.Component {
  handleLogout = () => {
    const { actions } = this.props;
    actions.signOutUser();
  }

  renderLogin = (isLoggedIn) => {
    if (isLoggedIn) { return null; }
    return (
      <Nav navbar pullRight>
        <LinkContainer to={routes.SIGN_IN}>
          <NavItem>
            <span>SignIn</span>
          </NavItem>
        </LinkContainer>
        <LinkContainer to={routes.SIGN_UP}>
          <NavItem>
            <span>SignUp</span>
          </NavItem>
        </LinkContainer>
        <LinkContainer to={routes.DASHBOARD}>
          <NavItem>
            <span>Dashboard</span>
          </NavItem>
        </LinkContainer>
      </Nav>
    );
  }

  renderLogout = (isLoggedIn, currentPath) => {
    if (!isLoggedIn) { return null; }
    return (
      <Nav navbar pullRight>
        <LinkContainer to={routes.DASHBOARD}>
          <NavItem className={isEqual(currentPath, '/dashboard') ? 'active' : ''}>
            <span>Dashboard</span>
          </NavItem>
        </LinkContainer>
        <LinkContainer to={routes.WATCH_LIST}>
          <NavItem className={isEqual(currentPath, '/watch-list') ? 'active' : ''}>
            <span>WatchList</span>
          </NavItem>
        </LinkContainer>
        <NavItem>
          <Button onClick={this.handleLogout}>Logout</Button>
        </NavItem>
      </Nav>
    );
  }

  render() {
    const { isLoggedIn, currentPath } = this.props;
    return (
      <div>
        <Navbar color="light" expand="md" fixedTop className="header-custom">
          <Navbar.Header>
            <LinkContainer to={routes.LANDING}>
              <a>
                <NavbarBrand>
                  IN-
                  <strong>
                    Vision
                  </strong>
                </NavbarBrand>
              </a>
            </LinkContainer>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <React.Fragment>
              { this.renderLogin(isLoggedIn) }
              { this.renderLogout(isLoggedIn, currentPath) }
            </React.Fragment>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isLoggedIn: state.auth.isAuthenticated,
  currentPath: state.router.location.pathname,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    signOutUser,
  }, dispatch),
});

Header.propTypes = {
  actions: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  currentPath: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
