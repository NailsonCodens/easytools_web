import React, { useEffect, useState } from 'react';
import './style.css';
import { Warningtext } from '../../../components/Warningtext';
import { useFormik } from 'formik';
import { Form, Input } from '@rocketseat/unform';
import { Button } from '../../../components/Form/Button';
import { Field, Label } from '../../../components/Form/Form';
import { Span } from '../../../components/Span';
import InputMask from 'react-input-mask';
import * as Yup from 'yup';
import Scroll from '../../../utils/scroll';
import api from '../../../services/api';
import { getCordinates } from '../../../services/mapbox';
import Notification from '../../../utils/notification';
import { useLocation, useHistory } from 'react-router-dom';
import queryString from 'query-string';
import { useDispatch, useSelector } from "react-redux";
import { CheckboxIOS } from '../../../components/Form/Button';
import * as cepSearch from 'cep-promise';
import ReactGA from 'react-ga';
import ViaCep from 'react-via-cep';
import notification from '../../../store/reducers/notification';


const Workadd = ({ rent }) => {
  let valuesroute = queryString.parse(useLocation().search);
  const current_user = useSelector(state => state.auth);
  const [address, setAddress] = useState('N');
  const [perfil, setPerfil] = useState([]);
  const [notifice, setNotice] = useState(false);
  const [cep, setCep] = useState('');
  const [cepload, setCepload] = useState('');
  const [neighload, setNeighload] = useState('');
  const [addressload, setAddressload] = useState('');
  const [numberload, setNumberload] = useState('');
  const [complementload, setComplementload] = useState('');
  const [cityload, setCityload] = useState('');
  const [ufload, setUfload] = useState('');
  const [cepsearch, setCepsearch] = useState('');
  const [cepsh, setCepsh] = useState('');


  const [ceppromise, setCeppromise] = useState('');
  const [neighboorpromise, setNeighboorpromise] = useState('');
  const [addresspromise, setAddresspromise] = useState('');
  const [ufpromise, setUfpromise] = useState('');
  const [citypromise, setCitypromisse] = useState('');

  let history = useHistory();

  const Tracking = (category, action, label) => {
    Scroll()
    ReactGA.event({
      category: category,
      action: action,
      label: label
    });
  }

  useEffect(() => {
    async function loadAddress(addresschoose) {
      const response = await api.get(`/perfil`, {
      });

      if (response.data.user[0].address !== null
        || response.data.user[0].location !== null || response.data.user[0].uf !== null
        || response.data.user[0].city !== null) {
        setAddress('Y')
        setPerfil(response.data.user[0])
        setCepload(response.data.user[0].location)
        setNeighload(response.data.user[0].neighboor)
        setAddressload(response.data.user[0].address)
        setNumberload(response.data.user[0].number)
        setComplementload(response.data.user[0].complement)
        setCityload(response.data.user[0].city)
        setUfload(response.data.user[0].uf)

        formik.values.location = response.data.user[0].location
        formik.values.neighboor = response.data.user[0].neighboor
        formik.values.address = response.data.user[0].address
        formik.values.number = response.data.user[0].number
        formik.values.complement = response.data.user[0].complement
        formik.values.city = response.data.user[0].city
        formik.values.uf = response.data.user[0].uf

      } else {
        setNotice(true)
      }
    }
    loadAddress()

    return () => {
    };
  }, [])

  const formik = useFormik({
    initialValues: {
      location: cepload,
      neighboor: '',
      address: '',
      number: '',
      complement: '',
      uf: '',
      city: '',
      lat: '',
      lng: ''
    },

    validationSchema: Yup.object({
      location: Yup.string()
        .required('CEP é obrigatório.'),
      address: Yup.string()
        .required('O endereço é obrigatório.'),
      number: Yup.string()
        .required('O numero do endereço é obrigatório.'),
      neighboor: Yup.string()
        .required('O bairro é obrigatório.'),
      uf: Yup.string()
        .required('O estado é obrigatório.'),
      city: Yup.string()
        .required('O cidade é obrigatório.'),
    }),

    onSubmit: values => {
      /*
        ${values.uf}
      */
      let query = `${values.address} ${values.number} ${values.city}`
      info()
      setTimeout(function () {
        getCordinates(query).then(res => {

          console.log(res.data)

          if (res.data.features.length !== '') {
            let cordinates = res.data.features[0].center
            values.lat = cordinates[1]
            values.lng = cordinates[0]
            formik.values.lat = cordinates[1]
            formik.values.lng = cordinates[0]
            saveWorkadd(values)
          } else {
            warning()
          }
        }).catch(err => {
          warning()
        })
      }, 2000);
    }
  })

  const handleCepsearch = (event) => {
    console.log(event.target.value)
    setCepsearch(event.target.value)
    formik.values.location = event.target.value
    console.log(formik.values.location)
  }

  console.log(formik.values.location)

  const info = () => Notification(
    'info',
    'Só um momento, verificando endereço.',
    {
      autoClose: 3000,
      draggable: false,
    },
    {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
    }
  )

  const warning = () => Notification(
    'warning',
    'Não encontramos este endereço, verifique por favor.',
    {
      autoClose: 1500,
      draggable: false,
    },
    {
      position: "top-center",
      autoClose: 1500,
      hideProgressBar: true,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
    }
  )

  const handleChangeCep = () => {
    var cepclean = cep.replace('.', '')
    cepSearch(cepclean)
      .then(function (address) {
        setCeppromise(address.cep)
        setNeighboorpromise(address.neighborhood)
        setAddresspromise(address.street)
        setCitypromisse(address.city)
        setUfpromise(address.state)

        formik.values.location = address.cep
        formik.values.neighboor = address.neighborhood
        formik.values.address = address.street
        formik.values.city = address.city
        formik.values.uf = address.state
        setCepsh(true)
      }).catch(function (error) {
        warning()
      })
  }

  console.log(perfil.id)

  async function saveWorkadd(values) {
    values['rent_attempt_id'] = rent

    console.log(values)

    //    return

    const responseworkadd = await api.get(`workadd/${rent}`, {
    });

    if (responseworkadd.data.workadd.length > 0) {
      var workaddid = responseworkadd.data.workadd[0].id;
      var workaddrentid = responseworkadd.data.workadd[0].rent_attempt_id;

      await api.put(`/workadd/update/${workaddrentid}/${workaddid}`, values, {})
        .then((res) => {
          const addruser = api.put(`perfil/update/${current_user.id}`, values, {})
            .then((res) => {
              console.log(res)
            })

          console.log(addruser)
          verifyAvailabletool()
        }).catch((err) => {
        })
    } else {
      await api.post('/workadd/add/', values, {})
        .then((res) => {
          const addruser = api.put(`perfil/update/${current_user.id}`, values, {})
            .then((res) => {
              console.log(res)
            })

          console.log(addruser)

          verifyAvailabletool()
        }).catch((err) => {
        })
    }
  }

  async function verifyAvailabletool() {
    const response = await api.get(`/tools_site/tool/${valuesroute.tool}`, {
    });

    if (response.data.tool[0].availability === 'Y') {
      Tracking('Prosseguiu e foi para entrega', 'Prosseguiu para as entrega', 'workaddress')
      history.push(`/s/payment/rent-payment?rent_attempt=${valuesroute.rent_attempt}&tool=${valuesroute.tool}&code_attempt=${valuesroute.code_attempt}`)
    } else {
      history.push(`/?t=unavailable`);
    }
  }

  const fillsForm = (data) => {
    console.log(data)
    formik.values.location = data.cep
    formik.values.address = data.logradouro
    formik.values.neighboor = data.bairro
    formik.values.city = data.localidade
    formik.values.uf = data.uf

  }

  const handleCheckIOS = event => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const addresschoose = value ? 'Y' : 'N'
    setAddress(addresschoose)

    if (addresschoose === 'Y') {
      /*      formik.values.location = perfil.location
            formik.values.neighboor = perfil.neighboor
            formik.values.address = perfil.address
            formik.values.number = perfil.number
            formik.values.complement = perfil.complement
            formik.values.uf = perfil.uf
            formik.values.city = perfil.city*/
    } else {
      formik.values.location = ''
      formik.values.neighboor = ''
      formik.values.address = ''
      formik.values.number = ''
      formik.values.complement = ''
      formik.values.uf = ''
      formik.values.city = ''
    }
  }

  return (
    <div className="container workadd">

      <p className="title-infos-tool hack-padding-top">Falta só mais um pouquinho!</p>
      <progress class="progress is-success progressbar" value="60.33" max="100"></progress>
      <p className="title-tool-only">
        Onde você deseja receber o equipamento?
      </p>
      <div className="offer">
        <br />
        {
          perfil.location === undefined ?
            (
              <>
              </>
            )
            :
            (
              <CheckboxIOS
                onChange={handleCheckIOS}
                name="address"
                value={address}
                bind="checksignup"
                ch={address === 'Y' ? true : false}
                off="Novo endereço."
                on="Usar meu endereço."
              />
            )
        }
        <br />
        {
          notifice === true ?
            (
              <>
                <Warningtext>
                </Warningtext>
                <p className="red-text">
                  Adicione seu CEP para que possamos achar seu endereço de uso.
              </p>
              </>
            )
            :
            ('')
        }
      </div>
      {
        address === 'Y' ?
          (
            <>
              <Form
                onSubmit={values => {
                  formik.handleSubmit(values);
                }}
                noValidate
              >
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
                        className={formik.touched.location && formik.errors.location ? 'input border-warning' : 'input'}
                        onChange={event => {
                          formik.handleChange(event);
                          setCepload(event.target.value);
                        }}
                        value={formik.values.location || cepload}
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
                        onChange={event => {
                          formik.handleChange(event);
                          setNeighload(event.target.value)
                        }}
                        value={formik.values.neighboor || neighload}
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
                      <Label className="label-perfil" for={'address'}>
                        <b>Endereço</b>
                      </Label>
                      <Input
                        name="address"
                        type="text"
                        placeholder="Endereço"
                        className={formik.touched.address && formik.errors.address ? 'input border-warning' : 'input'}
                        onChange={event => {
                          formik.handleChange(event);
                          setAddressload(event.target.value);
                        }}
                        value={formik.values.address || addressload}
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
                        onChange={event => {
                          formik.handleChange(event);
                          setNumberload(event.target.value);
                        }}
                        value={formik.values.number || numberload}
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
                        <b>Complemento</b>
                      </Label>
                      <Input
                        name="complement"
                        type="text"
                        placeholder="Complemento"
                        className={formik.touched.complement && formik.errors.complement ? 'input border-warning' : 'input'}
                        onChange={event => {
                          formik.handleChange(event);
                          setComplementload(event.target.value);
                        }}
                        value={formik.values.complement || complementload}
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
                      <Label className="label-perfil" for={'estado'}>
                        <b>Estado</b>
                      </Label>
                      <Input
                        name="uf"
                        type="text"
                        placeholder="Estado"
                        className={formik.touched.uf && formik.errors.uf ? 'input border-warning' : 'input'}
                        onChange={event => {
                          formik.handleChange(event);
                          setUfload(event.target.value);
                        }}
                        value={formik.values.uf || ufload}
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
                        onChange={event => {
                          formik.handleChange(event);
                          setCityload(event.target.value);
                        }}
                        value={formik.values.city || cityload}
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
                <div class="columns">
                  <div class="column">
                  </div>
                  <div class="column is-4">
                    <Field className="is-pulled-right">
                      <Button
                        type={'submit'}
                        className={'button color-logo bt-address-work'}
                        text={'Enviar endereço'}
                      />
                    </Field>
                    <br/><br/>
                  </div>
                </div>

              </Form>
            </>
          )
          :
          (
            <>
              <div>
                <br />
                <div class="field has-addons">
                  <div class="control">
                    <InputMask
                      name="location"
                      type="text"
                      mask="99.999-999"
                      maskChar=" "
                      placeholder="CEP"
                      className={formik.touched.location && formik.errors.location ? 'input border-warning' : 'input'}
                      onChange={event => setCep(event.target.value)}
                      value={cep}
                    />
                  </div>
                  <div class="control">
                    <a class="button is-info" onClick={event => handleChangeCep()}>
                      Pesquisar
                </a>
                  </div>
                </div>
              </div>
              {
                cepsh === true ?
                  (
                    <>
                      <Form
                        onSubmit={values => {
                          formik.handleSubmit(values);
                        }}
                        noValidate
                      >
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
                                className={ceppromise === '' ? 'input border-warning' : 'input'}
                                onChange={event =>
                                  setCeppromise(event.target.value)
                                }
                                value={ceppromise}
                              />
                              <Span className={'validation-warning'}>
                                {
                                  ceppromise === ''
                                    ?
                                    (<div>Cep é obrigatório</div>)
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
                                className={neighboorpromise === '' ? 'input border-warning' : 'input'}
                                onChange={event => {
                                  setNeighboorpromise(event.target.value);
                                  formik.handleChange(event)
                                }}
                                value={neighboorpromise}
                              />
                              <Span className={'validation-warning'}>
                                {
                                  neighboorpromise === ''
                                    ?
                                    (<div>Bairro é obrigatório</div>)
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
                              <Label className="label-perfil" for={'address'}>
                                <b>Endereço</b>
                              </Label>
                              <Input
                                name="address"
                                type="text"
                                placeholder="Endereço"
                                className={addresspromise === '' ? 'input border-warning' : 'input'}
                                onChange={event => {
                                  setAddresspromise(event.target.value);
                                  formik.handleChange(event);
                                }}
                                value={addresspromise}
                              />
                              <Span className={'validation-warning'}>
                                {
                                  addresspromise === ''
                                    ?
                                    (<div>Endereço é obrigatório</div>)
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
                                onChange={event => formik.handleChange(event)}
                                value={formik.values.number}
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
                                <b>Complemento</b>
                              </Label>
                              <Input
                                name="complement"
                                type="text"
                                placeholder="Complemento"
                                className={formik.touched.complement && formik.errors.complement ? 'input border-warning' : 'input'}
                                onChange={event => formik.handleChange(event)}
                                value={formik.values.complement}
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
                              <Label className="label-perfil" for={'estado'}>
                                <b>Estado</b>
                              </Label>
                              <Input
                                name="uf"
                                type="text"
                                placeholder="Estado"
                                className={ufpromise === '' ? 'input border-warning' : 'input'}
                                onChange={event => setUfpromise(event.target.value)}
                                value={ufpromise}
                              />
                            </Field>
                            <Span className={'validation-warning'}>
                              {
                                ufpromise === ''
                                  ?
                                  (<div>Estado é obrigatório</div>)
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
                                className={citypromise === '' ? 'input border-warning' : 'input'}
                                onChange={event => setCitypromisse(event.target.value)}
                                value={citypromise}
                              />
                              <Span className={'validation-warning'}>
                                {
                                  citypromise === ''
                                    ?
                                    (<div>Cidade é obrigatório</div>)
                                    :
                                    null
                                }
                              </Span>
                            </Field>
                          </div>
                        </div>
                        <Field className="is-pulled-right">
                          <Button
                            type={'submit'}
                            className={'button color-logo'}
                            text={'Enviar endereço'}
                          />
                        </Field>
                      </Form>

                    </>
                  )
                  :
                  (
                    <>
                    </>
                  )
              }

            </>
          )
      }

    </div>
  );
};


export default Workadd;
