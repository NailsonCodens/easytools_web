import React from 'react';
import { Route, useRouteMatch } from 'react-router-dom';
import Resume from '../../Site/Paymentprocess/Resume';
import Rules from '../../Site/Paymentprocess/Rules';
import Payment from '../../Site/Paymentprocess/Payment/index';
import Paymentfinish from '../../Site/Paymentprocess/Payment/paymentfinish';
import Paymentview from '../Paymentprocess/Payment/paymentme';
const Index = ({history}) => {
  let { path } = useRouteMatch();

  return (
    <div>
      <Route teste={'asdasd'} path={`${path}/resumebook`} exact component={Resume}/>
      <Route path={`${path}/rent-rules`} component={Rules}/>
      <Route path={`${path}/rent-payment`} component={Payment}/>
      <Route path={`${path}/rent-paymentfinish`} component={Paymentfinish}/>
      <Route path={`${path}/payment-view/:id`} component={Paymentview}/>
    </div>
  );
};

export default Index;