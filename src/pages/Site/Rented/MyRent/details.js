import React, { useState, useEffect } from 'react';
import api from '../../../../services/api';
import { useParams } from "react-router-dom";
import { IntlProvider, FormattedNumber } from 'react-intl';
import moment from 'moment';
import 'moment/locale/pt-br';
import Title from '../../../../utils/title';
import { Titlepage } from '../../../../components/Titles/Titlepages';
import './myrent.css';
import { DateRangePicker } from 'react-dates';
import {
  isMobile
} from "react-device-detect";
import Modal from '../../../../components/Modal';
import { Button } from '../../../../components/Form/Button';
//import ChangeAccept from './conditionsRent';
import socketio from '../../../../services/socketio';
import Email from '../../../../utils/sendemail';
import { Warningtext } from '../../../../components/Warningtext';
import ReactGA, { set } from 'react-ga';
import Notification from '../../../../utils/notification';

export default function Rents({ history }) {
  document.title = Title('Detalhe aluguel');

  const [rent, setRent] = useState([]);
  const [workadd, setWorkadd] = useState([]);
  const [documentr, setDocument] = useState([]);
  const [modal1, setModal1] = useState(false);
  const [modal2, setModal2] = useState(false);
  const [modalrediret, setModalredirect] = useState(false);
  const [modal3, setModalthree] = useState(false);
  const [show, setShow] = useState(false);
  const [modaldate, setModaldate] = useState(false);
  const [focus, setFocus] = useState('');
  const [startDate, setStartdate] = useState(null);
  const [endDate, setEnddate] = useState(null);
  const [period, setPeriod] = useState();
  const [oldstart, setOldstart] = useState(null);
  const [oldend, setOldend] = useState(null);
  const [datesshow, setDatesShow] = useState({});
  const [prices, setPrices] = useState([]);

  let { id } = useParams();
  //let values = queryString.parse(useLocation().search);

  const success = () => Notification(
    'success',
    'Seu aluguel foi cancelado com sucesso.',
    {
      autoClose: 3000,
      draggable: false,
    },
    {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
    }
  )

  const successalter = () => Notification(
    'success',
    'As datas do seu alugado foram alteradas com sucesso.',
    {
      autoClose: 3000,
      draggable: false,
    },
    {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
    }
  )

  const alterDates = (id) => {
    updateRentdates(id)
  }

  async function updateRentdates(id) {
    var rentupdate = {
      startdate: moment(startDate).format('YYYY-MM-DD'),
      enddate: moment(endDate).format('YYYY-MM-DD')
    }

    await api.put(`rent/attempt/updaterent/${id}`, rentupdate, {})
      .then((res) => {
        Tracking('Alterou a data do alugado', 'Alterou a data do alugado', 'Cliente alterou a data do alugado')
        //console.log() 
        console.log(rent[0].user_lessor_id)
        Email(rent[0].user_lessor_id, `O cliente ${rent[0].userrenter.name} alterou a data do seu alugado.`,
          `O cliente ${rent[0].userrenter.name} alterou a data do seu alugado para uma data futura. Que tinha início em ${moment(oldstart).format('DD/MM/YYYY')} e fim em ${moment(oldend).format('DD/MM/YYYY')} Para início: ${moment(startDate).format('DD/MM/YYYY')} e fim em: ${moment(endDate).format('DD/MM/YYYY')}`, "Ver", ' Veja a alteração em sua conta.');
        Email(rent[0].user_renter_id, `Você alterou a data do seu alugado.`,
          `Você alterou a data do seu alugado. Que tinha início em ${moment(oldstart).format('DD/MM/YYYY')} e fim em ${moment(oldend).format('DD/MM/YYYY')} Para início: ${moment(startDate).format('DD/MM/YYYY')} e fim em: ${moment(endDate).format('DD/MM/YYYY')}`, "Ver", ' Veja a alteração em sua conta.');
        successalter()
        //mandar email para o cliente e para nós de que foi mudado
        reloadRent()
        setModaldate(false)
      }).catch((err) => {
        console.log(err.response)
      })
  }

  async function reloadRent($id) {
    const response = await api.get(`renter/rents/${id}`, {});
    setRent(response.data.rentattempt);

    if (response.data.rentattempt.length > 0) {
      const responsew = await api.get(`/workadd/workadd/${response.data.rentattempt[0].id}`, {});
      if (responsew.data.workadd.length > 0) {
        setWorkadd(responsew.data.workadd[0])
      }
    }
  }

  const setDates = (dates, amountreceive) => {
    setStartdate(dates.startDate)
    setEnddate(dates.endDate)

    var startdate = moment(dates.startDate).format('YYYY-MM-DD');
    var enddate = moment(dates.endDate).format('YYYY-MM-DD');

    setDatesShow({ 'startdate': startDate, 'enddate': enddate })

    if (dates.endDate != null) {
      var periodnow = moment.preciseDiff(startdate, enddate, true);

      if (period.days === periodnow.days) {
        console.log('ok')
      } else {
        //searchTool()

        setModalredirect(true)

        console.log('vai precisar alterar o valor')
      }
    }
  }

  async function searchTool() {
    const response = await api.get(`/tools_site/tool/${rent[0].tool_id}`, {
    });

    var prices = response.data.tool[0].prices.split(';');
    setPrices(prices);
  }


  const blockDays = (day) => {
    const dayString = day.format('YYYY-MM-DD');
    //    var arr = ["Sunday"];
    //    console.log(moment.weekdays(moment(new Date()).weekday()) === 'Sábado')

    if (moment.weekdays(moment(new Date()).weekday()) === 'Sábado' && moment(new Date()).format('H:mm') === '12:00') {
      return moment.weekdays(day.weekday()) === 'Sábado' || moment.weekdays(day.weekday()) === 'Domingo'
    } else {
      return moment.weekdays(day.weekday()) === 'Domingo'
    }

    //var arr = ["2020-06-12", "2020-06-13", "2020-06-23", "2020-06-24", "2020-06-26", "2020-06-27", "2020-06-29", "2020-06-30"];
    // return arr.some(date => dayString === date)   

    //    return dayString === '2020-06-26' || dayString ==='2020-06-27'
  }

  useEffect(() => {
    async function loadRents() {
      const response = await api.get(`renter/rents/${id}`, {});
      setRent(response.data.rentattempt);

      if (response.data.rentattempt.length > 0) {
        const responsew = await api.get(`/workadd/workadd/${response.data.rentattempt[0].id}`, {});
        if (responsew.data.workadd.length > 0) {
          setWorkadd(responsew.data.workadd[0])
          loadDocumentrenter(response.data.rentattempt[0].user_renter_id)
        }
      }
    }
    loadRents();

    async function loadDocumentrenter(idrenter) {
      if (idrenter !== undefined) {
        const responsew = await api.get(`documents/${idrenter}`, {});
        setDocument(responsew.data.documentUser[0])
      }
    }
    loadDocumentrenter();

    return () => {
    };
  }, [])

  const OpenmodaldatesetModaldate = (modal, datestart, dateend) => {
    setModaldate(modal);
    console.log(datestart, dateend)

    var period = moment.preciseDiff(datestart, dateend, true);
    console.log(period)
    setPeriod(period);
    setOldstart(datestart)
    setOldend(dateend)
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
      } else if (month === '1') {
        periodChoose = 1 + ' Mês ';
      } else {
        periodChoose = month + ' Mêses';
      }
    }

    return (
      <>
        {periodChoose}
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

  // const accept = (id) => {
  //   ChangeAccept('accept', id).then((res) => {
  //     reloadRents()
  //     sendNotification(id, 'accept')
  //   })
  // }

  // const noaccept = (id) => {
  //   ChangeAccept('noaccept', id).then((res) => {
  //     reloadRents()
  //     sendNotification(id, 'noaccept')
  //   })
  // }

  async function reloadRents(id) {
    const response = await api.get('/renter/rents/' + id, {});
    setTimeout(() => {
      setRent(response.data.rentattempt);
    }, 300);
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
      } else {
        title = `EasyTools - ${renter} Não aceitou o seu aluguel!`;
        message = `Olá ${renter}, Seu pedido não foi aceito pelo vizinho ${lessor}. Fique tranquilo, nós entraremos em contato com você.`;
      }
      var notification = {
        rent_attempt_id: rent[0].id,
        user_recipient_id: rent[0].userrenter.id,
        message: message,
        title: title
      }

      await api.post('/notifications/send', notification, {})
        .then((res) => {
          socketio.emit('notify', {
            to: rent[0].user_renter_id,
            title: title,
            message: message
          });
        }).catch((err) => {
          console.log(err.response)
        })
    } else {
      history.push(`/lessor/renter/detail/${id}?e=unavailable`);
    }
  }


  async function redictReservation() {
    const response = await api.get(`/tools_site/tool/${rent[0].tool_id}`, {
    });

    window.location.href = '/s/tool/' + response.data.tool[0].id + '?ctg=' + response.data.tool[0].category;
  }

  const redirectTool = () => {
    Email(rent[0].user_renter_id, `O cliente ${rent[0].userrenter.name} vai refazer a reserva para usar em outro período.`,
      `O cliente tentou alterar as datas, mas ele deseja para outro período maior do que o tal. Por isso ele precisa fazer outra reserva.`, "Ver", ' Veja a alteração em sua conta.');
    setTimeout(() => {
      redictReservation()
    }, 400);
  }

  const cancelRent = () => {
    //talvez por aqui para abrir modal de cancelamento
    setShow(true);
  }

  const cancelEnd = (rent) => {
    updateRentattemp(rent)
  }

  async function sendPushcancel(rentattempt) {
    var titletool = rentattempt.tool.title
    var lessor = rentattempt.userlessor.name
    var renter = rentattempt.userrenter.name
    var tension = rentattempt.tension
    var startdate = moment(rentattempt.startdate).format('DD/MM/YYYY');
    var enddate = moment(rentattempt.enddate).format('DD/MM/YYYY');
    var title = `${renter} cancelou a reserva de locação`;
    var message = `Olá ${lessor}, ${renter} cancelou o aluguel de ${titletool} com tensão em ${tension} para o período de ${startdate} á ${enddate}.`;
    var maintext = 'Que pena. Aluguel cancelado!'
    var urllabel = "Ver"

    var notification = {
      rent_attempt_id: rentattempt.id,
      user_recipient_id: rentattempt.user_lessor_id,
      message: message,
      title: title
    }

    Email(rentattempt.user_lessor_id, title, message, urllabel, maintext);

    await api.post('/notifications/send', notification, {})
      .then((res) => {
        socketio.emit('notify', {
          to: rentattempt.user_lessor_id,
          title: title,
          message: message
        });

      }).catch((err) => {
        console.log(err.response)
      })
  }

  const Tracking = (category, action, label) => {
    ReactGA.event({
      category: category,
      action: action,
      label: label
    });
  }

  async function updateRentattemp(rent) {

    var rentupdate = {
      accept: 'c',
      startdate: rent.startdate,
      enddate: rent.enddate
    }


    await api.put(`rent/attempt/updaterent/${id}`, rentupdate, {})
      .then((res) => {
        Tracking('Cancelou', 'Cancelou', 'cliente cancelou aluguel')
        sendPushcancel(rent)
        setShow(false)
        success()
        reloadRents(id)
        //history.push(`/s/payment/rent-paymentfinish?rent_attempt=${values.rent_attempt}&tool=${values.tool}&code_attempt=${values.code_attempt}`)      
      }).catch((err) => {
        console.log(err.response)
      })
  }


  const hideShow = () => {
    setShow(false)
    return show
  }

  const hideShow2 = () => {
    setModaldate(false)
    return modaldate
  }

  const hideShow3 = () => {
    setModalredirect(false)
    return modalrediret
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
                          <img src={rent.tool.picture[0].url} alt={rent.tool.picture[0].url} />
                        </div>
                      </div>
                    </div>
                    <div className="column">
                      <b>
                        Informações do aluguél:
                      </b>
                      <br /><br />
                      {
                        rent.accept === 'F' ?
                          (
                            <>
                              <br /><br />
                              <b className="incomplet">Você cancelou este aluguel por conta da taxa de entrega para regiões metropolitanas.</b>
                            </>
                          )
                          :
                          ('')
                      }

                      {
                        rent.accept === 'c' ?
                          (
                            <>
                              <br /><br />
                              <b className="incomplet">Cancelada por você.</b>
                            </>
                          )
                          :
                          ('')
                      }
                      {
                        rent.finishprocess !== 'y' ?
                          (
                            <b className="incomplet">Reserva incompleta</b>
                          )
                          :
                          (
                            ''
                          )
                      }

                      {
                        rent.accept === '0' && rent.paid === '0' && rent.finishprocess === 'y' ?
                          (
                            <>
                              <br /><br />
                              <b className="new">Processando seu aluguel</b>
                            </>
                          )
                          :
                          (
                            ''
                          )
                      }
                      {
                        rent.accept === 'N' || rent.paid === 'N' ?
                          (
                            <b className="notaccpet">Aluguel negado</b>
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
                        rent.accept === '1' && rent.paid === '1' && rent.finishprocess === 'y' ?
                          (
                            <b className="acceptandpaid">Aceito e Pago</b>
                          )
                          :
                          (
                            ''
                          )
                      }
                      <br /><br />
                      {
                        rent.paid !== '1' && rent.accept !== 'c' && rent.accept !== 'F' ?
                          (
                            <>
                              {
                                <Button
                                  type={'submit'}
                                  className={'button is-danger cancelbtn is-pulled-left'}
                                  text={'Cancelar aluguel'}
                                  onClick={event => cancelRent(rent.id)}
                                />
                              }
                            </>
                          )
                          :
                          ('')
                      }
                      {
                        rent.accept === '1' && (moment(new Date()).format('dd') < moment(rent.enddate).format('dd')) ?
                          (
                            <>
                              <Button
                                type={'submit'}
                                className={'button is-small is-info color-logo-lessor is-pulled-left padding-left-bt-detail'}
                                text={'Alterar data da reserva'}
                                onClick={event => OpenmodaldatesetModaldate(true, moment(rent.startdate).format('YYYY-MM-DD'), moment(rent.enddate).format('YYYY-MM-DD'))}
                              />
                            </>
                          )
                          :
                          (
                            <>
                            </>
                          )
                      }
                      <br />
                      {
                        rent.accept === '1' && rent.paid === '0' ?
                          (
                            <>
                              {
                                rent.typepayment === 'creditcard' || rent.typepayment === 'boleto' ?
                                  (
                                    <>
                                      <span><a href={'/s/payment/payment-view/' + rent.id} className="button is-success payment-rent" target="_blank">Pagar meu alugado</a></span>
                                      <br /><br/>
                                      <Warningtext>Você tem 15 minutos para realizar o pagamento, caso isto não aconteça, seu pedido será cancelado.</Warningtext>
                                    </>
                                  )
                                  :
                                  ('')

                              }
                            </>
                          )
                          :
                          ('')
                      }
                      <div>
                      </div>
                      <div className="columns">

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
                                    onClick={event => accept(rent.id)}
                                  />
                                )
                              }
                            </div> */}
                        {/* <div className="column is-2">
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
                                      onClick={event => noaccept(rent.id)}
                                    />
                                  )
                                }
                              </div> */}
                      </div>
                      <br />
                      <p className="capitalize">
                        {rent.tool.title} alugado por
                        <b> {rent.userlessor.name}</b>
                      </p>
                      <div className="columns">
                        <div className="column">
                          <p className="sub-title">Aluguel: <span className="datefull">{moment(rent.startdate).format('DD/MM/YYYY')}</span></p>
                          <div className="box-date-rules is-pulled-left">
                            {moment(rent.startdate).format('DD')}
                            <br />
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
                            <br />
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
                            Tensão: {rent.tension === 'Tri' ? 'Trifásico' : rent.tension}
                          </p>
                          <p>
                            Período: {renderPeriod(rent.period, rent.days, rent.month)}
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
                              <b>Horário para entrega:</b>
                              <br />
                              {
                                rent.periodhour === '' ?
                                  (
                                    <>
                                      Levar hoje em até 2 horas após o pedido de reserva.
                                    </>
                                  )
                                  :
                                  (
                                    <>
                                      {rent.periodhour}
                                    </>
                                  )
                              }
                              <br /><br />

                              {
                                rent.freight > 0 ?
                                  (
                                    <>
                                      <b>Custo de entrega: </b>
                                      <IntlProvider locale="pt-br" timeZone="Brasil/São Paulo">
                                        <FormattedNumber value={parseFloat(rent.freight)} style="currency" currency="BRL" />
                                      </IntlProvider>
                                      <br /><br />
                                      <b>Forma de pagamento:</b>
                                      <span>{rent.typepayment === 'money' ? ' Dinheiro' : ''}</span>
                                      <span>{rent.typepayment === 'creditcard' ? ' Cartão de crédito' : ''}</span>
                                      <span>{rent.typepayment === 'machine' ? ' Maquininha' : ''}</span>
                                      <span>{rent.typepayment === 'boleto' ? ' Boleto' : ''}</span>
                                      <br /><br />
                                      {
                                        rent.freight > 0 ?
                                          (<b>Valores do aluguel + Custo de entrega: </b>)
                                          :
                                          (<b>Valores final do aluguel: </b>)
                                      }

                                      <IntlProvider locale="pt-br" timeZone="Brasil/São Paulo">
                                        <FormattedNumber value={parseFloat(rent.cost) + parseFloat(rent.freight)} style="currency" currency="BRL" />
                                      </IntlProvider>
                                    </>
                                  )
                                  :
                                  ('')
                              }
                            </div>
                            <div className="column">
                            </div>
                          </div>
                          <div className="columns">
                            <div className="column is-5">
                              {<b>Seu endereço de uso: </b>}
                              <br /><br />
                              <p> {workadd.address} {workadd.number} {workadd.complement} <br /> {workadd.location} </p>
                              <p> {workadd.uf} - {workadd.city} {workadd.neighboor}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <hr />
                <Modal
                  show={show}
                  onCloseModal={hideShow}
                  closeOnEsc={true}
                  closeOnOverlayClick={true}
                >
                  <h2 className="title has-text-centered">Você tem certeza qeu deseja cancelar seu aluguel?</h2>
                  <div className="has-text-centered">

                  </div>
                  <div className="has-text-centered text-modal">
                    <p>
                      Ao clicar em cancelar, este aluguel automaticamente se torna invalido.
                      Assim precisando fazer outro aluguel quando desejar usar este equipamento.
                    </p>
                    <br />
                    <Button
                      type={'submit'}
                      className={'button is-danger color-logo-lessor is-pulled-right'}
                      text={'Cancelar'}
                      onClick={event => cancelEnd(rent)}
                    />
                    <Button
                      type={'submit'}
                      className={'button is-white color-logo-lessor is-pulled-right'}
                      text={'Não'}
                      onClick={event => hideShow(false)}
                    />
                  </div>
                </Modal>

                <Modal
                  show={modalrediret}
                  onCloseModal={hideShow3}
                  closeOnEsc={true}
                  closeOnOverlayClick={true}
                >
                  <h2 className="title has-text-centered">Você está tentando mudar seu aluguel para um período mais longo.</h2>
                  <div className="has-text-centered">
                    <p>Para mudar o período de locação para mais dias, você precisa solicitar outra reserva e automaticamente esta será cancelada.</p>
                    <div className="columns">
                    </div>
                    <div className="columns">
                      <div className="column before">

                      </div>
                      <div className="column after">
                      </div>
                    </div>
                  </div>
                  <br />
                  <div className="has-text-centered text-modal">
                    <Button
                      type={'submit'}
                      className={'button is-fullwidth is-info color-logo-lessor'}
                      text={'Solicitar reserva com período diferente'}
                      onClick={event => redirectTool(rent.id)}
                    />
                  </div>
                </Modal>



                <Modal
                  show={modaldate}
                  onCloseModal={hideShow2}
                  closeOnEsc={true}
                  closeOnOverlayClick={true}
                >
                  <h2 className="title has-text-centered">Mudança de data da reserva</h2>
                  <div className="has-text-centered">
                    <p>Selecione uma nova data de aluguel e devolução clicando no campo abaixo.</p>
                    <div className="columns">
                      <div className="column">
                        <b>Aluguel</b>
                      </div>
                      <div className="column">
                        <b>Devolução</b>
                      </div>
                    </div>
                    <DateRangePicker
                      anchorDirection="left"
                      displayFormat={'DD/MM/YYYY'}
                      minimumNights={1}
                      isDayBlocked={(day) => blockDays(day)}
                      numberOfMonths={isMobile === true ? 1 : 2}
                      startDate={startDate} // momentPropTypes.momentObj or null,
                      startDateId={'start'} // PropTypes.string.isRequired,
                      endDate={endDate} // momentPropTypes.momentObj or null,
                      endDateId={'end'} // PropTypes.string.isRequired,
                      onDatesChange={({ startDate, endDate }) => setDates({ startDate, endDate })} // PropTypes.func.isRequired,
                      focusedInput={focus.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
                      onFocusChange={focusedInput => setFocus({ focusedInput })} // PropTypes.func.isRequired,
                      startDatePlaceholderText="Data Aluguel"
                      endDatePlaceholderText="Data Devolução"
                      readOnly
                      hideKeyboardShortcutsPanel
                    />
                    <hr />
                    <div className="columns">
                      <div className="column before">
                        <p className="has-text-left"><b>Período anterior:</b></p>
                        <div className="has-text-left">
                          Aluguel:
                          <b> {moment(oldstart).format('DD/MM/YYYY')}</b>
                          <br />
                          Devolução:
                          <b> {moment(oldend).format('DD/MM/YYYY')}</b>
                        </div>
                      </div>
                      <div className="column after">
                        <p className="has-text-left"><b>Período novo:</b></p>
                        <div className="has-text-left">
                          Aluguel:
                          <b> {endDate !== null ? moment(datesshow.startdate).format('DD/MM/YYYY') : ' - '}</b>
                          <br />
                          Devolução:
                          <b> {endDate !== null ? moment(datesshow.enddate).format('DD/MM/YYYY') : ' - '}</b>
                        </div>
                      </div>
                    </div>
                  </div>
                  <br />
                  <div className="has-text-centered text-modal">
                    <Button
                      type={'submit'}
                      className={'button is-small is-fullwidth is-success color-logo-lessor'}
                      text={'Concluir'}
                      onClick={event => alterDates(rent.id)}
                    />
                  </div>
                </Modal>

              </div>
            ))
          }
        </div>
      </div>
    </div>
  );
}
