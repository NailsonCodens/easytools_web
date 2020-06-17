import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Form, Input } from '@rocketseat/unform';
import { Field, Label } from '../../../../../components/Form/Form';
import { Button, CheckboxIOS } from '../../../../../components/Form/Button';
import { SubTitlepages } from '../../../../../components/Titles/SubTitlepages';
import { Hr } from '../../../../../components/Hr';
import Scroll from '../../../../../utils/scroll';
import CurrencyInput from 'react-currency-input';
import { Span } from '../../../../../components/Span';
import 'bulma-slider/dist/css/bulma-slider.min.css';
import Slider from 'react-input-slider';
import ScrollableAnchor from 'react-scrollable-anchor'
import {IntlProvider, FormattedNumber } from 'react-intl';
const Additionals = ({nextStep, handleChange, prevStep, values}) => {
  const [state, setState] = useState({ x: 30});

  const formik = useFormik({
    initialValues: {
      use_indication: '',
      price1: '',
      price2: '',
      price3: '',
      price4: '',
      insurance: '',
      delivery: '',
      contract: '',
      devolution: '',
    },
    validationSchema: Yup.object({
      price1: Yup.string().required('Adicione o valor da diária por favor.')
    }),
    onSubmit: value => {
      nextStep()
    }
  })

  const back = (e) => {
    e.preventDefault();
    Scroll(100, 100);
    prevStep();
  }

  const choosePrice1 = (state, x) => {
    setState(state, x)
    values.price1 = state.x
  }

  const handleChangeAdditionals = (input, event, type) => {
    let ev = ''
    if (type === 'select') {
      ev = event.value
    } else if (type === 'checkbox') {
      ev = event.target
    } else if (type === 'price') {
      ev = event
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
      case 'price4': 
        formik.values.price4 = ev
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
      default:
        return '';
    }
    handleChange(input, ev)
  }

  if (values.price1 !== '' ) {
    formik.values.price1 = values.price1
  }

  return (
    <>
      <ScrollableAnchor id={'3'}>
      <div> </div>
      </ScrollableAnchor>
      <SubTitlepages>Estamos quase terminando. Adicione as informações o aluguel do equipamento.</SubTitlepages>
      <br></br>
      <Form
        onSubmit={ (e, values) => {
          Scroll(100, 100)
          formik.handleSubmit(values)
        }} 
        noValidate
      >
        <div className="columns columns-address">
          <div className="column">
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
          </div>
        </div>
        <div className="columns margin-title-price column-address">
          <div className="column">
            <Label className="label-perfil" for={'price1'}>
              <SubTitlepages>Preço R$</SubTitlepages>
            </Label>
          </div>
        </div>
        <div className="columns column-address">
          <div className="column">
            <Field>
              <Label className="label-perfil" for={'price1'}>
                <b>Diária</b>
              </Label>
              <br/>
              <CurrencyInput
                name="price1"
                type="text"
                decimalSeparator="," thousandSeparator="."
                placeholder="R$ 50,00"
                className={formik.touched.price1 && formik.errors.price1 ? 'input border-warning is-small' : 'input is-small'}
                onChange={event => handleChangeAdditionals('price1', event, 'price')}
                value={values.price1}
              />
              <Span className={'validation-warning'}>
                {
                  formik.touched.price1 && formik.errors.price1 
                ? 
                  (<div>{formik.errors.price1}</div>) 
                : 
                  null
                }
              </Span>                 
              {
                
                /*                
             <span className="km-text">
                    <IntlProvider locale="pt-br" timeZone="Brasil/São Paulo">
                      <FormattedNumber value={state.x} style="currency" currency="BRL"/>
                    </IntlProvider>
                  </span>
                  <Slider
                    xstep={1}
                    xmin={30}
                    xmax={40}
                    axis="x"
                    x={state.x}
                    onChange={x => choosePrice1(x)}
                  />
                  <br/><br/>
                
                */
              } 
            </Field>
          </div>
          <div className="column">
            <Field>
              <Label className="label-perfil" for={'price2'}>
                <b>Semanal</b>
              </Label>
              <CurrencyInput
                name="price2"
                type="text"
                decimalSeparator="," thousandSeparator="."
                placeholder="R$ 150,00"
                className={formik.touched.price2 && formik.errors.price2 ? 'input border-warning' : 'input'}
                onChange={event => handleChangeAdditionals('price2', event, 'price')}
                value={values.price2}
              />
            </Field>
          </div>
        </div>
        <div className="columns">
        <div className="column">
            <Field>
              <Label className="label-perfil" for={'price3'}>
                <b>Quinzenal</b>
              </Label>
              <CurrencyInput
                name="price3"
                type="text"
                decimalSeparator="," thousandSeparator="."
                placeholder="R$ 100,00"
                className={formik.touched.price3 && formik.errors.price3 ? 'input border-warning' : 'input'}
                onChange={event => handleChangeAdditionals('price3', event, 'price')}
                value={values.price3}
              />
            </Field>           
          </div>
          <div className="column">
            <Field>
              <Label className="label-perfil" for={'price4'}>
                <b>Mensal</b>
              </Label>
              <CurrencyInput
                name="price4"
                type="text"
                decimalSeparator="," thousandSeparator="."
                placeholder="R$ 150,00"
                className={formik.touched.price4 && formik.errors.price4 ? 'input border-warning' : 'input'}
                onChange={event => handleChangeAdditionals('price4', event, 'price')}
                value={values.price4}
              />
            </Field>
          </div>
        </div>
        <Hr/>
        {
          /*
        <b>Informações o aluguel do equipamento ou ferramenta</b>
        <br/><br/>

          <div className="columns column-address">
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
          <br/>
          <div className="columns">
            <div className="column">
              <div className="offer">  
                <Label className="label-perfil" for={'delivery'}>
                  <p>Entrega</p>
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
        */
        }
        <Button
          type={'button'}
          className={'button color-logo-lessor is-pulled-right'}
          text={'voltar'}
          onClick={back}
        />
        <Button
          type={'submit'}
          className={'button color-logo-lessor back-form is-pulled-right'}
          text={'Salvar e Prosseguir'}
        />
        <br/><br/>
      </Form>
    </>
  )
}

export default Additionals;