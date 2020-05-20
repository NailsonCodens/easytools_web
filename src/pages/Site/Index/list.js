import React, { useState, useEffect } from 'react'
import Select from 'react-select';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faMapMarkedAlt, faStopwatch, faSearch } from '@fortawesome/free-solid-svg-icons'
import { useDispatch, useSelector } from "react-redux";
import Modal from '../../../components/Modal';
import {Latitude} from '../../../store/actions/latitude';
import {Longitude} from '../../../store/actions/longitude';
import {Distance} from '../../../store/actions/distance';
import Notificationtost from '../../../utils/notification';
import { getCordinates, getAddress, getGeolocalization } from '../../../services/mapbox';
import { useParams, useLocation } from "react-router-dom";
import Scroll from '../../../utils/scroll';
import api from '../../../services/api';
import logo from '../../../assets/images/logo.png';
library.add(faMapMarkedAlt, faStopwatch, faSearch);

const List = ({history}) => {
  const dispatch = useDispatch();
  let {category, title, region } = useParams();

  const [categorys, setCategory] = useState('');
  const [titlest, setTitlest] = useState(title);
  const [myaddress, setMyaddress] = useState('');
  const [tools, setTools] = useState('');
  const [places, setPlaces] = useState('');
  const [modal, setModal] = useState(false);
  const [showneighbor, setShowNeighboor] = useState(false);

  const latitude = useSelector(state => state.latitude);
  const longitude = useSelector(state => state.longitude);
  
  const hideRedirectlogin = () => {
    return modal
  }

  useEffect(() => {
    async function loadModal() {

      var lat = localStorage.getItem('@lt')
      var lng = localStorage.getItem('@lg')
      
      if (lat !== null) {
        getAddress(lng, lat).then(res => {
          var city = ''
          const getCity = res.data.features.find(city => city.id.includes('place'));
  
          city = getCity.text.replace(/\s+/g, '-').toLowerCase();
          history.push(`/s/search/${category}/${titlest}/${city}`)
        })
    
        setModal(false)
        setMyaddress('')
      } else {
        setModal(true)
      }
    }
    loadModal()

    async function loadTools(lat = '', lng = '') {
      var search = category;
      const response = await api.get(`/tools_site?search=${category}&distance=${''}&lat=${''}&lng=${''}&type=1`, {
        headers: { search }
      });
  
     setTools(response.data.tools)
    }
    loadTools()    

    return () => {
      setTools('');  
    }
  }, [])

	const handleMyaddress = (event) => {
    let query = event.target.value
  
		setMyaddress(event.target.value)

		getCordinates(query).then(res => {
      setPlaces(res.data.features)
		})
  }  

  const selectPlace = (place) => {

    var city = ''

    const getCity = place.context.find(city => city.id.includes('place'));

    if (getCity === undefined) {
      city = place.text.replace(/\s+/g, '-').toLowerCase();
    } else {
      city = getCity.text.replace(/\s+/g, '-').toLowerCase();
    }

    dispatch(Latitude(place.center[1]))
    dispatch(Longitude(place.center[0]))

    localStorage.setItem('@lt', place.center[1]);
    localStorage.setItem('@lg', place.center[0]);

    setMyaddress(place.place_name)

    history.push(`/s/search/${category}/${titlest}/${city}`)

    setPlaces(false)
    setModal(false)
    setMyaddress('')
  }

  const getGeolocalization = () => {
    navigator.geolocation.getCurrentPosition(
			position => {
        //Scroll(0,0)
        dispatch(Latitude(position.coords.latitude))
        dispatch(Longitude(position.coords.longitude))

        localStorage.setItem('@lt', position.coords.latitude);
        localStorage.setItem('@lg', position.coords.longitude);

        getAddress(position.coords.longitude, position.coords.latitude).then(res => {
          var city = res.data.features[1].text
          city = city.replace(/\s+/g, '-').toLowerCase();
                })
          setModal(false);
          setMyaddress('')
          getAddress(position.coords.longitude, position.coords.latitude).then(res => {
            var city = res.data.features[1].text
            city = city.replace(/\s+/g, '-').toLowerCase();
            history.push(`/s/search/${category}/${titlest}/${city}`)
          })
        //findToolsM(position.coords.latitude, position.coords.longitude)
      },
			erroget => {
				error()
			},{ enableHighAccuracy: true });
  }

  const openModal= () => {
    setModal(true)
    setShowNeighboor(true)
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

  return (
    <>
      <div className="box-filters">
        <div className="div-filters">
          <button className="button is-small is-outlined bt-filter cptalizze c">
            { 
              category === 'all' ? 
              (
                'Todos'
              )
              :
              (
                <>
                  { category }
                </>
              )
            }
          </button>
          <button className="button is-outlined is-small bt-filter div-filters">35Km</button>
          <button className="button is-outlined is-small bt-filter cptalizze div-filters">
            { 
              titlest.replace('-', ' ').toLowerCase() === 'equipaments' ?
              (
                'Equipamentos'
              )
              :
              (
                <>
                  {titlest.replace('-', ' ').toLowerCase()}
                </>
              )
            }
          </button>
          <button className="button is-info youareregion is-outlined is-small bt-filter cptalizze div-filters" onClick={event => openModal()}>
            {
              region === 'region' ? 
              (
                <>
                  Onde você está agora?
                </>
              )
              :
              (
                <>
                  Você está em { region.replace('-', ' ') }
                </>
              )
            }
          </button>
        </div>
      </div>
      <div className="container">
        <div className="columns">
          <div className="column">
            <div className="columns">
              <div className="column is-3 has-text-left tool-list">
                <img src={'https://www.casasbahia-imagens.com.br/Ferramentas/LavadorasdePressaoFerramentas/LavadoradePressaoFerramentas/7244/28087300/lavadora-de-alta-pressao-wap-bravo-1740-libras-7244.jpg'} alt="EasyTools Logo" className="t-list"/>
              </div>
              <div className="column is-8 box-text">
                <div className="has-text-left text-list">
                  <p className="title-tl"> Lavadora de Altapressão 127V </p>
                  <p className="accessories">Acessórios: Pista, Galão para espuma </p>
                  <p className="take-a-back">
                    Leva e Busca
                  </p>
                  <p className="tab-info">
                    <FontAwesomeIcon icon={['fas', 'map-marker-alt']} className="icon-tl" size="2x"/> 
                    <span>Curitiba</span>
                  </p>
                  <p className="tab-info">
                    <FontAwesomeIcon icon={['fas', 'stopwatch']} className="icon-tl" size="2x"/>
                    <span>Em até 2 horas</span>
                  </p>
                  <p>
                    <span>
                      <img src={logo} alt="logo-easy" className="logo-tl"/>
                    </span> 
                    <span className="name-logo-tl">
                      EasyTools
                    </span>
                  </p>
                  <div className="columns">
                    <div className="column">
                      <p className="money-tl"> R$ 50,00<span>/Diária</span></p>
                    </div>
                    <div className="column">
                      <div className="tab-info">
                        <p className="freight-tl">15<span> KM</span> R$ 20,00<span> Delivery</span></p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="column is-4">
              asdsd
          </div>
        </div>
      </div>
      <Modal 
        show={modal} 
        onCloseModal={hideRedirectlogin}
        closeEscAllowed={false} 
        closeOnAllowed={false}
      >
        <h3 className="has-text-centered title is-4">Onde você está?</h3>
        <br/>
        <div className="showneighboor">
            {
              region === 'region'?
              (
                'Adicione seu endereço para achar as ferramentas perto de você.'
              )
              :
              (
                <>
                  Você está em <span className="region-choose">{ region.replace('-', ' ') }</span>. Gostaría de mudar? 
                </>
              )
            }

        </div>
        <div className="field">
          <p className="control has-icons-left has-icons-right">
            <input 
              className="input" 
              type="text" 
              placeholder="Buscar endereço" 
              onChange={event => handleMyaddress(event)}
              value={myaddress}
            />
            <span className="icon is-small is-left">
              <FontAwesomeIcon icon={['fas', 'search']} className="icon-tl" size="2x"/>
            </span>
          </p>
        </div>
        {
          <div className="father-address address-list">
            <ul className="">
            {
              places.length > 0 ? 
              (
                <>
                  <div className="background-address bkad-tl">
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
        }
        <div className="field">
          <button className="button is-outlined is-fullwidth color-logo" onClick={event => getGeolocalization()}>
            <div className="is-pull-left">
              <FontAwesomeIcon icon={['fas', 'map-marker-alt']} className="icon-tl" size="2x"/> 
              Minha localização
            </div>
            </button>
        </div>
      </Modal>
    </>
  )
}

export default List
