import React from 'react';
import { useFormik } from 'formik';
import { Form, Input, Textarea } from '@rocketseat/unform';
import { Field, Label } from '../../../../../components/Form/Form';
import { Button } from '../../../../../components/Form/Button';
import { Warningtext } from '../../../../../components/Warningtext';
import { SubTitlepages } from '../../../../../components/Titles/SubTitlepages';
import { Span } from '../../../../../components/Span';

const Branc = ({nextStep, handleChange, prevStep, values}) => {
  const formik = useFormik({
    initialValues: {
      brand: '',
      category: '',
      type_spec: '',
    },

    onSubmit: value => {
      console.log(value)
    }
  })

  const saveAndContinue = (e) => {
    e.preventDefault()
    nextStep()
  }

  const back = (e) => {
    e.preventDefault();
    prevStep();
  }

  return (
    <>
      <SubTitlepages>Adicione as informações como marca do equipamento, categoria e para que usar.</SubTitlepages>
      <br></br>
      <Form noValidate>
        <Field>
          <Label className="label-perfil" for={'brand'}>
            <b>Marca do equipamento</b>
          </Label>
          <Input
            name="brand"
            type="text"
            placeholder=""
            className={formik.touched.brand && formik.errors.brand ? 'input border-warning' : 'input'}
            onChange={event => handleChange('brand', event)}
            value={values.brand}
          />
          <Span className={'validation-warning'}>
            {
              formik.touched.brand && formik.errors.brand 
            ? 
              (<div>{formik.errors.brand}</div>) 
            : 
              null
            }
          </Span>
        </Field>
        <Button
          type={'submit'}
          className={'button color-logo-lessor'}
          text={'Salvar Alterações da marca'}
          onClick={saveAndContinue}
        />
        <Button
          type={'submit'}
          className={'button color-logo-lessor'}
          text={'voltar'}
          onClick={back}
        />
      </Form>
    </>
  )
}

export default Branc;