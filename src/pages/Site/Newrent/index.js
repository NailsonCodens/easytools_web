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
import logo_front_aboutus from '../../../assets/images/imagem_front_aboutus.png';
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
  Scrool(0,0);

  const goUsed = (prod) => {
    console.log(prod)
    Scrool(0,0)
    history.push('/s/search/all/' + prod + '/region') 
  }

  return (
    <> 
    {
      <Helmet>
        <title>Alugar não precisa ser burocrático e chato | EasyTools</title>
        <meta
          name="description"
          content="Conheça por que e para que nós existimos. Conheça nossa história"
        />
        <meta name="keywords" content="Sobre EasyTools, EasyTools Sobre EasyTools about, o que é a easytools, o que é easytools, onde alugar equipamentos e ferramentas"/>
        <meta property="og:url" content="easytoolsapp.com/s/about-us"/>
        <meta property="og:title" content="Sobre nós | EasyTools"/>
        <meta property="og:site_name" content="EasyTools - Aluguel de ferramentas"></meta>
        <meta property="og:description" content="Conheça por que e para que nós existimos. Conheça nossa história"/>
        <meta property="og:type" content="website"/>
      </Helmet>
    }
      <div className="container">
        <div className="container">
          <br/><br/>
          <div className="columns">
            <div className="column">
              <h3 className="title-about-us">Use ferramentas e só pague pelo tempo que usar!</h3>
              <br/>
              <p className="sub-title-about-us">Contrato online e o equipamento em seu estabelecimento em até 2 horas, enquanto você toma seu cafézinho.</p>
              <br/>
              <p className="">
                Se você pode pedir comida online, por que não equipamentos e ferramentas?
              </p>
             </div>
            <div className="column">
              <img src={logo_front_aboutus}  alt="EasyTools Logo" className="image_easy_index_aboutus"/>
            </div>
          </div>
          <br/><br/>
        </div>
      <br/><br/>
      <div className="how-work-it">
        <p className="title-about-us has-text-centered">Como funciona? </p>
        <br/><br/>
        <div className="columns">
          <div className="column has-text-centered">
            <p className="title-how-work">1° Escolha sua ferramenta. </p>
            <p className="text-how-work">Escolha o equipamento e selecione o período que deseja usar.</p>
          </div>
          <div className="column has-text-centered">
            <p className="title-how-work">2° Data e forma de pagamento. </p>
            <p className="text-how-work">Escolha a data de aluguel e devolução e a opção de pagamento.</p>
          </div>
          <div className="column has-text-centered">
            <p className="title-how-work">3° Receba em até 2 horas. </p>
            <p className="text-how-work">Agora é só esperar que entregaremos o equipamento em seu estabelecimento, em até duas horas.</p>
          </div>
          <div className="column has-text-centered">
            <p className="title-how-work">4° Devolução do alugado. </p>
            <p className="text-how-work">Logo depois do seu período de uso, nossos entregadores de aplicativo, vão até você retirar o alugado.</p>
          </div>
        </div>
      </div>
      {

        /*
        
        
        */
      }

      <div className="why-easytools ">
        <div className="columns">
          <div className="column">
          <p className="how-work-it-text">Por que EasyTools? </p>
          <br/><br/>
          <div className="container has-text-centered">
          <ScrollableAnchor id={'atuation'}>
            <div></div>
          </ScrollableAnchor>
            <p className="title-index has-text-centered">Conheça nossa área de atuação no Paraná?</p>
            <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d230539.1567424101!2d-49.3660441!3d-25.4658539!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xf0641216f68afbf6!2sEasyTools!5e0!3m2!1spt-BR!2sbr!4v1595343737440!5m2!1spt-BR!2sbr" width="100%" height="350" frameborder="0" allowfullscreen="" aria-hidden="false" tabindex="0"></iframe>
          </div>
          <br/><br/>
          <div className="container">
          <p className="title-index has-text-centered"> Escolha e alugue </p>
          <div className="has-text-centered">
            <a className={`button is-info`} href="https://easytoolsapp.com/s/search/all/equipaments/region">
              Ver todas ferramentas e equipamentos
            </a>
          </div>
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
          <div className="has-text-centered">
            <a className={`button is-info`} href="https://easytoolsapp.com/s/search/all/equipaments/region">
              Ver todas ferramentas e equipamentos
            </a>
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
