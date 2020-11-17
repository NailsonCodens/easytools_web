import React from 'react';
import { Route, useRouteMatch } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import '../../style.css';
import {Helmet} from 'react-helmet';
import Scrool from '../../../../../utils/scroll';
import ReactGA, { set } from 'react-ga';

const Lavadora = ({history}) => {
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
        <title>Peça lavadora de alta pressão wap  | Caixa de ferramenta online</title>
        <meta name="title" content="Peça lavadora de alta pressão wap | EasyTools locadora online"/>
        <meta name="description" content="Em Curitiba sempre tem muita poeira, se você está em construção, pior ainda. A EasyTools tem para locar lavadoras de alta pressão wap para que você possa limpar seu quintal, ou dar aquela geral depois da reforma. Lavadoras de alta pressão para casa e para obras Em Curitiba"/>
        <meta name="keywords" content="aluguel wap,aluguel vap em curitiba,vape,lavar quintal em curitiba,aluguel de lavadora de alta pressão em curitiba, aluguel,lavadora de alta pressão, lavadora de alta pressao,lavadora de pressao, alguel de wap em curitiba"/>
        <meta name="robots" content="index,follow"/>
      </Helmet>

      <div className="container">
        <h3 className="title-index ti-cs">
          Lavadora de alta pressão
        </h3>
        <div className="columns">
          <div className="column">
            <div className="columns is-mobile is-desktop">
              <div className="column">
                <img src="https://a.easytoolsapp.com/files/1595861228881_4a18fc93-e0ff-4bc4-9487-8da30105c1d5_877107bc-ea53-4a3e-a730-02c5ed68c26e.jpg" className="prodimg-seo"/>
              </div>
              <div className="column">
                <img src="https://a.easytoolsapp.com/files/1595861228904_4a18fc93-e0ff-4bc4-9487-8da30105c1d5_877107bc-ea53-4a3e-a730-02c5ed68c26e.jpg" className="prodimg-seo"/>
              </div>
              <div className="column">
                <img src="https://a.easytoolsapp.com/files/1595861229302_4a18fc93-e0ff-4bc4-9487-8da30105c1d5_877107bc-ea53-4a3e-a730-02c5ed68c26e.jpg" className="prodimg-seo"/>
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
              A lavadora de alta pressão é destinada às pessoas que vivem desafiando a sujeira em seu dia a dia.
              Essa lavadora de alta pressão é indicada remoção de sujeiras dos mais variados tipos de superfícies e objetos.
              <br/>
              <p className="title-infos-tool">O produto</p>
              <b>Tensão: </b>127v
              <br/>
              <b>Potência: </b> 1800 PSI
              <br/>
              <b>Aliementação </b> Energia elétrica
              </p>
              **** Comprimento mangueira de alta pressão: 5 metros.
              <p className="title-infos-tool">Uso indicado</p>
              <p className="text-parag">
                Lavagem de piso, pedra, telhado, carros, calçadas, banheiro, etc.
              </p>
              <p className="text-diferent text-parag has-text-centered">Escolha a lavadora perto de você e alugue online.</p>
              <button className="button color-logo is-fullwidth" onClick={event => goUsed('lavadora')}>Escolher lavadora de alta pressão</button>
              <br/>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Lavadora;