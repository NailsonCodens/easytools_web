import React, { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";
import queryString from 'query-string';
import api from '../../../services/api';
import { useFormik } from 'formik';
import { Form, Input } from '@rocketseat/unform';
import { Button } from '../../../components/Form/Button';
import { Field, Label } from '../../../components/Form/Form';

const Lessor = () => {
  let values = queryString.parse(useLocation().search);
  const [iduser, setIduser] = useState('');
  const [lessor, setDatalessor] = useState([]);

  const formik = useFormik({
    initialValues: {
      brand: '',
      category: '',
      
      type_spec: '',
      feed: '',
      power: '',
      tension1: '',
      tension2: '',
      follow: '',
      accessory: '',
    },

    onSubmit: value => {

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

  const handleChangeMessage = () => {
    console.log('asdasd')
  }

  const sendMessage = () => {
    console.log('send')
  }

  return (
    <div className="container">
      <br/>
      <p className="title-infos-tool hack-padding-top">Locador</p>
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
              className={'input textarea-multiline'}
              onChange={event => handleChangeMessage('message', event)}
              value={values.description}
            />
          </Field>
          <Field>
            <Button 
              type={'button'}
              className={'button is-link is-pulled-left'}
              text={'Conversar'}                                    
              onClick={event => sendMessage()}
              />
          </Field>
        </Form>  
      </div>
    </div>
  );
};

export default Lessor;