import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem
 } from 'react-bootstrap';
 import * as routes from '../../constants/routes'
 import { auth } from '../../firebase/firebase'
 import AuthUserContext from '../Session/AuthUserContext'

 class Header extends React.Component {

  handleLogout = () =>{
    auth.signOut();
  }

  renderLogin = (isLoggedIn) =>{
    if(isLoggedIn) { return null };
    return (
      <Nav>
        <NavItem>
          <LinkContainer to={routes.SIGN_IN}>
            <span>SignIn</span>
          </LinkContainer>
        </NavItem>
        <NavItem>
          <LinkContainer to={routes.SIGN_UP}>
            <span>SignUp</span>
          </LinkContainer>
        </NavItem>
        <NavItem>
          <LinkContainer to={routes.DASHBOARD}>
            <span>Dashboard</span>
          </LinkContainer>
        </NavItem>
      </Nav>
    )
  }

  renderLogout = (isLoggedIn) =>{
    if(!isLoggedIn) { return null };
    return (
      <Nav>
        <NavItem>
          <LinkContainer to={routes.DASHBOARD}>
            <span>Dashboard</span>
          </LinkContainer>
        </NavItem>
        <NavItem>
          <span onClick={this.handleLogout}>Logout</span>
        </NavItem>
      </Nav>
    )
  }

  render() {
    return (
      <div>
        <Navbar color="light"  expand="md">
          <NavbarBrand>N-Vision</NavbarBrand>
            <Nav className="navbar-right" navbar>
              <AuthUserContext.Consumer>
                {(isLoggedIn) => (
                  <React.Fragment>
                  { this.renderLogin(isLoggedIn) }
                  { this.renderLogout(isLoggedIn) }
                  </React.Fragment> 
                )}
              </AuthUserContext.Consumer>
            </Nav>
        </Navbar>
      </div>
    );
  }
}


export default Header;