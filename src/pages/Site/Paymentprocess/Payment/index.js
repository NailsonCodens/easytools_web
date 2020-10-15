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
import Notification from '../../../../utils/notification';
import Paymentme from './paymentme';
import Adddocument from '../../Tool/adddocument';
import { isAuthenticated } from "../../../../services/auth";
import { Ul } from '../../../../components/List';
import ReactGA from 'react-ga';
import Modal from '../../../../components/Modal';
import Scroll from '../../../../utils/scroll';
import ScrollableAnchor from 'react-scrollable-anchor'
import Select from 'react-select';
import {Helmet} from 'react-helmet';
import Rentalbottombox from '../Rentalbottombox';
import moment from 'moment';
import Email from '../../../../utils/sendemail';
import brands from '../../../../assets/images/brand.png';
import mastercard from '../../../../assets/images/mastercard.png';
import machine from '../../../../assets/images/machine2.png';
import boleto from '../../../../assets/images/boleto-icon.png';
import money from '../../../../assets/images/money.png';
import CurrencyInput from 'react-currency-input';
import {
  isMobile
} from "react-device-detect";
import 'moment/locale/pt-br';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'
library.add(faCheckCircle);

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
  const [workaddshow, setWorkaddshow] = useState(0);
  const [valuewithfreigh, setValuewithfreigh] = useState(0);
  const [setclass, setClass] = useState('bottom-no-box');
  const [openpayment, setOpenpayment] = useState(false);
  const [typepayment, setTypepayment] = useState(false);
  const [colorbt, setColorbt] = useState('is-info');
  const [coloractive, setColoractive] = useState('');
  const [coin, setCoin] = useState('');
  const [period, setPeriod ] = useState('');
  const [periodwarning, setPeriodwiarning] = useState('');
  const [startam, setStartAm] = useState('');
  const [endam, setEndAm] = useState('');
  const [perfil, setPerfil] = useState([]);
  const [document, setDocument] = useState({})
  const [adddoc, addDoc] = useState(false)
  const [modal, setModal] = useState(false);
  const [aditional, setAditional] = useState(false);
  const [cancel, setCancel] = useState(false);
  const [valueaditional, setValueaditional] = useState(10);

  let values = queryString.parse(useLocation().search);
  const dispatch = useDispatch();
  const current_user = useSelector(state => state.auth);
  useEffect(() => {
    Scroll()

    async function loadRentattempt () {
      const response = await api.get(`rent/attempt/${values.rent_attempt}/${values.code_attempt}`, {
      });

      if (response.data.rentattempt.length > 0) {
        loadWorkadduser(response.data.rentattempt[0].id, response.data.rentattempt[0].tool.lat, response.data.rentattempt[0].tool.lng)  
        setRentattemp(response.data.rentattempt[0]);

        setStartAm(moment(response.data.rentattempt[0].startdate).format('YYYY-MM-DD'));
        setEndAm(moment(response.data.rentattempt[0].enddate).format('YYYY-MM-DD'));

        setStart(moment(response.data.rentattempt[0].startdate).format('DD/MM/YYYY'));
        setEnd(moment(response.data.rentattempt[0].enddate).format('DD/MM/YYYY'));
        setOkAttempt(true)
      } else {
        setOkAttempt(false)
      }
    }
    loadRentattempt();

    async function loadPerfil() {
      if (isAuthenticated()) {
        const response = await api.get(`/perfil`, {
        });
        console.log(response.data)
        setPerfil(response.data.user[0])  
      }
    }
    loadPerfil();

    async function verifyDocumentrent(){
      if (isAuthenticated() === true) {
        
        if (Object.keys(current_user).length > 0) {
          console.log(current_user.id)
          
          const response = await api.get(`/documents/${current_user.id}`, {
          });
          setDocument(response.data.documentUser[0])  
        }else{
          console.log('asdsa')
        }
      }
    }
    verifyDocumentrent();

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
        setClass('bottom-box')
    }
    showBottom()

    async function loadFreight (userid) {
      const response = await api.get(`/userconfig/${userid}`, {
      });
      setFreight('with')
      setUserconfig(response.data.userconfig[0]) 
    }

    async function loadWorkadduser (rentid, lat, lng) {

      const responseworkadd = await api.get(`/workadd/${rentid}?lat=${lat}&lng=${lng}`, {
      });
      setWorkaddshow(responseworkadd.data.workadd[0].distance.toFixed(2))
      setWorkadd(responseworkadd.data.workadd[0])
      var cityverify = responseworkadd.data.workadd[0]

      if (cityverify.city === 'São José dos Pinhais' || 
      cityverify.city === 'Colombo' 
      || cityverify.city === 'Piraquara' || cityverify.city === 'Araucária' || cityverify.city === 'Quatro Barras'
      || cityverify.city === 'Campina Grande do Sul' || cityverify.city === 'Almirante Tamandaré' || cityverify.city === 'Campo Magro'
      || cityverify.city === 'Fazenda Rio Grande' || cityverify.city === 'Campo Largo') {
        localStorage.setItem('@mtp', true);
      }else{
        localStorage.setItem('@mtp', false);
      }
    }

    return () => {
    };
  }, [current_user])


  const success = () => Notification(
    'success',
    'Oba! Sua reserva está feita.', 
    {
      autoClose: 4100,
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

  const paymentRent = () => {
    if (new Date(moment(startam).format('YYYY-MM-DD')) > new Date(moment().format('YYYY-MM-DD')) === true && period === '') {
      setPeriodwiarning(true)
      if (isMobile) {
        window.location.href = "#"+"hour";
      }else {
        window.location.href = "#"+"hour";
      }
    }else{
      setPeriodwiarning('')
      if (typepayment === false) {
        setColorbt('is-danger')
        setOpenpayment(!openpayment)
  
        if (typepayment === false) {
          if (isMobile) {
            window.location.href = "#"+"formpayment";
          }else {
            window.location.href = "#"+"formpayment";
          }
        }
      } else {
        if (document !== undefined) {
          if (document.document !== null && document.selfie !== null) {
            if (perfil.cpfcnpj === "" || perfil.cpfcnpj === null) {
              Scroll()
              addDoc(true)
            } else {
              if (perfil.cpfcnpj.length > 14 && document.enterprise === null) { 
                Scroll()
                addDoc(true)
              }else{
                updateRentattemp()    
              }
            }
          }
        } else {
          Scroll()
          addDoc(true)
        }
//        
      }
    }
  }

  const Choosepayment = (payment) => {
    if (payment === 'creditcard') {
      setTypepayment('creditcard')
    } else if (payment === 'money') {
      setTypepayment('money')
    } else if (payment === 'machine') {
      setTypepayment('machine')
    } else if (payment === 'boleto') {
      setTypepayment('boleto')
    }
    setColoractive('active-payment')
  }

  const Tracking = (category, action, label) => {
    Scroll()
    ReactGA.event({
      category: category,
      action: action,
      label: label
    });
  }

  async function loadPerfil() {
    if (isAuthenticated()) {
      const response = await api.get(`/perfil`, {
      });
      setPerfil(response.data.user[0])  
    }
  }

  async function loaddocumenttwo () {
    if (isAuthenticated() === true) {
      if (current_user.length !== 0) {
        const response = await api.get(`/documents/${current_user.id}`, {
        });
        loadPerfil()
        setDocument(response.data.documentUser[0])  
      }  
    }
  }


  const closeAdd = () => {
    //window.location.reload();
    loaddocumenttwo()
   // addDoc(false)
    success()
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
    var message = `Olá ${lessor}, ${renter} alugou sua ${titletool} com tensão em ${tension} para o período de ${startdate} á ${enddate}.
    `;
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
      Tracking('Finalizaou', 'Finalizou', 'entrega e finish')
      history.push(`/s/payment/congrats/${rentattempt.idf}?tool=${values.tool}&code_attempt=${rentattempt.codeattempt}`);
    }).catch((err) => {
      console.log(err.response)
    }) 
  }

  const handleChangePeriod = (option) => {
    setPeriod(option.value);
  }

  const Openpayment = () => {
    setOpenpayment(!openpayment)

    if (isMobile) {
      window.location.href = "#"+"choose";
    }else {
      window.location.href = "#"+"choose";
    }
  }

  async function updateRentattemp (operation) {
    var acq = ''
    var freightnew = '';

    loaddocumenttwo()

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

    if (operation === 'cancel') {
      var rentupdate = {
        freight: parseFloat(freightnew.toFixed(2)),
        startdate: rentattempt.startdate,
        enddate: rentattempt.enddate,
        acquisition: acq,
        finishprocess: 'y',
        coin: coin,
        typepayment: typepayment,
        periodhour: period,
        accept: 'F'
      }  
    } else {
      var rentupdate = {
        freight: parseFloat(freightnew.toFixed(2)),
        startdate: rentattempt.startdate,
        enddate: rentattempt.enddate,
        acquisition: acq,
        finishprocess: 'y',
        coin: coin,
        typepayment: typepayment,
        periodhour: period
      }  
    }

    await api.put(`rent/attempt/updaterent/${rentattempt.id}`, rentupdate, {})
    .then((res) => {
      console.log(operation)
      if (operation === 'cancel') {
        goLinkbye()
      } else {
        verifyAvailabletool()
      }
      //      history.push(`/s/payment/rent-paymentfinish?rent_attempt=${values.rent_attempt}&tool=${values.tool}&code_attempt=${values.code_attempt}`)      
    }).catch((err) => {
      console.log(err.response)
    })   
  }

  const goLinkbye = () => {
    history.push(`/s/cancelmentrent`)      
  }

  const handleFreight = (event) => {
    setFreight(event.target.value)
    setAcquisition(event.target.value)
  }

  const renderPrice = () => {
    var text = ''
    var days = rentattempt.days
    var weekend = 1
    var months = rentattempt.month

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
          text = ` x ${months} Mês(es)`
        }
      }
    }
    return text
  }

  const renderOption = () => {
    var opt = [

    ]

    var time =  moment(new Date()).format('HH:mm')
    if (time >= '08:00' && time <= '10:00') {
      opt.push({label: 'Manhã - 08:00 às 10:00', value: 'Manhã - 08:00 às 10:00'})
      opt.push({label: 'Manhã - 10:00 às 12:00', value: 'Manhã - 10:00 às 12:00'})
      opt.push({label: 'Meio dia - 12:00 às 13:00', value: 'Meio dia - 12:00 às 13:00'})
      opt.push({label: 'Tarde - 13:00 às 15:00', value: 'Tarde - 13:00 às 15:00'})
      opt.push({label: 'Tarde - 15:00 às 17:00', value: 'Tarde - 15:00 às 17:00'})
      opt.push({label: 'Noite - 17:00 às 19:00', value: 'Noite - 17:00 às 19:00'})
    }

    if (time >= '10:00' && time <= '12:00') {
      opt.push({label: 'Manhã - 10:00 às 12:00', value: 'Manhã - 10:00 às 12:00'})
      opt.push({label: 'Meio dia - 12:00 às 13:00', value: 'Meio dia - 12:00 às 13:00'})
      opt.push({label: 'Tarde - 13:00 às 15:00', value: 'Tarde - 13:00 às 15:00'})
      opt.push({label: 'Tarde - 15:00 às 17:00', value: 'Tarde - 15:00 às 17:00'})
      opt.push({label: 'Noite - 17:00 às 19:00', value: 'Noite - 17:00 às 19:00'})
    }

    if (time >= '12:00' && time <= '13:00') {
      opt.push({label: 'Meio dia - 12:00 às 13:00', value: 'Meio dia - 12:00 às 13:00'})
      opt.push({label: 'Tarde - 13:00 às 15:00', value: 'Tarde - 13:00 às 15:00'})
      opt.push({label: 'Tarde - 15:00 às 17:00', value: 'Tarde - 15:00 às 17:00'})
      opt.push({label: 'Noite - 17:00 às 19:00', value: 'Noite - 17:00 às 19:00'})
    }

    if (time >= '13:00' && time <= '15:00') {
      opt.push({label: 'Tarde - 13:00 às 15:00', value: 'Tarde - 13:00 às 15:00'})
      opt.push({label: 'Tarde - 15:00 às 17:00', value: 'Tarde - 15:00 às 17:00'})
      opt.push({label: 'Noite - 17:00 às 19:00', value: 'Noite - 17:00 às 19:00'})
    }

    if (time >= '15:00' && time <= '17:00') {
      opt.push({label: 'Tarde - 15:00 às 17:00', value: 'Tarde - 15:00 às 17:00'})
      opt.push({label: 'Noite - 17:00 às 19:00', value: 'Noite - 17:00 às 19:00'})
    }

    if (time >= '17:00' && time <= '19:00') {
      opt.push({label: 'Noite - 17:00 às 19:00', value: 'Noite - 17:00 às 19:00'})
    }

    if (time >= '19:00' && time <= '23:59') {
      opt.push({label: 'Sua entrega será feita amanhã no primeiro horário', value: 'Sua entrega será feita amanhã no primeiro horário'})
    }

    return opt;
   
  }

  const handleChangeCoin = (coin) => {
    setCoin(coin)
  }

  const renderCalc = () => {

    var kmregional = 5

    var freight = '';
    var minfreight = ''; 


    if (userconfig !== undefined) {
      freight = userconfig.freight !== undefined ? parseFloat(userconfig.freight.replace(/\./gi,'').replace(/,/gi,'.')) : 1.40;
      minfreight = userconfig.freight !== undefined ? parseFloat(userconfig.min.replace(/\./gi,'').replace(/,/gi,'.')) : 14;
    } else {
      freight = 1;
      minfreight = 5;
    }

    var kmcurrent = workadd.distance;

    console.log(workadd.distance)


    var fr = 0;
    var costfreight = 0;

    if (kmcurrent >= 0 && kmcurrent < 7) {
      console.log('não t')
      costfreight = minfreight;
    }else{
      if (kmcurrent > 7.0 && kmcurrent < 8) {
        fr = 2.20
      }

      if (kmcurrent > 8.0 && kmcurrent < 10) {
        fr = 2.00
      }
  
      if (kmcurrent > 10 && kmcurrent < 15) {
        fr = 1.60
      }
      
      if (kmcurrent > 15) {
        fr = 1.56
      }
  
      if (kmcurrent > 20.0) {
        fr = 1.46      
      }
      costfreight = fr * kmcurrent;


    }


    /* Promoção de entrega a 15 reais */
    //    costfreight = 15;
    

    if (aditional === true) {
      costfreight = costfreight + valueaditional
    }

    if (localStorage.getItem('@mtp') === 'true') {
      var aditional = 10.0;
      costfreight = costfreight + aditional;
    }else {
      costfreight = costfreight;
    }



    return costfreight
  }

  const hideRedirect = () => {
    setModal(false)
  }

  const nextStep = () => {
    setAditional(true)
    setModal(false)
  }

  const cancelStep = () => {
    setModal(false)
    updateRentattemp('cancel')
  }

  return (
    <>
        <Helmet>
          <title>{ 'Entrega e custo' }</title>
        </Helmet>
        <div className={adddoc === false ? "container" : ""}>
      {
        adddoc === true ? 
        (
          <Adddocument onClose={closeAdd} rent={rentattempt.id} confirmRent={updateRentattemp}/>
        )
        :
        (
          <>
      {
        okattempt === true ? 
        (
          <div className="columns rent-paymentt">
            <div className="column is-two-thirds">
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
                    <ScrollableAnchor id={'hour'}>
                      <div></div>
                    </ScrollableAnchor>
                    <p className="title-tool-only-little"> Entrega e coleta do equipamento </p>
                    <br/>
                    <span className=""></span>
                    <span className="valuefreight">{
                      workaddshow < 5 ? '4.0 km ' : workaddshow + ' km'

                    }</span>
                    <span className="valuefreight"> de você.</span>
                    <br/>
                    <span className="distance">Taxa de entrega e coleta: </span>
                    <IntlProvider locale="pt-br" timeZone="Brasil/São Paulo">
                      <b className="number-delivery"><FormattedNumber value={renderCalc()} style="currency" currency="BRL" /></b>
                    </IntlProvider>;
                    <hr/>
                    <p className="title-tl-input">Recebimento do equipamento</p>
                    <br/>
                    {
                         new Date(moment(startam).format('YYYY-MM-DD')) > new Date(moment().format('YYYY-MM-DD')) === true ?
                        (
                          <>
                            <Select
                              className={''}
                              options={[
                                {label: 'Manhã - 08:00 às 10:00', value: 'Manhã - 08:00 às 10:00'}, 
                                {label: 'Manhã - 10:00 às 12:00', value: 'Manhã - 10:00 às 12:00'},
                                {label: 'Tarde - 13:00 às 15:00', value: 'Tarde - 13:00 às 15:00'},
                                {label: 'Tarde - 15:00 às 17:00', value: 'Tarde - 15:00 às 17:00'},
                                {label: 'Noite - 17:00 às 19:00', value: 'Noite - 17:00 às 19:00'},
                              ]}
                              isSearchable={true}
                              placeholder={'Começo da manhã - 08:00 às 10:00'}
                              onChange={selectedOption => {
                                handleChangePeriod(selectedOption);
                              }}
                              value={values.category}
                            />
                            <p className="warning">
                              {
                                periodwarning === true ? 
                                ('Por favor, escolha em qual período deseja receber o alugado')
                                :
                                ('')
                              }
                            </p>
                          </>
                        )
                        :
                        (
                          <>
                            <Select
                              className={''}
                              options={renderOption()}
                              isSearchable={true}
                              placeholder={'Começo da manhã - 08:00 às 10:00'}
                              onChange={selectedOption => {
                                handleChangePeriod(selectedOption);
                              }}
                              value={values.category}
                            />
                            <p className="warning">
                              {
                                periodwarning === true ? 
                                ('Por favor, escolha em qual período deseja receber o alugado')
                                :
                                ('')
                              }
                            </p>
                          </>
                        )
                    }
                    <br/>
                    <p className="know">Algumas coisas que você precisa saber:</p>
                    <br/>
                    <b>* Horário de devolução no mesmo horário da entrega.</b>
                    <br/>
                    <br/>
                    <b>*Pagamento na maquininha e no dinheiro serão pagos diretamente ao entregador no ato da entrega do equipamento.*</b>
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
                <div className="columns is-mobile">
                  <div className="column">
                    <b> Aluguel </b> <br/> { start }
                  </div>
                  <div className="column">
                    <b> Devolução </b> <br/> { end }                    
                  </div>
                </div>
                {
                  tool.tension !== '-' && tool.tension !== '/' ? 
                  (
                    <>
                      <div className="columns is-mobile no-margin-top-columns">
                        <div className="column">
                          Tensão
                        </div>
                        <div className="column">
                          <div className="is-pulled-right">
                            { rentattempt.tension === 'Tri' ? 'Trifásico' : rentattempt.tension }
                          </div>
                        </div>
                      </div>    
                    </>
                  )
                  :
                  (
                    <>
                      <div className="columns is-mobile no-margin-top-columns">
                        <div className="column">
                          Potência
                        </div>
                        <div className="column">
                          <div className="is-pulled-right">
                            <b>{ tool.power }</b>
                          </div>
                        </div>
                      </div>

                    </>
                  )
                }
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
                  <ScrollableAnchor id={'formpayment'}>
                    <div></div>
                  </ScrollableAnchor>
                </div>
                <ScrollableAnchor id={'choose'}>
                  <div></div>
                </ScrollableAnchor>
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
                      <b>+ Entrega&Coleta</b>
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
              <button className={`button is-fullwidth box-payment-form ${colorbt}`} onClick={event=> Openpayment()} id="teste">
                <p className="text-payment-not">
                  {
                    colorbt === 'is-danger' ? 
                    (
                      <>
                        Escolha a forma de pagamento
                      </>  
                    )
                    :
                    (
                      <>Forma de pagamento</>
                    )
                  }
                </p>
              </button>
              {
                openpayment === true ? 
                (
                  <>
                    <div className="columnss box-option-payment">
                      <div className="box-form-pay">
                        ** O pagamento se for na maquininha ou no dinheiro, é feito diretamente ao entregador **
                      </div>
                      <div className={`colunm line-option-payment`} onClick={event => Choosepayment('creditcard')}>
                        <img src={mastercard} className="icon-payment"/>
                        <span>Cartão de crédito</span>
                        {
                          typepayment === 'creditcard' ? 
                          (
                            <>
                              <span className="is-pulled-right">
                                <FontAwesomeIcon icon={['fas', 'check-circle']} size="1x" className="icon-payment-check"/>
                              </span>
                            </>
                          )
                          :
                          (
                            <>
                            </>
                          )
                        }
                        <p>Na plataforma</p>
                      </div>
                      <div className="colunm line-option-payment" onClick={event => Choosepayment('machine')}>
                        <img src={machine} className="icon-payment"/>
                        <span>Maquininha</span>
                        {
                          typepayment === 'machine' ? 
                          (
                            <>
                              <span className="is-pulled-right">
                                <FontAwesomeIcon icon={['fas', 'check-circle']} size="1x" className="icon-payment-check"/>
                              </span>
                            </>
                          )
                          :
                          (
                            <>
                            </>
                          )
                        }
                        <p>Crédito e Débito no recebimento do equipamento</p>
                      </div>
                      <div className={`colunm line-option-payment ${typepayment === 'money' ? 'money-line' : ''}`} onClick={event => Choosepayment('money')}>
                        <img src={money} className="icon-payment"/>
                        <span>Dinheiro</span>
                        {
                          typepayment === 'money' ? 
                          (
                            <>
                              <span className="is-pulled-right">
                                <FontAwesomeIcon icon={['fas', 'check-circle']} size="1x" className="icon-payment-check"/>
                              </span>
                            </>
                          )
                          :
                          (
                            <>
                            </>
                          )
                        }
                        <p>No recebimento do equipamento.</p>
                        {
                          typepayment === 'money' ? 
                          (
                            <>
                              <div className="coin">
                                <p>Troco para quanto? </p>
                                <CurrencyInput
                                  name="price2"
                                  type="text"
                                  decimalSeparator="," thousandSeparator="."
                                  placeholder="Ex: R$ 30,00"
                                  className={'input'}
                                  foc
                                  onChange={event => handleChangeCoin(event)}
                                  value={coin}
                                />
                              </div>
                            </>
                          )
                          :
                          (<></>)
                        }
                      </div>
                      {
                        moment.preciseDiff( new Date(), moment(startam).format('YYYY-MM-DD'), true).days > 2 ? 
                        (
                          <>
                            <div className="colunm line-option-payment" onClick={event => Choosepayment('boleto')}>
                              <img src={boleto} className="icon-payment"/>
                              <span>Boleto</span>
                              {
                                typepayment === 'boleto' ? 
                                (
                                  <>
                                    <span className="is-pulled-right">
                                      <FontAwesomeIcon icon={['fas', 'check-circle']} size="1x" className="icon-payment-check"/>
                                    </span>
                                  </>
                                )
                                :
                                (
                                  <>

                                  </>
                                )
                              }
                              <p>Reservas com 3 dias de antecedências, disponível boleto.</p>
                            </div>
                          </>
                        )
                        :
                        (
                          <>
                            <div className="colunm line-option-payment">
                              <img src={boleto} className="icon-payment"/>
                              <span>Boleto</span>
                              {
                                typepayment === 'boleto' ? 
                                (
                                  <>
                                    <span className="is-pulled-right">
                                      <FontAwesomeIcon icon={['fas', 'check-circle']} size="1x" className="icon-payment-check"/>
                                    </span>
                                  </>
                                )
                                :
                                (
                                  <>

                                  </>
                                )
                              }
                              <p style={{ color: 'red'}}>Data indisponível para boleto.</p>
                            </div>
                          </>
                        )
                      }
                    </div>
                  </>
                )
                :
                (
                  <>
                  </>
                )
              }
              <div>

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

          </>
        )
      }
    </div>
    {
        adddoc === true ? 
        (
          <>
          </>
        )
        :
        (
          <>
            <div className={setclass}>
              <div className="columns">
                {
                  isMobile ?
                  ('')
                  :
                  (
                    <>
                      <div className="column biis-hidden-bottom">
                        <p>Aluguel de <span className="titlerentbox">{ tool.title }</span></p>
                      </div>
                    </>
                  ) 
                }
                <>
                  <div className="column">
                    <div className="columns is-mobile">
                      <div className="column">
                        <Button 
                          type={'button'}
                          className={'button is-pulled-right color-logo bt-app2 bt-confirm'}
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
                </>
              </div>
              <div className="modal-paymenrent">
                {
                  rentattempt.finishprocess === "y" ? 
                  (
                    <>
                    </>
                  )
                  :
                  (
                    <>
                      <Modal 
                        show={modal} 
                        onCloseModal={hideRedirect}
                        closeEscAllowed={false} 
                        closeOnAllowed={false}
                      >
                        <h3 className="has-text-centered title is-4">Seu aluguel é para uma região na qual não atuamos :(</h3>
                        <p>Para que possamos entregar o equipamento neste local, será necessário acrescentar R$ 10,00 no valor da entrega & coleta.</p>
                        <br/>
                        <div className="has-text-centered">
                        <span className="text-adiciontal">
                          <IntlProvider locale="pt-br" timeZone="Brasil/São Paulo">
                            <b className="number-delivery">Taxa</b>
                          </IntlProvider>                    
                        </span>
                        <span className="text-adiciontal">
                          <IntlProvider locale="pt-br" timeZone="Brasil/São Paulo">
                            <b className="number-delivery">Adicional</b>
                          </IntlProvider>     
                        </span>
                        </div>
                        <div className="has-text-centered">
                        <IntlProvider locale="pt-br" timeZone="Brasil/São Paulo">
                          <b className="number-delivery"><FormattedNumber value={renderCalc()} style="currency" currency="BRL" /></b>
                        </IntlProvider>
                          <span className="span-adiciontal">+</span>
                        <IntlProvider locale="pt-br" timeZone="Brasil/São Paulo">
                          <b className="number-delivery"><FormattedNumber value={10} style="currency" currency="BRL" /></b>
                        </IntlProvider>     
                        <br/><span class="valueadtotal">
                          = <IntlProvider locale="pt-br" timeZone="Brasil/São Paulo">
                            <b className="number-delivery"><FormattedNumber value={renderCalc()+ 10} style="currency" currency="BRL" /></b>
                          </IntlProvider>.
                          </span> 
                        </div>
                        <br/>
                        <div className="columns invert">
                          <div className="column has-text-centered">
                            <button className={`button is-fullwidth is-primary`} onClick={event=> nextStep()} id="teste">
                              Ok, Prosseguir
                            </button>
                          </div>
                          <div className="column has-text-centered">
                            <button className={`button is-fullwidth is-danger`} onClick={event=> cancelStep()}>
                              Cancelar
                            </button>
                          </div>
                        </div>
                      </Modal>             

                    </>
                  )
                }
              </div>
            </div>
          </>
        )
      }
    </>
  );
};

export default Payment;
