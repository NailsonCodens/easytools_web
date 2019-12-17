import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom';
import { useSelector } from "react-redux";

import Auth from '../../../pages/Auth/index';
import Modal from '../../../components/Modal';
import Dropdown from '../Dropdown';
import './styleRenter.css'

import logo from '../../../assets/images/logo.png'

const MenuRenter = () => {
	
	const [search, setSearch] = useState('');
	const [modal, setModal] = useState(false);
	
	const current_user = useSelector(state => state.auth);

	let history = useHistory();

	const signLink = () => {
		setModal(true)
	}
	
  const hideModal = () => {
    setModal(false)
    return modal
  }

	return (
		<nav className="navbar">
      <div className="navbar-brand">
				<Link to={'/'}>
					<img src={logo} alt="EasyTools Logo" className="logo"/>
				</Link>
				<input 
					type="text" 
					placeholder='Experimente "Furadeira"' 
					className="input input-search" 
					value={search}
					onChange={event => setSearch(event.target.value)} 
					/>
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
									<Link to={'/signup?type=lessor'} className="navbar-item">
										Seja um locador
									</Link>
								) : 
								(
									<Link to={'/'} className="navbar-item">
										Ajuda
									</Link>
								)
							}
							{
								current_user.name === undefined ? 
								(
									<Link to={'/signup?type=renter'} className="navbar-item">
										Cadastre-se
									</Link>
								) : 
								(
									<Link to={'/'} className="navbar-item">
										Termos de uso
									</Link>
								)
							}
							{
								current_user.name === undefined||current_user.name === null ? 
								(
									<Link to={''} className="navbar-item" onClick={signLink}>
										Entrar
									</Link>
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
											<Link to={'/'} className="navbar-item">
												Perfil
											</Link>
										</li>
										<li className="li-drop">
											<Link to={'/'} className="navbar-item">
												Conta
											</Link>
										</li>
										<li className="li-drop">
											<Link to={'/lessor/dashboard'} className="navbar-item">
												Ver meus alugueis
											</Link>
										</li>
										<li className="li-drop">
											<Link to={'/'} className="navbar-item">
												Como ser um bom vizinho?
											</Link>
										</li>
									</Dropdown>
								) : 
								(
									<Dropdown classCuston=" menu-from-renter menus">
											<li className="li-drop">Perfil</li>
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
	)
}

export default MenuRenter