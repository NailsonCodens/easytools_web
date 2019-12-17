import React from 'react';
import { Route, Redirect, useRouteMatch } from 'react-router-dom';
import { useSelector } from "react-redux";

import PrivateRoute from '../../../routes/privaterouteLessor.js';

import MenuLessor from '../../../components/Menu/MenuLessor/index';
import Dashboard from '../Dashboard/index';
import Ad from '../Ad/index';

export default function Start({history}) {
  let { path } = useRouteMatch();
	const current_user = useSelector(state => state.auth);
  console.log(current_user)
  return (
    <>
      <MenuLessor/>
      <div className=" background-intern">
        <Route path={`${path}/`} exact>
          <Redirect to="lessor/dashboard"/>
        </Route>
        <PrivateRoute path={`${path}/dashboard`} exact component={Dashboard}/>
        <PrivateRoute path={`${path}/ad`} component={Ad}/>
      </div>
    </>
  )
}