import React, {useState, useEffect} from 'react';

import {Titlepage} from '../../../components/Titles/Titlepages';
import {SubTitlepages} from '../../../components/Titles/SubTitlepages';
import api from '../../../services/api';

import Title from '../../../utils/title';

import './style.css';

const Dashboard = ({history}) => {
  document.title = Title('Dashboard');
  const [rents, setRents] = useState(0);
  const [ads, setAds] = useState(0);

  useEffect(() => {
    async function loadCountrents () {
      const response = await api.get(`/dashboard/rents`, {})
      setRents(response.data.rent)
    }
    loadCountrents()

    async function loadCountads () {
      const response = await api.get(`/dashboard/ads`, {})
      setAds(response.data.tool)
    }
    loadCountads()

    return () => {
    };
  }, [])

  return (
    <>
      <div className="container container-page">
        <Titlepage>Meus resultados</Titlepage>
        <div className="columns is-desktop">
          <div className="column box-inter has-text-centered">
            <SubTitlepages>Aluguéis</SubTitlepages>
            <p className="values-dashboard">
              { rents }
            </p>
          </div>
          <div className="column box-inter has-text-centered">
            <SubTitlepages>Anúncios</SubTitlepages>
            <p className="values-dashboard">
              { ads }
            </p>
          </div>
          <div className="column box-inter has-text-centered">
            <SubTitlepages>Recomendações</SubTitlepages>
          </div>
        </div>
        <div className="columns is-desktop">
          <div className="column box-inter has-text-centered">
            <SubTitlepages>Seus resultados até agora</SubTitlepages>
          </div>
          <div className="column box-inter has-text-centered">
            <SubTitlepages>Texto sobre a avaliação do locador</SubTitlepages>
          </div>
        </div>
      </div>
    </>
  )
}

export default Dashboard;