import React from 'react';
import { Route, useRouteMatch } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import '../../style.css';
import {Helmet} from 'react-helmet';
import Scrool from '../../../../../utils/scroll';
import ReactGA, { set } from 'react-ga';

const Ticotico = ({history}) => {
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
        <title>Aluguel tico tico em Curitiba | EasyTools locadora online</title>
        <meta name="title" content="Aluguel tico tico em Curitiba | EasyTools locadora online"/>
        <meta name="description" content="Em Curitiba a variedade de serras tico tico na EasyTools para você locar e usar, Cortar tudo. Muito usado para DIY, dá para fazer muitas coisas com uma serra tico tico. Em Curitiba"/>
        <meta name="keywords" content="aluguel serra tico tico,aluguel tico tico em curitiba,cortar, cortar madeira tico tico em curitiba,cortar metal tico tico em curitiba, aluguel,cortar serra tico tico em curitiba, serra em curitiba"/>
        <meta name="robots" content="index,follow"/>
      </Helmet>

      <div className="container">
        <h3 className="title-index ti-cs">
          Serra Tico tico
        </h3>
        <div className="columns">
          <div className="column">
            <div className="columns is-mobile is-desktop">
              <div className="column">
                <img src="https://a.easytoolsapp.com/files/1595865489934_4a18fc93-e0ff-4bc4-9487-8da30105c1d5_591d6419-b067-4937-a314-46483de077fb.jpg" className="prodimg-seo"/>
              </div>
              <div className="column">
                <img src="https://a.easytoolsapp.com/files/1595865489994_4a18fc93-e0ff-4bc4-9487-8da30105c1d5_591d6419-b067-4937-a314-46483de077fb.jpg" className="prodimg-seo"/>
              </div>
              <div className="column">
                <img src="https://a.easytoolsapp.com/files/1595865490171_4a18fc93-e0ff-4bc4-9487-8da30105c1d5_591d6419-b067-4937-a314-46483de077fb.jpg" className="prodimg-seo"/>
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
                A serra tico-tico apresenta velocidade variável, 4 posições com ação pendular e base ajustável de até 45° para cortes angulares. A serra DW300 é indicada para uso em marcenarias, carpintarias, fabricação de móveis, tapeçarias, instalação de móveis, manutenção e trabalhos em acrílico.
              <br/>
              <p className="title-infos-tool">O produto</p>
              <b>Tensão: </b>127v
              <br/>
              <b>Potência: </b> 500w
              <br/>
              <b>Aliementação </b> Energia elétrica
              <br/>
              VAI COM 1 Serra
              </p>
              <p className="title-infos-tool">Uso indicado</p>
              <p className="text-parag">
                Corte em chapas de madeiras e metais finos
              </p>
              <p className="text-diferent text-parag has-text-centered">Escolha a serra tico tico perto de você e alugue online.</p>
              <button className="button color-logo is-fullwidth" onClick={event => goUsed('tico tico')}>Escolher serra tico tico</button>
              <br/>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Ticotico;