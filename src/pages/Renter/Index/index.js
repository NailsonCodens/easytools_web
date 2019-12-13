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
      const response = await api.get(`/tools?search=${search}`, {
        headers: { search }
      });
     setTools(response.data.tools)
    }

    loadTools();
  }, [search]);

  return (
    <>
      <div className="container">
        <div className="columns is-desktop is-multiline tool">
          {
            tools.map(tool => (
              <div key={tool.id} className="column is-one-quarter">
                <p>{tool.title}</p>
              </div>
            ))
          }
        </div>
      </div>
    </>
  )
}

export default Dashboard;