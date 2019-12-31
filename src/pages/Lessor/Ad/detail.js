import React, { useEffect, useState } from 'react';
/*
import { Form, Input } from '@rocketseat/unform';
import { Field, Label } from '../../../components/Form/Form';
import { Button } from '../../../components/Form/Button';
import { Span } from '../../../components/Span';
*/
import { useParams } from "react-router-dom";
import api from '../../../services/api';

import {Titlepage} from '../../../components/Titles/Titlepages';


const Detail = (receive) => {
  let { id } = useParams();
  const [tool, setTool] = useState({});
  const [prices, setPrices] = useState({});

  useEffect(() => {
    async function loadTool() { 
      const response = await api.get(`/tools/tool/${id}`, {
      });
      setTool(response.data.tool[0])
      setPrices(response.data.tool[0].prices.split(';'))
    }
    loadTool();
  }, [id]);

  return (
    <>
      <div className="container container-page">
        <Titlepage>ANÚNICIO: { tool.title }</Titlepage>
          <div className="columns is-desktop ">
            <div className="column is-three-fifths box-inter">
              <div className="container">
                <p className="tool-datas">
                  <b>Título</b>
                  <br/>
                  { tool.title }
                </p>
                <p className="tool-datas">
                  <b>Descrição</b>
                  <br/>
                  { tool.description }
                </p>
                <p className="tool-datas">
                  <b>Marca: </b> { tool.brand } 
                  <b> Tipo: </b> { tool.type_spec } 
                  <b> Categoria: </b> { tool.category } 
                </p>
                <p className="tool-datas">
                  <b>Alimentação: </b> { tool.feeds } 
                  <b> Potência: </b> { tool.power } 
                  <b> Tensão: </b> { tool.tension } 
                </p>
                <p className="tool-datas">
                  <b> Acessórios: </b> { tool.accessory }  
                </p>
                <p className="tool-datas">
                  <b> Vai junto(Brinde): </b> { tool.follow }  
                </p>
                <p className="tool-datas">
                  <b> Indicação de uso: </b> { tool.use_indication }  
                </p>
                <p className="tool-datas">
                  <b>Preços:</b>
                  <br/>
                  <b> Diária: </b> <span className="money">R$ { prices[0] } </span> <b> Quinzenal: </b> <span className="money">R$ { prices[1] } </span> <b> Mensal: </b> <span className="money">R$ { prices[2] } </span>

                </p>
                <p className="tool-datas"> 
                  <b> Contrato: </b> { tool.contract === 'Y' ? 'SIM' : 'NÃO' }
                  <b> Seguro: </b> { tool.insurance === 'Y' ? 'SIM' : 'NÃO' }
                  <b> Entraga: </b> { tool.delivery === 'Y' ? 'SIM' : 'NÃO' }
                  <b> Devolução: </b> { tool.devolution === 'Y' ? 'SIM' : 'NÃO' }
                </p>
              </div>
            </div>
            <div className="column box-inter">
              adicionar foto
            </div>
          </div>
          <div className="columns is-desktop ">
            <div className="column is-three-fifths box-inter">
              <div className="container">
                  
              </div>
            </div>
            <div className="column box-inter">

            </div>
          </div>
      </div>
    </>
  )
}

export default Detail; 