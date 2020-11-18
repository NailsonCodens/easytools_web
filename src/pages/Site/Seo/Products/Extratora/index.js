import React from 'react';
import '../../style.css';
import {Helmet} from 'react-helmet';
import Scrool from '../../../../../utils/scroll';
import ReactGA from 'react-ga';

const Extratora = ({history}) => {
  const Tracking = (category, action, label) => {
    Scrool()
    ReactGA.event({
      category: category,
      action: action,
      label: label
    });
  }
  
  const goUsed = (prod) => {
    Scrool(0,0)
    Tracking('veio de pagina de seo', `veio de pagina de seo`, 'veio de pagina de seo')
    history.push('/s/search/all/' + prod + '/region') 
  }

  return (
    <>
      <Helmet>
        <title>Peça extratora de estofado se carpet | EasyTools Caixa de ferramenta online</title>
        <meta name="title" content="Peça extratora de estofados | EasyTools Caixa de ferramenta online"/>
        <meta name="description" content="Em Curitiba a EasyTools tem uma variedade de extratoras para você locar e limpar o banco do seu carro, o seu sofá e muito mais, . Em Curitiba"/>
        <meta name="keywords" content="aluguel extratora,aluguel de extratora,extratora para estofados,limpa sofá,máquina de limpar sofá,extratora para limpar banco de carro,extratora para limpar tapete,aluguel extratora curitiba, extratora wap curitiba"/>
        <meta name="robots" content="index,follow"/>
      </Helmet>
      <div className="container">
        <h3 className="title-index ti-cs">
          Aluguel de extratora de sujeira para estofados, carpet, tapetes etc.
        </h3>
        <div className="columns">
          <div className="column">
            <div className="columns is-mobile is-desktop">
              <div className="column">
                <img alt="tool" src="https://a.easytoolsapp.com/files/1595862521051_4a18fc93-e0ff-4bc4-9487-8da30105c1d5_9ecb91bc-d14d-42a3-8e54-4126bfacdcac.jpg" className="prodimg-seo"/>
              </div>
              <div className="column">
                <img alt="tool" src="https://a.easytoolsapp.com/files/1595862521614_4a18fc93-e0ff-4bc4-9487-8da30105c1d5_9ecb91bc-d14d-42a3-8e54-4126bfacdcac.jpg" className="prodimg-seo"/>
              </div>
              <div className="column">
                <img alt="tool" src="https://a.easytoolsapp.com/files/1595862521618_4a18fc93-e0ff-4bc4-9487-8da30105c1d5_9ecb91bc-d14d-42a3-8e54-4126bfacdcac.jpg" className="prodimg-seo"/>
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
              A extratora Home Cleaner é a melhor solução para limpeza de:
              <br/>
              - Sofás;
              <br/>
              - Estofados de carros;
              <br/>
              - Colchões;
              <br/>
              - Pisos e carpetes.
              <br/>
              <br/>
              Pode ser usada como aspirador também!
              <br/>
              <p className="title-infos-tool">O produto</p>
              <b>Tensão: </b>127v
              <br/>
              <b>Potência: </b> 1600w
              <br/>
              <b>Aliementação </b> Energia elétrica
              <br/>
              **** ACOMPANHA PRODUTO PARA LIMPEZA - 500ml.
              </p>
              <p className="title-infos-tool">Uso indicado</p>
              <p className="text-parag">
                Sofás, Estofado de automóveis, carpet, tapetes
              </p>
              <p className="text-diferent text-parag has-text-centered">Escolha a extratora perto de você e alugue online.</p>
              <button className="button color-logo is-fullwidth" onClick={event => goUsed('extratora')}>Escolher extratora</button>
              <br/>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Extratora;