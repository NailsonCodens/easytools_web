import React from 'react';
import { Route, useRouteMatch } from 'react-router-dom';

import PrivateRenter from '../../../routes/privaterouteRenter';

import Perfil from './Perfil/index';

export default function Start({history}) {
  let { path } = useRouteMatch();

  return (
    <>
      <Route path={`${path}/`} exact component={teste => ('renter index')}/>
      <PrivateRenter path={`${path}/perfil`} component={Perfil}/>
    </>
  )
}