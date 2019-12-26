import React from 'react';
import { useFormik } from 'formik';
import { Form, Input } from '@rocketseat/unform';
import { Field, Label } from '../../../../../components/Form/Form';
import { Button, CheckboxIOS } from '../../../../../components/Form/Button';
import { SubTitlepages } from '../../../../../components/Titles/SubTitlepages';
import { Hr } from '../../../../../components/Hr';

const Additionals = ({nextStep, handleChange, prevStep, values}) => {
  console.log(values.devolution)
  const formik = useFormik({
    initialValues: {
      use_indication: '',
      prices1: '',
      prices2: '',
      prices3: '',
      insurance: '',
      delivery: '',
      contract: '',
      devolution: '',
    },

    onSubmit: value => {
      nextStep()
    }
  })

  const back = (e) => {
    e.preventDefault();
    prevStep();
  }

  const handleChangeAdditionals = (input, event, type) => {
    let ev = ''
    if (type === 'select') {
      ev = event.value
    } else if (type === 'checkbox') {
      ev = event.target
    } else {
      ev = event.target.value
    }

    switch(input){
      case 'brand': 
        formik.values.brand = ev
        break;
      case 'use_indication': 
        formik.values.use_indication = ev
        break;
      case 'price1': 
        formik.values.price1 = ev
        break;
      case 'price2': 
        formik.values.price2 = ev
        break;
      case 'price3': 
        formik.values.price3 = ev
        break;
      case 'contract':
        formik.values.contract = ev
        break;
      case 'insurance': 
        formik.values.insurance = ev
        break;
      case 'delivery': 
        formik.values.delivery = ev
        break;
      case 'devolution': 
        formik.values.devolution = ev
        break;
    }
    handleChange(input, ev)
  }

  return (
    <>
      <SubTitlepages>Estamos quase terminando. Adicione as informações o aluguel do equipamento.</SubTitlepages>
      <br></br>
      <Form
        onSubmit={ (e, values) => {
          formik.handleSubmit(values)
        }} 
        noValidate
      >
        <Field>
          <Label className="label-perfil" for={'use_indication'}>
            <b>Indicação de uso</b>
          </Label>
          <Input
            name="use_indicate"
            type="text"
            placeholder="Ex: Uso para madeiras e chapadas finas de alumínio"
            className={formik.touched.use_indication && formik.errors.use_indication ? 'input border-warning' : 'input'}
            onChange={event => handleChangeAdditionals('use_indication', event)}
            value={values.use_indication}
          />
        </Field>
        <div className="columns margin-title-price">
          <div className="column">
            <Label className="label-perfil" for={'price1'}>
              <SubTitlepages>Preço R$</SubTitlepages>
            </Label>
          </div>
        </div>
        <div className="columns">
          <div className="column">
            <Field>
              <Label className="label-perfil" for={'price1'}>
                <b>Diária</b>
              </Label>
              <Input
                name="price1"
                type="text"
                placeholder="R$ 50,00"
                className={formik.touched.price1 && formik.errors.price1 ? 'input border-warning' : 'input'}
                onChange={event => handleChangeAdditionals('price1', event)}
                value={values.price1}
              />
            </Field>
          </div>
          <div className="column">
            <Field>
              <Label className="label-perfil" for={'price2'}>
                <b>Quinzenal</b>
              </Label>
              <Input
                name="price2"
                type="text"
                placeholder="R$ 100,00"
                className={formik.touched.price2 && formik.errors.price2 ? 'input border-warning' : 'input'}
                onChange={event => handleChangeAdditionals('price2', event)}
                value={values.price2}
              />
            </Field>           
          </div>
          <div className="column">
            <Field>
              <Label className="label-perfil" for={'price3'}>
                <b>Mensal</b>
              </Label>
              <Input
                name="price3"
                type="text"
                placeholder="R$ 150,00"
                className={formik.touched.use_indication && formik.errors.price3 ? 'input border-warning' : 'input'}
                onChange={event => handleChangeAdditionals('price3', event)}
                value={values.price3}
              />
            </Field>
          </div>
        </div>
        <Hr/>
        <b>Informações o aluguel do equipamento ou ferramenta</b>
        <br/><br/>
        <div className="columns">
          <div className="column">
            <div className="offer">  
              <Label className="label-perfil" for={'contract'}>
                <p>Contrato</p>
              </Label> 
              <CheckboxIOS 
                onChange={event => handleChangeAdditionals('contract', event, 'checkbox')}
                name="contract"
                value={values.contract}
                bind="checkcontract" 
                id="checkcontract"
                ch={values.contract === 'Y' ? true : false}
                off="Não" 
                on="Sim"
              />
            </div>
          </div>
          <div className="column">
            <div className="offer">  
              <Label className="label-perfil" for={'price3'}>
                <p>Seguro</p>
              </Label> 
              <CheckboxIOS 
                onChange={event => handleChangeAdditionals('insurance', event, 'checkbox')}
                name="insurance"
                value={values.insurance}
                bind="checkinsurance" 
                ch={values.insurance === 'Y' ? true : false}
                id="checkinsurance" 
                off="Não" 
                on="Sim"
              />
            </div>
          </div>
        </div>
        <div className="columns">
          <div className="column">
            <div className="offer">  
              <Label className="label-perfil" for={'delivery'}>
                <p>Delivery</p>
              </Label> 
              <CheckboxIOS 
                onChange={event => handleChangeAdditionals('delivery', event, 'checkbox')}
                name="check_delivery"
                value={values.delivery}
                bind="checkdelivery" 
                ch={values.delivery === 'Y' ? true : false}
                id="checkdelivery" 
                off="Não" 
                on="Sim"
              />
            </div>
          </div>
          <div className="column">
            <div className="offer">  
              <Label className="label-perfil" for={'devolution'}>
                <p>Devolução</p>
              </Label> 
              <CheckboxIOS 
                onChange={event => handleChangeAdditionals('devolution', event, 'checkbox')}
                name="check_devolution"
                value={values.devolution}
                bind="checkdevolution"
                ch={values.devolution === 'Y' ? true : false}
                id="checkdevolution" 
                off="Não" 
                on="Sim"
              />
            </div>
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

export default Additionals;