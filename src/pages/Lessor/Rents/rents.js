import React, { useState, useEffect } from 'react'
import {Titlepage} from '../../../components/Titles/Titlepages';
import api from '../../../services/api';
import './style.css';
import moment from 'moment';
import 'moment/locale/pt-br';
import Title from '../../../utils/title';

const Rents = () => {
  document.title = Title('Aluguéis');

  const [rents, setRents] = useState([]);

  useEffect(() => {
    async function loadRents () {
      const response = await api.get('/rents/', {});
      setRents(response.data.rentattempt);
    }
    loadRents();

    return () => {
    };
  }, [])

  return (
    <div className="container container-page">
      <div className="columns">
        <div className="column has-text-left">
          <Titlepage>Aluguéis</Titlepage>
          <div className="columns is-desktop">
            <div className="column box-inter">
              {
                rents.map((rent, index) => (
                  <div key={index} className="columns">
                    <div className="column">
                      <div className="columns">
                        <div className="column is-3">
                          <img src={rent.tool.picture[0].url} alt={rent.tool.picture[0].url} className="image-tool-rent"/>
                        </div>
                        <div className="column">
                          <p className="capitalize">
                            { rent.tool.title } alugado para 
                            <b> { rent.userrenter.name }</b>
                          </p>
                        <div className="columns">
                          <div className="column">
                            <p className="sub-title">Aluguel: <span className="datefull">{moment(rent.startdate).format('DD/MM/YYYY')}</span></p>
                            <div className="box-date-rules is-pulled-left">
                              {moment(rent.startdate).format('DD')}
                              <br/>
                              {moment(rent.startdate).format('MMM')}
                            </div>
                            <div className="name-data-rules is-pulled-left">
                              {moment(rent.startdate).format('dddd')}
                            </div>
                            <div className="is-clearfix	"></div>
                          </div>
                          <div className="column">
                            <p className="sub-title">Devolução: <span className="datefull">{moment(rent.enddate).format('DD/MM/YYYY')}</span></p>
                            <div className="box-date-rules is-pulled-left">
                              {moment(rent.enddate).format('DD')}
                              <br/>
                              {moment(rent.enddate).format('MMM')}
                            </div>
                            <div className="name-data-rules is-pulled-left">
                              {moment(rent.enddate).format('dddd')}
                            </div>
                            <div className="is-clearfix	"></div>
                            <p className="datefull"></p>
                          </div>
                        </div>
                        <div className="columns">
                          <div className="column">
                            <b>
                              Informações do aluguél:
                            </b>
                            <p>
                              Tensão: { rent.tool.tension }
                            </p>
                            <p>
                              Período: { rent.days } { rent.period }
                            </p>
                            <div className="columns">
                              <div className="column">
                                Valores do aluguel
                              </div>
                            </div>
                          </div>
                        </div>
                        </div>
                      </div>
                    </div>
                  </div>                  
                ))
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Rents
