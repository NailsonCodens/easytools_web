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
import localForage from "localforage";
import { Button } from '../../../components/Form/Button';
import Scrool from '../../../utils/scroll';
  // eslint-disable-next-line
import preciseDiff from 'moment-precise-range-plugin';
import 'moment/locale/pt-br';
moment.locale('pt-BR');

const Resume = ({history}) => {
  const dispatch = useDispatch();
  const infochoose = useSelector(state => state.rentaltool);

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
  const [tension, setTension] = useState();
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

  const goRules = () =>{
    //corrgiri e fazer salvar no banco os dados da tentiva de aluguel
    Scrool(0,0)
    history.push(`/s/rent-rules?rent-attempt=31231232324343&init=${values.init}&finish=${values.finish}&tool=${values.tool}`)
  }

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
                  <br/><br/><br/><br/>
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
                            <b className="tension-rules">Você está alugando um equipamento de tensão { tension === 'Tri' ? 'Trifásico' : tension }.</b>    
                          </div>
                        </div>
                        <div className="columns">
                          <div className="column">
                            <p><b>Marca</b>: { tool.brand }</p>
                            <p><b>Categoria</b>: { tool.category }</p>
                            <p><b>Tipo</b>: { tool.type_spec }</p>
                          </div>
                          <div className="column">
                            <p><b>Potência</b>: { tool.power }</p>
                            <p><b>Tensão</b>: { tool.category }</p>
                            <p><b>Alimentação</b>: { tool.type_spec }</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="column">
                  <div className="column has-centered-text">
                    <Rentalbox startDate={values.init} endDate={values.finish}></Rentalbox>
                  </div>
                  </div>
                </div>
                <div className="columns">
                  <div className="column is-3">
                    <Button 
                      type={'button'}
                      className={'button is-fullwidth is-pulled-left color-logo'}
                      text={'Prosseguir'}                                    
                      onClick={event => goRules()}
                    />
                  </div>
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
  );
};

export default Resume;