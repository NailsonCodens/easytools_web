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
import Email from '../../../../utils/sendemail';
import ReactGA from 'react-ga';
import Scrool from '../../../../utils/scroll';
import moment from 'moment';
import 'moment/locale/pt-br';
import {Helmet} from 'react-helmet';
import {
  isMobile
} from "react-device-detect";
moment.locale('pt-BR');

const Paymentfinish = ({history}) => {
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


    async function showBottom () {
      //verificar mobile
      if (document.documentElement.scrollTop > -10) {
        setClass('bottom-box')
      }else{
        setClass('bottom-no-box')
      }
    }
    window.onscroll = () => showBottom()


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

    async function loadFreight (userid) {
      const response = await api.get(`/userconfig/${userid}`, {
      });
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

  async function sendNotification () {
    verifyAvailabletool()
  }

  const Tracking = (category, action, label) => {
    Scrool()
    ReactGA.event({
      category: category,
      action: action,
      label: label
    });
  }

  async function updateRentattemp () {
    var acq = ''
    var freightnew = '';

    if (acquisition === '') {
      acq = 'without';
    } else {
      acq = acquisition;
    }

    if (freight === '' || freight === 'without') {
      freightnew = 0
    } else {
      freightnew = renderCalc()
    }

    console.log(freightnew)

    var rentupdate = {
      finishprocess: 'y',
      startdate: rentattempt.startdate,
      enddate: rentattempt.enddate,
    }

    console.log(rentupdate)

    await api.put(`rent/attempt/updaterent/${rentattempt.id}`, rentupdate, {})
    .then((res) => {
      Tracking('Alugou, finalizou o processo', 'Alugou', 'processo final aluguel')
      sendNotification()
    }).catch((err) => {
    })
  }

  async function verifyAvailabletool() { 
    const response = await api.get(`/tools_site/tool/${rentattempt.tool_id}`, {
    });

    if (response.data.tool[0].availability === 'Y') {
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
    } else {
      history.push(`/?t=unavailable`);
    }
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
    return  parseFloat(rentattempt.freight)
  }

  return (
    <>
        <Helmet>
          <title>{ 'Pagamento' }</title>
        </Helmet>
        <div className="container">
      {
        okattempt === true ? 
        (
          <div className="columns">
            <div className="column is-two-thirds">
              <p className="title-tool-only"> Pagamento</p>
              <p className="title-tool-only-little">Informações importantes.</p>
              <br/>
              <ul>
                <li className="list-info-payment">Ao clicar em "alugar", nós receberemos o seu pedido e dentro de alguns minutos você receberá uma notificação via e-mail, site e app, aceitando seu aluguel.</li>
                <li className="list-info-payment">Logo após, você receberá algumas orientações sobre o equipamento alugado.</li>
                <li className="list-info-payment">Assim que o pagamento for identificado, o equipamento será entregue no seu endereço de uso.</li>
              </ul>
              <br/>
              <p className="aftercontineos">
                Antes de prosseguir, confira o equipamento, sua tensão e as datas escolhidas.
                <br/>
                Estando tudo certo, aceite e prossiga para finalizar o aluguel.
              </p>
              <br/><br/>
                <div className="columns">
                  <div className="column">
                    {
                      rentattempt.finishprocess === "y" ? 
                      (
                        <>
                        </>
                      )
                      :
                      ('')
                    }
                    <br/><br/>
                  </div>
                </div>
              <br/>
              {
                /* 
                                  <Label className="label-perfil" for={'check'}><b>Buscar equipamento ou Entregar neste endereço?</b></Label>
                  <CheckboxIOS 
                    onChange={handleCheckIOS}
                    name="marketing"
                    value={formik.values.marketing} 
                    bind="checksignup"
                    ch={true}
                    off="Entregar neste endereço" 
                    on="Buscar equipamento"
                  />
                  <Warningtext>
                    Você pode escolher entre buscar o equipamento com o vizinho, ou escolher a opção de entrega. 
                  </Warningtext>
                */
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
                rentattempt.freight > 0 ? 
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
                text={rentattempt.finishprocess === "y" ? 'Sendo processado' : 'Confirmar'}
                disabled={rentattempt.finishprocess === "y" ? true : false}                              
                onClick={event => paymentRent()}
              />
              {
                rentattempt.freight > 0 ? 
                (
                  <p className={ isMobile ? "is-pulled-left price-bottom" : "is-pulled-right price-bottom" }>
                    <IntlProvider locale="pt-br" timeZone="Brasil/São Paulo">
                      <b>Total: <FormattedNumber value={parseFloat(rentattempt.cost) + renderCalc()} style="currency" currency="BRL" /></b>
                    </IntlProvider>            
                  </p>
  
                )
                :
                ('')
              }
            </div>
          </div>
        </div>
      </div>
    </div>

    </>
  );
};

export default Paymentfinish;
