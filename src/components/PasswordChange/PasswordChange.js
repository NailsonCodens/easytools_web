import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import api from '../../services/api';

import { Field, Label } from '../../components/Form/Form';
import './passwordChange.css';

const PasswordChange = (props) => {

  const formik = useFormik({
    initialValues: {
      password: '',
      newPassword: '',
      newPassword_match:''
    },
    onSubmit: (values, actions) => {
      actions.setSubmitting(true)

      api.put(`perfil/updatePassword/${props.userId}`, values, {})
      .then((res) => {

        if(res.status === 204){
          props.notSuccess();
        }

        if(res.status === 200){
          props.success('Senha alterada com sucesso!');
          actions.resetForm();
        }
        
      })
      .catch((err) => {
      })

      
    },
    validationSchema: Yup.object().shape({
      password: Yup.string()
        .required('Preencha sua senha atual.'),
      newPassword: Yup.string()
        .min(8, 'A nova senha deve conter no mínimo 8')
        .max(80, 'Por favor preencha uma senha com no máximo 80 caracteres.')
        .required('A nova senha não deve ser vazia.'),
      newPassword_match: Yup.string()
      .test('passwords-match', 'As senhas não conferem.', function(value) {
        return this.parent.newPassword === value;
      }),
    })
  })


  return (

    <form id={'passForm'} onSubmit={formik.handleSubmit}>

      <h3 className="title-box-inter">Alterar Senha</h3>

      <Label for={'password'}>
        <b>Senha Atual</b>
      </Label>
      <input
        id={'password'}
        name="password"
        type="password"
        className={formik.touched.password && formik.errors.password ? 'input border-warning' : 'input'}
        onChange={formik.handleChange}
        value={formik.values.password}
      />
      <span className={'validation-warning'}>
        {
          formik.touched.password && formik.errors.password 
        ? 
          (<div>{formik.errors.password}</div>) 
        : 
          null
        }
      </span>




      <Label for={'newPassword'}>
        <b>Nova Senha</b>
      </Label>
      <input
        id={'newPassword'}
        name="newPassword"
        type="password"
        className={formik.touched.newPassword && formik.errors.newPassword ? 'input border-warning' : 'input'}
        onChange={formik.handleChange}
        value={formik.values.newPassword}
      />
      <span className={'validation-warning'}>
        {
          formik.touched.newPassword && formik.errors.newPassword 
        ? 
          (<div>{formik.errors.newPassword}</div>) 
        : 
          null
        }
      </span>




      <Label for={'newPassword_match'}>
        <b>Repita a nova senha.</b>
      </Label>
      <input
        id={'newPassword_match'}
        name="newPassword_match"
        type="password"
        className={formik.touched.newPassword_match && formik.errors.newPassword_match ? 'input border-warning' : 'input'}
        onChange={formik.handleChange}
        value={formik.values.newPassword_match}
      />
      <span className={'validation-warning'}>
        {
          formik.touched.newPassword_match && formik.errors.newPassword_match 
        ? 
          (<div>{formik.errors.newPassword_match}</div>) 
        : 
          null
        }
      </span>















      <Field className="is-pulled-right space-bt">
        <button 
          type={'submit'}
          className={'mwd-button'}
          //onClick={formik.handleSubmit}
        >
          Alterar Senha
        </button>
      </Field>
    </form>
  )
}

export default PasswordChange;