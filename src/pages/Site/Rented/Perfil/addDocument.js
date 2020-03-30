import React, { useState, useEffect } from 'react';
import Document from '../../../Documents/document';
import Proofaddress from '../../../Documents/proofAddress';
import SocialContract from '../../../Documents/socialContract';
import Selfie from '../../../Documents/selfie';
import api from '../../../../services/api';
import { Warningtext } from '../../../../components/Warningtext';
import Warninggeneral from '../../../Warnings/Warninggeneral';
import { useLocation } from "react-router-dom";
import queryString from 'query-string';
import Scroll from '../../../../utils/scroll';
import { Button } from '../../../../components/Form/Button';

const Doc = ({history}) => {

  let values = queryString.parse(useLocation().search);

  const [user, setUser] = useState('')
  const [cpfcnpj, setCnpj] = useState('')

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
    if (localStorage.getItem('@lkt') !== "") {
      history.push(localStorage.getItem('@lkt'))
    } else {
      history.push('/s/renter/perfil')      
    }       
  }
  
  return (
    <>
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
              Precisamos que nos envie fotos de seus documentos para completar seu cadastro, é bem rapido.
              <br/><br/>
              Você só precisa fazer isso uma vez.
            </h3>
          </div>
        </div>
        
        <Button
          type={'submit'}
          className={'button back-perfil color-logo-lessor'} 
          text={'Voltar onde eu estava'}
          onClick={event => goBack()}
        />

        <div className="columns">
          <div className="column">
            <h3 className="title-box-inter">Os documentos são:</h3> 
            <p>Foto do RG ou CNH.</p>
            <p>Uma selfie sua.</p>
            <p>E o comprovante de endereço.</p>
            <p>Se for empresa, foto do contrato.</p>
            <Warningtext>Fique tranquilo, seus dados estão seguros conosco. Não os compartilharemos, venderemos ou usaremos indevidamente. </Warningtext>
          </div>
        </div>
        <div className="columns">
          <div className="column">
            <div>
              <h3 className="title-box-inter">RG uo CNH</h3>
              <div>
                <Document id={user.id}/>
              </div>
            </div>
          </div>
          <div className="column">
            <div>
              <h3 className="title-box-inter">Uma Selfie</h3>
              <div>
                <Selfie id={user.id}/>
              </div>            
            </div>
          </div>
          <div className="column">
            <h3 className="title-box-inter">Comprovante de endereço</h3>
            <div>
              <Proofaddress id={user.id}/>
            </div>
          </div>
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
    </>
  );
};

export default Doc;