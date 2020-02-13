import React, { useEffect, useState } from 'react';
import './style.css';
import { Warningtext } from '../../../components/Warningtext';
import { useFormik } from 'formik';
import { Form, Input } from '@rocketseat/unform';
import { Button } from '../../../components/Form/Button';
import { Field, Label } from '../../../components/Form/Form';
import { Span } from '../../../components/Span';
import InputMask from 'react-input-mask';
import * as Yup from 'yup';
import Scroll from '../../../utils/scroll';
import api from '../../../services/api';
import { getCordinates } from '../../../services/mapbox';
import Notification from '../../../utils/notification';
import { useLocation, useHistory } from 'react-router-dom';
import queryString from 'query-string';

const Workadd = ({rent}) => {
  let valuesroute = queryString.parse(useLocation().search);

  let history = useHistory();

  const info = () => Notification(
    'info',
    'Só um momento, verificando endereço.', 
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
  
  const warning = () => Notification(
    'warning',
    'Não encontramos este endereço, verifique por favor.', 
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

  const formik = useFormik({
    initialValues: {
      location: '',
      neighboor: '',
      address: '',
      number: '',
      complement: '',
      uf: '',
      city: '',
      lat: '',
      lng: ''
    },

    validationSchema: Yup.object({
      location: Yup.string()
        .required('CEP é obrigatório.'),
      address: Yup.string()
        .required('O endereço é obrigatório.'),
      number: Yup.string()
        .required('O numero do endereço é obrigatório.'),
      complement: Yup.string()
      .required('O complemento é obrigatório.'),
      neighboor: Yup.string()
      .required('O bairro é obrigatório.'),
      uf: Yup.string()
        .required('O estado é obrigatório.'),
      city: Yup.string()
        .required('O cidade é obrigatório.'),
    }),

    onSubmit: values => {
      let query = `${values.address} ${values.number} ${values.uf} ${values.city}`
      info()     
      setTimeout(function(){
        getCordinates(query).then(res => {
          if (res.data.features.length !== '') {
            let cordinates =  res.data.features[0].center
            values.lat = cordinates[1]
            values.lng = cordinates[0]
            formik.values.lat = cordinates[1]
            formik.values.lng = cordinates[0]
            saveWorkadd(values)
          } else {
            warning()
          }
        }).catch(err => {

        })
      }, 2000);
    }
  })

  async function saveWorkadd (values) {
    values['rent_attempt_id'] = rent

    const responseworkadd = await api.get(`workadd/${rent}`, {
    });
    if (responseworkadd.data.workadd.length > 0) {
      var workaddid = responseworkadd.data.workadd[0].id;
      var workaddrentid = responseworkadd.data.workadd[0].rent_attempt_id;

      await api.put(`/workadd/update/${workaddrentid}/${workaddid}`, values, {})
      .then((res) => {
        history.push(`/s/payment/rent-payment?rent_attempt=${valuesroute.rent_attempt}&tool=${valuesroute.tool}&code_attempt=${valuesroute.code_attempt}`)      
      }).catch((err) => {
      })
    } else {
      await api.post('/workadd/add/', values, {})
      .then((res) => {
        history.push(`/s/payment/rent-payment?rent_attempt=${valuesroute.rent_attempt}&tool=${valuesroute.tool}&code_attempt=${valuesroute.code_attempt}`)      
      }).catch((err) => {
      })
    }
  }

  return (
    <div className="container workadd">
      <p className="title-infos-tool hack-padding-top">Estamos quase lá!</p>
      <p className="title-tool-only">
        Adicione o endereço onde o equipamento será usado.
      </p>
      <Warningtext>
        <br/>
        Para que tudo ocorra bem, é importante que você adicione o endereço onde o equipamento vai ser usado. 
        <br/>
        Não se preocupe, o endereço serve para que o locador saiba onde entregar e/ou onde o equipamento será usado,
        <br/>
        garantindo assim um melhor atendimento.
      </Warningtext>
      <br/>
      <Form
        onSubmit={ values => {
          formik.handleSubmit(values);
        }}
        noValidate
      >
        <div className="columns">
          <div className="column">
            <div className="columns column-address">
              <div className="column">
                <Field>
                  <Label className="label-perfil" for={'location'}>
                    <b>CEP</b>
                  </Label>
                  <InputMask
                    name="location"
                    type="text"
                    mask="99.999-999" 
                    maskChar=" "
                    placeholder="00.000-000"
                    className={formik.touched.location && formik.errors.location ? 'input border-warning' : 'input'}
                    onChange={event => formik.handleChange(event)}
                    value={formik.values.location}
                  />
                  <Span className={'validation-warning'}>
                    {
                      formik.touched.location && formik.errors.location 
                    ? 
                      (<div>{formik.errors.location}</div>) 
                    : 
                      null
                    }
                  </Span>
                </Field>
              </div>
              <div className="column">
                <Field>
                  <Label className="label-perfil" for={'Bairro'}>
                    <b>Bairro</b>
                  </Label>
                  <Input
                    name="neighboor"
                    type="text"
                    placeholder="Bairro"
                    className={formik.touched.neighboor && formik.errors.neighboor ? 'input border-warning' : 'input'}
                    onChange={event => formik.handleChange(event)}
                    value={formik.values.neighboor}
                  />
                  <Span className={'validation-warning'}>
                    {
                      formik.touched.neighboor && formik.errors.neighboor 
                    ? 
                      (<div>{formik.errors.neighboor}</div>) 
                    : 
                      null
                    }
                  </Span>
                </Field>
              </div>
            </div>
          </div>
        </div>
        <div className="columns column-address">
          <div className="column">
            <Field>
              <Label className="label-perfil" for={'address'}>
                <b>Endereço</b>
              </Label>
              <Input
                name="address"
                type="text"
                placeholder="Endereço"
                className={formik.touched.address && formik.errors.address ? 'input border-warning' : 'input'}
                onChange={event => formik.handleChange(event)}
                value={formik.values.address}
              />
              <Span className={'validation-warning'}>
                {
                  formik.touched.address && formik.errors.address 
                ? 
                  (<div>{formik.errors.address}</div>) 
                : 
                  null
                }
              </Span>
            </Field>
          </div>
          <div className="column is-3">
            <Field>
              <Label className="label-perfil" for={'number'}>
                <b>Número</b>
              </Label>
              <Input
                name="number"
                type="text"
                placeholder="000"
                className={formik.touched.number && formik.errors.number ? 'input border-warning' : 'input'}
                onChange={event => formik.handleChange(event)}
                value={formik.values.number}
              />
              <Span className={'validation-warning'}>
                {
                  formik.touched.number && formik.errors.number 
                ? 
                  (<div>{formik.errors.number}</div>) 
                : 
                  null
                }
              </Span>
            </Field>
          </div>
          <div className="column is-3">
            <Field>
              <Label className="label-perfil" for={'complement'}>
                <b>Completo</b>
              </Label>
              <Input
                name="complement"
                type="text"
                placeholder="Complemento"
                className={formik.touched.complement && formik.errors.complement ? 'input border-warning' : 'input'}
                onChange={event => formik.handleChange(event)}
                value={formik.values.complement}
              />
              <Span className={'validation-warning'}>
                {
                  formik.touched.complement && formik.errors.complement 
                ? 
                  (<div>{formik.errors.complement}</div>) 
                : 
                  null
                }
              </Span>
            </Field>
          </div>
        </div>
        <div className="columns">
          <div className="column">
            <div className="columns">
                <div className="column">
                  <Field>
                    <Label className="label-perfil" for={'estado'}>
                      <b>Estado</b>
                    </Label>
                    <Input
                      name="uf"
                      type="text"
                      placeholder="Estado"
                      className={formik.touched.uf && formik.errors.uf ? 'input border-warning' : 'input'}
                      onChange={event => formik.handleChange(event)}
                      value={formik.values.uf}
                    />
                  </Field>
                  <Span className={'validation-warning'}>
                    {
                      formik.touched.uf && formik.errors.uf 
                    ? 
                      (<div>{formik.errors.uf}</div>) 
                    : 
                      null
                    }
                  </Span>
                </div>
                <div className="column">
                  <Field>
                    <Label className="label-perfil" for={'city'}>
                      <b>Cidade e Região</b>
                    </Label>
                    <Input
                      name="city"
                      type="text"
                      placeholder="Cidade"
                      className={formik.touched.city && formik.errors.city ? 'input border-warning' : 'input'}
                      onChange={event => formik.handleChange(event)}
                      value={formik.values.city}
                    />
                    <Span className={'validation-warning'}>
                      {
                        formik.touched.city && formik.errors.city 
                      ? 
                        (<div>{formik.errors.city}</div>) 
                      : 
                        null
                      }
                    </Span>
                  </Field>
                </div>
              </div> 
          </div>
        </div>
        <Field className="is-pulled-right">
          <Button
            type={'submit'}
            className={'button color-logo'}
            text={'Enviar endereço e pagar'}
          />
        </Field>
      </Form>
    </div>
  );
};

export default Workadd;