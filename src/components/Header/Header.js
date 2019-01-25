import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem
 } from 'react-bootstrap';
import * as routes from '../../constants/routes';
import { auth } from '../../firebase/firebase';
import AuthUserContext from '../Session/AuthUserContext';

import '../../assests/stylesheets/header.css';

 class Header extends React.Component {

  handleLogout = () =>{
    auth.signOut();
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
            <AuthUserContext.Consumer>
              {(isLoggedIn) => (
                <React.Fragment>
                { this.renderLogin(isLoggedIn) }
                { this.renderLogout(isLoggedIn) }
                </React.Fragment> 
              )}
            </AuthUserContext.Consumer>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}


export default Header;