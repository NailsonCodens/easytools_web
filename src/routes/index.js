import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import StartRenter from '../pages/Renter/Start';
import SingUp from '../pages/Signup/index';

import StartLessor from '../pages/Lessor/Start/index';

import Footer from '../components/Footer/Footer';

import PrivateRoute from './privaterouteLessor.js';

const Routes = () => (
  <>
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={StartRenter}/>
        <Route path="/signup" component={SingUp}/>
        <PrivateRoute path="/tools" component={() => <h1>tools</h1>}/>
        <Route path="/lessor" component={StartLessor}/>
      </Switch>
      <Footer/>
    </BrowserRouter>
  </>
);

export default Routes;

