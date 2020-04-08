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
import ReactGA from 'react-ga';
import {Helmet} from 'react-helmet';
import Rentalbottombox from './Rentalbottombox';

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

  const Tracking = (category, action, label) => {
    Scroll()
    ReactGA.event({
      category: category,
      action: action,
      label: label
    });
  }

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
        month: rentattempt.month,
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
      Tracking('Prosseguiu para workaddress', 'Prosseguiu para workaddress', 'regras')
    } else {
      history.push(`/?t=unavailable`);
    }
  }

  return (
    <>
      <Helmet>
        <title>{ 'Políticas & Regras e pagamento' }</title>
      </Helmet>
      {
        modal === true ? 
        <Workaddress rent={attempt.id} /> : 
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
                    <div className="columns noppadding">
                      <div className="column">
                        <p className="title-tool-only">Politicas & Regras do aluguel </p>
                      </div>
                    </div>
                    <div className="columns">
                      <div className="column is-two-thirds">
                        <div className="columns noppadding">
                          <div className="column">
                            <p className="title-infos-tool hack-padding-top">Política de locação</p>
                            <Ul>
                              <b className="title-politics">Como funciona? </b>
                              <li> - Você aluga o equipamento desejado;</li>
                              <li> - Recebemos sua solicitação de aluguel; </li>
                              <li> - Enviamos a confirmação do seu aluguel, via email, junto à um link de pagamento; </li>
                              <li> - Equipamento locado, nós enviamos o contrato de locação via email. Tudo digital, chega de papel;</li>
                              <li><i class="explanation-rules">Todo o processo de aluguel se resolve em menos de 15 minuto. (Após os 5 primeiros alugueis).</i></li> 
                            </Ul>
                            {
                              /*
                                <br/>
                                <Ul>
                                  <b className="title-politics">Entrega</b>
                                  <li> - Depois do pagamento confirmado, nós entregamos o equipamento no local solicitado. </li>
                                  <li> - No ato da entrega, um chekout será feito para mantermos a qualidade dos equipamentos alugados.</li>
                                </Ul>
                                <br/>
                                <Ul>
                                  <b className="title-politics">Devolução</b>
                                  <li> - Fique atento ao dia de devolução. Nós notificaremos via e-mail, website e app, alguns dias antes de vencer o período contratado! </li>
                                  <li> - Nós faremos a busca do equipamento no local onde entregamos, na data final do período contratado.</li>
                                  <li>Neste momento, fazemos o check-in do equipamento para averiguação do estado do equipamento.</li>
                                </Ul>
                                <br/> 
                              */
                            }
                            <Ul>
                              <b className="title-politics">Prazos e períodos</b>
                              <li> - Respeitar os prazos e períodos contratados é a grande chave para nosso relacionamento;</li>
                              <li> - O período escolhido para usar o equipamento alugado começa a contar em D+1, ou seja: pediu dia 14, a contagem dos dias começa dia 15. </li>
                            </Ul>
                            <br/>
                            <p className="title-infos-tool hack-padding-top">Contrato de locação</p>
                            <Ul>
                              <b className="title-politics">Contrato on-line</b>
                              <li> - Apartir do momento em que você se cadastra na plataforma e aceita os termos de uso, você já acetia os termos do contrato de locação;</li>
                              <li> - Este contrato é disponibilizado a você de forma totalmente on-line, via e-mail; </li>
                            </Ul>
                            <br/>
                            {
                              /*
                                <br/>
                                <p className="title-infos-tool hack-padding-top">Pagamento</p>
                                <Ul>
                                  <b className="title-politics"> Pagamento online </b>
                                  <li> Para facilitar sua vida, nós enviamos um link de pagamento à você. </li>
                                  <li>Este link ficará acessível para você em sua conta no campo "Meus alugados ? Detalhes". Você também pode acessar este link pela notificação.</li>
                                </Ul>
                                <Ul>
                                  <b className="title-politics"> Parceria </b>
                                  <li> Somos o seu parceiro novo, com um novo jeito de alugar equipamentos para você ou seu negócio.</li>
                                </Ul>                              
                              */
                            }
                            </div>
                          </div>
                      </div>
                      <div className="column">
                        <div className="column has-centered-text">
                          <Rentalbox attempt={attempt} startDate={values.init} endDate={values.finish}></Rentalbox>
                        </div>
                      </div>
                    </div>
                    <div className="columns">
                      <div className="column">
                      </div>
                    </div>
                    <Hr/>
                    <br/>
                    <div className="columns">
                      <div className="column is-3">
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
      {
        modal === true ? 
        ('')
        :
        (
          <Rentalbottombox title={tool.title} go={goRent} attempt={attempt} startDate={values.init} endDate={values.finish} scroolView={-10}/>
        )
      }
    </>
  );
};

export default Rules;