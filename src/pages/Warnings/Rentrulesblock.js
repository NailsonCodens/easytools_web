import React from 'react';
import desert from '../../assets/images/desert.svg'
import { Button } from '../../components/Form/Button';
import { Link } from 'react-router-dom';

const Rentrulesblock = () => {
  return (
    <div className="container container-notfound">
      <div className="columns">
        <div className="column">
          <p className="title-notfound">
            Ops, parece que você se perdeu!
          </p>
          <p className="text-notfound">
            Não se preocupe, nós te levaremos para ver os equipamentos.
          </p>
          <Link to={'/'} className="is-info create-ad">
            <Button
              type={'submit'}
              className={'button color-logo'} 
              text={'Ver equipamentos'}
            />
          </Link>
        </div>
        <div className="column has-text-centered">
          <img src={desert} alt="Desert" className="svgnotfound"/>
        </div>
      </div>
    </div>
  );
};

export default Rentrulesblock;