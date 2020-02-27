import React, { useState, useEffect } from 'react';
import { Hr } from '../../../../components/Hr';
import { Button } from '../../../../components/Form/Button';
import api from '../../../../services/api';
import Title from '../../../../utils/title';
import moment from 'moment';
import 'moment/locale/pt-br';

const Pserfil = ({history}) => {
  const [user, setUser] = useState([]);
  document.title = Title(user.name);

  useEffect(() => {
    async function loadPerfil() { 
      const response = await api.get(`/perfil`, {
      });
      setUser(response.data.user[0])

    }
    loadPerfil();
  }, []);

  const editPerfil = () => {
    history.push(`/s/renter/perfil/edit`)
  }

  return (
    <div className="container">
      <div className="columns">
        <div className="column">
          <br/><br/>
          <p className="name-renter-left">{ user.name } { user.last_name }</p>
          <p className="email-renter">{ user.email }</p>
          <p> { user.cpfcnpj } </p>
          <p> { moment(user.birth_date).format('DD/MM/YYYY') } </p>
          <br/>
          <b>Endereço Pessoal</b>
          <p>{ user.address } { user.number }, {user.complement}</p>
          <p>{ user.location }</p>
          <p>{ user.uf }, { user.city } - { user.neighboor }</p>
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
            <img src={user.url} alt={user.url} className="logo-neighbor"/>
            <Hr/>
            <p className="name-renter">{user.name} { user.last_name }</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pserfil;