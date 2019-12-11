import React, { useState } from 'react'
import { Link } from 'react-router-dom';

import './styleRenter.css'

import logo from '../../../assets/images/logo.png'

const MenuRenter = () => {

	const [search, setSearch] = useState('');

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
          </div>
        </div> 
      </div>     
    </nav>
	)
}

export default MenuRenter