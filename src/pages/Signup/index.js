import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import queryString from 'query-string'
import * as Yup from 'yup';
import { useFormik } from 'formik';

import { Form, Input } from '@rocketseat/unform';
import { Field, Label } from '../../components/Form/Form';
import { Button } from '../../components/Form/Button';
import { Warningtext } from '../../components/Warningtext';
import { Span } from '../../components/Span';

import logo_blue from '../../assets/images/logo_blue.png';
import logo_yellow from '../../assets/images/logo.png';

import './style.css';

export default function Singup() {  
  let type = queryString.parse(useLocation().search).type;
  let logo = logo_yellow;
  let typeuser = 'Renter';

  logo = type === 'lessor' ? logo_blue : logo;
  typeuser = type === 'lessor' ? 'Lessor' : 'Renter';

  const formik = useFormik({
    initialValues: {
      email: '',
      name: '',
      lastname: '',
      password: '',
      type: typeuser,
      terms: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Insira um e-mail válido.')
        .required('E-mail é obrigatório.'),

      name: Yup.string()
      .required('Nome é obrigatório.'),
    }),
    onSubmit: values => {
      console.log(values)
    },
  });

  return (
    <>
      <div className="has-text-centered container-sign-up">
        <div className="sign-up">
          <Link to={'/'}>
            <img src={logo} alt="EasyTools Logo" className="logo-sing-up"/>
          </Link>          
          <h3 className="title-singup">
            Cadastre-se no Easytools!
          </h3>
          <div>
            <div className="container">
              <div className="column">
                <Form 
                  onSubmit={formik.handleSubmit} 
                  noValidate
                >
                  <Field class={'field'}>
                    <Label for={'email'}>
                      <Input 
                        name="email" 
                        type="email" 
                        placeholder="E-mail" 
                        className={formik.touched.email && formik.errors.email ? 'input border-warning' : 'input'}
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
                    <Label for={'name'}>
                      <Input 
                        name="name" 
                        type="text" 
                        placeholder="Nome" 
                        className={formik.touched.name && formik.errors.name ? 'input border-warning' : 'input'}
                        onChange={formik.handleChange}
                        value={formik.values.name}
                      />
                      <Span class={'validation-warning'}>
                        {
                          formik.touched.name && formik.errors.name 
                        ? 
                          (<div>{formik.errors.name}</div>) 
                        : 
                          null
                        }
                      </Span>
                    </Label>
                  </Field>
                  <Field class={'field'}>
                    <Label for={'lastname'}>
                      <Input 
                        name="lastname" 
                        type="text" 
                        placeholder="Sobrenome" 
                        className="input"
                        onChange={formik.handleChange}
                        value={formik.values.lastname}
                      />
                    </Label>
                  </Field>
                  <Field class={'field'}>
                    <Label for={'password'}>
                      <Input 
                        name="password" 
                        type="password" 
                        placeholder="Crie sua senha" 
                        className="input"
                        onChange={formik.handleChange}
                        value={formik.values.password}
                      />
                    </Label>
                  </Field>
                  <div className="container">
                    <Warningtext>Pelo menos 8 caracteres</Warningtext>
                    <Warningtext>Conter números e símbolos</Warningtext>
                    <Warningtext>Não pode conter partes do seu e-mail</Warningtext>
                    <Warningtext>Pelo menos 1 caracter maiúsculo</Warningtext>
                  </div>
                  <br/>
                  <Field class={'field'}>
                    <Label for={'save'}>
                      <Button
                        type={'submit'}
                        class={'button is-fullwidth color-logo'} 
                        text={'Cadastre-se'}
                      />
                    </Label>
                  </Field>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
