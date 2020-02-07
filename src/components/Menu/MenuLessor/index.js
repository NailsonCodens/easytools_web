import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Dropdown from '../Dropdown';
import Dropdownpure from '../Dropdownpure';
import Notification from '../../../components/Notification/index';
import { Button } from '../../../components/Form/Button';
import socketio from '../../../services/socketio';
import Notifier from "react-desktop-notification"
import { useSelector } from "react-redux";
import api from '../../../services/api';

import './styleLessor.css'

import logo from '../../../assets/images/logo_blue.png'

const MenuLessor = () => {
  const current_user = useSelector(state => state.auth);
  const [notification, setNotfication] = useState([]);

  socketio.emit('register', current_user.id);

	useEffect(() => {
		socketio.on('notify',function(data){
			var user = data.user;
			var message = data.message;
			var title = data.title;
      Notifier.start(`${title}`, `${message}`,"www.google.com","validated image url");
      getNotification()
    });

    async function getNotification () {
      const response = await api.get(`/notifications`, {
      });
      setNotfication(response.data.notification)

      renderNotify()
    }
    getNotification()
    
		return () => {

		};
	}, [])

  const renderNotify = () => {
    return (
      <Notification nt={notification}/>
    )
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
          <Link to={'/lessor/messages'} className="navbar-item">
            Mensagens
          </Link>
          <Dropdownpure text="Notificações" classCuston=" notification" classMenu="classMenu">
            { renderNotify() }
          </Dropdownpure>
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
              <Dropdown classCuston=" menu-from-lessor menus">
                <li className="li-drop">
                  <Link to={'/lessor/perfil'} className="navbar-item">
                    Perfil
                  </Link>
                </li>
                <li className="li-drop">
                  <Link to={'/'} className="navbar-item">
                    Conta
                  </Link>
                </li>
                <li className="li-drop">
                  <Link to={'/'} className="navbar-item">
                    Como ser um bom vizinho?
                  </Link>
                </li>
              </Dropdown>
            </div>
          </div>
        </div> 
      </div>     
    </nav>
	)
}

export default MenuLessor