import React, { useEffect, useState } from 'react';
import api from '../../../services/api';
import {Titlepage} from '../../../components/Titles/Titlepages';
import Title from '../../../utils/title';


export default function Adons({history}) {
  const [adons, setAdons] = useState([]);

  useEffect(() => {
    async function loadTools() { 
      const response = await api.get(`/adons`, {
      });
      
     setAdons(response.data.adons)
    }
    loadTools();
  }, []);

  document.title = Title('Editar anúncio');  
  return (
    <>
      <div className="container container-page">
        <div className="columns">
          <div className="column has-text-left">
            <Titlepage>Opcionais</Titlepage>
          </div>
          <div className="column has-text-right">
          </div>
        </div>
        <div className="columns is-desktop">
          <div className="column box-inter">
            <div className="columns">
              {
                adons.map(adons => (
                  <div className="columns">
                    <div className="column">
                      <img src={ adons.url } alt="EasyTools adons" className="imageadons"/>
                    </div>
                    <div className="column">
                      <p>{ adons.name }</p>
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