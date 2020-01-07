import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import api from '../../../services/api';

import image1 from '../../../assets/images/4350FCT-Makita-1.jpg';
import image2 from '../../../assets/images/4350FCT-Makita-2.jpg';
import image3 from '../../../assets/images/4350FCT-Makita-3.jpg';

import './style.css';
import { Ul } from '../../../components/List';
import { Hr } from '../../../components/Hr';

const Tool = () => {

  const [tool, setTool] = useState({});
  const [pictures, setPictures] = useState([]);
  let {id} = useParams();
  
  useEffect(() => {
    async function loadTool() { 
      const response = await api.get(`/tools_site/tool/${id}`, {
      });
      setTool(response.data.tool[0])
      setPictures(response.data.tool[0].picture)
    }

    loadTool();
  }, [id]);

  return (
    <>
      <div className="container-fluid">
        <div className="columns box-photos">
          {
            pictures.map((picture, index) => (
              <div key={index}>
                <div className="column">
                  <img src={picture.url} alt={picture.url} className="" />
                </div>  
              </div>
            ))
          }
        </div>
        <div className="container">
          <div className="columns head-infos-tool">
            <div className="column is-two-thirds">
              <div>
                <h3 className="title-tool-only">{tool.title}</h3>
                <b className="category">{ tool.category }</b>
              </div>
            </div>
            <div className="column">
              <div className="columns">
                <div className="">
                  <img src={image3} alt={image3} className="logo-neighbor"/>
                  <span className="name-neighbor">Ap Andaimes</span>
                </div>
              </div>
            </div>
          </div>
          <div className="columns">
            <div className="column is-two-thirds teste">
              <div className="description">
                <p className="title-infos-tool">
                  Descrição
                </p>
                <p className="text-simple-info-tool">
                  { tool.description }
                </p>
              </div>
              <Hr/>
              <div className="specification">
                <p className="title-infos-tool">Especificações</p>
                <div className="columns">
                  <div className="column">
                    <Ul>
                      <li><b>Marca</b></li>
                      <li>{ tool.brand }</li>
                      <li><b>Categoria</b></li>
                      <li>{ tool.category }</li>
                    </Ul>
                  </div>
                  <div className="column">
                    <Ul>
                      <li><b>Tipo</b></li>
                      <li>{ tool.type_spec }</li>
                    </Ul>
                  </div>
                </div>
              </div>
              <Hr/>
            </div>
            <div className="column has-centered-text">
              <div className="rental-box">
                  Espaço para formulário do aluguel
              </div>
            </div>
          </div>
          <div className="columns">
            <div className="column">
              <p className="title-infos-tool hack-padding-top">Configurações</p>   
              <div className="columns">
                <div className="column">
                  <Ul>
                    <li><b>Potência</b></li>
                    <li>{ tool.power }</li>
                    <li><b>Tensão</b></li>
                    <li>{ tool.tension }</li>
                  </Ul>
                </div>
                <div>
                  <Ul>
                    <li><b>Alimentação</b></li>
                    <li>Energia Elétrica</li>
                  </Ul>
                </div>
              </div>
            </div>
            <div className="column">

            </div>
          </div>
          <Hr/>
          <div className="columns comments">
            <div className="column">
              <p className="title-infos-tool hack-padding-top">Comentários e Avaliações</p>
              <Ul>
                <li>
                  <div className="card">
                    <div className="card-content">
                      <div className="media">
                        <div className="media-left">
                          <img src="https://bulma.io/images/placeholders/96x96.png" alt="asdsad g"/>
                        </div>
                        <div className="media-content">
                          <p className="title is-4">
                            Maria José
                          </p>
                          <p className="subtitle is-6">
                            @mariajosé
                          </p>
                        </div>
                      </div>
                      <div className="content">
                        Os equipamentos estão sempre impecavéis. Alugo sempre com eles, pois sei da procedência. 
                        Tem um atendimento impecável, presencialmente e aqui na Easyools.
                      </div>
                    </div>
                  </div>  
                </li>
              </Ul>
            </div>
            <div className="column">
              
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Tool;