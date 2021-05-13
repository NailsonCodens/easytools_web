import React from 'react';
import { Route } from 'react-router-dom';

import MenuRenter from '../../components/Menu/MenuRenter/index';

import Index from '../Site/Index/index';

export default function Start({history}) {
  return (
    <>
      <MenuRenter/>
      <Route path={`/`} component={Index}/>
    </>
  )
}
