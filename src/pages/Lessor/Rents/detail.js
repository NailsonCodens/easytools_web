import React, { useState, useEffect } from 'react';
import api from '../../../services/api';
import { useParams } from "react-router-dom";
import queryString from 'query-string';
import { useLocation } from 'react-router-dom';
import {IntlProvider, FormattedNumber} from 'react-intl';
import moment from 'moment';
import 'moment/locale/pt-br';
import Title from '../../../utils/title';
import {Titlepage} from '../../../components/Titles/Titlepages';
import './style.css';
import Modal from '../../../components/Modal';

export default function Rents() {
  document.title = Title('Detalhe aluguel');

  const [rent, setRent] = useState([]);
  const [workadd, setWorkadd] = useState([]);
  const [documentr, setDocument] = useState([]);
  const [modal1, setModal1] = useState(false);
  const [modal2, setModal2] = useState(false);
  const [modal3, setModalthree] = useState(false);

  let { id } = useParams();
  //let values = queryString.parse(useLocation().search);

  useEffect(() => {
    async function loadRents () {
      const response = await api.get(`/rents/${id}`, {});
      setRent(response.data.rentattempt);

      if (response.data.rentattempt.length > 0) {
        const responsew = await api.get(`/workadd/workadd/${response.data.rentattempt[0].id}`, {});
        setWorkadd(responsew.data.workadd[0])
        loadDocumentrenter(response.data.rentattempt[0].user_renter_id)  
      }
    }
    loadRents();

    async function loadDocumentrenter (idrenter) {
      if (idrenter !== undefined) {
        const responsew = await api.get(`documents/${idrenter}`, {});
        setDocument(responsew.data.documentUser[0])
      }

    }
    loadDocumentrenter();
    
    return () => {
    };
  }, [])

  console.log(rent)

  const renderPeriod = (period) => {
    var periodChoose = period

    if (period === 'days') {
      periodChoose = 'Dias ';
    } else if (period === 'biweekly') {
      periodChoose = 'Quinzenal ';
    } else if (period === 'weekend') {
      periodChoose = 'Semanal ';
    } else if (period === 'month') {
      periodChoose = 'Mês ';
    }

    return (
      <>
        { periodChoose }
      </>
    )
  }

  const showdocument = () => {
    setModal1(true)
  }
  
  const hideModalone = () => {
    setModal1(false)
    return modal1
  }

  const showselfie = () => {
    setModal2(true)
  }
  
  const hideModaltwo = () => {
    setModal2(false)
    return modal2
  }


  const showproof = () => {
    setModalthree(true)
  }
  
  const hideModalthree = () => {
    setModalthree(false)
    return modal3
  }


  return (
    <div className="container container-page">
      <div className="columns is-desktop">
        <div className="column box-inter">
        {
          rent.map((rent, index) => (
            <div key={index} className="columns">
              <div className="column">
                <Titlepage>Detalhes do aluguel </Titlepage>
                <div className="columns">
                  <div className="column is-4">
                    <div className="columns">
                      <div className="column">
                        <img src={rent.tool.picture[0].url} alt={rent.tool.picture[0].url} />
                      </div>
                    </div>
                  </div>
                  <div className="column">
                    <b>
                      Informações do aluguél:
                    </b>
                    <br/><br/>
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
                      <p>
                        Tensão: { rent.tension }
                      </p>
                      <p>
                        Período: { rent.days } { renderPeriod(rent.period) }
                      </p>
                      <div className="columns">
                        <div className="column">
                          <b>Valores do aluguel: </b>
                          <IntlProvider locale="pt-br" timeZone="Brasil/São Paulo">
                            <FormattedNumber value={rent.cost} style="currency" currency="BRL" />
                          </IntlProvider>                                
                        </div>
                      </div>
                      <div className="columns">
                        <div className="column">
                          <b>Informações do locatário:</b>
                          <br/>
                          <div className="columns">
                            <div className="column is-3">
                              <div className="avatar-detail">
                                <img src={rent.userrenter.url} alt={rent.userrenter.url} />
                              </div>
                            </div>
                            <div className="column">
                              <p> { rent.userrenter.name } { rent.userrenter.last_name }</p>
                              <p> { rent.userrenter.email } </p>
                              <p> { rent.userrenter.cpfcnpj } </p>
                              { /*<p> <b>Nascimento:</b> { moment(rent.userrenter.birth_date).format('DD/MM/YYYY') } </p>*/ }
                              <br/>
                            </div>
                          </div>
                        </div>
                        <div className="column is-5">
                          <b>Endereço pessoal: </b>
                          <br/><br/>
                          <p> { rent.userrenter.address } { rent.userrenter.number } { rent.userrenter.complement } { rent.userrenter.location } </p>
                          <p> { rent.userrenter.uf } - { rent.userrenter.city } </p>
                          <p>{ rent.userrenter.neighboor }</p>
                          { <b>Adicionar endereço de uso: </b> }
                          <br/><br/>
                            <p> { workadd.address } { workadd.number } { workadd.complement } <br/> { workadd.location } </p>
                            <p> { workadd.uf } - { workadd.city } { workadd.neighboor }</p>
                        </div>
                      </div>
                      <div className="columns">
                        <div className="column">
                          { <p className="link">Documentos do locatário: </p> }
                          <br/>
                          <div className="columns">
                              <div className="column is-3">
                                <span className="is-text" onClick={event => showdocument()}>Ver documento</span>
                              </div>
                              <div className="column is-3">
                                <span className="is-text" onClick={event => showselfie()}>Ver selfie</span>
                              </div>
                              <div className="column is-3">
                                <span className="is-text" onClick={event => showproof()}>Ver Endereço de uso</span>
                              </div>
                          </div>
                          <Modal
                            show={modal1} 
                            onCloseModal={hideModalone} 
                            closeOnEsc={true} 
                            closeOnOverlayClick={true}
                          > 
                            <p>Documento</p>
                            {
                              /*
                              <p className="is-text">Baixar</p>
                              */
                            }
                            
                            <br/>
                            <img src={documentr.urldoc} alt={documentr.urldoc} />
                          </Modal>
                            
                          <Modal
                            show={modal2} 
                            onCloseModal={hideModaltwo} 
                            closeOnEsc={true} 
                            closeOnOverlayClick={true}
                          > 
                            <p>Selfie</p>
                            {
                              /*
                              <p className="is-text">Baixar</p>
                              */
                            }
                            
                            <br/>
                            <img src={documentr.urlselfie} alt={documentr.urlselfie} />
                          </Modal>

                          <Modal
                            show={modal3} 
                            onCloseModal={hideModalthree} 
                            closeOnEsc={true} 
                            closeOnOverlayClick={true}
                          > 
                            <p>Endereço de uso</p>
                            {
                              /*
                              <p className="is-text">Baixar</p>
                              */
                            }
                            
                            <br/>
                            <img src={documentr.urlproof} alt={documentr.urlproof} />
                          </Modal>
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
  );
}
