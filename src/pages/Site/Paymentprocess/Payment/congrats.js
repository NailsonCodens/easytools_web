import React from 'react'
import { Link } from 'react-router-dom';
import {Helmet} from 'react-helmet';
import Scrool from '../../../../utils/scroll';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faHandshake, faTools, faCommentDots, faCalendarAlt, faCheckCircle, faExclamationTriangle, faGift} from '@fortawesome/free-solid-svg-icons'
library.add(faHandshake, faTools, faCommentDots, faCalendarAlt, faCheckCircle, faExclamationTriangle, faGift);

const Congrats = () => {
  return (
    <div className="container">
        <Helmet>
          <title>{ 'Parabéns, seu aluguel foi enviado' }</title>
        </Helmet>
        <div className="explorer">
      <h3 className="congrats">Parabéns, seu aluguel foi enviado <FontAwesomeIcon icon={['fas', 'handshake']} className="" size="1x"/></h3>
      <p className="text-congrats">Fique ligado, você vai receber uma notificação aqui na plataforma e por e-mail quando o pedido for aceito.</p>
      <br/>
      <p className="rentandnow">Aluguei e agora, como eu pago? </p>
      <p className="text-rentandnow">
        Depois de aceito o seu aluguel, a plataforma enviará uma notificação a você liberando o acesso para você pagar pelo aluguel feito. 
        <br/>
        Caso queira achar esteBasta ir em "Meus alugados" -> Detalhes e acessar o link, ou acessar o link de pagamento pela notificação.
      </p>
      <br/>
      <p className="rentandnow">Quanto tempo demora ? </p>
      <p>Nosso prazo de retorno é de 15 minutos nos primeiros 2 alugueis. Depois disso, seu aluguel será processado instântaneamente.</p>
      <br/><br/>
      <h3>
        Algumas dicas! 
      </h3>
      <div className="container columns">
        <div className="column">
          <div className="box-itens-helping">
            <ul>
              <li><FontAwesomeIcon icon={['fas', 'tools']} className="thumbup" size="2x"/> Quando receber o equipamento, faça um teste;</li>
              <li><FontAwesomeIcon icon={['fas', 'comment-dots']} className="thumbup" size="2x"/> Caso aconteça algum problema com o equipamento, avise imediantamente via email ou chat, e nós faremos a reposição;</li>
              <li><FontAwesomeIcon icon={['fas', 'calendar-alt']} className="thumbup" size="2x"/> Preze sempre pela devolução do equipamento na data prevista;</li>
              <li><FontAwesomeIcon icon={['fas', 'check-circle']} className="thumbup" size="2x"/> Deixe a ferramenta pronta para devolução no dia previsto;</li>
              <li><FontAwesomeIcon icon={['fas', 'exclamation-triangle']} className="thumbup" size="2x"/> Use o equipamento com consciência para que possamos preservá-lo por mais tempo;</li>             
            </ul>
          </div>
          <br/>
        </div>
      </div>
      <div className="columns">
        <div className="column">
          <ul className="notice-congrats">
            <li> Você pode ver as atualizações do seu pedido em "Notificações".</li>
            <li> Caso queira ver os seus alugueis, clique em "Meus alugados.</li>
          </ul>
        </div>
      </div>
      <br/><br/>
      <div className="columns">
        <div className="column">
          <Link
          to="/"
          onClick={event => Scrool(0,0)}
            className={'button is-pulled-left color-logo button-congrats'}                                
          >
            Pronto!
          </Link>
          <br/><br/>
        </div>
      </div>
    </div>
    </div>
  )
}

export default Congrats
