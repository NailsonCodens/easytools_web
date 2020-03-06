import React, { useState} from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from 'react-router-dom';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { Form, Input } from '@rocketseat/unform';
import { Field, Label } from '../../components/Form/Form';
import { Span } from '../../components/Span';
import api from '../../services/api';
import logo_blue from '../../assets/images/logo_blue.png';
import logo_yellow from '../../assets/images/logo.png';
import Notification from '../../utils/notification';

import './style.css';

const PasswordRecover = ({ history }) => {

  let logo = logo_yellow;

  const success = (msg = null) => Notification(
    'success',
    msg !== null ? msg : 'Perfil atualizado com sucesso!', 
    {
      autoClose: 3000,
      draggable: false,
    },
    {
      position: "top-center",
      autoClose: 4000,
      hideProgressBar: true,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
    }
  )

  const notSuccess = (msg = null) => Notification(
    'error',
    msg !== null ? msg : 'A senha atual não é válida!',
    {
      autoClose: 3000,
      draggable: false,
    },
    {
      position: "top-center",
      autoClose: 4000,
      hideProgressBar: true,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
    }

  )

  const formik = useFormik({
    initialValues: {
      email: ''
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Insira um e-mail válido.')
        .required('E-mail é obrigatório.')
    }),

    onSubmit: values => {
      handSubmit(values)
    }
  });

  async function handSubmit(values) {
    await api.post('password_reset/', values, {})
    .then((res) => {
      console.log(res)
      if(res){
        success(`Um email foi enviado para ${values.email}, verifique sua caixa de entrada!`);
      }
    })
    .catch((err) => {
      if(err.response.status === 404){
        notSuccess(`O email: ${values.email} não foi encontrado em nossa base de dados!`);
      }
    })
    
  }

  return (
    <>

      <div className="columns">
        <div className="column mwd-full-heigh">
          <div className="mwd-container">
              <div className={'mwd-center'}>
                <Link to={'/'}>
                  <img src={logo} alt="EasyTools Logo" className="logo-sing-up"/>
                </Link>
              </div>
              <div className={'mwd-center'}>
                <h1 className='mwd-subtitle'>Recuperar Senha</h1>
              </div>
              <form onSubmit={formik.handleSubmit}>
                <Field className={'field'}>
                          <Label for={'email'}>
                            <Input 
                              name="email" 
                              type="email" 
                              placeholder="E-mail" 
                              className={formik.touched.email && formik.errors.email ? 'input border-warning' : 'input'}
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
                <div className={'mwd-center'}>
                  <p>Por favor preencha o email utilizado no momento do cadastro.</p>
                </div>
                <div className='mwd-center-right'>
                  <button
                    type='submit'
                    className='mwd-submit-btn'
                  >Enviar</button>
                </div>
              </form>
          </div>
        </div>
      </div>
        
    </>
  )
}

export default PasswordRecover;
