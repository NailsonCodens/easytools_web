import React, { useState, useEffect } from 'react'
import {Titlepage} from '../../../components/Titles/Titlepages';
import api from '../../../services/api';
import './style.css';
import moment from 'moment';
import 'moment/locale/pt-br';
import Title from '../../../utils/title';
import {IntlProvider, FormattedNumber} from 'react-intl';
import { Button } from '../../../components/Form/Button';
import { Link } from 'react-router-dom';
import socketio from '../../../services/socketio';
import Email from '../../../utils/sendemail';
import { Paymentlink }from '../../PaymentLink/index';
import Scroll from '../../../utils/scroll';

import {
  isMobile
} from "react-device-detect";
import ChangeAccept from './conditionsRent';

const Rents = ({ history }) => {
  document.title = Title('Aluguéis');

  const [rents, setRents] = useState([]);

  useEffect(() => {
    async function loadRents () {
      const response = await api.get('/rents/', {});
      setRents(response.data.rentattempt);
    }
    loadRents();

    return () => {
    };
  }, [])

  const goDetail = (id) => {
    Scroll(100, 100)
    history.push(`/lessor/rents/detail/${id}`);
  }

  const accept = (id, rent) => {        
    Paymentlink(id, rent).then(function (response){
      sendNotification(id, 'accept', rent)
      ChangeAccept('accept', id).then((res) => {
        reloadRents()
      })
      sendNotificationPayment(id, 'paymentlinkok', rent)
    }).catch(function (err) {
      console.log(err)
      ChangeAccept('notaccept', id).then((res) => {
        reloadRents()
        sendNotification(id, 'noacceptforpayment', rent)
      })
    })
  }

  const noaccept = (id, rent) => {
    ChangeAccept('notaccept', id).then((res) => {
      reloadRents()
      sendNotification(id, 'noaccept', rent)
    })
  }

  async function sendNotification(id, type, rent) {
    const response = await api.get(`/tools_site/tool/${rent.tool_id}`, {
    });

    if (response.data.tool[0].availability === 'Y') {
      var titletool = rent.tool.title
      var lessor = rent.userlessor.name
      var renter = rent.userrenter.name
      var tension = rent.tension
      var startdate = moment(rent.startdate).format('DD/MM/YYYY');
      var enddate = moment(rent.enddate).format('DD/MM/YYYY');

      var message = '';
      var title = '';
      var maintext = '';
      var urllabel = '';


      if (type === 'accept') {
        title = `EasyTools -  Aluguel aceito. Seu aluguel foi aceito!`;
        message = `Olá ${renter}, Seu aluguel foi aceito. Fique ligado, nós vamos te enviar o link de pagamento, que pode ser acessado na sua conta na Easytools direto no site. Você alugou: ${titletool} com tensão em ${tension} para o período de ${startdate} á ${enddate}. A entrega do equipamento, ocorrerá quando confirarmos o pagamento.`;  
        maintext = 'Boa notícia! seu aluguel foi processado.'
        urllabel = "Ver e pagar meu equipamento alugado"
      } else if (type === 'noacceptforpayment') {
        title = `EasyTools - Não conseguimos processar seu aluguel!`;
        message = `Olá existe algum problema com seus dados, entre em contato cosnoco, ou espere que nós entraremos em contato.`;  
        maintext = 'Ops! Seu aluguel foi rejeitado, nós vamos te ligar.'
        urllabel = "Ver aluguel negado."
      }else if (type === 'paymentlinkok') {
        title = `Pagamento do aluguel - Olá, clique em para pagar pelo aluguel do equipamento, clique em pagar!`;
        message = `Está tudo ok com seu pedido, só falta pagar :). Clique em pagar para finalizarmos o seu aluguel e entregarmos o equipamento para você.`;  
        maintext = 'Estamos aguardando seu pagamento para ir entregar seu equipamento.'
        urllabel = "Pagar aluguel"
      }else {
        title = `EasyTools - A Easytools não aceitou o seu aluguel!`;
        message = `Olá ${renter}, Seu pedido não foi aceito pela Easytools. Fique tranquilo, nós entraremos em contato com você.`;  
        maintext = 'Ops! Seu aluguel foi rejeitado, nós vamos te ligar.'
        urllabel = "Ver aluguel negado."
      }

      var notification = {
        rent_attempt_id: rent.id,
        user_recipient_id: rent.userrenter.id,
        message: message,
        title: title
      }

      Email(rent.user_renter_id, title, message, urllabel, maintext)


      await api.post('/notifications/send', notification, {})
      .then((res) => {
        socketio.emit('notify',{
          to : rent.user_renter_id,
          title: title,
          message : message
        });
      }).catch((err) => {
        console.log(err.response)
      })
    } else {
      history.push(`/lessor/renter/detail/${id}?e=unavailable`);
    }
  }

  async function sendNotificationPayment(id, type, rent) {
      var lessor = rent.userlessor.name
      var renter = rent.userrenter.name
      var message = '';
      var title = '';
      var maintext = 'Você está prestes a receber seu equipamento alugado!';
      var urllabel = 'Acessar o site e pagar';
  
      if (type === 'paymentlinkok') {
        title = `Pagamento do aluguel - Olá, clique em para pagar pelo aluguel do equipamento, clique em pagar!`;
        message = `
          Está tudo ok com seu pedido, só falta pagar :). Clique em pagar para finalizarmos o seu pedido e o vizinho ${lessor} preparar o equipamento para você. 
          Para pagar acesse o site, entre na sua conta e vá em Meus alugados -> Detalhes -> Link de pagamento https://pagarmeualuguel.easytools
          `;  
      }
  

      var notification = {
        rent_attempt_id: rent.id,
        user_recipient_id: rent.userrenter.id,
        message: message,
        title: title
      }
  
      //enviar outro email com o link do pagamento
  
      Email(rent.user_renter_id, title, message, urllabel, maintext);
  

      await api.post('/notifications/send', notification, {})
      .then((res) => {
        socketio.emit('notify',{
          to : rent.user_renter_id,
          title: title,
          message : message
        });
      }).catch((err) => {
        console.log(err.response)
      })
  }

  async function reloadRents () {
    const response = await api.get('/rents/', {});
    setTimeout(() => {
      console.log(response.data.rentattempt)
      setRents(response.data.rentattempt);
    }, 300);     
  } 

  const renderPeriod = (period, days, month) => {
    var periodChoose = period

    if (period === 'days') {
      periodChoose = days + ' Dia(s) ';
    } else if (period === 'biweekly') {
      periodChoose = 15 + ' Dias (Quinzenal) ';
    } else if (period === 'weekend') {
      periodChoose = 7 + ' Dias (Semanal) ';
    } else if (period === 'month') {
      if (month === '0') {
        periodChoose = 1 + ' Mês';
      }else if (month === '1') {
        periodChoose = 1 + ' Mês ';
      }else {
        periodChoose = month + ' Mêses';
      }
    }

    return (
      <>
        { periodChoose }
      </>
    )
  }

  const placeholder = !rents.length ? 'Você ainda não alugou equipamentos.': '' ;

  return (
    <div className="container container-page">
      <div className="columns">
        <div className="column has-text-left">
          <Titlepage>Aluguéis</Titlepage>
          <div className="columns is-desktop">
            <div className="column box-inter">
              {placeholder}
              {
                rents.map((rent, index) => (
                  <div key={index} className="columns rents">
                    <div className="column padding-rents">
                      <div className="columns">
                        {
                          isMobile ? 
                          (
                            <p className="capitalize title-rent">
                              { rent.tool.title } alugado por 
                              <b> { rent.userrenter.name }</b>
                            </p>
                          )
                          :
                          (
                            ''
                          )
                        }
                        <div className={ isMobile === true ? "column" : "column is-5"}>
                          {
                            console.log(rent)
                          }
                          {
                            rent.tool.picture.length > 0 ?
                            (
                              <img src={rent.tool.picture[0].url} alt={rent.tool.picture[0].url} className="image-tool-rent"/>
                            )
                            :
                            (
                                ''
                              )
                          }
                        </div>
                        <div className="column">
                          <div>
                            { 
                              rent.accept === '0' && rent.paid === '0' ?
                              (
                                <b className="new">Aluguel novo</b>
                              )
                              :
                              (
                                ''
                              )
                            }
                            { 
                              rent.accept === 'N' ?
                              (
                                <b className="notaccpet">Aluguel negado</b>
                              )
                              :
                              (
                                ''
                              )
                            }
                            {
                              rent.paid === 'N' ?
                              (
                                <b className="notaccpet">Este aluguel não foi pago pelo</b>
                              )
                              :
                              (
                                ''
                              )
                            }
                            { 
                              rent.accept === '1' && rent.paid === '0' ?
                              (
                                <b className="acceptandwaitng">Aceito e aguardando pagamento</b>
                              )
                              :
                              (
                                ''
                              )
                            }
                            { 
                              rent.accept === '1' && rent.paid === '1' ?
                              (
                                <b className="acceptandpaid">Aceito e Pago</b>
                              )
                              :
                              (
                                ''
                              )
                            }
                          </div>
                          <div className="columns is-mobile">
                            <div className={ isMobile === true ? "column is-5" : "column is-2"}>
                              <Button
                                type={'submit'}
                                className={'button is-info is-small color-logo-lessor is-pulled-left'}
                                text={'Ver detalhes'}
                                onClick={event => goDetail(rent.id)}
                              />
                            </div>
                            <div className={ isMobile === true ? "column is-4" : "column is-2"}>
                              { 
                                rent.accept !== '0' || rent.accept === 'N' ?
                                (
                                  ''
                                )
                                :
                                (
                                  <Button
                                    type={'submit'}
                                    className={'button is-success is-small color-logo-lessor is-pulled-left'}
                                    text={'Aceitar'}
                                    onClick={event => accept(rent.id, rent)}
                                  />
                                )
                              }
                            </div>
                            <div className={ isMobile === true ? "column is-4" : "column is-2"}>
                                { 
                                  rent.accept === 'N' || rent.accept === '1' ?
                                  (
                                    ''
                                  )
                                  :
                                  (
                                    <Button
                                      type={'submit'}
                                      className={'button is-danger is-small color-logo-lessor is-pulled-left'}
                                      text={'Negar'}
                                      onClick={event => noaccept(rent.id, rent)}
                                    />
                                  )
                                }
                              </div>
                          </div>
                          <br/>
                          {
                            isMobile ? 
                            ('')
                            :
                            (
                              <p className="capitalize title-rent">
                              { rent.tool.title } alugado para 
                              <b> { rent.userrenter.name }</b>
                              </p>
                            )
                          }
                        <div className="columns">
                          <div className="column">
                            <p className="sub-title">Aluguel: <span className="datefull">{moment(rent.startdate).format('DD/MM/YYYY')}</span></p>
                            <div className="box-date-rules is-pulled-left">
                              {moment(rent.startdate).format('DD')}
                              <br/>
                              {moment(rent.startdate).format('MMM')}
                            </div>
                            <div className="name-data-rules is-pulled-left">
                              {moment(rent.startdate).format('dddd')}
                            </div>
                            <div className="is-clearfix	"></div>
                          </div>
                          <div className="column">
                            <p className="sub-title">Devolução: <span className="datefull">{moment(rent.enddate).format('DD/MM/YYYY')}</span></p>
                            <div className="box-date-rules is-pulled-left">
                              {moment(rent.enddate).format('DD')}
                              <br/>
                              {moment(rent.enddate).format('MMM')}
                            </div>
                            <div className="name-data-rules is-pulled-left">
                              {moment(rent.enddate).format('dddd')}
                            </div>
                            <div className="is-clearfix	"></div>
                            <p className="datefull"></p>
                          </div>
                        </div>
                        <div className="columns">
                          <div className="column">
                            <b>
                              Informações do aluguél:
                            </b>
                            <p>
                              Tensão: { rent.tension === 'Tri' ? 'Trifásico' : rent.tension }
                            </p>
                            <p>
                              Período: { renderPeriod(rent.period, rent.days, rent.month) }
                            </p>
                            <div className="columns">
                              <div className="column padding-rents">
                                <b>Valores do aluguel: </b>
                                <IntlProvider locale="pt-br" timeZone="Brasil/São Paulo">
                                  <FormattedNumber value={rent.cost} style="currency" currency="BRL" />
                                </IntlProvider>                                
                              </div>
                            </div>
                            <div className="columns">
                              <div className="column padding-rents">
                                {
                                  rent.freight > 0 ? 
                                  (
                                   <>
                                    <b>Custo de entrega: </b>
                                    <IntlProvider locale="pt-br" timeZone="Brasil/São Paulo">
                                      <FormattedNumber value={parseFloat(rent.freight)} style="currency" currency="BRL" />
                                    </IntlProvider>
                                   </> 
                                  )
                                  :
                                  ('')
                                }
                              </div>
                              <div className="column padding-rents">
                                {
                                  rent.freight > 0 ? 
                                  (<b>Valores do aluguel + Custo de entrega: </b>)
                                  :
                                  (<b>Valores final do aluguel: </b>)
                                }
                                <IntlProvider locale="pt-br" timeZone="Brasil/São Paulo">
                                  <FormattedNumber value={parseFloat(rent.cost) + parseFloat(rent.freight)} style="currency" currency="BRL" />
                                </IntlProvider>                                
                              </div>
                              <br/><br/>
                            </div>
                          </div>
                        </div>
                        </div>
                      </div>
                    </div>
                  </div>                  
                ))
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Rents
