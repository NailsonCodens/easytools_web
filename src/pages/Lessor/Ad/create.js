import React from 'react';
/*
import { Form, Input } from '@rocketseat/unform';
import { Field, Label } from '../../../components/Form/Form';
import { Button } from '../../../components/Form/Button';
import { Span } from '../../../components/Span';
*/
import {Titlepage} from '../../../components/Titles/Titlepages';
import {SubTitlepages} from '../../../components/Titles/SubTitlepages';

export default function Create({history}) {
  return (
    <>
      <div className="container container-page">
        <Titlepage>Anúncio</Titlepage>
        <div className="columns is-desktop ">
          <div className="column is-three-fifths box-inter">
            <SubTitlepages>
              Usuario, você está preste a colocar um equipamento ou ferramenta para alugar, vamos lá?
            </SubTitlepages>
            <div className="container">
        
            </div>
          </div>
          <div className="column box-inter">
            sdasdasd
          </div>
        </div>
      </div>
    </>
  )
}