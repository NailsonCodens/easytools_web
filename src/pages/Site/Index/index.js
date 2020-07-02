import React, { useState, useEffect } from 'react';
import api from '../../../services/api';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import queryString from 'query-string';
import Scroll from '../../../utils/scroll';
import Title from '../../../utils/title';
import desert2 from '../../../assets/images/desert2.svg'
import './style.css';
import Scrool from '../../../utils/scroll';
import {Viewsearch} from '../../../store/actions/viewsearch';
import logo from '../../../assets/images/easytools_yellow.png'
import lixadeira from '../../../assets/images/lixadeira.jpg'; 
import furadeira from '../../../assets/images/furadeira.jpg'; 
import martelete from '../../../assets/images/martelete.jpg'; 
import rocadeira from '../../../assets/images/rocadeira.jpg';
import wap from '../../../assets/images/wap.jpg';
import extratora from '../../../assets/images/extratora.jpg'; 
import gardening from '../../../assets/images/gardening.jpg';
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
import { getCordinates, getAddress } from '../../../services/mapbox';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import "../../../../node_modules/slick-carousel/slick/slick.css"; 
import "../../../../node_modules/slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import {Latitude} from '../../../store/actions/latitude';
import {Longitude} from '../../../store/actions/longitude';
import {Distance} from '../../../store/actions/distance';
import { faMapMarkerAlt, faTruckLoading, faCalendarAlt, faMapPin, faMousePointer} from '@fortawesome/free-solid-svg-icons'
import { isMobile } from 'react-device-detect';
library.add(faMapMarkerAlt, faTruckLoading, faCalendarAlt, faMousePointer, faMapPin);

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
    Scrool()
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
      console.log(res.data.features)

      //className
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
        Scroll(0,0)
        dispatch(Latitude(position.coords.latitude))
        dispatch(Longitude(position.coords.longitude))

        localStorage.setItem('@lt', position.coords.latitude);
        localStorage.setItem('@lg', position.coords.longitude);

        getAddress(position.coords.longitude, position.coords.latitude).then(res => {
          var city = res.data.features[1].text

          const getCity = res.data.features.find(city => city.id.includes('place'));

          city = getCity.text.replace(/\s+/g, '-').toLowerCase();
          Scroll(-10,-10)

          history.push(`/s/search/all/equipaments/${city}`)
        })

        //findToolsM(position.coords.latitude, position.coords.longitude)
      },
			erroget => {
				error()
			},{ enableHighAccuracy: true });
		}
  }

  const selectPlace = (place) => {
    var city = place.context[0].text

    const getCity = place.context.find(city => city.id.includes('place'));

    city = getCity.text.replace(/\s+/g, '-').toLowerCase();

    console.log(city)

    Scroll(0,0)

    dispatch(Latitude(place.center[1]))
    dispatch(Longitude(place.center[0]))

    localStorage.setItem('@lt', place.center[1]);
    localStorage.setItem('@lg', place.center[0]);

    history.push(`/s/search/all/equipaments/${city}`)
    /*
    findToolsM(place.center[1], place.center[0])
    setMyaddress(place.place_name)
		setPlaces(false)*/
  }

  const goProduct = (category) => {
    Scrool(0,0)
    //all/equipaments/campina-grande-do-sul
//    history.push(`/s/search/${category}/${title}/region`);

    history.push('/s/search/' + category + '/equipaments/region') 
  }

  const goUsed = (prod) => {
    console.log(prod)
    Scrool(0,0)
    history.push('/s/search/all/' + prod + '/region') 
  }

  return (
    <>
      <Helmet>
        <title>Aluguel on-line de equipamentos e ferramentas! | EasyTools</title>
        <meta name="description" content="EasyTools, Alugue ferramentas fácil e equipamentos que voc&ecirc; e seu neg&oacute;cio precisam! Precisou furar uma parede, consertar o guarda-roupa e não tem a ferramenta necessária? Alugue na EasyTools."/> 
        <meta name="keywords" content="Ferramenta fácil, Aluguel, Roçadeira, Aluguel Roçadeira, Aluguel de equipamentos em Curitiba, ALuguel de lixadeira, aluguel de extratora, limpa sofá curitiba, alugar furadeira, alugar aspirador, alugar martelete, Aluguel equipamento curitiba, Aluguel motossera, Aluguel extratora, aluguel limpadora de sofá, aluguel de ferramentas, furadeira, app d ealuguel, aplicativo de aluguel de ferramentas,  Aluguel Online, Aluguel On-line, Aluguel furdeira, aluguel aspirador de pó, aluguel ferramenta, equipamento, betoneira, aluguel de equipamento online, locação, construção civil, extratora de sujeira, limpeza de sofá, locação curitiba, locacao curitiba, aluguel de ferramentas, aluguel de equipamentos, aluguel, alugar objetos, alugar produtos, allugator, olx, locação, classificados, alugar, grátis, anuncie, anúncios, alugue, equipamentos, construção, como ganhar uma renda extra,  aluguel compartilhado,  o que alugar para ganhar dinheiro,  aluguel de objetos,  aluguel de produtos,  olx aluguel, olx, alooga, allugator, easyrental."/> 
        <meta name="robots" content=""/> 
        <meta name="revisit-after" content="1 day"/> <meta name="language" content="Portuguese"/>
        <meta charset="utf-8"/>
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
              </div>            
                {
                  /*
                    <p className="text-subtitle-index">Alugou, Chegou!🔧</p>                      
                  */
                }
              <br/>
              <p className="title-search-geolo">Precisou de uma furadeira? Encontre e alugue aqui!</p>
                <div className="container container-new">
                  <div className="columns ">
                    <div className="column  bt-ad">
                      <input 
                        type="text" 
                        placeholder='Procure ferramentas perto do seu endereço.' 
                        className="input input-geolocalization" 
                        onChange={event => handleMyaddress(event)}
                        value={myaddress}
                      />
                    </div>
{
  /*
                    <div className="column is-1-desktop bt-ad bt-ad-geo">
                      <button 
                        type={'button'}
                        className={'button is-fullwidth is-default geolo-bt'}
                        title="Sua localização"
                        onClick={event => Geoloc()}
                      >
                        <b>Próx de mim</b>
                      </button>
                    </div>
  
  */
}

                  </div>
                  <div className="container-fluid">
                    <div className="explanation_box">
                      <h2 className="minutesrent">Alugue em 15 minutos, <br/> receba em até 2 horas!</h2>
                      <p class="without">Sem consultas, sem burocracias, sem 24 horas para aprovação.</p>
                      <br/>
                      {
                        /*
                          <a
                            el ="noreferrer"
                            href="https://docs.google.com/forms/d/e/1FAIpQLSfRH_Gi5cIoSdaaUxdT8KN0t9eQ3kOcRloiIJJkrnkkweOQmA/viewform" 
                            target="_blank"
                            className={'button is-black'}
                          >
                            Como alugar?
                          </a> 
                        */
                      }
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
                /*
                viewsearch === ''? 
                (
                  <img src={background}  alt="EasyTools Logo" className="background-tools"/>
                )
                :
                ('')*/
              }
            </div>
          </div>
        </div>
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
          <div className={ isMobile === true ? 'table-container' : '' }>
            <div className="columns is-multiple is-desktop is-mobile">
              <div className="column is-8-mobile box-categories has-text-centered construction" onClick={event => goProduct('construcao')}>
                <p className="categories-names">Construção</p>
              </div>
              <div className="column is-8-mobile box-categories has-text-centered cleaner" onClick={event => goProduct('limpeza')}>
                <p className="categories-names">Limpeza</p>
              </div>
              <div className="column is-8-mobile box-categories has-text-centered gardening" onClick={event => goProduct('jardinagem')}>
                <p className="categories-names">Jardinagem</p>
              </div>
              <div className="column is-8-mobile box-categories has-text-centered bricolagem" onClick={event => goProduct('bricolagem')}>
                <p className="categories-names">Faça você</p>
              </div>
            </div>
          </div>
          <br/>
        </div>
        <br/><br/>
        <div className="container">
          <p className="title-index"> Os mais alugados do mês</p>
          <div className={isMobile === true ? 'table-container' : ''}>
            <div className="columns is-mobile is-desktop">
              <div className="column is-7-mobile has-text-centered prodused" onClick={event => goUsed('extratora')}>
                <img src={extratora}  alt="EasyTools Logo" className=""/>
                <p>Extratora</p>
              </div>
              <div className="column is-7-mobile has-text-centered prodused" onClick={event => goUsed('lavadora')}>
              <img src={wap}  alt="EasyTools Logo" className=""/>
              <p>Lavadora de alta pressão</p>
              </div>
              <div className="column is-7-mobile has-text-centered prodused" onClick={event => goUsed('lixadeira')}>
                <img src={lixadeira}  alt="EasyTools Logo" className=""/>
              <p>Lixadeira Orbital</p>
              </div>
              <div className="column is-7-mobile has-text-centered prodused" onClick={event => goUsed('furadeira')}>
                <img src={furadeira}  alt="EasyTools Logo" className=""/>
                <p>Furadeira de Impacto</p>
              </div>
              <div className="column is-7-mobile has-text-centered prodused" onClick={event => goUsed('martelete')}>
                <img src={martelete}  alt="EasyTools Logo" className=""/>
                <p>Martelete</p>
              </div>
            </div>
          </div>
        </div>
        <br/><br/>
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
                      Escolha o que deseja alugar.
                      Acesse sua conta e escolha o equipamento desejado: furadeira, extratora, Wap... Temos tudo que você precisa. Aluguel na hora, sem demora e sem burocracia. Adeus orçamento!
                    </li>
                  </ul>
                </div>
                <div className="column">
                  <ul className="ul-howwork">
                    <li className="title-ul-how"><FontAwesomeIcon icon={['fas', 'calendar-alt']} className="icon-index" size="2x"/> Selecione o período de uso.</li>
                    <li>
                      Selecione o período de uso.
                      Escolha o período que deseja usar o item alugado. Os períodos são: diária, semanal, quinzenal e mensal. Finalize o seu pedido e espere pelo retorno da EasyTools sobre o aluguel (em média 5 min).
                    </li>
                  </ul>
                </div>
                <div className="column">
                  <ul className="ul-howwork">
                    <li className="title-ul-how"><FontAwesomeIcon icon={['fas', 'truck-loading']} className="icon-index" size="2x"/> Receba em casa.</li>
                    <li>
                      Depois do pedido aceito, acesse "Meus alugados" e pague o aluguel. Pagamento confirmado, preparamos o equipamento e levamos até você. Também buscamos!
                    </li>
                  </ul>
                </div>
              </div>
            </div>  
          )
          :
          ('')
        }
        <br/><br/>
        <div className="has-text-centered">
          <div className="columns">
            <div className="column">
              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLSfRH_Gi5cIoSdaaUxdT8KN0t9eQ3kOcRloiIJJkrnkkweOQmA/viewform" 
                target="_blank"
                rel="noreferrer"
                className={'button is-black'}
              >
                Do que você precisa, e não achou por aqui?
              </a>
            </div>
          </div>
        </div>
        <div className="neighboor-div">
          <div className="container">
  
            <p className="title-index tl-neigh-cs">Ganhe dinheiro com suas ferramentas paradas!</p>
            <p className="text-neigh-cs">
             Seja um vizinho na EasyTools. Use suas ferramentas paradas para ganhar um dinheiro extra. Clique em "Ser vizinho na EasyTool" e nós entraremos em contato.
            </p>
            <div className="columns">
              <div className="column">
                <a
                  rel ="noreferrer"
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