import React from 'react';
import '../../style.css';
import {Helmet} from 'react-helmet';
import Scrool from '../../../../../utils/scroll';
import ReactGA from 'react-ga';

const Aspirador = ({history}) => {
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
        <title>Peça aspirador de pó e água | EasyTools Caixa de ferramenta online</title>
        <meta name="title" content="Peça aspirador de pó e água | EasyTools sua caixa de ferramenta online"/>
        <meta name="description" content="Caixa de ferramenta na nuvem em Curitiba tem aspirador de pó na EasyTools para você locar e usar, Aspirador de pó para construção civil, para uso doméstico e pequenas obras e etc. Em Curitiba"/>
        <meta name="keywords" content="aspirador de pó aluguel,aluguel de aspirador de pó em curitiba,aspirar,aspirador de pó obras em curitiba, aspirador de pó limpeza em curitiba, aluguel, aspirador de água em curitiba,aspiração em curitiba,em curitiba"/>
        <meta name="robots" content="index,follow"/>
      </Helmet>

      <div className="container">
        <h3 className="title-index ti-cs">
          Aspirador de pó e água
        </h3>
        <div className="columns">
          <div className="column">
            <div className="columns is-mobile is-desktop">
              <div className="column">
                <img alt="tool" src="https://a.easytoolsapp.com/files/1595864905233_4a18fc93-e0ff-4bc4-9487-8da30105c1d5_08c0c35c-6485-4dad-b835-3233a2d6cc21.jpg" className="prodimg-seo"/>
              </div>
              <div className="column">
                <img alt="tool" src="https://a.easytoolsapp.com/files/1595864905340_4a18fc93-e0ff-4bc4-9487-8da30105c1d5_08c0c35c-6485-4dad-b835-3233a2d6cc21.jpg" className="prodimg-seo"/>
              </div>
              <div className="column">
                <img alt="tool" src="https://a.easytoolsapp.com/files/1595864905511_4a18fc93-e0ff-4bc4-9487-8da30105c1d5_08c0c35c-6485-4dad-b835-3233a2d6cc21.jpg" className="prodimg-seo"/>
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
              Com capacidade para 20 litros e recipiente em inox, que aumenta a sua resistência e valoriza ainda mais o seu design, ele é perfeito para as demandas de limpeza em estabelecimentos comerciais, como: lava-cars, hotéis, edifícios, escolas, shopping centers, hospitais, oficinas e muito mais.
              <br/>
              <p className="title-infos-tool">O produto</p>
              <b>Tensão: </b>127v
              <br/>
              <b>Potência: </b> 1600w
              <br/>
              <b>Aliementação </b> Energia elétrica
              <br/>
              VAI COM 1 Serra
              </p>
              <p className="title-infos-tool">Uso indicado</p>
              <p className="text-parag">
              Colchão, tapete, sofá, piso, estofado, carro, construção civil, obras, uso doméstico etc.
              </p>
              <p className="text-diferent text-parag has-text-centered">Escolha a aspirador de pó perto de você e alugue online.</p>
              <button className="button color-logo is-fullwidth" onClick={event => goUsed('aspirador ')}>Escolher serra aspirador de pó</button>
              <br/>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Aspirador;