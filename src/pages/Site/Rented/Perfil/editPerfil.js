import React, { useState, useEffect, useCallback } from 'react';
import { useFormik } from 'formik';
import {useDropzone} from 'react-dropzone';
import { Form, Input } from '@rocketseat/unform';
import { Field, Label } from '../../../../components/Form/Form';
import Scroll from '../../../../utils/scroll';
import Select from 'react-select';
import { Span } from '../../../../components/Span';
import * as Yup from 'yup';
import api from '../../../../services/api';
import documents from '../../../../utils/documents';
import Title from '../../../../utils/title';
import InputMask from 'react-input-mask';
import { Warningtext } from '../../../../components/Warningtext';
import { Button } from '../../../../components/Form/Button';
import { cpfMask, cnpjMask } from '../../../../utils/maskdocument';

const Edit = ({history}) => {
  document.title = Title('Perfil');

  const [isactive, setActive] = useState([]);
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
  const [documenttype, setSelectedDocument] = useState({value: 'cpf', label: 'CPF' });
  const [avatar, setAvatar] = useState('');
  const [image, setImage] = useState('');

  const formik = useFormik({
    initialValues: {
      name: '',
      last_name: '',
      email: '',
      cpfcnpj: '',
      documentt: '',
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
        Scroll(0,0);
        history.push('/s/renter/perfil')
      })
      .catch((err) => {

      })
    }
  })

  const updateAvatar = () => {
    const data = new FormData();
    data.append('avatar', image[0]);
    saveAvatar(data)
  }

  async function saveAvatar (avatar) {
    await api.put(`perfil/avatar/update/${id}`, avatar, {})
    .then((res) => {
    })
    .catch((err) =>  {
      console.log(err.response)
    })
  }

  useEffect(() => {
    async function loadPerfil() { 
      const response = await api.get(`/perfil`, {
      });

      response.data.user.map(function (perfil) {
        setId(perfil.id)
        formik.values.name = perfil.name
        setName(perfil.name)
        formik.values.last_name = perfil.last_name
        setLastname(perfil.last_name)
        formik.values.email = perfil.email
        setEmail(perfil.email)        
        if (perfil.cpfcnpj === null) {
          setCpfcnpj('')
          formik.values.cpfcnpj = ''            
        } else {
          setCpfcnpj(perfil.cpfcnpj)
          formik.values.cpfcnpj = perfil.cpfcnpj 
          perfil.cpfcnpj.length > 14 ? setSelectedDocument({value: 'cnpj', label: 'CNPJ' }) : setSelectedDocument({value: 'cpf', label: 'CPF' })
        }

        setAddress(perfil.address)
        formik.values.address = perfil.address
        setLocation(perfil.location)
        formik.values.location = perfil.location
        
        if (perfil.neighboor === null) {
          setNeighboor('')
          formik.values.neighboor = ''  
        } else {
          setNeighboor(perfil.neighboor)
          formik.values.neighboor = perfil.neighboor  
        }
        if (perfil.number === null) {
          setNumber('')
          formik.values.number = ''
        } else {
          setNumber(perfil.number)
          formik.values.number = perfil.number  
        }
        if (perfil.complement === null) {
          setComplement('')
          formik.values.complement = ''  
        } else {
          setComplement(perfil.complement)
          formik.values.complement = perfil.complement  
        }
        setUf(perfil.uf)
        formik.values.uf = perfil.uf
        setCity(perfil.city)
        formik.values.city = perfil.city

        setAvatar(perfil.url)
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

  const handleDocumentChange = selectedDocument => {
    formik.values.month = selectedDocument.value;
    setSelectedDocument(selectedDocument);
  };

  const handleCpfcnpjChange = (cpfcnpj) => {
    let documentt = null
    if (documenttype.value === 'cpf') {
      documentt = cpfMask(cpfcnpj)
      formik.values.cpfcnpj = documentt;
      setCpfcnpj(documentt);
    } else {
      documentt = cnpjMask(cpfcnpj)
      formik.values.cpfcnpj = documentt;
      setCpfcnpj(documentt);
    }
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

  const onDrop = useCallback(acceptedFiles => {    
    const preview = URL.createObjectURL(acceptedFiles[0])
    setImage(acceptedFiles);
    setAvatar(preview)
    setActive(true)
  }, [])

  const {getRootProps, getInputProps} = useDropzone({onDrop})

  return (
    <div className="container">
      <Form
        onSubmit={ (e, values) => {
          Scroll(100, 100)
          formik.handleSubmit(values)
        }}
        noValidate          
      >
        <div className="columns column-address">
          <div className="column">
              <h3 className="title-box-inter">Informações </h3>
              <br/><br/>
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
                    handleLastnameChange(event.target.value)
                    formik.handleChange("last_name");
                  }}
                  value={formik.values.last_name}
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
                    handleEmailChange(event.target.value)
                    formik.handleChange("email");
                  }}
                  value={formik.values.email}
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
              <div className="columns">
                <div className="column is-4">
                <Field className={'field'}>
                  <Label for={'documents'}>
                    <b>Documento</b>
                  </Label>
                  <Select
                    className={formik.touched.documents && formik.errors.documents ? 'border-warning' : ''}
                    options={documents}
                    isSearchable={false}
                    placeholder={'CPF'}
                    value={documenttype}
                    onChange={selectedOption => {
                      handleDocumentChange(selectedOption)
                      formik.handleChange("document");
                    }}
                  />
                </Field>
                </div>
                <div className="column">
                  <Field>
                    <Label className="label-perfil" for={'cnpj'}>
                      <b>-</b>
                    </Label>
                    <Input
                      name="cnpj"
                      type="text"
                      placeholder=""
                      className={formik.touched.cpfcnpj && formik.errors.cpfcnpj ? 'input border-warning' : 'input'}
                      onChange={event => {
                        handleCpfcnpjChange(event.target.value)
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
                </div>
              </div>
              <Field className="is-pulled-right space-bt">
                <Button
                  type={'submit'}
                  className={'button color-logo-lessor'} 
                  text={'Salvar Informações'}
                />
              </Field>
          </div>
          <div className="column">
            <div className="column has-text-centered box-inter box-inter-padding">
              <b>{ name }</b>
              <br/>
              <div className="avatar-perfil" >
                <img src={avatar} alt={avatar}/>
              </div>
              <div className="column box-inter">
                <div {...getRootProps()} className="drag-photo">
                  <input {...getInputProps()} />
                    Altarar avatar
                </div>
              </div>
              {
                  isactive === true ?
                  (
                    <>
                      <Button
                        type={'button'}
                        className={'button is-info color-logo-lessor is-pulled-right'}
                        text={'Salvar'}
                        onClick={event => updateAvatar() }
                        />
                    </>
                  ) :
                  ('')
                }
            </div>
          </div>
        </div>
        <div className="columns">
          <div className="column">
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
                  <InputMask
                      name="location"
                      type="text"
                      placeholder="00.000-000"
                      mask="99.999-999" 
                      maskChar=" "
                      className={formik.touched.location && formik.errors.location ? 'input border-warning' : 'input'}
                      onChange={event => {
                        handleLocationChange(event.target.value)
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
                      handleNeighboorChange(event.target.value)
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
                        handleAddressChange(event.target.value)
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
                        handleNumberChange(event.target.value)
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
                      handleComplementChange(event.target.value)
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
                        handleUfChange(event.target.value)
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
                      handleCityChange(event.target.value)
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
            <br/>
            <Field className="is-pulled-right space-bt">
              <Button
                type={'submit'}
                className={'button color-logo-lessor'} 
                text={'Salvar Endereço'}
              />
            </Field>
          </div> 
          <div className="column">
            <h3 className="title-box-inter">Seus documentos</h3>
          </div>
        </div>             
      </Form>
    </div>
  );
};

export default Edit;