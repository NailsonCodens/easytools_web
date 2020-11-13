import React, { useState, useEffect } from 'react';
import julius from '../../../assets/images/juliosclean.jpg';
import alugue from '../../../assets/images/alugue.jpg';
import mundo from '../../../assets/images/mundo.jpg';
const Blog = () => {
  return (
    <div className="container">
      <p className="title-index-blog has-text-centered">Dicas do nosso blog</p>
      <p className="without2">Em nosso blog você vai encontrar muitas dicas e conteúdos úteis para sua vida.</p>
      <div className="columns cl-blog">
        <div className="column">
          <a href="https://blog.easytoolsapp.com/aluguel-de-ferramentas/" target="_blank">
            <div className="boxs-blog">
              <div className="box-img-blog">
                <img src={julius}  alt="JuliusClean" className=""/>
              <h2 className="text-boxs-blog has-text-left">10 Comentários que o Julius Rock faria na EasyTools</h2>
              </div>
              <br/>
              <button className="button is-info is-fullwidth"> Ler mais</button>
            </div>
          </a>
        </div>
        <div className="column">
          <a href="https://blog.easytoolsapp.com/ferramentas/como-seria-o-mundo-sem-ferramentas-e-equipamentos/" target="_blank">
            <div className="boxs-blog">
              <div className="box-img-blog">
                <img src={mundo}  alt="JuliusClean" className=""/>
              <h2 className="text-boxs-blog has-text-left">Como seria o mundo sem ferramentas e equipamentos?</h2>
              </div>
              <br/>
              <button className="button is-info is-fullwidth"> Ler mais</button>
            </div>
          </a>
        </div>
        <div className="column">
          <a href="https://blog.easytoolsapp.com/easytools/easytools-aluguel-ferramentas/" target="_blank">
            <div className="boxs-blog">
              <div className="box-img-blog">
                <img src={alugue}  alt="JuliusClean" className=""/>
              <h2 className="text-boxs-blog has-text-left">O que é a Easytools?</h2>
              </div>
              <br/>
              <button className="button is-info is-fullwidth"> Ler mais</button>
            </div>
          </a>
        </div>
      </div>
    </div>
  )
}

export default Blog;