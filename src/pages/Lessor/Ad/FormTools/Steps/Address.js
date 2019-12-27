import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { Form, Input } from '@rocketseat/unform';
import InputMask from 'react-input-mask';
import { Field, Label } from '../../../../../components/Form/Form';
import { Button, CheckboxIOS } from '../../../../../components/Form/Button';
import { Warningtext } from '../../../../../components/Warningtext';
import { SubTitlepages } from '../../../../../components/Titles/SubTitlepages';
import Scroll from '../../../../../utils/scroll';
import { Span } from '../../../../../components/Span';

import api from '../../../../../services/api';

const token = "pk.eyJ1IjoibmFpbHNvbiIsImEiOiJjazRrYmRyMnUwNHdoM2RvanpkM2t3Z2ZkIn0.8KBTYMBwH5sb0OIhnk5icg";

const Address = ({nextStep, handleChange, prevStep, values}) => {
  const response = api.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/Rua alvares de azevedo 298 Curitiba Paraná.json?access_token=${token}`, {
  });

  response.then(console.log)

  const [address, setAddress] = useState('');
  const [showad, setShowad] = useState(true);
  const [showsg, showMsg] = useState(false);

  useEffect(() => {
    async function loadPerfil() { 
      const response = await api.get(`/perfil`, {
      });
      
      // eslint-disable-next-line
      response.data.user.map(function (perfil) {
        // eslint-disable-next-line
        if (perfil.location === "" || perfil.address === "" || perfil.number === "" && perfil.location === "" || perfil.complement === "" || perfil.city === "" || perfil.uf === "") {
          setShowad(true)
          showMsg(true)
        }
      }) 
      
      setAddress(response.data.user[0]);
    }
    loadPerfil();
  }, [showad, values]);

  const formik = useFormik({
    initialValues: {
      location: '',
      neighboor: '',
      address: '',
      number: '',
      complement: '',
      uf: '',
      city: '',
      lat: '',
      lng: '',
    },

    validationSchema: Yup.object({
      location: Yup.string()
        .required('CEP é obrigatório.'),
      address: Yup.string()
        .required('O endereço é obrigatório.'),
      number: Yup.string()
        .required('O numero do endereço é obrigatório.'),
      uf: Yup.string()
        .required('O estado é obrigatório.'),
      city: Yup.string()
        .required('O cidade é obrigatório.'),

      }),

    onSubmit: value => {
      nextStep()
    }
  })

  const handleChangeAddress = (input, event, type) => {
    let ev = event.target.value
    switch(input){
      case 'location': 
        formik.values.location = ev
        break;
      case 'neighboor': 
        formik.values.neighboor = ev
        break;
      case 'address': 
        formik.values.address = ev
        break;
      case 'number': 
        formik.values.number = ev
        break;
      case 'complement': 
        formik.values.complement = ev
        break;
      case 'uf': 
        formik.values.uf = ev
        break;
      case 'city': 
        formik.values.city = ev
        break;
      default:
        return '';
    }

    handleChange(input, ev)
  }

  const setDatadefault = () => {
    if(showad === true) {
      values.location = address.location
      formik.values.location = address.location
      values.neighboor = address.neighboor
      formik.values.neighboor = address.neighboor
      values.address = address.address
      formik.values.address = address.address
      values.number = address.number
      formik.values.number = address.number
      values.complement = address.complement
      formik.values.complement = address.complement
      values.uf = address.uf
      formik.values.uf = address.uf
      values.city = address.city
      formik.values.city = address.city
    }
  };

  const back = (e) => {
    e.preventDefault();
    Scroll(100, 100);
    prevStep();
  }

  const handleCheckIOS = event => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    setShowad(value)
};  

  return (
    <>
      <SubTitlepages>Onde está sua ferramenta?</SubTitlepages>
      <div className={showad === true ? 'address-user is-block' : 'is-hidden'}>
        {
          showsg === true ?
          (
            <>
              <p>
                Você ainda não tem um endereço padrão.
                <br/>
                Para fazer isto,  <Link to={'/lessor/perfil'}> clique aqui </Link> e adicione seu endereço.
              </p>
              <br/>
              <Warningtext>
                * Você pode alterar este endereço a qualquer momento, caso não deseje usa-lo, 
                basta apenas seleciona o botão abaixo para o lado esquerdo
              </Warningtext>
            </>
          ) 
          :
          (
            <>
              <p>{address.location} { address.neighboor }</p>
              <p>{address.address} - {address.number}</p>
              <p>{address.uf} - {address.city}</p>
              <br/>
            </>
          )
        }
      </div>
      <div>
        <p>
          { 
            showad === false ? ('Novo endereço.') : ('Endereço padrão.')
          }
        </p>
        <div className="offer">        
          <CheckboxIOS 
            onChange={handleCheckIOS}
            name="check_address"
            value={values.address} 
            id="checkios"
            bind="checkaddress"
            ch={true}
            off="" 
            on="Sim"
          />
        </div>
      </div>
      <Form
        onSubmit={ (e, values) => {
          Scroll(100, 100)
          setDatadefault()
          formik.handleSubmit(values)
        }} 
        noValidate
      >
        {
          showad === false ? 
          (
            <>

              <div className="columns column-address">
                <div className="column">
                  <Field>
                    <Label className="label-perfil" for={'location'}>
                      <b>CEP</b>
                    </Label>
                    <InputMask
                      name="location"
                      type="text"
                      mask="99.999-999" 
                      maskChar=" "
                      placeholder="00.000-000"
                      className={formik.touched.cep && formik.errors.cep ? 'input border-warning' : 'input'}
                      onChange={event => handleChangeAddress('location', event)}
                      value={values.location}
                    />
                    <Span className={'validation-warning'}>
                      {
                        formik.touched.location && formik.errors.location 
                      ? 
                        (<div>{formik.errors.location}</div>) 
                      : 
                        null
                      }
                    </Span>
                  </Field>
                </div>
                <div className="column">
                  <Field>
                    <Label className="label-perfil" for={'Bairro'}>
                      <b>Bairro</b>
                    </Label>
                    <Input
                      name="neighboor"
                      type="text"
                      placeholder="Bairro"
                      className={formik.touched.neighboor && formik.errors.neighboor ? 'input border-warning' : 'input'}
                      onChange={event => handleChangeAddress('neighboor', event)}
                      value={values.neighboor}
                    />
                  </Field>
                </div>
              </div>        
              <div className="columns column-address">
                <div className="column">
                  <Field>
                    <Label className="label-perfil" for={'address'}>
                      <b>Endereço</b>
                    </Label>
                    <Input
                      name="address"
                      type="text"
                      placeholder="Endereço"
                      className={formik.touched.address && formik.errors.address ? 'input border-warning' : 'input'}
                      onChange={event => handleChangeAddress('address', event)}
                      value={values.address}
                    />
                    <Span className={'validation-warning'}>
                      {
                        formik.touched.address && formik.errors.address 
                      ? 
                        (<div>{formik.errors.address}</div>) 
                      : 
                        null
                      }
                    </Span>
                  </Field>
                </div>
                <div className="column is-3">
                  <Field>
                    <Label className="label-perfil" for={'number'}>
                      <b>Número</b>
                    </Label>
                    <Input
                      name="number"
                      type="text"
                      placeholder="000"
                      className={formik.touched.number && formik.errors.number ? 'input border-warning' : 'input'}
                      onChange={event => handleChangeAddress('number', event)}
                      value={values.number}
                    />
                    <Span className={'validation-warning'}>
                      {
                        formik.touched.number && formik.errors.number 
                      ? 
                        (<div>{formik.errors.number}</div>) 
                      : 
                        null
                      }
                    </Span>
                  </Field>
                </div>
                <div className="column is-3">
                  <Field>
                    <Label className="label-perfil" for={'complement'}>
                      <b>Completo</b>
                    </Label>
                    <Input
                      name="complement"
                      type="text"
                      placeholder="Complemento"
                      className={formik.touched.complement && formik.errors.complement ? 'input border-warning' : 'input'}
                      onChange={event => handleChangeAddress('complement', event)}
                      value={values.complement}
                    />
                  </Field>
                </div>
              </div>
              <div className="columns ">
                <div className="column">
                  <Field>
                    <Label className="label-perfil" for={'estado'}>
                      <b>Estado</b>
                    </Label>
                    <Input
                      name="estado"
                      type="text"
                      placeholder="Estado"
                      className={formik.touched.uf && formik.errors.uf ? 'input border-warning' : 'input'}
                      onChange={event => handleChangeAddress('uf', event)}
                      value={values.uf}
                    />
                  </Field>
                  <Span className={'validation-warning'}>
                    {
                      formik.touched.uf && formik.errors.uf 
                    ? 
                      (<div>{formik.errors.uf}</div>) 
                    : 
                      null
                    }
                  </Span>
                </div>
                <div className="column">
                  <Field>
                    <Label className="label-perfil" for={'city'}>
                      <b>Cidade e Região</b>
                    </Label>
                    <Input
                      name="city"
                      type="text"
                      placeholder="Cidade"
                      className={formik.touched.city && formik.errors.city ? 'input border-warning' : 'input'}
                      onChange={event => handleChangeAddress('city', event)}
                      value={values.city}
                    />
                    <Span className={'validation-warning'}>
                      {
                        formik.touched.city && formik.errors.city 
                      ? 
                        (<div>{formik.errors.city}</div>) 
                      : 
                        null
                      }
                    </Span>
                  </Field>
                </div>
              </div>
            </>
          ) :
          ('')
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
      </Form>
    </>
  )
}

export default Address;