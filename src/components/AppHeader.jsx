import React from 'react';
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem
 } from 'reactstrap';
 import { NavLink} from 'react-router-dom';
 import * as routes from '../constants/routes'
 import { auth } from '../firebase/firebase'

 class AppHeader extends React.Component {
  constructor(){
    super();
    this.state={
      isLoggedIn:false
    }
  }
  componentDidMount(){   
    this.authListener();
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
          <NavLink to={routes.SIGN_IN}>SignIn</NavLink>
        </NavItem>
        <NavItem>
          <NavLink to={routes.SIGN_UP}>SignUp</NavLink>
        </NavItem>
        <NavItem>
          <NavLink to={routes.DASHBOARD}>Dashboard</NavLink>
        </NavItem>
      </Nav>
    )
  }

  renderLogout = (isLoggedIn) =>{
    if(!isLoggedIn) { return null };
    return (
      <Nav >
        <NavItem >
          <NavLink to={routes.DASHBOARD}>Dashboard</NavLink>
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


export default AppHeader;