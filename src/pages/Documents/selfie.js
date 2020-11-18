import React, { useState, useCallback, useEffect } from 'react';
import {useDropzone} from 'react-dropzone';
import Notification from '../../utils/notification';
import EllipsisText from "react-ellipsis-text";
import { useDispatch } from "react-redux";
import api from '../../services/api';
import './style.css';
import {Selfie as Selfieus} from '../../store/actions/selfie';
import pdf from '../../assets/images/file.png';
import selfiedoc from '../../assets/images/selfiedoc.png'
import Resizer from 'react-image-file-resizer';

export default function Selfie({id}) {
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
            dispatch(Selfieus('ok'));
          }
        }
      }
    }
    loadPerfil();

    return () => {

    };
  // eslint-disable-next-line
  }, [id])


  const onDrop = useCallback(acceptedFiles => {    
    var preview = URL.createObjectURL(acceptedFiles[0])

    if (acceptedFiles[0].type !== 'image/jpeg' && acceptedFiles[0].type !== 'image/png') {
      setSelfie(pdf)
      setImage(acceptedFiles[0]);
      dispatch(Selfieus(acceptedFiles[0]));

    } else {
      setSelfie(preview)
    } 
    setActive(true)

    setActive(true)
      Resizer.imageFileResizer(
        acceptedFiles[0],
        1024,
        1024,
        'JPEG',
        38,
        0,
        uri => {
          var filenew = new File([uri], acceptedFiles[0].name, {type: acceptedFiles[0].type})
          preview = URL.createObjectURL(filenew)
          setImage(filenew);
          dispatch(Selfieus(filenew));
        },
        'blob'
      );
      // eslint-disable-next-line
  }, [])

  const {getRootProps, getInputProps} = useDropzone({onDrop})
   // eslint-disable-next-line
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
        <img src={selfiedoc} alt={'Selfie'} className="selfiedoc"/>
        <p class="has-text-centered">Tire uma selfie sua segurando seu documento aberto.
        Por favor, retire o documento do plastico.</p>
        <br/>
            {
              selfie === 'Não adicionado.' ? 
              (<span>{ selfie }</span>)
              :
              (
                <>
                  {
                    selfie.split('.')[1] === 'pdf' ? 
                    (
                      <img src={pdf} alt={pdf} className="imagedoc"/>
                    )
                    :
                    (
                      <img src={selfie} alt={selfie} className="imagedoc"/>
                    )
                  }
                </>
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
