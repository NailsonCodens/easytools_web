import React from 'react';
import { useFormik } from 'formik';
import { Form, Input } from '@rocketseat/unform';
import { Field, Label } from '../../../../../components/Form/Form';
import Select from 'react-select';
import { Button } from '../../../../../components/Form/Button';
import { SubTitlepages } from '../../../../../components/Titles/SubTitlepages';
import { Span } from '../../../../../components/Span';

import categories from '../../../../../utils/categories';
import feeds from '../../../../../utils/feeds';

const Branc = ({nextStep, handleChange, prevStep, values}) => {
  console.log(values)
  const formik = useFormik({
    initialValues: {
      brand: '',
      category: '',
      type_spec: '',
      feed: '',
      power: '',
      tension: '',
    },

    onSubmit: value => {
      nextStep()
    }
  })

  const back = (e) => {
    e.preventDefault();
    prevStep();
  }

  const handleChangeBrand = (input, event, type) => {
    let ev = ''
    type === 'select' ? ev = event.value : ev = event.target.value

    switch(input){
      case 'brand': 
        formik.values.brand = ev
        break;
      case 'type_spec': 
        formik.values.type_spec = ev
        break;
      case 'category': 
        formik.values.category = ev
        break;
      case 'power': 
        formik.values.power = ev
        break;
      case 'tension': 
        formik.values.tension = ev
        break;

    }

    handleChange(input, ev)
  }

  return (
    <>
      <SubTitlepages>Adicione as informações como marca do equipamento, categoria e para que usar.</SubTitlepages>
      <br></br>
      <Form
        onSubmit={ (e, values) => {
          formik.handleSubmit(values)
        }} 
        noValidate
      >
        <Field>
          <Label className="label-perfil" for={'brand'}>
            <b>Marca do equipamento</b>
          </Label>
          <Input
            name="brand"
            type="text"
            placeholder=""
            className={'input'}
            onChange={event => handleChangeBrand('brand', event)}
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
        <div className="columns">
          <div className="column">
            <Field>
              <Label className="label-perfil" for={'type_spec'}>
                <b>Tipo</b>
              </Label>
              <Input
                name="type_spec"
                type="text"
                placeholder=""
                className={'input'}
                onChange={event => handleChangeBrand('type_spec', event)}
                value={values.type_spec}
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
          </div>
          <div className="column">
            <Field className={'field'}>
              <Label for={'category'}>
                <b>Categoria</b>
              </Label>
              <Select
                className={''}
                options={categories}
                isSearchable={true}
                placeholder={'Cortante'}
                onChange={selectedOption => {
                  handleChangeBrand('category', selectedOption, 'select');
                  formik.handleChange("category");
                }}
              />
            </Field>
          </div>
        </div>
        <div className="columns">
        <div className="column">
          <Field className={'field'}>
            <Label for={'feeding'}>
              <b>Alimentação</b>
            </Label>
            <Select
              className={''}
              options={feeds}
              isSearchable={true}
              placeholder={'Energia elétrica'}
              onChange={selectedOption => {
                handleChangeBrand('feed', selectedOption, 'select');
                formik.handleChange("feed");
              }}
            />
          </Field>
          </div>
          <div className="column">
            <Field>
              <Label className="label-perfil" for={'power'}>
                <b>Potência</b>
              </Label>
              <Input
                name="power"
                type="text"
                placeholder=""
                className={'input'}
                onChange={event => handleChangeBrand('power', event)}
                value={values.power}
              />
              <Span className={'validation-warning'}>
                {
                  formik.touched.power && formik.errors.power 
                ? 
                  (<div>{formik.errors.power}</div>) 
                : 
                  null
                }
              </Span>
            </Field>
          </div>
          <div className="column">
            <Field>
              <Label className="label-perfil" for={'tension'}>
                <b>Tensão</b>
              </Label>
              <Input
                name="tension"
                type="text"
                placeholder=""
                className={'input'}
                onChange={event => handleChangeBrand('tension', event)}
                value={values.tension}
              />
              <Span className={'validation-warning'}>
                {
                  formik.touched.tension && formik.errors.tension 
                ? 
                  (<div>{formik.errors.tension}</div>) 
                : 
                  null
                }
              </Span>
            </Field>
          </div>
        </div>
        <Button
          type={'button'}
          className={'button color-logo-lessor is-pulled-right'}
          text={'voltar'}
          onClick={back}
        />
        <Button
          type={'submit'}
          className={'button color-logo-lessor back-form is-pulled-right'}
          text={'Salvar Alterações da marca'}
        />
      </Form>
    </>
  )
}

export default Branc;