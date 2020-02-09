import React from 'react';
import { Route, useRouteMatch } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

import PrivateRenter from '../../../routes/privaterouteRenter';
import MenuRenter from '../../../components/Menu/MenuRenter/index';
import MenuProcess from '../../../components/Menu/MenuProcess/index';

import Index from '../Index/index';
import Tool from '../../Site/Tool/index';
import Rented from '../../Site/Rented/index';
import Paymentprocess from '../../Site/Paymentprocess/index';

export default function Start({history}) {
  let { path } = useRouteMatch();
	let location = useLocation().pathname;

  return (
    <>
      {
        location.split('/')[2] === 'renter-rules' ? 
        (
          <>
            <MenuProcess/>
          </>
        ) :
        (
          <>
            <MenuRenter/>
          </>
        )
      }

      <Route path={`${path}/`} exact component={Index}/>
      <Route path={`${path}/tool/:id`} component={Tool}/>
      <PrivateRenter path={`${path}/payment`} component={Paymentprocess}/>
      <PrivateRenter path={`${path}/messages`} component={teste => ('asdsd')}/>
      <PrivateRenter path={`${path}/renter`} component={Rented}/>
    </>
  )
}