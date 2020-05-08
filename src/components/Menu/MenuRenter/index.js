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
import { useLocation } from 'react-router-dom';
import Dropdown from '../Dropdown';
import Dropdownpure from '../Dropdownpure';
import './styleRenter.css'
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
import { getCordinates } from '../../../services/mapbox';
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
	const [category, setCategory] = useState([]);
	const [distancevalue, setDistancevalue] = useState('');
	const [coordiantevalue, setCoordinatevalue] = useState({});
	const [categoryvalue, setCategoryvalue] = useState('');
	const [setclass, setClass] = useState('normal');

	let values = queryString.parse(useLocation().search);
  
	const trackingId = "UA-160397692-1"; // Replace with your Google Analytics tracking ID
	ReactGA.initialize(trackingId);
	ReactGA.set({
		userId: current_user.id,
		// any data that is relevant to the user session
		// that you would like to track with google analytics
	})

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
			if (history.location.pathname !== '/') {
				history.push('/')
			}
		}
	}

	const searchTools = (event) => {
		if (event === '') {
			findTools('close')
			('close')
		}
		setSearch(event)
		setBettersearch(true)
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
					<div className={"navbar-item"}>
						<div className="buttons">
							<Link to={'/'}  onClick={event => Tracking('Menu site - explorar', 'Clique menu explorar', 'Menu site') } className="navbar-item">
									<div className="box-icons-mobile">
										<FontAwesomeIcon icon={['fas', 'search']} className={history.location.pathname === '/' ? "menu-icons-active" : "menu-icons" } size="1x"/>
										<div className="text-box">
											Explorar
										</div>
									</div>
							</Link>
							{
								isAuthenticated() === true ? 
								(
									<>
										<div onClick={event => Tracking('Menu site - Notificação', 'Clique menu notificação', 'Menu site') } className="navbar-item">
											<div className="box-icons-mobile box-icons-mobile-cs ">
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
															<div className="box-icons-mobile">
																<FontAwesomeIcon icon={['fas', 'handshake']} className={history.location.pathname === '/s/renter/myrent' ? "menu-icons-active" : "menu-icons" }  size="1x"/>
																<div className="text-box">
																	Meus alugados
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
														Alugar!
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
													<Link to={'/'} onClick={event => Tracking('Menu site - explorar', 'Clique menu explorar', 'Menu site', 400, 400) } className="navbar-item">
														Explorar
													</Link>
													<Link to={'/s/renter/myrent'} onClick={event => Tracking('Menu site - meus alugado', 'Clique menu meus alugados', 'Menu site') } className="navbar-item">
														Meus alugados
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
										<Link to={'/'} className="navbar-item">
											Explorar
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
									<>
										<Link to={'/'} className="navbar-item">
											Explorar
										</Link>
										<Link to={'/signup?type=renter'} onClick={event => Tracking('Menu site - Alugue o que precisa', 'Clique menu alugue o que precisa', 'Menu site') } className="navbar-item">
											Alugar
										</Link>
										<a href={'https://docs.google.com/forms/d/e/1FAIpQLSc73i4iPSCEIlLe5BD83eL1ZL89AoBCdZgcr4tCd8iJaH2nzQ/viewform'} onClick={event => Tracking('Menu site - Seja um locador', 'Clique seja um locador', 'Menu site') } className="navbar-item neighboor-nav" target="_blank">
											Ser vizinho na EasyTools
										</a>
										<Link to={'/s/about-us'} onClick={event => Tracking('Menu site - um novo jeito de alugar', 'Clique menu um novo jeito de alugar', 'Menu site') } className="navbar-item">
											Precisou? Alugue!
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
		<div className="back-nav">
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
								<div>
									<input 
										type="text" 
										placeholder='Equipamentos e ferramentas' 
										className="input input-search" 
										value={search}
										onKeyPress={event => {
											if (event.key === 'Enter') {
												findTools()
											}
										}}
										onChange={event => searchTools(event.target.value)} 
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
										{
											isMobile ? 
											(
												<span	type={'button'} className={'button is-small is-default localization'} onClick={event => setBettersearch(!bettersearch)}>
													<FontAwesomeIcon icon={['fas', 'search']} size="1x" />
												</span>
											)
											:
											(
												<>
												{
													/*
													<Button 
														type={'button'}
														className={'button is-small is-default localization'}
														text={'Melhorar minha busca'}                            
														onClick={event => setBettersearch(!bettersearch)}
													/>
													*/
												}
												</>
											)
										}
									</div>
									{
										bettersearch === true && search !== ''? 
										(
											<>
												<div className="newaddress" ref={wrapperRef}>
													<div className="columns">
														<div className="column">
																<Button 
																	type={'button'}
																	className={'button is-small is-info buttonsaddress'}
																	text={'Buscar'}
																	onClick={event => findTools()}
																/>
														</div>
													</div>
													{
														/*
															<p>Refine sua busca.</p>
															<Warningtext class="welcome-user">
																Adicione o endereço onde o equipamento ou ferramenta, será usado.
															</Warningtext>
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
																	onChange={event => handleMyaddress(event)}
																	value={myaddress}
																/>
																{
																	places.length > 0 ? 
																	(
																		<>
																			<div className="box-places">
																				<ul>
																					{
																						places.map((place, index) => (
																							<li className="list-places" key={index} onClick={event => selectPlace(place)}>
																								{place.place_name}
																							</li>
																						))
																					}
																				</ul>
																			</div>
																		</>
																	)
																	:
																	('')
																}
																<br/>
																<p>Distância</p>
																	<input 
																					className="is-checkradio"
																					type="radio"
																					id={'10'}
																					name="distance" 
																					value="10"
																					onChange={event => handleDistance(event)}
																			/>
																				<Label for={'10'}>10Km</Label>
																				<input 
																					className="is-checkradio"
																					type="radio"
																					id={'20'}
																					name="distance" 
																					value="20"

																					onChange={event => handleDistance(event)}
																			/>
																				<Label for={'20'}>20Km</Label>
																				<input 
																					className="is-checkradio"
																					type="radio"
																					id={'30'}
																					name="distance" 
																					value="30"
																					onChange={event => handleDistance(event)}
																			/>
																				<Label for={'30'}>30Km</Label>
																				<input 
																					className="is-checkradio"
																					type="radio"
																					id={'50'}
																					name="distance" 
																					value="50"
																					onChange={event => handleDistance(event)}
																			/>
																				<Label for={'50'}>50Km</Label>
																<br/>
																{
																	/*
																		<p>Categoria</p>
																		<Select
																		className={''}
																		options={categories}
																		isSearchable={true}
																		placeholder={'Cortante'}
																		onChange={selectedOption => {
																			handleChangeCategory('category', selectedOption, 'select');
																			formik.handleChange("category");
																		}}
																		value={category}
																		/>
																		<br/><br/>
																	
																}
																<br/><br/>
																<div className="is-pulled-right">
																	<Button 
																		type={'button'}
																		className={'button is-small is-info buttonsaddress'}
																		text={'Pronto'}
																		disabled={coordiantevalue.length === undefined ? true : false}                       
																		onClick={event => goOn()}
																	/>
																	<Button 
																		type={'button'}
																		className={'button is-small is-default buttonsaddress'}
																		text={'Fechar'}                            
																		onClick={event => cancel()}
																	/>
																</div>
															</Form>
														
														*/
													}
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
					<div className={"navbar-end-rent"}>
						{
							renderEndmenu()
						}
					</div> 
				</div>     
			</nav>
		</div>
	)
}

export default MenuRenter