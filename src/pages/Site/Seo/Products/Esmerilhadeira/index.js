import React from 'react';
import '../../style.css';
import {Helmet} from 'react-helmet';
import Scrool from '../../../../../utils/scroll';
import ReactGA from 'react-ga';

const Esmerilhadeira = ({history}) => {
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
        <title>Peça esmerilhadeira em Curitiba | EasyTools Caixa de ferramenta online</title>
        <meta name="title" content="Peça esmerilhadeira em Curitiba | EasyTools caixa de ferramenta online"/>
        <meta name="description" content="Caixa de ferramenta online Em Curitiba esmerilhadeira disponiveis para locação. Alugue esmerilhadeira lixar ou cortar ferros, aços, metais, madeiras e plásticos. Em Curitiba"/>
        <meta name="keywords" content="aluguel esmerilhadeira,aluguel lixadeira esmerilhadeira,aluguel esmerilhadeira,aluguel esmerilhadeira em curitiba,esmerilhadeira,cortar ferro em curitiba,esmerilhar ferro em curitiba, aluguel,esmerilhadeira em curitiba"/>
        <meta name="robots" content="index,follow"/>
      </Helmet>

      <div className="container">
        <h3 className="title-index ti-cs">
          Esmerilhadeira Angular/ Lixadeira
        </h3>
        <div className="columns">
          <div className="column">
            <div className="columns is-mobile is-desktop">
              <div className="column">
                <img alt="tool" src="https://a.easytoolsapp.com/files/1595868919975_4a18fc93-e0ff-4bc4-9487-8da30105c1d5_9f4751e0-7fc6-48b6-ba65-d7ec89087b32.jpg" className="prodimg-seo"/>
              </div>
              <div className="column">
                <img alt="tool" src="https://a.easytoolsapp.com/files/1595868919975_4a18fc93-e0ff-4bc4-9487-8da30105c1d5_9f4751e0-7fc6-48b6-ba65-d7ec89087b32.jpg" className="prodimg-seo"/>
              </div>
              <div className="column">
                <img alt="tool" src="https://a.easytoolsapp.com/files/1595868920393_4a18fc93-e0ff-4bc4-9487-8da30105c1d5_9f4751e0-7fc6-48b6-ba65-d7ec89087b32.jpg" className="prodimg-seo"/>
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
                Ideal para corte e lixamento de madeira, ferro, aço, plástico.
              <br/>
              <p className="title-infos-tool">O produto</p>
              <b>Tensão: </b>127v
              <br/>
              <b>Potência: </b> 860W
              <br/>
              <b>Aliementação </b> Energia elétrica
              <br/>
              </p>
              <p className="title-infos-tool">Uso indicado</p>
              <p className="text-parag">
                É recomendado o uso para ferro, aço madeira, plástico, cortar metais.
              </p>
              <br/>
              <p className="text-diferent text-parag has-text-centered">Escolha a esmerilhadeira perto de você e alugue online.</p>
              <button className="button color-logo is-fullwidth" onClick={event => goUsed('esmerilhadeira')}>Escolher esmerilhadeira</button>
              <br/>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Esmerilhadeira;