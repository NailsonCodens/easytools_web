import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import queryString from 'query-string'

import { Form, Input } from '@rocketseat/unform';
import { Field, Label } from '../../components/Form/Form';
import { Button } from '../../components/Form/Button';
import { Warningtext } from '../../components/Warningtext';

import logo_blue from '../../assets/images/logo_blue.png';
import logo_yellow from '../../assets/images/logo.png';

import './style.css';

export default function Singup() {  
  let type = queryString.parse(useLocation().search).type;
  let logo = logo_yellow;

  logo = type === 'lessor' ? logo_blue : logo;

  function handleSubmit(data) {
    console.log(data);
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
                <Form onSubmit={handleSubmit}>
                  <Field class={'field'}>
                    <Label for={'email'}>
                      <Input name="email" type="email" placeholder="E-mail" className="input"/>
                    </Label>
                  </Field>
                  <Field class={'field'}>
                    <Label for={'name'}>
                      <Input name="name" type="text" placeholder="Nome" className="input"/>
                    </Label>
                  </Field>
                  <Field class={'field'}>
                    <Label for={'lastname'}>
                      <Input name="lastname" type="text" placeholder="Sobrenome" className="input"/>
                    </Label>
                  </Field>
                  <Field class={'field'}>
                    <Label for={'password'}>
                      <Input name="password" type="password" placeholder="Crie sua senha" className="input"/>
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
                      <Button class={'button is-fullwidth color-logo'} text={'Cadastre-se'}/>
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
