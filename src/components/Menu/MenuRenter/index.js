import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import {Search} from '../../../store/actions/search';
import Scrool from '../../../utils/scroll';
import Auth from '../../../pages/Auth/index';
import Modal from '../../../components/Modal';
import Dropdown from '../Dropdown';
import './styleRenter.css'

import logo from '../../../assets/images/logo.png'

const MenuRenter = () => {
  const dispatch = useDispatch();	
	const [modal, setModal] = useState(false);
	
	const current_user = useSelector(state => state.auth);
	const search =   useSelector(state => state.search);

	let history = useHistory();

	const signLink = () => {
		setModal(true)
	}
	
  const hideModal = () => {
    setModal(false)
    return modal
	}

  navigator.geolocation.getCurrentPosition(function(position) {
    console.log(position)
  });

	return (
		<div className="back-nav">
			<nav className="navbar nav-fixed">
				<div className="navbar-brand">
					<Link to={'/'} onClick={Scrool(0,0)}>
						<img src={logo} alt="EasyTools Logo" className="logo"/>
					</Link>	
					{
						history.location.pathname === '/s/renter/perfil' || history.location.pathname === '/s/rent-rules' ? 
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