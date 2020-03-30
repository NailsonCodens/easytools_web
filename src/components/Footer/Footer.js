import React from 'react'
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Scrool from '../../utils/scroll';

import { Ul } from '../../components/List/index';
import { Hr } from '../../components/Hr';

import './style.css'

import logo from '../../assets/images/logo_name.png';
import logo_y from '../../assets/images/logo.png';
import whats from '../../assets/images/whats.png';

import { Span } from '../Span';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faInstagram } from '@fortawesome/free-brands-svg-icons'
library.add(faInstagram);

const Footer = () => {

	let location = useLocation().pathname;

	return (
		<>
			{ 
				location === '/lessor/signin' || location === '/s/renter/user-option' 
				? 
				'' 
				: 
				<footer className="footer">
					<div className="whatsapp-help">
						<a
						 href="https://api.whatsapp.com/send?phone=5541991695587&text=Ol%C3%A1,%20tenho%20d%C3%BAvidas." target="_blank">
							<p>Fale conosco</p>
							<br/>
							<img src={whats} alt="Whats App EasyTools Logo" className="logo-whats"/>
						</a>
					</div>
					<div className="container">
						<div className="columns is-desktop">
							<div className="column">
								<Ul>
									<li><img src={logo} alt="EasyTools Logo" className="logo-footer"/></li>
									<br/>
									<p>Ferramenta fácil.</p>
								</Ul>
							</div>
							<div className="column">
								<Ul>
									<li className="title-footer"><Link to={'/s/about-us'} onClick={event => Scrool() } >EasyTools</Link></li>
									<li><Link to={'/s/signup?type=renter'} onClick={event => Scrool() } >Alugue o que precisa!</Link></li>
									<li><Link to={'/s/about-us'} onClick={event => Scrool() } >Sobre a EasyTools</Link></li>
									<li><Link to={'/s/help-me'} onClick={event => Scrool() } >Ajuda</Link></li>
									<li>easytools@gmail.com</li>
								</Ul>
						</div>
							<div className="column">
								<Ul>
									<li className="title-footer"><a href={'https://www.instagram.com/easytoolsapp/?hl=pt-br'} target="blank" onClick={event => Scrool() } ><FontAwesomeIcon icon={['fab', 'instagram']} size="2x"/></a></li>
									<li><a href="/s/terms" target="_blank">Termos de uso</a></li>
									<li><a href="/s/privacyterms" target="_blank">Política de privacidade</a></li>
									<li><a href="/s/dealopen" target="_blank">Contrato Público</a></li>
								</Ul>					
							</div>
							<div className="column">
								{
									/*
										<Ul>
											<li className="title-footer">EasyTools Blog</li>
											<li>Últimos posts</li>
											<li>Notícias</li>
										</Ul>															
									*/
								}
							</div>
						</div>
						<Hr/>
						<div>
							<Span><img src={logo_y} alt="EasyTools Logo" className="mini-logo-footer"/></Span>
							<span className="text-footer">Todos os direitos reservados à EasyTools.</span>
						</div>
					</div>
				</footer>			
				}
		</>	
	)
}

export default Footer;