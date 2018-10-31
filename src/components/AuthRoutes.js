import React from 'react'
import {Route, Redirect} from 'react-router-dom'
import { includes } from 'lodash'
import * as Routes from '../constants/routes'
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
    if(isLoggedIn && includes(['/signin','signup'], path)){
      return <Redirect to={Routes.DASHBOARD}/>
    }
    else if (!isLoggedIn && includes(['/vip'], path)){
      return <Redirect to={Routes.DASHBOARD}/>
    }
    return <Route path={path} component={component}/>
  }
}

export default AuthRoutes

