import React from 'react';
import { Link } from 'react-router-dom';

import { Button } from '../../../components/Form/Button';
import {Titlepage} from '../../../components/Titles/Titlepages';

export default function Index({history}) {
  return (
    <>
      <div className="container container-page">
        <div className="columns">
          <div className="column has-text-left">
            <Titlepage>Anúncios</Titlepage>
          </div>
          <div className="column has-text-right">
            <Link to={'/lessor/ad/create'} className="is-info create-ad">
              <Button
                type={'submit'}
                class={'button is-info color-logo-lessor'} 
                text={'Cadastrar Anúncio'}
              />
            </Link>
          </div>
        </div>
        <div className="columns is-desktop">
          <div className="column box-inter">
            asdsad
          </div>
        </div>
      </div>
    </>
  )
}