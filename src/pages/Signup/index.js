import React, { useState} from 'react';
import { Link, useLocation } from 'react-router-dom';
import queryString from 'query-string'
import * as Yup from 'yup';
import { useFormik } from 'formik';

import { Form, Input } from '@rocketseat/unform';
import Select from 'react-select';
import { Field, Label } from '../../components/Form/Form';
import { Button } from '../../components/Form/Button';
import { Warningtext } from '../../components/Warningtext';
import { Span } from '../../components/Span';

import api from '../../services/api';

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
  
  // eslint-disable-next-line
  const [month, setSelectedMonth] = useState("")
  // eslint-disable-next-line
  const [day, setSelectedDays] = useState("")
  // eslint-disable-next-line
  const [year, setSelectedYears] = useState("")

  const handleYearChange = selectedYear=> {
    formik.values.year = selectedYear.value;
    setSelectedYears(selectedYear);
  };

  const handleMonthChange = selectedMonth => {
    formik.values.month = selectedMonth.value;
    setSelectedMonth(selectedMonth);
  };

  const handleDayChange = selectedDay => {
    formik.values.day = selectedDay.value;
    setSelectedDays(selectedDay);
  };

  const formik = useFormik({
    initialValues: {
      email: '',
      name: '',
      lastname: '',
      password: '',
      type: typeuser,
      terms: '',
      month: '',
      day: '',
      year: '',
    },
    /*
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

      day: Yup.string()
      .required('Por favor, adicione sua data de nascimento para prosseguir'),

      month: Yup.string()
      .required('Por favor, adicione sua data de nascimento para prosseguir'),

      year: Yup.string()
      .required('Por favor, adicione sua data de nascimento para prosseguir'),
    }),*/
    onSubmit: values => {  
      handSubmit(values)
    }
  });
 
  async function handSubmit(values) {
    var birth_date = values.year + "-" + values.month + "-" + values.day;
    
    //fazer verificação se o cadatro é maios de 18

    //const response = await api.post('user/create/', {values}); 
  }

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
                          <Label for={'day'}>
                            <Select
                              className={!day && formik.errors.day ? 'border-warning' : ''}
                              value={day}
                              onChange={selectedOption => {
                                handleDayChange(selectedOption);
                                formik.handleChange("day");
                              }}
                              options={days}
                              isSearchable={false}
                              placeholder={'Dia'}
                            />
                          </Label>
                        </Field>
                      </div> 
                      <div className="column">
                        <Field class={'field'}>
                          <Label for={'month'}>
                            <Select
                              className={!month && formik.errors.month ? 'border-warning' : ''}
                              value={month}
                              onChange={selectedOption => {
                                handleMonthChange(selectedOption);
                                formik.handleChange("month");
                              }}
                              options={months}
                              isSearchable={false}
                              placeholder={'Mês'}
                            />
                          </Label>
                        </Field>
                      </div>                     
                      <div className="column">
                        <Field class={'field'}>
                          <Label for={'year'}>
                            <div className="">
                              <Select
                                className={!year && formik.errors.year ? 'border-warning' : ''}
                                value={year}
                                onChange={selectedOption => {
                                  handleYearChange(selectedOption);
                                  formik.handleChange("year");
                                }}
                                options={years}
                                isSearchable={false}
                                placeholder={'Ano'}
                              />
                            </div>
                          </Label>
                        </Field>
                      </div>
                    </div>
                    <Span class={'validation-warning'}>
                        {
                        // eslint-disable-next-line
                        month === '' && formik.errors.month || day === '' && formik.errors.day || year === '' && formik.errors.year
                        ? 
                          (<div>Por favor, adicione sua data de nascimento para prosseguirmos</div>) 
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
