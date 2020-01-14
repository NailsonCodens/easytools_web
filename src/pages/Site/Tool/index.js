import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import 'react-dates/initialize';
import { DateRangePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import './calendar.css'
import moment from 'moment';
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

const Tool = () => {
  const formik = useFormik({
    initialValues: {
      dateinit: '',
    },

    onSubmit: value => {
    }
  })

  const [tool, setTool] = useState({});
  const [pictures, setPictures] = useState([]);
  const [prices, setPrices] = useState([]);
  const [focus, setFocus] = useState('');
  const [startDate, setStartdate] = useState(null);
  const [endDate, setEnddate] = useState(null);
  const [price, setPrice] = useState({});
  const [showprices, setShowprices] = useState(false);

  let {id} = useParams();

  useEffect(() => {
    async function loadTool() { 
      const response = await api.get(`/tools_site/tool/${id}`, {
      });
      setTool(response.data.tool[0])
      setPictures(response.data.tool[0].picture)
      setPrices(response.data.tool[0].prices.split(';'))
    }

    loadTool();
  }, [id]);

  const setDates = (dates) => {
    setStartdate(dates.startDate)
    setEnddate(dates.endDate)

    var startdate = moment(dates.startDate).format('YYYY-MM-DD');
    var enddate = moment(dates.endDate).format('YYYY-MM-DD');

    if (dates.endDate !== null) {
      var period = moment.preciseDiff(startdate, enddate, true);
    
      if (period.months !== 0) {
        console.log('em mes')
      } else if (period.days !== 0) {
        var days = period.days
        console.log(days)
        if (days < 4) 
          setPrice({type: 'days', amount: days, price: parseInt(prices[0]), pricefull: days * parseInt(prices[0])})
        else if (days <= 5)
          console.log("semana")
        else if (days === 15)
          console.log("quinzenal")
        else if (days > 15 && days < 31)
          console.log("usa a diaria")
      }
    }
  }

  const next = () => {

  }

  const renderPrice = () => {
    var text = '';
    if (price.type === 'days') {
      text = ' x 3 Diárias'
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
                  <img src={image3} alt={image3} className="logo-neighbor"/>
                  <span className="name-neighbor">Nome do locador</span>
                </div>
              </div>
            </div>
          </div>
          <div className="columns">
            <div className="column is-two-thirds teste">
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
            <div className="column has-centered-text">
              <div className="rental-box">
                <Form 
                  onSubmit={ (e, values) => {
                    Scrool(100, 100);
                    formik.handleSubmit(values)
                  }} 
                  noValidate
                >
                  {
                    prices.map((price, index) => (
                      <div class="" key={index}>
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
                  <br/>
                  <Warningtext>* O preço final pode mudar de acordo com o período escolhido. Diária, Semanal, Quizenal e Mensal tem valores diferentes.</Warningtext>
                  <br/>
                  <Field>
                    <Label className="label" for={'title'}>
                      Período de uso
                    </Label>  
                  </Field>
                  <Field>
                    <div className="dt-range-picker-tool">
                      <DateRangePicker
                        anchorDirection="left"
                        displayFormat={'DD/MM/YYYY'}
                        startDate={startDate} // momentPropTypes.momentObj or null,
                        startDateId={'start'} // PropTypes.string.isRequired,
                        endDate={endDate} // momentPropTypes.momentObj or null,
                        endDateId={'end'} // PropTypes.string.isRequired,
                        onDatesChange={({ startDate, endDate }) => setDates({ startDate, endDate })} // PropTypes.func.isRequired,
                        focusedInput={focus.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
                        onFocusChange={focusedInput => setFocus({ focusedInput })} // PropTypes.func.isRequired,
                        startDatePlaceholderText="Aluguel"
                        endDatePlaceholderText="Devolução"
                      />
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
                    <Button
                      type={'button'}
                      className={'button is-fullwidth color-logo'}
                      text={'Alugar'}
                      onClick={event => next()}
                    />
                    <div>
                      <Warningtext class="has-text-centered message-rent">Você ainda não será cobrado.</Warningtext>
                    </div>
                  </Field>
                </Form>
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
                    <li>Energia Elétrica</li>
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
      </div>
    </>
  )
}

export default Tool;