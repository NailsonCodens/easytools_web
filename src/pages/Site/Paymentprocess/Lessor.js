import React, { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";
import queryString from 'query-string';
import api from '../../../services/api';
import { useFormik } from 'formik';
import { Form, Input } from '@rocketseat/unform';
import { Button } from '../../../components/Form/Button';
import { Field, Label } from '../../../components/Form/Form';
import * as Yup from 'yup';
import { Span } from '../../../components/Span';

const Lessor = () => {
  let values = queryString.parse(useLocation().search);
  const [iduser, setIduser] = useState('');
  const [lessor, setDatalessor] = useState([]);

  const formik = useFormik({
    initialValues: {
      message: '',
    },
    validationSchema: Yup.object({
      message: Yup.string()
        .required('Por favor, escreva uma mensagem para seu vizinho, mesmo que seja um Olá!'),
    }),

    onSubmit: value => {
      console.log('aa')
    }
  })
  
  useEffect(() => {
    async function loadData() { 
      const response = await api.get(`/tools_site/tool/${values.tool}`, {
      });
      setIduser(response.data.tool[0].user_id)
     }
    loadData();

    async function loadLessor() {
      const response = await api.get(`/tools_site/tool/${values.tool}`, {
      }); 
      setIduser(response.data.tool[0].user_id)

      const responseUser = await api.get(`/lessordata/${response.data.tool[0].user_id}`, {
      });
      setDatalessor(responseUser.data.user[0])
    }
    loadLessor();
  }, []);

  return (
    <div className="container">
      <br/>
      <p className="title-infos-tool hack-padding-top">Vizinho</p>
      <div className="column">
        <div className="is-pulled-left"> 
          <img src={lessor.url} alt={lessor.url} className="logo-neighbor"/>
        </div>
        <div className="is-pulled-left">
          <p className="name-renter-left padding-left-name">{ lessor.name } { lessor.last_name }</p>
        </div>
        <br/><br/><br/><br/><br/>
        <Form
          onSubmit={ (e, values) => {
            formik.handleSubmit(values)
          }} 
          noValidate
        > 
          <Field>
            <Label className="title-infos-tool hack-padding-top" for={'message'}>
              Envie uma mensagem ao locatário. Dúvidas, perguntas...
            </Label>
            <Input multiline
              name="mesage"
              type="text"
              placeholder={`Tire algumas duvidas com ${lessor.name !== undefined ? lessor.name : 'Locatário'}`}
              className={formik.touched.message && formik.errors.message ? 'input textarea-multiline border-warning' : 'input textarea-multiline'}
              onChange={event => formik.handleChange(event)}
              value={values.message}
            />
            <Span className={'validation-warning'}>
              {
                formik.touched.message && formik.errors.message 
              ? 
                (<div>{formik.errors.message}</div>) 
              : 
                null
              }
            </Span>
          </Field>
          <br/>
          <Field>
            <Button 
              type={'submit'}
              className={'button is-link is-pulled-left'}
              text={'Conversar'}
              />
          </Field>
        </Form>  
      </div>
    </div>
  );
};

export default Lessor;