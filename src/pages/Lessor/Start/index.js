import React from 'react';
import { Route, Redirect, useLocation, useRouteMatch } from 'react-router-dom';

import MenuLessor from '../../../components/Menu/MenuLessor/index';

import Auth from '../Auth/index';
import Dashboard from '../Dashboard/index';
import Ad from '../Ad/index';

export default function Start({history}) {
  let { path } = useRouteMatch();
  let location = useLocation().pathname;

  return (
    <>
      { location === '/lessor/signin' ? '' : <MenuLessor/>}
      <Route path={`${path}/signin`} exact component={Auth}/>
      <div className=" background-intern">
        <Route path={`${path}/`} exact>
          <Redirect to="lessor/dashboard"/>
        </Route>
        <Route path={`${path}/dashboard`} component={Dashboard}/>
        <Route path={`${path}/ad`} component={Ad}/>        
      </div>
    </>
  )
}