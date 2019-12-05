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
								<li className="title-footer">EasyTools</li>
								<li>Alugue ferramentas</li>
								<li>Seja um locador EasyTools</li>
								<li>Politica de uso</li>
								<li>Sobre a EasyTools</li>
							</Ul>
					</div>
						<div className="column">
							<Ul>
								<li className="title-footer">EasyTools Blog</li>
								<li>Últimos posts</li>
								<li>Notícias</li>
							</Ul>						
						</div>
						<div className="column">
							<Ul>
								<li className="title-footer">Face, Insta</li>
								<li>Condições</li>
								<li>Termos de uso</li>
								<li>Politica de privacidade</li>
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