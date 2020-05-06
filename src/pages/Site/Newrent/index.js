import React from 'react'
import './style.css'
import { Link} from 'react-router-dom';
import Scrool from '../../../utils/scroll';
import {Helmet} from 'react-helmet'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserCircle, faIdCard, faCalendarWeek, faCreditCard, faTruck } from '@fortawesome/free-solid-svg-icons'
import logo from '../../../assets/images/logo.png'
library.add(faUserCircle, faIdCard, faCalendarWeek, faCreditCard, faTruck);

const Newrent = () => {


  return (
    <>
      <Helmet>
        <title>Alugar não precisa ser burocrático e chato</title>
        <meta
          name="description"
          content="EasyTools, Aluguel online de ferramentas e equipamentos que você e seu negócio precisam! A primeira locadora de equipamentos e ferrmanetas totalmente on-line."
        />
        <meta name="keywords" content="Aluguel online, equipamentos, construção cívil"/>
      </Helmet>
      <div className="container">
        <div className="container">
          <br/><br/>
          <h3 className="title-about-us has-text-centered">Precisou de ferramenta? Aluga na EasyTools!</h3>
          <br/>
          <p className="has-text-centered sub-title-about-us">Sem papél, sem burocracia, tudo digital.</p>
        </div>
      <br/><br/>
      <div className="text-intro">
        <div className="columns">
          <div className="column ">
            <p className="message-about">
              Se você pode pedir comida online, por que não equipamentos e ferramentas?
              <br/>
              Não temos loja física, por isso somos inovadores, atendemos somente online e fazemos delivery do equipamento onde você desejar.
            </p>
          </div>
          {
            /*
              <div className="column cl-image">
                <div className="has-text-centered">
                  <img src={logo} alt="EasyTools Logo" className="logo-about"/>
                </div>
              </div> 
            */
          }
        </div>
      </div>
      <div className="how-work-it">
        <p className="how-work-it-text">Como funciona? </p>
        <br/><br/>
        <div className="columns">
          <div className="column has-text-centered">
            <FontAwesomeIcon icon={['fas', 'user-circle']} className={'icons-about'} size="3x"/> 
            <p className="text-how-work">Faça uma conta na EasyTools e adicione seus documentos.</p>
          </div>
          <div className="column has-text-centered">
            <FontAwesomeIcon icon={['fas', 'calendar-week']} className={'icons-about'} size="3x"/>
            <p className="text-how-work">Escolha o equipamento e selecione o período que deseja usar.</p>
          </div>
          <div className="column has-text-centered">
            <FontAwesomeIcon icon={['fas', 'credit-card']} className={'icons-about'} size="3x"/>
            <p className="text-how-work">Dentro de alguns minutos seu aluguel será confirmado e você receberá a opção de pagamento.</p>
          </div>
          <div className="column has-text-centered">
            <FontAwesomeIcon icon={['fas', 'truck']} className={'icons-about'} size="3x"/>
            <p className="text-how-work">Pagamento feito, é só esperar que entregamos o equipamento em sua casa em até 2horas. Ah, também buscamos.</p>
          </div>
        </div>
      </div>
      <div className="why-easytools ">
        <div className="columns">
          <div className="column">
          <p className="how-work-it-text">Por que EasyTools? </p>
        <br/>
        <ul>
          <li>
            <p className="title-name">
             Menos burocracia (zero papela).
            </p>
            <p className="text-h">
              Chega de demora para alugar um equipamento, online é o futuro e o presente.
            </p>
          </li>
          <li>
            <p className="title-name">
              Facilidade.
            </p>
            <p className="text-h">
              Facilidade e agilidade para você e seu negócio.
            </p>
          </li>
          <li>
            <p className="title-name">
              Confiamos em você.
            </p>
            <p className="text-h">
              Na EasyTools o foco é em você, e nós confiamos que cuidará do nosso equipamento como se fosse seu.
            </p>
          </li>
          <li>
            <p className="title-name">
              Liberdade digital.
            </p>
            <p className="text-h">
              Chega de papelada, seu contrato agora é digital.
            </p>
          </li>
        </ul>
          <br/><br/>
        </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default Newrent
