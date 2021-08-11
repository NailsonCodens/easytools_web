import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Button } from '../../../../components/Form/Button';
import api from '../../../../services/api';
import apiextern from '../../../../services/apiextern';
import socketio from '../../../../services/socketio';
import queryString from 'query-string';
import QRCode from 'qrcode-react';
import Rentruesblock from '../../../Warnings/Rentrulesblock';
import { useLocation } from "react-router-dom";
import { Rentinfo } from '../../../../store/actions/rentinfo';
import { IntlProvider, FormattedNumber } from 'react-intl';
import { Field } from '../../../../components/Form/Form';
import Notification from '../../../../utils/notification';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import Adddocument from '../../Tool/adddocument';
import { isAuthenticated } from "../../../../services/auth";
import ReactGA from 'react-ga';
import Modal from '../../../../components/Modal';
import Scroll from '../../../../utils/scroll';
import ScrollableAnchor from 'react-scrollable-anchor'
import Select from 'react-select';
import { Helmet } from 'react-helmet';
import moment from 'moment';
import Email from '../../../../utils/sendemail';
import mastercard from '../../../../assets/images/mastercard.png';
import machine from '../../../../assets/images/machine2.png';
import boleto from '../../../../assets/images/boleto-icon.png';
import pix from '../../../../assets/images/pix.png';
import {
  isMobile
} from "react-device-detect";
import 'moment/locale/pt-br';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCheckCircle, faCopy } from '@fortawesome/free-solid-svg-icons'
library.add(faCheckCircle, faCopy);

moment.locale('pt-BR');

const Payment = ({ history }) => {
  const [rentattempt, setRentattemp] = useState([]);
  // eslint-disable-next-line
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
  const [period, setPeriod] = useState('');
  const [periodwarning, setPeriodwiarning] = useState('');
  const [startam, setStartAm] = useState('');
  const [endam, setEndAm] = useState('');
  const [perfil, setPerfil] = useState([]);
  const [descount, setDescount] = useState('');
  const [valuedescount, setValuedescount] = useState(0);
  const [document, setDocument] = useState({})
  const [adddoc, addDoc] = useState(false)
  const [modal, setModal] = useState(false);
  const [modalpix, setModalpix] = useState(false);
  const [aditional, setAditional] = useState(false);
  const [cancel, setCancel] = useState(false);
  const [valueaditional, setValueaditional] = useState(10);
  const [obs, setObs] = useState('');
  const [hourdevolution, setHourdevolution] = useState('Manhã - 08:00 às 10:00');
  const [qrcode, setQrcode] = useState('-');
  const [qrpixcode, setQrpixcode] = useState('');
  const [copied, setCopied] = useState(false);

  let values = queryString.parse(useLocation().search);
  const dispatch = useDispatch();
  const current_user = useSelector(state => state.auth);
  useEffect(() => {
    Scroll()

    async function loadRentattempt() {
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

    async function verifyDocumentrent() {
      if (isAuthenticated() === true) {

        if (Object.keys(current_user).length > 0) {
          console.log(current_user.id)

          const response = await api.get(`/documents/${current_user.id}`, {
          });
          setDocument(response.data.documentUser[0])
        } else {
          console.log('asdsa')
        }
      }
    }
    verifyDocumentrent();

    async function loadTool() {
      const response = await api.get(`/tools_site/tool/${values.tool}`, {
      });
      if (response.data.tool.length > 0) {
        dispatch(Rentinfo(response.data.tool[0]));
        setTool(response.data.tool[0])
        setOk(true)
      } else {
        setOk(false)
      }
      loadFreight(response.data.tool[0].user_id)
    }
    loadTool();

    async function showBottom() {
      //verificar mobile
      setClass('bottom-box')
    }
    showBottom()

    async function loadFreight(userid) {
      const response = await api.get(`/userconfig/${userid}`, {
      });
      setFreight('with')
      setUserconfig(response.data.userconfig[0])
    }

    async function loadWorkadduser(rentid, lat, lng) {
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
      } else {
        localStorage.setItem('@mtp', false);
      }
    }

    return () => {
    };
  }, [current_user])
  //a7cd78e0-d8f4-4dac-890c-f3580dbf8387


  const copy = (e) => {
    success2()
  }

  const warning = () => Notification(
    'warning',
    'Este cupom está indisponível.',
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

  const successdescount = () => Notification(
    'success',
    'Desconto ativado com sucesso.',
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


  const success2 = () => Notification(
    'success',
    'Qrcode copiado!',
    {
      autoClose: 1000,
      draggable: false,
    },
    {
      position: "top-center",
      autoClose: 1000,
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
        window.location.href = "#" + "hour";
      } else {
        window.location.href = "#" + "hour";
      }
    } else {
      setPeriodwiarning('')
      if (typepayment === false) {
        setColorbt('is-danger')
        setOpenpayment(!openpayment)

        if (typepayment === false) {
          if (isMobile) {
            window.location.href = "#" + "formpayment";
          } else {
            window.location.href = "#" + "formpayment";
          }
        }
      } else {
        if (document !== undefined) {
          if (document.document !== null) {
            if (perfil.cpfcnpj === "" || perfil.cpfcnpj === null) {
              Scroll()
              addDoc(true)
            } else {
              if (perfil.cpfcnpj.length > 14 && document.enterprise === null) {
                Scroll()
                addDoc(true)
              } else {
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

  async function apipix(amount) {
    var date = new Date();
    var limit = moment(date.setDate(date.getDate() + 1)).format('YYYY-MM-DD')

    var final = parseFloat(amount) * 100; /*a*/
    var amount = parseFloat(final.toFixed(2));
    console.log(amount)
    var pix = {
      "api_key": process.env.REACT_APP_KEY_PIX, /*ak_live_NB9Nh2HlZ0uNJ6ZAHpO3TqbhX8mflX   "ak_test_IvoBZC3YcNhurk9N7ueuTOddd7VB69"*/
      "payment_method": process.env.REACT_APP_PAYMENT_METHOD,
      "amount": amount,
      "pix_expiration_date": limit,
      "pix_additional_fields": [{
        "name": `${tool.title}`,
        "value": "1"
      }]
    };

    const response = await apiextern.post(`https://api.pagar.me/1/transactions`, pix, {}).then((res) => {

      setQrpixcode(res.data.pix_qr_code)
    }).catch((err) => {
      console.log(err.data)
    })
  }

  const Choosepayment = (payment, amount) => {
    if (payment === 'creditcard') {
      setTypepayment('creditcard')
    } else if (payment === 'money') {
      setTypepayment('money')
    } else if (payment === 'machine') {
      setTypepayment('machine')
    } else if (payment === 'boleto') {
      setTypepayment('boleto')
    } else if (payment === 'pix') {
      apipix(amount)
      setTypepayment('pix')
      setModalpix(true)

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

  async function loaddocumenttwo() {
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

  async function sendNotification() {
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
        socketio.emit('notify', {
          to: rentattempt.user_lessor_id,
          title: title,
          message: message
        });
        Tracking('Finalizaou', 'Finalizou', 'entrega e finish')
        history.push(`/s/payment/congrats/${rentattempt.idf}?tool=${values.tool}&code_attempt=${rentattempt.codeattempt}`);
      }).catch((err) => {
        console.log(err.response)
      })
  }

  const handleChangePeriod = (option) => {
    setPeriod(option.value);

    var d = moment(startam).format('YYYY-MM-DD') === moment(endam).format('YYYY-MM-DD') ? '' : setHourdevolution(option.value)


  }

  const Openpayment = () => {
    setOpenpayment(!openpayment)

    if (isMobile) {
      window.location.href = "#" + "choose";
    } else {
      window.location.href = "#" + "choose";
    }
  }

  async function updateRentattemp(operation) {
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
      freightnew = renderCalc() - valuedescount
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
        accept: 'F',
        obs: obs,
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
        periodhour: period,
        obs: obs,
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
        } else {
          text = ` x ${months} Mês(es)`
        }
      }
    }
    return text
  }

  const renderOption = () => {
    var opt = [

    ]

    var time = moment(new Date()).format('HH:mm')

    if (time >= '05:00' && time <= '10:00') {
      opt.push({ label: 'Manhã - 08:00 às 10:00', value: 'Manhã - 08:00 às 10:00' })
      opt.push({ label: 'Manhã - 10:00 às 12:00', value: 'Manhã - 10:00 às 12:00' })
      opt.push({ label: 'Meio dia - 12:00 às 13:00', value: 'Meio dia - 12:00 às 13:00' })
      opt.push({ label: 'Tarde - 13:00 às 15:00', value: 'Tarde - 13:00 às 15:00' })
      opt.push({ label: 'Tarde - 15:00 às 17:00', value: 'Tarde - 15:00 às 17:00' })
      opt.push({ label: 'Noite - 17:00 às 19:00', value: 'Noite - 17:00 às 19:00' })
    }

    if (time >= '10:00' && time <= '12:00') {
      opt.push({ label: 'Manhã - 10:00 às 12:00', value: 'Manhã - 10:00 às 12:00' })
      opt.push({ label: 'Meio dia - 12:00 às 13:00', value: 'Meio dia - 12:00 às 13:00' })
      opt.push({ label: 'Tarde - 13:00 às 15:00', value: 'Tarde - 13:00 às 15:00' })
      opt.push({ label: 'Tarde - 15:00 às 17:00', value: 'Tarde - 15:00 às 17:00' })
      opt.push({ label: 'Noite - 17:00 às 19:00', value: 'Noite - 17:00 às 19:00' })
    }

    if (time >= '12:00' && time <= '13:00') {
      opt.push({ label: 'Meio dia - 12:00 às 13:00', value: 'Meio dia - 12:00 às 13:00' })
      opt.push({ label: 'Tarde - 13:00 às 15:00', value: 'Tarde - 13:00 às 15:00' })
      opt.push({ label: 'Tarde - 15:00 às 17:00', value: 'Tarde - 15:00 às 17:00' })
      opt.push({ label: 'Noite - 17:00 às 19:00', value: 'Noite - 17:00 às 19:00' })
    }

    if (time >= '13:00' && time <= '15:00') {
      opt.push({ label: 'Tarde - 13:00 às 15:00', value: 'Tarde - 13:00 às 15:00' })
      opt.push({ label: 'Tarde - 15:00 às 17:00', value: 'Tarde - 15:00 às 17:00' })
      opt.push({ label: 'Noite - 17:00 às 19:00', value: 'Noite - 17:00 às 19:00' })
    }

    if (time >= '15:00' && time <= '17:00') {
      opt.push({ label: 'Tarde - 15:00 às 17:00', value: 'Tarde - 15:00 às 17:00' })
      opt.push({ label: 'Noite - 17:00 às 19:00', value: 'Noite - 17:00 às 19:00' })
    }

    if (time >= '17:00' && time <= '19:00') {
      opt.push({ label: 'Noite - 17:00 às 19:00', value: 'Noite - 17:00 às 19:00' })
    }

    if (time >= '19:00' && time <= '23:59') {
      opt.push({ label: 'Amanhã pela manhã - 08:00 às 10:00', value: 'Manhã - 08:00 às 10:00' })
      opt.push({ label: 'Amanhã pela manhã - 10:00 às 12:00', value: 'Manhã - 10:00 às 12:00' })
      opt.push({ label: 'Amanhã ao meio dia - 12:00 às 13:00', value: 'Meio dia - 12:00 às 13:00' })
      opt.push({ label: 'Amanhã a tarde - 13:00 às 15:00', value: 'Tarde - 13:00 às 15:00' })
      opt.push({ label: 'Amanhã a tarde - 15:00 às 17:00', value: 'Tarde - 15:00 às 17:00' })
      opt.push({ label: 'Amanhã pela a noite - 17:00 às 19:00', value: 'Noite - 17:00 às 19:00' })
    }

    return opt;
  }

  const descontRender = () => {
    console.log(descount)


    if (descount === 'easytools15%') {
      var desc = renderCalc() / 100 * 15
      setValuedescount(desc)
      successdescount()
    } else if (descount === 'ferramentafacil20%') {
      var desc = renderCalc() / 100 * 20
      setValuedescount(desc)
      successdescount()
    } else if (descount === 'aluga30%') {
      var desc = renderCalc() / 100 * 30
      setValuedescount(desc)
      successdescount()
    } else {
      warning()
    }
  }

  const handleChangeCoin = (coin) => {
    setCoin(coin)
  }

  const renderCalc = (descount) => {

    var frtool = tool.freight === null ? '2,00' : tool.freight


    var kmregional = 5

    var freight = '';
    var minfreight = '';
    var increase = 0;
    var fr = 0;


    if (userconfig !== undefined) {
      fr = frtool !== undefined ? parseFloat(frtool.replace(/\./gi, '').replace(/,/gi, '.')) : 1.40;
      minfreight = userconfig.min !== undefined ? parseFloat(userconfig.min.replace(/\./gi, '').replace(/,/gi, '.')) : 14;
    } else {
      freight = 1;
      minfreight = 5;
    }

    var kmcurrent = workadd.distance;


    var costfreight = 0;


    if (kmcurrent >= 0 && kmcurrent < 4) {
      costfreight = minfreight;
    } else {
      if (kmcurrent > 4.0 && kmcurrent < 5) {
        increase = 120; //%
        fr = parseFloat(fr) + parseFloat(fr) * increase / 100
      }

      if (kmcurrent > 5.0 && kmcurrent < 6) {
        increase = 94; //%
        fr = parseFloat(fr) + parseFloat(fr) * increase / 100
      }

      if (kmcurrent > 6.0 && kmcurrent < 8) {
        increase = 60; //%
        fr = parseFloat(fr) + parseFloat(fr) * increase / 100
      }

      if (kmcurrent > 8.0 && kmcurrent < 10) {
        increase = 37; //%
        fr = parseFloat(fr) + parseFloat(fr) * increase / 100
      }

      if (kmcurrent > 10.0 && kmcurrent < 13) {
        increase = 18; //%
        fr = parseFloat(fr) + parseFloat(fr) * increase / 100
      }

      if (kmcurrent > 13.0 && kmcurrent < 15.0) {
        increase = 4; //%
        fr = parseFloat(fr) + parseFloat(fr) * increase / 100
      }

      if (kmcurrent > 15) {
        increase = 4; //%
        fr = parseFloat(fr) + parseFloat(fr) * increase / 100
      }

      if (kmcurrent > 20.0) {
        increase = 0; //%
        fr = parseFloat(fr) + parseFloat(fr) * increase / 100
      }

      costfreight = fr * kmcurrent;

    }

    /* Promoção de entrega a 15 reais */
    //    costfreight = 15;

    if (aditional === true) {
      costfreight = costfreight + valueaditional
    }


    if (localStorage.getItem('@mtp') === 'true') {
      var citym = localStorage.getItem('@cmtp');
      if (tool.city !== undefined) {

        if (citym === null) {
          citym = '';
        } else {
          let found = citym.toLowerCase()
            .includes(tool.city.toLowerCase());
          console.log(found)

          if (!found) {
            var aditional = 10.0;
            costfreight = costfreight + aditional;
          }
        }
      }
    } else {
      costfreight = costfreight;
    }

    return costfreight
  }

  const hideRedirectpix = () => {
    setModalpix(false);
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
        <title>{'Entrega e custo'}</title>
      </Helmet>
      <div className={adddoc === false ? "container" : ""}>
        <div class="container">
          <progress class="progress is-success progressbar" value="87.66" max="100"></progress>
        </div>
        <br />
        {
          adddoc === true ?
            (
              <Adddocument onClose={closeAdd} rent={rentattempt.id} confirmRent={updateRentattemp} />
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
                                        <br /><br />
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
                                  <div className="container box-rent-payment box-rent-pay-margin-top">
                                    <br />
                                    <p className="title-tool-only-little"> Entrega e coleta da ferramenta </p>
                                    <br />
                                    <span className=""></span>
                                    <span className="valuefreight">{
                                      workaddshow < 5 ? '4.0 km ' : workaddshow + ' km'

                                    }</span>
                                    <span className="valuefreight"> de você.</span>
                                    <br />
                                    <span className="distance">Taxa de entrega e coleta: </span>
                                    {
                                      valuedescount > 0 ?
                                        (
                                          <>
                                            <IntlProvider locale="pt-br" timeZone="Brasil/São Paulo">
                                              <b className="number-delivery"><FormattedNumber value={renderCalc() - valuedescount} style="currency" currency="BRL" /></b>
                                            </IntlProvider>;
                                            <IntlProvider locale="pt-br" timeZone="Brasil/São Paulo">
                                              <b className="number-delivery oldvaluedescount"><FormattedNumber value={renderCalc()} style="currency" currency="BRL" /></b>
                                            </IntlProvider>
                                          </>
                                        )
                                        :
                                        (
                                          <>
                                            <IntlProvider locale="pt-br" timeZone="Brasil/São Paulo">
                                              <b className="number-delivery"><FormattedNumber value={renderCalc()} style="currency" currency="BRL" /></b>
                                            </IntlProvider>;
                                        </>
                                        )
                                    }
                                    <br />
                                    <b>Cupom de desconto para entrega&coleta</b>
                                    <div className="columns">
                                      <div className="column is-5">
                                        <input type="text" name="descont" className="input input-descont" value={descount} onChange={event => setDescount(event.target.value)} />
                                      </div>
                                      <div className="column is-2">
                                        <button className={`button is-fullwidth is-primary is-outlined`} onClick={event => descontRender()}>
                                          Utilizar
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                  <hr />
                                  <div className="container box-rent-payment">
                                    <p className="title-tl-input">Recebimento do ferramenta</p>
                                    <br />
                                      {

                                      new Date(moment(startam).format('YYYY-MM-DD')) > new Date(moment().format('YYYY-MM-DD')) === true ?
                                        (
                                          <>
                                            <Select
                                              className={''}
                                              options={[
                                                { label: 'Manhã - 08:00 às 10:00', value: 'Manhã - 08:00 às 10:00' },
                                                { label: 'Manhã - 10:00 às 12:00', value: 'Manhã - 10:00 às 12:00' },
                                                { label: 'Tarde - 13:00 às 15:00', value: 'Tarde - 13:00 às 15:00' },
                                                { label: 'Tarde - 15:00 às 17:00', value: 'Tarde - 15:00 às 17:00' },
                                                { label: 'Noite - 17:00 às 19:00', value: 'Noite - 17:00 às 19:00' },
                                              ]}
                                              isSearchable={true}
                                              placeholder={'Manhã - 08:00 às 10:00'}
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
                                              placeholder={'Ex: Manhã - 08:00 às 10:00'}
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
                                    <br />
                                    {
                                      moment(startam).format('YYYY-MM-DD') === moment(endam).format('YYYY-MM-DD') ?
                                        (
                                          <>
                                            <p className="warning-dates-equals">
                                              *Para entrega e coleta no mesmo dia, o horário de devolução só pode ser a noite das 17:00 às 18:00*
                            </p>
                                            <br />
                                            <p className="title-tl-input"> Devolução do ferramenta </p>
                                            <br />
                                            <Select
                                              className={''}
                                              options={[
                                                { label: 'Noite - 15:00 às 16:00', value: 'Noite - 15:00 às 16:00' },
                                              ]}
                                              defaultValue={{ label: 'Noite - 15:00 às 16:00', value: 'Noite - 15:00 às 16:00' }}
                                              isSearchable={true}
                                              placeholder={'Ex: Noite - 15:00 às 16:00'}
                                            />
                                          </>
                                        )
                                        :
                                        (
                                          <>
                                            <p className="title-tl-input"> Devolução do ferramenta </p>
                                            <br />
                                            <p className="notation-devolution">{hourdevolution} da data da devolução</p>
                                          </>
                                        )
                                    }
                                    <p className="title-tl-input"> Observações </p>
                                    <br />
                                    <textarea className="textarea textarea2" value={obs} onChange={event => setObs(event.target.value)} placeholder="Tem algum horário exato que deseja receber ou outra pessoa vai receber por você no local? Nos diga aqui nas observações."></textarea>
                                    <br />
                                  </div>
                                  <hr />
                                  <div className="container box-rent-payment">
                                    <p className="know">Algumas coisas que você precisa saber:</p>
                                    <br />
                                    <b>* Horário de devolução no mesmo horário da entrega, exceto para devoluções o no mesmo dia.</b>
                                    <br />
                                    <p>* Para devoluções no mesmo dia o horário de devolução deve ser às 18:00 horas.</p>
                                    <br />
                                    {
                                      /* */
                                    }
                                    <b>*Pagamento na maquininha serão pagos diretamente ao entregador no ato da entrega da ferramenta.*</b>
                                  </div>
                                  <br /><br />
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
                                <img alt="tool" src={tool.picture1} alt={tool.picture1} className="" />
                              </div>
                              <div className="column">
                                <img alt="tool" src={tool.picture2} alt={tool.picture2} className="" />
                              </div>
                              <div className="column">
                                <img alt="tool" src={tool.picture3} alt={tool.picture3} className="" />
                              </div>
                            </div>
                            <p className="title-tool-rules">{tool.title}</p>
                            <div className="columns is-mobile">
                              <div className="column">
                                <b> Uso </b> <br /> {start}
                              </div>
                              <div className="column">
                                <b> Devolução </b> <br /> {end}
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
                                          {rentattempt.tension === 'Tri' ? 'Trifásico' : rentattempt.tension}
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
                                          <b>{tool.power}</b>
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
                            {
                              /*
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

                              */
                            }
                            {
                              freight === 'with' ?
                                (
                                  <div className="columns is-mobile no-margin-top-columns">
                                    <div className="column s">
                                      <b>Total + Entrega&Coleta</b>
                                    </div>
                                    <div className="column is-4">
                                      <p className="is-pulled-right">
                                        <IntlProvider locale="pt-br" timeZone="Brasil/São Paulo">
                                          <b><FormattedNumber value={parseFloat(rentattempt.cost) + renderCalc() - valuedescount} style="currency" currency="BRL" /></b>
                                        </IntlProvider>
                                      </p>
                                    </div>
                                  </div>
                                )
                                :
                                ('')
                            }
                            <button className={`button is-fullwidth box-payment-form ${colorbt}`} onClick={event => Openpayment()} id="teste">
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
                                      </div>
                                      <div className={`colunm line-option-payment`} onClick={event => Choosepayment('creditcard')}>
                                        <img alt="tool" src={mastercard} className="icon-payment" />
                                        <span>Cartão de crédito</span>
                                        {
                                          typepayment === 'creditcard' ?
                                            (
                                              <>
                                                <span className="is-pulled-right">
                                                  <FontAwesomeIcon icon={['fas', 'check-circle']} size="1x" className="icon-payment-check" />
                                                </span>
                                              </>
                                            )
                                            :
                                            (
                                              <>
                                              </>
                                            )
                                        }
                                        <p>Pague na plataforma</p>
                                      </div>
                                      <div className="colunm line-option-payment" onClick={event => Choosepayment('pix', parseFloat(rentattempt.cost) + renderCalc())}>
                                        <img alt="tool" src={pix} className="icon-payment icon-pix" />
                                        <span>PIX</span>
                                        {
                                          typepayment === 'pix' ?
                                            (
                                              <>
                                                <span className="is-pulled-right">
                                                  <FontAwesomeIcon icon={['fas', 'check-circle']} size="1x" className="icon-payment-check" />
                                                </span>
                                              </>
                                            )
                                            :
                                            (
                                              <>
                                              </>
                                            )
                                        }
                                        <p>Pague na plataforma com o PIX</p>
                                      </div>

                                      <div className="colunm line-option-payment" onClick={event => Choosepayment('machine')}>
                                        <img alt="tool" src={machine} className="icon-payment" />
                                        <span>Maquininha</span>
                                        {
                                          typepayment === 'machine' ?
                                            (
                                              <>
                                                <span className="is-pulled-right">
                                                  <FontAwesomeIcon icon={['fas', 'check-circle']} size="1x" className="icon-payment-check" />
                                                </span>
                                              </>
                                            )
                                            :
                                            (
                                              <>
                                              </>
                                            )
                                        }
                                        <p>Crédito e Débito no recebimento da ferramenta</p>
                                      </div>
                                      {
                                        /*

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

                                        */
                                      }

                                      {
                                        moment.preciseDiff(new Date(), moment(startam).format('YYYY-MM-DD'), true).days > 2 ?
                                          (
                                            <>
                                              <div className="colunm line-option-payment" onClick={event => Choosepayment('boleto')}>
                                                <img alt="tool" src={boleto} className="icon-payment" />
                                                <span>Boleto</span>
                                                {
                                                  typepayment === 'boleto' ?
                                                    (
                                                      <>
                                                        <span className="is-pulled-right">
                                                          <FontAwesomeIcon icon={['fas', 'check-circle']} size="1x" className="icon-payment-check" />
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
                                                <img alt="tools" src={boleto} className="icon-payment" />
                                                <span>Boleto</span>
                                                {
                                                  typepayment === 'boleto' ?
                                                    (
                                                      <>
                                                        <span className="is-pulled-right">
                                                          <FontAwesomeIcon icon={['fas', 'check-circle']} size="1x" className="icon-payment-check" />
                                                        </span>
                                                      </>
                                                    )
                                                    :
                                                    (
                                                      <>

                                                      </>
                                                    )
                                                }
                                                <p style={{ color: 'red' }}>Data indisponível para boleto.</p>
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
                      <Rentruesblock />
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
                            <p>Reserva de <span className="titlerentbox">{tool.title}</span></p>
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
                            text={rentattempt.finishprocess === "y" ? 'Sendo processado' : 'Confirmar e reservar'}
                            onClick={event => paymentRent()}
                          />
                          <p className={isMobile ? "is-pulled-left price-bottom" : "is-pulled-right price-bottom"}>
                            <IntlProvider locale="pt-br" timeZone="Brasil/São Paulo">
                              <b>Total: <FormattedNumber value={parseFloat(rentattempt.cost) + renderCalc() - valuedescount} style="currency" currency="BRL" /></b>
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
                            <p>Para que possamos entregar a ferramenta neste local, será necessário acrescentar R$ 10,00 no valor da entrega & devolução.</p>
                            <br />
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
                                <b className="number-delivery"><FormattedNumber value={renderCalc()} style='currency' currency="BRL" /></b>
                              </IntlProvider>
                              <span className="span-adiciontal">+</span>
                              <IntlProvider locale="pt-br" timeZone="Brasil/São Paulo">
                                <b className="number-delivery"><FormattedNumber value={10} style='currency' currency="BRL" /></b>
                              </IntlProvider>
                              <br /><span class="valueadtotal">
                                = <IntlProvider locale="pt-br" timeZone="Brasil/São Paulo">
                                  <b className="number-delivery"><FormattedNumber value={renderCalc() + 10} style='currency' currency="BRL" /></b>
                                </IntlProvider>.
                          </span>
                            </div>
                            <br />
                            <div className="columns invert">
                              <div className="column has-text-centered">
                                <button className={`button is-fullwidth is-primary`} onClick={event => nextStep()} id="teste">
                                  Ok, Prosseguir
                            </button>
                              </div>
                              <div className="column has-text-centered">
                                <button className={`button is-fullwidth is-danger`} onClick={event => cancelStep()}>
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
              <Modal
                show={modalpix}
                onCloseModal={hideRedirectpix}
                closeEscAllowed={false}
                closeOnAllowed={false}
              >
                <div class="container">
                  <p className="title-paymentpix">Pague com o PIX</p>
                  <div className="qrcode-paymentpix">
                    <div className="qrcodepay">
                      {
                        qrpixcode === '' ?
                          (
                            <>
                              <p className="loading-pix">Carregando...</p>
                            </>
                          )
                          :
                          (
                            <>
                              <QRCode value={qrpixcode} size="130" logo="https://easytoolsapp.com/static/media/logo.c64dfad4.png" />,
                          </>
                          )
                      }
                    </div>
                    <div className="cost-pix">
                      <IntlProvider locale="pt-br" timeZone="Brasil/São Paulo">
                        <b><FormattedNumber value={parseFloat(rentattempt.cost) + renderCalc() - valuedescount} style="currency" currency="BRL" /></b>
                      </IntlProvider>
                    </div>
                    <div className="box-copypix">
                      <div className="container intern-boxpix">
                        <div className="columns">
                          <div className="column">
                          </div>
                          <div className="column">
                            <p className="copytext">Ou copie este código e cole no app do seu banco.</p>
                            <div class="field has-addons">
                              <div class="control">
                                <input type="text" className="input input-qrcode" disabled={true} name="qrcode" value={qrpixcode} />
                              </div>
                              <div class="control">
                                <CopyToClipboard onCopy={copy} text={qrpixcode}>
                                  <a class="button is-info">
                                    <FontAwesomeIcon icon={['fa', 'copy']} className="icon-bt-pix" size="2x" />
                                  </a>
                                </CopyToClipboard>
                              </div>
                            </div>
                          </div>
                          <div className="column">
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                    {
                      isMobile ?
                      (
                        <>
                        </>
                      )
                      :
                      (
                        <>
                          <p className="dontworry-tiitle-paymentpix">Não se preocupe, em caso de cancelamento seu pagamento será devolvido dentro de instantes.</p>
                        </>
                      )
                    }

                  {
                    /*
                      <p className="dontworry-tiitle-paymentpix color-warning">Você pode pagar o PIX agora ou até o horário de receber a ferramenta em mãos. <br/> Neste último caso o entregador irá solicitar o pagamento no ato da entrega.</p>
                     */
                  }
                  <b className="text-payment-qrcode">Pronto, Leia o que qrcode, pague, clique no botão abaixo e depois em "confirmar e prosseguir</b>
                  <br />
                  <button className="button is-success is-fullwidth" disabled={!qrpixcode} onClick={event => hideRedirectpix()}> {!qrpixcode ? 'Só um momento...' : 'Prosseguir para finalizar."'} </button>
                </div>
              </Modal>
            </>
          )
      }
    </>
  );
};

export default Payment;
