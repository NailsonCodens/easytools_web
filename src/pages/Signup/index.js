import React, { useState} from 'react';
import { Link, useLocation } from 'react-router-dom';
import queryString from 'query-string'
import * as Yup from 'yup';
import { useFormik } from 'formik';

import { Form, Input } from '@rocketseat/unform';
//import { Select } from '../../components/Form/Inputs/index';
import Select from 'react-select';
import { Field, Label } from '../../components/Form/Form';
import { Button } from '../../components/Form/Button';
import { Warningtext } from '../../components/Warningtext';
import { Span } from '../../components/Span';

import years from '../../utils/years';
import days from '../../utils/days';
import months from '../../utils/months';

import logo_blue from '../../assets/images/logo_blue.png';
import logo_yellow from '../../assets/images/logo.png';

import './style.css';

export default function Singup() {  
  let type = queryString.parse(useLocation().search).type;
  let logo = logo_yellow;
  let typeuser = 'Renter';

  logo = type === 'lessor' ? logo_blue : logo;
  typeuser = type === 'lessor' ? 'Lessor' : 'Renter';

  const [month, setSelectedMonth] = useState("");

  const options = [
    { value: '', label: 'Mês' },
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
  ];

  const handleMonthChange = selectedMonth => {
    formik.values.month = selectedMonth.value;
    setSelectedMonth(selectedMonth);
  };

  const formik = useFormik({
    initialValues: {
      email: '',
      name: '',
      lastname: '',
      password: '',
//      type: typeuser,
      terms: '',
      month: { value: '', label: 'Mês' },
      day: { value: 'default' },
      year: { value: 'default' },
    },

    validationSchema: Yup.object({
      email: Yup.string()
        .email('Insira um e-mail válido.')
        .required('E-mail é obrigatório.'),

      name: Yup.string()
        .required('Nome é obrigatório.'),

      lastname: Yup.string()
        .required('Sobrenome é obrigatório.'),

      password: Yup.string()
        .required('Adicione uma senha.'),

      /*month: Yup.string().test('compare', 'Selecione sua data de nascimento para prosseguir', (value) => {
        var hack = JSON.stringify(value);
        //eslint
        return value !== 'default' && hack !== '"' + '[object Object]' + '"';
      })*/
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
                        className={formik.touched.lastname && formik.errors.lastname ? 'input border-warning' : 'input'}
                        onChange={formik.handleChange}
                        value={formik.values.lastname}
                      />
                      <Span class={'validation-warning'}>
                        {
                          formik.touched.lastname && formik.errors.lastname 
                        ? 
                          (<div>{formik.errors.lastname}</div>) 
                        : 
                          null
                        }
                      </Span>
                    </Label>
                  </Field>
                  <Field class={'field'}>
                    <Label for={'password'}>
                      <Input 
                        name="password" 
                        type="password" 
                        placeholder="Crie sua senha" 
                        className={formik.touched.password && formik.errors.password ? 'input border-warning' : 'input'}
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
                  <div className="container">
                    <Warningtext>Pelo menos 8 caracteres</Warningtext>
                    <Warningtext>Conter números e símbolos</Warningtext>
                    <Warningtext>Não pode conter partes do seu e-mail</Warningtext>
                    <Warningtext>Pelo menos 1 caracter maiúsculo</Warningtext>
                  </div>
                  <br/>
                  <Field class={'field'}>
                    <div className="columns">
                      <div className="column">
                        <Field class={'field'}>
                          <Label for={'month'}>
                            <Select
                              className=""
                              value={formik.values.month}
                              onChange={selectedOption => {
                                handleMonthChange(selectedOption);
                                formik.handleChange("month");
                              }}
                              options={options}
                              isSearchable={false}
                            />
                          </Label>
                        </Field>
                      </div>
                      <div className="column">
                        <Field class={'field'}>
                          <Label for={'days'}>
                            <div className="select">
                           
                            </div>
                          </Label>
                        </Field>
                      </div>
                    </div>
                    <Span class={'validation-warning'}>
                        {
                          formik.touched.month && formik.errors.month 
                        ? 
                          (<div>{formik.errors.month}</div>) 
                        : 
                          null
                        }
                      </Span>
                  </Field>
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
