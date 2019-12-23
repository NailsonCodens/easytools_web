import React from 'react';
import { useFormik } from 'formik';
import { Form, Input, Textarea } from '@rocketseat/unform';
import { Field, Label } from '../../../../../components/Form/Form';
import { Button } from '../../../../../components/Form/Button';
import { Warningtext } from '../../../../../components/Warningtext';
import { Span } from '../../../../../components/Span';

const Basic = ({nextStep, handleChange, values}) => {
  console.log(values)
  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
    },

    onSubmit: value => {
      console.log(value)
    }
  })

  const saveAndContinue = (e) => {
    e.preventDefault()
    nextStep()
  }

  return (
    <>
      <p>Basic</p>
      <Form noValidate>
        <Field>
          <Label className="label-perfil" for={'title'}>
            <b>Título</b>
          </Label>
          <Input
            name="title"
            type="text"
            placeholder=""
            className={formik.touched.title && formik.errors.title ? 'input border-warning' : 'input'}
            onChange={event => handleChange('title', event)}
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
            className={formik.touched.description && formik.errors.description ? 'input border-warning' : 'input textarea-multiline'}
            onChange={event => handleChange('description', event)}
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
          className={'button color-logo-lessor'}
          text={'Salvar Alterações pessoais'}
          onClick={saveAndContinue}
        />
      </Form>
    </>
  )
}

export default Basic;