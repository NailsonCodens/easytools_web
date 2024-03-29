import React, { useState, useCallback, useEffect } from 'react';
import {useDropzone} from 'react-dropzone';
import Notification from '../../utils/notification';
import EllipsisText from "react-ellipsis-text";
import api from '../../services/api';
import './style.css';
import { useLocation } from "react-router-dom";
import queryString from 'query-string';
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from 'react-router-dom';
import Scroll from '../../utils/scroll';
import {Proof} from '../../store/actions/proof';
import Resizer from 'react-image-file-resizer';

import pdf from '../../assets/images/file.png';

export default function Proofaddress({id}) {
  let location = useLocation().pathname;
  const dispatch = useDispatch();

  let history = useHistory();
  const link = useSelector(state => state.link);

  let values = queryString.parse(useLocation().search);

  const [proof, stProof] = useState('Não adicionado.');
  const [nameproof, setNameproof] = useState('');
  const [image, setImage] = useState('');
  const [isactive, setActive] = useState([]);
  const [perfil, setPerfil] = useState([]);
  const [showcheck, setShowcheck] = useState(false);

  const success2 = () => Notification(
    'success',
    'Documento atualizado com sucesso, vamos voltar onde estavamos?', 
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
      const response = await api.get(`/perfil`, {
      });
      setPerfil(response.data.user)
    }
    loadPerfil()


    async function loadProof() { 
      if (id !== undefined) {
        const response = await api.get(`/documents/${id}`, {
        });
        if (response.data.documentUser.length > 0) {
          if (response.data.documentUser[0].proof !== null) {
            setNameproof(response.data.documentUser[0].proof)
            stProof(response.data.documentUser[0].urlproof)
            setShowcheck(true)   
            dispatch(Proof('ok'));
          }
        }
      }
    } 
    loadProof();

    return () => {

    };
  }, [id])


  const onDrop = useCallback(acceptedFiles => {    
    var preview = URL.createObjectURL(acceptedFiles[0])

    if (acceptedFiles[0].type !== 'image/jpeg' && acceptedFiles[0].type !== 'image/png') {
      stProof(pdf)
      setImage(acceptedFiles[0]);
      dispatch(Proof(acceptedFiles[0]));
    } else {
      stProof(preview)
    }

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
          dispatch(Proof(filenew));
        },
        'blob'
      );

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
      Scroll(0,0)
      success2()
      if (values.e === 'df' && perfil[0].cpfcnpj.length <= 14 || values.e === 'nd' && perfil[0].cpfcnpj.length <= 14) {
        setTimeout(function(){
          history.push(localStorage.getItem('@lkt'))
        }, 1200);
      }
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
              proof === 'Não adicionado.' ? 
              (<span>{ proof }</span>)
              :
              (
                <>
                  {
                    proof.split('.')[1] === 'pdf' ? 
                    (
                      <img src={pdf} alt={pdf} className="imagedoc"/>
                    )
                    :
                    (
                      <img src={proof} alt={proof} className="imagedoc"/>
                    )
                  }
                </>
              )
            }
            <EllipsisText text={nameproof} length={20}/>
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
