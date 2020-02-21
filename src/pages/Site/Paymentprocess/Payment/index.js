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

import moment from 'moment';
import 'moment/locale/pt-br';
moment.locale('pt-BR');

const Payment = ({history}) => {
  const [rentattempt, setRentattemp] = useState([]);
  const [ok, setOk] = useState(true);
  const [okattempt, setOkAttempt] = useState(true);
  const [tool, setTool] = useState([]);
  const [start, setStart] = useState([]);
  const [end, setEnd] = useState([]);
  const [freight, setFreight] = useState([]);
  const [userconfig, setUserconfig] = useState([]);

  let values = queryString.parse(useLocation().search);
  const dispatch = useDispatch();
  const current_user = useSelector(state => state.auth);
  useEffect(() => {
    async function loadRentattempt () {
      const response = await api.get(`rent/attempt/${values.rent_attempt}/${values.code_attempt}`, {
      });

      if (response.data.rentattempt.length > 0) {
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

    async function loadFreight (userid) {
      const response = await api.get(`/userconfig/${userid}`, {
      });
      
      setUserconfig(response.data.userconfig[0]) 
      /*if(response.data.tool.length > 0) {
        dispatch(Rentinfo(response.data.tool[0]));
        setTool(response.data.tool[0])
        setOk(true)
      } else {
        setOk(false)
      }*/
    }

    return () => {
    };
  }, [current_user])

  const paymentRent = () => {

    sendNotification()
  }

  async function sendNotification () {
    verifyAvailabletool()
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
  
      var notification = {
        rent_attempt_id: rentattempt.id,
        user_recipient_id: rentattempt.user_lessor_id,
        message: message,
        title: title
      }
  
      await api.post('/notifications/send', notification, {})
      .then((res) => {
        socketio.emit('notify',{
          to : rentattempt.user_lessor_id,
          title: title,
          message : message
        });
      }).catch((err) => {
        console.log(err.response)
      }) 
    } else {
      history.push(`/?t=unavailable`);
    }
  }

  const renderText = () => {
   
  }

  const handleFreight = (event) => {
    setFreight(event.target.value)
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
      if (months === 1) {
        text = ` por ${months} Mês`
      } else {
        text = ` x ${months} Mêses`
      }
    }

    return text
  }

  return (
    <div className="container">
      {
        okattempt === true ? 
        (
          <div className="columns">
            <div className="column is-two-thirds">
              <p className="title-tool-only"> Entrega ou busca & pagamento </p>
              <br/><br/>
              <p className="title-tool-only-little">
                Escolha de que forma você deseja obter o equipamento.
              </p>
              <div className="columns">
                <div className="column">
                  <Field>
                    <input 
                      className="is-checkradio"
                      type="radio"
                      id={'without'}
                      name="freight" 
                      value="without"
                      defaultChecked={true}
                      onChange={event => handleFreight(event)}
                  />
                    <Label for={'without'}>Buscar equipamento</Label>
                    { 
                    //adicionar aqui clausula que verifica onde a ferramenta está, e o endereço passado na seção anterior para 
                    //ver se abre o campo de receber o equipamento.
                      tool.delivery === 'Y' ? 
                      (
                        <>
                          <input 
                            className="is-checkradio"
                            id="with"
                            type="radio" 
                            name="freight"
                            value="with"
                            onChange={event => handleFreight(event)}
                          />
                          <Label for={'with'}>Receber equipamento</Label>
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
                    <p className="title-tool-only-little"> Frete </p>
                    <Warningtext>
                      Ao escolher receber o equipamento, é cobrado o valor do frete por quilometro de onde a 
                      ferramenta está, até o endereço que você adicionou. 
                    </Warningtext>
                    {  
                      console.log(userconfig.freight, userconfig.min)
                    }
                  </>
                )
                :
                (
                  <>
                    <div className="columns">
                      <div className="column">
                        <b>* Após confirmarmos o pagamento, você receberá o endereço para buscar o equipamento.</b>
                        <br/><br/>
                        <p className="title-infos-tool hack-padding-top">Localização do equipamento ({ tool.title })</p>
                        {
                        tool.lat !== undefined && tool.lng !== undefined ? 
                        (
                          <>
                            <Mapbox lat={tool.lat} lng={tool.lng} url={tool.picture1} title={tool.title}/>                   
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
              <p className="title-tool-only-little">Informações importantes:</p>
              <br/>
              <ul>
                {
                  tool.contract === 'Y' ? 
                  (
                    <li className="list-info-payment">Você só pode usar o equipamento, mediante assinatura de contrato. Prepare uma caneta quando for obter o equipamento!</li>
                  )
                  :
                  ('')
                }
                {
                  tool.devolution === 'Y' ? 
                  (
                    <li className="list-info-payment">O Vizinho { rentattempt.userlessor.name } busca o equipamento no término do aluguel.</li>
                  )
                  :
                  ('')                  
                }
              </ul>
              <br/><br/>
              <Button 
                type={'button'}
                className={'button is-pulled-left color-logo'}
                text={'Pagar'}                                    
                onClick={event => paymentRent()}
              />
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
                <div className="columns">
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
                <div className="columns  no-margin-top-columns">
                  <div className="column">
                    <b> Devolução </b> { end }                    
                  </div>
                </div>
                <div className="columns no-margin-top-columns">
                  <div className="column">
                    Tensão equip
                  </div>
                  <div className="column">
                    <div className="is-pulled-right">
                      { rentattempt.tension === 'Tri' ? 'Trifásico' : rentattempt.tension }
                    </div>  
                  </div>  
              </div>
                <div className="columns">
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
              <div className="columns no-margin-top-columns">
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
  );
};

export default Payment;
