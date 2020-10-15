import React from 'react';
import { Route, useRouteMatch } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import '../../style.css';
import {Helmet} from 'react-helmet';
import Scrool from '../../../../../utils/scroll';
import ReactGA, { set } from 'react-ga';

const Furadeira = ({history}) => {
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
        <title>Aluguel furadeira | EasyTools</title>
        <meta name="title" content="Aluguel furadeira | EasyTools locadora online"/>
        <meta name="description" content="Em Curitiba a variedade de furadeiras na EasyTools para você locar e usar, permite furos em diversos diâmetros e profundidas. As furadeiras podem ser utilizados para furar metal, furar madeira, furar concreto e furar pedra. Em Curitiba"/>
        <meta name="keywords" content="aluguel furadeira,aluguel furadeira em curitiba,furar, furar madeira em curitiba,furar metal em curitiba, aluguel,furar parede em curitiba, furar mármore em curitiba, furadeira bosh em curitiba"/>
        <meta name="robots" content="index,follow"/>
      </Helmet>

      <div className="container">
        <h3 className="title-index ti-cs">
          Furadeira de Impacto
        </h3>
        <div className="columns">
          <div className="column">
            <div className="columns is-mobile is-desktop">
              <div className="column">
                <img src="https://a.easytoolsapp.com/files/1595867873753_4a18fc93-e0ff-4bc4-9487-8da30105c1d5_71810655-f8e3-44ee-a2f8-8a8971c3d754.jpg" className="prodimg-seo"/>
              </div>
              <div className="column">
                <img src="https://a.easytoolsapp.com/files/1595867873754_4a18fc93-e0ff-4bc4-9487-8da30105c1d5_71810655-f8e3-44ee-a2f8-8a8971c3d754.jpg" className="prodimg-seo"/>
              </div>
              <div className="column">
                <img src="https://a.easytoolsapp.com/files/1595867874819_4a18fc93-e0ff-4bc4-9487-8da30105c1d5_71810655-f8e3-44ee-a2f8-8a8971c3d754.jpg" className="prodimg-seo"/>
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
              Mais compacta, confiável e acessível da sua classe. Ideal para trabalhar em locais estreitos e acima da cabeça. Peso reduzido, de apenas 1,2 kg.
              <br/>
              <p className="title-infos-tool">O produto</p>
              <b>Tensão: </b>127v
              <br/>
              <b>Potência: </b> 450w
              <br/>
              <b>Aliementação </b> Energia elétrica
              <br/>
              VAI COM 5 BROCAS para madeira e parede
              </p>
              <p className="title-infos-tool">Uso indicado</p>
              <p className="text-parag">
                Madeira, parede, piso, aço.
              </p>
              <p className="text-diferent text-parag has-text-centered">Escolha a furadeira perto de você e alugue online.</p>
              <button className="button color-logo is-fullwidth" onClick={event => goUsed('furadeira')}>Escolher furadeira</button>
              <br/>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Furadeira;