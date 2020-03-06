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
import Rentruesblock from '../../Warnings/Rentrulesblock';
import NotAvailable from '../../Warnings/NotAvailable';
import moment from 'moment';
import Modal from '../../../components/Modal';
import Workaddress from '../Workadd/index';
import Scroll from '../../../utils/scroll';

const Rules = ({ history }) => {
  let values = queryString.parse(useLocation().search);
  const dispatch = useDispatch();
  const rentattempt = useSelector(state => state.rentattempt);
  const [tool, setTool] = useState([]);
  const [tension, setTension] = useState(values.tension);
  const [attempt, setAttempt] = useState([]);
  const [ok, setOk] = useState(true);
  const [okattempt, setOkAttempt] = useState(true);
  const [modal, setModal] = useState(false);
  const [namelessor, setNamelessor] = useState('')
  const [dataLessor, setDatalessor] = useState([]);

  useEffect(() => {
    async function loadRentattempt () {
      const response = await api.get(`rent/attempt/${values.rent_attempt}/${values.code_attempt}`, {
      });
      
      if (response.data.rentattempt.length > 0) {
        setAttempt(response.data.rentattempt[0]);
        setOkAttempt(true)
      } else {
        setOkAttempt(false)
      }
    }
    loadRentattempt();

    async function loadTool() { 
      const response = await api.get(`/tools_site/tool/${values.tool}`, {
      });
      if(response.data.tool.length > 0) {
        dispatch(Rentinfo(response.data.tool[0]));
        setTool(response.data.tool[0])
        loadLessor(response.data.tool[0].user_id)
        setOk(true)
      } else {
        setOk(false)
      }
    }
    loadTool();


    async function loadLessor(iduser) {      
      const response = await api.get(`/lessordata/${iduser}`, {
      });
      setDatalessor(response.data.user)
      setNamelessor(response.data.user[0])
    }

  }, [values.tool]);
 
  const hideModal = () => {
    setModal(false)
    return modal
  }
  
  const goRent = () => {
    if(!tool.tension.match(values.tension)){
      history.push('/ops');
    } else if (isNaN(parseInt(values.am))) {
      history.push('/ops');
    } else if (!moment(values.finish).isValid()) {
      history.push('/ops');
    } else if (!moment(values.init).isValid()) {
      history.push('/ops');
    } else {

      var attemptvalues = {
        user_lessor_id: tool.user_id,
        tool_id: tool.id,
        startdate: moment(values.init).format('YYYY-MM-DD'),
        enddate: moment(values.finish).format('YYYY-MM-DD'),
        tension: values.tension,
        days: rentattempt.days,
        amount: rentattempt.amount,
        period: rentattempt.period,
        price: rentattempt.price,
        cost: rentattempt.cost,
        priceperiod: rentattempt.priceperiod,
        freight: rentattempt.freight,
        accept: 0,
      }
      updateRentattempt(attemptvalues);
    }
  }

  async function updateRentattempt (attemptv) {
    await api.put(`rent/attempt/update/${attempt.id}`, attemptv, {})
    .then((res) => {
      verifyAvailabletool()
    }).catch((err) => {
      console.log(err.response)
    })  
  }

  async function verifyAvailabletool() { 
    const response = await api.get(`/tools_site/tool/${values.tool}`, {
    });
    if (response.data.tool[0].availability === 'Y') {
      Scroll()
      setModal(true)
    } else {
      history.push(`/?t=unavailable`);
    }
  }

  return (
    <>
      {
        modal === true ? 
        <Workaddress rent={attempt.id}/> : 
        (
          <div className="container">
          {
            okattempt === true && ok === true ? 
            (
              <>
                { 
                  tool.availability === "N" ?
                  (
                    <>
                        <NotAvailable/>
                    </>
                  )
                  :
                  (
                  <>
                    <br/><br/>
                    <div className="columns noppadding">
                      <div className="column">
                        <p className="title-tool-only">Politicas & Regras do aluguel </p>
                        <br/>
                      </div>
                    </div>
                    <div className="columns">
                      <div className="column is-two-thirds">
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
                        <div className="column has-centered-text">
                          <Rentalbox attempt={attempt} startDate={values.init} endDate={values.finish}></Rentalbox>
                        </div>
                      </div>
                    </div>
                    <div className="columns">
                      <div className="column">
                        <p className="title-infos-tool hack-padding-top">Do aluguel do equipamento</p>  
                        <div className="columns">
                          <div className="column">
                            <Ul>
                              <li className="therent">
                                {
                                  tool.contract === 'Y' ?
                                  (
                                    <p> - A { namelessor.name } <span>entrega</span> este equipamento para você não precisar sair de onde está.</p>
                                  )
                                  :
                                  (
                                    <p> - Você precisa buscar este equipamento.</p>
                                  )
                                }
                              </li>
                              <li className="therent">
                                {
                                  tool.contract === 'Y' ?
                                  (
                                    <p> - A { namelessor.name } <span>buscar</span> este equipamento no fim do período de aluguel.</p>
                                  )
                                  :
                                  (
                                    <p> - Você precisa devolver este equipamento no prazo final do seu aluguel.</p>
                                  )
                                }
                              </li>
                              <li className="therent">
                                {
                                  tool.contract === 'Y' ?
                                  (
                                    <p>
                                      - O <span>contrato</span> é totalmente digital. 
                                    </p>                                
                                  )
                                  :
                                  (
                                    <p>
                                      Este equipamento pode ser alugado sem contrato.
                                    </p>
                                  )
                                }
                              </li>
                            </Ul>
                          </div>
                        </div>
                      </div>
                    </div>
                    <Hr/>
                    <br/>
                    <div className="columns">
                      <div className="column is-3">
                        <Button 
                          type={'button'}
                          className={'button is-fullwidth is-pulled-left color-logo'}
                          text={'Prosseguir'}                                    
                          onClick={event => goRent()}
                        />
                      </div>
                    </div>                
                  </>
                  )
                }
              </>
            ):
            (
              <Rentruesblock/>
            ) 
          }
        </div>  
        )
      }   
    </>
  );
};

export default Rules;