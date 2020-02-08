import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import moment from 'moment';
import 'moment/locale/pt-br';
import { Rentattempt } from '../../../store/actions/rentattempt.js';
  // eslint-disable-next-line
import preciseDiff from 'moment-precise-range-plugin';
import {IntlProvider, FormattedNumber} from 'react-intl';
import { Warningtext } from '../../../components/Warningtext';
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
      setTool(response.data.tool[0])
      formatPrice(response.data.tool[0].prices.split(';'))
    }
    loadInfochoose()
  }, [attempt, rentinfo]);

  const formatPrice = (pricef) => {

    const priceback = pricef !== null ? pricef : 0
    const amount = parseInt(values.am) !== '' || parseInt(values.am) !== null ? parseInt(values.am) : 0

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
  
      if (period.months !== 0) {
        periodat = 'month'
        priceat = parseInt(priceback[3])
        costat = (months * parseInt(priceback[3]) * amount)

        setPrice({
          type: 'month', 
          amount: days, 
          amountmonth: months, 
          price: parseInt(priceback[3]), 
          priceNoamount: months * parseInt(priceback[3]), 
          pricefull: (months * parseInt(priceback[3]) * amount)
        })
      } else if (period.days !== 0) {
        if (days < 7) {
          periodat = 'days'
          priceat = parseInt(priceback[0])
          costat = (days * parseInt(priceback[0]) * amount)

          setPrice({
            type: 'days', 
            amount: days, 
            price: parseInt(priceback[0]),
            priceNoamount: days * parseInt(priceback[0]), 
            pricefull: (days * parseInt(priceback[0]) * amount)
          })
        } else if (days === 7) {
          periodat = 'weekend'
          priceat = parseInt(priceback[1])
          costat = (1 * parseInt(priceback[1]) * amount)

          setPrice({
            type: 'weekend', 
            amount: days, 
            price: parseInt(priceback[1]), 
            priceNoamount: 1 * parseInt(priceback[1]),
            pricefull: (1 * parseInt(priceback[1]) * amount)
          })
        } else if (days > 7 && days < 15) {
          periodat = 'biweekly'
          priceat = parseInt(priceback[2])
          costat = (1 * parseInt(priceback[2]) * amount)

          setPrice({
            type: 'biweekly', 
            amount: days, 
            price: parseInt(priceback[2]), 
            priceNoamount: 1 * parseInt(priceback[2]),
            pricefull: (1 * parseInt(priceback[2])) * amount
          })
        } else if (days === 15) {
          periodat = 'biweekly'
          priceat = parseInt(priceback[2])
          costat = (1 * parseInt(priceback[2]) * amount)

          setPrice({
            type: 'biweekly', 
            amount: days, 
            price: parseInt(priceback[2]), 
            priceNoamount: 1 * parseInt(priceback[2]),
            pricefull: (1 * parseInt(priceback[2])) * amount
          })  
        } else if (days > 15) {
          periodat = 'month'
          priceat = parseInt(priceback[3])
          costat = (1 * parseInt(priceback[3]) * amount)

          setPrice({
            type: 'month', 
            amount: days, 
            amountmonth: 1, 
            price: parseInt(priceback[3]), 
            priceNoamount: 1 * parseInt(priceback[3]),
            pricefull: (1 * parseInt(priceback[3])) * amount
          })
        }
      }

      dispatch(Rentattempt(price.priceNoamount, price.amount, price.pricefull, amountat, price.type))

    }else {
      //por aqui um redirect para erro 404
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
        text2 = `* Custo mensal, com este valor você pode alugar por mais ${ 30 - days } dias!`
      } else {
        text = ` x ${months} Mêses`
        text2 = '* Custo mensal, com este valor você pode alugar por mais dias para fechar o mês!'
      }
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
          <div className="column is-6">
            <p className="is-pulled-right">
              <IntlProvider locale="pt-br" timeZone="Brasil/São Paulo">
                <FormattedNumber value={price.priceNoamount} style="currency" currency="BRL" />
                { 
                  values.am === undefined ? 'x 1 PÇ' : `x ${values.am} PÇ` 
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
        <div className="columns no-margin-top-columns">
          <div className="column">
            Tensão equip
          </div>
          <div className="column">
            <div className="is-pulled-right">
              { values.tension === 'Tri' ? 'Trifásico' : values.tension }
            </div>
          </div>
        </div>
        <div className="columns no-margin-top-columns">
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
      <div className="rental-box">
        <div className="columns">
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
        <b className="category">{ rentinfo.category }</b>
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
    </>
  );
};

export default Rentalbox;