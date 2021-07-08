import React, { useEffect, useState }  from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Form, Input } from '@rocketseat/unform';
import { Field, Label } from '../../../../../components/Form/Form';
import { Button } from '../../../../../components/Form/Button';
import { SubTitlepages } from '../../../../../components/Titles/SubTitlepages';
import { Span } from '../../../../../components/Span';
import Scrool from '../../../../../utils/scroll';
import Select from 'react-select';
import api from '../../../../../services/api';

const Basic = ({nextStep, handleChange, values}) => {
  const [adons, setAdons] = useState([]);


  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      adons: '',
    },
    validationSchema: Yup.object({
      title: Yup.string()
        .required('Título é obrigatório.'),
      name: Yup.string()
        .required('O nome é obrigatório'),
      description: Yup.string()
        .required('Descrição é obrigatório.'),
    }),
    onSubmit: value => {
      // eslint-disable-next-line
      nextStep("#"+"brand")
    }
  })

  const list = [
    { value: "Bricolagem", label: "Bricolagem" },
    { value: "Construcao", label: "Construção" },
    { value: "Demolição", label: "Demolição" },
    { value: "Limpeza", label: "Limpeza" },
    { value: "Jardinagem", label: "Jardinagem" },
    { value: "Estrutura", label: "Estrutura" },
    { value: "Corte", label: "Corte" },
    { value: "Perfuração", label: "Perfuração" },
    { value: "Polimento", label: "Polimento" },
    { value: "Kit Hibrido", label: "Kit Híbrido" },
    { value: "Kit Limpeza", label: "Kit Limpeza" },
  ];

  var ev = '';

  if (values.title !== '' ) {
    formik.values.title = values.title
  }


  if (values.name !== '') {
    formik.values.name = values.name
  }

  if (values.description !== '') {
    formik.values.description = values.description
  }

  console.log(values.adons === '')

  if (values.adons !== '') {
    formik.values.adons = values.adons
  }


  const handleChangeBasic = (input, event) => {
    let ev = ''
    if (input == 'adons') {
      ev = event
    }else{
      ev = event.target.value
    }

    switch(input){
      case 'title':
        formik.values.title = ev
        break;
      case 'name':
        formik.values.name = ev
        break;
      case 'description':
          formik.values.description = ev
        break;
      case 'adons':
        var ad = [];
        if (ev !== null) {
          ev.map(function(adons){
            var selectadons = adons.value + '=' + adons.label

            ad.push(selectadons)
          })
          ev = ad.toString()
        }
        formik.values.adons = ev
        break;
      default:
        return '';
    }

    handleChange(input, ev)
  }

  const CustomClearText = () => 'clear all';

  const ClearIndicator = props => {
    const {
      children = <CustomClearText />,
      getStyles,
      innerProps: { ref, ...restInnerProps },
    } = props;
    return (
      <div
        {...restInnerProps}
        ref={ref}
        style={getStyles('clearIndicator', props)}
      >
        <div style={{ padding: '0px 5px' }}>{children}</div>
      </div>
    );
  };

  const Menu = props => {
    console.log(props)
    return (
      <div {...props.innerProps} className="line-select-adons">
          <div className="columns" {...props}>
            <div className="column is-2 box-img-select">
              <img src={ props.data.url } alt="EasyTools adons" className="easyadonsselect"/>
            </div>
            <div className="column">
              <p className="text-select-adons">{props.children}</p>
            </div>
          </div>
      </div>
    );
  };

  const CustomOption = ({ innerProps, isDisabled, options }) =>
  !isDisabled ? (
    <div {...innerProps}>{
      <>
      <div className="columns">
        <div className="column is-2  box-img-select">
          {/*
            <img src={ adons.url } alt="EasyTools adons" className="easyadonsselect"/>
          */}
        </div>
        <div className="column">
          <p>{console.log(options)}</p>
        </div>
      </div>
    </>

     /* adons.map(adons => (
        <>
          <div className="columns">
            <div className="column is-2  box-img-select">
              {
                <img src={ adons.url } alt="EasyTools adons" className="easyadonsselect"/>
              }
             </div>
            <div className="column">
              <p>{adons.label}</p>
            </div>
          </div>
        </>
      )  )*/
    }</div>
  ) : null;


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
          <Label className="label-perfil" for={'name'}>
            <b>Nome</b>
          </Label>
          <Input
            name="title"
            type="text"
            placeholder="Furadeira de parede"
            className={formik.touched.name && formik.errors.name ? 'input border-warning' : 'input'}
            onChange={event => handleChangeBasic('name', event)}
            value={values.name}
          />
          <Span className={'validation-warning'}>
            {
              formik.touched.name && formik.errors.name
                ?
                (<div>{formik.errors.name}</div>)
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
        <br/><br/>
      </Form>
    </>
  )
}

export default Basic;
