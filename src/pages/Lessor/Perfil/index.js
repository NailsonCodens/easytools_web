import React, { useState, useEffect } from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';

import { Form, Input } from '@rocketseat/unform';
import { Field, Label } from '../../../components/Form/Form';
import { Button } from '../../../components/Form/Button';
import { Warningtext } from '../../../components/Warningtext';
import {Titlepage} from '../../../components/Titles/Titlepages';
import { Span } from '../../../components/Span';

import { toast } from 'react-toastify';

import api from '../../../services/api';

import './style.css';

const Perfil = ({history}) => {
  toast.configure({
    autoClose: 3000,
    draggable: false,
  })

  const success = () => toast.success('Perfil atualizado com sucesso!', {
    position: "top-center",
    autoClose: 1500,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  });

  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [last_name, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [cpfcnpj, setCpfcnpj] = useState('');
  const [address, setAddress] = useState('');
  const [number, setNumber] = useState('');
  const [complement, setComplement] = useState('');
  const [neighboor, setNeighboor] = useState('');
  const [location, setLocation] = useState('');
  const [uf, setUf] = useState('');
  const [city, setCity] = useState('');

  const formik = useFormik({
    initialValues: {
      name: '',
      last_name: '',
      email: '',
      address: '',
      number: '',
      complement: '',
      neighboor: '',
      location: '',
      uf: '',
      city: '',
    },

    validationSchema: Yup.object({
      name: Yup.string()
        .required('Nome é obrigatório.'),

      email: Yup.string()
        .email('Insira um e-mail válido.')
        .required('E-mail é obrigatório.'),

      last_name: Yup.string()
        .required('Nome é obrigatório.'),

    }),

    onSubmit: value => {
      api.put(`perfil/update/${id}`, value, {})
      .then((res) => {
        success()
      })
      .catch((err) => {
        console.log(err.response)
      })
    }
  })

  useEffect(() => {
    async function loadPerfil() { 
      const response = await api.get(`/perfil`, {
      });

      response.data.user.map(function (perfil) {
        setId(perfil.id)
        formik.values.id = perfil.id
        setName(perfil.name)
        formik.values.name = perfil.name
        setLastname(perfil.last_name)
        formik.values.last_name = perfil.last_name
        setEmail(perfil.email)
        formik.values.email = perfil.email
        setCpfcnpj(perfil.cpfcnpj)
        formik.values.cpfcnpj = perfil.cpfcnpj
        setAddress(perfil.address)
        formik.values.address = perfil.address
        setLocation(perfil.location)
        formik.values.location = perfil.location
        setNeighboor(perfil.neighboor)
        formik.values.neighboor = perfil.neighboor
        setNumber(perfil.number)
        formik.values.number = perfil.number
        setComplement(perfil.complement)
        formik.values.complement = perfil.complement
        setUf(perfil.uf)
        formik.values.uf = perfil.uf
        setCity(perfil.city)
        formik.values.city = perfil.city
        return ''
      })

    }
    loadPerfil();
  }, [formik.values]);

  const handleNameChange = (name) => {
    formik.values.name = name;
    setName(name);
  };

  const handleLastnameChange = (last_name) => {
    formik.values.last_name = last_name;
    setLastname(last_name);
  };

  const handleEmailChange = (email) => {
    formik.values.email = email;
    setEmail(email);
  };

  const handleCpfcnpjChange = (cpfcnpj) => {
    formik.values.cpfcnpj = cpfcnpj;
    setCpfcnpj(cpfcnpj);
  };

  const handleAddressChange = (address) => {
    formik.values.address = address
    setAddress(address);
  }

  const handleNumberChange = (number) => {
    formik.values.number = number
    setNumber(number);
  }

  const handleLocationChange = (location) => {
    formik.values.location = location
    setLocation(location);
  }

  const handleNeighboorChange = (neighboor) => {
    formik.values.neighboor = neighboor
    setNeighboor(neighboor);
  }

  const handleComplementChange = (complement) => {
    formik.values.complement = complement
    setComplement(complement);
  }

  const handleUfChange = (uf) => {
    formik.values.uf = uf
    setUf(uf);
  }

  const handleCityChange = (city) => {
    formik.values.city = city
    setCity(city);
  }

  return (
    <>
      <div className="container container-page">
        <div className="columns">
          <div className="column has-text-left">
            <Titlepage>Meu perfil</Titlepage>
          </div>
        </div>
        <div className="">
          <div className="">
            <Form
              onSubmit={ values => {
                formik.handleSubmit(values);
              }}
              noValidate
            >
              <div className="columns">
                <div className="column box-inter box-inter-padding">
                  <h3 className="title-box-inter">Dados da conta</h3>
                  <Field>
                    <Label className="label-perfil" for={'name'}>
                      <b>Nome</b>
                    </Label>
                    <Input
                      name="name"
                      type="text"
                      placeholder=""
                      className={formik.touched.name && formik.errors.name ? 'input border-warning' : 'input'}
                      onChange={event => {
                        handleNameChange(event.target.value);
                        formik.handleChange("name");
                      }}
                      value={name}
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
                    <Label className="label-perfil" for={'last_name'}>
                        <b>Segundo Nome</b>
                    </Label>
                    <Input
                      name="last_name"
                      type="text"
                      placeholder=""
                      className={formik.touched.last_name && formik.errors.last_name ? 'input border-warning' : 'input'}
                      onChange={event => {
                        handleLastnameChange(event.target.value);
                        formik.handleChange("last_name");
                      }}
                      value={last_name}
                    />
                    <Span className={'validation-warning'}>
                      {
                        formik.touched.last_name && formik.errors.last_name 
                      ? 
                        (<div>{formik.errors.last_name}</div>) 
                      : 
                        null
                      }
                    </Span>
                  </Field>
                  <Field>
                    <Label className="label-perfil" for={'email'}>
                      <b>Email</b>
                    </Label>
                    <Input
                      name="email"
                      type="email"
                      placeholder=""
                      className={formik.touched.email && formik.errors.email ? 'input border-warning' : 'input'}
                      onChange={event => {
                        handleEmailChange(event.target.value);
                        formik.handleChange("email");
                      }}
                      value={email}
                    />
                    <Span className={'validation-warning'}>
                      {
                        formik.touched.email && formik.errors.email 
                      ? 
                        (<div>{formik.errors.email}</div>) 
                      : 
                        null
                      }
                    </Span>
                  </Field>
                  <Field>
                    <Label className="label-perfil" for={'email'}>
                      <b>CPF/CNPJ</b>
                    </Label>
                    <Input
                      name="cnpj"
                      type="text"
                      placeholder=""
                      className={formik.touched.cpfcnpj && formik.errors.cpfcnpj ? 'input border-warning' : 'input'}
                      onChange={event => {
                        handleCpfcnpjChange(event.target.value);
                        formik.handleChange("cpfcnpj");
                      }}
                      value={cpfcnpj}
                    />
                    <Span className={'validation-warning'}>
                      {
                        formik.touched.cpfcnpj && formik.errors.cpfcnpj 
                      ? 
                        (<div>{formik.errors.cpfcnpj}</div>) 
                      : 
                        null
                      }
                    </Span>
                  </Field>
                  <Field className="is-pulled-right">
                    <Button
                      type={'submit'}
                      className={'button color-logo-lessor'}
                      text={'Salvar Alterações pessoais'}
                    />
                  </Field>
                </div>
                <div className="column">
                  Redes sociais, email e telefone verificado
                </div>
              </div>
              <div className="columns">
                <div className="column box-inter box-inter-padding">
                  <h3 className="title-box-inter">Endereço</h3>
                  <Warningtext>
                    Seus anúncios aparecerão com esta região selecionada. No entanto, você poderá editar em cada anúncio também.
                  </Warningtext>
                  <div className="columns column-address">
                    <div className="column">
                      <Field>
                        <Label for={'location'}>
                          <b>CEP</b>
                        </Label>
                        <Input
                            name="location"
                            type="text"
                            placeholder=""
                            className={formik.touched.location && formik.errors.location ? 'input border-warning' : 'input'}
                            onChange={event => {
                              handleLocationChange(event.target.value);
                              formik.handleChange("location");
                            }}
                            value={location}
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
                        <Label for={'neighboor'}>
                          <b>Bairro</b>
                        </Label>
                        <Input
                          name="neighboor"
                          type="text"
                          placeholder=""
                          className={formik.touched.neighboor && formik.errors.neighboor ? 'input border-warning' : 'input'}
                          onChange={event => {
                            handleNeighboorChange(event.target.value);
                            formik.handleChange("neighboor");
                          }}
                          value={neighboor}
                        />
                        <Span className={'validation-warning'}>
                          {
                            formik.touched.neighboor && formik.errors.neighboor 
                          ? 
                            (<div>{formik.errors.neighboor}</div>) 
                          : 
                            null
                          }
                        </Span>
                      </Field>
                    </div>
                  </div>
                  <div className="columns column-address">
                    <div className="column">
                      <Field>
                        <Label for={'location'}>
                          <b>Endereço</b>
                        </Label>
                        <Input
                            name="address"
                            type="text"
                            placeholder=""
                            className={formik.touched.address && formik.errors.address ? 'input border-warning' : 'input'}
                            onChange={event => {
                              handleAddressChange(event.target.value);
                              formik.handleChange("address");
                            }}
                            value={address}
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
                  </div>
                  <div className="columns column-address">
                    <div className="column is-3">
                      <Field>
                        <Label for={'number'}>
                          <b>Número</b>
                        </Label>
                        <Input
                            name="number"
                            type="text"
                            placeholder=""
                            className={formik.touched.number && formik.errors.number ? 'input border-warning' : 'input'}
                            onChange={event => {
                              handleNumberChange(event.target.value);
                              formik.handleChange("number");
                            }}
                            value={number}
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
                    <div className="column">
                      <Field>
                        <Label for={'complement'}>
                          <b>Complemento</b>
                        </Label>
                        <Input
                          name="complement"
                          type="text"
                          placeholder=""
                          className={formik.touched.complement && formik.errors.complement ? 'input border-warning' : 'input'}
                          onChange={event => {
                            handleComplementChange(event.target.value);
                            formik.handleChange("complement");
                          }}
                          value={complement}
                        />
                        <Span className={'validation-warning'}>
                          {
                            formik.touched.complement && formik.errors.complement 
                          ? 
                            (<div>{formik.errors.complement}</div>) 
                          : 
                            null
                          }
                        </Span>
                      </Field>
                    </div>
                  </div>
                  <div className="columns column-address">
                    <div className="column">
                      <Field>
                        <Label for={'uf'}>
                          <b>Estado</b>
                        </Label>
                        <Input
                            name="uf"
                            type="text"
                            placeholder=""
                            className={formik.touched.uf && formik.errors.uf ? 'input border-warning' : 'input'}
                            onChange={event => {
                              handleUfChange(event.target.value);
                              formik.handleChange("uf");
                            }}
                            value={uf}
                            />
                          <Span className={'validation-warning'}>
                            {
                              formik.touched.uf && formik.errors.uf 
                            ? 
                              (<div>{formik.errors.uf}</div>) 
                            : 
                              null
                            }
                          </Span>
                      </Field>
                    </div>
                    <div className="column">
                      <Field>
                        <Label for={'neighboor'}>
                          <b>Cidade e Região</b>
                        </Label>
                        <Input
                          name="city"
                          type="text"
                          placeholder=""
                          className={formik.touched.city && formik.errors.city ? 'input border-warning' : 'input'}
                          onChange={event => {
                            handleCityChange(event.target.value);
                            formik.handleChange("city");
                          }}
                          value={city}
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
                  <Field className="is-pulled-right space-bt">
                    <Button
                      type={'submit'}
                      className={'button color-logo-lessor'} 
                      text={'Salvar Endereço'}
                    />
                  </Field>
                </div>
                <div className="column">
                  asdds
                </div>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </>
  )
}

export default Perfil;