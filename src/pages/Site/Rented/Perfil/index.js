import React from 'react';

import logo from '../../../../assets/images/logo.png'
import { Hr } from '../../../../components/Hr';

import './style.css';

const Perfil = () => {
  return (
    <div className="container ">
      <div className="columns">
        <div className="column">
          <p className="name-renter-left">Nielson ismael</p>
          <p className="email-renter">nielson@gmail.com.br</p>
          <p>09/01/2020</p>
        </div>
        <div className="column is-3">
          <div className="box-user has-text-centered">
            <img src={logo} alt={logo} className="logo-neighbor"/>
            <Hr/>
            <p className="name-renter">Nielson</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Perfil;