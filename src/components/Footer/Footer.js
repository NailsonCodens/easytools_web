import React from 'react'
import { useLocation } from 'react-router-dom';

import { Ul } from '../../components/List/index';
import { Hr } from '../../components/Hr';

import './style.css'

import logo from '../../assets/images/full.png';
import logo_y from '../../assets/images/logo.png';

import { Span } from '../Span';

const Footer = () => {

	let location = useLocation().pathname;

	return (
		<>
			{ 
				location === '/lessor/signin' 
				? 
				'' 
				: 
				<footer className="container footer">
					<div className="columns is-desktop">
						<div className="column">
							<Ul>
								<li><img src={logo} alt="EasyTools Logo" className="logo-footer"/></li>
							</Ul>
						</div>
						<div className="column">
							<Ul>
								<li>EasyTools</li>
							</Ul>
					</div>
						<div className="column">
							<Ul>
								<li>footer2</li>
							</Ul>						
						</div>
						<div className="column">
							<Ul>
								<li>footer2</li>
							</Ul>					
						</div>
						<div className="column">
							<Ul>
								<li>footer2</li>
							</Ul>					
						</div>
					</div>
					<Hr/>
					<div>
						<Span><img src={logo_y} alt="EasyTools Logo" className="mini-logo-footer"/></Span>
						<span className="text-footer">Todos os direitos reservados a EasyTools.</span>
					</div>
				</footer>			
				}
		</>	
	)
}

export default Footer;