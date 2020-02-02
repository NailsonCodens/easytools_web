import React from 'react';
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

const Workadd = () => {
  const formik = useFormik({
    initialValues: {
      location: '',
      neighboor: '',
      address: '',
      number: '',
      complement: '',
      state: '',
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
      state: Yup.string()
        .required('O estado é obrigatório.'),
      city: Yup.string()
        .required('O cidade é obrigatório.'),
    }),

    onSubmit: values => {
      console.log(values)
    }
  })

  return (
    <div className="container-fluid workadd">
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
                      name="state"
                      type="text"
                      placeholder="Estado"
                      className={formik.touched.state && formik.errors.state ? 'input border-warning' : 'input'}
                      onChange={event => formik.handleChange(event)}
                      value={formik.values.state}
                    />
                  </Field>
                  <Span className={'validation-warning'}>
                    {
                      formik.touched.state && formik.errors.state 
                    ? 
                      (<div>{formik.errors.state}</div>) 
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