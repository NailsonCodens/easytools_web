import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../../assets/images/logo.png'
import './styleProcess.css'

const index = () => {
  return (
		<div className="back-nav">
			<nav className="navbar navbar-process">
        <div className="navbar-brand">
          <Link to={'/'}>
            <img src={logo} alt="EasyTools Logo" className="logo"/>
          </Link>
        </div>
				<div className="navbar-menu">
        </div>
      </nav>
    </div>
  );
};

export default index;