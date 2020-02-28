import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom';
import Dropdown from '../Dropdown';
import Dropdownpure from '../Dropdownpure';
import Notification from '../../../components/Notification/index';
import { Button } from '../../../components/Form/Button';
import socketio from '../../../services/socketio';
import Notifier from "react-desktop-notification"
import { useDispatch, useSelector } from "react-redux";
import api from '../../../services/api';
import { Notification as Notificationrd } from '../../../store/actions/notification';
import Scrool from '../../../utils/scroll';

import {
  isMobile
} from "react-device-detect";
import './styleLessor.css'

import logo from '../../../assets/images/logo_blue.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faSearch, faPlus, faBars, faTags, faHandshake, faChartLine } from '@fortawesome/free-solid-svg-icons'
library.add(faSearch, faPlus, faBars, faTags, faHandshake, faChartLine);

const MenuLessor = () => {
	let history = useHistory();
  const dispatch = useDispatch();
  const current_user = useSelector(state => state.auth);
  const [notification, setNotfication] = useState([]);
  const [countn, setCount] = useState(0);
  const notificationrd = useSelector(state => state.notification);
	const [menu, setMenu] = useState(false);
	const [menustart, setMenustart] = useState(false);

  socketio.emit('register', current_user.id);

	useEffect(() => {
		socketio.on('notify',function(data){
			var user = data.user;
			var message = data.message;
			var title = data.title;
      Notifier.start(`${title}`, `${message}`,"www.google.com","validated image url");
      getNotification()
    });

		async function verifyDevice () {
			if (isMobile) {
				setMenu(true)
			}
		}
		verifyDevice()

    async function getCountnotification () {
      const response = await api.get(`/notifications/count`, {
      });
      dispatch(Notificationrd(response.data.notification))
      setCount(response.data.notification)
    }
    getCountnotification()

    async function getNotification () {
      const response = await api.get(`/notifications`, {
      });
      setNotfication(response.data.notification)
      getCountnotification()
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
        {
          isMobile === true ? 
          (
            <div className="icon-lessor-menu" onClick={event => setMenustart(!menustart)}>
              <FontAwesomeIcon icon={['fas', 'bars']} className="menu-icons menuhan" size="1x"/>
            </div>
          )
          :
          ('')
        }
        <span 
						role="button" 
						href="a" 
						className="navbar-burger burger" 
						aria-label="menu" 
						aria-expanded="false" 
						data-target="navbarBasicExample"
						onClick={event => setMenu(!menu)}
					>
						<span aria-hidden="true"></span>
						<span aria-hidden="true"></span>
						<span aria-hidden="true"></span>
					</span>
				</div>
        { console.log(menustart) }
      <div className={menu === true ? "navbar-menu is-active" : "navbar-menu"}>
        <div className={ menustart === true ? "navbar-start-cs": "navbar-start"}>
          {
            isMobile ? 
            (
              <>
                <Link to={'/lessor'} className="navbar-item">
                  <div className="box-icons-mobile">
                    <FontAwesomeIcon icon={['fas', 'plus']} className={history.location.pathname === '/lessor/dashboard' ? "menu-icons menu-icons-lessor" : "menu-icons"} size="1x"/>
                    <div className="text-box">
                      Início
                    </div>
                  </div>
                </Link>
                <Link to={'/lessor/ad'} className="navbar-item">
                    <div className="box-icons-mobile">
                      <FontAwesomeIcon icon={['fas', 'tags']} className={history.location.pathname === '/lessor/ad' ? "menu-icons menu-icons-lessor" : "menu-icons"} size="1x"/>
                      <div className="text-box">
                        Anúncios
                      </div>
                    </div>
                </Link>
                <Link to={'/lessor/rents'} className="navbar-item">

                  <div className="box-icons-mobile">
                    <FontAwesomeIcon icon={['fas', 'handshake']} className={history.location.pathname === '/lessor/rents' ? "menu-icons menu-icons-lessor" : "menu-icons"} size="1x"/>
                    <div className="text-box">
                      Aluguéis
                    </div>
                  </div>
                  </Link>
                <Link to={'/lessor'} className="navbar-item">
                  <div className="box-icons-mobile">
                    <FontAwesomeIcon icon={['fas', 'chart-line']} className="menu-icons" size="1x"/>
                    <div className="text-box">
                      Progresso
                    </div>
                  </div>
                </Link>
              </>
            )
            :
            (
              <>
                <Link to={'/lessor'} className="navbar-item">
                  Início
                </Link>
                <Link to={'/lessor/ad'} className="navbar-item">
                  Anúncios
                </Link>
                <Link to={'/lessor/rents'} className="navbar-item">
                  Aluguéis
                </Link>
                <Link to={'/lessor'} className="navbar-item">
                  Progresso
                </Link>
              </>
            )
          }
          {
            /*
            <Link to={'/lessor/messages'} className="navbar-item">
              Mensagens
            </Link>*/
          }
          {
            isMobile ? 
            ('')
            :
            (
              <div onClick={event => Scrool() } className="navbar-item">
                <div className="box-icons-mobile">
                  <Dropdownpure text="Notificações" countn={notificationrd} classMenu="classNotless" classCuston=" notification">
                    { renderNotify() }
                  </Dropdownpure>
                </div>
              </div>                
            )
          }
        </div>
        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons">
              {
                isMobile ? 
                (
                  <>
                    <Link to={'/lessor/ad/create'} className="navbar-item">
                      <div className="box-icons-mobile">
                        <FontAwesomeIcon icon={['fas', 'plus']} className={history.location.pathname === '/lessor/ad/create' ? "menu-icons menu-icons-lessor" : "menu-icons"} size="1x"/>
                        <div className="text-box">
                          Anúncio
                        </div>  
                      </div>
                    </Link>
                  </>
                )
                :
                (
                  <>
                    <Link to={'/lessor/ad/create'} className="is-info create-ad">
                      <Button
                        type={'submit'}
                        className={'button is-info color-logo-lessor'} 
                        text={'Cadastrar Anúncio'}
                      />
                    </Link>
                  </>
                )
              }
              <div onClick={event => Scrool() } className="navbar-item">
                {
                  isMobile ? 
                  (
                    <div className="box-icons-mobile box-icons-mobile-cs ">
                      <Dropdownpure text="Notificações" countn={notificationrd} classMenu="classNotless" classCuston=" notification">
                        { renderNotify() }
                      </Dropdownpure>
                    </div>  
                  )
                  :
                  ('')
                }
              </div>
              <div className="box-icons-mobile box-icons-mobile-cs box-icons-mobile-cs-user">
								<Dropdown classCuston=" menu-from-renter menus">
                  <li className="li-drop">
                    <Link to={'/lessor/perfil'} className="navbar-item">
                      Perfil
                    </Link>
                  </li>
                  <li className="li-drop">
                    <Link to={'/lessor/account'} className="navbar-item">
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
      </div>     
    </nav>
	)
}

export default MenuLessor