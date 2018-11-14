import React from 'react'
import {Route, Redirect} from 'react-router-dom'
import { includes } from 'lodash'
import * as routes from '../constants/routes'
import AuthUserContext from '../components/Session/AuthUserContext'

const AuthRoutes = ({ path, component }) => (
  <AuthUserContext.Consumer>
    {
      (isLoggedIn) => {
        if(isLoggedIn && includes([routes.SIGN_IN,routes.SIGN_UP], path)){
          return <Redirect to={routes.DASHBOARD}/>
        }
        else if (!isLoggedIn && includes([routes.ADAVANCED_FEATURES], path)){
          return <Redirect to={routes.SIGN_IN}/>
        }
        return <Route path={path} component={component}/>
      }
    }
  </AuthUserContext.Consumer>
)

export default AuthRoutes

