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


const Tool = ({history}) => {
  const dispatch = useDispatch();

  const infochoose = useSelector(state => state.rentaltool);
	const current_user = useSelector(state => state.auth);

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

  const next = (rentData) => {
    if (isAuthenticated()) {

      if (perfil.cpfcnpj === "" || perfil.cpfcnpj === null) {
        history.push('/s/renter/perfil/edit?e=cc');
      }else {
        if (document !== undefined) {
          if (document.document !== null || document.selfie !== null || document.proof !== null) {
            if (perfil.cpfcnpj.length > 14 && document.enterprise === null) { 
              history.push('/s/renter/perfil/documents?e=cs');
              dispatch(Link(`/s/tool/${id}?ctg=${values.ctg}`));
              //erro quando é cnpj       
            } else {
              var attempt = {
                user_lessor_id: tool.user_id,
                tool_id: tool.id,
                startdate: moment(rentData.start).format('YYYY-MM-DD'),
                enddate: moment(rentData.end).format('YYYY-MM-DD'),
                tension: rentData.tension,
                days: price.amount,
                amount: formik.values.amount,
                period: price.type,
                price: price.priceNoamount,
                cost: price.pricefull,
                priceperiod: price.price,
                freight: 0,
                accept: 0,
              } 
              saveRentattempt(attempt);      
            }
          } else {
            history.push('/s/renter/perfil/documents?e=df');
            dispatch(Link(`/s/tool/${id}?ctg=${values.ctg}`));
          }
        }else {
          history.push('/s/renter/perfil/documents?e=nd');
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
    await api.post('rent/attempt/add/', attempt, {})
    .then((res) => {
      var idbooking = res.data.rentattempt.idf
      var codeattempt = res.data.rentattempt.codeattempt
      Scrool()
      history.push(`/s/payment/resumebook?rent_attempt=${idbooking}&init=${attempt.startdate}&finish=${attempt.enddate}&tool=${attempt.tool_id}&am=${formik.values.amount}&tension=${attempt.tension}&code_attempt=${codeattempt}`)
    }).catch((err) => {
      console.log(err.response)
    })  
  }

  const handleTension = (event) => {
    setTension(event.target.value)
  }

  const handleScroll = () => {
    if (ref.current !== null ) {
      console.log(ref.current.getBoundingClientRect().top)
      setSticky(ref.current.getBoundingClientRect().top <= 50);
    }
  };

  useEffect(() => {
    async function loadTool() { 
      const response = await api.get(`/tools_site/tool/${id}`, {
      });

      console.log(response)

      if (response.data.tool.length > 0 && response.data.tool[0].situation === 'Y') {
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
        setPrice({
          type: 'month', 
          amount: days, 
          amountmonth: months, 
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
          setPrice({
            type: 'month', 
            amount: days, 
            amountmonth: 1, 
            price: parseFloat(priceback[3].replace(/\./gi,'').replace(/,/gi,'.')), 
            priceNoamount: 1 * parseFloat(priceback[3].replace(/\./gi,'').replace(/,/gi,'.')),
            pricefull: (1 * parseFloat(priceback[3].replace(/\./gi,'').replace(/,/gi,'.'))) * amount
          })
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
        setPrice({
          type: 'month', 
          amount: months, 
          amountmonth: months, 
          price: parseFloat(prices[3].replace(/\./gi,'').replace(/,/gi,'.')), 
          priceNoamount: months * parseFloat(prices[3].replace(/\./gi,'').replace(/,/gi,'.')),
          pricefull: (months * parseFloat(prices[3].replace(/\./gi,'').replace(/,/gi,'.'))) * amounttool
        })
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
          if (months === 1) {
            setPrice({
              type: 'month', 
              amount: days, 
              amountmonth: 1, 
              price: parseFloat(prices[3].replace(/\./gi,'').replace(/,/gi,'.')), 
              priceNoamount: 1 * parseFloat(prices[3].replace(/\./gi,'').replace(/,/gi,'.')),
              pricefull: (1 * parseFloat(prices[3].replace(/\./gi,'').replace(/,/gi,'.'))) * amounttool
            })
          }
           else {

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
        text = ` por ${months} Mês`
        text2 = `* Custo mensal, com este valor você pode alugar por mais ${ 30 - days } dias!`
      } else {
        text = ` x ${months} Mêses`
        text2 = '* Custo mensal, com este valor você pode alugar por mais dias para fechar o mês!'
      }
    }

    return (
    <>
      <div className="columns no-margin-top-columns2">
        <div className="column">
          <IntlProvider locale="pt-br" timeZone="Brasil/São Paulo">
            <FormattedNumber value={price.price} style="currency" currency="BRL" />
            { text }
          </IntlProvider>
        </div>
        <div className="column is-5">
          <p className="is-pulled-right">
            <IntlProvider locale="pt-br" timeZone="Brasil/São Paulo">
              <FormattedNumber value={price.priceNoamount} style="currency" currency="BRL" />
              { 
                amount === undefined ? 'x 1 UN' : `x ${amount} UN` 
              }
            </IntlProvider>            
          </p>
        </div>
      </div>
      <div className="columns">
        <div className="no-padding-text">
          <Warningtext class="orange">{ text2 }</Warningtext>
        </div>
      </div>
      <div className="columns">
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

return (
  <>
    <div className="container-fluid">
      <div className="columns box-photos">
        {
          pictures.map((picture, index) => (
            <div className="column" key={index}>
              <img src={picture.url} alt={picture.url} className="" />
            </div>  
          ))
        }
      </div>
      <div className="container">
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
                      <span className="name-neighbor">Vizinho { lessor.name }</span>          
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
            <div className="description">
              <p className="title-infos-tool">
                Descrição
              </p>
              <p className="text-simple-info-tool">
                { tool.description }
              </p>
            </div>
            <Hr/>
            <div className="specification">
              <div className="columns">
                <div className="column">
                  <p className="title-infos-tool hack-padding-top">Especificações</p>
                </div>
                <div className="column">
                  <p className="title-infos-tool hack-padding-top">Configurações</p>
                </div>
              </div>
              <div className="columns">
                <div className="column">
                  <Ul>
                    <li><b>Marca</b></li>
                    <li>{ tool.brand }</li>
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
                    <li><b>Tensão</b></li>
                    <li>{ tool.tension }</li>
                    <li><b>Alimentação</b></li>
                    <li>{ tool.feed }</li>
                  </Ul>
                </div>
              </div>
              <div className="columns">
                <div className="column">
                  <p className="title-infos-tool hack-padding-top">Acessórios e Acompanhamentos</p>   
                  <div className="columns">
                    <div className="column">
                      <Ul>
                        <li><b>Acessórios</b></li>
                        <li>{ tool.accessory }</li>
                      </Ul>
                    </div>
                    <div className="column">
                      <Ul>
                        <li><b>Acompanhamento</b></li>
                      <li>{ tool.follow }</li>
                      </Ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="columns">
                <div className="column">
                  <p className="title-infos-tool hack-padding-top">Do aluguel do equipamento</p>  
                  <div className="columns">
                    <div className="column">
                      <Ul>
                        <li className="therent">
                          {
                            tool.contract === 'Y' ?
                            (
                              <p> - O vizinho { namelessor.name } <span>entrega</span> este equipamento para você não precisar sair de onde está.</p>
                            )
                            :
                            (
                              <p> - Você precisa buscar este equipamento.</p>
                            )
                          }
                        </li>
                        <li className="therent">
                          {
                            tool.contract === 'Y' ?
                            (
                              <p> - O vizinho { namelessor.name } <span>buscar</span> este equipamento no fim do período de aluguel.</p>
                            )
                            :
                            (
                              <p> - Você precisa devolver este equipamento no prazo final do seu aluguel.</p>
                            )
                          }
                        </li>
                        <li className="therent">
                          {
                            tool.contract === 'Y' ?
                            (
                              <p>
                                - Este equipamento só pode ser alugado mediante assinatura de <span>contrato.</span> 
                              </p>                                
                            )
                            :
                            (
                              <p>
                                Este equipamento pode ser alugado sem contrato.
                              </p>
                            )
                          }
                        </li>
                      </Ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <Hr/>
            <div className="columns">
              <div className="column">
              <p className="title-infos-tool hack-padding-top">Localização do equipamento ({ tool.title })</p>
                {
                 tool.lat !== undefined && tool.lng !== undefined ? 
                 (
                  <Mapbox lat={tool.lat} lng={tool.lng} url={tool.picture[0].url} title={tool.title}/>                   
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
                                        text={'Valores períodos'}                                    
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
                        minimumNights={2}
                        
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
                  <div className="pricefinal">
                    <Warningtext>* O preço final pode mudar de acordo com o período escolhido. Diária, Semanal, Quizenal e Mensal tem valores diferentes.</Warningtext>
                  </div>
                  <Button
                    disabled={tool.availability === "Y" ? false : true}
                    type={'submit'}
                    className={'button is-fullwidth color-logo'}
                    text={tool.availability === "Y" ? 'Alugar' : 'Não disponível para locação'}
                  />
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
        show={modal} 
        onCloseModal={hideModal} 
        closeOnEsc={true} 
        closeOnOverlayClick={true}
      > 
        <Auth hs={history} url={''} closeModal={event => setModal(false)}></Auth>
      </Modal>
    </div>
  </>
)
}

export default Tool;