import React from 'react';
import '../../style.css';
import {Helmet} from 'react-helmet';
import Scrool from '../../../../../utils/scroll';
import ReactGA from 'react-ga';

const Marmore = ({history}) => {
  
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
        <title>Peça serra mármore (makitinha) | Caixa de ferramenta online</title>
        <meta name="title" content="Peça serra mármore | Caixa de ferramenta online"/>
        <meta name="description" content="Caixa de ferramenta online Em Curitiba serra mármore makitinha disponiveis para locação. Alugue serra mármore para cortar peças de ferro na construção civil e muito mais. Em Curitiba"/>
        <meta name="keywords" content="aluguel serra mármore,aluguel serra mármore,aluguel serra mármore,aluguel serra mármore em curitiba,serra mármore,cortar aço em curitiba,maktinha em curitiba, aluguel,serra mármore makita em curitiba"/>
        <meta name="robots" content="index,follow"/>
      </Helmet>

      <div className="container">
        <h3 className="title-index ti-cs">
          Serra mármore (Makitinha)
        </h3>
        <div className="columns">
          <div className="column">
            <div className="columns is-mobile is-desktop">
              <div className="column">
                <img  alt="tool" src="https://a.easytoolsapp.com/files/1596145946432_4a18fc93-e0ff-4bc4-9487-8da30105c1d5_c8fca955-e299-4f2a-b8ca-2422c54c5a7d.jpg" className="prodimg-seo"/>
              </div>
              <div className="column">
                <img alt="tool" src="https://a.easytoolsapp.com/files/1596145946891_4a18fc93-e0ff-4bc4-9487-8da30105c1d5_c8fca955-e299-4f2a-b8ca-2422c54c5a7d.jpg" className="prodimg-seo"/>
              </div>
              <div className="column">
                <img alt="tool" src="https://a.easytoolsapp.com/files/1596145946431_4a18fc93-e0ff-4bc4-9487-8da30105c1d5_c8fca955-e299-4f2a-b8ca-2422c54c5a7d.jpg" className="prodimg-seo"/>
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
                Serra mármore com medidas menores que outras serras, permitindo um melhor manuseio e maior habilidade. Seu design compacto aliado ao baixo peso diminui a fadiga e proporciona ao operador mais tempo de trabalho.
              <br/>
              <p className="title-infos-tool">O produto</p>
              <b>Tensão: </b>127v
              <br/>
              <b>Potência: </b> 800w
              <br/>
              <b>Aliementação </b> Energia elétrica
              <br/>
              *** ACOMPANHA UM DISCO DE CORTE! ***
              </p>
              <p className="title-infos-tool">Uso indicado</p>
              <p className="text-parag">
              Corte de parede, mármore, pisos.
              </p>
              <br/>
              <p className="text-diferent text-parag has-text-centered">Escolha serra mármore makitinha perto de você e alugue online.</p>
              <button className="button color-logo is-fullwidth" onClick={event => goUsed('martelete')}>Escolher serra mármore</button>
              <br/>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Marmore;