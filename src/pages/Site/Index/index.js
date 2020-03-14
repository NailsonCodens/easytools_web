import React, { useState, useEffect } from 'react';
import api from '../../../services/api';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import queryString from 'query-string';
import Scroll from '../../../utils/scroll';
import Title from '../../../utils/title';
import desert2 from '../../../assets/images/desert2.svg'
import './style.css';
import logo from '../../../assets/images/easytools_yellow.png'
import background from '../../../assets/images/background.png'
import { Link, useHistory } from 'react-router-dom';
import ReactGA from 'react-ga';
import {Helmet} from 'react-helmet'

const Dashboard = ({history, location}) => {
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
    /*
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
    */

    async function loadTools(lat = '', lng = '') {
      var latcorrect = ''; 
      var lngcorrect = '';

      /*if (latitude === '') {
        latcorrect = lat;
        lngcorrect = lng;
      } else {
        latcorrect = latitudge;
        lngcorrect = longitude;
      }*/

      const response = await api.get(`/tools_site?search=${search}&distance=${1000}&lat=${latcorrect}&lng=${lngcorrect}`, {
        headers: { search }
      });

     setTools(response.data.tools)
    }
    loadTools()

  }, [search, latitude, longitude, distance]);

  const Tracking = (id, category, action, label) => {
    ReactGA.event({
      category: category,
      action: action,
      label: label,
    });
  }

  const goTool = (id,category, tool) => {
    Tracking(id, 'Clque na ferramenta', `Clique na (tools) ferramenta ${tool.id} ${tool.title}`)

    Scroll()
    history.push(`s/tool/${id}?ctg=${category}`);
  }

  const goIndex = () => {
    history.push(`/`);
  }

  return (
    <>
      <Helmet>
        <title>Aluguel on-line de equipamentos e ferramentas! | EasyTools</title>
        <meta
          name="description"
          content="EasyTools, Aluguel online de ferramentas e equipamentos que você e seu negócio precisam! A primeira locadora de equipamentos e ferrmanetas totalmente on-line."
        />
        <meta name="keywords" content="Aluguel, ferramenta, equipamento, betoneira, aluguel de equipamento online"/>
      </Helmet>

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
      <div className="">
        <div className="">
          {
            search === '' ? 
            (
              <div className="image-index">
                <div className="explorer has-text-centered">
                  <div className="">
                    <img src={logo}  alt="EasyTools Logo" className="logo-index"/>
                  </div>                
                  <br/><br/><br/>
                  <h3>Alugar equipamentos e ferramentas nunca foi tão fácil! </h3>
                  <p className="text-subtitle-index">Uma nova maneira de alugar equipamentos e ferramentas.</p>
                  <br/><br/>
                  <Link
                    to={'/s/about-us'}
                    className={'button color-logo'}
                    onClick={event => Tracking('noid', 'Como funciona', `Como funciona?`) }  
                  >
                    Como funciona?
                  </Link>
                  <br/>
                  <img src={background}  alt="EasyTools Logo" className="background-tools"/>
                </div>
              </div>
            )
            :
            ('')
          }
        </div>
        <div className="container">

          <h3 className="title-index">O que você precisa?</h3>
          <div className="columns is-desktop is-multiline">
            {
              tools.map(tool => (
                <div key={tool.id} className="column is-one-quarter">
                  <span onClick={event => goTool(tool.id, tool.category, tool)}>
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
                <div className="columns is-mobile">
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