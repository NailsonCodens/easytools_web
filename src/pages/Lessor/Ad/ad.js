import React, { useState, useEffect } from 'react';
import api from '../../../services/api';
import { Link, useLocation } from 'react-router-dom';
import queryString from 'query-string';
import Scroll from '../../../utils/scroll';
import { Button } from '../../../components/Form/Button';
import {Titlepage} from '../../../components/Titles/Titlepages';
import Title from '../../../utils/title';
import Availability from './btAvailability';

import './style.css';

export default function Index({history}) {
  document.title = Title('Anúncios');

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

  const clickGo = (event, id) => {
    Scroll()
    history.push(`ad/detail/${id}`);
  }

  return (
    <>
      <div className="container container-page">
        <div className="columns">
          <div className="column has-text-left">
            <Titlepage>Meus Anúncios</Titlepage>
          </div>
          <div className="column has-text-right">
          </div>
        </div>
        <div className="columns is-desktop">
          <div className="column box-inter">
            <div className="columns is-desktop is-multiline">
              { tools.length === 0 ? <div className={'mwd-placeholder'} >Você ainda não tem nenhum anúncio.</div> : ''}
              {
                tools.map(tool => (
                  <div key={tool.id} className="column is-one-third">
                    <div className="tool-ad">
                      <div className="picture-tool">
                        {
                          tool.picture.map(picture => (
                            <span key={ picture.url } >
                              {
                                picture.main === '1' ?
                                (
                                  <img src={ picture.url } alt="EasyTools Logo" className="image-list ad-img"/>
                                ):
                                ('')
                              }
                            </span>
                          ))
                        }
                      </div>
                      <div className="title-ad-box">
                        <p className="title-tool">{tool.title}</p>
                      </div>
                      <Button
                        onClick={event => clickGo(event, tool.id)}
                        type={'button'}
                        className={'button is-info color-logo-lessor is-small is-fullwidth is-pulled-right'}
                        text={'Ver Detalhes'}
                      />
                      <Availability idtool={tool.id} availability={tool.availability}/>
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