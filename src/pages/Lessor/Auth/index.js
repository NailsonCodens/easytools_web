import React from 'react';

import { Form, Input } from '@rocketseat/unform';
import { Field, Label } from '../../../components/Form/Form';
import { Button } from '../../../components/Form/Button';
import { Span } from '../../../components/Span';

import api from '../../../services/api';

import * as Yup from 'yup';
import { useFormik } from 'formik';

import Scrool from '../../../utils/scrool';

import './style.css';

import logo_blue from '../../../assets/images/logo_blue.png'

export default function Signin() {

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },

    validationSchema: Yup.object({
      email: Yup.string()
        .email('Insira um e-mail válido.')
        .required('E-mail é obrigatório.'),
      
      password: Yup.string()
        .required('Insira sua senha.'),
    }),

    onSubmit: values => {
      handSubmit(values)
    }
  });

  async function handSubmit(values) {
    await api.post('auth/token/', values, {})
    .then((res) => {
      console.log(res)
    })
    .catch((error) => {
      console.log(error.response)
    })
  } 

  return (
    <>
      <div className="container-singin">
        <div className="singin">
          <div className="container">
            <div className="column">
              <div className="has-text-centered">
                <img src={logo_blue} alt="EasyTools Logo" className="logo-sing-up"/>
              </div>
              <br/>
              <Form 
                onSubmit={ values => {
                  Scrool();
                  formik.handleSubmit(values);
                }} 
                noValidate
                className={''}
              >
                <Field class={'field'}>
                  <Label for={'Email'}>
                    <Input 
                      type="text" 
                      name="email" 
                      className={formik.touched.email && formik.errors.email ? 'input border-warning' : 'input input-singin'} 
                      placeholder="E-mail"
                      onChange={formik.handleChange}
                      value={formik.values.email}
                    />
                    <Span class={'validation-warning'}>
                      {
                        formik.touched.email && formik.errors.email 
                      ? 
                        (<div>{formik.errors.email}</div>) 
                      : 
                        null
                      }
                    </Span>
                  </Label>
                </Field>
                <Field class={'field'}>
                  <Label for={'password'}>
                    <Input 
                      type="password" 
                      name="password" 
                      className={formik.touched.email && formik.errors.email ? 'input border-warning' : 'input input-singin'} 
                      placeholder="Senha"
                      onChange={formik.handleChange}
                      value={formik.values.password}
                    />
                    <Span class={'validation-warning'}>
                      {
                        formik.touched.password && formik.errors.password 
                      ? 
                        (<div>{formik.errors.password}</div>) 
                      : 
                        null
                      }
                    </Span>
                  </Label>
                </Field>
                <Field class={'field'}>
                  <Label for={'save'}>
                    <br></br>
                    <Button
                      type={'submit'}
                      class={'button is-fullwidth color-logo-lessor'} 
                      text={'Acessar'}
                    />
                  </Label>
                </Field>
              </Form>            
            </div>
          </div>
        </div>
      </div>
    </>
  )
}