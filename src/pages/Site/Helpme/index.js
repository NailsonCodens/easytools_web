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
            A EasyTools é uma locadora de equipamentos e ferramentas 100% On-line. 
            <br/>
            Somos a primeira locadora online delivery de equipamentos sem loja física. Você aluga e nós entregamos na sua casa o equipamento alugado.
            Alugue qualquer equipamento e ferramenta que precisa, chega de burocracias para alugar, venha para o digital com a EasyTools! 
            <br/>
            O processo de locação não demora mais que 30 minutos.
          </div>
        </div>
      </article>
      <article className={setworkit === true ? 'accordion is-active ' : ' accordion ' }>
        <div className="accordion-header">
          <p onClick={event => setWorkit(!setworkit)} className="name-click">Como funciona</p>
          <button className="toggle" aria-label="toggle" onClick={event => setWorkit(!setworkit)}></button>
        </div>
        <div className="accordion-body">
          <div className="accordion-content">
            É bem simple! Alugue em 4 passos:
            <br/><br/>
            1 - Cadastro
            <br/>
            Acesse nosso site ou baixe nosso app e clique em "Alugar", crie seu cadastro. * Vá em perfil e adicione os documentos necessários. * Caso não tenha os documentos neste momento, você pode fazer este processo quando for alugar um equipamento;
            <br/>
            <br/>
            2 - Locação
            <br/>
            Escolha o equipamento que deseja locar com a EasyTools, adicione o período de uso desejado e clique em "Alugar". Fique trânquilo, você não será cobrado nesta hora.
            * Você revisará na próxima pagina, o equipamento escolhido. * Depois, você precisar ler e entender as regras da locação. * Seguindo para finalizar, adicione o endereço onde o equipamento será entregue para uso.
            * Será exibido para você, o custo para levar o equipamento até sua casa.
            <br/>
            <br/>
            3 - Pagamento
            <br/>
            Logo após enviar seu aluguel, nós analisaremos os dados e equipamento alugado em 15 minutos nos primeiros 5 aluguéis, logo após os primeiros aluguéis, a análise é quase instantanea.
            Você receberá um link de pagamento e a confirmação do aluguel na sua conta e por e-mail. * Pagamento realizado, nós entregamos o equipamento na porta do seu endereço cadastrado em até 2 horas.
            <br/>
            Aceitamos pagamentos em cartão de crédito apenas, para a segurança dos seus dados.
            <br/><br/>
            4 - Entrega do equipamento
            <br/>
            Nós enviaremos um e-mail confirmando a entrega do equipamento no seu endereço. * Não entregaremos o equipamento a outra pessoa que não seja quem alugou.
            * Nós realizaremos um check-in junto com você quando formos entregar o equipamento. E fazemos um check-out na devolução.
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
            Chega de burocracia e papeladas desnecessárias, o nosso contrato é totalmente online, você recebe o contrato no seu e-mail cadastrado na EasyTools.
            <br/>
            * Quando você se cadastrar na plataforma e aceita os termos de uso e politicas, você automaticamente já aceita o contrato de futuras locações dentro da plataforma.
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
            Você não precisa pagar calção ou qualquer segurança para alugar com a EasyTools. Mas fique atento ao contrato e aos termos de uso.
            <br/>
            Temos regras e acordos sobre avarias e problemas com os equipamentos.
            <br/>
            Nós confiamos em você para usar nossos equipamentos!
           </div>
        </div>
      </article>
      <article className={setbreakdowns === true ? 'accordion is-active ' : ' accordion ' }>
        <div className="accordion-header">
          <p onClick={event => setBreakdowns(!setbreakdowns)} className="name-click">Avarias no equipamento</p>
          <button className="toggle" aria-label="toggle" onClick={event => setBreakdowns(!setbreakdowns)}></button>
        </div>
        <div className="accordion-body">
          <div className="accordion-content">
            Nós sabemos que equipamentos estragam sem que alguém tenha causado algum dano. 
            Em caso de equipamento avariado, nós faremos uma análise com os nossos tecnicos, se ficar provado avarias por parte do locatário, o locatário é responsável e terá que arcar com este custo de manutenção do mesmo.
            Se o equipamento falhar, ou estragar normalmente, sem avarias causadas pelo locatário, nos avise atraveś dos nossos canais de comunicação, Instagram, WhatsApp, e-mail e chat que nós rapidamente faremos a trocar do equipamento no local de uso.
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
            Dias antes do final do aluguel, nossa plataforma enviará avisos para que você esteja ciente de quando o equipamento precisa ser entregue. 
            No dia da entregam nós iremos buscar o equipamento, então deixe o equipamento pronto para que possamos levar. 
            * Se o equipamento não for devolvido na data prevista, contará o valor de uma diária a cada dia a mais do período de devolução previsto.
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
           A EasyTools é uma empresa delivery de equipamentos totalmente online, dispensando a necessidade de papeladas e burocracias para que você tenha o equipamento desejado, sem
           ter que ir a uma loja e/ou ficar horas esperando um orçamento ou até mesmo por telefone.
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
            Todos os dias da semana, das 8h às 19h, incluindo finais de semana e feriados, através dos chats disponíveis no aplicativo da EasyTools e no site oficial da EasyTools e por e-mail: easytoolsapp@gmail.com
          </div>
        </div>
      </article>      
    </section>
    </div>
    </>
  )
}

export default Helpme
