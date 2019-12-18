import React from 'react';
import { Redirect, Route } from 'react-router-dom';

import { isAuthenticated, getLoggedLessor } from "../services/auth";

const PrivateRoute = ({ component: Component, currentuser, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated() && getLoggedLessor() === 'Renter' ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: "/", state: { from: props.location } }} />
      )
    }
  />
);

export default PrivateRoute;