import React from 'react';
import '../../style.css';
import {Helmet} from 'react-helmet';
import Scrool from '../../../../../utils/scroll';
import ReactGA from 'react-ga';

const Plaina = ({history}) => {
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
        <title>Peça plaina | Caixa de ferramenta online</title>
        <meta name="title" content="Peça plaina | Caixa de ferramenta online"/>
        <meta name="description" content="Caixa de ferramenta online Em Curitiba a variedade de plaina na EasyTools para você locar e usar, A plaina é uma ótima ferramenta para retirar sobras de madeiras, de portas e etc, com a plaina você consegue alinhar sua porta ou madeira. Em Curitiba"/>
        <meta name="keywords" content="aluguel plaina,aluguel plaina em curitiba,alinhar, tirar ondulação da porta em curitiba, plaina elétrica em curitiba, aluguel, desgastar porta com plaina em curitiba, desbasta em curitiba,plaina alinhar madeira buchuda em curitiba"/>
        <meta name="robots" content="index,follow"/>
      </Helmet>

      <div className="container">
        <h3 className="title-index ti-cs">
          Plaina elétrica
        </h3>
        <div className="columns">
          <div className="column">
            <div className="columns is-mobile is-desktop">
              <div className="column">
                <img alt="tool" src="https://a.easytoolsapp.com/files/1595864378045_4a18fc93-e0ff-4bc4-9487-8da30105c1d5_0e6d3ed5-70dd-43c5-bf7a-c5c795f7d7e7.jpg" className="prodimg-seo"/>
              </div>
              <div className="column">
                <img alt="tool" src="https://a.easytoolsapp.com/files/1595864378047_4a18fc93-e0ff-4bc4-9487-8da30105c1d5_0e6d3ed5-70dd-43c5-bf7a-c5c795f7d7e7.jpg" className="prodimg-seo"/>
              </div>
              <div className="column">
                <img alt="tool" src="https://a.easytoolsapp.com/files/1595864378142_4a18fc93-e0ff-4bc4-9487-8da30105c1d5_0e6d3ed5-70dd-43c5-bf7a-c5c795f7d7e7.jpg" className="prodimg-seo"/>
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
              Remova com precisão as imperfeições em superfícies de madeira. A Plaina Elétrica é uma ferramenta indicada para trabalhos pesados e de maior duração. Faça menos esforço, com menor tempo de execução da tarefa e obtenha superfícies perfeitas e lineares.
              <br/>
              <p className="title-infos-tool">O produto</p>
              <b>Tensão: </b>127v
              <br/>
              <b>Potência: </b> 800w
              <br/>
              <b>Aliementação </b> Energia elétrica
              <br/>
              VAI COM 1 Serra
              </p>
              <p className="title-infos-tool">Uso indicado</p>
              <p className="text-parag">
                Madeira
              </p>
              <p className="text-diferent text-parag has-text-centered">Escolha a serra plaina perto de você e alugue online.</p>
              <button className="button color-logo is-fullwidth" onClick={event => goUsed('plaina')}>Escolher plaina</button>
              <br/>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Plaina;