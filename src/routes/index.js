import React from 'react';
import { BrowserRouter, Redirect, Switch, Route } from 'react-router-dom';

import StartRenter from '../pages/Renter/Start';
import SingUp from '../pages/Signup/index';

import StartLessor from '../pages/Lessor/Start/index';
import Footer from '../components/Footer/Footer';
import Auth from '../pages/Auth/index';

const Routes = () => {

  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={StartRenter}/>
          <Route path="/signup" component={SingUp}/> 
          <Route path="/lessor/signin" component={Auth}/>
          <Route path="/lessor" component={StartLessor}/>
          <Route path="*">
            <Redirect to="/" />
          </Route>
        </Switch>
        <Footer/>
      </BrowserRouter>
    </>
  )
}


export default Routes;

