import React, { useEffect, useState } from 'react';
import { Route, useRouteMatch } from 'react-router-dom';
import Scroll from '../../../../utils/scroll';
import api from '../../../../services/api';
import {Titlepage} from '../../../../components/Titles/Titlepages';
import { Button } from '../../../../components/Form/Button';
import Title from '../../../../utils/title';

export default function Adonsinit({history}) {
  const [adons, setAdons] = useState([]);

  useEffect(() => {
    async function loadTools() { 
      const response = await api.get(`/adons`, {
      });
      setAdons(response.data.adons)
    }
    loadTools();
  }, []);

  const createAdons = () => {
    Scroll()
    history.push(`adons/create/`);
  }

  document.title = Title('Editar anúncio');  

  return (
    <div className="container container-page">
      <div className="columns">
        <div className="column has-text-left">
          <Titlepage>Acessórios</Titlepage>
        </div>
        <div className="column has-text-right">
          <br/><br/>
          <Button
            onClick={event => createAdons()}
            type={'button'}
            className={'button color-logo'}
            text={'Cadastrar'}
          />
        </div>
      </div>
      <div className="box-inter">
        {
          adons.map(adons => (
            <div className="columns">
              <div className="column">
                <div className="columns">
                  <div className="column is-1">
                    <img src={ adons.url } alt="EasyTools adons" className="imageadons"/>
                  </div>
                  <div className="column">
                    <p>{ adons.name }</p>
                    <p> R$ { adons.price }</p>
                  </div>
                </div>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}
