import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import moment from 'moment';
import 'moment/locale/pt-br';
import { Rentattempt } from '../../../store/actions/rentattempt.js';
  // eslint-disable-next-line

import {IntlProvider, FormattedNumber} from 'react-intl';
import api from '../../../services/api';
import queryString from 'query-string';
import { useLocation } from 'react-router-dom';
   
const Rentalbox = ({startDate, endDate, attempt}) => {
  const rentinfo = useSelector(state => state.rentinfo);
  const [tool, setTool] = useState([]);
  const [price, setPrice] = useState({});

  const dispatch = useDispatch();
  
  let values = queryString.parse(useLocation().search);


  useEffect(() => {
    async function loadInfochoose() {
      const response = await api.get(`/tools_site/tool/${values.tool}`, {
      });
      /*eslint-disable no-unused-vars*/
      setTool(response.data.tool[0])
      formatPrice(response.data.tool[0].prices.split(';'))
      /*eslint-disable no-unused-vars*/
    }
    loadInfochoose()
  // eslint-disable-next-line
  }, [attempt]);

  const formatPrice = (pricef) => {

    const priceback = pricef !== null ? pricef : 0
    const amount = parseFloat(values.am.replace(/\./gi,'').replace(/,/gi,'.')) !== '' || parseFloat(values.am.replace(/\./gi,'').replace(/,/gi,'.')) !== null ? parseFloat(values.am.replace(/\./gi,'').replace(/,/gi,'.')) : 0

    if (pricef !== null && values.endDate !== null) {

      var startdate = moment(startDate).format('YYYY-MM-DD');
      var enddate = moment(endDate).format('YYYY-MM-DD');

      var period = moment.preciseDiff(startdate, enddate, true);
      var days = period.days;
      var months = period.months;
      var periodat = '';
      var priceat = '';
      var costat = '';
      var amountat = amount;
      var amountmonth = months;
      var costfixed = '';
      var pricefixed = '';
      var pricefixednoamount = '';

      if (period.months !== 0) {
        periodat = 'month'
        amountmonth = months


        pricefixednoamount = amountmonth * parseFloat(priceback[3].replace(/\./gi,'').replace(/,/gi,'.'))


        costfixed = (months * parseFloat(priceback[3].replace(/\./gi,'').replace(/,/gi,'.')) * amount)

        priceat = parseFloat(priceback[3].replace(/\./gi,'').replace(/,/gi,'.'))
        costat = parseFloat(costfixed.toFixed(2))

        setPrice({
          type: 'month', 
          amount: days, 
          amountmonth: months, 
          price: parseFloat(priceback[3].replace(/\./gi,'').replace(/,/gi,'.')), 
          priceNoamount: parseFloat(pricefixednoamount.toFixed(2)), 
          pricefull: parseFloat(costfixed.toFixed(2))
        })

      } else if (period.days !== 0) {
        if (days < 7) {
          pricefixednoamount = days * parseFloat(priceback[0].replace(/\./gi,'').replace(/,/gi,'.'))
          costfixed = (days * parseFloat(priceback[0].replace(/\./gi,'').replace(/,/gi,'.')) * amount)

          periodat = 'days'
          priceat = parseFloat(priceback[0].replace(/\./gi,'').replace(/,/gi,'.'))
          costat = parseFloat(costfixed.toFixed(2))

          setPrice({
            type: 'days', 
            amount: days, 
            price: parseFloat(priceback[0].replace(/\./gi,'').replace(/,/gi,'.')),
            priceNoamount: parseFloat(pricefixednoamount.toFixed(2)), 
            pricefull: parseFloat(costfixed.toFixed(2))
          })
        } else if (days === 7) {
          periodat = 'weekend'

          pricefixednoamount = parseFloat(priceback[1].replace(/\./gi,'').replace(/,/gi,'.'))
          costfixed = (1 * parseFloat(priceback[1].replace(/\./gi,'').replace(/,/gi,'.')) * amount)
  

          priceat = parseFloat(priceback[1].replace(/\./gi,'').replace(/,/gi,'.'))
          costat = parseFloat(costfixed.toFixed(2))
          setPrice({
            type: 'weekend', 
            amount: days, 
            price: parseFloat(priceback[1].replace(/\./gi,'').replace(/,/gi,'.')), 
            priceNoamount: parseFloat(pricefixednoamount.toFixed(2)),
            pricefull: parseFloat(costfixed.toFixed(2))
          })
        } else if (days > 7 && days < 15) {
          periodat = 'biweekly'

          pricefixednoamount = parseFloat(priceback[2].replace(/\./gi,'').replace(/,/gi,'.'))
          costfixed = (1 * parseFloat(priceback[2].replace(/\./gi,'').replace(/,/gi,'.')) * amount)
  

          priceat = parseFloat(priceback[2].replace(/\./gi,'').replace(/,/gi,'.'))
          costat = parseFloat(costfixed.toFixed(2))

          setPrice({
            type: 'biweekly', 
            amount: days, 
            price: parseFloat(priceback[2].replace(/\./gi,'').replace(/,/gi,'.')), 
            priceNoamount: parseFloat(pricefixednoamount.toFixed(2)),
            pricefull: parseFloat(costfixed.toFixed(2))
          })
        } else if (days === 15) {
          periodat = 'biweekly'

          pricefixednoamount = parseFloat(priceback[2].replace(/\./gi,'').replace(/,/gi,'.'))
          costfixed = (1 * parseFloat(priceback[2].replace(/\./gi,'').replace(/,/gi,'.')) * amount)
  

          priceat = parseFloat(priceback[2].replace(/\./gi,'').replace(/,/gi,'.'));
          costat = parseFloat(costfixed.toFixed(2))

          setPrice({
            type: 'biweekly', 
            amount: days, 
            price: parseFloat(priceback[2].replace(/\./gi,'').replace(/,/gi,'.')), 
            priceNoamount: parseFloat(pricefixednoamount.toFixed(2)),
            pricefull: parseFloat(costfixed.toFixed(2))
          })  
        } else if (days > 15) {
          periodat = 'month'

          pricefixednoamount = parseFloat(priceback[3].replace(/\./gi,'').replace(/,/gi,'.'))
          costfixed = (1 * parseFloat(priceback[3].replace(/\./gi,'').replace(/,/gi,'.')) * amount)
  
          priceat = parseFloat(priceback[3].replace(/\./gi,'').replace(/,/gi,'.'))
          costat = parseFloat(costfixed.toFixed(2))

          if (months === 0) {

            amountmonth = 0
            setPrice({
              type: 'month', 
              amount: days, 
              amountmonth: 0, 
              price: parseFloat(priceback[3].replace(/\./gi,'').replace(/,/gi,'.')), 
              priceNoamount: parseFloat(pricefixednoamount.toFixed(2)),
              pricefull: parseFloat(costfixed.toFixed(2))
             })
          } else {
            amountmonth = months

            setPrice({
              type: 'month', 
              amount: days, 
              amountmonth: months, 
              price: parseFloat(priceback[3].toFixed(2).replace(/\./gi,'').replace(/,/gi,'.')), 
              priceNoamount: parseFloat(pricefixednoamount.toFixed(2)),
              pricefull: parseFloat(costfixed.toFixed(2))
            })
           }
        }
      }

      dispatch(Rentattempt(price.priceNoamount, price.amount, price.pricefull, amountat, price.type, attempt.freight || 16, price.price, amountmonth))

      updateRentattemp(price.priceNoamount, price.amount, price.pricefull, amountat, price.type, attempt.freight || 16, price.price, amountmonth)
    }else {
      //por aqui um redirect para erro 404
    }
  }


  async function updateRentattemp (price, days, cost, amount, period, freight, priceperiod, month) {
    var rentupdate = {
      price: price,
      days: days,
      month: month,
      cost: cost,
      amount: amount,
      period: period,
      freight: freight,
      priceperiod: priceperiod,
      startdate: startDate,
      enddate: endDate
    }

    if (attempt.id !== undefined) {
      await api.put(`rent/attempt/updaterent/${attempt.id}`, rentupdate, {})
      .then((res) => {
      }).catch((err) => {
        console.log(err.response)
      })   
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
        text = ` por ${months} Mês`
        text2 = `* Custo mensal`
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
        <div className="columns is-mobile">
          <div className="column">
            <IntlProvider locale="pt-br" timeZone="Brasil/São Paulo">
              <FormattedNumber value={price.price} style="currency" currency="BRL" />
              { text }
            </IntlProvider>
          </div>
          <div className="column is-6">
            <p className="is-pulled-right">
              <IntlProvider locale="pt-br" timeZone="Brasil/São Paulo">
                <FormattedNumber value={price.priceNoamount} style="currency" currency="BRL" />
                { 
                  values.am === undefined ? ' x 1 UN ' : ` x ${values.am} UN` 
                }
              </IntlProvider>            
            </p>
          </div>
        </div>
        {
         /* <div className="columns">
            <div className="no-padding-text">
              <Warningtext class="orange">{ text2 }</Warningtext>
            </div>
          </div>*/
        }
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
                    { values.tension === 'Tri' ? 'Trifásico' : values.tension }
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
        <div className="columns is-mobile no-margin-top-columns">
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
      <div className="stc-box">
        <div className="stc-child">
          <div className="rental-box">
            <div className="columns is-desktop is-mobile">
            <div className="column">
              <img src={rentinfo.picture1} alt={rentinfo.picture1} className="" />
            </div>
            <div className="column">
              <img src={rentinfo.picture2} alt={rentinfo.picture2} className="" />
            </div>
            <div className="column">
              <img src={rentinfo.picture3} alt={rentinfo.picture3} className="" />
            </div>
          </div>
            <p className="title-tool-rules">{ tool.title }</p>
            <div className="columns is-mobile">
              <div className="column">
                <b> Uso </b> <p className="dt-sd">{ moment(startDate).format('DD/MM/YYYY') }</p>
              </div>
              <div className="column">
                <b> Devolução </b> <p className="dt-sd">{ moment(endDate).format('DD/MM/YYYY') }</p>                    
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
          </div>
        </div>  
      </div>

      <div className="back-sticky">
      </div>
    </>
  );
};

export default Rentalbox;