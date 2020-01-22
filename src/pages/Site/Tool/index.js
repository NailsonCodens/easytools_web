import React, { useEffect, useState, useRef } from 'react';
import { useParams, useLocation } from "react-router-dom";
import queryString from 'query-string';
import 'react-dates/initialize';
import { DateRangePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import './calendar.css'
import moment from 'moment';
import 'moment/locale/pt-br';
  // eslint-disable-next-line
import preciseDiff from 'moment-precise-range-plugin';
import {IntlProvider, FormattedNumber} from 'react-intl';
import { useFormik } from 'formik';
import { Form } from '@rocketseat/unform';
import { Field, Label } from '../../../components/Form/Form';
import { Button } from '../../../components/Form/Button';
import { Warningtext } from '../../../components/Warningtext';
import Scrool from '../../../utils/scroll';
import api from '../../../services/api';
import image3 from '../../../assets/images/4350FCT-Makita-3.jpg';
import './style.css';
import { Ul } from '../../../components/List';
import { Hr } from '../../../components/Hr';
import * as Yup from 'yup';
import { Span } from '../../../components/Span';
import { isAuthenticated } from "../../../services/auth";
import Auth from '../../../pages/Auth/index';
import Modal from '../../../components/Modal';

  const Tool = ({history}) => {

    
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
  const [url, setUrl] = useState('');
  const [isSticky, setSticky] = useState(false);
  const [dataLessor, setDatalessor] = useState([]);

  const ref = useRef(null);

  let {id} = useParams();

  let values = queryString.parse(useLocation().search);

  const formik = useFormik({
    initialValues: {
      startDate: null,
      endDate: null,
    },
    validationSchema: Yup.object({
      startDate: Yup.string()
        .required('Adicione a data do aluguel.'),
        endDate: Yup.string()
        .required('Adicione a data da devolução.'),
    }),
    onSubmit: value => {
      var tensionChoose = ''
      if (tool.tension.split('/')[1] === undefined){
        tensionChoose = tool.tension
      } else {
        tensionChoose = tension 
      }

      var rentData = {
        start: moment(value.startDate).format('YYYY-MM-DD'),
        end: moment(value.endDate).format('YYYY-MM-DD'),
        tension: tensionChoose,
      }
      next(rentData)
    }
  })

  const next = (rentData) => {
    setUrl(`/s/renter-rules?tool=${id}&booking=${'123'}&init=${rentData.start}&finish=${rentData.end}&tension=${rentData.tension}`)

    if (isAuthenticated()) {
      Scrool()
      history.push(`/s/renter-rules?tool=${id}&booking=${'123'}&init=${rentData.start}&finish=${rentData.end}&tension=${rentData.tension}`)
    } else {
      Scrool()
      history.push(`/s/tool/${id}?ctg=${values.ctg}&rdt=${Math.random()}`)
      setModal(true)
    }    
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
      setTool(response.data.tool[0])
      setTensionshow(response.data.tool[0].tension.split('/'))
      setPictures(response.data.tool[0].picture)
      setPrices(response.data.tool[0].prices.split(';'))
      loadLessor(response.data.tool[0].UserId)
    }
    loadTool();

    async function loadLessor(id) {
      const response = await api.get(`/lessordata/${id}`, {
      });
      setDatalessor(response.data.user)
    }


    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', () => handleScroll);
    };
  }, [id]);

  console.log(dataLessor)

  const setDates = (dates) => {
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
        setPrice({type: 'month', amount: days, amountmonth: months, price: parseInt(prices[3]), pricefull: months * parseInt(prices[3])})
      } else if (period.days !== 0) {
        if (days < 5) 
          setPrice({type: 'days', amount: days, price: parseInt(prices[0]), pricefull: days * parseInt(prices[0])})
        else if (days > 7)
          setPrice({type: 'weekend', amount: days, price: parseInt(prices[1]), pricefull: 1 * parseInt(prices[1])})
        else if (days === 15)
          setPrice({type: 'biweekly', amount: days, price: parseInt(prices[2]), pricefull: 1 * parseInt(prices[2])})
        else if (days > 15)
          setPrice({type: 'month', amount: days, amountmonth: 1, price: parseInt(prices[3]), pricefull: 1 * parseInt(prices[3])})
      }
    }
  }


  const hideModal = () => {
    setModal(false)
    return modal
	}

  const renderPrice = () => {
    var text = ''
    var days = price.amount
    var months = price.amountmonth

    if (price.type === 'days') {
      text = ` x ${days} Dia(s)`
    }

    if (price.type === 'weekend') {
      text = ` x ${days} Dias`
    }
    
    if (price.type === 'biweekly') {
      text = ` x ${days} Dias`
    }

    if (price.type === 'month') {
      text = ` x ${months} Mêses`
    }
    return (
      <>
        <div className="columns">
          <div className="column">
            <IntlProvider locale="pt-br" timeZone="Brasil/São Paulo">
              <FormattedNumber value={price.price} style="currency" currency="BRL" />
              { text }
            </IntlProvider>
          </div>
          <div className="column">
            <p className="is-pulled-right">
              <IntlProvider locale="pt-br" timeZone="Brasil/São Paulo">
                <FormattedNumber value={price.pricefull} style="currency" currency="BRL" />
              </IntlProvider>            
            </p>
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
                      <>
                        <div key={index}>
                          <img src={lessor.url} alt={lessor.url} className="logo-neighbor"/>
                          <span className="name-neighbor">{ lessor.name }</span>                     
                        </div>
                      </>
                    ))
                  }
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
                <p className="title-infos-tool">Especificações</p>
                <div className="columns">
                  <div className="column">
                    <Ul>
                      <li><b>Marca</b></li>
                      <li>{ tool.brand }</li>
                      <li><b>Categoria</b></li>
                      <li>{ tool.category }</li>
                    </Ul>
                  </div>
                  <div className="column">
                    <Ul>
                      <li><b>Tipo</b></li>
                      <li>{ tool.type_spec }</li>
                    </Ul>
                  </div>
                </div>
              </div>
              <Hr/>
            </div>
            <div>
              <div  className={`column has-centered-text ${isSticky ? 'sticky box-rent' : ''}`} ref={ref}>
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
                    <Warningtext>* O preço final pode mudar de acordo com o período escolhido. Diária, Semanal, Quizenal e Mensal tem valores diferentes.</Warningtext>
                    <Field>
                      <Label className="label" for={'title'}>
                        Período de uso
                      </Label> 
                      <div className="dt-range-picker-tool">
                        <DateRangePicker
                          anchorDirection="left"
                          displayFormat={'DD/MM/YYYY'}
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
                    {
                      tensionshow[1] !== undefined ? 
                      (
                        <>
                          <Field>
                            <Label  className="label" for={'tension'}>Tensão</Label>
                            <div className="columns">
                              <div className="column has-text-centered">
                                <Button
                                  type={'button'}
                                  className={'button'}
                                  text={'127V'}
                                  onClick={event => setTension('127V')}
                                />
                              </div>
                              <div className="column has-text-centered">
                                <Button
                                  type={'button'}
                                  className={'button'}
                                  text={'220V'}
                                  onClick={event => setTension('220V')}
                                />
                              </div>
                            </div>
                          </Field>                    
                        </>
                      ) 
                      :
                      ('')
                    }
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
                    <Button
                      type={'submit'}
                      className={'button is-fullwidth color-logo'}
                      text={'Alugar'}
                    />
                    <div>
                      <Warningtext class="has-text-centered message-rent">Você ainda não será cobrado.</Warningtext>
                    </div>
                  </Form>
                </div>
              </div>
            </div>
          </div>
          <div className="columns">
            <div className="column">
              <p className="title-infos-tool hack-padding-top">Configurações</p>   
              <div className="columns">
                <div className="column">
                  <Ul>
                    <li><b>Potência</b></li>
                    <li>{ tool.power }</li>
                    <li><b>Tensão</b></li>
                    <li>{ tool.tension }</li>
                  </Ul>
                </div>
                <div>
                  <Ul>
                    <li><b>Alimentação</b></li>
                    <li>{ tool.feed }</li>
                  </Ul>
                </div>
              </div>
            </div>
            <div className="column">

            </div>
          </div>
          <Hr/>
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
                <div>
                  <Ul>
                    <li><b>Acompanhamento</b></li>
                  <li>{ tool.follow }</li>
                  </Ul>
                </div>
              </div>
            </div>
            <div className="column">
            </div>
          </div>
          <Hr/>
          <div className="columns comments">
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
          </div>
        </div>
        <Modal
          show={modal} 
          onCloseModal={hideModal} 
          closeOnEsc={true} 
          closeOnOverlayClick={true}
        > 
          <Auth hs={history} url={url} closeModal={event => setModal(false)}></Auth>
        </Modal>
      </div>
    </>
  )
}

export default Tool;