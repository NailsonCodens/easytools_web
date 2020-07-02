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
						{
							location === '/' ? 
							(
								''
							)
							:
							('')
						}
						{
							/*
 								
							*/
						}

						<a
						href="https://api.whatsapp.com/send?phone=5541991695587&text=Ol%C3%A1,%20tenho%20d%C3%BAvidas." target="_blank">
							<br/>
							<img src={whats} alt="Whats App EasyTools Logo" className="logo-whats"/>
						</a>	
					</div>
					<div className="container">
						<div className="columns is-desktop">
							<div className="column">
								<Ul>
									<li>
										<img src={logo} alt="EasyTools Logo" className="logo-footer"/>
										<br/>
										<p className="born">Nascemos da necessidade. <br/><br/> Um dia precisei de uma chave, que não tinha, para tirar o óleo do meu carro. Eu não queria comprar, então pensei: Eu poderia alugar em um app ou site! Mas esse app/site não existia, até então."
											<br/>
											E assim nasce a EasyTools ❤️
										</p>
									</li>
								</Ul>
							</div>
							<div className="column">
								<div className="columns">
									<div className="column">
										<Ul>
											<li className="title-footer"><Link to={'/s/about-us'} onClick={event => Scrool(0,0) } >EasyTools</Link></li>
											<li><Link to={'/signup?type=renter'} onClick={event => Scrool(0,0) } >Alugue o que precisa!</Link></li>
											<li><a href={'https://docs.google.com/forms/u/1/d/e/1FAIpQLSc73i4iPSCEIlLe5BD83eL1ZL89AoBCdZgcr4tCd8iJaH2nzQ/viewform'} rel="noreferrer" target="_blank" onClick={event => Scrool() } >Seja vizinho na EasyTools</a></li>
											<li><Link to={'/s/about-us'} onClick={event => Scrool() } >Sobre a EasyTools</Link></li>
											<li><Link to={'/s/help-me'} onClick={event => Scrool() } >Ajuda</Link></li>
											<li><a href="/s/terms" target="_blank">Termos de uso</a></li>
											<li><a href="/s/privacyterms" target="_blank">Política de privacidade</a></li>
											<li><a href="/s/dealopen" target="_blank">Contrato Público</a></li>
										</Ul>
									</div>
									<div className="column">
										<Ul>
											<li className="title-footer">Quer falar com a gente?</li>
											<li className="title-footer"><a rel="noreferrer" href={'https://www.instagram.com/alugueferramentas/?hl=pt-br'} target="blank" onClick={event => Scrool() } ><FontAwesomeIcon icon={['fab', 'instagram']} size="2x"/> Instagram</a></li>
											<li>
												<a rel="noreferrer"
												href="https://api.whatsapp.com/send?phone=5541991695587&text=Ol%C3%A1,%20tenho%20d%C3%BAvidas." target="_blank">
													WhatsApp
												</a>
											</li>
											<li>easytools@gmail.com</li>
											<li>
												<a rel="noreferrer" href="https://ff.easytoolsapp.com/" target="_blank">
													Nosso blog ❤️
												</a>
											</li>
											<li>
												<a rel="noreferrer" href="https://docs.google.com/forms/d/e/1FAIpQLSflhvjqDhcyO9fFkKSaQOXVPAaT3ggMesc4VEnNk5Mh_oUNUg/viewform?usp=sf_link" target="_blank">Relatar um problema</a>
											</li>
										</Ul>					
									</div>
								</div>
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