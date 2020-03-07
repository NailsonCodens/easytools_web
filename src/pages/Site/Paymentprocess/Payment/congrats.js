import React from 'react'
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faHandshake, faTools, faCommentDots, faCalendarAlt, faCheckCircle, faExclamationTriangle, faGift} from '@fortawesome/free-solid-svg-icons'
library.add(faHandshake, faTools, faCommentDots, faCalendarAlt, faCheckCircle, faExclamationTriangle, faGift);

const Congrats = () => {
  return (
    <div className="container explorer">
      <br/><br/>
      <h3 className="congrats">Parabéns, seu aluguel foi enviado <FontAwesomeIcon icon={['fas', 'handshake']} className="" size="1x"/></h3>
      <p className="text-congrats">Fique ligado, você vai receber uma notificação aqui na plataforma e por e-mail quando o pedido for aceito.</p>
      <p>Nosso prazo de retorno é de 15 minutos nos primeiros 5 alugueis. Depois disso, seu aluguel é processado instântaneamente.</p>
      <br/><br/>
      <h3>
        Algumas dicas! 
      </h3>
      <div className="columns">
        <div className="column">
          <div className="box-itens-helping">
            <ul>
              <li><FontAwesomeIcon icon={['fas', 'tools']} className="thumbup" size="2x"/> Quando receber o equipamento, teste;</li>
              <li><FontAwesomeIcon icon={['fas', 'comment-dots']} className="thumbup" size="2x"/> Caso aconteça algum problema do equipamento, avise imediantamente via emaile chat, que nós faremos a reposição;</li>
              <li><FontAwesomeIcon icon={['fas', 'calendar-alt']} className="thumbup" size="2x"/> Preze sempre pela devolução do equipamento na data prevista;</li>
              <li><FontAwesomeIcon icon={['fas', 'check-circle']} className="thumbup" size="2x"/> Deixe a ferramenta pronta para devolução no dia previsto;</li>
              <li><FontAwesomeIcon icon={['fas', 'exclamation-triangle']} className="thumbup" size="2x"/> Use o equipamento com consciência para que possa usa-lo novamente em um futuro aluguel;</li>             
              <li><FontAwesomeIcon icon={['fas', 'gift']} className="thumbup" size="2x"/> As vezes nós enviamos alguns mimos junto com os equipamentos, então fica ligado sempre que receber um equipamento blz?</li>             
            </ul>
          </div>
          <br/>
        </div>
      </div>
      <div className="columns">
        <div className="column">
          <ul className="notice-congrats">
            <li> Você pode ver as atualizações do seu pedido em "Notificações" no menu acima.</li>
            <li> Caso queira ver os seus aluguéis, clique em "Meus alugados.</li>
          </ul>
        </div>
      </div>
      <br/><br/>
      <div className="columns">
        <div className="column">
          <Link
          to="/"
            className={'button is-pulled-left color-logo'}                                
          >
            Pronto!
          </Link>
          <br/><br/>
        </div>
      </div>
    </div>
  )
}

export default Congrats
