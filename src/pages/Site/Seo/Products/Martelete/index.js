import React from 'react';
import '../../style.css';
import {Helmet} from 'react-helmet';
import Scrool from '../../../../../utils/scroll';
import ReactGA from 'react-ga';

const Martelete = ({history}) => {
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
        <title>Peça martelete 3k | Caixa de ferramenta online</title>
        <meta name="title" content="Caixa de ferramenta online Peça martelete 3k | Caixa de ferramenta online"/>
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
                <img  alt="tool" src="https://a.easytoolsapp.com/files/1595869732164_4a18fc93-e0ff-4bc4-9487-8da30105c1d5_e497a705-a979-4e5e-a5b1-a20251b84caa.jpg" className="prodimg-seo"/>
              </div>
              <div className="column">
                <img alt="tool" src="https://a.easytoolsapp.com/files/1595869732905_4a18fc93-e0ff-4bc4-9487-8da30105c1d5_e497a705-a979-4e5e-a5b1-a20251b84caa.jpg" className="prodimg-seo"/>
              </div>
              <div className="column">
                <img alt="tool" src="https://a.easytoolsapp.com/files/1595869732221_4a18fc93-e0ff-4bc4-9487-8da30105c1d5_e497a705-a979-4e5e-a5b1-a20251b84caa.jpg" className="prodimg-seo"/>
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
              O martelete é desenvolvido com componentes de qualidade que aumentam a vida útil do equipamento e possui sistema que permite maior poder de perfuração com um esforço bem menor por parte do operador.
              O martelete oferece maior controle sobre a ferramenta pois conta com Vario-Lock para o ajuste dos ponteiros e embreagem de segurança contra sobrecarga e velocidade variável.
              <br/>
              <p className="title-infos-tool">O produto</p>
              <b>Tensão: </b>127v
              <br/>
              <b>Potência: </b> 800w
              <br/>
              <b>Aliementação </b> Energia elétrica
              <br/>
              **** ACOMPANHA 5 BROCAS
              </p>
              <p className="title-infos-tool">Uso indicado</p>
              <p className="text-parag">
              Concreto, vigas, paredes, piso, madeira.
              </p>
              <br/>
              <p className="text-diferent text-parag has-text-centered">Escolha martelete perto de você e alugue online.</p>
              <button className="button color-logo is-fullwidth" onClick={event => goUsed('martelete')}>Escolher martelete</button>
              <br/>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Martelete;