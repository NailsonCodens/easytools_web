import React from 'react';
import { Route, useRouteMatch } from 'react-router-dom';

import Ad from './ad';
import Create from './create';

export default function Neighbor({history}) {
  let { path } = useRouteMatch();

  return (
    <>
      <div className=" background-intern">
        <Route path={`${path}/`} exact component={Ad}/>
        <Route path={`${path}/create`} component={Create}/>      
      </div> 
    </>
  )
}