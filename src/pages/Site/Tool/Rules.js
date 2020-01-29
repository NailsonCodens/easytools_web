import React, { useState, useEffect } from 'react';
import Lessor from './Lessor';
import { Ul } from '../../../components/List';
import { Hr } from '../../../components/Hr';
import { Button } from '../../../components/Form/Button';
import Rentalbox from './Rentalbox';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';
import { useDispatch, useSelector } from "react-redux";
import { Rentinfo } from '../../../store/actions/rentinfo';
import api from '../../../services/api';
import localForage from "localforage";
import { Warningtext } from '../../../components/Warningtext';

const Rules = () => {
  let values = queryString.parse(useLocation().search);
  const dispatch = useDispatch();
  const infochoose = useSelector(state => state.rentaltool);
  const [tool, setTool] = useState([]);
  const [tension, setTension] = useState();

  useEffect(() => {
    async function loadTool() { 
      const response = await api.get(`/tools_site/tool/${values.tool}`, {
      });

      if(response.data.tool.length > 0) {
        dispatch(Rentinfo(response.data.tool[0]));
        setTool(response.data.tool[0])
      }
    }
    loadTool();

    async function loadInfochoose() {
      if (infochoose.startDate !== undefined) {
        setTension(infochoose.tension)
      } else {
        localForage.getItem('infochoose').then(info => {
          setTension(info.tension)
        })
      }
    }
    loadInfochoose()

  }, [dispatch, values.tool]);

  const goRent = () => {
    alert('aqui vai pedir o endereço da obra')
    console.log('asdsad')
  }

  return (
    <div className="container">
      <br/><br/>
      <p className="title-tool-only">Locador, Politicas & Regras e Pagamento </p>
      <br/>
      <div className="columns">
        <div className="column is-two-thirds">
          <Lessor/>
        </div>
        <div className="column">
          <div className="column has-centered-text">
            <Rentalbox startDate={values.init} endDate={values.finish}></Rentalbox>
          </div>
        </div>
      </div>
      <Hr/>
      <br/>
      <div className="columns">
        <div className="column is-two-thirds">
        <p className="title-tool-only">Atenção! Regra do aluguel.</p>
          <br></br>
          <p className="title-infos-tool hack-padding-top">Política de locação</p>
          <Ul>
            <b className="title-politics">Prazos e períodos</b>
            <li> - O prazo para o locatário aceitar sua solicitação é de 1 hora;</li>
            <li> - O período escolhido para usar o equipamento dejado começa a contar em D+1, ou seja, pediu dia 14, a contagem dos dias começa dia 15; </li>
            <b className="title-politics">Devolução</b>
            <li> - É muito importante devolver a ferramenta no dia previsto, caso isto não seja feito, a plataforma continuará contabilizando os dias a mais; </li>
            <b className="title-politics">Cancelamentos</b>
          </Ul>
          <br/>
          <p className="title-infos-tool hack-padding-top">Contrato de locação</p>
          <Ul>
            <b className="title-politics">Prazos e períodos</b>
            <li> - O prazo para o locatário aceitar sua solicitação é de 1 hora;</li>
            <li> - O período escolhido para usar o equipamento dejado começa a contar em D+1, ou seja, pediu dia 14, a contagem dos dias começa dia 15; </li>
            <b className="title-politics">Devolução</b>
            <li> - É muito importante devolver a ferramenta no dia previsto, caso isto não seja feito, a plataforma continuará contabilizando os dias a mais; </li>
            <b className="title-politics">Cancelamentos</b>
            <li> - Cancelamento gratuíto em até 24 horas Depois disto, recolheremos uma taxa de 10% do valor do equipamento;</li>
          </Ul>
          <br/>
          <p className="title-infos-tool hack-padding-top">Pagamento</p>
          <Ul>
            <b className="title-politics">Prazos e períodos</b>
            <li> Como vai funcionar o pagamento</li>
          </Ul>
        </div>
        <div className="column">
        </div>
      </div>
      <div className="columns">
        <div className="column is-3">
          <Button 
            type={'button'}
            className={'button is-fullwidth is-pulled-left color-logo'}
            text={'Alugar'}                                    
            onClick={event => goRent()}
          />
        </div>
      </div>
    </div>
  );
};

export default Rules;