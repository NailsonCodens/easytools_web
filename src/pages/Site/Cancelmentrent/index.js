import React from 'react'
import {Helmet} from 'react-helmet'
import boycry from '../../../assets/images/man.svg'

const Cancelmentrent = ({history}) => {

  return (
    <>
      <Helmet>
        <title>Que notícia triste | EasyTools</title>
        <meta
          name="description"
          content="Conheça por que e para que nós existimos. Conheça nossa história"
        />
        <meta name="keywords" content="Sobre EasyTools, EasyTools Sobre EasyTools about, o que é a easytools, o que é easytools, onde alugar equipamentos e ferramentas"/>
      </Helmet>
      <div className="container">
        <div className="has-text-centered">
          <h3 className="unffortunily">Infelizmente você optou por cancelar o aluguel.</h3>
          <img src={boycry} alt="Desert" className="svgnotfound3"/>
          <p className="understand">
            Nós te entendemos, logo logo nós estaremos em sua cidade para te atender,
            <br/> 
            assim tendo um preço justo para entregar qualquer ferramenta que você deseja alugar.
            </p>
            <br/><br/>
            <a href="/s/" className={'button is-link is-light'}>Ir para o início</a>
        </div>
      </div>
    </>
  )
}

export default Cancelmentrent
