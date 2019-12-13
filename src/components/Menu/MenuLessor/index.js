import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom';
import { useSelector } from "react-redux";

import { logout } from '../../../services/auth';

import { Button } from '../../../components/Form/Button';

import './styleLessor.css'

import logo from '../../../assets/images/logo_blue.png'

import { Ul } from '../../../components/List/index';
import { Hr } from '../../../components/Hr';

const MenuLessor = () => { 
  let history = useHistory();
  const current_user = useSelector(state => state.auth);

  const [active, setActiveMenu] = useState('');

  const Dropdown = () => {
    if (active === 'is-active') {
      setActiveMenu('')
    } else {
      setActiveMenu('is-active')
    }
  }

  const Logout = () => {
    logout()
    history.push("/lessor/signin");
  }

  return ( 
		<nav className="navbar">
      <div className="navbar-brand">
        <Link to={'/lessor/dashboard'} className="navbar-item">
          <img src={logo} alt="EasyTools Logo" className=""/>
        </Link>
        <span role="button" href="a" className="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </span>
      </div>

      <div className="navbar-menu">
        <div className="navbar-start">
          <Link to={'/lessor'} className="navbar-item">
            Início
          </Link>
          <Link to={'/lessor/ad'} className="navbar-item">
            Anúncios
          </Link>
          <Link to={'/lessor'} className="navbar-item">
            Aluguéis
          </Link>
          <Link to={'/lessor'} className="navbar-item">
            Progresso
          </Link>
          <Link to={'/lessor'} className="navbar-item">
            Mensagens
          </Link>
          <Link to={'/lessor'} className="navbar-item">
            Notificações
          </Link>
        </div>
        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons">
              <Link to={'/lessor/ad/create'} className="is-info create-ad">
                <Button
                  type={'submit'}
                  className={'button is-info color-logo-lessor'} 
                  text={'Cadastrar Anúncio'}
                />
              </Link>
              <div className={'dropdown is-right ' + active}>
                <div className="dropdown-trigger btn-user">
                  <span aria-haspopup="true" aria-controls="dropdown-menu6" onClick={Dropdown}>
                    <span className="user-dropdown">
                      { current_user.map(user => (user.name)) }
                    </span>
                    <span className="icon is-small">
                      <i className="fas fa-angle-down" aria-hidden="true"></i>
                    </span>
                  </span>
                </div>
                <div className="dropdown-menu dropdown-user" id="dropdown-menu6" role="menu">
                  <div className="dropdown-content">
                    <div className="dropdown-item">
                      <Ul>
                        <li className="li-drop">Perfil</li>
                        <Hr/>
                        <li className="li-drop" onClick={Logout}><span>Sair</span></li>
                      </Ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div> 
      </div>     
    </nav>
	)
}

export default MenuLessor