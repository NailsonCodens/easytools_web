import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import { Form, Input, Textarea } from '@rocketseat/unform';

import { Field, Label } from '../../../../../components/Form/Form';
import { Button, CheckboxIOS } from '../../../../../components/Form/Button';
import { Warningtext } from '../../../../../components/Warningtext';
import { SubTitlepages } from '../../../../../components/Titles/SubTitlepages';

import api from '../../../../../services/api';

const Address = ({nextStep, handleChange, prevStep, values}) => {

  const [address, setAddress] = useState('');
  const [showad, setShowad] = useState(true);
  const [showsg, showMsg] = useState(false);

  useEffect(() => {
    async function loadPerfil() { 
      const response = await api.get(`/perfil`, {
      });

      response.data.user.map(function (perfil) {
        if (perfil.location === "" || perfil.address === "" || perfil.number === "" 
        && perfil.location === "" || perfil.complement === "" || perfil.city === "" || perfil.uf === "") {
          setShowad(true)
          showMsg(true)
        }
      }) 
      
      setAddress(response.data.user[0]);
    }
    loadPerfil();
  }, []);

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

  const back = (e) => {
    e.preventDefault();
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
      {
        showad === false ? 
        (
          <>
            <Form>
              <div className="columns">
                <div className="column">
                  <Field>
                    <Label className="label-perfil" for={'cep'}>
                      <b>Cep</b>
                    </Label>
                    <Input
                      name="cep"
                      type="text"
                      placeholder="00.000-000"
                      className={formik.touched.cep && formik.errors.cep ? 'input border-warning' : 'input'}
                      onChange={event => handleChange('cep', event)}
                      value={values.cep}
                    />
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
                      className={formik.touched.neighboord && formik.errors.neighboord ? 'input border-warning' : 'input'}
                      onChange={event => handleChange('neighboord', event)}
                      value={values.neighboord}
                    />
                  </Field>
                </div>
              </div>        
              <div className="columns">
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
                      onChange={event => handleChange('address', event)}
                      value={values.neighboord}
                    />
                  </Field>
                </div>
              </div>
              <div className="columns">
                <div className="column is-3">
                  <Field>
                    <Label className="label-perfil" for={'address'}>
                      <b>Number</b>
                    </Label>
                    <Input
                      name="address"
                      type="text"
                      placeholder="Endereço"
                      className={formik.touched.address && formik.errors.address ? 'input border-warning' : 'input'}
                      onChange={event => handleChange('address', event)}
                      value={values.neighboord}
                    />
                  </Field>
                </div>
                <div className="column">
                  <Field>
                    <Label className="label-perfil" for={'complement'}>
                      <b>Completo</b>
                    </Label>
                    <Input
                      name="complement"
                      type="text"
                      placeholder="Complemento"
                      className={formik.touched.address && formik.errors.address ? 'input border-warning' : 'input'}
                      onChange={event => handleChange('address', event)}
                      value={values.neighboord}
                    />
                  </Field>
                </div>
              </div>
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
        ) :
        ('')
      }
    </>
  )
}

export default Address;