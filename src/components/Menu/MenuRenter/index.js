import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import {Search} from '../../../store/actions/search';
import {Coordinates} from '../../../store/actions/coordinates';
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
import simpleCrypto from '../../../services/crypto';
import { isAuthenticated } from "../../../services/auth";
import Notificationtost from '../../../utils/notification';
import Title from '../../../utils/title';
import { Warningtext } from '../../../components/Warningtext';
import { Form, Input } from '@rocketseat/unform';
import { Field, Label } from '../../../components/Form/Form';
import { useFormik } from 'formik';

const MenuRenter = () => {
  const dispatch = useDispatch();	
	const [modal, setModal] = useState(false);
	const current_user = useSelector(state => state.auth);
	const [search, setSearch] = useState('');
  const [notification, setNotfication] = useState([]);
  const [countn, setCount] = useState(0);
  const notificationrd = useSelector(state => state.notification);
	const [menu, setMenu] = useState(false);
	const [location, setLocation] = useState(false);
	const [lat, setLat] = useState(0);
	const [lng, setLng] = useState(0);
	const [bettersearch, setBettersearch] = useState(false);

	socketio.emit('register', current_user.id);

	let history = useHistory();


  const formik = useFormik({
    initialValues: {
			address: '',
    },

    onSubmit: value => {
   
    }
  })

	useEffect(() => {
		socketio.on('notify',function(data){
			var user = data.user;
			var message = data.message;
			var title = data.title;
			Notifier.start(`${title}`, `${message}`,"www.google.com","validated image url");
			getNotification()
		});

    async function getCountnotification () {
			if (isAuthenticated()) {
				const response = await api.get(`/notifications/count`, {
				});
				dispatch(Notificationrd(response.data.notification))
				setCount(response.data.notification)
			}
    }
    getCountnotification()

    async function getNotification () {
			if (isAuthenticated()) {
      const response = await api.get(`/notifications`, {
			});
      setNotfication(response.data.notification)
      getCountnotification()
      renderNotify()
			}
    }
		getNotification()

		async function Coordinates () {
			if (navigator.geolocation) {
				navigator.geolocation.getCurrentPosition(
				position => {
				},
				erroget => {
				},{ enableHighAccuracy: true });
			}	
		}
		Coordinates()

		return () => {

		};
	}, [])

  const renderNotify = () => {
    return (
      <Notification nt={notification}/>
    )
  }

	const getLocation = () => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
			position => {
				dispatch(Coordinates(position.coords.latitude, position.coords.longitude))
				success()
			},
			erroget => {
				error()
				setLocation(true)
			},{ enableHighAccuracy: true });
		}
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

  const error = () => Notificationtost(
    'error',
    'Não conseguimos pegar sua localização. habilite a geolocalização em seu navegador.', 
    {
      autoClose: 6000,
      draggable: false,
    },
    {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
    }
	)
	
  const success = () => Notificationtost(
    'success',
    'Estes são os equipamentos mais próximos de vocês.', 
    {
      autoClose: 6000,
      draggable: false,
    },
    {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
    }
  )

	const searchTools = (event) => {
		dispatch(Search(search))
	}

	const cancel = () => {
		setBettersearch(false)
	}

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
								<div>
									<input 
										type="text" 
										placeholder='Experimente "Furadeira" e pressione ENTER' 
										className="input input-search" 
										value={search}
										onKeyPress={event => {
											if (event.key === 'Enter') {
												searchTools()
											}
										}}
										onChange={event => setSearch(event.target.value)} 
									/>
									{
										location === true ?
										(
											<Button 
												type={'button'}
												className={'button is-default localization'}
												text={'S'}                            
												onClick={event => getLocation()}
											/>	
										)
										:
										('')
									}
									<div className="is-clearfix"></div>	
									<div>
										<Button 
											type={'button'}
											className={'button is-small is-default localization'}
											text={'Melhorar minha busca'}                            
											onClick={event => setBettersearch(!bettersearch)}
										/>
									</div>
									{
										location === true || bettersearch === true? 
										(
											<>
												<div className="newaddress">
													<p>Melhore sua busca.</p>
													<Warningtext class="orange">Adicione opções para refinar sua busca.</Warningtext>
													<Form
														onSubmit={ (e, values) => {
															formik.handleSubmit(values)
														}} 
														noValidate
													>
														<Input
															name="neighboor"
															type="text"
															placeholder="Rua, número complemento - Estado - Cidade"
															className={'input input-small'}
															onChange={event => formik.handleChange(event)}
															value={formik.values.address}
														/>

														<p>Distância.</p>

														<div className="columns">
															<div className="column">

															</div>
														</div>


														<p>Categoria.</p>

														<Input
															name="neighboor"
															type="text"
															placeholder="Rua, número complemento - Estado - Cidade"
															className={'input input-small'}
															onChange={event => formik.handleChange(event)}
															value={formik.values.address}
														/>

														<div className="is-pulled-right">
															<Button 
																type={'button'}
																className={'button is-small is-info localization'}
																text={'Pronto'}                            
																onClick={event => getLocation()}
															/>
															<Button 
																type={'button'}
																className={'button is-small is-default localization'}
																text={'Cancelar'}                            
																onClick={event => cancel()}
															/>
														</div>
													</Form>
												</div>
											</>
										)
										:
										('')
									}
								</div>
							</>
						)
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

				<div className={menu === true ? "navbar-menu is-active" : "navbar-menu"}>
					<div className="navbar-start"> 
					</div>
					<div className="navbar-end">
						<div className="navbar-item">
							<div className="buttons">
							{
									current_user.name === undefined || current_user.name === null ? 
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
									current_user.name === undefined || current_user.name === null ? 
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