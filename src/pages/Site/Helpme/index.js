import React, { useState } from 'react'
import './style.css'
import {Helmet} from 'react-helmet'

const Helpme = () => {
  const [setaboutus, setAboutus] = useState(false);
  const [setworkit, setWorkit] = useState(false);
  const [setdeal, setDeal] = useState(false);
  const [setpayment, setPayment] = useState(false);
  const [setbreakdowns, setBreakdowns] = useState(false);
  const [setdevolution, setDevolution] = useState(false);
  const  [setstore, setStore] = useState(false);
  const [setattendance, setAttendance] = useState(false);

  return (
    <>
      <Helmet>
        <title>Tem alguma dúvida? | EasyTools</title>
        <meta
          name="description"
          content="Tire suas dúvidas aqui, quer alugar um equipamento ou ferramenta? EasyTools."
        />
        <meta name="keywords" content="Ajuda EasyTools, Ajuda ferramenta fácil"/>
      </Helmet>
      <div className="container">
      <br/><br/>
      <p className="title-about-us has-text-centered">Tem alguma dúvida?</p>
      <br/><br/>
      <section className="accordions">
        <article className={setaboutus === true ? 'accordion is-active ' : ' accordion ' }>
        <div className="accordion-header">
          <p onClick={event => setAboutus(!setaboutus)} className="name-click">O que é a EasyTools</p>
          <button className="toggle" aria-label="toggle" onClick={event => setAboutus(!setaboutus)}></button>
        </div>
        <div className="accordion-body">
          <div className="accordion-content">
          A EasyTools é uma locadora de equipamentos e ferramentas 100% online.
          <br/>
          Somos a primeira locadora online delivery de equipamentos sem loja física. Você aluga e nós entregamos em sua casa. Alugue qualquer equipamento e ferramenta que precisar, sem burocracia.
          <br/>
          O processo de locação não demora mais que 15 minutos.

          </div>
        </div>
      </article>
      <article className={setworkit === true ? 'accordion is-active ' : ' accordion ' }>
        <div className="accordion-header">
          <p onClick={event => setWorkit(!setworkit)} className="name-click">Como funciona?</p>
          <button className="toggle" aria-label="toggle" onClick={event => setWorkit(!setworkit)}></button>
        </div>
        <div className="accordion-body">
          <div className="accordion-content">
            É bem simple! Alugue em 4 passos:
            <br/><br/>
            1 - Cadastro
            <br/>
            Acesse nosso site ou baixe nosso app e clique em "Alugue o que você precisa" e crie seu cadastro. * Vá em Perfil e adicione os documentos necessários. * Caso não tenha os documentos neste momento, você pode fazer este processo quando for alugar um equipamento;
            <br/>
            <br/>
            2 - Locação
            <br/>
            Escolha o equipamento que deseja locar com a EasyTools, adicione o período de uso desejado e clique em "Alugar". Fique tranquilo, você não será cobrado nesta hora. * Você revisará na próxima página, o equipamento escolhido. * Depois, você precisa ler e entender as regras da locação. * Para finalizar, adicione o endereço onde o equipamento deverá ser entregue para uso. * Será informado o custo para levar o equipamento até o local desejado.
            <br/>
            <br/>
            3 - Pagamento
            <br/>
            Logo após solicitar seu equipamento, nós analisaremos os dados e produto alugado em até 15 minutos nos primeiros 5 aluguéis, nos demais aluguéis a análise será quase instantânea. Você receberá uma confirmação do aluguel na sua conta e por e-mail e o link de pagamento, que também poderá ser acessado dentro da plataforma, basta ir em "Meus alugados" -> Detalhes e acessar o link. * Pagamento realizado, nós entregaremos o equipamento no endereço cadastrado em até 2 horas.
            Por enquanto, aceitamos apenas pagamentos em cartão de crédito, para a segurança de seus dados. 
            <br/>
            <br/>
            4 - Entrega do equipamento
            <br/>
            Nós enviaremos um e-mail confirmando a entrega do equipamento em seu endereço. * Nós realizaremos um check-in junto com você quando formos entregar o equipamento e um check-out na devolução.
          </div>
        </div>
      </article>
      <article className={setdeal === true ? 'accordion is-active ' : ' accordion ' }>
        <div className="accordion-header">
          <p onClick={event => setDeal(!setdeal)} className="name-click">Contrato</p>
          <button className="toggle" aria-label="toggle" onClick={event => setDeal(!setdeal)}></button>
        </div>
        <div className="accordion-body">
          <div className="accordion-content">
          Sem burocracia e papeladas desnecessárias, o nosso contrato é totalmente online e você recebe em seu e-mail cadastrado na EasyTools.
          <br/>
          * Quando você se cadastrar na plataforma e aceitar os termos de uso e politicas, automaticamente, delcara aceito o contrato de futuras locações dentro da plataforma.
          </div>
        </div>
      </article>
      <article className={setpayment === true ? 'accordion is-active ' : ' accordion ' }>
        <div className="accordion-header">
          <p onClick={event => setPayment(!setpayment)} className="name-click">Precisa pagar calção?</p>
          <button className="toggle" aria-label="toggle" onClick={event => setPayment(!setpayment)}></button>
        </div>
        <div className="accordion-body">
          <div className="accordion-content">
            Você não precisa pagar calção ou qualquer garantia para alugar com a EasyTools. Mas fique atento ao contrato e aos termos de uso.
            <br/>
            Temos regras e acordos sobre avarias e problemas com os equipamentos.
            <br/>
            Nós confiamos em você para usar nossos equipamentos!
          </div>
        </div>
      </article>
      <article className={setbreakdowns === true ? 'accordion is-active ' : ' accordion ' }>
        <div className="accordion-header">
          <p onClick={event => setBreakdowns(!setbreakdowns)} className="name-click">E se o equipamento for avariado?</p>
          <button className="toggle" aria-label="toggle" onClick={event => setBreakdowns(!setbreakdowns)}></button>
        </div>
        <div className="accordion-body">
          <div className="accordion-content">
            Nós sabemos que equipamentos estragam. Se o equipamento falhar, ou apresentar defeito sem avarias causadas pelo locatário, nos informe através dos nossos canais de comunicação: Instagram, WhatsApp, e-mail ou chat que nós rapidamente faremos a troca do equipamento no local de uso. Em todos os casos de equipamento avariado, nós faremos uma análise com os nossos técnicos e se forem confirmadas avarias por parte do locatário, o mesmo será responsável e deverá arcar com o custo de manutenção, reparo ou novo produto.
          </div>
        </div>
      </article>      
      <article className={setdevolution === true ? 'accordion is-active ' : ' accordion ' }>
        <div className="accordion-header">
          <p onClick={event => setDevolution(!setdevolution)} className="name-click">Devolução</p>
          <button className="toggle" aria-label="toggle" onClick={event => setDevolution(!setdevolution)}></button>
        </div>
        <div className="accordion-body">
          <div className="accordion-content">
              Dias antes do fim do aluguel, nossa plataforma enviará avisos para que você esteja ciente de quando o equipamento precisa ser devolvido. No dia da devolução nós iremos buscar o equipamento, portanto, deixe o equipamento pronto para que possamos levar. * Se o equipamento não for devolvido na data prevista, será cobrado o valor de uma nova diária a cada dia ultrapassado ao período de devolução previsto.
          </div>
        </div>
      </article>      
      <article className={setstore === true ? 'accordion is-active ' : ' accordion ' }>
        <div className="accordion-header">
          <p onClick={event => setStore(!setstore)} className="name-click">A EasyTools tem loja física?</p>
          <button className="toggle" aria-label="toggle" onClick={event => setStore(!setstore)}></button>
        </div>
        <div className="accordion-body">
          <div className="accordion-content">
            Não, a EasyTools é uma empresa delivery de equipamentos totalmente online, dispensando a necessidade de papeladas e burocracias para que você tenha o equipamento desejado, sem precisar ir a uma loja e/ou ficar horas aguardando um orçamento.
          </div>
        </div>
      </article>   
      <article className={setattendance === true ? 'accordion is-active ' : ' accordion ' }>
        <div className="accordion-header">
          <p onClick={event => setAttendance(!setattendance)} className="name-click">Canais de atendimento</p>
          <button className="toggle" aria-label="toggle" onClick={event => setAttendance(!setattendance)}></button>
        </div>
        <div className="accordion-body">
          <div className="accordion-content">
            De segunda à  sexta das 8:00 às 19:00 e sábados das 08:00 à 12:00, através dos chats disponíveis no aplicativo da EasyTools, no site oficial da EasyTools e por e-mail: easytoolsapp@gmail.com
          </div>
        </div>
      </article>      
    </section>
    </div>
    </>
  )
}

export default Helpme
