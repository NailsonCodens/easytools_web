import React, { useState, useEffect } from 'react';
import api from '../../../services/api';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import queryString from 'query-string';
import Scroll from '../../../utils/scroll';
import Title from '../../../utils/title';
import desert2 from '../../../assets/images/desert2.svg'
import './style.css';
import {Viewsearch} from '../../../store/actions/viewsearch';
import logo from '../../../assets/images/easytools_yellow.png'
import bricolagem from '../../../assets/images/bricolagem.jpg'
import construcao from '../../../assets/images/construcao.jpg'
import limpeza from '../../../assets/images/limpeza.jpg'
import estrutura from '../../../assets/images/estrutura.jpeg'
import background from '../../../assets/images/background.png'
import { Link, useHistory } from 'react-router-dom';
import ReactGA from 'react-ga';
import {Helmet} from 'react-helmet'
import Notificationtost from '../../../utils/notification';
import { Button } from '../../../components/Form/Button';
import Typewriter from 'typewriter-effect';
import logo2 from '../../../assets/images/logo.png'
import { getCordinates } from '../../../services/mapbox';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import "../../../../node_modules/slick-carousel/slick/slick.css"; 
import "../../../../node_modules/slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { faMapMarkerAlt, faTruckLoading, faCalendarAlt, faMousePointer} from '@fortawesome/free-solid-svg-icons'
library.add(faMapMarkerAlt, faTruckLoading, faCalendarAlt, faMousePointer);

const Dashboard = ({history, location}) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  let values = queryString.parse(useLocation().search);
  var viewsearch = useSelector(state => state.viewsearch);
  // eslint-disable-next-line
  const dispatch = useDispatch();
  // eslint-disable-next-line	
  const paramsearch = queryString.parse(useLocation().search).search;
  const [tools, setTools] = useState([]);
  const [places, setPlaces] = useState([]);
  const [view, setView] = useState([]);
  const [myaddress, setMyaddress] = useState('');
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

    async function loadFreight (userid) {
      const response = await api.get(`/userconfig/${userid}`, {
      });
      console.log(response)
    }


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

      const response = await api.get(`/tools_site?search=${search}&distance=${''}&lat=${latcorrect}&lng=${lngcorrect}`, {
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

	const handleMyaddress = (event) => {
    let query = event.target.value
		setMyaddress(event.target.value)

		getCordinates(query).then(res => {
			setPlaces(res.data.features)
		})
  }  

  const goTool = (id,category, tool) => {
    Tracking(id, 'Clque na ferramenta', `Clique na (tools) ferramenta ${tool.id} ${tool.title}`)

    Scroll()
    history.push(`s/tool/${id}?ctg=${category}`);
  }

  const goIndex = () => {
    history.push(`/`);
  }

  const error = () => Notificationtost(
    'error',
    'Não conseguimos pegar sua localização. habilite a geolocalização em seu navegador.', 
    {
      autoClose: 3000,
      draggable: false,
    },
    {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
    }
  )
  
  async function findToolsM (lat, lng) {
    const response = await api.get(`/tools_site?search=${search}&distance=${50}&lat=${lat}&lng=${lng}`, {
      headers: { search }
    });
    setTools(response.data.tools)
    dispatch(Viewsearch(true))
  }

  const Geoloc = () => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
			position => {
        findToolsM(position.coords.latitude, position.coords.longitude)
      },
			erroget => {
				error()
			},{ enableHighAccuracy: true });
		}
  }

  const selectPlace = (place) => {
    findToolsM(place.center[1], place.center[0])
    setMyaddress(place.place_name)
		setPlaces(false)
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
          <div className="image-index">
            <div className="explorer has-text-centered">
              <div className="box-digi">
              {
                viewsearch === ''? 
                (
                  <h3 className="title-index">
                  <Typewriter
                    options={{
                      strings: ['Precisou? Alugue online e sem burocracia.', 'Alugar ferramentas e equipamentos nunca foi tão fácil.'],
                      autoStart: true,
                      loop: true,
                      delay: 50,
                      deleteSpeed: 10
                    }}
                  />
                </h3>
                )
                :
                ('')
              }
              </div>            
                {
                  /*
                    <p className="text-subtitle-index">Alugou, Chegou!🔧</p>                      
                  */
                }
              <br/>
              <p className="title-search-geolo">Precisou de uma furadeira? Encontre e alugue aqui!</p>
                <div className="container container-new">
                  <div className="field field-cs has-addons">
                    <div className="control is-expanded">
                      <input 
                        type="text" 
                        placeholder='Sua localização para achar equipamentos perto de você.' 
                        className="input input-geolocalization" 
                        onChange={event => handleMyaddress(event)}
                        value={myaddress}
                      />
                    </div>
                    <div className="control">
                      <button 
                        type={'button'}
                        className={'button is-default geolo-bt'}
                        title="Sua localização"
                        onClick={event => Geoloc()}
                      >
                        <FontAwesomeIcon icon={['fas', 'map-marker-alt']} className="size-cs-geolo" size="2x"/>
                      </button>
                    </div>
                  </div>
                </div>
              <div className="father-address">
                <ul className="">
                {
                  places.length > 0 ? 
                  (
                    <>
                      <div className="background-address">
                        <ul>
                          {
                            places.map((place, index) => (
                              <li className="list-places" key={index} onClick={event => selectPlace(place)}>
                                {place.place_name}
                              </li>
                            ))
                          }
                        </ul>
                      </div>
                    </>
                  )
                  :
                  ('')
                }
                </ul>
              </div>
              {
                /*
                  <Link
                    to={'/s/about-us'}
                    className={'button color-logo'}
                    onClick={event => Tracking('noid', 'Como funciona', `Como funciona?`) }  
                  >
                    Como funciona?
                  </Link>                    
                */
              }
              <br/>
              {
                viewsearch === ''? 
                (
                  <img src={background}  alt="EasyTools Logo" className="background-tools"/>
                )
                :
                ('')
              }
            </div>
          </div>
        </div>
        {
          viewsearch === ''? 
          (
            <div className="container howwork">
              <p className="title-index has-text-centered">Como alugar na EasyTools?</p>
              <div className="columns has-text-centered">
                <div className="column">
                  <ul className="ul-howwork">
                    <li className="title-ul-how"> <FontAwesomeIcon icon={['fas', 'mouse-pointer']} className="icon-index" size="2x"/> Escolha o que deseja alugar.</li>
                    <li>
                      Acesse sua conta e escolha o equipamento desejado. Furadeira, Extratora, Wap. Temos tudo que você precisa.
                      Aluguel na hora, sem demora e sem burocracia. Adeus orçamento!
                    </li>
                  </ul>
                </div>
                <div className="column">
                  <ul className="ul-howwork">
                    <li className="title-ul-how"><FontAwesomeIcon icon={['fas', 'calendar-alt']} className="icon-index" size="2x"/> Selecione o período de uso.</li>
                    <li>
                      Escolha o período que deseja usar o alugado. Os períodos são: diária
                      , semanal, quinzenal e mensal. Finalize o seu pedido. E espere pelo retorno da Easytools sobre o aluguel. (5Min)
                    </li>
                  </ul>
                </div>
                <div className="column">
                  <ul className="ul-howwork">
                    <li className="title-ul-how"><FontAwesomeIcon icon={['fas', 'truck-loading']} className="icon-index" size="2x"/> Receba em casa.</li>
                    <li>
                      Depois do pedido aceito, acesse meus alugados e pague o aluguel. Pagamento confirmado, preparamos o equipamento e 
                      enviamos até você.
                      Também buscamos! 
                    </li>
                  </ul>
                </div>
              </div>
            </div>  
          )
          :
          ('')
        }

        <div className="container">
          {
            viewsearch === ''? 
            (
              <h3 className="title-index">O que você precisa alugar?</h3>
            )
            :
            (
              <h3 className="title-index">O que encontramos próximo a você.</h3>
            )
          }
          {
            viewsearch === '' ? 
            (
              <>
                {  
                /*
                  <div>
                    <div className="columns is-mobile">
                      <div className="column">
                        <div className="box-img has-text-centered">
                          <img src={ bricolagem } alt="Bricolagem" className="img-option"/>
                        <p className="text-options">Casa</p>
                        </div>
                      </div>
                      <div className="column">
                        <div className="box-img has-text-centered">
                          <img src={ limpeza } alt="Limpeza" className="img-option"/>
                          <p className="text-options">Bricolagem</p>
                        </div>
                      </div>
                      <div className="column">
                        <div className="box-img has-text-centered">
                          <img src={ limpeza } alt="Limpeza" className="img-option"/>
                          <p className="text-options">Marcenaria</p>
                        </div>
                      </div>
                      <div className="column">
                        <div className="box-img has-text-centered">
                          <img src={ construcao } alt="Construção" className="img-option"/>
                          <p className="text-options">Construção</p>
                        </div>
                      </div>
                      <div className="column">
                        <div className="box-img has-text-centered">
                          <img src={ limpeza } alt="Limpeza" className="img-option"/>
                          <p className="text-options">Limpeza</p>
                        </div>
                      </div>
                      <div className="column">
                        <div className="box-img has-text-centered">
                          <img src={ estrutura } alt="Estruturas" className="img-option"/>
                          <p className="text-options">Estruturas</p>
                        </div>
                      </div>
                    </div>
                    <br/><br/><br/>
                </div>*/
                }
              </>
            )
            :
            (
              <></>
            )
          }
          <div className="columns is-desktop is-mobile is-multiline">
            {
              tools.map(tool => (
                <div key={tool.id} className="column column-cs-mobile is-one-quarter line-tools">
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
                                (
                                  ''
                                )
                              }
                            </span>
                          ))
                        }
                      </div>                         
                      <b className="category">{tool.category}</b>
                      <div className="div-t">
                        <p className="title-tool">{tool.title}</p>
                        <p className="text-price">Diária a partir de <span className="price">R$ { tool.prices.split(';')[0] }</span></p>
                        <div>
                          {
                            viewsearch !== '' ?
                            (
                              <button 
                                type={'button'}
                                className={'button is-fullwidth is-default rent-viewsearch'}
                              >
                              Alugar
                              </button>
  
                            )
                            :
                            ('')
                          }
                        </div>
                        <div className="box-km">
                          <div className="columns box-delivery">
                            {
                              /*
                                <div className="column is-2">
                                  <div className="logo-enterprise">
                                    <img src={logo2}  alt="EasyTools Logo" className=""/>
                                  </div> 
                                </div>                              
                              */
                            }
                            {
                              /*
                                <div className="column">
                                  <span className="km"> { tool.distance.toFixed(1).replace(/\./gi,',').replace(/,/gi,',') } km de você. </span>
                                  <br/>
                                  <div className="delivery-index">Entrega R$ 15,00 | 2 Horas</div>
                                </div>                              
                              */
                            }
                            {
                              /*
                                <div className="column">
                                  <span className="promo">Desconto entrega</span>
                                  <div className="delivery-index">Entrega R$ 15,00 | 2h | Curitiba e região.</div>
                                </div>
                              */
                            }
                          </div>
                        </div>
                      </div>
                    </div>
                    {
                      tool.prices.split(';')[3].trim() === '0,00'? 
                      (
                        <>
                          <p className="soon">Em breve!</p>
                        </>
                      )
                      :
                      ('')

                    }
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

        <br/><br/>
        <br/><br/>
        <div className="has-text-centered">
          <div className="columns">
            <div className="column">
              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLSfRH_Gi5cIoSdaaUxdT8KN0t9eQ3kOcRloiIJJkrnkkweOQmA/viewform" 
                target="_blank"
                className={'button is-black'}
              >
                O que você precisa e não achou aqui?
              </a>
            </div>
          </div>
        </div>
        <div className="neighboor-div">
          <div className="container">
  
            <p className="title-index tl-neigh-cs">Ganhe dinheiro com suas ferramentas paradas!</p>
            <p className="text-neigh-cs">
              Seja um vizinho na EasyTools. Use suas ferramentas paradas para ganhar um dinheiro extra. Clique em quero ser um vizinho e que nós entraremos em contato.
            </p>
            <div className="columns">
              <div className="column">
                <a
                  href="https://docs.google.com/forms/d/e/1FAIpQLSfRH_Gi5cIoSdaaUxdT8KN0t9eQ3kOcRloiIJJkrnkkweOQmA/viewform" 
                  target="_blank"
                  className={'button is-default'}
                >
                  Renda extra
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <br/><br/>
      <div className="slider-comment">
      <div className="container">
        <p className="has-text-centered title-slick">O que falam da Easy</p>
        <Slider {...settings}>
          <div className="has-text-centered">
            <p className="client">Mara</p>
            <h3 className="message-client">"Fácil de usar, pedi e chegou rapidinho em casa."</h3>
          </div>
          <div className="has-text-centered">
            <p className="client">Gastão</p>
            <h3 className="message-client">"Parabéns pela projeto, muito útil hoje em dia."</h3>
          </div>
          <div className="has-text-centered">
            <p className="client">Ederson</p>
            <h3 className="message-client">"Deu tudo certo, fui muito bem atendido pelo pessoal da EasyTools."</h3>
          </div>
          <div className="has-text-centered">
            <p className="client">Fabiano</p>
            <h3 className="message-client">"Locadoras convencionais não locam para pessoas comuns, a EasyTools sim."</h3>
          </div>
        </Slider>
      </div>
    </div>
    </>
  )
}

export default Dashboard;