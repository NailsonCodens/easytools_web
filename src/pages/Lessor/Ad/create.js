import React from 'react';
/*
import { Form, Input } from '@rocketseat/unform';
import { Field, Label } from '../../../components/Form/Form';
import { Button } from '../../../components/Form/Button';
import { Span } from '../../../components/Span';
*/
import MainForm from '../Ad/FormTools/MainForm';

import {Titlepage} from '../../../components/Titles/Titlepages';
import Title from '../../../utils/title';


export default function Create({history}) {
  document.title = Title('Cadastrar anúncio');

  return (
    <>
      <div className="container container-page">
        <Titlepage>Anúncio</Titlepage>
        <MainForm/>
      </div>
    </>
  )
}