import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from "react-redux";
import {Pictures} from '../../../store/actions/picture';

import {useDropzone} from 'react-dropzone'
import { firebaseStorage } from '../../../services/firebase';
import { Button } from '../../../components/Form/Button';
import { Form } from '@rocketseat/unform';
import Notification from '../../../utils/notification';
import { useParams } from "react-router-dom";
import api from '../../../services/api';

import {Titlepage} from '../../../components/Titles/Titlepages';

const Detail = (receive) => {
  const dispatch = useDispatch();
  useSelector(state => state.picture);

  let { id } = useParams();
  const [tool, setTool] = useState({});
  const [prices, setPrices] = useState({});
  const [listphoto, setListphoto] = useState([]);
  const [isactive, setActive] = useState([]);
  const [idu, setIdu] = useState('');
  const [imgtool, setImgtool] = useState([]);

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

  useEffect(() => {
    async function loadTool() { 
      const response = await api.get(`/tools/tool/${id}`, {
      });
      setTool(response.data.tool[0])
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
    const arrPreview = []

    let newarray = []
    if (acceptedFiles.length > 3) {
     let img0 = acceptedFiles[0]
     let img1 = acceptedFiles[1]
     let img2 = acceptedFiles[2]

     newarray.push(img0, img1, img2)
    } else {
      newarray = acceptedFiles
    }

    setActive(newarray);
    const list = newarray.map(file => {
      const preview = URL.createObjectURL(file)

      arrPreview.push(preview)
      setListphoto(arrPreview)
    })
  }, [])
  
  const {getRootProps, getInputProps} = useDropzone({onDrop, accept: 'image/jpeg'})

  const saveImages = () => {
    const data = new FormData();
  
    isactive.map(image => {
      data.append('pictures', image);
    })

    savedb(data)
  }

  async function savedb (pictures) {

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


	const pictures = useSelector(state => state.picture);

  return (
    <>
      <div className="container container-page">
        <Titlepage>ANÚNICIO: { tool.title }</Titlepage>
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
                  <b> Diária: </b> <span className="money">R$ { prices[0] } </span> <b> Quinzenal: </b> <span className="money">R$ { prices[1] } </span> <b> Mensal: </b> <span className="money">R$ { prices[2] } </span>

                </p>
                <p className="tool-datas"> 
                  <b> Contrato: </b> { tool.contract === 'Y' ? 'SIM' : 'NÃO' }
                  <b> Seguro: </b> { tool.insurance === 'Y' ? 'SIM' : 'NÃO' }
                  <b> Entraga: </b> { tool.delivery === 'Y' ? 'SIM' : 'NÃO' }
                  <b> Devolução: </b> { tool.devolution === 'Y' ? 'SIM' : 'NÃO' }
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
              <div className="columns box-imgs">
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
              <div className="columns">
                <div className="column">
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
          <div className="columns is-desktop ">
            <div className="column is-three-fifths box-inter">
              <div className="container">
                  
              </div>
            </div>
            <div className="column box-inter">

            </div>
          </div>
      </div>
    </>
  )
}

export default Detail; 