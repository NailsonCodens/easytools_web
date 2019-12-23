import React from 'react';
import { Route, Redirect, useRouteMatch, Link } from 'react-router-dom';

import PrivateRoute from '../../../routes/privaterouteLessor.js';

import MenuLessor from '../../../components/Menu/MenuLessor/index';
import Dashboard from '../Dashboard/index';
import Ad from '../Ad/index';
import Perfil from '../Perfil/index';

import './style.css';

export default function Start({history}) {
  let { path } = useRouteMatch();

  return (
    <>
      <MenuLessor/>
      <div className=" background-intern">
        <div className="container box-wnf">
          {
            history.location.pathname !== '/lessor/perfil'
            ?
            (
              <>
                <div className="warning-first-access">
                  <h5>Um recadinho rápido!</h5>
                  <p>
                    Precisamos saber seu endereço para anunciar seus equipamentos e ferramentas nos lugares adequados. 
                    <Link to={'/lessor/perfil'} className="complete-register">
                    Completar meu perfil
                    </Link>
                  </p>
                </div>
              </>
            )
            :
            ('')

          }

        </div> 
        <Route path={`${path}/`} exact>
          <Redirect to="lessor/dashboard"/>
        </Route>
        <PrivateRoute path={`${path}/dashboard`} component={Dashboard}/>
        <PrivateRoute path={`${path}/ad`} component={Ad}/>
        <PrivateRoute path={`${path}/perfil`} component={Perfil}/>
      </div>
    </>
  )
}