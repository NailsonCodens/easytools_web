import React, { useState, useCallback, useEffect } from 'react';
import { Button } from '../../components/Form/Button';
import {useDropzone} from 'react-dropzone';

import selfieu from '../../assets/images/selfie.png'
import api from '../../services/api';
import './style.css';
export default function Selfie({id}) {
  const [selfie, setSelfie] = useState(selfieu);
  const [image, setImage] = useState('');
  const [isactive, setActive] = useState([]);

  useEffect(() => {
    async function loadPerfil() { 
      if (id !== undefined) {
        const response = await api.get(`/documents/${id}`, {
        }); 
        setSelfie(response.data.documentUser[0].urldoc)
      }
    }
    loadPerfil();

    return () => {

    };
  }, [id])


  const onDrop = useCallback(acceptedFiles => {    
    const preview = URL.createObjectURL(acceptedFiles[0])
    setImage(acceptedFiles);
    setSelfie(preview)
    setActive(true)
  }, [])

  const {getRootProps, getInputProps} = useDropzone({onDrop})
 
  const updateSelfie = () => {
    const data = new FormData();
    data.append('selfie', image[0]);
    saveSelfie(data)
  }

  async function saveSelfie (selfie) {
    await api.put(`documents/selfie/${id}`, selfie, {})
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
        <div className={ isactive === true ? 'selfie' : 'selfie_mini'}>
            <img src={selfie} alt={selfie}/>
          </div>
          <div className="column box-inter">
            <div {...getRootProps()} className="drag-photo">
              <input {...getInputProps()} />
                Alterar Selfie
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
                  onClick={event => updateSelfie() }
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
