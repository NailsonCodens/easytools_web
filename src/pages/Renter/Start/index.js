import React from 'react';
import { Route, useRouteMatch } from 'react-router-dom';

import MenuRenter from '../../../components/Menu/MenuRenter/index';

import Index from '../Index/index';

export default function Start({history}) {
  let { path } = useRouteMatch();
  return (
    <>
      <MenuRenter/>
      <Route path={`${path}/`} exact component={Index}/>
    </>
  )
}