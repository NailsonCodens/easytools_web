import React from 'react';
import { Link } from 'react-router-dom';
import queryString from 'query-string';
import { useLocation } from "react-router-dom";
import './style.css'
import { Button } from '../../components/Form/Button';

import desert from '../../assets/images/desert.svg'

const Wrongdata = () => {
  let values = queryString.parse(useLocation().search);

  const renderError = () => {
    return (
      <div className="container container-notfound">
        <div className="columns">
          <div className="column">
            {
              values.notfound === 'notools' ?
              (
                <div>
                  <p className="title-notfound">Ops! Algo deu errado?</p> 
                  <p className="text-notfound">
                    Esta ferramenta não está disponível parece...
                    <br/>
                    Não tem problema, te levamos para escolher outras, vem com a gente!
                  </p>
                </div>
              )
              :
              (
                <div>
                  <p className="title-notfound"> Ops!</p> 
                  <p className="text-notfound">Parece que os dados que você forceneu, estão incorrentos.
                  Vamos te levar de volta para as ferramentas ok? 
                  </p>
                </div>
              )
            }
            <Link to={'/'} className="is-info create-ad">
              <Button
                type={'submit'}
                className={'button color-logo'} 
                text={'Ir'}
              />
            </Link>
          </div>
          <div className="column has-text-centered">
           <img src={desert} alt="Desert" className="svgnotfound"/>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container">
      {
        renderError()
      }   
    </div>
  );
};

export default Wrongdata;