import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { useSelector } from "react-redux";

import './styleRenter.css'

import logo from '../../../assets/images/logo.png'

const MenuRenter = () => {
  const current_user = useSelector(state => state.auth);
console.log(current_user);

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
							{
								current_user.length === 0 ? 
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
								current_user.length === 0 ? 
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
								current_user.length === 0 ? 
								(
									<Link to={'/'} className="navbar-item">
										Entrar
									</Link>
								) : 
								(
									<Link to={'/lessor'} className="navbar-item">
										{ current_user.map(user => (user.name)) }
									</Link>
								)
							}
            </div>
          </div>
        </div> 
      </div>     
    </nav>
	)
}

export default MenuRenter