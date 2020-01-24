import React from 'react';
import logo from '../../../../assets/images/logo.png'
import { Hr } from '../../../../components/Hr';
import { Button } from '../../../../components/Form/Button';

const Pserfil = ({history}) => {
  const editPerfil = () => {
    history.push(`/s/renter/perfil/edit/3`)
  }

  return (
    <div className="container">
      <div className="columns">
        <div className="column">
          <p className="name-renter-left">Nielson Ismael</p>
          <p className="email-renter">nielson@gmail.com.br</p>
          <p>09/01/2020</p>
          <br/>
          <b>Endereço Pessoal</b>
          <p>Rua alvares de azevedo 298, Casa 03</p>
          <p>CEP: 81.250-300</p>
          <p>Paraná, Curitiba - Cidade Industrial</p>
          <br/>
          <Button
            type={'button'}
            className={'button color-logo'}
            text={'Editar'}
            onClick={event => editPerfil()}
          />
        </div>
        <div className="column is-3">
          <div className="box-user has-text-centered">
            <img src={logo} alt={logo} className="logo-neighbor"/>
            <Hr/>
            <p className="name-renter">Nielson</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pserfil;