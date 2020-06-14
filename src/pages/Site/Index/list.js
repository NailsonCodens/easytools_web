import React, { useState, useEffect, useRef } from 'react'
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
import 'bulma-slider/dist/css/bulma-slider.min.css';
import Slider from 'react-input-slider';
import Scroll from '../../../utils/scroll';
import api from '../../../services/api';
import logo from '../../../assets/images/logo.png';
import useOutsideClick from "../../../utils/outsideclick";
import useOutsideClickCategory from "../../../utils/outsideclick";
import useOutsideClickEquipament from "../../../utils/outsideclick";
import useOutsideClickProd from "../../../utils/outsideclick";
import distance from '../../../store/reducers/distance';
import {IntlProvider, FormattedNumber} from 'react-intl';

library.add(faMapMarkedAlt, faStopwatch, faSearch);

const List = ({history}) => {
  const ref = useRef();
  const refcategory = useRef();
  const refequipament = useRef();
  const refprod = useRef();
  const dispatch = useDispatch();
  let {category, title, region } = useParams();

  const [state, setState] = useState({ x: 55});
  const [categorys, setCategory] = useState('');
  const [titlest, setTitlest] = useState(title);
  const [equipament, setEquipament] = useState('');
  const [prod, setProd] = useState('');
  const [myaddress, setMyaddress] = useState('');
  const [tools, setTools] = useState([]);
  const [places, setPlaces] = useState('');
  const [modal, setModal] = useState(false);
  const [showneighbor, setShowNeighboor] = useState(false);
  const [km, setKm] = useState(false);
  const [search, setSearch] = useState(titlest === 'equipaments' ? '' : titlest);
  const latitude = useSelector(state => state.latitude);
  const longitude = useSelector(state => state.longitude);
  const [setclass, setClass] = useState('box-filters');

  const hideRedirectlogin = () => {
    return modal
  }

  useOutsideClick(ref, () => {
    if (km) setKm(false);
  });

  useOutsideClickCategory(refcategory, () => {
    if (categorys) setCategory(false);
  });

  useOutsideClickEquipament(refequipament, () => {
    if (equipament) setEquipament(false);
  });

  useOutsideClickProd(refprod, () => {
   if (prod) setProd(false);  
  });

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
    
    async function showBottom () {
      //verificar mobile
      if (document.documentElement.scrollTop > 100) {
        setClass('box-filters')
      }else{
        setClass('box-filters')
      }
    }
    window.onscroll = () => showBottom()

    async function loadTools(lat = '', lng = '') {
      var lat = localStorage.getItem('@lt')
      var lng = localStorage.getItem('@lg')

      if (lat === null) {
        lat = ''
        lng = ''
      }

      var search = titlest.replace('-', ' ').toLowerCase();
      var search = search.replace('-', ' ').toLowerCase();

      var sh = search

      if (sh === 'equipaments') {
        sh = '';
      }

      var cat = category
      
      if (cat === 'all') {
        cat = '';
      }

      const response = await api.get(`/tools_site?search=${sh}&distance=${state.x}&lat=${lat}&lng=${lng}&type=&category=${cat}`, {
        headers: { search }
      });
      setTools(response.data.tools)
    }
    loadTools()    

    return () => {
      setTools('');  
    }
  }, []);

  const searchDistance = (event) => {
    find()
    setKm(false)
  }

  const searchTool = (event) => {
    setSearch(event.target.value)
  }

  const searchEquipaments = (event) => {
    find()
    setEquipament(false)
  }

  const handleChangeCategory = (category) => {
    setSearch('')
    setTitlest('equipaments')
    find(category.value)

    var lat = localStorage.getItem('@lt')
    var lng = localStorage.getItem('@lg')

    getAddress(lng, lat).then(res => {
      var city = ''
      const getCity = res.data.features.find(city => city.id.includes('place'));

      city = getCity.text.replace(/\s+/g, '-').toLowerCase();
      history.push(`/s/search/${category.value}/${'equipaments'}/${city}`)
    })
  }
    
  async function find(ctg = category) {
    var lat = localStorage.getItem('@lt')
    var lng = localStorage.getItem('@lg')

    var sh  = search
    if (sh === 'equipaments') {
      sh = ''
    }
    
    var sh = sh.replace('-', ' ').toLowerCase();
    var sh = sh.replace('-', ' ').toLowerCase();

    const response = await api.get(`/tools_site?search=${sh}&distance=${state.x}&lat=${lat}&lng=${lng}&type=&category=${ctg}`, {
      headers: { search }
    });
    setTools(response.data.tools)
  }

	const handleMyaddress = (event) => {
    let query = event.target.value
  
		setMyaddress(event.target.value)

		getCordinates(query).then(res => {
      setPlaces(res.data.features)
		})
  }  

  const renderDelivery = (km) => {
    var perkm = 1.60;
    var kmdelivery = parseFloat(km).toFixed(2);
    var delivery =  kmdelivery * perkm;

    var deliveryfinal = delivery.toFixed(2).replace(/\./gi,',').replace(/,/gi,',')

    return 'R$ ' + deliveryfinal
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

    find()
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
          var city = ''
          const getCity = res.data.features.find(city => city.id.includes('place'));
          city = getCity.text.replace(/\s+/g, '-').toLowerCase();
        })
          setModal(false);
          setMyaddress('')
          getAddress(position.coords.longitude, position.coords.latitude).then(res => {
            var city = ''
            const getCity = res.data.features.find(city => city.id.includes('place'));
            city = getCity.text.replace(/\s+/g, '-').toLowerCase();  
            find()
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

  const goPageTool = (id, category) => {
    window.open(`/s/tool/${id}?ctg=${category}`, '_blank');
  }

  return (
    <>
      <div className={setclass}>
        <div className="div-filters">
          <button className="button is-small is-outlined bt-filter cptalizze c" onClick={event => {setCategory(!categorys); setEquipament(false); setKm(false)}}>
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
          {
            categorys === true ? 
            (
              <div className="box-km" ref={refcategory}>
                <p className="title-box-options">Selecione a categoria</p>
                <br/>
                <Select
                  className={'select-list'}
                  options={[
                    {value: 'Construção', label: 'Construção'},
                    {value: 'Limpeza', label: 'Limpeza'},
                    {value: 'Jardinagem', label: 'Jardinagem'},
                    {value: 'Bricolagem', label: 'Bricolagem'}
                  ]}
                  isSearchable={true}
                  placeholder={'Selecione a categoria'}
                  onChange={selectedOption => {
                    handleChangeCategory(selectedOption);
                  }}
                  defaultValue={category}
                />
              </div>  
            )
            :
            (
              ''
            )
          }
          <button className="button is-outlined is-small bt-filter div-filters" onClick={event => {setKm(!km); setEquipament(false)}}>{ state.x } km</button>
          {
            km === true ? 
            (
              <div className="box-km" ref={ref}>
                <p className="title-box-options">Km a distância de você.</p>
                <br/>
                <span className="km-text">{state.x} km</span>
                <Slider
                  axis="x"
                  x={state.x}
                  onChange={({ x }) => setState(state => ({ ...state, x }))}
                />
                <br/><br/>
                <div className="is-pulled-right div-bt-box">
                  <button className="button color-logo" onClick={event => searchDistance(event)}>
                    Pesquisar
                  </button>                  
                </div>
              </div>  
            )
            :
            (
              ''
            )
          }

          <button className="button is-outlined is-small bt-filter cptalizze div-filters" onClick={event => setEquipament(!equipament)}>
            { 
              titlest.replace('-', ' ').toLowerCase() === 'equipaments' ?
              (
                'Pesquisar'
              )
              :
              (
                <>
                  {titlest.replace('-', ' ').toLowerCase()}
                </>
              )
            }
          </button>
          {
            equipament === true ? 
            (
              <div className="box-km" ref={refequipament}>
                <p className="title-box-options">Experimente furadeira</p>
                <br/>
                <input 
                  type="text" 
                  placeholder='Pesquise aqui.' 
                  className="input input-geolocalization" 
                  onChange={event => searchTool(event)}
                  value={search}
                />
                <br/>
                <div className="is-pulled-right div-bt-box">
                  <button className="button color-logo" onClick={event => searchEquipaments(event)}>
                    Pesquisar
                  </button>                  
                </div>
              </div>  
            )
            :
            (
              ''
            )
          }
          <button className="button is-info youareregion is-outlined is-small bt-filter cptalizze div-filters" onClick={event => openModal()}>
            {
              region === 'region' ? 
              (
                <>
                  Onde você está?
                </>
              )
              :
              (
                <>
                    <FontAwesomeIcon icon={['fas', 'map-marker-alt']} className="icon-tl" size="1x"/>
                  { region.replace('-', ' ') }
                </>
              )
            }
          </button>
        </div>
      </div>
      <div className="container-fluid-cs lt-box">
        <br/><br/>
        <div>
          {
            region !== 'region' ? 
            (
              <>
                <p className="title-tl-page">Ferramentas em { ' ' + region.replace('-', ' ')}
                </p>
              </>
            )
            :
            (
              <>
                <p className="title-tl-page">Ferramentas e equipamentos</p>
              </>
            )
          }
        </div>
        <p className="findyou"> <span>{ tools.length }</span> encontrados na categoria <span>{ 
        category === 'all' ? 
        ('Todos')
        :
        (<>{category}</>) 
        }</span> </p>
        <div className="columns is-desktop is-multiline">
          {
            tools.map((tool, index) => (
              <div className="column is-half line-tools" onClick={event => goPageTool(tool.id, tool.category)}>
                <div className="columns box-ads-lt" key={index}>
                  <div className="column is-4 has-text-left tool-list">
                    {
                      tool.picture.map((pic, index) => (
                        <>
                          {
                            index === 0 ? 
                            (
                              <>
                                <img src={pic.url} alt={pic.url} className=""/>
                              </>
                            )
                            :
                            (
                              <>
                              </>
                            ) 
                          }
                        </>
                      ))
                    }  
                  </div>
                  <div className="column is-9 box-text">
                    <div className="has-text-left text-list">
                      <p className="title-tl"> { tool.title } </p>
                      <p>
                        <span>
                          <img src={tool.user.url} alt="logo-easy" className="logo-tl"/>
                        </span> 
                        <span className="name-logo-tl">
                          {tool.user.name}
                        </span>
                      </p>
                      <p className="take-a-back">
                        Leva e Traz
                      </p>
                      <div className="text-infos-tl">
                        <span className="freight-tl tl-km">
                          <span>A</span> { tool.distance.toFixed(2) }<span> km de você </span> 
                        </span>
                        <span className="freight-tl ">
                          { renderDelivery(tool.distance.toFixed(2)) }
                            <span> Delivery</span>
                        </span>
                        <span className="freight-tl tl-hour">
                          <FontAwesomeIcon icon={['fas', 'stopwatch']} className="icon-tl" size="2x"/>
                          <span>2 horas</span>
                        </span>
                      </div>
                      <div className="columns box-values">
                        <div className="column">
                          <p className="money-tl is-pulled-left"> 
                            <IntlProvider locale="pt-br" timeZone="Brasil/São Paulo">
                              <b><FormattedNumber value={parseFloat(tool.prices.split(';')[0])} style="currency" currency="BRL" /></b>
                            </IntlProvider>
                            <span>/Diária</span>
                            <span className="box-values-prod" title="Outros valores" onClick={event => setProd(!prod+tool.id)}>
                              Períodos
                            </span> 
                            <div className="is-pulled-right box-rent">
                              <button className="button color-logo is-middle" title="Outros valores" onClick={event => setProd(!prod+tool.id)}>
                                Alugar
                              </button>
                            </div>
                            {
                              prod+tool.id === true ? 
                              (
                                <>
                                  <div className="box-vl-prod" ref={refprod}>
                                    sdasdas
                                  </div>                             
                                </>
                              )
                              :
                              (
                                <>
                                </>
                              )
                            }
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <hr className="borderline"></hr>
              </div> 
            ))
          }            
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
