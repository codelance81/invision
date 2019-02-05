import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem
 } from 'react-bootstrap';
import * as routes from '../../constants/routes';
import '../../assests/stylesheets/header.css';
import { connect } from 'react-redux';
import { signOutUser } from '../../state/auth/operations';
import { bindActionCreators } from 'redux';


class Header extends React.Component {

  handleLogout = () => {
    const { actions } = this.props;
    actions.signOutUser();
  }

  renderLogin = (isLoggedIn) =>{
    if(isLoggedIn) { return null };
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
    )
  }

  renderLogout = (isLoggedIn) =>{
    if(!isLoggedIn) { return null };
    return (
      <Nav navbar pullRight>
        <LinkContainer to={routes.DASHBOARD}>
          <NavItem>
            <span>Dashboard</span>
          </NavItem>
        </LinkContainer>
        <NavItem>
          <span onClick={this.handleLogout}>Logout</span>
        </NavItem>
      </Nav>
    )
  }

  render() {
    const { isLoggedIn } = this.props;
    return (
      <div>
        <Navbar color="light" expand="md" fixedTop className="header-custom">
          <Navbar.Header>
            <LinkContainer to={routes.LANDING}>
              <a><NavbarBrand>IN-<strong>Vision</strong></NavbarBrand></a>
            </LinkContainer>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>         
            <React.Fragment>
            { this.renderLogin(isLoggedIn) }
            { this.renderLogout(isLoggedIn) }
            </React.Fragment>            
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isLoggedIn: state.auth.isAuthenticated
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    signOutUser,
    }, dispatch),
  });

export default connect(mapStateToProps, mapDispatchToProps)(Header);