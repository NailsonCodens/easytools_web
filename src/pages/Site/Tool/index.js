import React, { useEffect, useState, useRef } from 'react';
import { useParams, useLocation } from "react-router-dom";
import queryString from 'query-string';
import { useDispatch, useSelector } from "react-redux";
import { Rentaltool } from '../../../store/actions/rentaltool';
import _ from "lodash";

  // eslint-disable-next-line
import preciseDiff from 'moment-precise-range-plugin';
import 'react-dates/initialize';
import Select from 'react-select';
import { DateRangePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import './calendar.css'
import Email from '../../../utils/sendemail';
import { Rentattempt } from '../../../store/actions/rentattempt.js';
import moment from 'moment';
import 'moment/locale/pt-br';
  // eslint-disable-next-line
import {Adons} from '../../../store/actions/adons';
import ScrollableAnchor from 'react-scrollable-anchor'
import {IntlProvider, FormattedNumber} from 'react-intl';
import { useFormik } from 'formik';
import { Form, Input } from '@rocketseat/unform';
import { Field, Label } from '../../../components/Form/Form';
import { Button } from '../../../components/Form/Button';
import { Warningtext } from '../../../components/Warningtext';
import Checkboximage from '../../../components/Form/Checkboximage';
import Scrool from '../../../utils/scroll';
import api from '../../../services/api';
import './style.css';
import { Ul } from '../../../components/List';
import { Hr } from '../../../components/Hr';
import { Span } from '../../../components/Span';
import { isAuthenticated } from "../../../services/auth";
import Auth from '../../../pages/Auth/index';
import Modal from '../../../components/Modal';
import ReactGA from 'react-ga';
import {Helmet} from 'react-helmet';
import Adddocument from './adddocument';
import Notification from '../../../utils/notification';

import {
  isMobile
} from "react-device-detect";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faStar, faCalendarAlt } from '@fortawesome/free-solid-svg-icons'
import rentattempt from '../../../store/reducers/rentattempt';
library.add(faStar, faCalendarAlt);

const Tracking = (category, action, label) => {
  Scrool()
  ReactGA.event({
    category: category,
    action: action,
    label: label
  });
}
/*
const renderPromo = (title) => {
  if (title.indexOf('Lavadora')){
    return 70
  }

  if (title.indexOf('Extratora')) {
    return 75
  }

  if (title.indexOf('Lâmina')) {
    return 60
  }

  if (title.indexOf('Nylon')) {
    return 70
  }
}
*/


const Tool = ({history}) => {

  const currentadons = useSelector(state => state.adons);
  const dispatch = useDispatch();

  /*const infochoose = useSelector(state => state.rentaltool);*/
	const current_user = useSelector(state => state.auth);

  const [adddoc, setAdddoc] = useState(false);
  const [tool, setTool] = useState({});
  const [priceoriginal, setPriceoriginal] = useState(0)
    // eslint-disable-next-line
  const [promo, setPromo] = useState(true);
  const [pictures, setPictures] = useState([]);
  const [prices, setPrices] = useState([]);
  const [focus, setFocus] = useState('');
  const [errodate, setErrodate] = useState('');
  const [erroamount, setErramount] = useState('');
  const [rent, setRent] = useState(false);
  // eslint-disable-next-line
  const [startDate, setStartdate] = useState(null);
  const [startdt, setStartdt] = useState(null);
  // eslint-disable-next-line
  const [endDate, setEnddate] = useState(null);
  const [price, setPrice] = useState({});
  const [showprices, setShowprices] = useState(false);
  const [tension, setTension] = useState('');
  const [tensionshow, setTensionshow] = useState([]);
  const [modal, setModal] = useState(false);
  const [modal2, setModal2] = useState(false);
  const [modal3, setModal3] = useState(false);
  const [modal4, setModal4] = useState(false);
  //const [url, setUrl] = useState('');
  // eslint-disable-next-line
  const [isSticky, setSticky] = useState(false);
  // eslint-disable-next-line
  const [dataLessor, setDatalessor] = useState([]);
  const [datefix] = useState(useSelector(state => state.rentaltool));
  const [amount, setAmount] = useState(useSelector(state => state.rentaltool.amount));
  const [perfil, setPerfil] = useState([]);
  // eslint-disable-next-line
  const [namelessor, setNamelessor] = useState('')
  // eslint-disable-next-line
  const [document, setDocument] = useState({})
  const [configlessor, setConfiglessor ] = useState('');
  // eslint-disable-next-line
  const [disconcert, setDisconcert] = useState('');
  const [promotional, setPromotional] = useState('');
  const [adons, setAdons] = useState('');
  const [adonsid, setAdonsid] = useState('');
  const [adonsProd, setAdonsprod] = useState([]);
  const [priceadon, setPriceadon] = useState([]);
  const ref = useRef(null);

  let {id} = useParams();

  let values = queryString.parse(useLocation().search);

  const success = () => Notification(
    'success',
    'Tudo pronto, vamos seguir?!', 
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

  async function getImgadons (id) {
    const response = await api.get(`/adons/adon/${id}`, {
    });
    
    response.data.adon.map(function (adon) {
      if (adon.checkad === 'Y') {
        let alreadyOn = priceadon;
        alreadyOn.push(adon.price)
        //console.log(alreadyOn)
        setPriceadon(alreadyOn)
      }
      setAdonsprod(response.data.adon)
    })
  }

  const checkeredChange = (event, price) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    let alreadyOn = priceadon;

    if(value === true){
      alreadyOn.push(price)
    }else {
      _.remove(alreadyOn, obj => {
        return obj == price
      });
    }
    //console.log(alreadyOn)
    setPriceadon(alreadyOn)

    let amount = parseInt(formik.values.amount)
    setAmount(amount)
    setDates({startDate: formik.values.startDate, endDate: formik.values.endDate}, amount, 'activediscorcert')
  }


  const danger = () => Notification(
    'error',
    'Ops! Insira as datas para reservar a ferramenta', 
    {
      autoClose: 4100,
      draggable: false,
    },
    {
      position: "bottom-center",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
    }
  )

  const danger2 = () => Notification(
    'error',
    'Por favor, insira uma quantidade válida', 
    {
      autoClose: 4100,
      draggable: false,
    },
    {
      position: "bottom-center",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
    }
  )


  const formik = useFormik({
    initialValues: {
      startDate:null,
      endDate: null,
      amount: amount !== undefined ? amount : 1,
    },
    onSubmit: value => {
      console.log(value.amount)

      if (value.startDate === null || value.endDate === null) {
        setErrodate(true)
        danger()
        window.location.href = "#"+"dates";
        return
      }

      if (isNaN(value.amount) || value.amount == 0) {
        setErramount(true)
        danger2()
        return
      }

      loaddocumenttwo()

      var tensionChoose = ''
      if (tension !== '') {
        tensionChoose = tension
      } else {
        if (tool.tension.split('/')[0] === '') {
          tensionChoose = tool.tension.split('/')[1]
        } else {
          tensionChoose = tool.tension.split('/')[0]          
        }
      }

      var rentData = {
        start: moment(value.startDate).format('YYYY-MM-DD'),
        end: moment(value.endDate).format('YYYY-MM-DD'),
        tension: tensionChoose,
        amount: amount
      }

      dispatch(
        Rentaltool(
          moment(value.startDate).format('YYYY-MM-DD'), 
          moment(value.endDate).format('YYYY-MM-DD'),
          tool.prices.split(';'),
          tensionChoose,
          formik.values.amount,
          tool.id
        )
      );

      var obj = { 
        start: moment(value.startDate).format('YYYY-MM-DD'), 
        end: moment(value.endDate).format('YYYY-MM-DD'),
        price: tool.prices.split(';'),
        am: formik.values.amount,
        tool: tool.id
      }

      Email(tool.user_id, `Alguém tentou alugar um equipamento, corra e veja quem é!`, 
      `Tentativa de aluguel no site, corre!`, "Ver", 'Veja qual cliente tentou alugar');

      localStorage.setItem('@lkst', JSON.stringify(obj));
      next(rentData)  
    }
  })
  
  const setLsItem = (url) => {
    localStorage.setItem('@lkt', url);
  }

  const next = (rentData) => {
    if (isAuthenticated()) {
      if (perfil.type === 'Lessor') {
        Scrool()
//          setAdddoc(true);
        history.push(`/lessor/perfil?e=cc`);
      } else {
        Scrool()
        setLsItem(`/s/tool/${id}?ctg=${values.ctg}`)
        //history.push(`/s/adddocuments`);
//        setAdddoc(true);

      var attempt = {
        user_lessor_id: tool.user_id,
        tool_id: tool.id,
        startdate: moment(rentData.start).format('YYYY-MM-DD'),
        enddate: moment(rentData.end).format('YYYY-MM-DD'),
        tension: rentData.tension || '-',
        days: price.amount,
        month: price.amountmonth,
        amount: formik.values.amount,
        period: price.type,
        price: price.priceNoamount.toFixed(2),
        cost: price.pricefull.toFixed(2),
        priceperiod: price.price,
        freight: 0,
        accept: 0,
      }

      saveRentattempt(attempt);

      }
    } else {
      Scrool()
      history.push(`/s/tool/${id}?ctg=${values.ctg}&rdt=${Math.random()}`)
      setModal(true)
    }
  }

  async function saveRentattempt (attempt) {
    if (attempt.month > 0 && attempt.days > 0) {
      setModal2(true)
      Tracking('Tentativa de aluguel maior com mêses e dias falha', `Tentativa de aluguel maior com mêses e dias`, 'Tentativa de aluguel maior com mêses e dias')
    } else {
      await api.post('rent/attempt/add/', attempt, {})
      .then((res) => {
        var idbooking = res.data.rentattempt.idf
        var codeattempt = res.data.rentattempt.codeattempt
        Scrool()
        Tracking('Tentativa de aluguel', ` Tentativa de aluguel criada idbooking: ${idbooking} codeattempt: ${codeattempt}`, 'Tentativa de aluguel')
        history.push(`/s/payment/rent-rules?rent_attempt=${idbooking}&init=${attempt.startdate}&finish=${attempt.enddate}&tool=${attempt.tool_id}&am=${formik.values.amount}&tension=${attempt.tension}&code_attempt=${codeattempt}`)
      }).catch((err) => {
        console.log(err.response)
      })
    }
  }

  const handleTension = (event) => {
    setTension(event.target.value)
  }

  const handleScroll = () => {
    if (ref.current !== null ) {
      setSticky(ref.current.getBoundingClientRect().top <= 50);
    }
  };

  useEffect(() => {
    async function loadTool() { 
      const response = await api.get(`/tools_site/tool/${id}`, {
      });

      if (response.data.tool.length > 0 || response.data.tool[0].situation === 'Y') {
        setTool(response.data.tool[0])
        setTensionshow(response.data.tool[0].tension)
        setPictures(response.data.tool[0].picture)
        setAdonsid(response.data.tool[0].adons.split(','))
        var teste = response.data.tool[0].adons.split(',')

        let adonscorrect = []
        response.data.tool[0].adons.split(',').map(function (adon) {
          var id = adon.split('=')[0]
          adonscorrect.push(id)
        })

        getImgadons(adonscorrect)


        setPrices(response.data.tool[0].prices.split(';'))
        loadLessor(response.data.tool[0].UserId) 
        loadConfiglessor(response.data.tool[0].UserId)
      } else {
        history.push('/ops?notfound=notools');
      }
    }
    loadTool();

    async function loadLessor(iduser) {      
      const response = await api.get(`/lessordata/${iduser}`, {
      });
      setDatalessor(response.data.user)
      setNamelessor(response.data.user[0])
    }

    async function loadValues(){
      
      const response = await api.get(`/tools_site/tool/${id}`, {
      });

      setDatesback(datefix, response.data.tool[0], amount)
    }
    loadValues()

    async function loadPerfil() {
      if (isAuthenticated()) {
        const response = await api.get(`/perfil`, {
        });
        setPerfil(response.data.user[0])  
      }
    }
    loadPerfil();

    async function loadConfiglessor (iduser) {
      if (isAuthenticated()) {      
        const response = await api.get(`/userconfig/${iduser}`, {
        });
        setConfiglessor(response.data.userconfig[0])
      }
    }

    async function verifyDocumentrent(){
      if (isAuthenticated() === true) {
        if (current_user.length !== 0) {
          /*const response = await api.get(`/documents/${current_user.id}`, {
          });
          setDocument(response.data.documentUser[0]) 
          */ 
        }  
      }
    }
    verifyDocumentrent();

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', () => handleScroll);
    };
  }, [id]);

  const setDatesback = (dates, tool) => {
    if (dates.startDate && dates.endDate) {
      formik.values.startDate = moment(datefix.startDate)
      formik.values.endDate = moment(datefix.endDate)  
    }

    var priceback = ''

    if (tool !== undefined) {
      priceback = tool.prices.split(';')
    } else {
      priceback = []
    }

    if (dates.endDate !== null) {

      var startdate = moment(dates.startDate).format('YYYY-MM-DD');
      var enddate = moment(dates.endDate).format('YYYY-MM-DD');

      var period = moment.preciseDiff(startdate, enddate, true);

      var days = period.days;
      var months = period.months;
      if (period.months !== 0) {

        setPrice({
          type: 'month', 
          amount: days, 
          amountmonth: months, 
          priceNoamount: months * parseFloat(priceback[3].replace(/\./gi,'').replace(/,/gi,'.')), 
          price: parseFloat(priceback[3].replace(/\./gi,'').replace(/,/gi,'.')), 
          pricefull: (months * parseFloat(priceback[3].replace(/\./gi,'').replace(/,/gi,'.'))) * amount
        })
      } else if (period.days !== 0) {
        if (days < 7)
          setPrice({
            type: 'days', 
            amount: days, 
            price: parseFloat(priceback[0].replace(/\./gi,'').replace(/,/gi,'.')),
            priceNoamount: days * parseFloat(priceback[0].replace(/\./gi,'').replace(/,/gi,'.')), 
            pricefull: (days * parseFloat(priceback[0].replace(/\./gi,'').replace(/,/gi,'.'))) * amount
          })
        else if (days === 7)
          setPrice({
            type: 'weekend', 
            amount: days, 
            price: parseFloat(priceback[1].replace(/\./gi,'').replace(/,/gi,'.')), 
            priceNoamount: 1 * parseFloat(priceback[1].replace(/\./gi,'').replace(/,/gi,'.')),
            pricefull: (1 * parseFloat(priceback[1].replace(/\./gi,'').replace(/,/gi,'.'))) * amount
          })
        else if (days > 7 && days < 15)
          setPrice({
            type: 'biweekly', 
            amount: days, 
            price: parseFloat(priceback[2].replace(/\./gi,'').replace(/,/gi,'.')), 
            priceNoamount: 1 * parseFloat(priceback[2].replace(/\./gi,'').replace(/,/gi,'.')),
            pricefull: (1 * parseFloat(priceback[2].replace(/\./gi,'').replace(/,/gi,'.'))) * amount
          })
        else if (days === 15)
        setPrice({
          type: 'biweekly', 
          amount: days, 
          price: parseFloat(priceback[2].replace(/\./gi,'').replace(/,/gi,'.')), 
          priceNoamount: 1 * parseFloat(priceback[2].replace(/\./gi,'').replace(/,/gi,'.')),
          pricefull: (1 * parseFloat(priceback[2].replace(/\./gi,'').replace(/,/gi,'.'))) * amount
        })
        else if (days > 15)
          if (months === 0) {
            setPrice({
              type: 'month', 
              amount: days, 
              amountmonth: 0, 
              price: parseFloat(priceback[3].replace(/\./gi,'').replace(/,/gi,'.')), 
              priceNoamount: 1 * parseFloat(priceback[3].replace(/\./gi,'').replace(/,/gi,'.')),
              pricefull: (1 * parseFloat(priceback[3].replace(/\./gi,'').replace(/,/gi,'.'))) * amount
            })
          } else {
            setPrice({
              type: 'month', 
              amount: days, 
              amountmonth: months, 
              price: parseFloat(priceback[3].replace(/\./gi,'').replace(/,/gi,'.')), 
              priceNoamount: 1 * parseFloat(priceback[3].replace(/\./gi,'').replace(/,/gi,'.')),
              pricefull: (1 * parseFloat(priceback[3].replace(/\./gi,'').replace(/,/gi,'.'))) * amount
            })
          }
      }
    }
  }

  const showDanger = (tool, availability) => {
    if (availability === 'Y') {
      Tracking(`Tentou alugar um equipamento indisponível: ${tool}`, `Tentou alugar um equipamento indisponível: ${tool}`, `Tentou alugar um equipamento indisponível: ${tool}`)
    }
  }

  const setDates = (dates, amountreceive, promo) => {
    var amounttool = 1
    amounttool = amountreceive !== undefined ? amountreceive : formik.values.amount  

    formik.values.startDate = dates.startDate
    formik.values.endDate = dates.endDate
    setStartdate(dates.startDate)
    setEnddate(dates.endDate)

    var startdate = moment(dates.startDate).format('YYYY-MM-DD');
    var enddate = moment(dates.endDate).format('YYYY-MM-DD');

    let soma = 0;
    priceadon.map(function (price, index) {
      soma += parseFloat(price.replace(/\./gi,'').replace(/,/gi,'.'))
    });

    if (dates.endDate === null && moment(dates.startDate).format('dddd') === 'sábado' || dates.endDate === null && moment(dates.startDate).format('dddd') === 'Sábado') {
      console.log('preço promocinal aberto')
      setStartdt(dates.startDate);
      setModal3(true);
    }
    /*console.log(startdate).day();
    console.log(enddate).day();*/

    if (dates.endDate !== null) {
      var period = moment.preciseDiff(startdate, enddate, true);


      if (startdate === enddate) {
        period.days = 1
      }

      
      var days = period.days;
      var months = period.months;


      var objrent = { 
        type: '',
        amount: '',
        amountmonth: 0,
        price: '',
        priceNoamount: '',
        pricefull: '', 
      }

      var soma2 = 0
      if (amounttool > 1) {
        soma2 = soma * amounttool 
      }else{
        soma2 = soma * amounttool
      }

      if (period.months !== 0) {
        if (days > 0) {
          console.log('asdd')
            setModal2(true)
            setPrice({
              type: 'month', 
              amount: days, 
              amountmonth: months, 
              price: parseFloat(prices[3].replace(/\./gi,'').replace(/,/gi,'.')) + soma, 
              priceNoamount: months * parseFloat(prices[3].replace(/\./gi,'').replace(/,/gi,'.')) + soma,
              pricefull: (months * parseFloat(prices[3].replace(/\./gi,'').replace(/,/gi,'.'))) * amounttool + soma
            })

            objrent = {
              type: 'month', 
              amount: days, 
              amountmonth: months, 
              price: parseFloat(prices[3].replace(/\./gi,'').replace(/,/gi,'.')) + soma, 
              priceNoamount: months * parseFloat(prices[3].replace(/\./gi,'').replace(/,/gi,'.')) + soma, 
              pricefull: (months * parseFloat(prices[3].replace(/\./gi,'').replace(/,/gi,'.'))) * amounttool + soma
            }
          } else {
          setPrice({
            type: 'month', 
            amount: days, 
            amountmonth: months, 
            price: parseFloat(prices[3].replace(/\./gi,'').replace(/,/gi,'.')) + soma, 
            priceNoamount: months * parseFloat(prices[3].replace(/\./gi,'').replace(/,/gi,'.')) + soma,
            pricefull: (months * parseFloat(prices[3].replace(/\./gi,'').replace(/,/gi,'.'))) * amounttool + soma
          })
          objrent = {
            type: 'month', 
            amount: days, 
            amountmonth: months, 
            price: parseFloat(prices[3].replace(/\./gi,'').replace(/,/gi,'.')) + soma, 
            priceNoamount: months * parseFloat(prices[3].replace(/\./gi,'').replace(/,/gi,'.')) + soma,
            pricefull: (months * parseFloat(prices[3].replace(/\./gi,'').replace(/,/gi,'.'))) * amounttool + soma
          }

        }
      }else if (period.days !== 0) {
        if (promo == 'activediscorcert' && startdate != enddate && promotional === true) {
          setPrice({
            type: 'days', 
            amount: 2,
            amountmonth: 0, 
            price: localStorage.getItem('@fv') / 2 + soma, 
            priceNoamount: (parseFloat(localStorage.getItem('@fv')) / 2 + soma) * 2, 
            pricefull: ((parseFloat(localStorage.getItem('@fv')) / 2 + soma) * 2) * formik.values.amount
          }) 
          
          var precototal = (parseFloat(prices[0].replace(/\./gi,'').replace(/,/gi,'.')) + soma) * 2 * formik.values.amount
          setPriceoriginal(precototal)
        }else{

          if (days < 7){
            console.log('7 menor')
            console.log(days)
            console.log(soma)
            setPrice({
              type: 'days', 
              amount: days, 
              price: parseFloat(prices[0].replace(/\./gi,'').replace(/,/gi,'.')) + soma, 
              priceNoamount: days * parseFloat(prices[0].replace(/\./gi,'').replace(/,/gi,'.')) + soma,
              pricefull: (days * parseFloat(prices[0].replace(/\./gi,'').replace(/,/gi,'.'))) * amounttool + soma2
            })
  
            console.log(price)
            objrent = {
              type: 'days', 
              amount: days, 
              price: parseFloat(prices[0].replace(/\./gi,'').replace(/,/gi,'.')) + soma, 
              priceNoamount: days * parseFloat(prices[0].replace(/\./gi,'').replace(/,/gi,'.')) + soma,
              pricefull: (days * parseFloat(prices[0].replace(/\./gi,'').replace(/,/gi,'.'))) * amounttool + soma2
            }
  
            console.log(price)
          }else if (days === 7){
            console.log('b')
            setPrice({
              type: 'weekend', 
              amount: days, 
              price: parseFloat(prices[1].replace(/\./gi,'').replace(/,/gi,'.')) + soma, 
              priceNoamount: 1 * parseFloat(prices[1].replace(/\./gi,'').replace(/,/gi,'.')) + soma,
              pricefull: (1 * parseFloat(prices[1].replace(/\./gi,'').replace(/,/gi,'.'))) * amounttool + soma2
            })
            objrent = {
              type: 'weekend', 
              amount: days, 
              price: parseFloat(prices[1].replace(/\./gi,'').replace(/,/gi,'.')) + soma, 
              priceNoamount: 1 * parseFloat(prices[1].replace(/\./gi,'').replace(/,/gi,'.')) + soma,
              pricefull: (1 * parseFloat(prices[1].replace(/\./gi,'').replace(/,/gi,'.'))) * amounttool + soma2
            }
          }else if (days > 7 && days < 15){
            console.log('9')
            setPrice({
              type: 'biweekly', 
              amount: days, 
              price: parseFloat(prices[2].replace(/\./gi,'').replace(/,/gi,'.')) + soma, 
              priceNoamount: 1 * parseFloat(prices[2].replace(/\./gi,'').replace(/,/gi,'.')) + soma,
              pricefull: (1 * parseFloat(prices[2].replace(/\./gi,'').replace(/,/gi,'.'))) * amounttool + soma2
            })
            objrent = {
              type: 'biweekly', 
              amount: days, 
              price: parseFloat(prices[2].replace(/\./gi,'').replace(/,/gi,'.')) + soma, 
              priceNoamount: 1 * parseFloat(prices[2].replace(/\./gi,'').replace(/,/gi,'.')) + soma,
              pricefull: (1 * parseFloat(prices[2].replace(/\./gi,'').replace(/,/gi,'.'))) * amounttool  + soma2
            }
          }else if (days === 15){
            console.log('f')
            setPrice({
              type: 'biweekly', 
              amount: days, 
              price: parseFloat(prices[2].replace(/\./gi,'').replace(/,/gi,'.')) + soma, 
              priceNoamount: 1 * parseFloat(prices[2].replace(/\./gi,'').replace(/,/gi,'.')) + soma,
              pricefull: (1 * parseFloat(prices[2].replace(/\./gi,'').replace(/,/gi,'.'))) * amounttool  + soma2
            })
            objrent = {
              type: 'biweekly', 
              amount: days, 
              price: parseFloat(prices[2].replace(/\./gi,'').replace(/,/gi,'.')) + soma, 
              priceNoamount: 1 * parseFloat(prices[2].replace(/\./gi,'').replace(/,/gi,'.')) + soma,
              pricefull: (1 * parseFloat(prices[2].replace(/\./gi,'').replace(/,/gi,'.'))) * amounttool  + soma2
            }
          }else if (days > 15){
            console.log('bc')
            if (months === 0) {
              console.log('bn')
              setPrice({
                type: 'month', 
                amount: days, 
                amountmonth: 0, 
                price: parseFloat(prices[3].replace(/\./gi,'').replace(/,/gi,'.')) + soma, 
                priceNoamount: 1 * parseFloat(prices[3].replace(/\./gi,'').replace(/,/gi,'.')) + soma,
                pricefull: (1 * parseFloat(prices[3].replace(/\./gi,'').replace(/,/gi,'.'))) * amounttool + soma2
              })
  
              objrent = {
                type: 'month', 
                amount: days, 
                amountmonth: 0, 
                price: parseFloat(prices[3].replace(/\./gi,'').replace(/,/gi,'.')) + soma, 
                priceNoamount: 1 * parseFloat(prices[3].replace(/\./gi,'').replace(/,/gi,'.')) + soma,
                pricefull: (1 * parseFloat(prices[3].replace(/\./gi,'').replace(/,/gi,'.'))) * amounttool + soma2
              }
            } else {
              console.log('0mm')
              setPrice({
                type: 'month', 
                amount: days, 
                amountmonth: months, 
                price: parseFloat(prices[3].replace(/\./gi,'').replace(/,/gi,'.')) + soma, 
                priceNoamount: 1 * parseFloat(prices[3].replace(/\./gi,'').replace(/,/gi,'.')) + soma,
                pricefull: (1 * parseFloat(prices[3].replace(/\./gi,'').replace(/,/gi,'.'))) * amounttool + soma2
              })
              objrent = {
                type: 'month', 
                amount: days, 
                amountmonth: 0, 
                price: parseFloat(prices[3].replace(/\./gi,'').replace(/,/gi,'.')) + soma, 
                priceNoamount: 1 * parseFloat(prices[3].replace(/\./gi,'').replace(/,/gi,'.')) + soma,
                pricefull: (1 * parseFloat(prices[3].replace(/\./gi,'').replace(/,/gi,'.'))) * amounttool + soma2
              }
            }
          }
        }
      }

      dispatch(Rentattempt(objrent.priceNoamount, objrent.amount, objrent.pricefull, 
        amounttool, objrent.type, 0, objrent.price, objrent.amountmonth))
        localStorage.setItem('@obr', JSON.stringify(objrent));
    }
  }

  const renderConfiglessor = () => {
    var configles = '';
    if (configlessor.typerent === 'cpf') {
      configles = 'Este vizinho aluga somente para pessoas fisícas';
    } else if (configlessor.typerent === 'cnpj') {
      configles = 'Este vizinho aluga somente para empresas.';
    } else {
      configles = '';
    }

    return (
      <p className="configlessor">{ configles }</p>
    )
  }

  const blockDays = (day) => {

    const dayString = day.format('YYYY-MM-DD');
    //    var arr = ["Sunday"];
    //console.log(moment.weekdays(moment(new Date()).weekday()) === 'Sábado')

    if (moment.weekdays(moment(new Date()).weekday()) === 'Sábado' && moment(new Date()).format('H:mm') === '12:00') {
      return moment.weekdays(day.weekday()) === 'Sábado' || moment.weekdays(day.weekday()) === 'sábado' || moment.weekdays(day.weekday()) === 'domingo' || moment.weekdays(day.weekday()) === 'Domingo'
     }else if (moment.weekdays(moment(new Date()).weekday()) === 'sábado' && moment(new Date()).format('H:mm') === '12:00') {
      return moment.weekdays(day.weekday()) === 'Sábado' || moment.weekdays(day.weekday()) === 'sábado' || moment.weekdays(day.weekday()) === 'domingo' || moment.weekdays(day.weekday()) === 'Domingo'
    } else {
      return moment.weekdays(day.weekday()) === 'Domingo' || moment.weekdays(day.weekday()) === 'domingo'
    }

    //var arr = ["2020-06-12", "2020-06-13", "2020-06-23", "2020-06-24", "2020-06-26", "2020-06-27", "2020-06-29", "2020-06-30"];
   // return arr.some(date => dayString === date)   

//    return dayString === '2020-06-26' || dayString ==='2020-06-27'
  }

  const hideModal = () => {
    setModal(false)
    return modal
  }

  const hideModal2 = () => {
    setModal2(false)
    return modal2
  }

  const hideModal3 = () => {
    setModal3(false)
    return modal3
  }

  const hideModal4 = () => {
    setModal4(false)
    return modal4
  }

  const activeDiscorcert = () => {
    setModal3(false)    
    setPromotional(true)
    var stdt = moment(startdt)

    var end = stdt.add(2, 'days')
    setEnddate(end)

    //alterar aqui para passar um param dizendo que esta ativando o desconto e mudar este setPrice lá para setdates

    setDates({ startDate: startDate, endDate: end}, formik.values.amount, 'activediscorcert')
  }

  const deliveryToday = () => {
    formik.values.endDate = startDate;
    setEnddate(startDate);
    setPrice({
      type: 'days', 
      amount: formik.values.amount, 
      amountmonth: 0, 
      price: parseFloat(prices[0].replace(/\./gi,'').replace(/,/gi,'.')), 
      priceNoamount: 1 * parseFloat(prices[0].replace(/\./gi,'').replace(/,/gi,'.')),
      pricefull: (1 * parseFloat(prices[0].replace(/\./gi,'').replace(/,/gi,'.'))) * formik.values.amount
    })

    setModal3(false);
    setModal4(true);

    let amount = parseInt(formik.values.amount)
    setAmount(amount)
    setDates({startDate: formik.values.startDate, endDate: formik.values.endDate}, amount)


  }

  const desactiveDisconcert = () => {
    setDates({startDate: formik.values.startDate, endDate: formik.values.endDate}, formik.values.amount, 'no')
    setPromotional(false)
    setModal3(false)
    setFocus({focusedInput: "endDate"})

  }

  const renderDisconcert = () => {
    if (prices[0] !== undefined) {
      var priceone = parseFloat(prices[0].replace(/\./gi,'').replace(/,/gi,'.'));
      var valuedefaultprimary = priceone * 1
      var valuedefault = priceone * 2
      var percent = 25
      var valuedisconcertrimary = valuedefaultprimary / 100 * percent
      var valuedisconcert = valuedefault / 100 * percent

      var valuefinal = valuedefault - valuedisconcert
      var valuefinaldisconcert = valuedefaultprimary - valuedisconcertrimary
      localStorage.setItem('@fv', valuefinal)

      return (
        <>
          <div className="columns invert">
            <div className="column has-text-centered">
              <p className="discorcerttext">Com desconto </p>
              Para diárias
              <p className="valuefinal">
                <IntlProvider locale="pt-br" timeZone="Brasil/São Paulo">
                <FormattedNumber value={valuefinaldisconcert} style="currency" currency="BRL" />
                </IntlProvider>
              </p>
              <Button className="button is-info" onClick={event => activeDiscorcert(false)} text={'Ativar desconto'}/>
              <p className="has-text-center">Aluga no sábado ganha desconto e usa até segunda.</p>
            </div>
            <div className="column has-text-centered">
              <p className="discorcerttext">Sem desconto </p>
              Para diárias
              <p className="valuedefaultpromo-day ">
                <IntlProvider locale="pt-br" timeZone="Brasil/São Paulo">
                <FormattedNumber value={valuedefaultprimary} style="currency" currency="BRL" />
                </IntlProvider>
              </p>
              <Button className="button is-warning choosedevolut" onClick={event => deliveryToday(false)} text={'Entregar no mesmo dia'}/>
              <p className="has-text-center">Aluga e entrega o equipamento no mesmo dia até 16hrs.</p>
            </div>
            <div className="column has-text-centered">
              <p className="discorcerttext">Sem desconto </p>
              Para diárias
              <p className="valuedefaultpromo">
                <IntlProvider locale="pt-br" timeZone="Brasil/São Paulo">
                <FormattedNumber value={valuedefaultprimary} style="currency" currency="BRL" />
                </IntlProvider>
              </p>
              <Button className="button is-danger choosedevolut" onClick={event => desactiveDisconcert(false)} text={'Escolher devolução.'}/>
              <p className="has-text-center">Aluga no sábado e escolhe quando quer devolver, exceto domingo.</p>
            </div>
          </div>
          <br/><br/>
          <div className="columns has-text-centered">
            <div className="column warning-devolut">
              <b>Fim de semana: </b> Aluguel começa no <b>sábado</b>, devolve na <b>segunda</b>
              <br/>
              <b>* horário de entrega escolhido no final do processo*</b>
            </div>
          </div>
        </>
      )
      console.log(valuedisconcert)
    }
  }

  const renderPrice = () => {
    var text = ''
    var text2 = ''
    var days = price.amount
    var weekend = 1
    var months = price.amountmonth

    if (price.type === 'days') {
      text = ` x ${days} Dia(s)`
      text2 = '* Custo diário'
    }

    if (price.type === 'weekend') {
      text = ` por ${weekend} Semana`
      text2 = `* Custo semanal`
    }
    
    if (price.type === 'biweekly') {
      text = ` por ${days} Dias`

      if (days !== 15) {
        text2 = `* Custo quinzenal, com este valor você pode alugar por mais ${ 15 - days } dias!`
      }
    }

    if (price.type === 'month') {
      if (months === 1) {
        if (days > 0 ) {
          text = ` por ${months} Mês e ${days} Dia(s)`
          text2 = `* Custo mensal`
        } else {
          text = ` por ${months} Mês`
          text2 = `* Custo mensal`
        }

      }else if (days > 15 && days <= 31) {
        text = ` por 1 Mês`
        text2 = `* Você está alugando por ${days} dias, mas o custo é mensal. Com este valor você pode alugar por mais ${ 30 - days } dias!`
      } else {
        text = ` x ${months} Mêses`
        text2 = '* Custo mensal, com este valor você pode alugar por mais dias para fechar o mês!'
      }
    }
    
    return (
    <>
      <div className="columns is-mobile no-margin-top-columns2">
        <div className="column no-padding-tt">
          <IntlProvider locale="pt-br" timeZone="Brasil/São Paulo">
            <FormattedNumber value={price.price} style="currency" currency="BRL" />
            { text }
          </IntlProvider>
        </div>
        <div className="column no-padding-tt">
          <p className="is-pulled-right">
            <IntlProvider locale="pt-br" timeZone="Brasil/São Paulo">
              <FormattedNumber value={price.priceNoamount} style="currency" currency="BRL" />
              { 
                amount === undefined ? 'x 1 UN' : `x ${amount} UN` 
              }
            </IntlProvider>           
          </p>
          <br/><br/>
        </div>
      </div>
      {
        /*
          <Warningtext class="orange">{ text2 }</Warningtext>        
        */
      }
      <div className="columns is-mobile no-top-total total-tools-values">
        <div className="column">
          <b>Total</b>
        </div>
        {
          promo === true && tool.title.indexOf('Lâmina') > -1 || promo === true && tool.title.indexOf('Nylon') > -1 || promo === true && tool.title.indexOf('Extratora') > -1  || promo === true && tool.title.indexOf('Lavadora') > -1 ? 
          (
            <>
            {
              /*
                <span className="money-promo2">
                  <IntlProvider locale="pt-br" timeZone="Brasil/São Paulo">
                    <b><FormattedNumber value={renderPromo(tool.title)} style="currency" currency="BRL" /></b>
                  </IntlProvider>
                  <span>/Diária</span>                            
                </span>   
              */
            }

            </>
          )
          :
          (
            <>
            </>
          )
        }

        {
          promotional === false ? 
          (
            <div className="column">
              <p className="is-pulled-right">
                <IntlProvider locale="pt-br" timeZone="Brasil/São Paulo">
                  <b><FormattedNumber value={price.pricefull} style="currency" currency="BRL" /></b>
                </IntlProvider>            
              </p>
            </div>  
          )
          :
          (
            <div className="column">
              <span class="pricefds">
                <IntlProvider locale="pt-br" timeZone="Brasil/São Paulo">
                  <b><FormattedNumber value={priceoriginal} style="currency" currency="BRL" /></b>
                </IntlProvider>      
              </span>
              <p className="is-pulled-right color-promotional">
                <IntlProvider locale="pt-br" timeZone="Brasil/São Paulo">
                  <b><FormattedNumber value={price.pricefull} style="currency" currency="BRL" /></b>
                </IntlProvider>            
              </p>
            </div>  
          )
        }
      </div>
    </>
  )
  }

  const handleAmount = (event) => {
    formik.values.amount = parseInt(event.target.value)
    setAmount(parseInt(event.target.value))
    setDates({startDate: formik.values.startDate, endDate: formik.values.endDate}, event.target.value, 'activediscorcert')
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
    setAdddoc(false)
    success()
  }

return (
  <>
    <Helmet>
      <title>{ 'Reserva de ' + tool.title + ' | Easytools ' }</title>
      <meta
        name="description"
        content={ 'Reserva de ' + tool.title + ' | Easytools ' }
      />
      <meta name="keywords" content={'Aluguel, ' + tool.title + ', '}/>
    </Helmet>
    {
      adddoc === true ? 
      (
        <Adddocument onClose={closeAdd}/>

      )
      :
      (
        <div className="container-fluid">
        {
          /*
          <div className="columns box-photos is-mobile is-desktop">
            {
              pictures.map((picture, index) => (
                <div className="column" key={index}>
                  <img src={picture.url} alt={picture.url} className="" />
                </div>  
              ))
            }
          </div>
          */
        }
        <div className="container container-bottom">
          <div className="columns invert">
            <ScrollableAnchor id={'dates'}>
              <div></div>
            </ScrollableAnchor>
            <div className={ isMobile === false ? `column has-centered-text` : rent === true ? `page-full-date` : `page-dates`}>
              <div  className={isMobile === false ? `pai has-centered-text sticky` : `pai has-centered-text`}>
                <span className={ isMobile === false ? `hd-mobile-tool` : rent === true ? `close-rent` : ``} onClick={event =>(setRent(false), Scrool(0,0))}>
                  Voltar
                </span>
                <div className="rental-box sticky-inner">
                  <p className={ isMobile === false ? `hd-mobile-tool` : rent === true ? `title-rent is-pulled-left` : `show-mobile`}>
                    Selecione datas de aluguel e devolução
                  </p>
                  <Form
                    onSubmit={ (e, values) => {
                      formik.handleSubmit(values)
                    }} 
                    noValidate
                  >
                    {
                      prices.map((price, index) => (
                        <div key={index}>
                          {
                            index === 0 ? 
                            (
                              <>
                                <span className="price-rent">
                                  {`R$ ${price.trim()} `}
                                </span>
                                <span >Diária </span>
                                { 
                                  index === 0 ? (
                                    <>
                                      <Button 
                                          type={'button'}
                                          className={'button is-link is-light is-small is-pulled-right'}
                                          text={'Valores por períodos'}                                    
                                        onClick={event => setShowprices(!showprices)}
                                      />
                                    </>
                                  ) : 
                                  (
                                    ''
                                  )
                                }
                              </>
                            ) : 
                            (
                              <div className={showprices === true ? 'is-block' : 'is-hidden'}>
                                <div>
                                  {
                                    price.trim() !== 0 && index === 1 ? 
                                    (
                                      <>
                                        <span className="price-rent price-others">
                                          {`R$ ${price.trim()} `}
                                        </span>
                                        <span className="price-others-legend">
                                          Semanal
                                        </span>
                                      </>
                                    ) 
                                    :
                                    (
                                      ''
                                    )
                                    }
                                    {
                                    price.trim() !== 0 && index === 2 ? 
                                    (
                                      <>
                                        <span className="price-rent price-others">
                                          {`R$ ${price.trim()} `}
                                        </span>
                                        <span className="price-others-legend">
                                          Quinzenal
                                        </span>
                                      </>
                                    ) 
                                    :
                                    (
                                      ''
                                    )
                                    }
                                    {
                                    price.trim() !== '0' && index === 3 ? 
                                    (
                                      <>
                                        <span className="price-rent price-others">
                                          {`R$ ${price.trim()} `}
                                        </span>
                                        <span className="price-others-legend">
                                          Mensal
                                        </span>
                                      </>
                                    ) 
                                    :
                                    (
                                      ''
                                    )
                                  }                       
                                </div>
                              </div>
                            )
                          }
                        </div>
                      ))
                    }
                    <Field>
                      <Label className="label label-period" for={'title'}>
                        Período de uso <FontAwesomeIcon icon={['fas', 'calendar-alt']} className="" size="1x"/>
                      </Label> 
                      <br/>
                      <div className="dt-range-picker-tool no-margin-top-columns2">
                        <DateRangePicker
                          anchorDirection="left"
                          displayFormat={'DD/MM/YYYY'}
                          minimumNights={1}
                          isDayBlocked={(day) => blockDays(day)}
                          numberOfMonths={isMobile === true ? 1 : 2}
                          startDate={formik.values.startDate} // momentPropTypes.momentObj or null,
                          startDateId={'start'} // PropTypes.string.isRequired,
                          endDate={formik.values.endDate} // momentPropTypes.momentObj or null,
                          endDateId={'end'} // PropTypes.string.isRequired,
                          onDatesChange={({ startDate, endDate }) => setDates({ startDate, endDate })} // PropTypes.func.isRequired,
                          focusedInput={focus.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
                          onFocusChange={focusedInput => setFocus({ focusedInput })} // PropTypes.func.isRequired,
                          startDatePlaceholderText="Data de uso"
                          endDatePlaceholderText="Data Devolução"
                          readOnly
                          hideKeyboardShortcutsPanel
                        />
                        <Span className={'validation-warning'}>
                          {
                            errodate == true  
                          ? 
                            (<div> - Por favor insira as datas de aluguel e devolução.</div>) 
                          : 
                            null
                          }
                        </Span>
                        <Span className={'validation-warning'}>
                          {
                            erroamount == true  
                          ? 
                            (<div> - Por favor insira uma quantidade válida.</div>) 
                          : 
                            null
                          }
                        </Span>
                      </div>
                    </Field>
                    <div className="columns">
                      <div className="column">
                        {
                          tensionshow === '127V/220V' ? 
                          (
                            <>
                              <Field>
                                <Label  className="label" for={'tension'}>Tensão</Label>
                                <div className="columns tension-dv">
                                  <div className="column has-text-centered">
                                    <Field>
                                      <input 
                                        className="is-checkradio"
                                        type="radio"
                                        id={'127v'}
                                        name="tension" 
                                        value="127V"
                                        defaultChecked={true}
                                        onChange={event => handleTension(event)}
                                    />
                                      <Label for={'127v'}>127V</Label>
                                      <input 
                                        className="is-checkradio"
                                        id="220v"
                                        type="radio" 
                                        name="tension"
                                        value="220V"
                                        onChange={event => handleTension(event)}
                                      />
                                      <Label for={'220v'}>220V</Label>
                                    </Field>
                                  </div>
                                </div>
                              </Field>                    
                            </>
                          ) 
                          :
                          ('')
                        }
                        {
                          tensionshow === '/Tri' ? 
                          (
                            <>
                              <Field>
                                <Label  className="label" for={'tension'}>Tensão</Label>
                                <div className="columns">
                                  <div className="column has-text-centered">
                                    <Field>
                                      <input 
                                        className="is-checkradio"
                                        type="radio"
                                        id={'Tri'}
                                        name="tension" 
                                        value="Tri"
                                        defaultChecked={true}
                                        onChange={event => handleTension(event)}
                                    />
                                      <Label for={'Tri'}>Trifásico</Label>
                                    </Field>
                                  </div>
                                </div>
                              </Field>                    
                            </>
                          ) 
                          :
                          ('')
                        }
                        {
                          tensionshow === '/220V' ? 
                          (
                            <>
                              <Field>
                                <Label  className="label" for={'tension'}>Tensão</Label>
                                <div className="columns">
                                  <div className="column has-text-centered">
                                    <Field>
                                      <input 
                                        className="is-checkradio"
                                        type="radio"
                                        id={'220v'}
                                        name="tension" 
                                        value="220V"
                                        defaultChecked={true}
                                        onChange={event => handleTension(event)}
                                    />
                                      <Label for={'220v'}>220V</Label>
                                    </Field>
                                  </div>
                                </div>
                              </Field>                    
                            </>
                          ) 
                          :
                          ('')
                        }
                        {
                          tensionshow === '127V/' ? 
                          (
                            <>
                              <Field>
                                <Label  className="label" for={'tension'}>Tensão</Label>
                                <div className="columns">
                                  <div className="column has-text-centered tension-dvv">
                                    <Field>
                                      <input 
                                        className="is-checkradio"
                                        type="radio"
                                        id={'127v'}
                                        name="tension" 
                                        value="127V"
                                        defaultChecked={true}
                                        onChange={event => handleTension(event)}
                                    />
                                      <Label for={'127v'}>127V</Label>
                                    </Field>
                                  </div>
                                </div>
                              </Field>                    
                            </>
                          ) 
                          :
                          ('')
                        }
                      </div>
                      <div className="column is-4 clqt">
                        <Field>
                          <Label className="label" for={'amount'}>Quant. item</Label>
                          <Input
                            className="input is-small border-black"
                            name="amount"
                            type="number"
                            placeholder=""
                            min="1"
                            onChange={event => handleAmount(event)}
                            value={formik.values.amount}
                          />
                        </Field>
                      </div>
                    </div>
                    {
                      Object.entries(price).length > 0 ? 
                      (
                        <>
                          <div className="adons-container">
                            <p className="optionals">Opcionais</p>
                            <div className="columns is-mobile">
                              {
                                adonsProd.map((adon, index) => (
                                  <div className="adons-box" key={index} >
                                    <Checkboximage check={adon.checkad} id={adon.id} price={adon.price} onChange={event => checkeredChange(event, adon.price)}></Checkboximage>
                                    
                                    <label className="labelchecked" for={'idck'+adon.id}>
                                      <img src={adon.url} alt={adon.url} className="" title={adon.name}/>
                                    </label>
                                    <div className="priceadon">
                                      <span>
                                        <IntlProvider locale="pt-br" timeZone="Brasil/São Paulo">
                                          <FormattedNumber value={parseFloat(adon.price.replace(/\./gi,'').replace(/,/gi,'.'))} style="currency" currency="BRL" />
                                        </IntlProvider> 
                                      </span>
                                    </div>
                                    <p className="ad-name">{ adon.name }</p>
                                  </div>  
                                ))
                              }
                            </div>  
                          </div>
                        </>
                      )
                      :
                      (
                        <>
                        </>
                      )
                    }
                    {
                      Object.entries(price).length > 0 ? 
                      (
                        <div className="">
                          {renderPrice()}
                        </div>
                      ) : 
                      ('')
                    }
                    {
                      modal2 === true ? 
                      (
                        <>
                          <Button
                            disabled={true}
                            type={'submit'}
                            className={'button is-fullwidth color-logo mg-button-rt'}
                            text={'Altere a data para prosseguir'}
                          />
                        </>
                      )
                      :
                      (
                        <>
                          <Button
                            disabled={tool.availability === "Y" ? false : true}
                            type={'submit'}
                            className={ rent === false ? 'button is-fullwidth color-logo bt-pr-t mg-button-rt bt-app' : 'button is-fullwidth color-logo bt-pr-t mg-button-rt bt-app bt-suspend-tool'}
                            text={tool.availability === "Y" ? 'Prosseguir' : 'Não disponível para locação'}
                            onClick={event => showDanger(tool.title, tool.availability)}
                          />
                        </>
                      )
                    }
                    <div class="divwarning">
                      <Warningtext class="has-text-centered message-rent">Você ainda não será cobrado.</Warningtext>
                    </div>
                  </Form>
                </div>     
              </div>
            </div>
            <div className="column is-two-thirds">
              <div>
                <h3 className="title-tool-only">{tool.title}</h3>
                <br/>
                <div className="columns box-photos is-mobile is-desktop">
                  {
                    pictures.map((picture, index) => (
                      <div className="column" key={index}>
                        <img src={picture.url} alt={picture.url} className="" />
                      </div>  
                    ))
                  }
                </div>
              </div>
              <div className="description">
                <p className="title-infos-tool">
                  Descrição
                </p>
                <p className="text-simple-info-tool">
                  { tool.description }
                </p>
              </div>
              <div className="description">
                <p className="title-infos-tool">
                  Uso indicado <FontAwesomeIcon icon={['fas', 'star']} className="" size="1x"/>
                </p>
                <p className="text-simple-info-tool">
                  { tool.use_indication }
                </p>
              </div>
              <Hr/>
              <div className="specification">
                <div className="columns">
                  <div className="column">
                    <p className="title-infos-tool hack-padding-top">Especificações</p>
                  </div>
                </div>
                <div className="columns is-desktop is-mobile">
                  <div className="column">
                    <Ul>
                      <li><b>Potência</b></li>
                      <li>{ tool.power }</li>
                    </Ul>
                  </div>
                  <div className="column">
                    <Ul>
                      {
                        tool.tension !== '-' && tool.tension !== '/' ? 
                        (
                          <>
                            <li><b>Tensão</b></li>
                            <li>{ tool.tension === '/Tri' ? 'Trifásico' : tool.tension }</li>
                          </>
                        )
                        :
                        ('')
                      }
                      <li><b>Alimentação</b></li>
                      <li>{ tool.feed }</li>
                    </Ul>
                  </div>
                </div>
                <div className="columns">
                  <div className="column">
                    <p className="title-infos-tool hack-padding-top">Acessórios e Acompanhamentos <FontAwesomeIcon icon={['fas', 'star']} className="" size="1x"/>
                    </p>   
                    <div className="columns is-desktop is-mobile">
                      <div className="column">
                        <Ul>
                          <li><b>Acessórios</b></li>
                          <li>{ tool.accessory !== '' ? tool.accessory : 'Nenhum acessório disponível.'  }</li>
                        </Ul>
                      </div>
                      <div className="column">
                        <Ul>
                          <li><b>Acompanha</b></li>
                        <li>{ tool.follow !== '' ? tool.follow : 'Não disponível' }</li>
                        </Ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <Hr/>
              <div className="columns">
                <div className="column">
                  {
                    /*<p className="title-infos-tool hack-padding-top">Onde nós temos este equipamento ({ tool.title })</p>*/
                  }
                  {
                   tool.lat !== undefined && tool.lng !== undefined ? 
                   (
                     <>
                      {
                        /*<Mapbox lat={tool.lat} lng={tool.lng} url={tool.picture[0].url} title={tool.title}/> */                                   
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
            </div>
          </div>
          {
            /*<div className="columns comments">
            <div className="column">
              <p className="title-infos-tool hack-padding-top">Comentários e Avaliações</p>
              <Ul>
                <li>
                  <div className="card">
                    <div className="card-content">
                      <div className="media">
                        <div className="media-left">
                          <img src="https://bulma.io/images/placeholders/96x96.png" alt="asdsad g"/>
                        </div>
                        <div className="media-content">
                          <p className="title is-4">
                            Maria José
                          </p>
                          <p className="subtitle is-6">
                            @mariajosé
                          </p>
                        </div>
                      </div>
                      <div className="content">
                        Os equipamentos estão sempre impecavéis. Alugo sempre com eles, pois sei da procedência. 
                        Tem um atendimento impecável, presencialmente e aqui na Easyools.
                      </div>
                    </div>
                  </div>  
                </li>
              </Ul>
            </div>
            <div className="column">
            </div>
          </div>*/
          }
        </div>
        <div className={isMobile === false ? "hd-mobile" : "div-button-rent"}>
          <a className={rent === false ? 'button is-fullwidth color-logo' : ''} onClick={event => (setRent(true), Scrool(0,0))}>Reservar</a>
        </div>
        <Modal
          show={modal4}
          onCloseModal={hideModal4} 
          closeOnEsc={true} 
          closeOnOverlayClick={true}
        > 
          <p class="title-disconcert">Você escolheu a devolução do equipamento no mesmo dia.</p>
          <br/>
          <p class="has-text-centered">O horário para devolução do equipamento no mesmo dia é <b className="hourmodalfor">16:00 horas</b></p>
          <br/>
          <p className="has-text-centered">Após confirmar clicando em <b>"ok, estou ciente"</b>, clique em <b>"prosseguir"</b> para concluir sua reserva.</p>
          <br/>
          <Button className="button is-info is-fullwidth" onClick={event => setModal4(false)} text={'Ok, estou ciente.'}/>
        </Modal>
        <Modal
          show={modal3} 
          onCloseModal={hideModal3} 
          closeOnEsc={true} 
          closeOnOverlayClick={true}
        > 
          <p class="title-disconcert">Preço de fim de semana.</p>
          { renderDisconcert() }
        </Modal>
        <Modal
          show={modal2} 
          onCloseModal={hideModal2} 
          closeOnEsc={true} 
          closeOnOverlayClick={true}
        > 
          <p className="periods-mistakes">Ops!</p>
          <br/>
          <p className="periods-mistakes">Períodos superiores a 30 dias, só podem ser contados mês a mês.</p>
          <br/>
          <Button className="button color-logo" onClick={event => setModal2(false)} text={'Mudar data'}/>
        </Modal>
        <Modal
          show={modal} 
          onCloseModal={hideModal} 
          closeOnEsc={true} 
          closeOnOverlayClick={true}
        > 
          <Auth hs={history} url={'authproduct'} className={'superior'} closeModal={event => setModal(false)}></Auth>
        </Modal>
      </div>
  
      )
    }
  </>
)
}

export default Tool;