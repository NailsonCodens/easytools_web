import React from 'react';
import { Route, useRouteMatch } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import '../../style.css';
import {Helmet} from 'react-helmet';
import Scrool from '../../../../../utils/scroll';
import ReactGA, { set } from 'react-ga';

const Orbital = ({history}) => {
  const Tracking = (category, action, label) => {
    Scrool()
    ReactGA.event({
      category: category,
      action: action,
      label: label
    });
  }
  
  const goUsed = (prod) => {
    console.log(prod)
    Scrool(0,0)
    Tracking('veio de pagina de seo', `veio de pagina de seo`, 'veio de pagina de seo')
    history.push('/s/search/all/' + prod + '/region') 
  }

  return (
    <>
      <Helmet>
        <title>Peça lixadeira Orbital | Caixa de ferramenta online</title>
        <meta name="title" content="Peça lixadeira Orbital em Curitiba | Caixa de ferramenta online"/>
        <meta name="description" content="Em Curitiba lixadeira orbital disponiveis para locação. Alugue lixadeira orbital para lixar paredes, massa corrida, drywall e muito mais. Em Curitiba"/>
        <meta name="keywords" content="aluguel lixadeira orbital,aluguel lixadeira,aluguel orbital,aluguel lixadeira orbital em curitiba,orbital,lixar parede em curitiba,lixa de parede em curitiba, aluguel,lixa em curitiba"/>
        <meta name="robots" content="index,follow"/>
      </Helmet>

      <div className="container">
        <h3 className="title-index ti-cs">
          Lixadeira Orbital
        </h3>
        <div className="columns">
          <div className="column">
            <div className="columns is-mobile is-desktop">
              <div className="column">
                <img src="https://a.easytoolsapp.com/files/1595863824096_4a18fc93-e0ff-4bc4-9487-8da30105c1d5_244e46d5-ddd6-4f16-8d0d-2a0b70d7aa6c.jpg" className="prodimg-seo"/>
              </div>
              <div className="column">
                <img src="https://a.easytoolsapp.com/files/1595863824118_4a18fc93-e0ff-4bc4-9487-8da30105c1d5_244e46d5-ddd6-4f16-8d0d-2a0b70d7aa6c.jpg" className="prodimg-seo"/>
              </div>
              <div className="column">
                <img src="https://a.easytoolsapp.com/files/1595863824240_4a18fc93-e0ff-4bc4-9487-8da30105c1d5_244e46d5-ddd6-4f16-8d0d-2a0b70d7aa6c.jpg" className="prodimg-seo"/>
              </div>
            </div>
            <h3 className="title-index">
              Sem orçamentos, sem 24 horas, Aluguel em minutos com a EasyTools.
            </h3>
          </div>
          <div className="column">
            <div className="container-prod-text">
              <p className="title-infos-tool">Descrição</p>
              <p className="text-parag">
                Ideal para acabamentos em madeiras, metais e parede!
              <br/>
              <p className="title-infos-tool">O produto</p>
              <b>Tensão: </b>127v
              <br/>
              <b>Potência: </b> 132w
              <br/>
              <b>Aliementação </b> Energia elétrica
              <br/>
              </p>
              <p className="title-infos-tool">Uso indicado</p>
              <p className="text-parag">
                Massa corrida, madeira, metal, piso, etc.
              </p>
              <br/>
              <p className="text-diferent text-parag has-text-centered">Escolha a lixadeira orbital perto de você e alugue online.</p>
              <button className="button color-logo is-fullwidth" onClick={event => goUsed('orbital')}>Escolher lixadeira orbital</button>
              <br/>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Orbital;