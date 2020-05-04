import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Button } from '../../../../components/Form/Button';
import api from '../../../../services/api';
import socketio from '../../../../services/socketio';
import queryString from 'query-string';
import Rentruesblock from '../../../Warnings/Rentrulesblock';
import NotAvailable from '../../../Warnings/NotAvailable';
import { useParams, useLocation } from "react-router-dom";
import { Rentinfo } from '../../../../store/actions/rentinfo';
import {IntlProvider, FormattedNumber} from 'react-intl';
import { Warningtext } from '../../../../components/Warningtext';
import { Field, Label } from '../../../../components/Form/Form';
import Mapbox from '../../../../components/Map/Mapbox';
import Paymentme from './paymentme';
import { Ul } from '../../../../components/List';
import ReactGA from 'react-ga';
import Scroll from '../../../../utils/scroll';
import {Helmet} from 'react-helmet';
import Rentalbottombox from '../Rentalbottombox';
import moment from 'moment';
import Email from '../../../../utils/sendemail';

import {
  isMobile
} from "react-device-detect";
import 'moment/locale/pt-br';
moment.locale('pt-BR');

const Payment = ({history}) => {
  const [rentattempt, setRentattemp] = useState([]);
  const [ok, setOk] = useState(true);
  const [okattempt, setOkAttempt] = useState(true);
  const [tool, setTool] = useState([]);
  const [start, setStart] = useState([]);
  const [end, setEnd] = useState([]);
  const [freight, setFreight] = useState('');
  const [acquisition, setAcquisition] = useState('');
  const [userconfig, setUserconfig] = useState([]);
  const [workadd, setWorkadd] = useState([]);
  const [valuewithfreigh, setValuewithfreigh] = useState(0);
  const [setclass, setClass] = useState('bottom-no-box');

  let values = queryString.parse(useLocation().search);
  const dispatch = useDispatch();
  const current_user = useSelector(state => state.auth);
  useEffect(() => {
    async function loadRentattempt () {
      const response = await api.get(`rent/attempt/${values.rent_attempt}/${values.code_attempt}`, {
      });

      if (response.data.rentattempt.length > 0) {
        loadWorkadduser(response.data.rentattempt[0].id, response.data.rentattempt[0].tool.lat, response.data.rentattempt[0].tool.lng)  
        setRentattemp(response.data.rentattempt[0]);

        setStart(moment(response.data.rentattempt[0].startdate).format('DD/MM/YYYY'));
        setEnd(moment(response.data.rentattempt[0].enddate).format('DD/MM/YYYY'));
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
      loadFreight(response.data.tool[0].user_id)
    }
    loadTool();

    async function showBottom () {
      //verificar mobile
      if (document.documentElement.scrollTop > -10) {
        setClass('bottom-box')
      }else{
        setClass('bottom-no-box')
      }
    }
    window.onscroll = () => showBottom()


    async function loadFreight (userid) {
      const response = await api.get(`/userconfig/${userid}`, {
      });
      setFreight('with')
      setUserconfig(response.data.userconfig[0]) 
    }

    async function loadWorkadduser (rentid, lat, lng) {
      const responseworkadd = await api.get(`/workadd/${rentid}?lat=${lat}&lng=${lng}`, {
      });

      setWorkadd(responseworkadd.data.workadd[0])
    }

    return () => {
    };
  }, [current_user])

  const paymentRent = () => {
    updateRentattemp()
  }

  const Tracking = (category, action, label) => {
    Scroll()
    ReactGA.event({
      category: category,
      action: action,
      label: label
    });
  }

  async function sendNotification () {
    verifyAvailabletool()
  }


  async function verifyAvailabletool() { 
    const response = await api.get(`/tools_site/tool/${rentattempt.tool_id}`, {
    });

    var titletool = rentattempt.tool.title
    var lessor = rentattempt.userlessor.name
    var renter = rentattempt.userrenter.name
    var tension = rentattempt.tension
    var startdate = moment(rentattempt.startdate).format('DD/MM/YYYY');
    var enddate = moment(rentattempt.enddate).format('DD/MM/YYYY');
    var title = `${renter} alugou seu equipamento`;
    var message = `Olá ${lessor}, ${renter} alugou sua ${titletool} com tensão em ${tension} para o período de ${startdate} á ${enddate}.`;
    var maintext = 'Oba, aluguel novo!'
    var urllabel = "Ver aluguel"  

    var notification = {
      rent_attempt_id: rentattempt.id,
      user_recipient_id: rentattempt.user_lessor_id,
      message: message,
      title: title
    }

    Email(rentattempt.user_lessor_id, title, message, urllabel, maintext);

    await api.post('/notifications/send', notification, {})
    .then((res) => {
      socketio.emit('notify',{ 
        to : rentattempt.user_lessor_id,
        title: title,
        message : message
      });
      
      history.push(`/s/payment/congrats/${rentattempt.id}`);
    }).catch((err) => {
      console.log(err.response)
    }) 
  }

  async function updateRentattemp () {
    var acq = ''
    var freightnew = '';

    if (acquisition === '') {
      acq = 'with';
    } else {
      acq = acquisition;
    }

    if (freight === '' || freight === 'without') {
      freightnew = 0
    } else {
      freightnew = renderCalc()
    }

    var rentupdate = {
      freight: parseFloat(freightnew.toFixed(2)),
      startdate: rentattempt.startdate,
      enddate: rentattempt.enddate,
      acquisition: acq,
      finishprocess: 'y'
    }

    console.log(rentupdate)

    await api.put(`rent/attempt/updaterent/${rentattempt.id}`, rentupdate, {})
    .then((res) => {
      Tracking('Finalizaou', 'Finalizou', 'entrega e finish')
      verifyAvailabletool()
      //history.push(`/s/payment/rent-paymentfinish?rent_attempt=${values.rent_attempt}&tool=${values.tool}&code_attempt=${values.code_attempt}`)      
    }).catch((err) => {
      console.log(err.response)
    })
  }

  const handleFreight = (event) => {
    setFreight(event.target.value)
    setAcquisition(event.target.value)
  }

  const renderPrice = () => {
    var text = ''
    var days = rentattempt.days
    var weekend = 1
    var months = rentattempt.amountmonth


    if (rentattempt.period === 'days') {
      text = ` x ${days} Dia(s)`
    }

    if (rentattempt.period === 'weekend') {
      text = ` por ${weekend} Semana`
    }
    
    if (rentattempt.period === 'biweekly') {
      text = ` por ${days} Dias`
    }

    if (rentattempt.period === 'month') {

      if (rentattempt.period === 'month' && rentattempt.days === 1) {
        text = ` por ${days} Mês`
      } else {
        if (rentattempt.days > 15 && rentattempt.days <= 31) {
          text = ` por 1 Mês`
        }else {
          text = ` x ${days} Mêses`
        }
      }
    }
    return text
  }

  const renderCalc = () => {

    var kmregional = 5

    var freight = '';
    var minfreight = '';

    if (userconfig !== undefined) {
      freight = userconfig.freight !== undefined ? parseFloat(userconfig.freight.replace(/\./gi,'').replace(/,/gi,'.')) : 1;
      minfreight = userconfig.freight !== undefined ? parseFloat(userconfig.min.replace(/\./gi,'').replace(/,/gi,'.')) : 30;
    } else {
      freight = 1;
      minfreight = 30;
    }
    var kmcurrent = workadd.distance;
    var costfreight = 0;

    console.log(kmcurrent, freight, minfreight)

    if (kmregional > kmcurrent) {
        costfreight  = minfreight
    } else {
        costfreight = freight * kmcurrent;
    }

    /* Promoção de entrega a 15 reais */
//    costfreight = 15;

    return costfreight
  }

  return (
    <>
        <Helmet>
          <title>{ 'Entrega e custo' }</title>
        </Helmet>
        <div className="container">
      {
        okattempt === true ? 
        (
          <div className="columns">
            <div className="column is-two-thirds">
              <p className="title-tool-only"> Estamos quase lá!</p>
              {
                /*
                    <p className="title-tool-only-little">
                      Escolha de que forma você deseja obter o equipamento.
                    </p>
                */
              }
              <div className="columns">
                <div className="column">
                  <Field>
                      {
                        /*
                          <input 
                            className="is-checkradio"
                            type="radio"
                            id={'without'}
                            name="freight" 
                            value="without"
                            onChange={event => handleFreight(event)}
                          />
                          <Label for={'without'}>Buscar equipamento</Label>
                        */
                      }
                      { 
                      //adicionar aqui clausula que verifica onde a ferramenta está, e o endereço passado na seção anterior para 
                      //ver se abre o campo de receber o equipamento.
                      tool.delivery === 'Y' ? 
                      (
                        <>
                          {
                            /*
                            <input 
                              className="is-checkradio"
                              id="with"
                              type="radio" 
                              name="freight"
                              value="with"
                              defaultChecked={true}
                              onChange={event => handleFreight(event)}
                            />
                            <Label for={'with'}>Receber equipamento</Label>
                            */
                          }
                        </>
                      )
                      :
                      (
                        <>
                          <br/><br/>
                          <b>* Este vizinho não entrega o equipamento, você precisa buscar.</b>
                        </>
                      )
                    }
                  </Field>
                </div>
              </div>
              {
                freight === 'with' ? 
                (
                  <>
                    <p className="title-tool-only-little"> Delivery do equipamento </p>
                    <Warningtext>
                      Você receberá o equipamento, no endereço de uso informado.
                    </Warningtext>
                    <br/>
                    <span className="valuefreight">Taxa do delivery: </span>
                    <IntlProvider locale="pt-br" timeZone="Brasil/São Paulo">
                      <b><FormattedNumber value={renderCalc()} style="currency" currency="BRL" /></b>
                    </IntlProvider>
                    <br/><br/> 
                    <Ul>
                      <li> - Depois do pagamento confirmado, nós entregamos o equipamento no local solicitado em até 2 horas. </li>
                      <li> - No ato da entrega, um chekout será feito para mantermos a qualidade dos equipamentos alugados.</li>
                    </Ul>
                  </>
                )
                :
                (
                  <>
                    <div className="columns">
                      <div className="column">
                        {
                          /*
                            <b>* Após confirmarmos o pagamento, você receberá o endereço para buscar o equipamento.</b>
                          */
                        }
                        {
                          /*
                            <p className="title-infos-tool hack-padding-top">Localização do equipamento ({ tool.title })</p>                          
                          */
                        }
                        {
                        tool.lat !== undefined && tool.lng !== undefined ? 
                        (
                          <>
                            {
                              /*
                                <Mapbox lat={tool.lat} lng={tool.lng} url={tool.picture1} title={tool.title}/>                                                 
                              */ 
                            }
                          </>
                        )
                        : 
                        (
                          ''
                        )
                        }
                      </div>
                    </div>
                  </>
                )
              }
            </div>
            <div className="column">
              <div className="rental-box">
                <div className="columns is-desktop is-mobile">
                  <div className="column">
                    <img src={tool.picture1} alt={tool.picture1} className="" />
                  </div>
                  <div className="column">
                    <img src={tool.picture2} alt={tool.picture2} className="" />
                  </div>
                  <div className="column">
                    <img src={tool.picture3} alt={tool.picture3} className="" />
                  </div>
                </div>
                <p className="title-tool-rules">{ tool.title }</p>
                <b className="category">{ tool.category }</b>
                <div className="columns">
                  <div className="column">
                    <b> Aluguel </b> { start }
                  </div>
                </div>
                <div className="columns no-margin-top-columns dates-payment">
                  <div className="column">
                    <b> Devolução </b> { end }                    
                  </div>
                </div>
                <div className="columns is-mobile no-margin-top-columns dates-payment">
                  <div className="column">
                    Tensão equip
                  </div>
                  <div className="column">
                    <div className="is-pulled-right">
                      { rentattempt.tension === 'Tri' ? 'Trifásico' : rentattempt.tension }
                    </div>  
                  </div>  
              </div>
                <div className="columns is-mobile no-margin-top-columns dates-payment">
                  <div className="column">
                  <IntlProvider locale="pt-br" timeZone="Brasil/São Paulo">
                    <FormattedNumber value={rentattempt.priceperiod} style="currency" currency="BRL" />
                    {
                      renderPrice()
                    }
                  </IntlProvider>
                  </div>
                  <div className="column is-6">
                    <p className="is-pulled-right">
                      <IntlProvider locale="pt-br" timeZone="Brasil/São Paulo">
                        <FormattedNumber value={rentattempt.price} style="currency" currency="BRL" />
                        { 
                          rentattempt.amount === undefined ? 'x 1 UN' : `x ${rentattempt.amount} UN` 
                        }
                      </IntlProvider>            
                    </p>
                  </div>
                </div>
              <div className="columns is-mobile no-margin-top-columns">
                <div className="column">
                  <b>Total</b>
                </div>
                <div className="column">
                  <p className="is-pulled-right">
                    <IntlProvider locale="pt-br" timeZone="Brasil/São Paulo">
                      <b><FormattedNumber value={rentattempt.cost} style="currency" currency="BRL" /></b>
                    </IntlProvider>            
                  </p>
                </div>
              </div>
              {
                freight === 'with' ? 
                (
                  <div className="columns is-mobile no-margin-top-columns">
                    <div className="column">
                      <b>Total com frete</b>
                    </div>
                    <div className="column">
                      <p className="is-pulled-right">
                        <IntlProvider locale="pt-br" timeZone="Brasil/São Paulo">
                          <b><FormattedNumber value={parseFloat(rentattempt.cost) + renderCalc()} style="currency" currency="BRL" /></b>
                        </IntlProvider>            
                      </p>
                    </div>
                  </div>
                )
                :
                ('')
              }
              <div className="columns">
                <div className="column">
                  <br/><br/>
                </div>
              </div>
              </div>
            </div>
          </div>
        )
        :
        (
          <Rentruesblock/>
        )
      }
    </div>
    <div className={setclass}>
      <div className="columns">
        {
          isMobile ?
          ('')
          :
          (
            <>
              <div className="column is-hidden-bottom">
                <p>Aluguel de <span className="titlerentbox">{ tool.title }</span></p>
              </div>
            </>
          ) 
        }
        <div className="column">
          <div className="columns is-mobile">
            <div className="column">
              <Button 
                type={'button'}
                className={'button is-pulled-right bt-bottom color-logo'}
                disabled={rentattempt.finishprocess === "y" ? true : false}  
                text={rentattempt.finishprocess === "y" ? 'Sendo processado' : 'Confirmar e alugar'}
                onClick={event => paymentRent()}
              />
              <p className={ isMobile ? "is-pulled-left price-bottom" : "is-pulled-right price-bottom" }>
                <IntlProvider locale="pt-br" timeZone="Brasil/São Paulo">
                  <b>Total: <FormattedNumber value={parseFloat(rentattempt.cost) + renderCalc()} style="currency" currency="BRL" /></b>
                </IntlProvider>            
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Payment;
