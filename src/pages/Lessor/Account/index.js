import React, { useEffect, useState } from 'react'
import { Form, Input } from '@rocketseat/unform';
import { Field, Label } from '../../../components/Form/Form';
import { Button } from '../../../components/Form/Button';
import Title from '../../../utils/title';
import {Titlepage} from '../../../components/Titles/Titlepages';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { Span } from '../../../components/Span';
import CurrencyInput from 'react-currency-input';
import { Warningtext } from '../../../components/Warningtext';
import { useDispatch, useSelector } from "react-redux";
import api from '../../../services/api';
import Notification from '../../../utils/notification';

function Index() {
  const current_user = useSelector(state => state.auth);
  
  const [id, setId] = useState('');
  const [freight, setFreight] = useState('');
  const [min, setMin] = useState('');
  const [typerent, setTyperent] = useState('');

  const success = () => Notification(
    'success',
    'Atualizado com sucesso!', 
    {
      autoClose: 3000,
      draggable: false,
    },
    {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
    }
  )


  const formik = useFormik({
    initialValues: {
      freight: '',
      min: '',
      max: '',
      typerent: 'cpfcnpj',
    },

    validationSchema: Yup.object({
      freight: Yup.string()
        .required('O frete é obrigatório.'),

      min: Yup.string()
        .required('O valor mínimo do é obrigatório.'),
      }),

    onSubmit: values => {
      saveConfig(values)
    }
  })

  useEffect(() => {
    async function loadAccount() {
      if (current_user.id !== undefined) {
        const response = await api.get(`/userconfig/${current_user.id}`, {});
          setId(response.data.userconfig[0].id)
         formik.values.freight = response.data.userconfig[0].freight
         setFreight(response.data.userconfig[0].freight)
         formik.values.min = response.data.userconfig[0].min
          setMin(formik.values.min = response.data.userconfig[0].min)
          setTyperent(formik.values.typerent = response.data.userconfig[0].typerent)
      }
    }
    loadAccount()
  }, [current_user])

  async function saveConfig (values) {
    setFreight(values.freight)
    setMin(values.min)
    await api.post(`userconfig/create/${current_user.id}`, values, {})
    .then((res) => {
      success()
    })
    .catch((err) => {
      console.log(err.response)
    })
  }

  const handleTyperent = (event) => {
    setTyperent(event.target.value)
    formik.values.typerent = event.target.value
  }

  const handleChangeAccount = (input, event) => {
    if (input === 'freight') {
      formik.values.freight = event
    }

    if (input === 'min') {
      formik.values.min = event
    }
  }

  return (
    <div className="container container-page">
      <div className="columns">
        <div className="column has-text-left">
          <Titlepage>Minha conta</Titlepage>
        </div>
      </div>
      <div className="columns">
        <div className="column is-7 box-inter box-inter-padding">
          <h3 className="title-box-inter">Frete e tipo de locação</h3>
          <Warningtext>
            Selecione aqui o valor do frete cobrado para levar seu equipamento ou ferramenta, para quem alugou.
          </Warningtext>
          <Warningtext>
            Você também pode escolher para quem você deseja locar, escolha ambos para alugar para qualquer pessoa.
          </Warningtext>
          <div className="column">
            <div className="columns">
              <Form
                onSubmit={ values => {
                  formik.handleSubmit(values);
                }}
                noValidate
              >
                  <Field>
                    <div className="columns">
                      <div className="column">
                          <Label className="label-perfil" for={'freight'}>
                            <b>Valor do frete por quilômetro</b>
                          </Label>
                          <CurrencyInput
                          name="freight"
                          type="text"
                          decimalSeparator="," thousandSeparator="."
                          placeholder="R$ 4,00"
                          className={formik.touched.freight && formik.errors.freight ? 'input border-warning' : 'input'}
                          onChange={event => handleChangeAccount('freight', event)}
                          value={freight}
                        />
                        <Span className={'validation-warning'}>
                          {
                            formik.touched.freight && formik.errors.freight 
                          ? 
                            (<div>{formik.errors.freight}</div>) 
                          : 
                            null
                          }
                        </Span>
                      </div>
                      <div className="column">
                          <Label className="label-perfil" for={'min'}>
                            <b>Valor mínimo</b>
                          </Label>
                          <CurrencyInput
                          name="min"
                          type="text"
                          decimalSeparator="," thousandSeparator="."
                          placeholder="R$ 30,00"
                          className={formik.touched.min && formik.errors.min ? 'input border-warning' : 'input'}
                          onChange={event => handleChangeAccount('min', event)}
                          value={min}
                        />
                        <Span className={'validation-warning'}>
                          {
                            formik.touched.min && formik.errors.min 
                          ? 
                            (<div>{formik.errors.min}</div>) 
                          : 
                            null
                          }
                        </Span>
                      </div>
                    </div>
                  </Field> 
                  <Field>
                    <Label className="label-perfil" for={'typerent'}>
                      <b>Preferência de aluguel:</b>
                    </Label>
                      <div className="columns">
                        <div className="column has-text-centered">
                          <input 
                            className="is-checkradio"
                            type="radio"
                            id={'cpf'}
                            name="typerent" 
                            value="cpf"
                            checked={typerent === 'cpf' ? true : false}
                            onChange={event => handleTyperent(event)}
                          />
                          <Label for={'cpf'}>CPF</Label>    
                        </div>
                        <div className="column has-text-centered">
                          <input 
                              className="is-checkradio"
                              type="radio"
                              id={'cnpj'}
                              name="typerent" 
                              value="cnpj"
                              checked={typerent === 'cnpj' ? true : false}
                              onChange={event => handleTyperent(event)}
                            />
                            <Label for={'cnpj'}>CNPJ</Label>
                        </div>
                        <div className="column has-text-centered">
                          <input 
                            className="is-checkradio"
                            type="radio"
                            id={'cpfcnpj'}
                            name="typerent" 
                            value="cpfcnpj"
                            checked={typerent === 'cpfcnpj' ? true : false}
                            onChange={event => handleTyperent(event)}
                          />
                          <Label for={'cpfcnpj'}>Ambos</Label>
                        </div>
                      </div>
                  </Field> 
                  <Field className="is-pulled-right">
                    <Button
                      type={'submit'}
                      className={'button color-logo-lessor'}
                      text={'Salvar'}
                    />
                  </Field>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Index
