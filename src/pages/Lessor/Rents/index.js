import React from 'react';
import { Route, useRouteMatch } from 'react-router-dom';

import Rents from './rents';
import Detail from './detail';

export default function Neighbor({history}) {
  let { path } = useRouteMatch();

  return (
    <>
      <div className=" background-intern">
        <Route path={`${path}/`} exact component={Rents}/>
        <Route path={`${path}/detail/:id`} component={Detail}/>
      </div> 
    </>
  )
}