import React from 'react';
import { Route, useRouteMatch } from 'react-router-dom';

import PrivateRenter from '../../../routes/privaterouteRenter';

import Perfil from './Perfil/index';
import Account from './Account/index';
import Notification from '../../Notifications/index';
import Options from './Options/index';

export default function Start({history}) {
  let { path } = useRouteMatch();

  return (
    <>
      <Route path={`${path}/`} exact component={teste => ('renter index')}/>
      <PrivateRenter path={`${path}/perfil`} component={Perfil}/>
      <PrivateRenter path={`${path}/account`} component={Account}/>
      <PrivateRenter path={`${path}/notifications`} component={Notification}/>
      <PrivateRenter path={`${path}/user-option`} component={Options}/>
    </>
  )
}