import React, { useEffect } from 'react';
import { BrowserRouter, Redirect, Switch, Route } from 'react-router-dom';
import Startpoint from '../pages/Startpoint/index';
import Site from '../pages/Site/Start/index';
import SingUp from '../pages/Signup/index';
import PasswordRecover from '../pages/PasswordRecover/index';
import Wrongdata from '../pages/Warnings/Wrongdata';
import StartLessor from '../pages/Lessor/Start/index';
import Footer from '../components/Footer/Footer';

const Routes = () => {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Startpoint}/>            
          <Route path="/signup" component={SingUp}/>
          <Route path="/password-recover" component={PasswordRecover}/>
          <Route path="/s" component={Site}/>
          <Route path="/lessor" component={StartLessor}/>
          <Route path="/ops" component={Wrongdata}/>
          <Route path="*">
            <Redirect to="/"/>
          </Route>
        </Switch>
        <Footer/>
      </BrowserRouter>
    </>
  )
}


export default Routes;

