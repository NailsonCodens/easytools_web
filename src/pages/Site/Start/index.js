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
import Helpme from '../../Site/Helpme/index';
import Newrent from '../Newrent/index';
import Dealopen from '../Polices/dealopen';
import Policeuse from '../Polices/police_use';
import Privacy from '../Polices/privacy_terms';
import Terms from '../Polices/terms';
import Adddocument from '../../Site/Tool/adddocument'
import Products from '../../Site/Index/products';
import List from '../../Site/Index/list';
import Cancelmentrent from '../../Site/Cancelmentrent/index'
import Seo from '../../Site/Seo/index'


export default function Start({history}) {
  let { path } = useRouteMatch();
	let location = useLocation().pathname;

  console.log(path)
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
      <Route path={`${path}/help-me`} component={Helpme}/>
      <Route path={`${path}/cancelmentrent`} component={Cancelmentrent}/>
      <Route path={`${path}/about-us`} component={Newrent}/>
      <Route path={`${path}/tool/:id`} component={Tool}/>
      <Route path={`${path}/equipamentos`} component={Seo}/>
      <Route path={`${path}/equipaments/:category`} component={Products}/>
      <Route path={`${path}/search/:category/:title/:region`} component={List}/>
      <PrivateRenter path={`${path}/payment`} component={Paymentprocess}/>
      <PrivateRenter path={`${path}/messages`} component={teste => ('asdsd')}/>
      <PrivateRenter path={`${path}/renter`} component={Rented}/>
      <Route path={`${path}/terms`} component={Terms}/>
      <Route path={`${path}/dealopen`} component={Dealopen}/>
      <Route path={`${path}/policeuse`} component={Policeuse}/>
      <Route path={`${path}/privacyterms`} component={Privacy}/>
      <PrivateRenter path={`${path}/adddocuments`} component={Adddocument}/>
    </>
  )
}