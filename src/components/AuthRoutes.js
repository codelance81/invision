import React from 'react'
import {Route, Redirect} from 'react-router-dom'
import { includes } from 'lodash'
import * as routes from '../constants/routes'
import { connect } from 'react-redux';

const AuthRoutes = ({ path, component, isLoggedIn }) => {
  if(isLoggedIn && includes([routes.SIGN_IN,routes.SIGN_UP], path)){
    return <Redirect to={routes.DASHBOARD}/>
  }
  else if (!isLoggedIn && includes([routes.ADAVANCED_FEATURES], path)){
    return <Redirect to={routes.SIGN_IN}/>
  }
  return <Route path={path} component={component}/>
}


const mapStateToProps = (state) => ({
  isLoggedIn: state.auth.isAuthenticated
});


export default connect(mapStateToProps, null)(AuthRoutes);

