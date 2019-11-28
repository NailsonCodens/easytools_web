import React, { useState } from 'react'
import { Link } from 'react-router-dom';

import Login from '../../../pages/Renter/Auth/index';
import Register from '../../../pages/Renter/Register';

import './styleRenter.css'

import logo from '../../../assets/images/logo.png'

const MenuRenter = () => {

	const [search, setSearch] = useState('');

	return (
		<nav className="nav">
			<div className="container-logo">
				<Link to={'/'}>
					<img src={logo} alt="EasyTools Logo" className="logo"/>
				</Link>
			</div>				
			<div>
				<input 
					type="text" 
					placeholder='Experimente "Furadeira"' 
					className="input input-search" 
					value={search}
					onChange={event => setSearch(event.target.value)} 
					/>
			</div>
			<div className="right-menu">
				<span href="sadsa">Seja um vizinho</span>
				<span href="asdasd">Ajuda</span>
				<Register className="nav-link" name="Cadastre-se"/>
				<Login className="nav-link" name="Entrar"/>
			</div>
		</nav>
	)
}

export default MenuRenter