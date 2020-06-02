import React, { useEffect, useState } from 'react'
import { Button } from '../../../components/Form/Button';
import { useDispatch, useSelector } from "react-redux";
import moment from 'moment';
import 'moment/locale/pt-br';
import api from '../../../services/api';
import { Rentattempt } from '../../../store/actions/rentattempt.js';
import {IntlProvider, FormattedNumber} from 'react-intl';
import {
  isMobile
} from "react-device-detect";
import queryString from 'query-string';
import { useLocation } from 'react-router-dom';

const Rentalbottombox = ({title, go, scroolView = 0, startDate, endDate, attempt}) => {
  let values = queryString.parse(useLocation().search);
  const [tool, setTool] = useState([]);
  const [price, setPrice] = useState({});
  const [setclass, setClass] = useState('bottom-no-box');
  const dispatch = useDispatch();

  useEffect(() => {

    async function showBottom () {
      //verificar mobile
        setClass('bottom-box')

    }
    showBottom()

    async function loadInfochoose() {
      const response = await api.get(`/tools_site/tool/${values.tool}`, {
      });
      setTool(response.data.tool[0])
      formatPrice(response.data.tool[0].prices.split(';'))
    }
    loadInfochoose()

  }, [attempt]);
  const formatPrice = (pricef) => {
    const priceback = pricef !== null ? pricef : 0

    var amount

    if (values.am === undefined) {
      amount = parseFloat(attempt.amount) !== '' ? parseFloat(attempt.amount) : 0
    } else {
      amount = parseFloat(values.am.replace(/\./gi,'').replace(/,/gi,'.')) !== '' || parseFloat(values.am.replace(/\./gi,'').replace(/,/gi,'.')) !== null ? parseFloat(values.am.replace(/\./gi,'').replace(/,/gi,'.')) : 0
    }


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

        pricefixednoamount = days * parseFloat(priceback[3].replace(/\./gi,'').replace(/,/gi,'.'))
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

          pricefixednoamount = days * parseFloat(priceback[1].replace(/\./gi,'').replace(/,/gi,'.'))
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

          pricefixednoamount = days * parseFloat(priceback[2].replace(/\./gi,'').replace(/,/gi,'.'))
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

          pricefixednoamount = days * parseFloat(priceback[2].replace(/\./gi,'').replace(/,/gi,'.'))
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


          pricefixednoamount = days * parseFloat(priceback[3].replace(/\./gi,'').replace(/,/gi,'.'))
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
      
      //dispatch(Rentattempt(price.priceNoamount, price.amount, price.pricefull, amountat, price.type, 0, price.price, amountmonth))

      //updateRentattemp(price.priceNoamount, price.amount, price.pricefull, amountat, price.type, 0, price.price, amountmonth)
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
    console.log(rentupdate)

    if (attempt.id !== undefined) {
      await api.put(`rent/attempt/updaterent/${attempt.id}`, rentupdate, {})
      .then((res) => {
      }).catch((err) => {
        console.log(err.response)
      })   
    }
  }

  return (
    <div className={setclass}>
      <div className="columns">
        {
          isMobile ?
          ('')
          :
          (
            <>
              <div className="column is-hidden-bottom">
                <p>Aluguel de <span className="titlerentbox">{ title }</span></p>
              </div>
            </>
          ) 
        }
        <div className="column">
          <div className="columns is-mobile">
            <div className="column">
              <Button 
                type={'button'}
                className={'button is-pulled-right bt-bottom color-logo'}
                text={'Prosseguir'}                                    
                onClick={event => go()}
              />
              <p className={ isMobile ? "is-pulled-left price-bottom" : "is-pulled-right price-bottom" }>
                <IntlProvider locale="pt-br" timeZone="Brasil/São Paulo">
                  <b>Total: <FormattedNumber value={parseFloat(price.pricefull) || 0} style="currency" currency="BRL" /></b>
                </IntlProvider>            
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Rentalbottombox
