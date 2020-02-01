import React from 'react';
import { Route, useRouteMatch } from 'react-router-dom';
import Resume from '../../Site/Paymentprocess/Resume';
import Rules from '../../Site/Paymentprocess/Rules';
const Account = ({history}) => {
  let { path } = useRouteMatch();

  return (
    <div>
      <Route teste={'asdasd'} path={`${path}/resumebook`} exact component={Resume}/>
      <Route path={`${path}/rent-rules`} component={Rules}/>
    </div>
  );
};

export default Account;