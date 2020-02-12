import React, { useState, useCallback } from 'react';
import { Button } from '../../../../../components/Form/Button';
import {useDropzone} from 'react-dropzone';
import '../style.css';
import rg from '../../../../../assets/images/rg.png'
import api from '../../../../../services/api';

export default function Document({id}) {
  const [document, setDocument] = useState(rg);
  const [image, setImage] = useState('');
  const [isactive, setActive] = useState([]);

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
    })
    .catch((err) => {
    })
  }


  return (
    <div>
      <div className="columns">
      <div className="column has-text-centered">
        <div className="column has-text-centered box-inter box-inter-padding">
          <div className={ isactive === true ? 'documents' : 'documents_mini'}>
            <img src={document} alt={document}/>
          </div>
          <div className="column box-inter">
            <div {...getRootProps()} className="drag-photo">
              <input {...getInputProps()} />
                Alterar Documento
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
