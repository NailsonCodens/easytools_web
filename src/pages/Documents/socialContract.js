import React, { useState, useCallback, useEffect } from 'react';
import { Button } from '../../components/Form/Button';
import {useDropzone} from 'react-dropzone';
import Notification from '../../utils/notification';
import EllipsisText from "react-ellipsis-text";
import sociali from '../../assets/images/selfie.png'
import api from '../../services/api';
import './style.css';
import queryString from 'query-string';
import { useLocation } from "react-router-dom";
import { useHistory } from 'react-router-dom';
import { useSelector } from "react-redux";

export default function SocialContract({id}) {
  let values = queryString.parse(useLocation().search);
  const link = useSelector(state => state.link);
  let history = useHistory();

  const [social, setSocial] = useState(sociali);
  const [namesocial, setNamesocial] = useState('');
  const [image, setImage] = useState('');
  const [isactive, setActive] = useState([]);
  const [showcheck, setShowcheck] = useState(false);
  const [perfil, setPerfil] = useState([]);

  const success2 = () => Notification(
    'success',
    'Documento atualizado com sucesso, vamos voltar onde estavamos?!', 
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


    async function loadSocial() { 
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
    loadSocial();

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
      success2()
      if (values.e === 'cs' && perfil[0].cpfcnpj.length > 14) {
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
