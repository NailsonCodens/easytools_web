import React, { useState, useCallback, useEffect } from 'react';
import Document from '../../../Documents/document';
import SocialContract from '../../../Documents/socialContract';
import Selfie from '../../../Documents/selfie';
import api from '../../../../services/api';
import Warninggeneral from '../../../Warnings/Warninggeneral';
import { useLocation } from "react-router-dom";
import queryString from 'query-string';
import Scroll from '../../../../utils/scroll';
import { Button } from '../../../../components/Form/Button';
import { useSelector } from "react-redux";
import { Form } from '@rocketseat/unform';
import { useFormik } from 'formik';
import Notification from '../../../../utils/notification';

const Doc = ({history}) => {
  const [documenttype, setSelectedDocument] = useState({value: 'cpf', label: 'CPF' });
  const [image, setImage] = useState('');
  const [isactive, setActive] = useState([]);
  const [documentimg, setDocument] = useState('Não adicionado.');
  const [selfieimg, setSelfie] = useState('Não adicionado.'); 
  
  const documentdata = useSelector(state => state.document);
  const proofdata = useSelector(state => state.proof);
  const selfiedata = useSelector(state => state.selfie);
  const socialdata = useSelector(state => state.social);
  const us = useSelector(state => state.auth);

  let values = queryString.parse(useLocation().search);

  const [user, setUser] = useState('')
  const [cpfcnpj, setCnpj] = useState('')
  const [war, setWar] = useState('');

  const info = () => Notification(
    'info',
    'Salvando seus documentos, só um momento.', 
    {
      autoClose: 3000,
      draggable: false,
    },
    {
      position: "top-center",
      autoClose: 4800,
      hideProgressBar: true,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
    }
  )

  const info2 = (text) => Notification(
    'success',
    text, 
    {
      autoClose: 3000,
      draggable: false,
    },
    {
      position: "top-center",
      autoClose: 4800,
      hideProgressBar: true,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
    }
  )
  
  const onDrop = useCallback(acceptedFiles => {    
    const preview = URL.createObjectURL(acceptedFiles[0])
    setImage(acceptedFiles);
    setDocument(preview)
    setActive(true)
  }, [])

  const formik = useFormik({
    initialValues: {
    },

    onSubmit: value => {
      const document = new FormData();
      const social = new FormData();
      const selfie = new FormData();
      const proof = new FormData();
      console.log(documentdata, socialdata, selfiedata, proofdata)

      document.append('document', documentdata);
      social.append('enterprise', socialdata);
      selfie.append('selfie', selfiedata);
      proof.append('proof', proofdata);

      if (documentdata === '') {
        setWar('Adicione seu documento.');
        return 
      } else {
        if (documentdata !== 'ok') {
          if (documentdata.type !== 'application/pdf' && documentdata.type !== 'image/jpeg' && documentdata.type !== 'image/png') {
            setWar('Só são permitidos pdf e images jpg para documento.');
            return
          }
        }        
      }

      if (selfiedata === '') {
        setWar('Adicione uma selfie.');
        return 
      } else {
        if (selfiedata !== 'ok') {
          if (selfiedata.type !== 'application/pdf' && selfiedata.type !== 'image/jpeg' && selfiedata.type !== 'image/png') {
            setWar('Só são permitidos images jpg para selfie.');
            return 
          }  
        }
      }

      /*if (proofdata === '') {
        setWar('Adicione o comprovante de endereço.');
        return
      } else {
        if (proofdata !== 'ok') {
          if (proofdata.type !== 'application/pdf' && proofdata.type !== 'image/jpeg'  && proofdata.type !== 'image/png') {
            setWar('Só são permitidos pdf e images jpg para comprovante de endereço.');
            return 
          }  
        }
      }*/

      if (socialdata.value === 'cnpj' && socialdata !== '') {
        if (proofdata !== 'ok') {
          if (socialdata.type !== 'application/pdf' && socialdata.type !== 'image/jpeg') {
            setWar('Só são permitidos pdf e images jpg para contrato social.');
            return 
          }
        }
      }

      setWar('')
      saveAddress(value, document, selfie, proof, social, documenttype.value)
    }
  })


  useEffect(() => {
    async function loadPerfil() { 
      const response = await api.get(`/perfil`, {
      });


      if (response.data.user.length > 0) {
        setCnpj(response.data.user[0].cpfcnpj)
        setUser(response.data.user[0])  
      }
    }
    loadPerfil();
  }, []);

  const goClose = () => {
    history.push('/s/renter/perfil/documents');
  }

  const goScroll = () => {
    Scroll(400,400);
  }
 
  const goBack = () => {
    Scroll(0,0);
    history.push('/')
  }  

  const saveAddress = (data, datadoc, dataselfie, dataproof, datasocial, typedoc) => {

    var dc, sd, pd, ss = '';

    if (documentdata !== 'ok') {
      saveDocument(datadoc)
      dc = 'y'
    }


    setTimeout(function(){
      if (selfiedata !== 'ok') {
        saveSelfie(dataselfie)
        sd = 'y'
      }

      if (proofdata !== 'ok') {
        saveProf(dataproof)
        pd = 'y'
      }
    }, 1700);

    if (cpfcnpj.length > 14) { 
      if (socialdata === 'ok') {
        setWar('Você não adicionou nenhum dos documentos exigidos para alterar');
      }       
    }else {
      if (documentdata === 'ok' && selfiedata === 'ok' && proofdata === 'ok') {
        setWar('Você não adicionou nenhum dos documentos exigidos para alterar');
      }   
    }


    if (cpfcnpj.length > 14) { 
      if (socialdata !== 'ok') {
        saveSocial(datasocial)
        ss = 'y'
      }

      if (dc === 'y' || sd === 'y' || pd === 'y' || ss === 'y') {
        info()
        setTimeout(function(){
          if (cpfcnpj.length === 0) {
            info2('Aproveite e complete seu cadastro')
           history.push('/s/renter/perfil/edit');
          }else {
            info2('Pronto, Clique em explorar para escolher o que deseja alugar.')
          }
    
          //      
    
          //Scroll(400, 400);
            /*
              if (link !== '' && link !== null) {
                //history.push(link)
                //window.location.replace(link);
              } else {
                window.location.replace('/');
                history.push('/')
              }
              */
                
        }, 6500);    
      }
    }else {

      if (dc === 'y' || sd === 'y' || pd === 'y' || ss === 'y') {
        info()
        setTimeout(function(){
          if (cpfcnpj.length === 0) {
            info2('Aproveite e complete seu cadastro')
            history.push('/s/renter/perfil/edit');
           }else{
            info2('Pronto, Clique em explorar para escolher o que deseja alugar.')
           }
     
          //      info2()
    
          //Scroll(400, 400);
            /*
              if (link !== '' && link !== null) {
                //history.push(link)
                //window.location.replace(link);
              } else {
                window.location.replace('/');
                history.push('/')
              }
              */
                
        }, 6500);
    
      }

    }

  }

  async function saveDocument (document) {
    await api.put(`documents/document/${us.id}`, document, {})
    .then((res) => {
    })
    .catch((err) => {
    })
  }

  async function saveSelfie (selfie) {
    await api.put(`documents/selfie/${us.id}`, selfie, {})
    .then((res) => {
    })
    .catch((err) => {
    })
  }

  async function saveProf (proof) {
    await api.put(`documents/proof/${us.id}`, proof, {})
    .then((res) => {
    })
    .catch((err) => {
    })
  }

  async function saveSocial (enterprise, typedoc) {
    await api.put(`documents/enterprise/${us.id}`, enterprise, {})
    .then((res) => {
    })
    .catch((err) => {
    })
  }

  return (
    <>
      {
        war !== '' ? 
        (
        <Warninggeneral>{ war }</Warninggeneral>
        )
        : 
        (
          ''
        )
      }    
      {
        values.e === 'nd' ? 
        (
          <Warninggeneral close={goClose}>Precisamos de seus documentos, para sua segurança e da plataforma. Lembre-se que, ao selecionar CNPJ, você precisa enviar uma cópia do contrato social.</Warninggeneral>
        )
        : 
        (
          ''
        )
      }
      {
        values.e === 'df' ? 
        (
          <Warninggeneral close={goClose}>Você loca como CNPJ, portanto, precisamos do contrato social de sua empresa. Clique aqui para enviar.</Warninggeneral>
        )
        : 
        (
          ''
        )
      }
      {
        values.e === 'cs' ? 
        (
          <Warninggeneral close={goClose}>Você loca como CNPJ, portanto, precisamos do contrato social de sua empresa <span onClick={goScroll} className="is-text upload">Clique aqui para enviar.</span></Warninggeneral>
        )
        : 
        (
          ''
        )
      }
      <div className="container">
        <div className="columns">
          <div className="column">
            <br/><br/>
            <h3 className="title-tool-only">
              Nos envie seus documentos para completar seu cadastro, é bem rapido.
              <br/><br/>
              Você só precisa fazer isso uma vez.
            </h3>
          </div>
        </div>
        
        <Button
          type={'submit'}
          className={'button back-perfil'} 
          text={'Explorar'}
          onClick={event => goBack()}
        />

        <div className="columns">
          <div className="column">
            <h3 className="title-box-inter">Os documentos são:</h3> 
            <p>Foto do RG ou CNH.</p>
            <p>Uma foto do seu rosto.</p>
            <p>Se for empresa, foto do contrato.</p>
          </div>
        </div>
        <div className="columns">
          <div className="column">
            <div>
              <h3 className="title-box-inter">RG ou CNH próximo ao rosto </h3>
              
              <div>
                <Document id={user.id}/>
              </div>
            </div>
          </div>
          <div className="column">
            <div>
              <h3 className="title-box-inter">Foto do seu rosto</h3>
              <div>
                <Selfie id={user.id}/>
              </div>            
            </div>
          </div>
          {
            /*
          <div className="column">
            <h3 className="title-box-inter">Comprovante de endereço</h3>
            <div>
              <Proofaddress id={user.id}/>
            </div>
          </div>            
            */
          }
          {
            cpfcnpj !== null && cpfcnpj.length > 14  ? 
            (
              <div>
                <div className="column">
                  <h3 className="title-box-inter">Contrato Social (Em caso de CNPJ)</h3>
                  <div>
                    <SocialContract id={user.id}/>
                  </div>
                </div>
              </div>
            )
            :
            ('')
          }
        </div>
      </div>
      <div className="has-text-centered">
        <Form
          onSubmit={ (e, values) => {
            formik.handleSubmit(values)
          }}
          noValidate          
        >

            <Button
              type={'submit'}
              className={'button color-logo-lessor'} 
              text={cpfcnpj === 0 ? 'Salvar e ir para perfil' : 'Salvar documentos'}
              onClick={event => Scroll(400, 400)}
            />
        </Form>
      </div>
    </>
  );
};

export default Doc;