import React, { useState, useCallback, useEffect,  } from 'react';
import { Button } from '../../components/Form/Button';
import {useDropzone} from 'react-dropzone';
import rg from '../../assets/images/rg.png'
import api from '../../services/api';
import './style.css';
import Notification from '../../utils/notification';
import EllipsisText from "react-ellipsis-text";
import { useDispatch, useSelector } from "react-redux";
import {Document as Doc} from '../../store/actions/document';
import { useLocation } from 'react-router-dom';
import pdf from '../../assets/images/file.png';

import Resizer from 'react-image-file-resizer';


export default function Document({history, id}) {
	let location = useLocation().pathname;

  const dispatch = useDispatch();
  const [document, setDocument] = useState('Não adicionado.');
  const [namedocument, setNamedocument] = useState('');
  const [image, setImage] = useState('');
  const [isactive, setActive] = useState([]);
  const [showcheck, setShowcheck] = useState(false);

  const success = () => Notification(
    'success',
    'Documento atualizado com sucesso!', 
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

  useEffect(() => {
    async function loadPerfil() { 
      if (id !== undefined) {
        const response = await api.get(`/documents/${id}`, {
        });
        
        if (response.data.documentUser.length > 0) {
          if (response.data.documentUser[0].document !== null) {
            setShowcheck(true);
            setNamedocument(response.data.documentUser[0].document);
            setDocument(response.data.documentUser[0].urldoc);
            dispatch(Doc('ok'));
          }
        }
      }
    }
    loadPerfil();

    return () => {

    };
  }, [id])

  const onDrop = useCallback(acceptedFiles => {    
    var preview = URL.createObjectURL(acceptedFiles[0])

    if (acceptedFiles[0].type !== 'image/jpeg' && acceptedFiles[0].type !== 'image/png') {
      setDocument(pdf)
      setImage(acceptedFiles[0]);
      dispatch(Doc(acceptedFiles[0]));
    } else {
      setDocument(preview)
    }

    setActive(true)
      Resizer.imageFileResizer(
        acceptedFiles[0],
        1024,
        1024,
        'JPEG',
        29,
        0,
        uri => {
          var filenew = new File([uri], acceptedFiles[0].name, {type: acceptedFiles[0].type})
          preview = URL.createObjectURL(filenew)
          setImage(filenew);
          dispatch(Doc(filenew));
        },
        'blob'

      );
  }, [])

  const {getRootProps, getInputProps} = useDropzone({onDrop})
 
  const updateDocument = () => {
    const data = new FormData();
    data.append('document', image[0]);
  }

  async function saveDocument (document) {
    await api.put(`documents/document/${id}`, document, {})
    .then((res) => {
      success();
    })
    .catch((err) => {
      console.log(err.response)
    })
  }

  return (
    <div>
      <div className="columns">
      <div className="column has-text-centered">
        <div className="has-text-centered">

          {
            document === 'Não adicionado.' ? 
            (<span>{ document }</span>)
            :
            (
              <>
                {
                  document.split('.')[1] === 'pdf' ? 
                  (
                    <img src={pdf} alt={pdf} className="imagedoc"/>
                  )
                  :
                  (
                    <img src={document} alt={document} className="imagedoc"/>
                  )
                }
              </>
            )
          }
          {
            document !== 'Não adicionado.' ? 
            (
              <EllipsisText text={namedocument} length={20}/>
            )
            :
            ('')
          }

          { 
            showcheck === true ?
            (<span className="check-photo"></span>)
            :
            ('')
          } 
          </div>

          <div className="column box-inter">
            <div {...getRootProps()} className="drag-photo upload">
              <input {...getInputProps()} />
                Anexar
            </div>
          </div>
          {
            isactive === true ?
            (
              <>
              </>
            ) :
            ('')
          }
        </div>
      </div>
    </div>
  )
}
