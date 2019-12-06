import React from 'react'
import { Link } from 'react-router-dom';

import { Button } from '../../../components/Form/Button';

import './styleLessor.css'

import logo from '../../../assets/images/logo_blue.png'

const MenuLessor = () => {

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
                  class={'button is-info color-logo-lessor'} 
                  text={'Cadastrar Anúncio'}
                />
              </Link>
              <p className="hello-user">
                Olá Usuário!
              </p>
              <Link to={'/lessor'} className="">
                Log in
              </Link>
            </div>
          </div>
        </div> 
      </div>     
    </nav>
	)
}

export default MenuLessor