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

  useEffect(() => {
    async function loadadons() { 
      const response = await api.get(`/adons`, {
      });

      var adonslisst = [];

      response.data.adons.map(function(adons){
        adonslisst.push({value: adons.id, label: adons.name, url: adons.url})
      })
      console.log(adonslisst)

      setAdons(adonslisst)
    }
    loadadons();
  }, []);


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

  const CustomOption = ({ innerProps, isDisabled }) =>
  !isDisabled ? (
    <div {...innerProps}>{
      adons.map(adons => (
        <>
          <div className="columns">
            <div className="column is-1">
              {
                <img src={ adons.url } alt="EasyTools adons" className="easyadonsselect"/>                
              }
            </div>
            <div className="column">
              <p>{adons.label}</p>
            </div>
          </div>
        </>
      )  )
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
        <Field className={'field'}>
          <Label for={'category'}>
            <b>Acessórios</b>
          </Label>
          <Select
            className={''}
            components={{ Option: CustomOption }}
            options={adons}
            isSearchable={true}
            isMulti
            placeholder={'asdsad'}
//            onChange={selectedOption => {
 //           }}
  //          defaultValue={values.category}
          />
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