import React, { useState, useEffect } from 'react';
import api from '../../../services/api';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';

import './style.css';

const Dashboard = ({history, location}) => {
  const paramsearch = queryString.parse(useLocation().search).search;
  const [tools, setTools] = useState([]);

  const search = paramsearch === undefined ? '' : paramsearch

  useEffect(() => {
    async function loadTools() { 
      const response = await api.get(`/tools_site?search=${search}&lat=-25.437958&lng=-49.174358`, {
        headers: { search }
      });
     setTools(response.data.tools)
    }

    loadTools();
  }, [search]);

  return (
    <>
      <div className="container-fluid">
        <div className="container explorer">
          <h3>O que você precisa? </h3>
          <div className="columns">
            <div className="column">
              <div className="itens-explorer">
                Ferramentas pessoais
              </div>
            </div>
            <div className="column">
              <div className="itens-explorer">
                Ferramentas de médio porte
              </div>
            </div>
            <div className="column">
              <div className="itens-explorer">
                Ferramentas de médio porte
              </div>
            </div>
          </div>
        </div>
        <div className="image-index">
        </div>
        <div className="container">
          <div className="columns is-desktop is-multiline">
            {
              tools.map(tool => (
                <div key={tool.id} className="column is-one-quarter">
                  <div className="tool">
                    <div className="picture-tool"> 
                      <p>No picture</p>
                    </div>
                    <b className="category">{tool.category}</b>
                    <p className="title-tool">{tool.title}</p>
                    <p className="text-price">Diária a partir de <span className="price">R$ 30,00</span></p>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
      </div>
    </>
  )
}

export default Dashboard;