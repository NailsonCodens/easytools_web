import React, { useEffect, useState } from 'react';
import { Route, useRouteMatch } from 'react-router-dom';
import Adonsinit from '../Ad/adons/index';
import Adonscreate from '../Ad/adons/create';

export default function Adons({history}) {
  let { path } = useRouteMatch();
  return (
    <>
      <div className=" background-intern">
      <Route path={`${path}/`} exact component={Adonsinit}/>
        <Route path={`${path}/create`} component={Adonscreate}/>
        <Route path={`${path}/edit/:id`} component={teste => (<>ads</>)}/>
      </div> 
    </>
  )
}