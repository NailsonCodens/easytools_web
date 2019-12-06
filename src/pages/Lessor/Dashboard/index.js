import React from 'react';

import {Titlepage} from '../../../components/Titles/Titlepages';
import {SubTitlepages} from '../../../components/Titles/SubTitlepages';

import './style.css';

export default function Dashboard({history}) {
  return (
    <>
      <div className="container container-page">
        <Titlepage>Meus resultados</Titlepage>
        <div className="columns is-desktop">
          <div className="column box-inter has-text-centered">
            <SubTitlepages>Aluguéis</SubTitlepages>
          </div>
          <div className="column box-inter has-text-centered">
            <SubTitlepages>Anúncios</SubTitlepages>
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