import React, {useEffect, useState} from 'react'
import { useParams, } from "react-router-dom";
import api from '../../../services/api';
import Select from 'react-select';
import Scroll from '../../../utils/scroll';

const Products = ({history, props}) => {
  let {category} = useParams();

  const [tools, setTools] = useState([]);
  // eslint-disable-next-line
  const [categorys, setCategory] = useState(category);

  useEffect(() => {
    async function loadTools(lat = '', lng = '') {
      var search = categorys;
      const response = await api.get(`/tools_site?search=${categorys}&distance=${''}&lat=${''}&lng=${''}&type=1`, {
        headers: { search }
      });

     setTools(response.data.tools)
    }
    loadTools()    

    return () => {
      setTools('');
    }
    // eslint-disable-next-line
  }, [])

  /*
  async function loadTools2(category = '', lat = '', lng = '') {
    var search = category;
    const response = await api.get(`/tools_site?search=${category}&distance=${''}&lat=${''}&lng=${''}&type=1`, {
      headers: { search }
    });

   setTools(response.data.tools)
  }
  */

  const goList = (title) => {
    title = title.replace(/\s+/g, '-').toLowerCase();
    Scroll(0,0);
    history.push(`/s/search/${category}/${title}/region`);
  }

  const handleChangeCategory = (category) => {
    window.location.href = '/s/equipaments/' + category.value
  }

  return (
    <div className="container">
      <b className="category">{category}</b>
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
          defaultValue={category}
        />
      </div>
      <div className="columns is-desktop">
        {
          tools.map(tool => (
            <div key={tool.id} className="column is-one-quarter" onClick={event => goList(tool.title)}>
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
                  </div>
                </div>
              </span>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Products
