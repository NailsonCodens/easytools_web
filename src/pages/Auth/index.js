import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";

import {Auth} from '../../store/actions/auth';

import { Link } from 'react-router-dom';

import { Form, Input } from '@rocketseat/unform';
import { Field, Label } from '../../components/Form/Form';
import { Button } from '../../components/Form/Button';
import { Span } from '../../components/Span';
import Modal from '../../components/Modal';

import api from '../../services/api';
import { login } from '../../services/auth';

import * as Yup from 'yup';
import { useFormik } from 'formik';

import Scrool from '../../utils/scroll';

import './style.css';
 
const Signin = ({ hs, url, closeModal }) => {
  const dispatch = useDispatch();
  useSelector(state => state.auth);

  const [nologin, setNologin] = useState(false);

  const hideNologin = () => {
    setNologin(false)
    return nologin
  }

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

      let { id, email, name, type } = res.data.user;
      let { token } = res.data;
      setNologin(false)
      dispatch(Auth(email, name, type, token, id));

      login(token, type);

      if (url !== undefined) {
        Scrool()
      } else {
        Scrool()
        hs.push("/");
      }
      Scrool()
      closeModal();
    })
    .catch((error) => {
      setNologin(true)
    })
  } 

  return (
    <>
      <div className="container-singin">
        <div className="singin">
          <div className="container">
            <div className="column nopadding">
              <div className="has-text-centered">
                <h2 className="welcome-easytools">Bem-vindo à EasyTools!</h2>
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
                <Field className={'field'}>
                  <Label for={'Email'}>
                    <Input 
                      type="text" 
                      name="email" 
                      className={formik.touched.email && formik.errors.email ? 'input border-warning' : 'input input-singin'} 
                      placeholder="E-mail"
                      onChange={formik.handleChange}
                      value={formik.values.email}
                    />
                    <Span className={'validation-warning'}>
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
                <Field className={'field'}>
                  <Label for={'password'}>
                    <Input 
                      type="password" 
                      name="password" 
                      className={formik.touched.password && formik.errors.password ? 'input border-warning' : 'input input-singin'} 
                      placeholder="Senha"
                      onChange={formik.handleChange}
                      value={formik.values.password}
                    />
                    <Span className={'validation-warning'}>
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
                <Field className={'field'}>
                  <Label for={'save'}>
                    <Button
                      type={'submit'}
                      className={'button is-fullwidth color-logo'} 
                      text={'Acessar'}
                    />
                  </Label>
                </Field>
              </Form>
            </div>
          </div>
          <br/>
          <div className="has-text-centered">
            <Span>Ainda não tem uma conta na EasyTools? </Span>
            <a onClick={event => Scrool()} href="/signup" className="button is-fullwidth is-info"><Span className="button-enter">Cadastre-se</Span></a>
          </div>  
          <div className="has-text-centered mwd-opacity-low">
            <Span>Esqueci minha senha! </Span>
            <a onClick={event => Scrool()} href="/password-recover"><Span className="button-enter2">Recuperar Senha.</Span></a>
          </div>               
        </div>
        <Modal 
          show={nologin} 
          onCloseModal={hideNologin}
          closeOnEsc={true} 
          closeOnOverlayClick={true}
        >
          <h2 className="title has-text-centered">Desculpe, algo está errado.</h2>
          <div className="has-text-centered">

          </div>
          <div className="has-text-centered text-modal">
            Não encontramos nenhum usuário em nossas bases de dados com este email.
          </div>
        </Modal>
      </div>
    </>
  )
}

export default Signin;