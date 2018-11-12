import React from 'react'
import {Route, Redirect} from 'react-router-dom'
import { includes } from 'lodash'
import * as routes from '../constants/routes'
import {auth} from '../firebase/firebase'

class AuthRoutes extends React.Component{
  constructor(){
    super();
    this.state={
      isLoggedIn:false
    }
  }
  componentDidMount(){   
    this.authListener();
  }

  authListener(){    
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

 

  render(){
    const {isLoggedIn} = this.state  
    const {path, component} = this.props;
    const allRoutes = routes;
    if(isLoggedIn && includes([allRoutes.SIGN_IN,allRoutes.SIGN_UP], path)){
      return <Redirect to={allRoutes.DASHBOARD}/>
    }
    // else if (!isLoggedIn && includes([allRoutes.ADAVANCED_FEATURES], path)){
    //   return <Redirect to={allRoutes.SIGN_IN}/>
    // }
    return <Route path={path} component={component}/>
  }
}

export default AuthRoutes

