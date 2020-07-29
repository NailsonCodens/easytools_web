import React from 'react'
import './style.css'
import { Link} from 'react-router-dom';
import Scrool from '../../../utils/scroll';
import {Helmet} from 'react-helmet'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import ScrollableAnchor from 'react-scrollable-anchor'
import lixadeira from '../../../assets/images/lixadeira.jpg'; 
import furadeira from '../../../assets/images/furadeira.jpg'; 
import all from '../../../assets/images/all.jpg'; 
import roçadeira from '../../../assets/images/roçadeira.jpg';
import esmerilhadeira from '../../../assets/images/esmerilhadeira.jpg';
import plaina from '../../../assets/images/plaina.jpg';
import ticotico from '../../../assets/images/ticotico.jpg';
import aspirador from '../../../assets/images/aspirador.jpg';
import wap from '../../../assets/images/wap.jpg';
import extratora from '../../../assets/images/extratora.jpg'; 
import gardening from '../../../assets/images/gardening.jpg';
import bricolagem from '../../../assets/images/bricolagem.jpg'
import construcao from '../../../assets/images/construcao.jpg'
import limpeza from '../../../assets/images/limpeza.jpg'
import estrutura from '../../../assets/images/estrutura.jpeg'
import { isMobile } from 'react-device-detect';
import { faUserCircle, faIdCard, faCalendarWeek, faCreditCard, faTruck } from '@fortawesome/free-solid-svg-icons'
import logo from '../../../assets/images/logo.png'
library.add(faUserCircle, faIdCard, faCalendarWeek, faCreditCard, faTruck);

const Newrent = ({history}) => {

  const goUsed = (prod) => {
    console.log(prod)
    Scrool(0,0)
    history.push('/s/search/all/' + prod + '/region') 
  }

  return (
    <>
      <Helmet>
        <title>Alugar não precisa ser burocrático e chato | EasyTools</title>
        <meta
          name="description"
          content="Conheça por que e para que nós existimos. Conheça nossa história"
        />
        <meta name="keywords" content="Sobre EasyTools, EasyTools Sobre EasyTools about, o que é a easytools, o que é easytools, onde alugar equipamentos e ferramentas"/>
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
              Não temos loja física e por isso somos inovadores, atendemos somente online e entregamos em sua casa o produto alugado.
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
            <p className="text-how-work">Dentro de alguns minutos, seu aluguel será confirmado e você receberá a opção de pagamento.</p>
          </div>
          <div className="column has-text-centered">
            <FontAwesomeIcon icon={['fas', 'truck']} className={'icons-about'} size="3x"/>
            <p className="text-how-work">Pagamento feito, é só esperar que entregaremos o equipamento em sua casa, em até 2horas. Ah, nós buscamos também.</p>
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
          <div className="container has-text-centered">
          <ScrollableAnchor id={'atuation'}>
            <div></div>
          </ScrollableAnchor>
            <p className="title-index has-text-centered">Conheça nossa área de atuação no Paraná?</p>
            <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d230539.1567424101!2d-49.3660441!3d-25.4658539!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xf0641216f68afbf6!2sEasyTools!5e0!3m2!1spt-BR!2sbr!4v1595343737440!5m2!1spt-BR!2sbr" width="800" height="350" frameborder="0" allowfullscreen="" aria-hidden="false" tabindex="0"></iframe>
          </div>
          <br/><br/>
          <div className="container">
          <p className="title-index has-text-centered"> Escolha e alugue </p>
          <div className={isMobile === true ? 'table-container' : ''}>

          <div className={ isMobile === true ? "columns is-desktop is-mobile": "columns is-desktop is-mobile is-multiline"}>
            <div className="column column-cs-mobile is-7-mobile is-one-fifth-desktop has-text-centered line-tools prodused" onClick={event => goUsed('equipaments')}>
              <img src={all}  alt="EasyTools Logo" className=""/>
                <p>Todas ferramentas</p>
            </div>
            <div className="column column-cs-mobile is-7-mobile is-one-fifth-desktop has-text-centered line-tools prodused">
                <img src={extratora}  alt="EasyTools Logo" className=""/>
                <p>Extratora</p>
            </div>
            <div className="column column-cs-mobile is-7-mobile is-one-fifth-desktop has-text-centered line-tools prodused" onClick={event => goUsed('wap')}>
              <img src={wap}  alt="EasyTools Logo" className=""/>
              <p>Lavadora de alta pressão</p>
            </div>
            <div className="column column-cs-mobile is-7-mobile is-one-fifth-desktop has-text-centered line-tools prodused" onClick={event => goUsed('lixadeira')}>
              <img src={lixadeira}  alt="EasyTools Logo" className=""/>
              <p>Lixadeira Orbital</p>
            </div>
            <div className="column column-cs-mobile is-7-mobile is-one-fifth-desktop has-text-centered line-tools prodused" onClick={event => goUsed('furadeira')}>
                <img src={furadeira}  alt="EasyTools Logo" className=""/>
                <p>Furadeira de Impacto</p>
            </div>
            <div className="column column-cs-mobile is-7-mobile is-one-fifth-desktop has-text-centered line-tools prodused" onClick={event => goUsed('roçadeira')}>
            <img src={roçadeira}  alt="EasyTools Logo" className=""/>
                <p>Roçadeira</p>
            </div>
            <div className="column column-cs-mobile is-7-mobile is-one-fifth-desktop has-text-centered line-tools prodused" onClick={event => goUsed('plaina')}>
            <img src={plaina}  alt="EasyTools Logo" className=""/>
                <p>Plaina</p>
            </div>
            <div className="column column-cs-mobile is-7-mobile is-one-fifth-desktop has-text-centered line-tools prodused" onClick={event => goUsed('esmerilhadeira')}>
            <img src={esmerilhadeira}  alt="EasyTools Logo" className=""/>
                <p>Esmerilhadeira</p>
            </div>
            <div className="column column-cs-mobile is-7-mobile is-one-fifth-desktop has-text-centered line-tools prodused" onClick={event => goUsed('tico')}>
            <img src={ticotico}  alt="EasyTools Logo" className=""/>
                <p>Tico tico</p>
            </div>
            <div className="column column-cs-mobile is-7-mobile is-one-fifth-desktop has-text-centered line-tools prodused" onClick={event => goUsed('aspirador de pó')}>
            <img src={aspirador}  alt="EasyTools Logo" className=""/>
                <p>aspirador de pó</p>
            </div>
          </div>

            {
              /*
            <div className="columns is-multiple is-mobile is-desktop">
              <div className="column is-7-mobile has-text-centered prodused" onClick={event => goUsed('extratora')}>
                <img src={extratora}  alt="EasyTools Logo" className=""/>
                <p>Extratora</p>
              </div>
              <div className="column is-7-mobile has-text-centered prodused" onClick={event => goUsed('lavadora')}>
              <img src={wap}  alt="EasyTools Logo" className=""/>
              <p>Lavadora de alta pressão</p>
              </div>
              <div className="column is-7-mobile has-text-centered prodused" onClick={event => goUsed('lixadeira')}>
                <img src={lixadeira}  alt="EasyTools Logo" className=""/>
              <p>Lixadeira Orbital</p>
              </div>
              <div className="column is-7-mobile has-text-centered prodused" onClick={event => goUsed('furadeira')}>
                <img src={furadeira}  alt="EasyTools Logo" className=""/>
                <p>Furadeira de Impacto</p>
              </div>
              <div className="column is-7-mobile has-text-centered prodused" onClick={event => goUsed('martelete')}>
                <img src={martelete}  alt="EasyTools Logo" className=""/>
                <p>Martelete</p>
              </div>
              <div className="column is-7-mobile has-text-centered prodused" onClick={event => goUsed('extratora')}>
                <img src={extratora}  alt="EasyTools Logo" className=""/>
                <p>Roçadeira</p>
              </div>
              <div className="column is-7-mobile has-text-centered prodused" onClick={event => goUsed('lavadora')}>
              <img src={wap}  alt="EasyTools Logo" className=""/>
              <p>Plaina</p>
              </div>
              <div className="column is-7-mobile has-text-centered prodused" onClick={event => goUsed('lixadeira')}>
                <img src={lixadeira}  alt="EasyTools Logo" className=""/>
              <p>Esmerilhadeira</p>
              </div>
              <div className="column is-7-mobile has-text-centered prodused" onClick={event => goUsed('furadeira')}>
                <img src={furadeira}  alt="EasyTools Logo" className=""/>
                <p>Furadeira de Impacto</p>
              </div>
              <div className="column is-7-mobile has-text-centered prodused" onClick={event => goUsed('martelete')}>
                <img src={martelete}  alt="EasyTools Logo" className=""/>
                <p>Martelete</p>
              </div>
            </div>
              
              */
            }
          </div>
        </div>
        <br/><br/>
        </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default Newrent
