import React from 'react';
import boycry from '../../assets/images/man.svg'
import { Button } from '../../components/Form/Button';
import { Link } from 'react-router-dom';

const NotAvailable = () => {
  return (
    <div className="container container-notfound">
      <div className="columns">
        <div className="column">
          <p className="title-notfound">
            Este equipamento se encontra indisponível no momento.
          </p>
          <p className="text-notfound">
            Calma, nós vamos te levar para escolher outros equipamentos.
          </p>
          <Link to={'/'} className="is-info create-ad">
            <Button
              type={'submit'}
              className={'button color-logo'} 
              text={'Ir'}
            />
          </Link>
        </div>
        <div className="column has-text-centered">
          <img src={boycry} alt="Desert" className="svgnotfound2"/>
        </div>
      </div>
    </div>
  );
};

export default NotAvailable;