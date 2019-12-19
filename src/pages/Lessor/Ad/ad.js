import React, { useState, useEffect } from 'react';
import api from '../../../services/api';
import { Link, useLocation } from 'react-router-dom';
import queryString from 'query-string';

import { Button } from '../../../components/Form/Button';
import {Titlepage} from '../../../components/Titles/Titlepages';

import './style.css';

export default function Index({history}) {
  const paramsearch = queryString.parse(useLocation().search).search;
  const [tools, setTools] = useState([]);

  const search = paramsearch === undefined ? '' : paramsearch

  useEffect(() => {
    async function loadTools() { 
      const response = await api.get(`/tools?search=${search}`, {
        headers: { search }
      });
     setTools(response.data.tools)
    }
    loadTools();
  }, [search]);

  return (
    <>
      <div className="container container-page">
        <div className="columns">
          <div className="column has-text-left">
            <Titlepage>Menus Anúncios</Titlepage>
          </div>
          <div className="column has-text-right">
            <Link to={'/lessor/ad/create'} className="is-info create-ad">
              <Button
                type={'submit'}
                className={'button is-info color-logo-lessor'} 
                text={'Cadastrar Anúncio'}
              />
            </Link>
          </div>
        </div>
        <div className="columns is-desktop">
          <div className="column box-inter">
            <div className="columns is-desktop is-multiline">
              {
                tools.map(tool => (
                  <div key={tool.id} className="column is-one-third">
                    <div className="tool">
                      <div className="picture-tool"> 
                        <p>No picture</p>
                      </div>
                      <p className="title-tool">{tool.title}</p>
                      <Link to={`s/tool/${tool.id}`}>Ver Detalhes</Link>
                    </div>
                  </div>
                ))
              }
            </div>          
          </div>
        </div>
      </div>
    </>
  )
}