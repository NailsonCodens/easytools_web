import React, { useState, useEffect, useRef } from 'react'
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import {Search} from '../../../store/actions/search';
import {Latitude} from '../../../store/actions/latitude';
import {Longitude} from '../../../store/actions/longitude';
import {Distance} from '../../../store/actions/distance';
import Scrool from '../../../utils/scroll';
import Auth from '../../../pages/Auth/index';
import Modal from '../../../components/Modal';
import queryString from 'query-string';
import man from '../../../assets/images/man.svg';
import { useLocation } from 'react-router-dom';
import { Span } from '../../../components/Span';
import * as Yup from 'yup';
import Dropdown from '../Dropdown';
import Dropdownpure from '../Dropdownpure';
import { CheckboxIOS } from '../../../components/Form/Button';
import InputMask from 'react-input-mask';
import { Field } from '../../../components/Form/Form';
import './styleRenter.css'
import './styleRadio.scss'
import { logout } from '../../../services/auth';
import {Viewsearch} from '../../../store/actions/viewsearch';
import logo from '../../../assets/images/logo.png'
import socketio from '../../../services/socketio';
import Notifier from "react-desktop-notification";
import { Button } from '../../Form/Button';
import Notification from '../../../components/Notification/index';
import { Notification as Notificationrd } from '../../../store/actions/notification';
import api from '../../../services/api';
import { isAuthenticated } from "../../../services/auth";
import Notificationtost from '../../../utils/notification';
import { Warningtext } from '../../../components/Warningtext';
import { Form, Input } from '@rocketseat/unform';
import { Label } from '../../../components/Form/Form';
import { useFormik } from 'formik';
import { getCordinates, getAddress } from '../../../services/mapbox';
import { Notifications } from '../../../store/actions/notifications';
import ReactGA from 'react-ga';

import {
  isMobile
} from "react-device-detect";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCoffee, faSearch, faUserCircle, faHandshake, faTags , faInfo} from '@fortawesome/free-solid-svg-icons'
library.add(faCoffee, faSearch, faUserCircle, faHandshake, faTags, faInfo);

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
	const [myaddress, setMyaddress] = useState('');
	const [places, setPlaces] = useState([]);
	const [erroPhone, seterroPhone] = useState('');
	const [category, setCategory] = useState([]);
	const [distancevalue, setDistancevalue] = useState('');
	const [coordiantevalue, setCoordinatevalue] = useState({});
	const [categoryvalue, setCategoryvalue] = useState('');
	const [setclass, setClass] = useState('normal');
	const [terms, setTerms] = useState([]);
	const [perfil, setPerfil] = useState([]);
	const [phone, setPhone] = useState('');
	const [modalout, setModalout] = useState(false);
	let values = queryString.parse(useLocation().search);
	let locationhistory = useLocation().pathname;


	function addEvent(obj, evt, fn) {
		if (obj.addEventListener) {
				obj.addEventListener(evt, fn, false);
		}
		else if (obj.attachEvent) {
				obj.attachEvent("on" + evt, fn);
		}
	}

	document.addEventListener("DOMContentLoaded", () => {
		document.addEventListener("mouseout", (event) => {
			if (!event.toElement && !event.relatedTarget) {
				setTimeout(() => {
					setModalout(true)
				}, 500);
			}
		});
	});

	const trackingId = "UA-160397692-1"; // Replace with your Google Analytics tracking ID
	ReactGA.initialize(trackingId);
	ReactGA.set({
		userId: current_user.id,
		// any data that is relevant to the user session
		// that you would like to track with google analytics
	})

	console.log(current_user.id)

	const Tracking = (category, action, label) => {
		Scrool()
		ReactGA.event({
			category: category,
			action: action,
			label: label
		});
	}

	socketio.emit('register', current_user.id);

	let history = useHistory();

  const formik = useFormik({
    initialValues: {
			address: '',
			category: '',
			distance: '',
    },

    onSubmit: value => {

    }
  })


  const wrapperRef = useRef(null);
	useOutsideAlerter(wrapperRef);

	function useOutsideAlerter(ref) {
		function handleClickOutside(event) {
			if (ref.current && !ref.current.contains(event.target)) {
				setBettersearch(false);
			}
		}

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}

	useEffect(() => {
		socketio.on('notify',function(data){
			var user = data.user;
			var message = data.message;
			var title = data.title;
			Notifier.start(`${title}`, `${message}`,"www.google.com","validated image url");
			getNotification()
			console.log('estou passando notificação');
		});

    async function loadPerfil() {
      const response = await api.get(`/perfil`, {
			});
			setPerfil(response.data.user[0])
		}
    loadPerfil();

		async function loadAsknotification () {

		}
		loadAsknotification()

    async function showBottom () {
      //verificar mobile
      if (document.documentElement.scrollTop > 100) {
        setClass('menu-small')
      }else{
        setClass('normal')
      }
    }
    window.onscroll = () => showBottom()

		async function verifyDevice () {
			if (isMobile) {
				setMenu(true)
			}
		}
		verifyDevice()

		async function loadRedirect () {
			if (values.r === 'redirect') {
				setModal(true)
			}
		}
		loadRedirect()

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
			dispatch(Notifications(response.data.notification))
      setNotfication(response.data.notification)
      getCountnotification()
      renderNotify()
			}
		}
		getNotification()

		async function Coordinates () {
			/*
			if (navigator.geolocation) {
				navigator.geolocation.getCurrentPosition(
				position => {
				},
				erroget => {
				},{ enableHighAccuracy: true });
			}	*/
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
		/*if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
			position => {
				dispatch(Latitude(position.coords.latitude))
				dispatch(Longitude(position.coords.longitude))
				success()
			},
			erroget => {
				error()
				setLocation(true)
			},{ enableHighAccuracy: true });
		}*/
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

	const hideModalout = () => {
		setModalout(false)
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

  const handleCheckIOS = event => {

  };

  const NoAcceptedTerms = () => {
		logout()
		Scrool(0,0);
		setTerms(false);
		setModal(false);
    history.push("/");
  }

  async function AcceptedTerms () {
		if (phone === '') {
			seterroPhone(true)
		}else{
			var userupdate = {
				terms: 'Y',
				phone: phone
			}

			Scrool(0,0)
			//info()
			api.put(`perfil/update/${current_user.id}`, userupdate, {})
			.then((res) => {
				setTerms(false);
			})
			.catch((err) => {
				console.log(err)
			})
		}
  }

  const hideTerms = () => {
    setTerms(false)
    return terms
  }

	const searchTools = (event) => {
		Scrool(0,0)
		if (event === '') {
			findTools('')
		}
		setSearch(event)
		setBettersearch(true)
	}

	const findTools = (op = '') => {
		if (op === 'close') {
			dispatch(Search(''))
			setSearch('')
			setBettersearch(false)
			Scrool(0,0)
		} else {
			dispatch(Search(search))
			dispatch(Viewsearch(true))
			setBettersearch(false)
			Scrool(0,0)
			var lat = localStorage.getItem('@lt')
      var lng = localStorage.getItem('@lg')

      if (lat !== null) {
        getAddress(lng, lat).then(res => {
          var city = ''
					const getCity = res.data.features.find(city => city.id.includes('place'));

          city = getCity.text.replace(/\s+/g, '-').toLowerCase();
					window.location.href = '/s/search/all/' + search + '/'+ city;
        })
      }else {
				window.location.href = '/s/search/all/' + search + '/region';
			}
		}
	}

	const cancel = () => {
		setBettersearch(false)
	}

  const handleChangeCategory = (input, event, type) => {
		setCategory(event)
		setCategoryvalue(event.value)
		//console.log(input, event.value, type)
	}

	const handleDistance = (event) => {
		setDistancevalue(event.target.value)
	}

	const handleMyaddress = (event) => {
		let query = event.target.value
		setMyaddress(event.target.value)

		getCordinates(query).then(res => {
			setPlaces(res.data.features)
		})
	}

	const selectPlace = (place) => {
		setCoordinatevalue(place.center)
		setMyaddress(place.place_name)
		setPlaces(false)
	}

	const goOn = () => {
		dispatch(Latitude(coordiantevalue[1]))
		dispatch(Longitude(coordiantevalue[0]))
		dispatch(Distance(distancevalue))
		dispatch(Search(search))

		setBettersearch(false)
		setPlaces(false)
	}

	const renderEndmenu = () => {

		if (isMobile) {
			return (
				<>
					{
						locationhistory === '/' || locationhistory.indexOf('congrats') ?
						(
							<>
								<div className={"navbar-end-rent"}>
									<div className={"navbar-item"}>
										<div className="buttons">
											<Link to={'/'}  onClick={event => Tracking('Menu site - Início', 'Clique menu Início', 'Menu site') } className="navbar-item">
													<div className="box-icons-mobile start-mobile">
														<FontAwesomeIcon icon={['fas', 'search']} className={history.location.pathname === '/' ? "menu-icons-active" : "menu-icons" } size="1x"/>
														<div className="text-box">
															Início
														</div>
													</div>
											</Link>
											{
												isAuthenticated() === true ?
												(
													<>
														<div onClick={event => Tracking('Menu site - Notificação', 'Clique menu notificação', 'Menu site') } className="navbar-item">
															<div className="box-icons-mobile box-icons-mobile-cs notification-menu-con ">
																<Dropdownpure text="Notificações" countn={notificationrd} classMenu="classNotless" classCuston=" notification">
																	{ renderNotify() }
																</Dropdownpure>
															</div>
														</div>
														{
															current_user.type_user === 'Lessor'?
															(
																<Link to={'/lessor/dashboard'} onClick={event => Tracking('Menu site - Aluguéis', 'Clique menu aluguéis', 'Menu site') } className="navbar-item">
																		<div className="box-icons-mobile">
																			<FontAwesomeIcon icon={['fas', 'tags']} className="menu-icons" size="1x"/>
																			<div className="text-box">
																				Aluguéis
																			</div>
																		</div>
																</Link>
															)
															:
															(
																<>
																	<Link to={'/s/renter/myrent'} onClick={event => Tracking('Menu site - meus alugados', 'Clique menu meus alugados', 'Menu site') } className="navbar-item">
																			<div className="box-icons-mobile my-tools">
																				<FontAwesomeIcon icon={['fas', 'handshake']} className={history.location.pathname === '/s/renter/myrent' ? "menu-icons-active" : "menu-icons" }  size="1x"/>
																				<div className="text-box">
																					Minhas ferramentas
																				</div>
																			</div>
																	</Link>
																</>
															)
														}
														<div onClick={event => Scrool() } className="navbar-item">
															{
																current_user.type_user === 'Lessor'?
																(
																	<div className="box-icons-mobile box-icons-mobile-cs box-icons-mobile-cs-user">
																		<Dropdown classCuston="menu-from-lessor menus">
																			<li className="li-drop">
																				<Link to={'/lessor/perfil'} onClick={event => Tracking('Menu site - perfil', 'Clique menu perfil', 'Menu site') } className="navbar-item">
																					Perfil
																				</Link>
																			</li>
																			<li className="li-drop">
																				<Link to={'/lessor/account'} onClick={event => Tracking('Menu site - conta', 'Clique menu conta', 'Menu site') } className="navbar-item">
																					Conta
																				</Link>
																			</li>
																			<li className="li-drop">
																				<Link to={'/lessor/dashboard'} onClick={event => Tracking('Menu site - meus aluguéis dropdown', 'Clique menu meus aluguéis dropdown', 'Menu site') } className="navbar-item">
																					Meus alugueis
																				</Link>
																			</li>
																			{
																				/*
																					<li className="li-drop">
																						<Link to={'/'} onClick={event => Scrool() } className="navbar-item">
																							Como ser um bom vizinho?
																						</Link>
																					</li>
																				*/
																			}
																		</Dropdown>
																	</div>
																)
																:
																(
																	<div className="box-icons-mobile box-icons-mobile-cs box-icons-mobile-cs-user">
																		<Dropdown classCuston=" menu-from-renter menus">
																			<li className="li-drop">
																				<Link to={'/s/renter/perfil'} onClick={event => Tracking('Menu site - perfil', 'Clique menu meus perfil dropdown', 'Menu site') } className="navbar-item">
																					Perfil
																				</Link>
																			</li>
																			{
																			/*
																			<li className="li-drop">
																				<Link to={'/s/renter/account'} onClick={event => Scrool() } className="navbar-item">
																					Conta
																				</Link>

																			</li>
																				*/
																			}
																		</Dropdown>
																	</div>
																)
															}
														</div>
													</>
												)
												:
												(
													<>
														{
															/*
																<Link to={'/signup?type=lessor'} onClick={event => Scrool() } className="navbar-item">
																		<div className="box-icons-mobile">
																			<div className="text-box">
																			Seja um vizinho
																			</div>
																		</div>
																</Link>
															*/
														}
														<Link to={'/signup?type=renter'} onClick={event => Tracking('Menu site - alugar', 'Clique menu alugar', 'Menu site') } className="navbar-item">
															<div className="box-icons-mobile">
																	<FontAwesomeIcon icon={['fas', 'handshake']} className="menu-icons" size="1x"/>
																	<div className="text-box">
																		Cadastre-se!
																	</div>
																</div>
														</Link>
														<div onClick={event => Tracking('Menu site - Modal entrar', 'Clique menu modal entrar', 'Menu site') } className="navbar-item" onClick={signLink}>
																<div className="box-icons-mobile">
																	<FontAwesomeIcon icon={['fas', 'user-circle']} className="menu-icons" size="1x"/>
																	<div className="text-box">
																		Entrar
																	</div>
																</div>
														</div>
														<Link to={'/s/help-me'} onClick={event => Tracking('Menu site - alugar', 'Clique menu alugar', 'Menu site') } className="navbar-item">
																<div className="box-icons-mobile">
																		<FontAwesomeIcon icon={['fas', 'info']} className="menu-icons" size="1x"/>
																		<div className="text-box">
																			Dúvidas
																		</div>
																	</div>
															</Link>
													</>
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
							</>
						)
						:
						(
							<>
							</>
						)
					}
				</>
			)
		} else {
			return (
				<>
					<div className="navbar-item">
						<div className="buttons">
						{
								current_user.name === undefined || current_user.name === null ?
								(
									<>
										{
											/*
												<Link to={'/signup?type=lessor'} onClick={event => Scrool() } className="navbar-item">
													Seja um vizinho
												</Link>
											*/
										}
									</>
								) :
								(
									<>
										{
											/*
												<Link to={'/signup?type=lessor'} onClick={event => Scrool() } className="navbar-item">
													Seja um vizinho
												</Link>
											*/
										}
										{
											current_user.type_user === 'Renter' ?
											(
												<>
													<Link to={'/'} onClick={event => Tracking('Menu site - Início', 'Clique menu Início', 'Menu site', 400, 400) } className="navbar-item">
														Início
													</Link>
													<Link to={'/s/renter/myrent'} onClick={event => Tracking('Menu site - meus alugado', 'Clique menu meus alugados', 'Menu site') } className="navbar-item">
														Minhas ferramentas
													</Link>
												</>
											)
											:
											('')
										}
										{
											/*
											<Link to={'/signup?type=lessor'} onClick={event => Scrool() } className="navbar-item">
												Mensagens
											</Link>
											*/
										}
										<Dropdownpure text="Notificações" countn={notificationrd} classMenu="classNotless" classCuston=" notification">
											{ renderNotify() }
										</Dropdownpure>
								</>
								)
							}
							{
								current_user.name === undefined || current_user.name === null ?
								(
									<>
										<Link to={'/'} className="navbar-item">
											Início
										</Link>
										<Link to={'/signup?type=renter'} onClick={event => Tracking('Menu site - Alugue o que precisa', 'Clique menu alugue o que precisa', 'Menu site') } className="navbar-item">
											Cadastre-se
										</Link>
										<a href={'https://docs.google.com/forms/d/e/1FAIpQLSc73i4iPSCEIlLe5BD83eL1ZL89AoBCdZgcr4tCd8iJaH2nzQ/viewform'} rel ="noreferrer" onClick={event => Tracking('Menu site - Seja um locador', 'Clique seja um locador', 'Menu site') } className="navbar-item neighboor-nav" rel ="noreferrer" target="_blank">
											Ser vizinho na EasyTools
										</a>
										<Link to={'/s/about-us'} onClick={event => Tracking('Menu site - um novo jeito de alugar', 'Clique menu um novo jeito de alugar', 'Menu site') } className="navbar-item link-how-work">
											Como funciona?
										</Link>
										<Link to={'/s/help-me'} onClick={event => Tracking('Menu site - dúvidas', 'Clique menu dúvidas', 'Menu site') } className="navbar-item">
											Dúvidas
										</Link>
									</>
								) :
								(
									<>
										<Link to={'/s/help-me'} onClick={event => Tracking('Menu site - dúvidas', 'Clique menu dúvidas', 'Menu site') } className="navbar-item">
											Dúvidas
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
											<Link to={'/lessor/perfil'} onClick={event => Tracking('Menu site - perfil lessor', 'Clique menu perfil lessor', 'Menu site') } className="navbar-item">
												Perfil
											</Link>
										</li>
										<li className="li-drop">
											<Link to={'/lessor/account'} onClick={event => Tracking('Menu site - conta', 'Clique menu conta', 'Menu site') } className="navbar-item">
												Conta
											</Link>
										</li>
										<li className="li-drop">
											<Link to={'/lessor/dashboard'} onClick={event => Tracking('Menu site - meus resultados', 'Clique menu meus resultados', 'Menu site') } className="navbar-item">
												Meus resultados
											</Link>
										</li>
										<li className="li-drop">
											<Link to={'/lessor/rents'} onClick={event => Tracking('Menu site - ver meus alugueis', 'Clique menu ver meus alugueis', 'Menu site') } className="navbar-item">
												Ver meus alugueis
											</Link>
										</li>
										{
											/*
											<li className="li-drop">
												<Link to={'/'} onClick={event => Scrool() } className="navbar-item">
													Como ser um bom vizinho?
												</Link>
											</li>
											*/
										}
									</Dropdown>
								) :
								(
									<Dropdown classCuston=" menu-from-renter menus">
										<li className="li-drop">
											<Link to={'/s/renter/perfil'} onClick={event => Tracking('Menu site - perfil renter', 'Clique menu perfil renter', 'Menu site') } className="navbar-item">
												Perfil
											</Link>
										</li>
										<li className="li-drop">
											<Link to={'/s/renter/perfil/documents'} onClick={event => Tracking('Menu site - documentos', 'Clique menu documentos', 'Menu site') } className="navbar-item">
												Documento
											</Link>
										</li>
										{
										/*
										<li className="li-drop">
											<Link to={'/s/renter/account'} onClick={event => Scrool() } className="navbar-item">
												Conta
											</Link>

										</li>
											*/
										}
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
				</>
			)
		}
	}

	return (
		<div className="back-nav back-nav-renter">
			<nav className={"navbar nav-fixed " + setclass}>
				<div className="navbar-brand">
					<Link to={'/'} onClick={ event => findTools('close')}>
						<img src={logo} alt="EasyTools Logo" className="logo"/>
					</Link>
					{
						history.location.pathname === '/s/renter/perfil' || history.location.pathname === '/s/payment/resumebook' || history.location.pathname === '/s/payment/rent-rules' ?
						('')
						:
						(
							<>
								<div className="input-right-mobile">
									<div className="columns is-mobile">
										<div className="column is-8-desktop is-10-mobile">
												<input
												type="text"
												placeholder='Pesquisar'
												className="input input-search"
												value={search}
												onKeyPress={event => {
													if (event.key === 'Enter') {
														findTools()
													}
												}}
												onChange={event => searchTools(event.target.value)}
											/>
										</div>
										<div className="column">
										<a
										className={'button buttonsaddress is-info'}
										onClick={event => findTools(search)}
										>
											<FontAwesomeIcon icon={['fas', 'search']}  size="1x" />
										</a>
										</div>
									</div>
								</div>
							</>
						)
					}
					<span
						role="button"
						href="a"
						className={"navbar-burger burger"}
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
						{
							renderEndmenu()
						}
				</div>
			</nav>
			{
				/*
			<Modal
				show={modalout}
				onCloseModal={hideModalout}
				closeOnEsc={true}
				closeOnOverlayClick={true}
			>
					<div className="columns columns-box-hey">
						<div className="column box-text-hey">
							<img src={man} alt="Man Logo" className="baby-cry baby-cry-outmouse"/>
							<h2 className="hey">Ei, espera ai!</h2>
							<br/>
							<p>Ficou com alguma dúvida?</p>
							<p>Calma que a gente auqi da Easy <br/> pode te ajudar!</p>
							<br/>
							<p>Preencha ao lado e nós iremos entrar <br/> em contato para você poder usar sua <br/> caixa de ferramentas na nuvem.</p>
						</div>
						<div className="column">
							<br/><br/><br/>
						<Field className={'field'}>
							<Label for={'nome'}>
								<Input
									name="nome"
									type="nome"
									placeholder="Nome"
									className={formik.touched.name && formik.errors.name ? 'input border-warning' : 'input'}
									onChange={formik.handleChange}
									value={formik.values.name}
								/>
							</Label>
						</Field>
						<Field className={'field'}>
							<Label for={'email'}>
								<Input
									name="email"
									type="email"
									placeholder="E-mail"
									className={formik.touched.email && formik.errors.email ? 'input border-warning' : 'input'}
									onChange={formik.handleChange}
									value={formik.values.email}
								/>
							</Label>
						</Field>
						<Field className={'field'}>
							<Label for={'phone'}>
								<InputMask
									name="phone"
									type="text"
									mask="(99) 9 9999-9999"
									maskChar=" "
									placeholder="(41) 9 9999-9999"
									className={formik.touched.phone && formik.errors.phone ? 'input border-warning' : 'input'}
									onChange={formik.handleChange}
									value={phone}
								/>
								<Span className={'validation-warning'}>
									{
										formik.touched.phone && formik.errors.phone
									?
										(<div>{formik.errors.phone}</div>)
									:
										null
									}
								</Span>
							</Label>
						</Field>
						<div className="columns">
							<div className="column">
								<p>Contato via Whatsapp ou E-mail?</p>
								<div class="radio-group">
									<input type="radio" id="option-one"  name="selector"/><label for="option-one">E-mail</label>
									<input type="radio" id="option-three" name="selector"/><label for="option-three">WhatsApp</label>
  							</div>
							</div>
						</div>
						</div>
					</div>
			</Modal>
				*/
			}
		</div>
	)
}

export default MenuRenter
