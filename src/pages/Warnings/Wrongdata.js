import React from 'react';
import { Link } from 'react-router-dom';
import queryString from 'query-string';
import { useLocation } from "react-router-dom";
import './style.css'
import { Button } from '../../components/Form/Button';

import logo from '../../assets/images/logo.png';

const Wrongdata = () => {
  let values = queryString.parse(useLocation().search);

  const renderError = () => {
    return (
      <div className="wrongdata">
        <img src={logo} alt={logo}/>
        {
          values.notfound === 'notools' ?
          (
            <div>
              <br/>
              Ops! Você se perdeu? 
              <br/>
              Esta ferramenta não está disponível parece...
              <br/><br/>
              Não tem problema, te levamos para escolher outras, vem com a gente!
            </div>
          )
          :
          (
            <div>
              Ops! 
              <br/>
              Parece que os dados que você forceneu, estão incorrentos.
              <br/>
              Vamos te levar de volta para as ferramentas ok? 
            </div>
          )
        }
        <br/><br/>
        <Link to="/">
          <Button
            type={'button'}
            className={'button color-logo-lessor'}
            text={'Voltar'}
          />
        </Link>
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