import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Rentinfo } from '../../../store/actions/rentinfo';
import { Ul } from '../../../components/List';
import { Warningtext } from '../../../components/Warningtext';
import queryString from 'query-string';
import { useLocation } from 'react-router-dom';
import api from '../../../services/api';
import moment from 'moment';
import Rentalbox from './Rentalbox';
import Rentruesblock from '../../Warnings/Rentrulesblock';
  // eslint-disable-next-line
import preciseDiff from 'moment-precise-range-plugin';
import 'moment/locale/pt-br';
moment.locale('pt-BR');

const Renterules = ({history}) => {
  const dispatch = useDispatch();

  let values = queryString.parse(useLocation().search);

  // eslint-disable-next-line
  const [monthInit, setMonthinit] = useState(moment(values.init).format('MMM'));
  // eslint-disable-next-line
  const [dayInit, setDayinit] = useState(moment(values.init).format('dddd'));
  // eslint-disable-next-line
  const [daynumberInit, setDaynumberinit] = useState(moment(values.init).format('DD'));
  // eslint-disable-next-line
  const [monthFinish, setmonthFinish] = useState(moment(values.finish).format('MMM'));
  // eslint-disable-next-line  
  const [dayFinish, setFinish] = useState(moment(values.finish).format('dddd'));
  // eslint-disable-next-line  
  const [daynumberFinish, setnumberFinish] = useState(moment(values.finish).format('DD'));
  // eslint-disable-next-line  
  const [tension, setTension] = useState(values.tension);
  const [tool, setTool] = useState([]);

  const [ok, setOk] = useState(true);

  useEffect(() => {
    async function loadTool() { 
      const response = await api.get(`/tools_site/tool/${values.tool}`, {
      });

      if(response.data.tool.length > 0) {
        dispatch(Rentinfo(response.data.tool[0]));
        setTool(response.data.tool[0])
        setOk(true)
      } else {
        setOk(false)
      }
    }
    loadTool();


  }, [dispatch, values.tool]);

  return (
    <div className="container no-margin-top">
      {
        ok === true ? 
        (
          <>
            { 
              tool.availability === "N" ?
              (
                <>
                    <Rentruesblock/>
                </>
              )
              :
              (
              <>
                <div>
                  <p className="title-tool-only">Aluguel de { tool.title }</p>
                  <br/>
                  <Warningtext>* Confirmar o produto que você está prestes a alugar.</Warningtext>
                </div>
                <div className="columns">
                  <div className="column is-two-thirds">
                    <div className="columns">
                      <div className="column">
                        <div className="columns">
                          <div className="column">
                            <p className="sub-title">Aluguel</p>
                            <div className="box-date-rules is-pulled-left">
                              { daynumberInit }
                              <br/>
                              { monthInit }
                            </div>
                            <div className="name-data-rules is-pulled-left">
                              { dayInit }
                            </div>
                          </div>
                          <div className="column">
                            <p className="sub-title">Devolução</p>
                            <div className="box-date-rules is-pulled-left">
                              { daynumberFinish }
                              <br/>
                              { monthFinish }
                            </div>
                            <div className="name-data-rules is-pulled-left">
                              { dayFinish }
                            </div>
                          </div>
                        </div>
                        <div className="columns">
                          <div className="column">
                            <b className="tension-rules">Você está alugando um equipamento de tensão { tension }.</b>    
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

                      </div>
                    </div>
                  </div>
                  <div className="column">
                  <div className="column has-centered-text">
                    <Rentalbox startDate={values.init} endDate={values.finish}></Rentalbox>
                  </div>
                  </div>
                </div>

              </> 
              )
            }
          </>
        )
        :
        (
          <Rentruesblock/>
        )
      }

    </div>
  );
};

export default Renterules;