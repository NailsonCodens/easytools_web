import React from 'react';
import { Route, useLocation, useRouteMatch } from 'react-router-dom';

import MenuLessor from '../../../components/Menu/MenuLessor/index';

import Auth from '../Auth/index';
import Dashboard from '../Dashboard/index';


export default function Start({history}) {
  let { path } = useRouteMatch();
  let location = useLocation().pathname;

  return (
    <>
      { location === '/lessor/signin' ? '' : <MenuLessor/>}
      <Route path={`${path}/`} exact component={() => <h1>Pai</h1>}/>
      <Route path={`${path}/signin`} exact component={Auth}/>
      <Route path={`${path}/dashboard`} component={Dashboard}/>
      <Route path={`${path}/ad`} component={() => <h1>Adwords</h1>}/>
    </>
  )
}