import React, { useEffect, useState, useRef } from 'react';
import { useParams, useLocation } from "react-router-dom";
import queryString from 'query-string';
import { useDispatch, useSelector } from "react-redux";
import { Rentaltool } from '../../../store/actions/rentaltool';
import { Link } from '../../../store/actions/link';
import 'react-dates/initialize';
import { DateRangePicker, toMomentObject } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import './calendar.css'
import moment from 'moment';
import 'moment/locale/pt-br';
import brands from '../../../assets/images/brand.png';
  // eslint-disable-next-line
import preciseDiff from 'moment-precise-range-plugin';
import {IntlProvider, FormattedNumber} from 'react-intl';
import { useFormik } from 'formik';
import { Form, Input } from '@rocketseat/unform';
import { Field, Label } from '../../../components/Form/Form';
import { Button } from '../../../components/Form/Button';
import { Warningtext } from '../../../components/Warningtext';
import Scrool from '../../../utils/scroll';
import api from '../../../services/api';
import './style.css';
import { Ul } from '../../../components/List';
import { Hr } from '../../../components/Hr';
import * as Yup from 'yup';
import { Span } from '../../../components/Span';
import { isAuthenticated } from "../../../services/auth";
import Auth from '../../../pages/Auth/index';
import Modal from '../../../components/Modal';
import localForage from "localforage";
import Mapbox from '../../../components/Map/Mapbox';
import ReactGA, { set } from 'react-ga';
import {Helmet} from 'react-helmet'
import Adddocument from './adddocument';
import Notification from '../../../utils/notification';

import {
  isMobile
} from "react-device-detect";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faStar } from '@fortawesome/free-solid-svg-icons'
library.add(faStar);

const Tracking = (category, action, label) => {
  Scrool()
  ReactGA.event({
    category: category,
    action: action,
    label: label
  });
}

const Tool = ({history}) => {
  const dispatch = useDispatch();

  const infochoose = useSelector(state => state.rentaltool);
	const current_user = useSelector(state => state.auth);

  const [adddoc, setAdddoc] = useState(false);
  const [tool, setTool] = useState({});
  const [pictures, setPictures] = useState([]);
  const [prices, setPrices] = useState([]);
  const [focus, setFocus] = useState('');
  // eslint-disable-next-line
  const [startDate, setStartdate] = useState(null);
  // eslint-disable-next-line
  const [endDate, setEnddate] = useState(null);
  const [price, setPrice] = useState({});
  const [showprices, setShowprices] = useState(false);
  const [tension, setTension] = useState('');
  const [tensionshow, setTensionshow] = useState([]);
  const [modal, setModal] = useState(false);
  const [modal2, setModal2] = useState(false);
  //const [url, setUrl] = useState('');
  const [isSticky, setSticky] = useState(false);
  const [dataLessor, setDatalessor] = useState([]);
  const [datefix] = useState(useSelector(state => state.rentaltool));
  const [amount, setAmount] = useState(useSelector(state => state.rentaltool.amount));
  const [perfil, setPerfil] = useState([]);
  const [namelessor, setNamelessor] = useState('')
  const [document, setDocument] = useState({})
  const [configlessor, setConfiglessor ] = useState('');
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

  const formik = useFormik({
    initialValues: {
      startDate:null,
      endDate: null,
      amount: amount !== undefined ? amount : 1,
    },
    validationSchema: Yup.object({
      startDate: Yup.string()
        .required('Adicione a data do aluguel.'),
        endDate: Yup.string()
        .required('Adicione a data da devolução.'),
    }),
    onSubmit: value => {
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
          formik.values.amount
        )
      );    
      next(rentData)  
    }
  })

  const setLsItem = (url) => {
    localStorage.setItem('@lkt', url);
  }

  const next = (rentData) => {
    if (isAuthenticated()) {

      console.log(document)

      if (perfil.cpfcnpj === "" || perfil.cpfcnpj === null) {
        if (perfil.type === 'Lessor') {
          Scrool()
          setAdddoc(true);
          console.log('a')
          //history.push(`/lessor/perfil?e=cc`);
        } else {
          Scrool()
          setLsItem(`/s/tool/${id}?ctg=${values.ctg}`)
          //history.push(`/s/adddocuments`);
         setAdddoc(true);
         console.log('aa')
        }

      }else {
        if (document !== undefined) {
          if (document.document !== null && document.selfie !== null && document.proof !== null) {
            if (perfil.cpfcnpj.length > 14 && document.enterprise === null) { 
              Scrool()
              if (perfil.type === 'Lessor') {
                history.push(`/lessor/perfil/detail/${perfil.id}?e=cs`);
              } else {
                setLsItem(`/s/tool/${id}?ctg=${values.ctg}`)
                //history.push(`/s/adddocuments`);
                setAdddoc(true);
                console.log('aaa')
                //console.log('aa')
              }
              dispatch(Link(`/s/tool/${id}?ctg=${values.ctg}`));
              //erro quando é cnpj       
            } else {
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

              console.log(attempt)

              saveRentattempt(attempt);      
            }
          } else {
            Scrool()
            if (perfil.type === 'Lessor') {
              history.push(`/lessor/perfil/detail/${perfil.id}?e=df`);

              dispatch(Link(`/s/tool/${id}?ctg=${values.ctg}`));  
            } else {
              setLsItem(`/s/tool/${id}?ctg=${values.ctg}`)
             // history.push(`/s/adddocuments`);
              setAdddoc(true);
              console.log('aaaa')
              dispatch(Link(`/s/tool/${id}?ctg=${values.ctg}`));  
            }
          }
        }else {
          Scrool()
          if (perfil.type === 'Lessor') { 
            history.push(`/lessor/perfapiil/detail/${perfil.id}?e=nd`);
          } else {
            setLsItem(`/s/tool/${id}?ctg=${values.ctg}`)
            //history.push(`/s/adddocuments`);
            setAdddoc(true);
            console.log('ee')
          }
          dispatch(Link(`/s/tool/${id}?ctg=${values.ctg}`));
        }
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
        history.push(`/s/payment/resumebook?rent_attempt=${idbooking}&init=${attempt.startdate}&finish=${attempt.enddate}&tool=${attempt.tool_id}&am=${formik.values.amount}&tension=${attempt.tension}&code_attempt=${codeattempt}`)
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
      if (isAuthenticated()) {
        if (current_user.id !== undefined) {
          const response = await api.get(`/documents/${current_user.id}`, {
          });
          setDocument(response.data.documentUser[0])  
        }  
      }
    }
    verifyDocumentrent();

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', () => handleScroll);
    };
  }, [id, current_user]);

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

        console.log(priceback[3])
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

  const setDates = (dates, amountreceive) => {
    var amounttool = 1
    amounttool = amountreceive !== undefined ? amountreceive : formik.values.amount  

    formik.values.startDate = dates.startDate
    formik.values.endDate = dates.endDate
    setStartdate(dates.startDate)
    setEnddate(dates.endDate)

    var startdate = moment(dates.startDate).format('YYYY-MM-DD');
    var enddate = moment(dates.endDate).format('YYYY-MM-DD');

    if (dates.endDate !== null) {
      var period = moment.preciseDiff(startdate, enddate, true);

      var days = period.days;
      var months = period.months;

      if (period.months !== 0) {
        if (days > 0) {
            setModal2(true)
            setPrice({
              type: 'month', 
              amount: days, 
              amountmonth: months, 
              price: parseFloat(prices[3].replace(/\./gi,'').replace(/,/gi,'.')), 
              priceNoamount: months * parseFloat(prices[3].replace(/\./gi,'').replace(/,/gi,'.')),
              pricefull: (months * parseFloat(prices[3].replace(/\./gi,'').replace(/,/gi,'.'))) * amounttool
            })
          } else {
          setPrice({
            type: 'month', 
            amount: days, 
            amountmonth: months, 
            price: parseFloat(prices[3].replace(/\./gi,'').replace(/,/gi,'.')), 
            priceNoamount: months * parseFloat(prices[3].replace(/\./gi,'').replace(/,/gi,'.')),
            pricefull: (months * parseFloat(prices[3].replace(/\./gi,'').replace(/,/gi,'.'))) * amounttool
          })
        }
      } else if (period.days !== 0) {
        if (days < 7)
          setPrice({
            type: 'days', 
            amount: days, 
            price: parseFloat(prices[0].replace(/\./gi,'').replace(/,/gi,'.')), 
            priceNoamount: days * parseFloat(prices[0].replace(/\./gi,'').replace(/,/gi,'.')),
            pricefull: (days * parseFloat(prices[0].replace(/\./gi,'').replace(/,/gi,'.'))) * amounttool
          })
        else if (days === 7)
          setPrice({
            type: 'weekend', 
            amount: days, 
            price: parseFloat(prices[1].replace(/\./gi,'').replace(/,/gi,'.')), 
            priceNoamount: 1 * parseFloat(prices[1].replace(/\./gi,'').replace(/,/gi,'.')),
            pricefull: (1 * parseFloat(prices[1].replace(/\./gi,'').replace(/,/gi,'.'))) * amounttool
          })
        else if (days > 7 && days < 15)
          setPrice({
            type: 'biweekly', 
            amount: days, 
            price: parseFloat(prices[2].replace(/\./gi,'').replace(/,/gi,'.')), 
            priceNoamount: 1 * parseFloat(prices[2].replace(/\./gi,'').replace(/,/gi,'.')),
            pricefull: (1 * parseFloat(prices[2].replace(/\./gi,'').replace(/,/gi,'.'))) * amounttool
          })
        else if (days === 15)
        setPrice({
          type: 'biweekly', 
          amount: days, 
          price: parseFloat(prices[2].replace(/\./gi,'').replace(/,/gi,'.')), 
          priceNoamount: 1 * parseFloat(prices[2].replace(/\./gi,'').replace(/,/gi,'.')),
          pricefull: (1 * parseFloat(prices[2].replace(/\./gi,'').replace(/,/gi,'.'))) * amounttool
        })
        else if (days > 15){
          if (months === 0) {
            setPrice({
              type: 'month', 
              amount: days, 
              amountmonth: 0, 
              price: parseFloat(prices[3].replace(/\./gi,'').replace(/,/gi,'.')), 
              priceNoamount: 1 * parseFloat(prices[3].replace(/\./gi,'').replace(/,/gi,'.')),
              pricefull: (1 * parseFloat(prices[3].replace(/\./gi,'').replace(/,/gi,'.'))) * amounttool
            })
          } else {
            setPrice({
              type: 'month', 
              amount: days, 
              amountmonth: months, 
              price: parseFloat(prices[3].replace(/\./gi,'').replace(/,/gi,'.')), 
              priceNoamount: 1 * parseFloat(prices[3].replace(/\./gi,'').replace(/,/gi,'.')),
              pricefull: (1 * parseFloat(prices[3].replace(/\./gi,'').replace(/,/gi,'.'))) * amounttool
            })
           }
        }
      }
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

  const hideModal = () => {
    setModal(false)
    return modal
  }

  const hideModal2 = () => {
    setModal2(false)
    return modal2
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
        <div className="column">
          <IntlProvider locale="pt-br" timeZone="Brasil/São Paulo">
            <FormattedNumber value={price.price} style="currency" currency="BRL" />
            { text }
          </IntlProvider>
        </div>
        <div className="column">
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
      <div className="columns">
        <div className="no-padding-text">
          <Warningtext class="orange">{ text2 }</Warningtext>
        </div>
      </div>
      <div className="columns is-mobile">
        <div className="column">
          <b>Total</b>
        </div>
        <div className="column">
          <p className="is-pulled-right">
            <IntlProvider locale="pt-br" timeZone="Brasil/São Paulo">
              <b><FormattedNumber value={price.pricefull} style="currency" currency="BRL" /></b>
            </IntlProvider>            
          </p>
        </div>
      </div>
    </>
  )
  }

  const handleAmount = (event) => {
    formik.values.amount = parseInt(event.target.value)
    setAmount(parseInt(event.target.value))
    setDates({startDate: formik.values.startDate, endDate: formik.values.endDate}, event.target.value)
  }


  async function loadPerfil() {
    if (isAuthenticated()) {
      const response = await api.get(`/perfil`, {
      });
      setPerfil(response.data.user[0])  
    }
  }

  async function loaddocumenttwo () {
    const response = await api.get(`/documents/${current_user.id}`, {
    });
    loadPerfil()
    setDocument(response.data.documentUser[0])
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
      <title>{ tool.title }</title>
      <meta
        name="description"
        content={ 'Aluguel de ' + tool.title + ' | Easytools ' }
      />
      <meta name="keywords" content={tool.title}/>
    </Helmet>
    {
      adddoc === true ? 
      (
        <Adddocument onClose={closeAdd}/>

      )
      :
      (
        <div className="container-fluid">
        <div className="columns box-photos is-mobile is-desktop">
          {
            pictures.map((picture, index) => (
              <div className="column" key={index}>
                <img src={picture.url} alt={picture.url} className="" />
              </div>  
            ))
          }
        </div>
        <div className="container container-bottom">
          <div className="columns head-infos-tool">
            <div className="column is-two-thirds">
              <div>
                <h3 className="title-tool-only">{tool.title}</h3>
                <b className="category">{ tool.category }</b>
              </div>
            </div>
            <div className="column">
              <div className="columns">
                <div className="">
                  {
                    dataLessor.map((lessor, index) => (
                      <div key={index}>
                        <img src={lessor.url} alt={lessor.url} className="logo-neighbor"/>
                        <span className="name-neighbor"> { lessor.name }</span>          
                      </div>
                    ))
                  }
                  <div>
                    <span>
                      { /*renderConfiglessor()*/ }
                    </span>        
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="columns">
            <div className="column is-two-thirds">
              <div>
                <b>Pagamentos:</b>
                <br/>
                <img src={brands} alt={brands} className="brands-tools"/>
                <br/>
                <p>Apenas cartão de <b>crédito</b>. 
                <br/>
                Para reservas com 3 dias de antecedências, disponível <b>boleto</b>.</p>
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
                  <div className="column">
                  </div>
                </div>
                <div className="columns">
                  <div className="column">
                    <Ul>
                      { /*<li><b>Marca</b></li>*/}
                      {/*<li>{ tool.brand }</li>*/}
                      <li><b>Categoria</b></li>
                      <li>{ tool.category }</li>
                      <li><b>Tipo</b></li>
                      <li>{ tool.type_spec }</li>
                    </Ul>
                  </div>
                  <div className="column">
                    <Ul>
                      <li><b>Potência</b></li>
                      <li>{ tool.power }</li>
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
                    <div className="columns">
                      <div className="column">
                        <Ul>
                          <li><b>Acessórios</b></li>
                          <li>{ tool.accessory !== '' ? tool.accessory : 'Nenhum acessório disponível.'  }</li>
                        </Ul>
                      </div>
                      <div className="column">
                        <Ul>
                          <li><b>Acompanha</b></li>
                        <li>{ tool.follow !== '' ? tool.follow : 'Não disponível disponível' }</li>
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
            <div  className={`column has-centered-text`}>
              <div  className={`pai has-centered-text sticky `}>
                <div className="rental-box sticky-inner">
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
                        Período de uso
                      </Label> 
                      <br/>
                      <div className="dt-range-picker-tool no-margin-top-columns2">
                        <DateRangePicker
                          anchorDirection="left"
                          displayFormat={'DD/MM/YYYY'}
                          minimumNights={1}
                          numberOfMonths={isMobile === true ? 1 : 2}
                          startDate={formik.values.startDate} // momentPropTypes.momentObj or null,
                          startDateId={'start'} // PropTypes.string.isRequired,
                          endDate={formik.values.endDate} // momentPropTypes.momentObj or null,
                          endDateId={'end'} // PropTypes.string.isRequired,
                          onDatesChange={({ startDate, endDate }) => setDates({ startDate, endDate })} // PropTypes.func.isRequired,
                          focusedInput={focus.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
                          onFocusChange={focusedInput => setFocus({ focusedInput })} // PropTypes.func.isRequired,
                          startDatePlaceholderText="Aluguel"
                          endDatePlaceholderText="Devolução"
                        />
                        <Span className={'validation-warning'}>
                          {
                            formik.touched.startDate && formik.errors.startDate 
                          ? 
                            (<div>Por favor insira as datas de aluguel e devolução.</div>) 
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
                                <div className="columns">
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
                      <div className="column is-4">
                        <Field>
                          <Label className="label" for={'amount'}>Quantide</Label>
                          <Input
                            className="input"
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
                        <div className="container">
                          {renderPrice()}
                        </div>
                      ) : 
                      ('')
                    }
                    <br/>
                    <div className="pricefinal">
                      <Warningtext>*O valor final pode mudar de acordo com o período escolhido: diária, semanal, quizenal ou mensal.</Warningtext>
                    </div>
                    {
                      modal2 === true ? 
                      (
                        <>
                          <Button
                            disabled={true}
                            type={'submit'}
                            className={'button is-fullwidth color-logo'}
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
                            className={'button is-fullwidth color-logo'}
                            text={tool.availability === "Y" ? 'Alugar' : 'Não disponível para locação'}
                          />
                        </>
                      )
                    }
                    <div>
                      <Warningtext class="has-text-centered message-rent">Você ainda não será cobrado.</Warningtext>
                    </div>
                  </Form>
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
          <Auth hs={history} url={''} closeModal={event => setModal(false)}></Auth>
        </Modal>
      </div>
  
      )
    }
  </>
)
}

export default Tool;