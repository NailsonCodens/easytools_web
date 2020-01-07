import React from 'react';
import { Route, useRouteMatch } from 'react-router-dom';

import PrivateRenter from '../../../routes/privaterouteRenter';
import MenuRenter from '../../../components/Menu/MenuRenter/index';

import Index from '../Index/index';
import Tool from '../../Site/Tool/index';

export default function Start({history}) {
  let { path } = useRouteMatch();
  return (
    <>
      <MenuRenter/>
      <Route path={`${path}/`} exact component={Index}/>
      <Route path={`${path}/tool/:id`} component={Tool}/>

      <PrivateRenter path={`${path}/messages`} component={teste => ('asdsd')}/>
      <PrivateRenter path={`${path}/rented`} component={teste => ('asdsd')}/>
    </>
  )
}