import React from 'react';
import { useFormik } from 'formik';
import { useHistory } from 'react-router-dom';
import { Form } from '@rocketseat/unform';
import { Button } from '../../../../../components/Form/Button';
import { SubTitlepages } from '../../../../../components/Titles/SubTitlepages';
import Scroll from '../../../../../utils/scroll';
import {IntlProvider } from 'react-intl';
import Notification from '../../../../../utils/notification';
import { useParams } from "react-router-dom";

import api from '../../../../../services/api';

const Finish = ({handleChange, prevStep, values}) => {
  console.log(values)
  let { id } = useParams();
  let history = useHistory();

  values.prices =  `${values.price1}; ${values.price2}; ${values.price3}; ${values.price4}`
 
  if (values.tension1 === '' && values.tension2 === '' && values.tension3 === '') {
    values.tension = `${values.tension1}/${values.tension2}${values.tension3}` 
  } else {
    values.tension = '-asdsad' 
  }
  
  let contract = values.contract === 'Y' ? 'SIM' : 'NÃO'
  let insurance = values.insurance === 'Y' ? 'SIM' : 'NÃO'
  let delivery = values.delivery === 'Y' ? 'SIM' : 'NÃO'
  let devolution = values.devolution === 'Y' ? 'SIM' : 'NÃO'
  const formik = useFormik({
    initialValues: {
      follow: '',
      accessory: '',
    },

    onSubmit: value => {
      saveTools(values)      
    }
  })

  async function saveTools (values) {
    console.log(values.category)
    if (Array.isArray(values.category)) {
      var cat = [];
      values.category.map(function(categorie){
        cat.push(categorie.value)
      })
      cat = cat.toString()
      console.log(cat)
      values.category = cat 
    }else{
      values.category = values.category
    }

    values.feed = values.feed.value

    if (id !== undefined) {
      await api.put(`tools/update/${id}`, values, {})
      .then((res) => {
        success2()
        history.push(`/lessor/ad`);
      }).catch((err) => {      })
  
    } else {
      await api.post('tools/add/', values, {})
      .then((res) => {
        success()
        history.push(`detail/${res.data.tool.id}`);
      }).catch((err) => {
      })  
    }
  }

  const back = (e) => {
    e.preventDefault();
    Scroll(100, 100);
    prevStep();
  }

  const success2 = () => Notification(
    'success',
    'Anúncio editado com sucesso.', 
    {
      autoClose: 1500,
      draggable: false,
    },
    {
      position: "top-center",
      autoClose: 1500,
      hideProgressBar: true,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
    }
  )

  const success = () => Notification(
    'success',
    'Anúncio criado com sucesso.', 
    {
      autoClose: 1500,
      draggable: false,
    },
    {
      position: "top-center",
      autoClose: 1500,
      hideProgressBar: true,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
    }
  )

  return (
    <>
      <SubTitlepages>Confira as informações e clique em cloncluir para prosseguir.</SubTitlepages>
      <br></br>
      <Form
        onSubmit={ (e, values) => {
          Scroll(100, 100);
          formik.handleSubmit(values)
        }} 
        noValidate
      >
        <div>
          <div className="columns">
            <div className="column">
              <p><b>Título: </b>{ values.title !== '' ? values.title : 'Não informado' }</p>
              <p><b>Descrição: </b>{ values.description !== '' ? values.description : 'Não informado' }</p>
            </div>
            <div className="column">
              <p><b>Indicação de uso: </b>{ values.use_indication !== '' ? values.use_indication : 'Não informado' }</p>
            </div>
          </div>
          <div className="columns">
            <div className="column">
              <p><b>Marca: </b>{ values.brand !== '' ? values.brand : 'Não informado' }</p>
              <p><b>Tipo: </b>{ values.type_spec !== '' ? values.type_spec : 'Não informado' }</p>
              <p><b>Categorias: </b>{ 
                values.category !== '' ? (
                  <>
                    {
        
                    }
                  </>  
                ) : ('Não informado') 
              }</p>
              <p><b>Alimentação: </b>{ values.feed.value !== '' ? values.feed.value : 'Não informado' }</p>
              <p><b>Potência: </b>{ values.power !== '' ? values.power : 'Não informado' }</p>
              <p><b>Tensão: </b>{ values.tension1 !== '' ? values.tension1 : '' } { values.tension2 !== '' ? values.tension2 : '' } { values.tension3 !== '' ? 'Trifásico' : '' }</p>
            </div>
            <div className="column">
              <p><b>Contrato: </b>{ values.contract !== '' ? contract : 'Não informado' }</p>
              <p><b>Seguro: </b>{ values.insurance !== '' ? insurance : 'Não informado' }</p>
              <p><b>Entrega: </b>{ values.delivery !== '' ? delivery : 'Não informado' }</p>
              <p><b>Devolução: </b>{ values.devolution !== '' ? devolution : 'Não informado' }</p>
            </div>
          </div>
          <div className="columns">
            <div className="column">
              <p><b>Acessórios: </b>{ values.accessory !== '' ? values.accessory : 'Não informado' }</p>
              <p><b>Vai junto: </b>{ values.follow !== '' ? values.follow : 'Não informado' }</p>
              <br/><br/>
              <div>
                <p><b>CEP: </b>{ values.location !== '' ? values.location : 'Não informado' }</p>                
                <p><b>Bairro: </b>{ values.neighboor !== '' ? values.neighboor : 'Não informado' }</p>                
                <p><b>Endereço: </b>
                  { values.address !== '' ? values.address : 'Não informado' } 
                  { values.number !== '' ? values.number : 'Não informado' }
                  { values.complement !== '' ? values.complement : 'Não informado' }
                </p>                
                <p><b>Estado: </b>{ values.uf !== '' ? values.uf : 'Não informado' }</p>                
                <p><b>Cidade e Região: </b>{ values.city !== '' ? values.city : 'Não informado' }</p>                
              </div>
            </div>
            <div className="column">
              <p>
                <b>Preços: </b>
                <br/>
                <IntlProvider locale="pt-br" timeZone="Brasil/São Paulo">
                  {
                    values.price1 !== '' ?  (<><b>Diária - </b><span className="money"> R$ {values.price1}</span></>)  : 'Não informado'
                  }
                  <br/>
                  {
                    values.price2 !== '' ?  (<><b>Semanal - </b><span className="money"> R$ {values.price2}</span></>)  : 'Não informado'
                  }
                  <br/>
                  {
                    values.price3 !== '' ?  (<><b>Quinzenal - </b> <span className="money"> R$ {values.price3}</span></>)  : 'Não informado'
                  }
                  <br/>
                  {
                    values.price4 !== '' ?  (<><b>Mensal - </b> <span className="money"> R$ {values.price4}</span></>)  : 'Não informado'
                  }
                </IntlProvider>
              </p>
            </div>
          </div>
          <br/><br/>
        </div>
        <Button
          type={'button'}
          className={'button color-logo-lessor is-pulled-right'}
          text={'voltar'}
          onClick={back}
        />
        <Button
          type={'submit'}
          className={'button color-logo-lessor back-form is-pulled-right'}
          text={'Concluir'}
        />
        <br/><br/>
        </Form>
    </>
  )
}

export default Finish