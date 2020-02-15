import React, { useState, useCallback, useEffect,  } from 'react';
import { Button } from '../../components/Form/Button';
import {useDropzone} from 'react-dropzone';
import rg from '../../assets/images/rg.png'
import api from '../../services/api';
import './style.css';
import Notification from '../../utils/notification';
import EllipsisText from "react-ellipsis-text";

export default function Document({id}) {
 
  const [document, setDocument] = useState(rg);
  const [namedocument, setNamedocument] = useState('');
  const [image, setImage] = useState('');
  const [isactive, setActive] = useState([]);

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
          setDocument(response.data.documentUser[0].urldoc);
          setNamedocument(response.data.documentUser[0].document);
        }
      }
    }
    loadPerfil();

    return () => {

    };
  }, [id])

  const onDrop = useCallback(acceptedFiles => {    
    const preview = URL.createObjectURL(acceptedFiles[0])
    setImage(acceptedFiles);
    setDocument(preview)
    setActive(true)
  }, [])

  const {getRootProps, getInputProps} = useDropzone({onDrop})
 
  const updateDocument = () => {
    const data = new FormData();
    data.append('document', image[0]);
    saveDocument(data)
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
        <div className="column has-text-centered box-inter box-inter-padding">
          <div className={ isactive === true ? 'documents' : 'documents_mini'}>
            <div className="columns">
              <div className="column is-2">
                <img src={document} alt={document}/>
              </div>
              <div className="column is-3">
                <EllipsisText text={namedocument} length={20} />
              </div>
            </div>
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
                <Button
                  type={'button'}
                  className={'button is-info color-logo-lessor is-pulled-right'}
                  text={'Salvar'}
                  onClick={event => updateDocument() }
                  />
              </>
            ) :
            ('')
          }
        </div>
      </div>
      </div>
    </div>
  )
}
