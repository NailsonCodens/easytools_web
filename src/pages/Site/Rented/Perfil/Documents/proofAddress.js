import React, { useState, useCallback, useEffect } from 'react';
import { Button } from '../../../../../components/Form/Button';
import {useDropzone} from 'react-dropzone';
import '../style.css';
import address from '../../../../../assets/images/selfie.png'
import api from '../../../../../services/api';

export default function Proofaddress({id}) {
  const [proof, stProof] = useState(address);
  const [image, setImage] = useState('');
  const [isactive, setActive] = useState([]);

  useEffect(() => {
    async function loadPerfil() { 
      if (id !== undefined) {
        const response = await api.get(`/documents/${id}`, {
        }); 
        stProof(response.data.documentUser[0].urldoc)
      }
    }
    loadPerfil();

    return () => {

    };
  }, [id])


  const onDrop = useCallback(acceptedFiles => {    
    const preview = URL.createObjectURL(acceptedFiles[0])
    setImage(acceptedFiles);
    stProof(preview)
    setActive(true)
  }, [])

  const {getRootProps, getInputProps} = useDropzone({onDrop})
 
  const updateProof = () => {
    const data = new FormData();
    data.append('proof', image[0]);
    saveProof(data)
  }

  async function saveProof (proof) {
    await api.put(`documents/proof/${id}`, proof, {})
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
        <div className={ isactive === true ? 'work' : 'work_mini'}>
            <img src={proof} alt={proof}/>
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
                  onClick={event => updateProof() }
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
