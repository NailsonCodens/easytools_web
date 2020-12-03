import React from 'react';
import { Route, useRouteMatch } from 'react-router-dom';

import Ad from './ad';
import Create from './create';
import Edit from './edit';
import Detail from './detail';
import Adons from './adons';

export default function Neighbor({history}) {
  let { path } = useRouteMatch();

  return (
    <>
      <div className=" background-intern">
        <Route path={`${path}/`} exact component={Ad}/>
        <Route path={`${path}/create`} component={Create}/>
        <Route path={`${path}/edit/:id`} component={Edit}/>
        <Route path={`${path}/detail/:id`} component={Detail}/>
        <Route path={`${path}/adons`} component={Adons}/>
      </div> 
    </>
  )
}