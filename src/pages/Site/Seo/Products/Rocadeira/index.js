import React from 'react';
import '../../style.css';
import {Helmet} from 'react-helmet';
import Scrool from '../../../../../utils/scroll';
import ReactGA from 'react-ga';

const Rocadeira = ({history}) => {
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
        <title>Peça roçadeira | Caixa de ferramenta online</title>
        <meta name="title" content="Peça Roçadeira | Caixa de ferramenta online"/>
        <meta name="description" content="Caixa de ferramenta online Em Curitiba e região é preciso ter roçadeiras disponiveis para locação. Na EasyTools você pode locar e usar, permitindo assim uma grama pequena e gostosa para usar. Alugue roçadeiras com lâminas, e nylon para cortar mato e grama. Em Curitiba"/>
        <meta name="keywords" content="aluguel roçadeira à gasolina,roçadeira à gasolina,aluguel roçadeira à gasolina,aluguel roçadeira em curitiba,roçar,roçar mato em curitiba,roçar grama em curitiba, aluguel,roçadeira em curitiba, roçadeira lâmina em curitiba, roçadeira nylon em curitiba, roçadeira still em curitiba, roçadeira toyama em curitiba"/>
        <meta name="robots" content="index,follow"/>
      </Helmet>

      <div className="container">
        <h3 className="title-index ti-cs">
          Roçadeiras à gasolina lâmina ou nylon
        </h3>
        <div className="columns">
          <div className="column">
            <div className="columns is-mobile is-desktop">
              <div className="column">
                <img alt="tool" src="https://a.easytoolsapp.com/files/1595861729218_4a18fc93-e0ff-4bc4-9487-8da30105c1d5_1ced70f3-3448-4a11-9372-add6824f9d46.jpg" className="prodimg-seo"/>
              </div>
              <div className="column">
                <img alt="tool" src="https://a.easytoolsapp.com/files/1595861303256_4a18fc93-e0ff-4bc4-9487-8da30105c1d5_acba0e9c-175b-4f8a-b732-bdf7ad9aa675.jpg" className="prodimg-seo"/>
              </div>
              <div className="column">
                <img alt="tool" src="https://a.easytoolsapp.com/files/1595861303041_4a18fc93-e0ff-4bc4-9487-8da30105c1d5_acba0e9c-175b-4f8a-b732-bdf7ad9aa675.jpg" className="prodimg-seo"/>
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
              A roçadeira é o equipamento ideal para limpeza de gramados e jardins, ervas daninhas e capim alto.
              Possui um cabo ajustável, conseguindo adaptar a altura do usuário, para um melhor manuseio da máquina. Também possui a versatilidade de escolher entre o fio de corte e a lâmina, aumentando a gama de trabalhos em que pode ser utilizada.
              Também como diferencial, possui o sistema de arranque ElastoStart, que proporciona um arranque mais suave e com esforço reduzido.
              <br/>
              <p className="title-infos-tool">O produto</p>
              <b>Potência: </b> 6500 rpm
              <br/>
              <b>Aliementação </b> Gasolina ou Elétrica
              <br/>
              Com lâmina ou nylon. (01) Colete ergonômico profissional - (01) Lâmina de duas pontas - (01) Carretel de fio de nylon (cabeçote)

              </p>
              <p className="title-infos-tool">Uso indicado</p>
              <p className="text-parag">
                Jardinagem em geral, Roçada.
              </p>
              <br/>
              <p className="text-diferent text-parag has-text-centered">Escolha a roçadeira perto de você e alugue online.</p>
              <button className="button color-logo is-fullwidth" onClick={event => goUsed('roçadeira')}>Escolher roçadeira</button>
              <br/>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Rocadeira;