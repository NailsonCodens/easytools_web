import React, { useEffect, useState } from 'react';
import { Route, Redirect, useRouteMatch, Link } from 'react-router-dom';
import PrivateRoute from '../../../routes/privaterouteLessor.js';

import api from '../../../services/api';

import MenuLessor from '../../../components/Menu/MenuLessor/index';
import Dashboard from '../Dashboard/index';
import Ad from '../Ad/index';
import Perfil from '../Perfil/index';

import './style.css';

export default function Start({history}) {
  let { path } = useRouteMatch();
  const [check, setCheck] = useState(false);

  useEffect(() => {
    async function loadPerfil() { 
      const response = await api.get(`/perfil`, {
      });

      response.data.user.map(function (perfil) {
        if (perfil.location === "" || perfil.address === "" || perfil.number === "" 
        && perfil.location === "" || perfil.city === "" || perfil.uf === "") {
          setCheck(true)
        } else {
          setCheck(false)
        }
      })
    }
    loadPerfil();
  }, []);

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
                <div className={check === true ? 'warning-first-access is-block' : 'warning-first-access is-hidden'}>
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