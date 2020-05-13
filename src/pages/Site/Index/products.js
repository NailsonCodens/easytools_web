import React, {useEffect, useState} from 'react'
import { useParams, useLocation } from "react-router-dom";
import queryString from 'query-string';
import api from '../../../services/api';
import desert2 from '../../../assets/images/desert2.svg'
import Select from 'react-select';

const Products = ({history}) => {
  let values = queryString.parse(useLocation().search);

  const [tools, setTools] = useState([]);
  const [category, setCategory] = useState(values.category);

  console.log(category)

  useEffect(() => {
    async function loadTools(lat = '', lng = '') {
      var search = values.category;
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

  async function loadTools2(category = '', lat = '', lng = '') {
    var search = values.category;
    const response = await api.get(`/tools_site?search=${category}&distance=${''}&lat=${''}&lng=${''}&type=1`, {
      headers: { search }
    });

   setTools(response.data.tools)
  }


  const handleChangeCategory = (category) => {
    setCategory(category.value)
    loadTools2(category.value)
  }

  return (
    <div className="container">
      <b className="category">{values.category}</b>
      <br/><br/>

      <h3 className="title is-3 has-text-centered title-stand">Para 
        <span className="logo-color">
        { 
          category === 'bricolagem' ?
          (
           ' DIY - faça você mesmo '
          )
          :
          (
            <>
              {
                ' ' + category
              }
            </>
          ) 
        }
        </span>
      </h3>
      <div className="select-eqs">
        <Select
          className={''}
          options={[
            {value: 'Construção', label: 'Construção'},
            {value: 'Limpeza', label: 'Limpeza'},
            {value: 'Jardinagem', label: 'Jardinagem'},
            {value: 'Bricolagem', label: 'Bricolagem'}
          ]}
          isSearchable={true}
          placeholder={'Selecione para ir a outra categoria'}
          onChange={selectedOption => {
            handleChangeCategory(selectedOption);
          }}
          defaultValue={values.category}
        />
      </div>
      <div className="columns is-desktop">
        {
          tools.map(tool => (
            <div key={tool.id} className="column is-one-quarter">
              <span>
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
                  <div className="div-t">
                    <p className="title-tool has-text-centered capitalize">{tool.title}</p>
                    {
                      /*
                        <p className="text-price">Diária a partir de <span className="price">R$ { tool.prices.split(';')[0] }</span></p>                      
                      */
                    }
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
    </div>
  )
}

export default Products
