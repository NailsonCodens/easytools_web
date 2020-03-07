import React, { useState, useEffect } from 'react';
import api from '../../../services/api';
import { useParams } from "react-router-dom";
import {IntlProvider, FormattedNumber} from 'react-intl';
import moment from 'moment';
import 'moment/locale/pt-br';
import Title from '../../../utils/title';
import {Titlepage} from '../../../components/Titles/Titlepages';
import './style.css';
import Modal from '../../../components/Modal';
import { Button } from '../../../components/Form/Button';
import ChangeAccept from './conditionsRent';
import socketio from '../../../services/socketio';
import Email from '../../../utils/sendemail';
import { Paymentlink }from '../../PaymentLink/index';

import {
  isMobile
} from "react-device-detect";

export default function Rents({history}) {
  document.title = Title('Detalhe aluguel');

  const [rent, setRent] = useState([]);
  const [workadd, setWorkadd] = useState([]);
  const [documentr, setDocument] = useState([]);
  const [modal1, setModal1] = useState(false);
  const [modal2, setModal2] = useState(false);
  const [modal3, setModalthree] = useState(false);

  let { id } = useParams();
  //let values = queryString.parse(useLocation().search);

  useEffect(() => {
    async function loadRents () {
      const response = await api.get(`/rents/${id}`, {});
      setRent(response.data.rentattempt);

      if (response.data.rentattempt.length > 0) {
        const responsew = await api.get(`/workadd/workadd/${response.data.rentattempt[0].id}`, {});
        if (responsew.data.workadd.length > 0){
          setWorkadd(responsew.data.workadd[0])
          loadDocumentrenter(response.data.rentattempt[0].user_renter_id)    
        }
      }
    }
    loadRents();

    async function loadDocumentrenter (idrenter) {
      if (idrenter !== undefined) {
        const responsew = await api.get(`documents/${idrenter}`, {});
        setDocument(responsew.data.documentUser[0])
      }
    }
    loadDocumentrenter();
    
    return () => {
    };
  }, [])

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
      }else if (month === 1) {
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

  const showdocument = () => {
    setModal1(true)
  }
  
  const hideModalone = () => {
    setModal1(false)
    return modal1
  }

  const showselfie = () => {
    setModal2(true)
  }
  
  const hideModaltwo = () => {
    setModal2(false)
    return modal2
  }


  const showproof = () => {
    setModalthree(true)
  }
  
  const hideModalthree = () => {
    setModalthree(false)
    return modal3
  }

  const accept = (id) => {
    Paymentlink(id, rent[0]).then(function (response){
      sendNotification(id, 'accept', rent)
      ChangeAccept('accept', id).then((res) => {
        reloadRents(id)
      })
      sendNotificationPayment(id, 'paymentlinkok')
    }).catch(function (err) {
      console.log(err)
      ChangeAccept('notaccept', id).then((res) => {
        reloadRents(id)
        sendNotification(id, 'noacceptforpayment')
      })
    })
  }

  const noaccept = (id) => {
    ChangeAccept('notaccept', id).then((res) => {
      reloadRents(id)
      sendNotification(id, 'noaccept')
    })
  }

  async function reloadRents (id) {
    const response = await api.get('/rents/'+id, {});
    setTimeout(() => {
      setRent(response.data.rentattempt);
    }, 300);     
  } 

  async function sendNotificationPayment(id, type) {
    var lessor = rent[0].userlessor.name
    var renter = rent[0].userrenter.name
    var message = '';
    var title = '';

    if (type === 'paymentlinkok') {
      title = `Pagamento do aluguel - Olá, clique em para pagar pelo aluguel do equipamento, clique em pagar!`;
      message = `Está tudo ok com seu pedido, só falta pagar :). Clique em pagar para finalizarmos o seu pedido e o vizinho ${lessor} preparar o equipamento para você.`;  
    }

    var notification = {
      rent_attempt_id: rent[0].id,
      user_recipient_id: rent[0].userrenter.id,
      message: message,
      title: title
    }

    //enviar outro email com o link do pagamento
    
    Email(rent[0].user_renter_id, title, message);

    await api.post('/notifications/send', notification, {})
    .then((res) => {
      console.log(res)
      socketio.emit('notify',{
        to : rent[0].user_renter_id,
        title: title,
        message : message
      });
    }).catch((err) => {
      console.log(err.response)
    })
  }

  async function sendNotification(id, type) {
    const response = await api.get(`/tools_site/tool/${rent[0].tool_id}`, {
    });

    if (response.data.tool[0].availability === 'Y') {
      var titletool = rent[0].tool.title
      var lessor = rent[0].userlessor.name
      var renter = rent[0].userrenter.name
      var tension = rent[0].tension
      var startdate = moment(rent[0].startdate).format('DD/MM/YYYY');
      var enddate = moment(rent[0].enddate).format('DD/MM/YYYY');

      var message = '';
      var title = '';

      if (type === 'accept') {
        title = `EasyTools -  Aluguel aceito. O vizinho ${lessor} aceitou seu aluguel!`;
        message = `Olá ${renter}, O vizinho aceitou seu pedido. por texto de processamento do aluguel, se for boleto ficamos aguardando o pagamento, se for ${titletool} com tensão em ${tension} para o período de ${startdate} á ${enddate}.`;  
      } else if (type === 'noacceptforpayment') {
        title = `EasyTools - Não cosneguimos processar seu aluguel!`;
        message = `Olá existe algum problema com seus dados, entre em contato cosnoco.`;  
      }else if (type === 'paymentlinkok') {
        title = `Pagamento do aluguel - Olá, clique em para pagar pelo aluguel do equipamento, clique em pagar!`;
        message = `Está tudo ok com seu pedido, só falta pagar :). Clique em pagar para finalizarmos o seu pedido e o vizinho ${lessor} preparar o equipamento para você.`;  
      }else {
        title = `EasyTools - ${renter} Não aceitou o seu aluguel!`;
        message = `Olá ${renter}, Seu pedido não foi aceito pelo vizinho ${lessor}. Fique tranquilo, nós entraremos em contato com você.`;  
      }

      var notification = {
        rent_attempt_id: rent[0].id,
        user_recipient_id: rent[0].userrenter.id,
        message: message,
        title: title
      }

      Email(rent[0].userrenter.id, title, message);

      await api.post('/notifications/send', notification, {})
      .then((res) => {
        socketio.emit('notify',{
          to : rent[0].user_renter_id,
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

  return (
    <div className="container container-page">
      <div className="columns is-desktop">
        <div className="column box-inter">
        {
          rent.map((rent, index) => (
            <div key={index} className="columns">
              <div className="column">
                <Titlepage>Detalhes do aluguel </Titlepage>
                <div className="columns">
                  <div className="column is-4">
                    <div className="columns">
                      <div className="column">
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
                        <img src={rent.tool.picture[0].url} alt={rent.tool.picture[0].url} />
                      </div>
                    </div>
                  </div>
                  <div className="column">
                    <b>
                      Informações do aluguél:
                    </b>
                    <br/>
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
                          <b className="notaccpet">Este aluguel não foi pago</b>
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
                      <div className="columns">
                        <div className={ isMobile === true ? "column" : "column is-2"}>
                          { 
                            rent.accept !== '0' || rent.accept === 'N' ?
                            (
                              ''
                            )
                            :
                            (
                              <Button
                                type={'submit'}
                                className={"button is-success color-logo-lessor" + isMobile === true ? "" : "button is-success color-logo-lessor"}
                                text={'Aceitar'}
                                onClick={event => accept(rent.id)}
                              />
                            )
                          }
                        </div>
                        <div className={ isMobile === true ? "column" : "column is-2"}>
                            { 
                              rent.accept === 'N' || rent.accept === '1' ?
                              (
                                ''
                              )
                              :
                              (
                                <Button
                                  type={'submit'}
                                  className={'button is-danger color-logo-lessor '}
                                  text={'Negar'}
                                  onClick={event => noaccept(rent.id)}
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
                      <p>
                        Tensão: { rent.tension === 'Tri' ? 'Trifásico' : rent.tension }
                      </p>
                      <p>
                        Período: { renderPeriod(rent.period, rent.days, rent.month) }
                      </p>
                      <div className="columns">
                        <div className="column">
                          <b>Valores do aluguel: </b>
                          <IntlProvider locale="pt-br" timeZone="Brasil/São Paulo">
                            <FormattedNumber value={rent.cost} style="currency" currency="BRL" />
                          </IntlProvider>                                
                        </div>
                      </div>
                      <div className="columns">
                        <div className="column">
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
                        <div className="column">
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
                      </div>
                      <div className="columns">
                        <div className="column">
                          <b>Informações do locatário:</b>
                          <br/>
                          <div className="columns">
                            <div className="column is-3">
                              <div className="avatar-detail">
                                <img src={rent.userrenter.url} alt={rent.userrenter.url} />
                              </div>
                            </div>
                            <div className="column">
                              <p> { rent.userrenter.name } { rent.userrenter.last_name }</p>
                              <p> { rent.userrenter.email } </p>
                              <p> { rent.userrenter.cpfcnpj } </p>
                              <br/>
                              {
                                rent.accept === '1' && rent.paid === '1' 
                                ?
                                (
                                  <p> { rent.userrenter.phone } </p>
                                )
                                :
                                (<p className="color-rent">Quando o aluguel for aceito e pago, você poderá acessar o telefone do locatário.</p>)
                              }                              
                              { <p> <b>Nascimento:</b> { moment(rent.userrenter.birth_date).format('DD/MM/YYYY') } </p> }
                              <br/>
                            </div>
                          </div>
                        </div>
                        <div className="column is-5">
                          <b>Endereço pessoal: </b>
                          <br/><br/>
                          <p> { rent.userrenter.address } { rent.userrenter.number } { rent.userrenter.complement } { rent.userrenter.location } </p>
                          <p> { rent.userrenter.uf } - { rent.userrenter.city } </p>
                          <p>{ rent.userrenter.neighboor }</p>
                          <br/>
                          { <b>Endereço de uso: </b> }
                          <br/><br/>
                            <p> { workadd.address } { workadd.number } { workadd.complement } <br/> { workadd.location } </p>
                            <p> { workadd.uf } - { workadd.city } { workadd.neighboor }</p>
                        </div>
                      </div>
                      <div className="columns">
                        <div className="column">
                          { <b className="link">Documentos do locatário: </b> }
                          <br/>
                          <div className="columns">
                              <div className="column is-3">
                                <span className="is-text" onClick={event => showdocument()}>Ver documento</span>
                              </div>
                              <div className="column is-3">
                                <span className="is-text" onClick={event => showselfie()}>Ver selfie</span>
                              </div>
                              <div className="column is-3">
                                <span className="is-text" onClick={event => showproof()}>Ver Endereço de uso</span>
                              </div>
                          </div>
                          <Modal
                            show={modal1} 
                            onCloseModal={hideModalone} 
                            closeOnEsc={true} 
                            closeOnOverlayClick={true}
                          > 
                            <p>Documento</p>
                            {
                              /*
                              <p className="is-text">Baixar</p>
                              */
                            }
                            
                            <br/>
                            <img src={documentr.urldoc} alt={documentr.urldoc} />
                          </Modal>
                            
                          <Modal
                            show={modal2} 
                            onCloseModal={hideModaltwo} 
                            closeOnEsc={true} 
                            closeOnOverlayClick={true}
                          > 
                            <p>Selfie</p>
                            {
                              /*
                              <p className="is-text">Baixar</p>
                              */
                            }
                            
                            <br/>
                            <img src={documentr.urlselfie} alt={documentr.urlselfie} />
                          </Modal>

                          <Modal
                            show={modal3} 
                            onCloseModal={hideModalthree} 
                            closeOnEsc={true} 
                            closeOnOverlayClick={true}
                          > 
                            <p>Endereço de uso</p>
                            {
                              /*
                              <p className="is-text">Baixar</p>
                              */
                            }
                            
                            <br/>
                            <img src={documentr.urlproof} alt={documentr.urlproof} />
                          </Modal>
                        </div>
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
  );
}
