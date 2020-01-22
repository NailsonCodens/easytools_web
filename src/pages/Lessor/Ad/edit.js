import React from 'react';
import MainForm from './FormTools/MainForm';
import {Titlepage} from '../../../components/Titles/Titlepages';
import Title from '../../../utils/title';


export default function Create({history}) {
  document.title = Title('Editar anúncio');  
  return (
    <>
      <div className="container container-page">
        <Titlepage>Anúncio - Editar</Titlepage>
        <MainForm/>
      </div>
    </>
  )
}