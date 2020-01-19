import React from 'react';
import { Ul } from '../../../components/List';
import queryString from 'query-string';
import { useLocation } from 'react-router-dom';

const Renterules = ({history}) => {
  let values = queryString.parse(useLocation().search);
  console.log(values)
  
  return (
    <div className="container">
      <div>
        <p className="title-tool-only">Regras do aluguel</p>
      </div>
      <div className="columns">
        <div className="column is-two-thirds">
          <div className="columns">
            <div className="column">
              <div className="columns">
                <div className="column">
                  <div className="box-date-rules is-pulled-left">
                    8
                    <br/>
                    Jan
                  </div>
                  <div className="name-data-rules is-pulled-left">
                    Quarta-feira
                  </div>
                </div>
                <div className="column">
                  <div className="box-date-rules is-pulled-left">
                    17
                    <br/>
                    Jan
                  </div>
                  <div className="name-data-rules is-pulled-left">
                    Segunda-feira
                  </div>
                </div>
              </div>
              <div className="columns">
                <div className="column">
                  <b className="tension-rules">Tensão 127V</b>                  
                </div>
              </div>
            </div>
          </div>
          <div className="columns">
            <div className="column">
              <p className="title-infos-tool hack-padding-top">Política de locação</p>
              <Ul>
                <b className="title-politics">Prazos e períodos</b>
                <li> - O prazo para o locatário aceitar sua solicitação é de 1 hora;</li>
                <li> - O período escolhido para usar o equipamento dejado começa a contar em D+1, ou seja, pediu dia 14, a contagem dos dias começa dia 15; </li>
                <b className="title-politics">Devolução</b>
                <li> - É muito importante devolver a ferramenta no dia previsto, caso isto não seja feito, a plataforma continuará contabilizando os dias a mais; </li>
                <b className="title-politics">Cancelamentos</b>
                <li> - Cancelamento gratuíto em até 24 horas Depois disto, recolheremos uma taxa de 10% do valor do equipamento;</li>
              </Ul>
            </div>
          </div>
        </div>
        <div className="column">
        <div className="column has-centered-text">
          <div className="rental-box">
            <p className="title-tool-rules">Serra tico tico à bateria 12V corte máximo de 65 mm Sem Bateria - JV100DZ</p>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default Renterules;