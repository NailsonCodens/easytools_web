import React from 'react'
import { useLocation } from 'react-router-dom';

import { Ul } from '../../components/List/index';

import './style.css'

import logo from '../../assets/images/full.png';

const Footer = () => {

	let location = useLocation().pathname;

	return (
		<>
			{ 
				location === '/lessor/auth' 
				? 
				'' 
				: 
				<footer className="container-fluid footer">
					<div className="columns is-desktop">
						<div className="column">
							<Ul>
								<li><img src={logo} alt="EasyTools Logo" className="loog-footer"/></li>
							</Ul>
						</div>
						<div className="column">
							<Ul>
								<li>footer1</li>
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
				</footer>			
				}
		</>	
	)
}

export default Footer;