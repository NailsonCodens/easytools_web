import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet';
import api from '../../../../services/api';
import { useDispatch } from "react-redux";
import { useParams, useLocation } from "react-router-dom";
import { library } from '@fortawesome/fontawesome-svg-core'
import queryString from 'query-string';
import { Rentinfo } from '../../../../store/actions/rentinfo';
import { IntlProvider, FormattedNumber } from 'react-intl';
import moment from 'moment';
import Wootric from '../../../../components/Wootric';
import { faHandshake, faTools, faCommentDots, faCalendarAlt, faCheckCircle, faExclamationTriangle, faGift } from '@fortawesome/free-solid-svg-icons'
library.add(faHandshake, faTools, faCommentDots, faCalendarAlt, faCheckCircle, faExclamationTriangle, faGift);

const Congrats = () => {
  let values = queryString.parse(useLocation().search);
  let { id } = useParams();
  const [attempt, setAttempt] = useState([]);
  const [tool, setTool] = useState([]);
  const dispatch = useDispatch();
  const [setopennps, setOpennps] = useState(false);

  useEffect(() => {
    async function loadRentattempt() {
      const response = await api.get(`rent/attempt/${id}/${values.code_attempt}`, {
      });

      console.log(response)

      if (response.data.rentattempt.length > 0) {
        setAttempt(response.data.rentattempt[0]);
      }
    }
    loadRentattempt();

    async function loadTool() {
      const response = await api.get(`/tools_site/tool/${values.tool}`, {
      });
      if (response.data.tool.length > 0) {
        dispatch(Rentinfo(response.data.tool[0]));
        setTool(response.data.tool[0])
      } else {
      }
    }
    loadTool()
  }, []);


  const openNps = () => {
    setOpennps(true)
  }

  return (
    <div className="container">
      <progress class="progress is-success progressbar" value="100" max="100"></progress>
      <br />
      <Helmet>
        <title>{'Parabéns, sua reserva foi enviado'}</title>
      </Helmet>
      <div className="container">
        <h1 className="reserve">Sua reserva foi enviada, aguarde. </h1>
      </div>
      <div className="columns invert">
        <div className="column is-4">
          <div className="column has-centered-text">
            <div className="column">
              <div className="box-rent-payment">
                Código da reserva: {attempt.codeattempt}
                <div className="columns is-desktop is-mobile">
                  <div className="column">
                    <img src={tool.picture1} alt={tool.picture1} className="" />
                  </div>
                  <div className="column">
                    <img src={tool.picture2} alt={tool.picture2} className="" />
                  </div>
                  <div className="column">
                    <img src={tool.picture3} alt={tool.picture3} className="" />
                  </div>
                </div>
                <p className="title-tool-rules">{tool.title}</p>
                <div className="columns is-mobile">
                  <div className="column">
                    <b> Uso </b> <br /> {moment(attempt.startdate).format('DD/MM/YYYY')}
                  </div>
                  <div className="column">
                    <b> Devolução </b> <br /> {moment(attempt.enddate).format('DD/MM/YYYY')}
                  </div>
                </div>
                {
                  tool.tension !== '-' && tool.tension !== '/' ?
                    (
                      <>
                        <div className="columns is-mobile no-margin-top-columns">
                          <div className="column">
                            Tensão
                          </div>
                          <div className="column">
                            <div className="is-pulled-right">
                              {attempt.tension === 'Tri' ? 'Trifásico' : attempt.tension}
                            </div>
                          </div>
                        </div>
                      </>
                    )
                    :
                    (
                      <>
                        <div className="columns is-mobile no-margin-top-columns">
                          <div className="column">
                            Potência
                          </div>
                          <div className="column">
                            <div className="is-pulled-right">
                              <b>{tool.power}</b>
                            </div>
                          </div>
                        </div>

                      </>
                    )
                }
                <div className="columns is-mobile no-margin-top-columns dates-payment">
                  <div className="column is-4">
                    <IntlProvider locale="pt-br" timeZone="Brasil/São Paulo">
                      <FormattedNumber value={attempt.priceperiod} style="currency" currency="BRL" />
                      {
                        attempt.const
                      }
                    </IntlProvider>
                  </div>
                  <div className="column is-8">
                    <p className="is-pulled-right">
                      <IntlProvider locale="pt-br" timeZone="Brasil/São Paulo">
                        <FormattedNumber value={attempt.price} style="currency" currency="BRL" />
                        {
                          attempt.amount === undefined ? 'x 1 UN' : `x ${attempt.amount} UN`
                        }
                      </IntlProvider>
                    </p>
                  </div>
                </div>
                <div className="columns is-mobile no-margin-top-columns">
                  <div className="column">
                    <b>Total</b>
                  </div>
                  <div className="column">
                    <p className="is-pulled-right">
                      <IntlProvider locale="pt-br" timeZone="Brasil/São Paulo">
                        <b><FormattedNumber value={attempt.cost} style="currency" currency="BRL" /></b>
                      </IntlProvider>
                    </p>
                  </div>
                </div>
                <div className="columns is-mobile no-margin-top-columns">
                  <div className="column">
                    <b>Total com frete</b>
                  </div>
                  <div className="column">
                    <p className="is-pulled-right">
                      <IntlProvider locale="pt-br" timeZone="Brasil/São Paulo">
                        {console.log(attempt.freight)}
                        <b><FormattedNumber value={parseFloat(attempt.cost) + parseFloat(attempt.freight)} style="currency" currency="BRL" /></b>
                      </IntlProvider>
                    </p>
                  </div>
                </div>
                <div>

                </div>
              </div>
            </div>

          </div>
        </div>
        <div className="column">
          <div className="explorer">
            <b>Código da reserva: {attempt.codeattempt}</b>
            <h1 className="rentandnow">Aguarde, estamos processando seu pedido, você será notificado em até 10 minutos.</h1>
            <p className="text-congrats">Fique ligado, você vai receber uma notificação aqui na plataforma e por e-mail quando o pedido for processado.</p>
            <br />
            <p className="rentandnow">Pedi a ferramenta e agora, como eu pago? </p>
            <p className="text-rentandnow">
              Fique tranquilo, seu pedido está sendo processado.
              <b> Para cartão de crédito e boleto direto na plataforma </b>
              Você receberá uma notificação para pagamento quando seu pedido for aprovado.
              <br />
              <b> Para maquininha ou dinheiro </b>
              Neste caso, o seu pagamento só será processado no ato da entrega do equipamento em suas mãos pelo entregador passando o seu cartão na maquininha.
              <br /><br />
              Caso queira ver, ou <b>cancelar</b>, ou <b>pagar em caso de cartão de crédito ou boleto direto na plataforma </b> sua reserva basta ir em <b>"Minhas ferramentas" -> Detalhes e acessar o seu pedido</b>.
            </p>
            <br />
            <p className="rentandnow">Quanto tempo demora ? </p>
            <p>Nosso prazo de retorno é de 10 minutos na primeira reserva. Nas próximas reservas, será processado instântaneamente.</p>
            <br /><br />
            <p className="rentandnow">Posso mudar a data da reserva ? </p>
            <p>Pode sim sem problemas, desde que seja feito ao menos com 3 minutos antes do início do horário que você escolheu para receber a ferramenta.</p>
            <br /><br />  
            <p className="rentandnow">Se a ferramenta estragar ? </p>
            <p>Você deve nos informar em nossos canal de atendimento para que possamos fazer a troca da ferramenta para você. </p>
            <br /><br />
            {
              /*
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
              
            */
            }
            <br /><br />
            <div className="columns">
              <div className="column">
                <br /><br />
              </div>
            </div>
          </div>

        </div>
      </div>
      <Wootric />
    </div>
  )
}

export default Congrats
