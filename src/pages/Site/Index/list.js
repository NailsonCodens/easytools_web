import React, { useState } from 'react'
import Select from 'react-select';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faMapMarkedAlt, faStopwatch } from '@fortawesome/free-solid-svg-icons'
import { useSelector } from "react-redux";
import logo from '../../../assets/images/logo.png';
library.add(faMapMarkedAlt, faStopwatch);


const List = () => {
  const [categorys, setCategory] = useState('');
  
  const latitude = useSelector(state => state.latitude);
  const longitude = useSelector(state => state.longitude);
  
  console.log(latitude)
  console.log(longitude)

  const handleChangeCategory = (category) => {
    console.log('aa')
  }

  return (
    <>
      <div className="box-filters">
        <div className="columns is-mobile">
          <div className="column is-1-desktop is-4-mobile">
            <button className="button is-outlined bt-filter">Lavadora...</button>
            {
              /*
                <input className="input radius-b" type="text" placeholder="Experimente Furadeira"/>              
              */
            }
          </div>
          <div className="column is-1-desktop is-4-mobile">
            <button className="button is-outlined bt-filter">Categorias</button>
            {
              /*
                <Select
                  className={''}
                  options={[
                    {value: 'Construção', label: 'Construção'},
                    {value: 'Limpeza', label: 'Limpeza'},
                    {value: 'Jardinagem', label: 'Jardinagem'},
                    {value: 'Bricolagem', label: 'Bricolagem'}
                  ]}
                  isSearchable={true}
                  placeholder={'Selecione'}
                  onChange={selectedOption => {
                    handleChangeCategory(selectedOption);
                  }}
                  defaultValue={categorys}
                />              
              */
            }
          </div>
          <div className="column is-1-desktop is-2-mobile">
            <button className="button is-outlined bt-filter">Km</button>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="columns">
          <div className="column">
            <div className="columns">
              <div className="column is-3 has-text-left tool-list">
                <img src={'https://www.casasbahia-imagens.com.br/Ferramentas/LavadorasdePressaoFerramentas/LavadoradePressaoFerramentas/7244/28087300/lavadora-de-alta-pressao-wap-bravo-1740-libras-7244.jpg'} alt="EasyTools Logo" className=""/>
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
    </>
  )
}

export default List
