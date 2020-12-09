import React, { useEffect, useState, useCallback } from 'react';
import Scroll from '../../../../utils/scroll';
import api from '../../../../services/api';
import {Titlepage} from '../../../../components/Titles/Titlepages';
import { Button } from '../../../../components/Form/Button';
import Title from '../../../../utils/title';
import { Warningtext } from '../../../../components/Warningtext';
import { CheckboxIOS } from '../../../../components/Form/Button';
import { Field, Label } from '../../../../components/Form/Form';
import { Form, Input } from '@rocketseat/unform';
import CurrencyInput from 'react-currency-input';
import { useLocation, useHistory } from 'react-router-dom';
import Scrool from '../../../../utils/scroll';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { Span } from '../../../../components/Span';
import {useDropzone} from 'react-dropzone'
import queryString from 'query-string';
import Resizer from 'react-image-file-resizer';
import {Photo1} from '../../../../store/actions/photo1';
import Notification from '../../../../utils/notification';
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

export default function Adonsinit({history}) {
  let { id } = useParams();
  console.log(id)
  const [isactive, setActive] = useState([]);
  const [imgtool, setImgtool] = useState([]);
  const [listphoto, setListphoto] = useState([]);
  // eslint-disable-next-line
  const [photo1, setPhoto1] = useState('');
  const dispatch = useDispatch();

  const pt1 = useSelector(state => state.photo1);
  const [adon, setAdon] = useState([]);
  const [name, setName] = useState();
  const [description, setDescription] = useState();
  const [price, setPrice] = useState();
  const [checkad, setCheck] = useState('');
  const [url, setUrl] = useState();

  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
      checkad: 'Y',
      image: '',
      price: '',
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .required('Insira o nome por favor.'),
      price: Yup.string()
        .required('Insira o preço por favor.'),
    }),

    onSubmit: values => {
      if (id != undefined) {
        updateAdons(values)
      } else {
        saveAdons(values)
      }
    }
  });


  useEffect(() => {

    async function loadAdon() { 
      const response = await api.get(`/adons/adon/${id}`, {
      });
      setAdon(response.data.adon[0])

      response.data.adon.map(function (adon) {
        if (adon.name !== null) {
          setName(adon.name)
        }
        formik.values.name = adon.name

        if (adon.description !== null) {
          setDescription(adon.description)
        } 
        formik.values.description = adon.description

        if (adon.price !== null) {
          setPrice(adon.price)
        }
        formik.values.price = adon.price

          setCheck(adon.checkad);

        formik.values.checkad = adon.checkad

        if (adon.url !== null) {
          setUrl(adon.url)
        }
      })
    }
    loadAdon();
    // 
    return () => {
    }
  }, [formik.values])


  const success = () => Notification(
    'success',
    'Imagen adicionada com sucesso!', 
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


  const adons = () => {
    Scroll()
    history.push(`/lessor/ad/adons/`);
  }


  async function updateAdons (values) {
    await api.put(`adons/update/${id}`, values, {})
    .then((res) => {
      saveImages(id)
    }).catch((err) => {
      console.log(err)
    })     
  }


  async function saveAdons (values) {
    await api.post('adons/add/', values, {})
    .then((res) => {
      saveImages(res.data.adons.id)
    }).catch((err) => {
      console.log(err)
    })     
  }

  const handleChangeAdditionals = (input, event, type) => {
    formik.values.price = event
  }

  const handleCheckIOS = event => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const checkad = value ? 'Y' : 'N'

    formik.values.checkad = checkad
    setCheck(checkad)
  };

  console.log(checkad)

  const onDrop = useCallback(acceptedFiles => {
    // eslint-disable-next-line
    var prod1 = ''; 

    if (acceptedFiles[0] !== undefined) {
      prod1 = Resizer.imageFileResizer(
        acceptedFiles[0],
        300,
        300,
        'JPEG',
        60,
        0,
        uri => {
          var filenew = new File([uri], acceptedFiles[0].name, {type: acceptedFiles[0].type})
          dispatch(Photo1(filenew));
        },
        'blob'
      );
    } 

    const newarray = []
    const arrPreview = []

    acceptedFiles.map(file => {
      const preview = URL.createObjectURL(file)
      arrPreview.push(preview)
      setListphoto(arrPreview)
      setActive(arrPreview); 
      return ''
    })
  }, [])

  const {getRootProps, getInputProps} = useDropzone({onDrop, accept: 'image/jpeg'})

  const saveImages = (id) => {
    const data = new FormData();
    const arrpt = [pt1]; 

    arrpt.map(image => {
      data.append('image', image);
      return ''
    })
    savedb(data, id)  
  }

  async function savedb (image, id) {
      await api.put(`adons/images/${id}`, image, {})
      .then((res) => {
        success()
      })
      .catch((err) =>  {
        console.log(err.response)
      }) 
  }

  const handleNameChange = (name) => {
    formik.values.name = name
    setName(name);
  }

  const handleDescriptionChange = (description) => {
    formik.values.description = description
    setDescription(description);
  }

  return (
    <div className="container container-page">
      <div className="columns">
        <div className="column has-text-left">
          <Titlepage>Cadastrar - Opcionais</Titlepage>
        </div>
        <div className="column has-text-right">
          <br/><br/>
          <Button
            onClick={event => adons()}
            type={'button'}
            className={'button color-logo'}
            text={'Acessórios'}
          />
        </div>
      </div>
      <div className="columns is-desktop">
        <div className="column box-inter">
        <Form 
          onSubmit={ values => {
            Scrool();
            formik.handleSubmit(values);
          }} 
          noValidate
        >
          <Field className={'field'}>
            <Label for={'name'}>
              <b>Nome</b>
              <Input 
                name="name" 
                type="text" 
                placeholder="" 
                className={formik.touched.name && formik.errors.name ? 'input border-warning' : 'input'}
                onChange={event => {
                  handleNameChange(event.target.value)
                  formik.handleChange('name')
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
            </Label>
          </Field>
          <Field className={'field'}>
            <Label for={'description'}>
              <b>Descrição</b>
              <Input 
                name="description" 
                type="text" 
                placeholder="" 
                className={'input'}
                onChange={event => {
                  handleDescriptionChange(event.target.value)
                  formik.handleChange('description')
                }}
                value={description}
              />
            </Label>
          </Field>
          <Field className={'field'}>
            <Label for={'price'}>
              <b>Preço</b>
              <CurrencyInput
                name="price"
                type="text"
                decimalSeparator="," thousandSeparator="."
                placeholder="R$ 5,00"
                className={formik.touched.price && formik.errors.price ? 'input border-warning' : 'input'}
                onChange={event => {
                  handleChangeAdditionals('price', event, 'price');
                  formik.handleChange('price');
                }}
                value={price}
              />              
              <Span className={'validation-warning'}>
                {
                  formik.touched.price && formik.errors.price 
                ? 
                  (<div>{formik.errors.price}</div>) 
                : 
                  null
                }
              </Span>
            </Label>
          </Field>
          <br/>
          {
            url !== '' ? 
            (
              <>
                <Field>
                  <Label>
                    <b>Imagem atual do acessório</b>
                    <br/>
                    <img src={url} alt="EasyTools Logo" className="image-list-acessorios"/>
                  </Label>
                </Field>
              </>
            )
            :
            (<>
            
            
            </>)
          }



          <Field>
            <Label>
              <div {...getRootProps()} className="drag-photo">
                <input {...getInputProps()} />
                {
                  isactive.length > 0 ?
                    (<p> { isactive.length } arquivo(s) selecionados </p>) :
                    (
                      <>
                        {
                          imgtool.length > 0 ? (
                            <>
                            <p>Alterar fotos atuais.</p>
                            </>
                          ) :
                          (
                            <p>Arraste e solte 3 images em jpeg aqui, ou clique para selecionar.</p>
                          )
                        }
                      </>
                    )
                }
              </div>
              <div className="columns is-mobile box-imgs">
                {
                  listphoto.length > 0 ?
                  (
                    listphoto.map(image => (
                      <div className="column" key={image}>
                        <img src={image} alt="EasyTools Logo" className="image-list-acessorios"/>
                      </div>
                    ))
                  ) :
                  (
                    <>
                      {
                        imgtool.length === 0 ? (
                          <>
                            <div className="column image-list-acessorios">
                              <p>-</p>
                            </div>
                          </>
                        ) : (
                          imgtool.map(image => (
                            <div className="column" key={image.url}>
                              <img src={image.url} alt="EasyTools Logo" className="image-list-acessorios"/>
                            </div>
                          ))
                        )
                      }
                    </>
                  )
                }
                {
                  /*
                  isactive.length > 0 ?
                  (
                    <>
                      <br/><br/>
                      <Form
                        onSubmit={ values => {
                          saveImages()
                        }}
                        noValidate
                      >
                        <Button
                          type={'submit'}
                          className={'button is-info color-logo-lessor is-pulled-right'}
                          text={'Salvar'}
                          />
                      </Form>
                    </>
                  ) :
                  ('')
                  */
                }

              </div>
              <br></br>
              <Warningtext>* A EasyTools aceita apenas imagem JPG ou JPEG</Warningtext>

            </Label>
          </Field>
          <Field>
            <Label>
              <Warningtext>
                Acessório selecionado
              </Warningtext>
              {
                checkad.length > 0 ?
                (
                  <>
                    <div className="offer">
                      <CheckboxIOS 
                        onChange={handleCheckIOS}
                        name="checkad"
                        value={checkad} 
                        bind="check"
                        ch={checkad === 'Y' ? true : false}
                        off="não" 
                        on="Sim"
                       />
                    </div>                      
                  </>
                )
                :
                (
                  <>
                  {
                    id === undefined ? 
                    (
                      <>
                        <div className="offer">
                          <CheckboxIOS 
                            onChange={handleCheckIOS}
                            name="checkad"
                            value={checkad} 
                            bind="check"
                            ch={'Y'}
                            off="não" 
                            on="Sim"
                          />
                        </div>
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
            </Label>
          </Field>
          <Field className={'field'}>
            <Label for={'save'}>
              <Button
                type={'submit'}
                className={'button color-logo'} 
                text={id === undefined ? 'Cadastre-se' : 'Atualizar'}
              />
            </Label>
          </Field>
        </Form>
        </div>
      </div>
    </div>
  )
}
