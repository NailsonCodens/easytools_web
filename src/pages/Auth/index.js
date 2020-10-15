import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import {Auth} from '../../store/actions/auth';
import FacebookLogin from 'react-facebook-login';
import { Link } from 'react-router-dom';
import moment from 'moment';
import 'moment/locale/pt-br';
import { Form, Input } from '@rocketseat/unform';
import { Field, Label } from '../../components/Form/Form';
import { Button } from '../../components/Form/Button';
import { Span } from '../../components/Span';
import Modal from '../../components/Modal';
import Notification from '../../utils/notification';
import api from '../../services/api';
import { login } from '../../services/auth';

import * as Yup from 'yup';
import { useFormik } from 'formik';

import scrollTop from '../../utils/scroll';

import './style.css';
 
const Signin = ({ hs, url, closeModal }) => {
  const dispatch = useDispatch();
  const currentuser = useSelector(state => state.auth);

  const [nologin, setNologin] = useState(false);

  const infochoose = useSelector(state => state.rentaltool);
  const rentattempt = useSelector(state => state.rentattempt);

  const success = () => Notification(
    'success',
    'Tudo pronto, vamos prosseguir?', 
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
        scrollTop()
      } else {
        scrollTop()
        window.location.href = '/'
        //hs.push("/");
      }
      scrollTop()
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

      if (url === 'authproduct') {
        saveAttempt(id)  
      } else {
        window.location.href = '/'
      }

      scrollTop()
      closeModal();
    })
    .catch((error) => {
    })
  }

  async function saveAttempt(id){
    var info = JSON.parse(localStorage.getItem('@lkst'));
    var rentattempt = JSON.parse(localStorage.getItem('@obr'));

    const response = await api.get(`/tools_site/tool/${info.tool}`, {
    });

    var useridt =  response.data.tool[0].user_id

    var attempt = {
      user_lessor_id: useridt,
      tool_id: info.tool,
      startdate: moment(info.start).format('YYYY-MM-DD'),
      enddate: moment(info.end).format('YYYY-MM-DD'),
      tension: rentattempt.tension || '-',
      days: rentattempt.amount,
      month: rentattempt.amountmonth || 0,
      amount: info.am,
      period: rentattempt.type,
      price: rentattempt.priceNoamount.toFixed(2),
      cost: rentattempt.pricefull,
      priceperiod: rentattempt.price.toFixed(2),
      freight: 0,
      accept: 0,
    }

    if (attempt.month > 0 && attempt.days > 0){
      window.location.href = '/'
      console.log('sem mes e sem data')
      //Tracking('Tentativa de aluguel maior com mêses e dias falha', `Tentativa de aluguel maior com mêses e dias`, 'Tentativa de aluguel maior com mêses e dias')
    } else {

      await api.post('rent/attempt/add/', attempt, {})
      .then((res) => {
        var idbooking = res.data.rentattempt.idf
        var codeattempt = res.data.rentattempt.codeattempt
        scrollTop()
        //Tracking('Tentativa de aluguel', ` Tentativa de aluguel criada idbooking: ${idbooking} codeattempt: ${codeattempt}`, 'Tentativa de aluguel')
        success()
        hs.push(`/s/payment/rent-rules?rent_attempt=${idbooking}&init=${attempt.startdate}&finish=${attempt.enddate}&tool=${attempt.tool_id}&am=${attempt.amount}&tension=${attempt.tension}&code_attempt=${codeattempt}`)
      }).catch((err) => {
        window.location.href = '/'
        console.log(err.response)
      })
    }
  }

  async function authFacebook(response, fb, newuserfb) {
    await api.post('auth/token/', { email: fb.email, passwordfb: process.env.REACT_APP_LGFACEBOOK}, {})
    .then((res) => {
      let { id, email, name, type } = res.data.user;
      let { token } = res.data;
      setNologin(false)
      dispatch(Auth(email, name, type, token, id));

      login(token, type); 

      if (url === 'authproduct') {
        saveAttempt(id)      
      } else {
        window.location.href = '/'
      }

/*
      if (url !== undefined) {
        scrollTop()
      } else {
        scrollTop()
        hs.push("/");
      }*/
      scrollTop()
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
      }).catch((err) => {
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
    scrollTop()
    closeModal();
  */

  const responseFacebook = (response) => {
    getUser(response);
  }

  const goRegister = () => {
    scrollTop()
    localStorage.setItem('@link', document.URL)
    if (url === 'authproduct'){
      hs.push('/signup?redirect=backp')
    }else{
      hs.push('/signup')      
    }
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
                  scrollTop();
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
                    appId={process.env.NODE_ENV === 'production' ? process.env.REACT_APP_IDFACEBOOK_BUILD : process.env.REACT_APP_IDFACEBOOK_DEV }
                    autoLoad={false}
                    disableMobileRedirect={true}
                    isMobile={false}
                    //redirectUri={'https://easytoolsapp.com/'}
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
            <p onClick={event => goRegister()} className="button is-fullwidth is-info"><Span className="button-enter">Cadastre-se</Span></p>
          </div>
          <div className="has-text-centered mwd-opacity-low">
            <Span>Esqueci minha senha! </Span>
            <a onClick={event => scrollTop()} href="/password-recover"><Span className="button-enter2">Recuperar Senha.</Span></a>
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