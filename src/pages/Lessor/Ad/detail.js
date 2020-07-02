import React, { useEffect, useState, useCallback } from 'react';

import {useDropzone} from 'react-dropzone'
import { Button } from '../../../components/Form/Button';
import { Form } from '@rocketseat/unform';
import Notification from '../../../utils/notification';
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Warningtext } from '../../../components/Warningtext';
import api from '../../../services/api';
import {Titlepage} from '../../../components/Titles/Titlepages';
import Title from '../../../utils/title';
import { getAddress } from '../../../services/mapbox';
import Availability from './btAvailability';
import Resizer from 'react-image-file-resizer';
import {Photo1} from '../../../store/actions/photo1';
import {Photo2} from '../../../store/actions/photo2';
import {Photo3} from '../../../store/actions/photo3';

const Detail = ({history}) => {
  let { id } = useParams();

  const pt1 = useSelector(state => state.photo1);
  const pt2 = useSelector(state => state.photo2);
  const pt3 = useSelector(state => state.photo3);
  
  const dispatch = useDispatch();
  const [tool, setTool] = useState({});
  const [prices, setPrices] = useState({});
  const [listphoto, setListphoto] = useState([]);
  const [isactive, setActive] = useState([]);
  // eslint-disable-next-line
  const [idu, setIdu] = useState('');
  const [imgtool, setImgtool] = useState([]);
  const [showaddress, showLocation] = useState(false);
  const [add, setAdd] = useState('');
  const [neighboor, setNeighboor] = useState('');
  const [city, setCity] = useState('');
  const [uf, setUf] = useState('');
  const [photo1, setPhoto1] = useState('');
  const [photo2, setPhoto2] = useState('');
  const [photo3, setPhoto3] = useState('');

  const success = () => Notification(
    'success',
    'Imagens adicionadas com sucesso!', 
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

  const success2 = () => Notification(
    'success',
    'Imagens atualizadas com sucesso!', 
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

  useEffect(() => {
    async function loadTool() { 
      const response = await api.get(`/tools/tool/${id}`, {
      });
      document.title = Title(response.data.tool[0].title);
      setTool(response.data.tool[0])
      console.log(response.data.tool[0].category);

      setPrices(response.data.tool[0].prices.split(';'))
    }

    async function loadPerfil() { 
      const response = await api.get(`/perfil`, {
      });
      setIdu(response.data.user[0].id)
    }

    async function loadImages() {
      const response = await api.get(`/tools/images/${id}`, {
      });
      setImgtool(response.data.picture)
    }
    loadPerfil();
    loadTool();
    loadImages();
  }, [id]);

  const onDrop = useCallback(acceptedFiles => {
    var prod1 = ''; 

    if (acceptedFiles[0] !== undefined) {
      prod1 = Resizer.imageFileResizer(
        acceptedFiles[0],
        600,
        600,
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

    var prod2 = '';

    if (acceptedFiles[1] !== undefined) {
      prod2 = Resizer.imageFileResizer(
        acceptedFiles[1],
        600,
        600,
        'JPEG',
        60,
        0,
        uri => {
          var filenew = new File([uri], acceptedFiles[1].name, {type: acceptedFiles[1].type})
          //preview = URL.createObjectURL(filenew)
          setPhoto2(filenew)
          dispatch(Photo2(filenew));
        },
        'blob'
      );
    }

    var prod3 = '';

    if (acceptedFiles[2] !== undefined) {
      prod3 = Resizer.imageFileResizer(
        acceptedFiles[2],
        600,
        600,
        'JPEG',
        60,
        0,
        uri => {
          var filenew = new File([uri], acceptedFiles[2].name, {type: acceptedFiles[2].type})
          //preview = URL.createObjectURL(filenew)
          setPhoto3(filenew)
          dispatch(Photo3(filenew));
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

  console.log(listphoto)

  const {getRootProps, getInputProps} = useDropzone({onDrop, accept: 'image/jpeg'})

  const saveImages = () => {
    const data = new FormData();

    const arrpt = [pt1, pt2, pt3]; 

    arrpt.map(image => {
      data.append('pictures', image);
      return ''
    })
    savedb(data)  
  }

  async function savedb (pictures) {
    if (imgtool.length > 0) {
      await api.put(`tools/images/update/`, pictures, {
        headers: { 
          tool_id: id,
        }
      })
      .then((res) => {
        success2()
      })
      .catch((err) =>  {
        console.log(err.response)
      }) 
    } else {
      await api.post(`tools/images/add/`, pictures, {
        headers: { 
          tool_id: id,
        }
      })
      .then((res) => {
        success()
      })
      .catch((err) =>  {
        console.log(err.response)
      }) 
    }
  }

  const showAddress = () => {
    getAddress(tool.lng, tool.lat).then(address => {
      setAdd(address.data.features[0].text)
      setNeighboor(address.data.features[1].text)
      setCity(address.data.features[3].text)
      setUf(address.data.features[4].text)
    })

    if (showaddress === true) {
        showLocation(false)
    } else {
      showLocation(true)
    }
  }

  const redirectForm = () => {
   history.push(`/lessor/ad/edit/${id}`)
  }
  
  async function deleteTool () {
    await api.delete(`tools/delete/${id}`, {
    })
    .then((res) => {
      console.log(res)
    })
    .catch((err) =>  {
      console.log(err.response)
    })
    history.push(`/lessor/ad`)
  }

  return (
    <>
      <div className="container container-page">
        <Titlepage>
          ANÚNICIO: { tool.title } 
          <Button
            type={'button'}
            className={'button is-info color-logo-lessor button-edit'}
            text={'Alterar'}
            onClick={event => redirectForm()}
          />
          <Button
            type={'button'}
            className={'button is-info color-logo-lessor button-edit'}
            text={'Excluir'}
            onClick={event => deleteTool()}
          />
          <Availability idtool={tool.id} availability={tool.availability}/>
        </Titlepage>
          <div className="columns is-desktop ">
            <div className="column is-three-fifths box-inter">
              <div className="container">
                <p className="tool-datas">
                  <b>Título</b>
                  <br/>
                  { tool.title }
                </p>
                <p className="tool-datas">
                  <b>Descrição</b>
                  <br/>
                  { tool.description }
                </p>
                <p className="tool-datas">
                  <b>Marca: </b> { tool.brand } 
                  <b> Tipo: </b> { tool.type_spec } 
                  <b> Categoria: </b> { tool.category } 
                </p>
                <p className="tool-datas">
                  <b>Alimentação: </b> { tool.feeds } 
                  <b> Potência: </b> { tool.power } 
                  <b> Tensão: </b> { tool.tension } 
                </p>
                <p className="tool-datas">
                  <b> Acessórios: </b> { tool.accessory }  
                </p>
                <p className="tool-datas">
                  <b> Vai junto(Brinde): </b> { tool.follow }  
                </p>
                <p className="tool-datas">
                  <b> Indicação de uso: </b> { tool.use_indication }  
                </p>
                <p className="tool-datas">
                  <b>Preços:</b>
                  <br/>
                  <b> Diária: </b> <span className="money">R$ { prices[0] } </span> <b> Semanal: </b> <span className="money">R$ { prices[1] } </span> <b> Quinzenal: </b> <span className="money">R$ { prices[2] } </span> <b> Mensal: </b> <span className="money">R$ { prices[3] } </span>

                </p>
                <p className="tool-datas"> 
                  <b> Contrato: </b> { tool.contract === 'Y' ? 'SIM' : 'NÃO' }
                  <b> Seguro: </b> { tool.insurance === 'Y' ? 'SIM' : 'NÃO' }
                  <b> Entraga: </b> { tool.delivery === 'Y' ? 'SIM' : 'NÃO' }
                  <b> Devolução: </b> { tool.devolution === 'Y' ? 'SIM' : 'NÃO' }
                </p>
                <div>
                  <div className={'has-text-centered is-size-4 mwd-m-top'}><p>Endereço</p></div>
                  <div onClick={event => showAddress()} className={'mwd-expand'}>
                      <div className={'mwd-bar'}></div>
                      <div className={'mwd-expander'}>
                        <div className={'pos down-arrow'}></div>
                      </div>
                      <div className={'mwd-bar'}></div>
                  </div>
                </div>
                <p className={ showaddress === true ? 'block' : 'is-hidden' }>
                  <b>CEP: </b> { tool.location }
                  <b> Bairro: </b> { neighboor }
                  <br/>
                  <b> Endereço: </b> { add }
                  <br/>
                  <b> Cidade: </b> { city }
                  <b> Estado: </b> { uf }
                </p>
              </div>
            </div>
            <div className="column box-inter">
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
                        <img src={image} alt="EasyTools Logo" className="image-list"/>
                      </div>
                    ))
                  ) :
                  (
                    <>
                      {
                        imgtool.length === 0 ? (
                          <>
                            <div className="column">
                              <p>-</p>
                            </div>
                            <div className="column">
                              <p>-</p>
                            </div>
                            <div className="column">
                              <p>-</p>
                            </div>
                          </>
                        ) : (
                          imgtool.map(image => (
                            <div className="column" key={image.url}>
                              <img src={image.url} alt="EasyTools Logo" className="image-list"/>
                            </div>
                          ))
                        )
                      }
                    </>
                  )
                }
              </div>
              <br></br>
              <Warningtext>* A EasyTools aceita apenas imagem JPG ou JPEG</Warningtext>
              <div className="columns">
                <div className="column">
                  {
                    console.log(isactive.length)
                  }
                  {
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
                  }
                </div>
              </div>
            </div>
          </div>
      </div>
    </>
  )
}

export default Detail; 