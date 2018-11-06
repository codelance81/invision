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

 class Header extends React.Component {
  constructor(){
    super();
    this.state={
      isLoggedIn:false
    }
  }
  componentDidMount(){   
    this.authListener();
  }

  handleLogout = () =>{
    auth.signOut();
  }

  authListener = () => {    
    auth.onAuthStateChanged((user) => {
      if(user){
        this.setState({
          isLoggedIn:true
        })
      } else{
        this.setState({
          isLoggedIn:false
        })
      }
    });
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
    const {isLoggedIn} = this.state;
    return (
      <div>
        <Navbar color="light" light expand="md">
          <NavbarBrand>N-Vision</NavbarBrand>
            <Nav className="ml-auto" navbar>
              { this.renderLogin(isLoggedIn) }
              { this.renderLogout(isLoggedIn) }
            </Nav>
        </Navbar>
      </div>
    );
  }
}


export default Header;