import React, { useState, useEffect } from 'react';
import api from '../../../services/api';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import queryString from 'query-string';
import Scroll from '../../../utils/scroll';
import Title from '../../../utils/title';
import desert2 from '../../../assets/images/desert2.svg'
import './style.css';

const Dashboard = ({history, location}) => {
  document.title = Title('Easytools');
  let values = queryString.parse(useLocation().search);

  // eslint-disable-next-line
  const dispatch = useDispatch();
  // eslint-disable-next-line	
  const paramsearch = queryString.parse(useLocation().search).search;
  const [tools, setTools] = useState([]);
	const search = useSelector(state => state.search);
	const latitude = useSelector(state => state.latitude);
  const longitude = useSelector(state => state.longitude);
  const distance = useSelector(state => state.distance);

  useEffect(() => {
    async function loadCoords () {
      navigator.geolocation.getCurrentPosition(
				position => {
          loadTools(position.coords.latitude, position.coords.longitude)
				},
				error => {
          loadTools()
        },{ enableHighAccuracy: true });
    }
    loadCoords()

    async function loadTools(lat = '', lng = '') {
      var latcorrect = ''; 
      var lngcorrect = '';

      if (latitude === '') {
        latcorrect = lat;
        lngcorrect = lng;
      } else {
        latcorrect = latitude;
        lngcorrect = longitude;
      }

      const response = await api.get(`/tools_site?search=${search}&distance=${distance}&lat=${latcorrect}&lng=${lngcorrect}`, {
        headers: { search }
      });
     setTools(response.data.tools)
    }

  }, [search, latitude, longitude, distance]);

  const goTool = (id,category) => {
    Scroll()
    history.push(`s/tool/${id}?ctg=${category}`);
  }

  const goIndex = () => {
    history.push(`/`);
  }

  return (
    <>
      {
        values.t === 'unavailable' ? 
        (
          <div className="warning-unavailable">
            <div className="columns">
              <div className="column is-10">
                A ferramenta que você deseja está indisponível no momento, tente alugar de outro vizinho logo a baixo.
              </div>
              <div className="column">
                <div className="is-pulled-right close-unavailable" onClick={event => goIndex()}></div>
              </div>
            </div>
          </div>
        )
        :
        (
          ''
        )
      }
      <div className="container-fluid">
        <div className="container explorer">
          <h3>O que você precisa?</h3>
          <h2> Não compre, aluge! </h2>
          <br/>
          <h3>Alugue com equipamentos e ferramentas com nossos vizinhos, <br/> aqui na EasyTools! </h3>
        </div>
        {
          /*
                <div className="image-index">
              </div>
          */
        }
        <div className="container">
          <div className="columns is-desktop is-multiline">
            {
              tools.map(tool => (
                <div key={tool.id} className="column is-one-quarter">
                  <span onClick={event => goTool(tool.id, tool.category)}>
                    <div className="tool">
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
                      <b className="category">{tool.category}</b>
                      <p className="title-tool">{tool.title}</p>
                      <p className="text-price">Diária a partir de <span className="price">R$ { tool.prices.split(';')[0] }</span></p>
                    </div>
                  </span>
                </div>
              ))
            }
          </div>
          {
            tools.length > 0 ?
            ('')
            :
            (
              <>
                <div className="columns">
                  <div className="column is-7">
                    <p className="title-notfound">Não encontramos o que você deseja. Tente procurar novamente</p>
                  </div>
                  <div className="column has-text-centered">
                    <img src={desert2} alt="Desert" className="svgnotfound2"/>
                  </div>
                </div>
              </>
            )
          } 
        </div>
      </div>
    </>
  )
}

export default Dashboard;