import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import {Auth} from '../../store/actions/auth';
import FacebookLogin from 'react-facebook-login';
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
  const currentuser = useSelector(state => state.auth);

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
        window.location.href = '/'
        //hs.push("/");
      }
      Scrool()
      closeModal();
    })
    .catch((error) => {
      setNologin(true)
    })
  } 

  async function authFacebookNew(response, fb, newuserfb) {
    await api.post('auth/token/', { email: fb.email, password: fb.accessToken}, {})
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
    })
  }

  async function authFacebook(response, fb, newuserfb) {
    await api.post('auth/token/', { email: fb.email, passwordfb: process.env.REACT_APP_LGFACEBOOK}, {})
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
      if (newuserfb !== 'yes') {
        api.put(`perfil/update/${response.data.user[0].id}`, {
          fbuserid: fb.userId
        }, {})
        .then((res) => {
        })
        .catch((err) => {
          console.log(err.response.data)
        })        
      }
    })
    .catch((error) => {
    })
  }

  async function getUser (fb) {
    const response = await api.get(`user/user/${fb.email}`, {});
    if (response.data.user.length > 0) {
      authFacebook(response, fb)
    } else {
      var usernew = {
        name: fb.name,
        last_name: '-',
        email: fb.email,
        password: fb.accessToken,
        terms: 'Y',
        marketing: 'Y',
        type: 'Renter',
        fbuserid: fb.id,
        birth_date: '1900-01-01',
        lat: '0',
        lng: '0'
      }

      await api.post('user/create/', usernew, {})
      .then((res) => {
        console.log(res)
        setTimeout(() => {
          authFacebookNew(response, fb, 'yes')
        }, 100);  
      })
      
      .catch((err) => {
        console.log(err.response)
      })
    }
  }

  
  /*
  
            let { id, email, name, type } = res.data.user;
          let { token } = res.data;
          console.log(token)
          dispatch(Auth(email, name, type, token, id));
          Scrool(0,0);
          login(token, type);
          hs.push("/");
          Scrool()
          closeModal();
  */

  const responseFacebook = (response) => {
    console.log('aqui')
    getUser(response);
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
                {
                    <FacebookLogin
                      appId="564259971027569"
                      autoLoad={false}
                      redirectUri={'https://easytoolsapp.com/'}
                      callback={responseFacebook}
                      textButton={'Acessar com facebook'}
                      fields="name,email,picture"
                      cssClass="my-facebook-button-class button is-fullwidth fb-cs"
                      render={renderProps => (
                        <button onClick={renderProps.onClick}>Logar com Facebook</button>
                      )}
                    />                    
                }
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