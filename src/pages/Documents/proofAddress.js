import React, { useState, useCallback, useEffect } from 'react';
import { Button } from '../../components/Form/Button';
import {useDropzone} from 'react-dropzone';
import Notification from '../../utils/notification';
import EllipsisText from "react-ellipsis-text";
import address from '../../assets/images/selfie.png'
import api from '../../services/api';
import './style.css';
import { useLocation } from "react-router-dom";
import queryString from 'query-string';

export default function Proofaddress({id}) {
  let values = queryString.parse(useLocation().search);

  const [proof, stProof] = useState(address);
  const [nameproof, setNameproof] = useState('');
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
          if (response.data.documentUser[0].proof !== null) {
            setNameproof(response.data.documentUser[0].proof)
            stProof(response.data.documentUser[0].urlproof)
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
    console.log(values.e)

    /*await api.put(`documents/proof/${id}`, proof, {})
    .then((res) => {
      success()

      

    })
    .catch((err) => {
    })*/
  }
  
  return (
    <div>
      <div className="columns">
      <div className="column has-text-centered">
        <div className="column has-text-centered box-inter box-inter-padding">
        <div className={ isactive === true ? 'work' : 'work_mini'}>
            <div className="columns">
              <div className="column is-2">
                <img src={proof} alt={proof}/>
              </div>
              <div className="column is-3">
                <EllipsisText text={nameproof} length={20}/>
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
