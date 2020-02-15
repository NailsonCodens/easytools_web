import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import {Search} from '../../../store/actions/search';
import Scrool from '../../../utils/scroll';
import Auth from '../../../pages/Auth/index';
import Modal from '../../../components/Modal';
import Dropdown from '../Dropdown';
import Dropdownpure from '../Dropdownpure';
import './styleRenter.css'
import logo from '../../../assets/images/logo.png'
import socketio from '../../../services/socketio';
import Notifier from "react-desktop-notification";
import { Button } from '../../Form/Button';
import Notification from '../../../components/Notification/index';
import { Notification as Notificationrd } from '../../../store/actions/notification';
import api from '../../../services/api';

const MenuRenter = () => {
  const dispatch = useDispatch();	
	const [modal, setModal] = useState(false);
	const current_user = useSelector(state => state.auth);
	const search = useSelector(state => state.search);
  const [notification, setNotfication] = useState([]);
  const [countn, setCount] = useState(0);
  const notificationrd = useSelector(state => state.notification);

  console.log(notificationrd)


	socketio.emit('register', current_user.id);

	let history = useHistory();

	useEffect(() => {
		socketio.on('notify',function(data){
			console.log(data)
			var user = data.user;
			var message = data.message;
			var title = data.title;

			Notifier.start(`${title}`, `${message}`,"www.google.com","validated image url");

		});

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


  const renderNotis = () => {
    return (
      <Notification  nt={[]}/>
    )
  }

	const signLink = () => {
		setModal(true)
	}
	
  const hideModal = () => {
    setModal(false)
    return modal
	}

	navigator.geolocation.getCurrentPosition(function(position) {

	});

	return (
		<div className="back-nav">
			<nav className="navbar nav-fixed">
				<div className="navbar-brand">
					<Link to={'/'} onClick={Scrool(0,0)}>
						<img src={logo} alt="EasyTools Logo" className="logo"/>
					</Link>	
					{
						history.location.pathname === '/s/renter/perfil' || history.location.pathname === '/s/payment/resumebook' || history.location.pathname === '/s/payment/rent-rules' ? 
						('') 
						:
						(
							<>
								<input 
									type="text" 
									placeholder='Experimente "Furadeira"' 
									className="input input-search" 
									value={search}
									onChange={event => dispatch(Search(event.target.value))} 
								/>
							</>
						)
					}
					<span role="button" href="a" className="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
						<span aria-hidden="true"></span>
						<span aria-hidden="true"></span>
						<span aria-hidden="true"></span>
					</span>
				</div>

				<div className="navbar-menu">
					<div className="navbar-start"> 
					</div>
					<div className="navbar-end">
						<div className="navbar-item">
							<div className="buttons">
							{
									current_user.name === undefined ? 
									(
										<>
											<Link to={'/signup?type=lessor'} onClick={event => Scrool() } className="navbar-item">
												Seja um vizinho
											</Link>
										</>
									) : 
									(
										<>
											<Link to={'/signup?type=lessor'} onClick={event => Scrool() } className="navbar-item">
												Seja um vizinho
											</Link>
											<Link to={'/myrent'} onClick={event => Scrool() } className="navbar-item">
												Coisas que aluguei
											</Link>
											<Link to={'/signup?type=lessor'} onClick={event => Scrool() } className="navbar-item">
												Mensagens
											</Link>
											<Dropdownpure text="Notificações" countn={notificationrd} classMenu="classNotless" classCuston=" notification">
												{ renderNotify() }
											</Dropdownpure>
									</>
									)
								}
								{
									current_user.name === undefined ? 
									(
										<Link to={'/signup?type=renter'} onClick={event => Scrool() } className="navbar-item">
											Cadastre-se
										</Link>
									) : 
									(
										<>
											<Link to={'/'} onClick={event => Scrool() } className="navbar-item">
												Ajuda
											</Link>
										</>
									)
								}
								{
									current_user.name === undefined||current_user.name === null ? 
									(
										<p className="navbar-item signin" onClick={signLink}>
											Entrar
										</p>
									) : 
									(
										''					
									)
								}
								{
									current_user.type_user === 'Lessor'? 
									(
										<Dropdown classCuston=" menu-from-lessor menus">
											<li className="li-drop">
												<Link to={'/lessor/perfil'} onClick={event => Scrool() } className="navbar-item">
													Perfil
												</Link>
											</li>
											<li className="li-drop">
												<Link to={'/lessor/account'} onClick={event => Scrool() } className="navbar-item">
													Conta
												</Link>
											</li>
											<li className="li-drop">
												<Link to={'/lessor/dashboard'} onClick={event => Scrool() } className="navbar-item">
													Ver meus alugueis
												</Link>
											</li>
											<li className="li-drop">
												<Link to={'/'} onClick={event => Scrool() } className="navbar-item">
													Como ser um bom vizinho?
												</Link>
											</li>
										</Dropdown>
									) : 
									(
										<Dropdown classCuston=" menu-from-renter menus">
											<li className="li-drop">
												<Link to={'/s/renter/perfil'} onClick={event => Scrool() } className="navbar-item">
													Perfil
												</Link>
											</li>
											<li className="li-drop">
												<Link to={'/s/renter/account'} onClick={event => Scrool() } className="navbar-item">
													Conta
												</Link>
											</li>
										</Dropdown>				
									)
								}
								<Modal
									show={modal} 
									onCloseModal={hideModal} 
									closeOnEsc={true} 
									closeOnOverlayClick={true}
								> 
									<Auth hs={history} closeModal={event => setModal(false)}></Auth>
								</Modal>
							</div>
						</div>
					</div> 
				</div>     
			</nav>
		</div>
	)
}

export default MenuRenter