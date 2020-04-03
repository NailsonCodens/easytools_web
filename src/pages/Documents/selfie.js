import React, { useState, useCallback, useEffect } from 'react';
import { Button } from '../../components/Form/Button';
import {useDropzone} from 'react-dropzone';
import Notification from '../../utils/notification';
import EllipsisText from "react-ellipsis-text";
import { useDispatch, useSelector } from "react-redux";
import selfieu from '../../assets/images/selfie.png';
import api from '../../services/api';
import './style.css';
import {Selfie as Selfieus} from '../../store/actions/selfie';
import { useLocation } from "react-router-dom";
import pdf from '../../assets/images/file.png';

export default function Selfie({id}) {
  let location = useLocation().pathname;
  const dispatch = useDispatch();
  const [selfie, setSelfie] = useState('Não adicionado.');
  const [nameselfie, setNameselfie] = useState('');
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
          if (response.data.documentUser[0].selfie !== null) {
            setNameselfie(response.data.documentUser[0].selfie);
            setSelfie(response.data.documentUser[0].urlselfie)
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

    if (acceptedFiles[0].type !== 'image/jpeg' && acceptedFiles[0].type !== 'image/png') {
      setSelfie(pdf)
    } else {
      setSelfie(preview)
    } 
    setActive(true)

    dispatch(Selfieus(acceptedFiles[0]));
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
      success()
    })
    .catch((err) => {
    })
  }
  
  return (
    <div>
      <div className="columns">
      <div className="column has-text-centered">
        <div className="has-text-centered"> 
            {
              selfie === 'Não adicionado.' ? 
              (<span>{ selfie }</span>)
              :
              (
                <img src={selfie} alt={selfie} className="imagedoc"/>
              )
            }
            <EllipsisText text={nameselfie} length={20}/>
            { 
              showcheck === true ?
              (<span className="check-photo"></span>)
              :
              ('')
            }     
            </div>
            {
              location === '/s/renter/perfil/documents' ? 
              (
                ''
              )
              :
              (
                <div className="column box-inter">
                  <div {...getRootProps()} className="drag-photo upload">
                    <input {...getInputProps()} />
                      Anexar
                  </div>
                </div>
              )
            }
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
