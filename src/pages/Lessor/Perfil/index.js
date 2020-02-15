import React from 'react';
import { Route, useRouteMatch } from 'react-router-dom';

import perfil from './perfil';
import addDocument from './addDocument';

export default function Index({history}) {
  let { path } = useRouteMatch();

  return (
    <>
      <div className=" background-intern">
        <Route path={`${path}/`} exact component={perfil}/>
        <Route path={`${path}/detail/:id`} component={addDocument}/>
      </div> 
    </>
  )
}
