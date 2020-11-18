import React from 'react';
import { Route, useRouteMatch } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
/*eslint-disable no-unused-vars*/
import PrivateRenter from '../../../routes/privaterouteRenter';
import MenuRenter from '../../../components/Menu/MenuRenter/index';
import MenuProcess from '../../../components/Menu/MenuProcess/index';
import Extratora from './Products/Extratora/index';
import Furadeira from './Products/Furadeira/index';
import Rocadeira from './Products/Rocadeira/index';
import Lavadora from './Products/Lavadora/index';
import Orbital from './Products/Orbital/index';
import Esmerilhadeira from './Products/Esmerilhadeira/index';
import Martelete from './Products/Martelete/index';
import Ticotico from './Products/Ticotico/index';
import Marmore from './Products/Marmore/index';
import Plaina from './Products/Plaina/index';
import Aspirador from './Products/Aspirador/index';
/*eslint-disable no-unused-vars*/
export default function Start({history}) {
  let { path } = useRouteMatch();
	let location = useLocation().pathname;

  return (
    <>
      {
        /*
          <Route path={`${path}/`} exact component={Index}/>
        */
      }
     <Route path={`${path}/extratora-de-sujeira-para-estofados`} component={Extratora}/>
     <Route path={`${path}/lixadeira-orbital`} component={Orbital}/>
     <Route path={`${path}/esmerilhadeira`} component={Esmerilhadeira}/>
     <Route path={`${path}/lavadora-de-alta-pressao`} component={Lavadora}/>
     <Route path={`${path}/roçadeira`} component={Rocadeira}/>
     <Route path={`${path}/martelete`} component={Martelete}/>
     <Route path={`${path}/furadeira`} component={Furadeira}/>
     <Route path={`${path}/serra-tico-tico`} component={Ticotico}/>
     <Route path={`${path}/serra-marmore`} component={Marmore}/>
     <Route path={`${path}/plaina`} component={Plaina}/>
     <Route path={`${path}/aspirador-de-po`} component={Aspirador}/>
    </>
  )
}