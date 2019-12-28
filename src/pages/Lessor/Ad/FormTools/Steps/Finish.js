import React from 'react';
import { useFormik } from 'formik';
import { Form } from '@rocketseat/unform';
import { Button } from '../../../../../components/Form/Button';
import { SubTitlepages } from '../../../../../components/Titles/SubTitlepages';
import Scroll from '../../../../../utils/scroll';
import { Hr } from '../../../../../components/Hr';
import {IntlProvider, FormattedNumber} from 'react-intl';

import api from '../../../../../services/api';

const Finish = ({handleChange, prevStep, values}) => {
  values.prices =  `${values.price1}; ${values.price2}; ${values.price3}`
  
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
    await api.post('tools/add/', values, {})
    .then((res) => {
      console.log(res)
    })
  }

  const back = (e) => {
    e.preventDefault();
    Scroll(100, 100);
    prevStep();
  }

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
              <Hr/>
              <p><b>Marca: </b>{ values.brand !== '' ? values.brand : 'Não informado' }</p>
              <p><b>Tipo: </b>{ values.type_spec !== '' ? values.type_spec : 'Não informado' }</p>
              <p><b>Categoria: </b>{ values.category !== '' ? values.category : 'Não informado' }</p>
              <p><b>Alimentação: </b>{ values.feed !== '' ? values.feed : 'Não informado' }</p>
              <p><b>Potência: </b>{ values.power !== '' ? values.power : 'Não informado' }</p>
              <p><b>Tensão: </b>{ values.tension !== '' ? values.tension : 'Não informado' }</p>
              <p><b>Acessórios: </b>{ values.accessory !== '' ? values.accessory : 'Não informado' }</p>
              <p><b>Vai junto: </b>{ values.follow !== '' ? values.follow : 'Não informado' }</p>
              <Hr/>
              <p><b>Indicação de uso: </b>{ values.use_indication !== '' ? values.use_indication : 'Não informado' }</p>
              <Hr/>
              <p><b>Contrato: </b>{ values.contract !== '' ? contract : 'Não informado' }</p>
              <p><b>Seguro: </b>{ values.insurance !== '' ? insurance : 'Não informado' }</p>
              <p><b>Entrega: </b>{ values.delivery !== '' ? delivery : 'Não informado' }</p>
              <p><b>Devolução: </b>{ values.devolution !== '' ? devolution : 'Não informado' }</p>
              <Hr/>
              <p>
                <b>Preços: </b>
                  <br/>
                  <IntlProvider locale="pt-br" timeZone="Brasil/São Paulo">
                    <b>
                      {
                        values.price2 !== '' ?  (<>Diária - <FormattedNumber value={values.price1} style="currency" currency="BRL" /></>)  : 'Não informado'
                      }
                    </b>
                    <br/>
                    <b>
                      {
                        values.price2 !== '' ?  (<>Quinzenal - <FormattedNumber value={values.price2} style="currency" currency="BRL" /></>)  : 'Não informado'
                      }
                    </b>
                    <br/>
                    <b>
                      {
                        values.price3 !== '' ?  (<>Mensal - <FormattedNumber value={values.price3} style="currency" currency="BRL" /></>)  : 'Não informado'
                      }
                    </b>
                  </IntlProvider>
                </p>
            </div>
            <div className="column">
            </div>
          </div>
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
        </Form>
    </>
  )
}

export default Finish