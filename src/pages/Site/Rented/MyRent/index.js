import React, { useState, useEffect } from 'react'
import {Titlepage} from '../../../../components/Titles/Titlepages';
import api from '../../../../services/api';
import './myrent.css';
import moment from 'moment';
import 'moment/locale/pt-br';
import Title from '../../../../utils/title';
import {IntlProvider, FormattedNumber} from 'react-intl';
import { Button } from '../../../../components/Form/Button';
import { Link } from 'react-router-dom';
import socketio from '../../../../services/socketio';
import Email from '../../../../utils/sendemail';

//import ChangeAccept from './conditionsRent';

const Rents = ({ history }) => {
  document.title = Title('Aluguéis');

  const [rents, setRents] = useState([]);

  useEffect(() => {
    async function loadRents () {
      const response = await api.get('/renter/rents/', {});
      setRents(response.data.rentattempt);
    }
    loadRents();

    return () => {
    };
  }, [])

  const goDetail = (id) => {
    history.push(`/s/renter/myrent/details/${id}`);
  }

  // const accept = (id, rent) => {
  //   sendNotification(id, 'accept', rent)
    
  //   /*ChangeAccept('accept', id).then((res) => {
  //     reloadRents()
  //     sendNotification(id, 'accept', rent)
  //   })*/
  // }

  // const noaccept = (id, rent) => {
  //   ChangeAccept('accept', id).then((res) => {
  //     reloadRents()
  //     sendNotification(id, 'noaccept', rent)
  //   })
  // }


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

      if (type === 'accept') {
        title = `EasyTools -  Aluguel aceito. O vizinho ${lessor} aceitou seu aluguel!`;
        message = `Olá ${renter}, O vizinho aceitou seu pedido. por texto de processamento do aluguel, se for boleto ficamos aguardando o pagamento, se for ${titletool} com tensão em ${tension} para o período de ${startdate} á ${enddate}.`;  
      } else {
        title = `EasyTools - ${renter} Não aceitou o seu aluguel!`;
        message = `Olá ${renter}, Seu pedido não foi aceito pelo vizinho ${lessor}. Fique tranquilo, nós entraremos em contato com você.`;  
      }

      var notification = {
        rent_attempt_id: rent.id,
        user_recipient_id: rent.userrenter.id,
        message: message,
        title: title
      }

      Email(rent.userrenter.id, title, message);

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

  async function reloadRents () {
    const response = await api.get('/rents/', {});
    setTimeout(() => {
      setRents(response.data.rentattempt);
    }, 300);     
  } 

  const renderPeriod = (period) => {
    var periodChoose = period

    if (period === 'days') {
      periodChoose = 'Dia(s) ';
    } else if (period === 'biweekly') {
      periodChoose = 'Quinzenal ';
    } else if (period === 'weekend') {
      periodChoose = 'Semanal ';
    } else if (period === 'month') {
      periodChoose = 'Mês ';
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
                  <div key={index} className="columns">
                    <div className="column">
                      <div className="columns mwd-item-container">
                        <div className="column is-3">
                          <img src={rent.tool.picture[0].url} alt={rent.tool.picture[0].url} className="image-tool-rent"/>
                        </div>
                        <div className="column mwd-content-right">
                        <p className="capitalize">
                            { rent.tool.title } 
                            {/* <b> { rent.userrenter.name }</b> */}
                          </p>
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
                              rent.accept === 'N' || rent.paid === 'N' ?
                              (
                                <b className="notaccpet">Você negou este aluguel</b>
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
                          <div className="columns mwd-details-btn">
                            <div className="column is-2">
                              <Button
                                type={'submit'}
                                className={'button is-info color-logo-lessor is-pulled-left'}
                                text={'Ver detalhes'}
                                onClick={event => goDetail(rent.id)}
                              />
                              <br/><br/>
                            </div>
                            {/* <div className="column is-2">
                              { 
                                rent.accept !== '0' || rent.accept === 'N' ?
                                (
                                  ''
                                )
                                :
                                (
                                  <Button
                                    type={'submit'}
                                    className={'button is-success color-logo-lessor is-pulled-left'}
                                    text={'Aceitar'}
                                    onClick={event => accept(rent.id, rent)}
                                  />
                                )
                              }
                            </div> */}
                            {/* <div className="column is-2">
                                { console.log() }
                                { 
                                  rent.accept === 'N' || rent.accept === '1' ?
                                  (
                                    ''
                                  )
                                  :
                                  (
                                    <Button
                                      type={'submit'}
                                      className={'button is-danger color-logo-lessor is-pulled-left'}
                                      text={'Negar'}
                                      onClick={event => noaccept(rent.id, rent)}
                                    />
                                  )
                                }
                            </div> */}
                          </div>
                          <br/>
                          
                        <div className="columns mwd-date-rent">
                          <div className="column">
                            {/* <p className="sub-title">Aluguel: <span className="datefull">{moment(rent.startdate).format('DD/MM/YYYY')}</span></p> */}
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
                            {/* <p className="sub-title">Devolução: <span className="datefull">{moment(rent.enddate).format('DD/MM/YYYY')}</span></p> */}
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
                        <div className="columns mwd-rent-info">

                          <div className="column is-half">
                              <b>
                                Informações do aluguél:
                              </b>
                              <p>
                                Tensão: { rent.tension === 'Tri' ? 'Trifásico' : rent.tension }
                              </p>
                              <p>
                                Período: { rent.days } { renderPeriod(rent.period) }
                              </p>
                              
                          </div>
                          <div className="column is-half">
                                <b>Valores do aluguel: </b> <br></br>
                                <IntlProvider locale="pt-br" timeZone="Brasil/São Paulo">
                                  <FormattedNumber value={rent.cost} style="currency" currency="BRL" />
                                </IntlProvider>  
                            
                                <b>Custo de entrega: </b>
                                <IntlProvider locale="pt-br" timeZone="Brasil/São Paulo">
                                  <FormattedNumber value={parseFloat(rent.freight)} style="currency" currency="BRL" />
                                </IntlProvider>                                
                              <br></br>
                              
                                <b>Valores do aluguel + Custo de entrega: </b>
                                <IntlProvider locale="pt-br" timeZone="Brasil/São Paulo">
                                  <FormattedNumber value={parseFloat(rent.cost) + parseFloat(rent.freight)} style="currency" currency="BRL" />
                                </IntlProvider>                                
                           
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
