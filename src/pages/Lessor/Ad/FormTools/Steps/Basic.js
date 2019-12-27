import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Form, Input } from '@rocketseat/unform';
import { Field, Label } from '../../../../../components/Form/Form';
import { Button } from '../../../../../components/Form/Button';
import { SubTitlepages } from '../../../../../components/Titles/SubTitlepages';
import { Span } from '../../../../../components/Span';
import Scrool from '../../../../../utils/scroll';

const Basic = ({nextStep, handleChange, values}) => {
  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
    },
    validationSchema: Yup.object({
      title: Yup.string()
        .required('Título é obrigatório.'),
      description: Yup.string()
        .required('Descrição é obrigatório.'),
    }),
    onSubmit: value => {
      nextStep()
    }
  })

  if (values.title !== '' ) {
    formik.values.title = values.title
  }

  if (values.description !== '') {
    formik.values.description = values.description
  }

  const handleChangeBasic = (input, event) => {
    switch(input){
      case 'title': 
        formik.values.title = event.target.value
        break;
      case 'description':
          formik.values.description = event.target.value
        break;
      default:
        return '';
    }

    handleChange(input, event.target.value)
  }

  return (
    <>
      <SubTitlepages>Você está preste a anunciar um equipamento, vamos lá?</SubTitlepages>
      <br></br>
      <Form 
        onSubmit={ (e, values) => {
          Scrool(100, 100);
          formik.handleSubmit(values)
        }} 
        noValidate
      >
        <Field>
          <Label className="label-perfil" for={'title'}>
            <b>Título</b>
          </Label>
          <Input
            name="title"
            type="text"
            placeholder="Furadeira de parede"
            className={formik.touched.title && formik.errors.title ? 'input border-warning' : 'input'}
            onChange={event => handleChangeBasic('title', event)}
            value={values.title}
          />
          <Span className={'validation-warning'}>
            {
              formik.touched.title && formik.errors.title 
            ? 
              (<div>{formik.errors.title}</div>) 
            : 
              null
            }
          </Span>
        </Field>
        <Field>
          <Label className="label-perfil" for={'description'}>
            <b>Descrição</b>
          </Label>
          <Input multiline
            name="description"
            type="text"
            placeholder="Descrição da ferramenta ou equipamento que você está alugando"
            className={formik.touched.description && formik.errors.description ? 'input border-warning textarea-multiline' : 'input textarea-multiline'}
            onChange={event => handleChangeBasic('description', event)}
            value={values.description}
          />
          <Span className={'validation-warning'}>
            {
              formik.touched.description && formik.errors.description 
            ? 
              (<div>{formik.errors.description}</div>) 
            : 
              null
            }
          </Span>
        </Field>
        <Button
          type={'submit'}
          className={'button color-logo-lessor is-pulled-right'}
          text={'Salvar e Prosseguir'}
        />
      </Form>
    </>
  )
}

export default Basic;