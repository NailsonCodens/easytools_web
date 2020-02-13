import React, { useState, useEffect } from 'react';
import Document from '../../Documents/document';
import Proofaddress from '../../Documents/proofAddress';
import SocialContract from '../../Documents/socialContract';
import Selfie from '../../Documents/selfie';
import api from '../../../services/api';

const Doc = () => {
  const [user, setUser] = useState('')
  const [cpfcnpj, setCnpj] = useState('')

  useEffect(() => {
    async function loadPerfil() { 
      const response = await api.get(`/perfil`, {
      });
      setCnpj(response.data.user[0].cpfcnpj)
      setUser(response.data.user[0])
    }
    loadPerfil();
  }, []);

  return (
    <div className="container">
      <div className="columns">
        <div className="column">
          <h3 className="title-tool-only">
            Você precisa nos enviar fotos do seu documento para completar seu cadastro, é bem rapido.
            <br/><br/>
            Você só precisa fazer isso uma vez.
          </h3>
        </div>
      </div>
      <div className="columns">
        <div className="column">
          <h3 className="title-box-inter">Os documentos são:</h3> 
          <p>Foto do RG ou CNH.</p>
          <p>Uma selfie sua.</p>
          <p>E o comprovante de endereço.</p>
          <p>Se for empresa, foto do contrato.</p>
        </div>
        <div className="column">
          <div>
            <h3 className="title-box-inter">Foto do documento</h3>
            <div>
              <Document id={user.id}/>
            </div>
          </div>
          <div>
            <h3 className="title-box-inter">Uma Selfie</h3>
            <div>
              <Selfie id={user.id}/>
            </div>            
          </div>
          <div>
            <div className="column">
              <h3 className="title-box-inter">Comprovante de endereço</h3>
              <div>
                <Proofaddress id={user.id}/>
              </div>
            </div>
          </div>
          {
            cpfcnpj.length > 14 ? 
            (
              <div>
                <div className="column">
                  <h3 className="title-box-inter">Contrato Social</h3>
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
    </div>
  );
};

export default Doc;