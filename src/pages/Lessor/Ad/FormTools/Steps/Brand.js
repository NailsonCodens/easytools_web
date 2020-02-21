import React from 'react';
import { useFormik } from 'formik';
import { Form, Input } from '@rocketseat/unform';
import { Field, Label } from '../../../../../components/Form/Form';
import Select from 'react-select';
import { Button } from '../../../../../components/Form/Button';
import { SubTitlepages } from '../../../../../components/Titles/SubTitlepages';
import { Span } from '../../../../../components/Span';
import Scroll from '../../../../../utils/scroll';

import categories from '../../../../../utils/categories';
import feeds from '../../../../../utils/feeds';

const Brand = ({nextStep, handleChange, prevStep, values}) => {

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
      nextStep()
    }
  })

  const back = (e) => {
    e.preventDefault();
    Scroll(100, 100);
    prevStep();
  }

  const handleChangeBrand = (input, event, type) => {
    let ev = ''

    if (type === 'checkbox') {
      if (input === 'tension1') {
        ev = event.target.checked === true ? '127V' : ''
      } else if (input === 'tension2') {
        ev = event.target.checked === true ? '220V' : ''
      }
    } else if (type === 'radio') {
      ev = event.target.checked === true ? 'Tri' : ''
    }
      else {
      type === 'select' ? ev = event.value : ev = event.target.value
    }
    switch(input){
      case 'brand': 
        formik.values.brand = ev
        break;
      case 'type_spec': 
        formik.values.type_spec = ev
        break;
      case 'feed': 
        formik.values.feed = ev
        break;
        case 'category': 
        formik.values.category = ev
        break;
      case 'power': 
        formik.values.power = ev
        break;
      case 'tension1': 
        formik.values.tension1 = ev
        break;
      case 'tension2': 
        formik.values.tension2 = ev
        break;
      case 'tension3': 
        formik.values.tension3 = ev
        break;
      case 'follow': 
        formik.values.follow = ev
        break;
      case 'accessory': 
        formik.values.accessory = ev
        break;
      default:
        return '';
    }
    handleChange(input, ev)
  }

  return (
    <>
      <SubTitlepages>Adicione as informações como marca do equipamento, categoria e para que usar.</SubTitlepages>
      <Form
        onSubmit={ (e, values) => {
          Scroll(100, 100);
          formik.handleSubmit(values)
        }} 
        noValidate
      > 
        <div className="columns column-address">
          <div className="column">
            <Field>
              {
                /*
                  <Input class="is-checkradio" id="exampleRadioInline1" type="radio" name="exampleRadioInline1" checked="checked"/>
                  <Label>Equipamentos e ferramentas em geral</Label>
                */
              }
              {
                /*
                  <Input class="is-checkradio" id="exampleRadioInline2" type="radio" name="exampleRadioInline2"/>
                  <Label>Manuais</Label>
                */  
              }

              {
                /*
                  <Input class="is-checkradio" id="exampleRadioInline2" type="radio" name="exampleRadioInline2"/>
                  <Label>Estrutura</Label> 
                */
              }
              {
                /*
                <Input class="is-checkradio" id="exampleRadioInline2" type="radio" name="exampleRadioInline2"/>
                <Label>Logistica</Label>
                */
              }
            </Field>
          </div>
        </div>
        <div className="columns">
          <div className="column">
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
                value={values.category}
              />
            </Field>
          </div>
        </div>
        <div className="columns column-address">
          {
          /*
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
          */
          }
        </div>
        <div className="columns column-address">
          <div className="column is-3">
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
                value={values.feed}
              />
            </Field>
          </div>
          <div className="column is-3">
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
              <br/>
              <Label className="checkbox padding-checkbox">
                <Input
                  name="tension1"
                  type="checkbox"
                  placeholder=""
                  checked={values.tension1 === '127V' ? true : false}
                  className={'checkbox check'}
                  onChange={event => handleChangeBrand('tension1', event, 'checkbox')}
                />
                <span>110V/127V </span> 
              </Label>
              <Label className="checkbox padding-checkbox">
                <Input
                  name="tension2"
                  type="checkbox"
                  placeholder=""
                  checked={values.tension2 === '220V' ? true : false}
                  className={'checkbox check'}
                  onChange={event => handleChangeBrand('tension2', event, 'checkbox')}
                />
                <span>220V </span> 
              </Label>
              <Label className="checkbox padding-checkbox">
                <Input
                  name="tension3"
                  type="radio"
                  placeholder=""
                  checked={values.tension3 === 'Tri' ? true : false}
                  className={'checkbox check'}
                  onChange={event => handleChangeBrand('tension3', event, 'radio')}
                />
                <span>ou Trifásico </span> 
              </Label>
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
        <div className="columns">
          <div className="column">
            <Field>
              <Label className="label-perfil" for={'accessory'}>
                <b>Acessórios</b>
              </Label>
              <Input
                name="accessory"
                type="text"
                placeholder="Ex: Carregador elétrico"
                className={'input'}
                onChange={event => handleChangeBrand('accessory', event)}
                value={values.accessory}
              />
              <Span className={'validation-warning'}>
                {
                  formik.touched.accessory && formik.errors.accessory 
                ? 
                  (<div>{formik.errors.accessory}</div>) 
                : 
                  null
                }
              </Span>
            </Field>
          </div>
          <div className="column">
            <Field>
              <Label className="label-perfil" for={'follow'}>
                <b>Vai junto</b>
              </Label>
              <Input
                name="follow"
                type="text"
                placeholder="Ex: Serrinhas de corte"
                className={'input'}
                onChange={event => handleChangeBrand('follow', event)}
                value={values.follow}
              />
              <Span className={'validation-warning'}>
                {
                  formik.touched.follow && formik.errors.follow 
                ? 
                  (<div>{formik.errors.follow}</div>) 
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
          text={'Salvar e Prosseguir'}
        />
      </Form>
    </>
  )
}

export default Brand;