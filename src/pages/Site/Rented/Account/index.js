import React from 'react';
import { Route, useRouteMatch } from 'react-router-dom';
import showAccount from './account';

const Account = ({history}) => {
  let { path } = useRouteMatch();


  return (
    <div>
      <Route path={`${path}/`} exact component={showAccount}/>
    </div>
  );
};

export default Account;