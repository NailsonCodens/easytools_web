import React from 'react'
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Scrool from '../../utils/scroll';
import Blog from '../../pages/Site/Index/Blog';
import { Ul } from '../../components/List/index';
import { Hr } from '../../components/Hr';
import { useSelector } from "react-redux";
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

	const refreshui = useSelector(state => state.refreshui);
	
	console.log(refreshui + 'aaaaa')

  const updateServiceWorker = () => {
		const sw = refreshui.payload

		const registrationWaiting = sw.waiting;


    if (registrationWaiting) {
      registrationWaiting.postMessage({ type: 'SKIP_WAITING' });
			console.log('sdsad')
      registrationWaiting.addEventListener('statechange', e => {
				if (e.target.state === 'activated') {
          window.location.reload();
        }
      });
    }
  }


	let location = useLocation().pathname;

	return (
		<>
			{ 
				location === '/lessor/signin' || location === '/s/renter/user-option' 
				? 
				'' 
				: 
				<footer className="footer">
					<Blog/>
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
							console.log(refreshui)
						}
						{
							Object.keys(refreshui).length !== 0 ? 
							(
								<>
									<div className="container-alert">
										<div className="alert">
											<span className="span-sw">Há uma nova versão do site disponível para você.</span><button className="button is-rounded is-small is-dark" onClick={updateServiceWorker}>Atualizar</button>							
										</div>
									</div>
								</>
							)
							:
							(
								<>
								</>
							)
						}
						<a
						href="https://api.whatsapp.com/send?phone=5541991695587&text=Ol%C3%A1,%20tenho%20d%C3%BAvidas." target="blank">
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
										<br/>
										<p class="makeit">
											Em Curitiba - PR
											<br/>
											Escritório - Rua alvares de azevedo, 298
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
											<li><a href={'https://docs.google.com/forms/u/1/d/e/1FAIpQLSc73i4iPSCEIlLe5BD83eL1ZL89AoBCdZgcr4tCd8iJaH2nzQ/viewform'} target="blank" onClick={event => Scrool() } >Seja vizinho na EasyTools</a></li>
											<li><Link to={'/s/about-us'} onClick={event => Scrool() } >Sobre a EasyTools</Link></li>
											<li><Link to={'/s/help-me'} onClick={event => Scrool() } >Ajuda</Link></li>
											<li><a href="/s/terms" target="blank">Termos de uso</a></li>
											<li><a href="/s/privacyterms" target="blank">Política de privacidade</a></li>
											<li><a href="/s/dealopen" target="blank">Contrato Público</a></li>
										</Ul>
									</div>
									<div className="column">
										<Ul>
											<li className="title-footer">Quer falar com a gente?</li>
											<li className="title-footer"><a href={'https://www.instagram.com/alugueferramentas/?hl=pt-br'} target="blank" onClick={event => Scrool() } ><FontAwesomeIcon icon={['fab', 'instagram']} size="2x"/> Instagram</a></li>
											<li>
												<a
												href="https://api.whatsapp.com/send?phone=5541991695587&text=Ol%C3%A1,%20tenho%20d%C3%BAvidas." target="blank">
													WhatsApp
												</a>
											</li>
											<li>easytools@gmail.com</li>
											<li>
												<a href="https://caixadeferramenta.easytoolsapp.com/" target="blank">
													Nosso blog <span role="img">❤️</span>
												</a>
											</li>
											<li>
												<a href="https://docs.google.com/forms/d/e/1FAIpQLSflhvjqDhcyO9fFkKSaQOXVPAaT3ggMesc4VEnNk5Mh_oUNUg/viewform?usp=sf_link" target="_blank">Relatar um problema</a>
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