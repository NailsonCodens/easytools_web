import React, { useState} from 'react';
import { useDispatch, useSelector } from "react-redux";

import { Link, useLocation } from 'react-router-dom';
import queryString from 'query-string'
import * as Yup from 'yup';
import { useFormik } from 'formik';

import {Auth} from '../../store/actions/auth';

import { login } from '../../services/auth';

import { Form, Input } from '@rocketseat/unform';
import Select from 'react-select';
import { Field, Label } from '../../components/Form/Form';
import { Button, CheckboxIOS } from '../../components/Form/Button';
import { Warningtext } from '../../components/Warningtext';
import { Span } from '../../components/Span';
import { Hr } from '../../components/Hr';

import Modal from '../../components/Modal';

import Scrool from '../../utils/scrool';

import api from '../../services/api';

import years from '../../utils/years';
import days from '../../utils/days';
import months from '../../utils/months';

import logo_blue from '../../assets/images/logo_blue.png';
import logo_yellow from '../../assets/images/logo.png';
import baby from '../../assets/images/baby.svg';
import man from '../../assets/images/man.svg';

import './style.css';

const Singup = ({ history }) => {
  
  let type = queryString.parse(useLocation().search).type;
  let logo = logo_yellow;
  let typeuser = 'Renter';

  logo = type === 'lessor' ? logo_blue : logo;
  typeuser = type === 'lessor' ? 'Lessor' : 'Renter';
  
  // eslint-disable-next-line
  const [month, setSelectedMonth] = useState("");
  // eslint-disable-next-line
  const [day, setSelectedDays] = useState("");
  // eslint-disable-next-line
  const [year, setSelectedYears] = useState("");
  
  const [modal, setModal] = useState(false);
  const [terms, setTerms] = useState(false);
  const [modify, setModify] = useState('morethan18');
  const [usernew, setUsernew] = useState({});

  const dispatch = useDispatch();
  useSelector(state => state.auth);

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

  const handleCheckIOS = event => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const marketing = value ? 'Y' : 'N'
    formik.values.marketing = marketing
  };

  const formik = useFormik({
    initialValues: {
      email: '',
      name: '',
      last_name: '',
      password: '',
      type: typeuser,
      terms: 'Y',
      marketing: 'Y',
      month: '',
      day: '',
      year: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Insira um e-mail válido.')
        .required('E-mail é obrigatório.'),

      name: Yup.string()
        .required('Nome é obrigatório.'),

      last_name: Yup.string()
        .required('Sobrenome é obrigatório.'),

      password: Yup.string()
        .required('Adicione uma senha.'),

      day: Yup.string()
      .required('Por favor, adicione sua data de nascimento para prosseguir'),

      month: Yup.string()
      .required('Por favor, adicione sua data de nascimento para prosseguir'),

      year: Yup.string()
      .required('Por favor, adicione sua data de nascimento para prosseguir'),
    }),

    onSubmit: values => {
      handSubmit(values)
    }
  });

  const hideModal = () => {
    setModal(false)
    return modal
  }

  const hideTerms = () => {
    setTerms(false)
    return terms
  }
  
  const NoAcceptedTerms = () => {
    setModify('noaccepted');
    setTerms(false);
    setModal(true);
  }
  
  function handSubmit(values) { 
    let { year, month, day } = values
    let birth_date = year + "-" + month + "-" + day;
    values['birth_date'] = birth_date;

    let morethan18 = new Date(year + 18, month - 1, day);
    let now = new Date();
    
    if (morethan18 <=now) {
      setModify('morethan18')
      setModal(false);
      setTerms(true);
    } else {
      setModal(true);
    }

    setUsernew(values);
  }

  async function AcceptedTerms () {
    await api.post('user/create/', usernew, {})
    .then((res) => {
      let user = {
        email: usernew.email,
        password: usernew.password,
      }
      
      setTimeout(() => {
        Authregister(user);
      }, 1500);      
    })
    .catch((error) => {
    })
  }

  async function Authregister (user) {
    await api.post('auth/token/', user, {})
    .then((res) => {
      let { email, name } = res.data.user;
      let { token } = res.data;
      dispatch(Auth(email, name, token));

      login(token);

      history.push("/lessor/dashboard");
    })
    .catch((error) => {
      console.log(error.response)
    })
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
                  onSubmit={ values => {
                    Scrool();
                    formik.handleSubmit(values);
                  }} 
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
                    <Label for={'last_name'}>
                      <Input 
                        name="last_name" 
                        type="text" 
                        placeholder="Sobrenome" 
                        className={formik.touched.last_name && formik.errors.last_name ? 'input border-warning' : 'input'}
                        onChange={formik.handleChange}
                        value={formik.values.last_name}
                      />
                      <Span class={'validation-warning'}>
                        {
                          formik.touched.last_name && formik.errors.last_name 
                        ? 
                          (<div>{formik.errors.last_name}</div>) 
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
                              className={formik.touched.day && formik.errors.day ? 'border-warning' : ''}
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
                              className={formik.touched.month && formik.errors.month ? 'border-warning' : ''}
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
                                className={formik.touched.year && formik.errors.year ? 'border-warning' : ''}
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
                        formik.touched.month && formik.errors.month || formik.touched.day && formik.errors.day || formik.touched.year && formik.errors.year
                        ? 
                          (<div>Por favor, adicione sua data de nascimento para prosseguirmos</div>) 
                        : 
                          null
                        }
                      </Span>
                  </Field>
                  <Field>
                    <Label>
                      <Warningtext>
                        A EasyTools enviará a você emails, ofertas e marketing. Você desabilitar esta opção quando quiser.
                        Basta acessar nas configurações de sua conta.
                      </Warningtext>
                      <div className="offer">
                        <CheckboxIOS 
                          onChange={handleCheckIOS}
                          name="marketing"
                          value={formik.values.marketing} 
                          id="checkios" 
                          off="" 
                          on="Sim"
                        />
                      </div>
                    </Label>
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
              <Hr/>
              <div className="">
                <Span>Já tem conta da EasyTools? </Span>
                <Link to="lessor/signin"><Span class="button-enter">Entrar</Span></Link>
              </div>
            </div>
            <Modal 
              show={terms} 
              onCloseModal={hideTerms}
              closeOnEsc={true} 
              closeOnOverlayClick={true}
            >
              <h2 className="title">Termos e condições de uso</h2>
              <div className="terms">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                Why do we use it?
                It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).
                Where does it come from?
                Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.
                The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.
              </div>
              <br/>
              <div className="has-text-centered">
                <Button
                  type={'input'}
                  class={'button is-success accepted-bt'} 
                  text={'Aceitar'}
                  onClick={AcceptedTerms}
                />
                <Button
                  type={'input'}
                  class={'button is-default'} 
                  text={'Não aceitar'}
                  onClick={NoAcceptedTerms}
                />
              </div>
            </Modal>
            <Modal 
              show={modal} 
              onCloseModal={hideModal} 
              closeOnEsc={true} 
              closeOnOverlayClick={true}
            >
              { 
              modify === 'morethan18' ? (
                <>
                  <h2 className="title has-text-centered title-modal">Ops! Lamentamos muito.</h2>
                  <br/>
                  <div className="has-text-centered">
                    <img src={baby} alt="Baby Logo" className="baby-cry"/>
                  </div>
                  <br/><br/>
                  <p className="has-text-centered text-modal">Para se cadastrar você precisa ter 18 anos ou mais.</p>
                </>                  

              ) : (
              ''
              )
            }

            {
              modify === 'noaccepted' ? (
                <>
                  <h2 className="title has-text-centered title-modal">Ops! Desculpa.</h2>
                  <br/>
                  <div className="has-text-centered">
                    <img src={man} alt="Man Logo" className="baby-cry"/>
                  </div>
                  <br/><br/>
                  <p className="has-text-centered text-modal">Para se cadastrar, você precisa aceitar os termos.</p>
                </>                  

              ) : (
              ''
              )              
            }
            </Modal>
          </div>
        </div>
      </div>
    </>
  )
}

export default Singup;
