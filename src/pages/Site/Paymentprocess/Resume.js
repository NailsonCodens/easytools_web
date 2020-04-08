import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Rentinfo } from '../../../store/actions/rentinfo';
import { Warningtext } from '../../../components/Warningtext';
import queryString from 'query-string';
import { useLocation } from 'react-router-dom';
import api from '../../../services/api';
import moment from 'moment';
import Rentalbox from './Rentalbox';
import Rentruesblock from '../../Warnings/Rentrulesblock';
import NotAvailable from '../../Warnings/NotAvailable';
import localForage from "localforage";
import { Button } from '../../../components/Form/Button';
import Scrool from '../../../utils/scroll';
import ReactGA from 'react-ga';
import 'moment/locale/pt-br';
import {Helmet} from 'react-helmet';
import Rentalbottombox from './Rentalbottombox';
moment.locale('pt-BR');

const Resume = ({history}) => {
  const dispatch = useDispatch();
  const infochoose = useSelector(state => state.rentaltool);
  const rentattempt = useSelector(state => state.rentattempt);

  let values = queryString.parse(useLocation().search);

  // eslint-disable-next-line
  const [startDate, setStartdate] = useState(values.init);
  // eslint-disable-next-line  
  const [endDate, setFinishdate] = useState(values.finish);
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
  const [okattempt, setOkAttempt] = useState(true);

  const [attempt, setAttempt] = useState([]);

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
        setOk(true)
      } else {
        setOk(false)
      }
      return 
    }
    loadTool();

  }, [dispatch, values.tool]);

  const Tracking = (category, action, label) => {
    Scrool()
    ReactGA.event({
      category: category,
      action: action,
      label: label
    });
  }

  async function verifyAvailabletool() { 
    const response = await api.get(`/tools_site/tool/${values.tool}`, {
    });
    if (response.data.tool[0].availability === 'Y') {
      Tracking('Prosseguiu e foi para as regras', 'Prosseguiu para as regras', 'resume')
      history.push(`/s/payment/rent-rules?rent_attempt=${values.rent_attempt}&init=${values.init}&finish=${values.finish}&tool=${values.tool}&am=${values.am}&tension=${values.tension}&code_attempt=${values.code_attempt}`)
    } else {
      history.push(`/?t=unavailable`);
    }
  }

  const goRules = () =>{
    //corrgiri e fazer salvar no banco os dados da tentiva de aluguel
    Scrool(0,0)
   
    if(!tool.tension.match(values.tension)){
      history.push('/ops');
    } else if (isNaN(parseInt(values.am))) {
      history.push('/ops');
    } else if (!moment(values.finish).isValid()) {
      history.push('/ops');
    } else if (!moment(values.init).isValid()) {
      history.push('/ops');
    } else {
      verifyAvailabletool()
    }
  }

  return (
    <>
    <Helmet>
      <title>{ 'Resumo de aluguel de' + tool.title }</title>
    </Helmet>
    <div className="container no-margin-top">
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
                <div className="padding-pages-intern">
                  <div className="column nopadding">
                    <div className="column">
                      <p className="title-tool-only">Aluguel de { tool.title }</p>
                      <br/>
                      <Warningtext>* Revise e confirme o equipamento/ferramenta que você está alugando.</Warningtext>
                    </div>
                  </div>
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
                          <br/><br/>
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
                        <br/><br/>
                        <div className="columns nopadding">
                          <div className="column">
                            <b className="tension-rules">Você está alugando um equipamento de tensão { tension === 'Tri' ? 'Trifásico' : tension }.</b>    
                          </div>
                        </div>
                        <div className="columns nopadding">
                          { console.log(tool) }
                          <div className="column">
                            <p><b>Marca</b>: { tool.brand }</p>
                            <p><b>Categoria</b>: { tool.category }</p>
                            <p><b>Tipo</b>: { tool.type_spec }</p>
                            <p><b>Acessórios: </b>: { tool.accessory !== '' ? tool.accessory : 'Nenhum acessório disponível.'  }</p>
                          </div>
                          <div className="column">
                            <p><b>Potência</b>: { tool.power }</p>
                            <p><b>Tensão</b>: { tension === 'Tri' ? 'Trifásico' : tension }</p>
                            <p><b>Alimentação</b>: { tool.feed }</p>
                            <p><b>Acompanha</b>: { tool.follow !== '' ? tool.follow : 'Não disponível' }</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="column">
                  <div className="column has-centered-text">
                    <div  className={``}>
                      <Rentalbox attempt={attempt} startDate={values.init} endDate={values.finish}></Rentalbox>
                    </div>
                  </div>
                  </div>
                </div>
                <div className="columns">
                </div>
                <br/>
                <br/>
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
      <Rentalbottombox title={tool.title} go={goRules} attempt={attempt} startDate={values.init} endDate={values.finish} scroolView={-10}/>
    </>
  );
};

export default Resume;