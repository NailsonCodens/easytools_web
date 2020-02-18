import React, { useState, useCallback, useEffect } from 'react';
import { Button } from '../../components/Form/Button';
import {useDropzone} from 'react-dropzone';
import Notification from '../../utils/notification';
import EllipsisText from "react-ellipsis-text";
import sociali from '../../assets/images/selfie.png'
import api from '../../services/api';
import './style.css';
export default function SocialContract({id}) {
  const [social, setSocial] = useState(sociali);
  const [namesocial, setNamesocial] = useState('');
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
          if (response.data.documentUser[0].enterprise !== null) {
            setNamesocial(response.data.documentUser[0].enterprise);
            setSocial(response.data.documentUser[0].urlenterprise)
            setShowcheck(true)  
          }
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
    setSocial(preview)
    setActive(true)
  }, [])

  const {getRootProps, getInputProps} = useDropzone({onDrop})
 
  const updateSocial = () => {
    const data = new FormData();
    data.append('enterprise', image[0]);
    saveSelfie(data)
  }

  async function saveSelfie (social) {
    await api.put(`documents/enterprise/${id}`, social, {})
    .then((res) => {
      success()
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
            <div className="columns">
              <div className="column is-2">
                <img src={social} alt={social}/>
              </div>    
              <div className="column">
                <EllipsisText text={namesocial} length={20} />
                { 
                  showcheck === true ?
                  (<span className="check-photo"></span>)
                  :
                  ('')
                }
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
                  onClick={event => updateSocial() }
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
