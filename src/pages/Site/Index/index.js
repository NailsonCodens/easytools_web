import React, { useState, useEffect } from 'react';
import api from '../../../services/api';
import ReactDOM from "react-dom";
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import queryString from 'query-string';
import Scroll from '../../../utils/scroll';
import { logout } from '../../../services/auth';
import Title from '../../../utils/title';
import desert2 from '../../../assets/images/desert2.svg'
import './style.css';
import Scrool from '../../../utils/scroll';
import * as Yup from 'yup';
import InputMask from 'react-input-mask';
import { useFormik } from 'formik';
import { Span } from '../../../components/Span';
import promoeasy from '../../../assets/images/promoeasy.jpg';
import cashback from '../../../assets/images/cashback.jpg';
import {Viewsearch} from '../../../store/actions/viewsearch';
import logo from '../../../assets/images/easytools_yellow.png'
import lixadeira from '../../../assets/images/lixadeira.jpg'; 
import Modal from '../../../components/Modal';
import furadeira from '../../../assets/images/furadeira.jpg'; 
import martelete from '../../../assets/images/martelete.jpg'; 
import roçadeira from '../../../assets/images/roçadeira.jpg';
import nylon from '../../../assets/images/nylon.jpg';
import esmerilhadeira from '../../../assets/images/esmerilhadeira.jpg';
import plaina from '../../../assets/images/plaina.jpg';
import ticotico from '../../../assets/images/ticotico.jpg';
import aspirador from '../../../assets/images/aspirador.jpg';
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
import ScrollableAnchor from 'react-scrollable-anchor'
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
import { Label } from '../../../components/Form/Form';
import {Latitude} from '../../../store/actions/latitude';
import {Longitude} from '../../../store/actions/longitude';
import {Distance} from '../../../store/actions/distance';
import { Field } from '../../../components/Form/Form';
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
	const current_user = useSelector(state => state.auth);
  const paramsearch = queryString.parse(useLocation().search).search;
  const [tools, setTools] = useState([]);
  const [modal, setModal] = useState(false);
  const [promo, setPromo] = useState(false);
  const [places, setPlaces] = useState([]);
  const [view, setView] = useState([]);
  const [myaddress, setMyaddress] = useState('');
	const search = useSelector(state => state.search);
	const latitude = useSelector(state => state.latitude);
  const longitude = useSelector(state => state.longitude);
  const distance = useSelector(state => state.distance);
	const [terms, setTerms] = useState([]);
	const [perfil, setPerfil] = useState([]);
  const [phone, setPhone] = useState('');
  const [erroPhone, seterroPhone] = useState('');

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

   async function loadPerfil() { 
    const response = await api.get(`/perfil`, {
    });
    setPerfil(response.data.user[0])
  }
  loadPerfil();


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

  const handleChangePhone = (input, event) => {
    setPhone(event.target.value)
    formikphone.values.phone = event.target.value
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
  
  const hideTerms = () => {
    setTerms(false)
    return terms
  }


  const formikphone = useFormik({
    initialValues: {
      phone: '',
      terms: '',
		},

		validationSchema: Yup.object({
      phone: Yup.string()
        .required('Por favor, insira seu número de celular para que possamos entrar em contato com você caso seja necessário.'),
    }),

	});

  const NoAcceptedTerms = () => {
		logout()
		Scrool(0,0);
		setTerms(false);
		setModal(false);
    history.push("/");
  }

  async function AcceptedTerms () {
		if (phone === '') {
			seterroPhone(true)
		}else{
			var userupdate = {
				terms: 'Y',
				phone: phone
			}
	
			Scrool(0,0)
			//info()
			api.put(`perfil/update/${current_user.id}`, userupdate, {})
			.then((res) => {
				setTerms(false);
			})
			.catch((err) => {
				console.log(err)
			})
		}
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

  const clickMap = () =>{
    window.location.href = "#"+"atuation";
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
    { 
      <Helmet>
        <title>Aluguel delivery de equipamentos e ferramentas! | EasyTools</title>
        <meta name="description" content="EasyTools, Alugue com facilidade, ferramentas e equipamentos que voc&ecirc; e seu neg&oacute;cio precisam! Precisou furar uma parede, consertar o guarda-roupa e não tem a ferramenta necessária? Alugue na EasyTools."/> 
        <meta name="keywords" content="Ferramenta fácil, Aluguel, Roçadeira, Aluguel Roçadeira, Aluguel de equipamentos em Curitiba, ALuguel de lixadeira, aluguel de extratora, limpa sofá curitiba, alugar furadeira, alugar aspirador, alugar martelete, Aluguel equipamento curitiba, Aluguel motossera, Aluguel extratora, aluguel limpadora de sofá, aluguel de ferramentas, furadeira, app d ealuguel, aplicativo de aluguel de ferramentas,  Aluguel Online, Aluguel On-line, Aluguel furdeira, aluguel aspirador de pó, aluguel ferramenta, equipamento, betoneira, aluguel de equipamento online, locação, construção civil, extratora de sujeira, limpeza de sofá, locação curitiba, locacao curitiba, aluguel de ferramentas, aluguel de equipamentos, aluguel, alugar objetos, alugar produtos, allugator, olx, locação, classificados, alugar, grátis, anuncie, anúncios, alugue, equipamentos, construção, como ganhar uma renda extra,  aluguel compartilhado,  o que alugar para ganhar dinheiro,  aluguel de objetos,  aluguel de produtos,  olx aluguel, olx, alooga, allugator, easyrental."/> 
        <meta name="robots" content=""/> 
        <meta name="revisit-after" content="1 day"/> <meta name="language" content="Portuguese"/>
      </Helmet>
    }
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
                    delay: 60,
                    deleteSpeed: 20
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
              {
                /*
                <p className="title-search-geolo">Precisou de ferramentas ou equipamentos? Encontre e alugue aqui!</p>                
                */
              }
                <div className="container container-new">
                  <div className="columns ">
                    <div className="column  bt-ad">
                      {
                        /*
                          <input 
                            type="text" 
                            placeholder="Digite o nome da sua rua..."
                            className="input input-geolocalization" 
                            onChange={event => handleMyaddress(event)}
                            value={myaddress}
                          />
                        */
                      }
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
              <div className="container">
                <div className="explanation_box">
                  <div className="columns">
                    <div className="column">
                      <h2 className="minutesrent">Use ferramentas e só pague pelo tempo que usar!</h2>
                      <p className="without">Sem burocracias, alugue em 5 minutos e receba em até 2 horas.</p>
                      <br/>
                    </div>
                    <div className="column">
                      imagem da easy
                    </div>
                  </div>
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
                <br/>
                <Link
                  to={'/s/about-us'}
                  className={'button is-info padding-bt'}
                  onClick={event => Tracking('noid', 'Como funciona', `Como funciona?`) }  
                >
                  Como funciona
                </Link>    
                <button
                  className={'button is-info padding-bt'}
                  onClick={event => {
                    Tracking('noid', 'Aréa de atuação', `Aréa de atuação`);
                    clickMap() }
                  }  
                >
                  Veja nossa área de atuação
                </button>    
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
        {
          promo === true  ?
          (
            <>
              <div className="container">
                <img src={cashback}  alt="Promo20 Logo" className="cashback"/>
              </div>
              <br/>        

            </>
          )
          :
          (
            <>
            </>
          )
        }
        <br/><br/>
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
          <br/><br/>
          <div className="has-text-centered">
            <a className={`button is-info`} href="https://easytoolsapp.com/s/search/all/equipaments/region">
              Ver todas ferramentas e equipamentos
            </a>
          </div>
          <br/>
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
                {
                  isMobile ? 
                  (
                    <>
                      Não encontrou?
                    </>
                  )
                  :
                  (
                    <>
                      Do que você precisa, e não achou por aqui?
                    </>
                  )
                }
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
      <div className="container">
      <p className="title-index has-text-centered"> Os mais alugados do mês </p>
        <div className={isMobile === true ? 'table-container' : ''}>
          <div className={ isMobile === true ? "columns is-desktop is-mobile": "columns is-desktop is-mobile is-multiline"}>
          <div className="column column-cs-mobile is-7-mobile is-one-fifth-desktop has-text-centered line-tools prodused" onClick={event => goUsed('roçadeira')}>
            <img src={nylon}  alt="EasyTools Logo" className=""/>
              <p>Roçadeira nylon</p>
          </div>
          <div className="column column-cs-mobile is-7-mobile is-one-fifth-desktop has-text-centered line-tools prodused" onClick={event => goUsed('Extratora')}>
              <img src={extratora}  alt="EasyTools Logo" className=""/>
              <p>Extratora</p>
          </div>
          <div className="column column-cs-mobile is-7-mobile is-one-fifth-desktop has-text-centered line-tools prodused" onClick={event => goUsed('wap')}>
            <img src={wap}  alt="EasyTools Logo" className=""/>
            <p>Lavadora de alta pressão</p>
          </div>
          <div className="column column-cs-mobile is-7-mobile is-one-fifth-desktop has-text-centered line-tools prodused" onClick={event => goUsed('lixadeira')}>
            <img src={lixadeira}  alt="EasyTools Logo" className=""/>
            <p>Lixadeira Orbital</p>
          </div>
          <div className="column column-cs-mobile is-7-mobile is-one-fifth-desktop has-text-centered line-tools prodused" onClick={event => goUsed('furadeira')}>
              <img src={furadeira}  alt="EasyTools Logo" className=""/>
              <p>Furadeira de Impacto</p>
          </div>
          <div className="column column-cs-mobile is-7-mobile is-one-fifth-desktop has-text-centered line-tools prodused" onClick={event => goUsed('roçadeira')}>
          <img src={roçadeira}  alt="EasyTools Logo" className=""/>
              <p>Roçadeira lâmina</p>
          </div>
          <div className="column column-cs-mobile is-7-mobile is-one-fifth-desktop has-text-centered line-tools prodused" onClick={event => goUsed('plaina')}>
          <img src={plaina}  alt="EasyTools Logo" className=""/>
              <p>Plaina</p>
          </div>
          <div className="column column-cs-mobile is-7-mobile is-one-fifth-desktop has-text-centered line-tools prodused" onClick={event => goUsed('esmerilhadeira')}>
          <img src={esmerilhadeira}  alt="EasyTools Logo" className=""/>
              <p>Esmerilhadeira</p>
          </div>
          <div className="column column-cs-mobile is-7-mobile is-one-fifth-desktop has-text-centered line-tools prodused" onClick={event => goUsed('tico')}>
          <img src={ticotico}  alt="EasyTools Logo" className=""/>
              <p>Tico tico</p>
          </div>
          <div className="column column-cs-mobile is-7-mobile is-one-fifth-desktop has-text-centered line-tools prodused" onClick={event => goUsed('aspirador de pó')}>
          <img src={aspirador}  alt="EasyTools Logo" className=""/>
              <p>aspirador de pó</p>
          </div>
        </div>        

        </div>
      </div>
      <br/><br/>
      <div className="container has-text-centered">
      <ScrollableAnchor id={'atuation'}>
        <div></div>
      </ScrollableAnchor>
        <p className="title-index has-text-centered">Conheça nossa área de atuação no Paraná?</p>
        <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d230539.1567424101!2d-49.3660441!3d-25.4658539!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xf0641216f68afbf6!2sEasyTools!5e0!3m2!1spt-BR!2sbr!4v1595343737440!5m2!1spt-BR!2sbr" width="100%" height="350" frameborder="0" allowfullscreen="" aria-hidden="false" tabindex="0"></iframe>
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
    {
      perfil.terms === null ? 
      (
        <>
          <Modal 
            show={terms} 
						onCloseModal={hideTerms}
						closeEscAllowed={false} 
						closeOnAllowed={false}
						showCloseIcon={false}
          >
            <h2 className="title">Termos de uso</h2>
            <div className="terms">
            <div className="container-full">
              Bem-vindo a Easytools!
              <br/><br/>
              Estes Termos de Uso regem seu uso na Easytools inscrita no Cadastro Nacional de Pessoas Jurídicas do Ministério da Fazenda (CNPJ/MF) 31.029.517/0001-37,  com sede na rua Pedro Baggio, n° 601, em Campina Grande do Sul, Araçatuba, Paraná, e fornecem informações sobre o Serviço da Easytools, descritos abaixo. Quando você cria uma conta em nosso website, aplicativo ou qualquer plataforma que seja de nossa autoria, você concorda com estes termos.
              <br/><br/>
              O Serviço Easytools Aluguel de equipamentos e ferramentas online, é um dos produtos da Easytools, fornecido a você. Estes Termos de Uso, por conseguinte, constituem um acordo entre você e a Easytools.
              <br/><br/>
              <b>POR FAVOR, LEIA COM ATENÇÃO ESTES TERMOS ANTES DE ACESSAR OU USAR OS SERVIÇOS.</b>
              <br/><br/>
              Ao acessar e usar os Serviços você concorda com os presentes termos e condições, que estabelecem o relacionamento contratual entre você, na qualidade de usuário(a), e a Easytools. Se você não concorda com estes Termos, você não pode acessar nem usar os Serviços. Mediante referido acesso e uso, estes Termos imediatamente encerram, substituem e superam todos os acordos, Termos e acertos anteriores entre você e qualquer Afiliada da Easytools. A Easytools poderá imediatamente encerrar estes Termos ou quaisquer Serviços em relação a você ou, de modo geral, deixar de oferecer ou negar acesso aos Serviços ou a qualquer parte deles, a qualquer momento e por qualquer motivo.
              <br/><br/>
              A Easytools poderá alterar os Termos relativos aos Serviços a qualquer momento. Aditamentos entrarão em vigor quando a Easytools fizer a postagem da versão atualizada dos Termos neste local ou das condições atualizadas ou Termos adicionais sobre o respectivo Serviço. O fato de você continuar a acessar ou usar os Serviços após essa postagem representa seu consentimento em vincular-se aos Termos alterados.
              <br/><br/>
              <p className="topics-terms">1. Os Serviços</p>
              Os Serviços integram uma plataforma de tecnologia que permite aos(às) Usuários(as) de aplicativos móveis ou sites de Internet da Easytools, fornecidos como parte dos Serviços, solicitar e programar serviços de aluguel de equipamentos e ferramentas.
              O serviço prestado a você, inclui diversas possibilidades. Nosso maior propósito é trazer facilidade e comodidade no aluguel de equipamentos e ferramentas de foma totalmente online mediante delivery. Quer seja para uso profissional ou uso pessoal.
              <br/><br/>
              <b><i>O serviço é composto pelas seguintes propostas:</i></b>
              <br/><br/>
              <b>Facilitar o aluguel de equipamentos e ferramentas necessárias para realizar qualquer empreendimento:</b>
              <br/>
              O mercado de aluguel de equipamentos e ferramentas existem a muito tempo, mas por ser tão antigo, também é muito arcaico e burocrático. Pensando nisso, a Easytools vem para facilitar o acesso a estes equipamentos para que de forma fácil, você possa consegui-los e usá-los de forma mais acessível e rápida. 
              Este serviço serve também para quem não tem a prática de alugar equipamentos e ferramentas, mas que em algum momento precisa realizar algo que dependa do mesmo, assim fornecendo a você a possibilidade de uso deste equipamento, através da economia colaborativa (“Aluguel”).
              <br/><br/>
              <b>Desburocratizar o aluguel de ferramentas e equipamentos:</b>
              <br/>
              Tecnologia serve para melhorar a vida de muitas pessoas. Nós temos como objetivo, trazer acessibilidade a este setor, trazer tecnologias e a capacidade de se locar um equipamento de forma simples e digital.
              <br/><br/>
              <b>Possibilidade de uso sem comprar:</b>
              <br/>
              Usar equipamentos e ferramentas através da economia colaborativa sem que vocẽ precisa gastar dinheiro comprando algo que não vai ser usado sempre. Contribuindo assim para um mundo mais coerente e sustentável.
              <br/><br/>
              <p className="topics-terms">2. Licença</p>

              Sujeito ao cumprimento destes Termos, a Easytools outorga a você uma licença limitada, não exclusiva, não passível de sub licença, revogável e não transferível para: (i) acesso e uso dos Aplicativos e Sites em seu dispositivo pessoal, exclusivamente para o seu uso dos Serviços; e (ii) acesso e uso de qualquer conteúdo, informação e material correlato que possa ser disponibilizado por meio dos Serviços, em cada caso, para seu uso pessoal, nunca comercial. Quaisquer direitos não expressamente outorgados por estes Termos são reservados à Easytools e suas afiliadas licenciadores.
              <br/><br/>

              <p className="topics-terms">3. Utilização da plataforma</p>
              3.1 Para acessar e usar a Plataforma da Easytools ou registrar uma conta na Easytools, é necessário que você seja um indivíduo com pelo menos 18 anos ou um negócio, organização ou outra entidade jurídica devidamente organizada e validamente existente em conformidade com as leis do país em que você está estabelecido, e que seja capaz de celebrar contratos vinculantes.
              <br/><br/>
              3.2 A Easytools pode tornar o acesso e o uso da Plataforma Easytools, ou certas áreas ou recursos da Plataforma Easytools sujeitos a determinadas condições ou exigências, como a conclusão de um processo de verificação, o atendimento a critérios de elegibilidade ou qualidade específicos, o atendimento de princípios de Avaliações ou Comentários, ou histórico de reserva e cancelamento de um Membro.
              <br/><br/>
              3.3 É difícil a verificação do Usuário na Internet, e não assumimos a responsabilidade pela confirmação de qualquer identidade de um Membro. Não obstante o disposto acima, para fins de transparência e prevenção de fraude, e conforme permitido pelas leis aplicáveis, nós podemos, mas não temos a obrigação de (i) solicitar aos Membros que forneçam alguma identificação oficial ou outras informações, ou realizem verificações adicionais para ajudar a verificar as identidades e os históricos de Membros, (ii) fazer uma amostragem de Membros comparada a bancos de dados de terceiros ou outras fontes e solicitar relatórios de prestadores de serviço, e (iii) quando tivermos informações suficientes para identificar um Membro, obter relatórios de registros públicos de condenações criminais ou registros de agressores sexuais ou uma versão equivalente de registros ou histórico do agressor sexual na jurisdição local (se disponível).
              <br/><br/>
              3.4 Caso você acesse ou faça download do Aplicativo da Apple App Store, você concorda com o Contrato de Licença de Usuário Final de Aplicativo Licenciado da Apple. Algumas partes da Plataforma Easytools executam os serviços de mapa do Google Maps/Earth, incluindo API(s) do Google Maps. O uso do Google Maps/Earth está sujeito aos Termos de Serviço Adicionais do Google Maps/Google Earth. Em caso de acesso pelo site, ao criar uma conta em nossas plataformas você aceita os usos e termos legais.
              <br/><br/>
              <p className="topics-terms">4. Uso dos serviços</p>

              <b><i>Conta de usuário</i></b>
              <br/><br/>
              Para utilizar grande parte dos Serviços, você deve registrar-se e manter uma conta pessoal de usuário de Serviços (“Conta”). Você deve ter pelo menos 18 anos para registrar uma Conta. O registro de Conta exige que a Easytools colete determinados dados pessoais, que podem incluir seu nome, endereço, número de telefone celular e data de nascimento, assim como pelo menos um método de pagamento válido (cartão de crédito ou parceiro de pagamento aceito pela Easytools). Você concorda em manter informações corretas, completas e atualizadas em sua Conta. Se você não mantiver informações corretas, completas e atualizadas em sua Conta, inclusive se o método de pagamento informado for inválido ou expirado, você poderá ficar impossibilitado(a) de acessar e usar os Serviços ou da Easytools poderá resolver estes Termos. Você é responsável por todas as atividades realizadas na sua Conta e concorda em manter sempre a segurança e confidencialidade do nome de usuário e senha da sua Conta. A menos que diversamente permitido pela Easytools por escrito, você poderá manter apenas uma Conta.
              <br/><br/>
              
              <b><i>Uso da plataforma</i></b> 
              <br/><br/>
              A plataforma é uma ambiente para anúncio e aluguel de equipamentos de ferramentas online. O intuito é facilitar e desburocratizar o setor de locação de equipamentos e ferramentas. Você como cliente poderá ser locatário(Parte que aluga o equipamento de outro), ou locador (Parte que disponibilizar seus equipamentos para outros). O aluguel de equipamentos é feito de forma online, e nós fazemos o delivery deste equipamento no local desejado por você, para que a entrega seja realizada, nós cobramos uma taxa de entrega com base na localidade e no km. Não temos lojas físicas por isso fica inviável ir buscar os equipamentos.
              Você pode locar quanto equipamentos e desejar, não temos limite. Após escolher e seguir os procedimentos de locação, você receberá a opção de pagamento para que possamos finalizar o processo de locação e entregar o equipamento escolhido no endereço desejado.
              <br/><br/>
              Pagamento feito, nós entregamos o equipamento e só buscaremos na data de devolução.
              <br/><br/>
              
              <b><i>Equipamentos e ferramentas</i></b>
              <br/><br/>
              Os equipamentos dos anúncios podem ser ou não de pfropriedade da Easytools. Alguns equipamentos são de empresas, e pessoas parceiras que queiram disponibilizar seus equipamentos e ferramentas. Consequentemente a entrega também fica a cargo do proprietário do equipamento, todos os parceiros são devidamente orientados e ensinados a realizar a entrega e a devolução da melhor maneira possível, tendo como foco a sua satisfação em nossos serviços.
              Os equipamentos e ferramentas são vistoriados, limpados e todos eles passam por manutenções preventivas para garantir que você possa usar o equipamento tranquilamente.
              <br/>
              O equipamento não pode ser modificado, alterado ou estragado por você. Qualquer coisa que possa acontecer com o equipamento no período do aluguel, será de responsabilidade sua.
              <br/><br/>
              <b><i>Entrega</i></b>
              <br/><br/>
              Após todo o processo de aluguel, nós nos comprometemos a entregar o equipamento alugado, em no máximo 2 horas, salvo em casos de problemas regionais e de trânsito e ou qualquer outra anormalidade no fluxo de entregas;
              Quando o equipamento for entre a você, teste o equipamento na frente do entregador. 
              Será feito também pela Easytools, um checkin do equipamento, garantindo que o equipamento foi entregue com a melhor qualidade possível e em pleno funcionamento.
              <br/><br/>
              <b><i>Devolução</i></b>
              <br/><br/>
              Você deve se programar para entregar o equipamento na data previamente acertada na locação do equipamento. A Easytools notificará a você por e-mail, telefone e notificações em nossa plataforma, 3 dias antes do dia da devolução. Cabe a você limpar e organizar o equipamento para ser devolvido. 
              No dia previamente acertado para devolução, A Easytools passará no endereço de entrega para buscar o equipamento.
              A Easytools fará um checkout do equipamento na sua frente para garantir que nada foi avariado. Em caso de avaria, você será notificado e o produto passará por uma análise profissional, em caso de diagnóstico positivo para mal uso, você deverá arcar com o conserto do equipamento ou em casos de perda total, você deverá arcar com o valor total do equipamento.
              <br/><br/>
              <b><i>Pagamento</i></b> 
              <br/><br/>
              Você entende que os serviços ou bens que você receber de um Parceiro Independente ou da Easytools, contratados por meio dos Serviços, poderão ser cobrados (“Preço”). Após você ter recebido serviços ou bens obtidos por meio do uso do Serviço, a Easytools facilitará o seu pagamento do respectivo Preço ao Parceiro Independente ou a Easytools, agindo na qualidade de agente limitado de cobrança do Parceiro Independente ou da Easytools. O pagamento do Preço feito dessa maneira será considerado pagamento feito diretamente por você ao Parceiro Independente ou para Easytools. O preço incluirá todos os tributos exigidos por lei. 
              O preço pago por você é final e não reembolsável, a menos que diversamente determinado pela Easytools. 
              O preço total é devido e deve ser pago imediatamente após a prestação do serviço ou entrega do bem pelo Parceiro Independente ou pela Easytools e o pagamento será facilitado pela Easytools mediante o método de pagamento indicado na sua Conta, após o que a Easytools enviará um recibo por e-mail. Se for verificado que o método de pagamento indicado na Conta expirou, é inválido ou não pode ser cobrado, você concorda que a Easytools poderá, na qualidade de agente limitado de cobrança do Parceiro Independente ou da Easytools, usar um método secundário de cobrança na Conta, se houver.
              <br/><br/>
              <b><i>Acesso à Rede e Equipamentos</i></b>
              <br/><br/>
              Você é responsável por obter o acesso a rede de dados necessário para usar os Serviços. As taxas e encargos de sua rede de dados e mensagens poderão se aplicar se você acessar ou usar os Serviços de um dispositivo sem fio e você será responsável por essas taxas e encargos. Você é responsável por adquirir e atualizar os equipamentos e dispositivos necessários para acessar e usar os Serviços e Aplicativos e quaisquer de suas atualizações. A Easytools NÃO GARANTE QUE OS SERVIÇOS, OU QUALQUER PARTE DELES, FUNCIONARÃO EM QUALQUER EQUIPAMENTO OU DISPOSITIVO EM PARTICULAR. Além disso, os Serviços poderão estar sujeitos a mau funcionamento e atrasos inerentes ao uso da Internet e de comunicações eletrônicas.
              <br/>
              Taxa de Reparos, avarias e perdas do equipamento.
              Você será responsável pelos custos de reparos a danos ou perdas de equipamentos de Parceiros Independentes e da Easytools resultantes do uso dos Serviços por meio da sua Conta que excedam os danos naturais decorrentes do uso (“Reparos ou perdas”). Caso um Parceiro Independente ou a Easytools relate a necessidade de Reparos ou recuperação do equipamento e essa solicitação seja confirmada pela Easytools, a critério razoável da Easytools, a Easytools reserva-se o direito de facilitar o pagamento desses Reparos ou perdas em nome do Parceiro Independente ou da Easytools usando o método de pagamento indicado em sua Conta. Será enviado a você um link para pagamento da reparos, avarias e perdas.
              <br/><br/>
              <p className="topics-terms">Recusa de Garantia</p>
              <br/><br/>
              OS SERVIÇOS SÃO PRESTADOS “NO ESTADO” E “COMO DISPONÍVEIS”. A EASYTOOLS  RECUSA TODAS AS DECLARAÇÕES E GARANTIAS, EXPRESSAS, IMPLÍCITAS OU LEGAIS, NÃO EXPRESSAMENTE CONTIDAS NESTES TERMOS, INCLUSIVE AS GARANTIAS IMPLÍCITAS DE COMERCIALIZAÇÃO, ADEQUAÇÃO A UMA FINALIDADE ESPECÍFICA E NÃO INFRINGÊNCIA. ADEMAIS, A EASYTOOLS NÃO FAZ NENHUMA DECLARAÇÃO NEM DÁ GARANTIA SOBRE A CONFIABILIDADE, PONTUALIDADE, QUALIDADE, ADEQUAÇÃO OU DISPONIBILIDADE DOS SERVIÇOS OU DE QUAISQUER SERVIÇOS OU BENS SOLICITADOS POR MEIO DO USO DOS SERVIÇOS, NEM QUE OS SERVIÇOS SERÃO ININTERRUPTOS OU LIVRES DE ERROS. A EASYTOOLS NÃO GARANTE A QUALIDADE, ADEQUAÇÃO, SEGURANÇA OU HABILIDADE DE PARCEIROS INDEPENDENTES. VOCÊ CONCORDA QUE TODO O RISCO DECORRENTE DO USO DOS SERVIÇOS E DE QUALQUER SERVIÇO OU BEM SOLICITADO POR MEIO DA TECNOLOGIA SERÁ SEMPRE SEU NA MÁXIMA MEDIDA PERMITIDA PELA LEI APLICÁVEL.
              <br/><br/>
              <p className="topics-terms">Limitação de Responsabilidade</p>
              A EASYTOOLS GARANTE A QUALIDADE DE , ATENDIMENTO, ENTREGA E DEVOLUÇÃO DOS EQUIPAMENTOS PERTINENTES A EASYTOOLS. NÃO GARANTIMOS A QUALIDADE DO EQUIPAMENTO DE PARCEIROS INDEPENDENTES QUE TENHAM SEUS EQUIPAMENTOS ANUNCIADOS NA EASYTOOLS. OS SERVIÇOS DA EASYTOOLS PODERÁ SER USADO POR VOCÊ PARA FACILITAR E PROGRAMAR SERVIÇOS DE LOCAÇÃO DE BENS MÓVEIS ATRAVÉS DA ECONOMIA COLABORATIVA COM ATIVOS DE EQUIPAMENTOS E FERRAMENTAS. VOCÊ CONCORDA QUE NÃO EASYTOOLS NÃO TEM RESPONSABILIDADE A VOCÊ EM RELAÇÃO A EQUIPAMENTOS E FERRAMENTAS DE PARCEIROS INDEPENDENTES, E QUE SÓ PODEMOS GARANTIR ESSA RESPONSABILIDADE COM EQUIPAMENTOS QUE SÃO PRÓPRIOS DA EASYTOOLS. TODOS OS PARCEIROS INDEPENDENTES SÃO ENSINADOS E INSTRUIDOS A ATENDER, CONVERSAR E A SERVIR OS CLIENTES DA MELHOR MANEIRA POSSÍVEL.
              <br/><br/>
              <p className="topics-terms">Avisos.</p>
            
              A Easytools poderá enviar avisos por meio de notificações gerais nos Serviços, correio eletrônico para seu endereço de e-mail em sua Conta, ou por comunicação escrita enviada ao endereço indicado em sua Conta. 
              <br/><br/>
              <p className="topics-terms">Disposições Gerais</p>
              Você não poderá ceder, nem tampouco transferir estes Termos, total ou parcialmente, sem prévia aprovação por escrito da Easytools. Você concorda que a Easytools ceda e transfira estes Termos, total ou parcialmente, inclusive: (i) para uma subsidiária ou afiliada; (ii) um adquirente das participações acionárias, negócios ou bens da Easytools; ou (iii) para um sucessor em razão de qualquer operação societária. Não existe joint-venture, sociedade, emprego ou relação de representação entre você, a Easytools ou quaisquer Parceiros Independentes como resultado do contrato entre você e a Easytools ou pelo uso dos Serviços.
              Caso qualquer disposição destes Termos seja tida como ilegal, inválida ou inexequível total ou parcialmente, por qualquer legislação, essa disposição ou parte dela será, naquela medida, considerada como não existente para os efeitos destes Termos, mas a legalidade, validade e exequibilidade das demais disposições contidas nestes Termos não serão afetadas. Nesse caso, as partes substituirão a disposição ilegal, inválida ou inexequível, ou parte dela, por outra que seja legal, válida e exequível e que, na máxima medida possível, tenha efeito similar à disposição tida como ilegal, inválida ou inexequível para fins de conteúdo e finalidade dos presentes Termos. Estes Termos constituem a totalidade do acordo e entendimento das partes sobre este assunto e substituem e prevalecem sobre todos os entendimentos e compromissos anteriores sobre este assunto. Nestes Termos, as palavras “inclusive” e “inclui” significam “incluindo, sem limitação”.
            </div>
            </div>
            <br/>
            <div className="">
							<Field className={'field'}>
								<Label for={'phone'}>
									Seu Celular
									<InputMask
										name="phone"
										type="text"
										mask="(99) 9 9999-9999" 
										maskChar=" "
										placeholder="(41) 9 9999-9999" 
										className={erroPhone === true ? 'input border-warning' : 'input'}
										onChange={event => handleChangePhone('phone', event)}
										value={phone}
									/>
									<Span className={'validation-warning'}>
										{
											erroPhone === true
										? 
											(<div>Por favor, insira seu número.</div>) 
										: 
											null
										}
									</Span>
									<p className="av-delivery">*Isto é importante para os nossos entregadores poderem se comunicar com você na hora de fazer a entrega do seu equipamento alugado.</p>
								</Label>
							</Field>
							<br/>
              <Button
                type={'input'}
                className={'button is-success accepted-bt'} 
                text={'Aceitar'}
                onClick={AcceptedTerms}
              />
              <Button
                type={'input'}
                className={'button is-default'} 
                text={'Não aceitar'}
                onClick={NoAcceptedTerms}
              />
            </div>
          </Modal>

        </>
      ):
      (
        <>
        </>
      )
    }
    </>
  )
}

export default Dashboard;