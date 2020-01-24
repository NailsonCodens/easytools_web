import React from 'react';
import { Route, useRouteMatch } from 'react-router-dom';
import './style.css';
import showPerfil from './perfil';
import editPerfil from './edit';

const Perfil = ({history}) => {
  let { path } = useRouteMatch();


  return (
    <div>
      <Route path={`${path}/`} exact component={showPerfil}/>
      <Route path={`${path}/edit/:id`} component={editPerfil}/>
    </div>
  );
};

export default Perfil;