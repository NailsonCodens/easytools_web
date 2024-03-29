import React, { useState, useCallback, useEffect } from 'react'
import { Warningtext } from '../../../components/Warningtext';
import { useFormik } from 'formik';
import {useDropzone} from 'react-dropzone';
import { Form, Input } from '@rocketseat/unform';
import { Field, Label } from '../../../components/Form/Form';
import * as Yup from 'yup';
import Select from 'react-select';
import documents from '../../../utils/documents';
import { cpfMask, cnpjMask } from '../../../utils/maskdocument';
import { Span } from '../../../components/Span';
import InputMask from 'react-input-mask';
import { Button } from '../../../components/Form/Button';
import ScrollableAnchor from 'react-scrollable-anchor'
import api from '../../../services/api';
import Document from '../../Documents/document';
import { useSelector } from "react-redux";
import Selfie from '../../Documents/selfie';
import Warninggeneral from '../../Warnings/Warninggeneral';
import Scroll from '../../../utils/scroll';
import Notification from '../../../utils/notification';
import { set } from 'react-ga';

const Adddocument = ({ onClose, confirmRent, rent, history }) => {

  var link = localStorage.getItem('@lkt');

  const documentdata = useSelector(state => state.document);
  const proofdata = useSelector(state => state.proof);
  const selfiedata = useSelector(state => state.selfie);
  const socialdata = useSelector(state => state.social);
  const us = useSelector(state => state.auth);

  const [war, setWar] = useState('');
  const [documenttype, setSelectedDocument] = useState({value: 'cpf', label: 'CPF' });
  const [cpfcnpj, setCpfcnpj] = useState('');
  const [documentimg, setDocument] = useState('Não adicionado.');
  const [selfieimg, setSelfie] = useState('Não adicionado.');
  const [address, setAddress] = useState('');
  const [number, setNumber] = useState('');
  const [complement, setComplement] = useState('');
  const [neighboor, setNeighboor] = useState('');
  const [location, setLocation] = useState('');
  const [uf, setUf] = useState('');
  const [city, setCity] = useState('');
  const [phone, setPhone] = useState('');
  const [birthdate, setBirthdate] = useState();
  const [image, setImage] = useState('');
  const [isactive, setActive] = useState([]);
  const [isactiveselfie, setActiveselfie] = useState([]);
  const [showcheck, setShowcheck] = useState(false);
  const [user, setUser] = useState('');
  const [newaddress, setNewaddress] = useState('');

  const info = () => Notification(
    'info',
    'Salvando seus documentos, só um momento.',
    {
      autoClose: 3000,
      draggable: false,
    },
    {
      position: "top-center",
      autoClose: 4800,
      hideProgressBar: true,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
    }
  )

  const onDrop = useCallback(acceptedFiles => {
    const preview = URL.createObjectURL(acceptedFiles[0])
    setImage(acceptedFiles);
    setDocument(preview)
    setActive(true)
  }, [])

  useEffect(() => {
    Scroll()

    async function loadPerfil() {
      const response = await api.get(`/perfil`, {
      });
      if (response.data.user.length > 0) {
        response.data.user.map(function (perfil) {
          if (perfil.cpfcnpj === null) {
            setCpfcnpj('')
            formik.values.cpfcnpj = ''
          } else {
            setCpfcnpj(perfil.cpfcnpj)
            formik.values.cpfcnpj = perfil.cpfcnpj
            perfil.cpfcnpj.length > 14 ? setSelectedDocument({value: 'cnpj', label: 'CNPJ' }) : setSelectedDocument({value: 'cpf', label: 'CPF' })
          }

          setAddress(perfil.address)
          formik.values.address = perfil.address !== null ? perfil.address : ''

          setPhone(perfil.phone)
          formik.values.phone = perfil.phone !== null ? perfil.phone : ''

          setBirthdate(perfil.address)
          formik.values.birht_date = perfil.birht_date !== null ? perfil.birht_date : ''

          setLocation(perfil.location)
          formik.values.location = perfil.location !== null ? perfil.location : ''

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
          formik.values.uf = perfil.uf !== null ? perfil.uf : ''
          setCity(perfil.city)
          formik.values.city = perfil.city !== null ? perfil.city : ''

          return ''
        })
      }
    }
    loadPerfil();

    async function loadWorkadd(){
      const responseworkadd = await api.get(`workadd/${rent}`, {
      });
      if (responseworkadd.data.workadd.length > 0) {
        setNewaddress(true)
        setLocation(responseworkadd.data.workadd[0].location)
        setAddress(responseworkadd.data.workadd[0].address)
        setNeighboor(responseworkadd.data.workadd[0].neighboor)
        setComplement(responseworkadd.data.workadd[0].complement)
        setNumber(responseworkadd.data.workadd[0].number)
        setCity(responseworkadd.data.workadd[0].city)
        setUf(responseworkadd.data.workadd[0].uf)
      }
    }
    loadWorkadd()
  }, []);


  const {getRootProps, getInputProps} = useDropzone({onDrop})

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

  const handlePhonehange = (phone) => {
    formik.values.phone = phone
    setPhone(phone)
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

  const formik = useFormik({
    initialValues: {
      cpfcnpj: '',
      phone: '',
      birth_date: '',
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
      cpfcnpj: Yup.string()
        .required('O CPF ou CNPJ é obrigatório.'),

        address: Yup.string()
        .required('O endereço é obrigatório.'),

        phone: Yup.string()
        .required('O celularf é obrigatório.'),

        number: Yup.string()
        .required('O número é obrigatório.'),

        neighboor: Yup.string()
        .required('O bairro é obrigatório.'),

        location: Yup.string()
        .required('CEP é obrigatório.'),

        uf: Yup.string()
        .required('O Estado é obrigatório.'),

        city: Yup.string()
        .required('A cidade é obrigatório.'),
    }),

    onSubmit: value => {
      const document = new FormData();
      const social = new FormData();
      const selfie = new FormData();
      const proof = new FormData();
      console.log(documentdata, socialdata, selfiedata, proofdata)

      document.append('document', documentdata);
      social.append('enterprise', socialdata);
      selfie.append('selfie', selfiedata);
      proof.append('proof', proofdata);

      if (documenttype.value === 'cnpj' && social === '') {
        setWar('Você precisa adicionar o contrato social da sua empresa.');
      } else {
        if (documentdata === '') {
          setWar('Adicione seu documento.');
          return
        } else {
          if (documentdata !== 'ok') {
            if (documentdata.type !== 'application/pdf' && documentdata.type !== 'image/jpeg' && documentdata.type !== 'image/png') {
              setWar('Só são permitidos pdf e images jpg para dasd.');
              return
            }
          }
        }

        /*if (selfiedata === '') {
          setWar('Adicione uma selfie.');
          return
        } else {
          if (selfiedata !== 'ok') {
            if (selfiedata.type !== 'application/pdf' && selfiedata.type !== 'image/jpeg' && selfiedata.type !== 'image/png') {
              setWar('Só são permitidos images jpg para selfie.');
              return
            }
          }
        }*/

/*
        if (proofdata === '') {
          setWar('Adicione o comprovante de endereço.');
          return
        } else {
          if (proofdata !== 'ok') {
            if (proofdata.type !== 'application/pdf' && proofdata.type !== 'image/jpeg'  && proofdata.type !== 'image/png') {
              setWar('Só são permitidos pdf e images jpg para comprovante de endereço.');
              return
            }
          }
        }
*/

        if (socialdata.value === 'cnpj' && socialdata !== '') {
          if (documentdata !== 'ok') {
            if (socialdata.type !== 'application/pdf' && socialdata.type !== 'image/jpeg') {
              setWar('Só são permitidos pdf e images jpg para contrato social.');
              return
            }
          }
        }
        setWar('')
        saveAddress(value, document, selfie, proof, social, documenttype.value)
      }
    }
  })

  const saveAddress = (data, datadoc, dataselfie, dataproof, datasocial, typedoc) => {
    info()
    api.put(`perfil/update/${us.id}`, data, {})
    .then((res) => {
      if(documentdata !== 'ok') {
        saveDocument(datadoc)
      }

        setTimeout(function(){
          if (selfiedata !== 'ok') {
           // saveSelfie(dataselfie)
          }
          if (proofdata !== 'ok') {
            //saveProf(dataproof)
          }
        }, 1500);

        if (typedoc === 'cnpj') {
          if (socialdata !== 'ok') {
            saveSocial(datasocial)
          }
        }

      setTimeout(function(){
          Scroll(400, 400);
          onClose()

          confirmRent()

      }, 6000);
    })
    .catch((err) => {

    })
  }

  async function saveDocument (document) {
    await api.put(`documents/document/${us.id}`, document, {})
    .then((res) => {
    })
    .catch((err) => {
    })
  }

  async function saveSelfie (selfie) {
    await api.put(`documents/selfie/${us.id}`, selfie, {})
    .then((res) => {
    })
    .catch((err) => {
    })
  }

  async function saveProf (proof) {
    await api.put(`documents/proof/${us.id}`, proof, {})
    .then((res) => {
    })
    .catch((err) => {
    })
  }

  async function saveSocial (enterprise, typedoc) {
    await api.put(`documents/enterprise/${us.id}`, enterprise, {})
    .then((res) => {
    })
    .catch((err) => {
    })
  }

  const updateDocument = () => {
    const data = new FormData();
    data.append('document', image[0]);
    saveDocument(data)
  }

  return (
    <>
      {
        war !== '' ?
        (
        <Warninggeneral>{ war }</Warninggeneral>
        )
        :
        (
          ''
        )
      }
    <div className="container  adddocument">
      <div className="columns">
        <div className="column">
          <h3 className="title-tool-only">
            Envie seu documento para completar seu cadastro, é bem rapido.
            <br/>
          </h3>
          <p>Você só precisa fazer isso uma vez.</p>
          <br/>
            <b className="title-tool-2">
              Seus dados estão protegidos pela LEI DE PROTEÇÃO DE DADOS. Sómos uma empresa séria e que cuida de nossos clientes.
            </b>            
        </div>
      </div>
      <Form
        onSubmit={ (e, values) => {
          formik.handleSubmit(values)
        }}
        noValidate
      >
        <div className="columns">
          <div className="column">
            <div className="columns">
              <div className="column is-6">
                <ScrollableAnchor id={'docs'}>
                  <div> </div>
                </ScrollableAnchor>
                <h3 className="title-box-inter">Documento</h3>
                <div className="columns">
                  <div className="column is-5">
                    <Field>
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
                    <Warningtext>
                    </Warningtext>
                  </div>
                </div>
                <div className="columns">
                  <div className="column">
                    <Field>
                      <Label for={''}>
                        <b>Celular</b>
                      </Label>
                      <Label for={'phone'}>
                        <InputMask
                          name="location"
                          type="text"
                          mask="(99) 9 9999-9999"
                          maskChar=" "
                          placeholder="(41) 9 9999-9999"
                          className={formik.touched.phone && formik.errors.phone ? 'input border-warning' : 'input'}
                          onChange={event => {
                            handlePhonehange(event.target.value)
                            formik.handleChange("phone");
                          }}
                          value={phone}
                        />
                        <Span className={'validation-warning'}>
                          {
                            formik.touched.phone && formik.errors.phone
                          ?
                            (<div>{formik.errors.phone}</div>)
                          :
                            null
                          }
                        </Span>
                      </Label>
                    </Field>
                  </div>
                </div>
                <h3 className="title-box-inter">Endereço onde você reside</h3>
                <Warningtext>
                  Seu endereço será verificado.
                </Warningtext>
                <p className={'button color-logo-lessor'} onClick={event => setNewaddress(!newaddress)}>
                  { newaddress === true ? 'Adicionar outro endereço': 'Manter mesmo endereço' }
                </p>
                <br/><br/>
                {
                  newaddress === true?
                  (
                    <>
                      <h3 className="warning-address"> Você tem um endereço cadastrado recentemente </h3>
                      <ul>
                        <li> { location } - { neighboor } </li>
                        <li> { address } { number } { complement } </li>
                        <li> { uf } - { city } </li>
                      </ul>
                    </>
                  )
                  :
                  (
                    <>
                      <div className="columns">
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
                      <div className="columns">
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
                      <div className="columns">
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
                      <div className="columns">
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
                              <b>Cidade</b>
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
                    </>
                  )
                }
              </div>
              <div className="column">
                <div className="columns">
                  <div className="column">
                    <h3 className="title-box-inter">RG ou CNH</h3>
                    <br/>
                    <b className="title-tool-2">
                      Seus dados estão protegidos pela LEI DE PROTEÇÃO DE DADOS. Sómos uma empresa séria e que cuida de nossos clientes.
                    </b> 
                    <Document id={us.id}/>
                  </div>
                  {
                    /*
                    <div className="column">
                      <h3 className="title-box-inter">Foto do seu rosto (Selfie)</h3>
                      <Selfie id={us.id}/>
                    </div>
                    */
                  }
                </div>
                {
                  /*
                    <div className="columns">
                      <div className="column">
                        <h3 className="title-box-inter">Comprovante de residência</h3>
                        <Proofaddress id={us.id}/>
                      </div>
                      <div className="column">
                        {
                          documenttype.value === 'cnpj' ?
                          (
                            <>
                              <h3 className="title-box-inter">Contrato social</h3>
                              <SocialContract id={us.id}/>
                            </>
                          )
                          :
                          ('')
                        }
                      </div>
                    </div>

                  */
                }
              </div>
            </div>
          </div>
        </div>
        <Field className="">
          <Button
            type={'submit'}
            className={'button is-fullwidth color-logo-lessor'}
            text={'Salvar e Prosseguir'}
            onClick={event => Scroll(600, 600)}
          />
        </Field>
      </Form>
    </div>
    </>
  )
}

export default Adddocument
