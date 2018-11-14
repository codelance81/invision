import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavLink,
  NavItem
 } from 'reactstrap';
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
            <NavLink>SignIn</NavLink>
          </LinkContainer>
        </NavItem>
        <NavItem>
          <LinkContainer to={routes.SIGN_UP}>
            <NavLink>SignUp</NavLink>
          </LinkContainer>
        </NavItem>
        <NavItem>
          <LinkContainer to={routes.DASHBOARD}>
            <NavLink>Dashboard</NavLink>
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
            <NavLink>Dashboard</NavLink>
          </LinkContainer>
        </NavItem>
        <NavItem>
          <NavLink onClick={this.handleLogout}>Logout</NavLink>
        </NavItem>
      </Nav>
    )
  }

  render() {
    return (
      <div>
        <Navbar color="light" light expand="md">
          <NavbarBrand>N-Vision</NavbarBrand>
            <Nav className="ml-auto" navbar>
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