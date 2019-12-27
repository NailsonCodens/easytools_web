import React from 'react';
import { useFormik } from 'formik';
import { Form } from '@rocketseat/unform';
import { Button } from '../../../../../components/Form/Button';
import { SubTitlepages } from '../../../../../components/Titles/SubTitlepages';
import Scroll from '../../../../../utils/scroll';
import { Span } from '../../../../../components/Span';
import { Hr } from '../../../../../components/Hr';

const Finish = ({handleChange, prevStep, values}) => {
  console.log(values)
  const formik = useFormik({
    initialValues: {
      follow: '',
      accessory: '',
    },

    onSubmit: value => {
    }
  })

  const back = (e) => {
    e.preventDefault();
    Scroll(100, 100);
    prevStep();
  }

  return (
    <>
      <SubTitlepages>Confira as informações e clique em cloncluir para prosseguir.</SubTitlepages>
      <br></br>
      <Form
        onSubmit={ (e, values) => {
          Scroll(100, 100);
          formik.handleSubmit(values)
        }} 
        noValidate
      >
        <div>
          <div className="columns">
            <div className="column">
              <p><b>Título: </b>{ values.title !== '' ? values.title : 'Não informado' }</p>
              <p><b>Descrição: </b>{ values.description !== '' ? values.description : 'Não informado' }</p>
              <Hr/>
              <p><b>Marca: </b>{ values.brand !== '' ? values.brand : 'Não informado' }</p>
              <p><b>Tipo: </b>{ values.type_spec !== '' ? values.type_spec : 'Não informado' }</p>
              <p><b>Categoria: </b>{ values.category !== '' ? values.category : 'Não informado' }</p>
              <p><b>Alimentação: </b>{ values.feed !== '' ? values.feed : 'Não informado' }</p>
              <p><b>Potência: </b>{ values.power !== '' ? values.power : 'Não informado' }</p>
              <p><b>Tensão: </b>{ values.tension !== '' ? values.tension : 'Não informado' }</p>
              <p><b>Acessórios: </b>{ values.accessory !== '' ? values.accessory : 'Não informado' }</p>
              <p><b>Vai junto: </b>{ values.follow !== '' ? values.follow : 'Não informado' }</p>
              <Hr/>
            </div>
            <div className="column">
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
          text={'Concluir'}
        />
        </Form>
    </>
  )
}

export default Finish