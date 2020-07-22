import React, { useState, useEffect} from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from 'react-router-dom';
import queryString from 'query-string';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import InputMask from 'react-input-mask';
import {Helmet} from 'react-helmet'
import {Auth} from '../../store/actions/auth';
import moment from 'moment';
import 'moment/locale/pt-br';
import Notification from '../../utils/notification';
import { login } from '../../services/auth';
import { Form, Input } from '@rocketseat/unform';
import Select from 'react-select';
import { Field, Label } from '../../components/Form/Form';
import { Button, CheckboxIOS } from '../../components/Form/Button';
import { Warningtext } from '../../components/Warningtext';
import { Span } from '../../components/Span';
import { Hr } from '../../components/Hr';

import Modal from '../../components/Modal';

import Scrool from '../../utils/scroll';
import localForage from "localforage";
import api from '../../services/api';

import years from '../../utils/years';
import days from '../../utils/days';
import months from '../../utils/months';

import logo_blue from '../../assets/images/logo_blue.png';
import logo_yellow from '../../assets/images/logo.png';
import baby from '../../assets/images/baby.svg';
import man from '../../assets/images/man.svg';

import ReactGA from 'react-ga';
import './style.css';
const Singup = ({ history }) => {
  const infochoose = useSelector(state => state.rentaltool);
  const rentattempt = useSelector(state => state.rentattempt);
  const [rentattemptuse, setRentattemp] = useState({}); 
  const [infouse, setInfo] = useState({}); 

  const info = () => Notification(
    'info',
    'Só um momento...', 
    {
      autoClose: 3000,
      draggable: false,
    },
    {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
    }
  )

  const success = () => Notification(
    'success',
    'Tudo pronto, vamos prosseguir?', 
    {
      autoClose: 3000,
      draggable: false,
    },
    {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
    }
  )

  useEffect(() => {
    window.scrollTo(0, 0)

    const loadLinkstop = () => {
        var info = localStorage.getItem('@lkst');
        var rentattempt = localStorage.getItem('@obr');
        setInfo(JSON.parse(info))
        setRentattemp(JSON.parse(rentattempt))
    }
    loadLinkstop()

  }, [infochoose, rentattempt])

  let paramns = queryString.parse(useLocation().search);
  
  let type = paramns.type 
  let red = paramns.redirect

  let logo = logo_yellow;
  let typeuser = 'Renter';

  logo = type === 'lessor' ? logo_blue : logo;
  typeuser = type === 'lessor' ? 'Lessor' : 'Renter';
  
  // eslint-disable-next-line
  const [month, setSelectedMonth] = useState("");
  // eslint-disable-next-line
  const [day, setSelectedDays] = useState("");
  // eslint-disable-next-line
  const [year, setSelectedYears] = useState("");

  const [modal, setModal] = useState(false);
  const [terms, setTerms] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [modify, setModify] = useState('morethan18');
  const [usernew, setUsernew] = useState({});
  const [phone, setPhone] = useState('');
  const dispatch = useDispatch();
  useSelector(state => state.auth);

  const handleYearChange = selectedYear=> {
    formik.values.year = selectedYear.value;
    setSelectedYears(selectedYear);
  };

  const handleMonthChange = selectedMonth => {
    formik.values.month = selectedMonth.value;
    setSelectedMonth(selectedMonth);
  };

  const handleDayChange = selectedDay => {
    formik.values.day = selectedDay.value;
    setSelectedDays(selectedDay);
  };

  const handleCheckIOS = event => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const marketing = value ? 'Y' : 'N'
    formik.values.marketing = marketing
  };

  const formik = useFormik({
    initialValues: {
      email: '',
      name: '',
      last_name: '',
      phone: '',
      password: '',
      type: typeuser,
      terms: 'Y',
      marketing: 'Y',
      month: '',
      day: '',
      year: '',
      lat: 0,
      lng: 0
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Insira um e-mail válido.')
        .required('E-mail é obrigatório.'),

      name: Yup.string()
        .required('Nome é obrigatório.'),

      phone: Yup.string()
        .required('Celular é obrigatório.'),

      last_name: Yup.string()
        .required('Sobrenome é obrigatório.'),

      password: Yup.string()
        .required('Adicione uma senha.'),

      day: Yup.string()
      .required('Por favor, adicione sua data de nascimento para prosseguir'),

      month: Yup.string()
      .required('Por favor, adicione sua data de nascimento para prosseguir'),

      year: Yup.string()
      .required('Por favor, adicione sua data de nascimento para prosseguir'),
    }),

    onSubmit: values => {
      handSubmit(values)
    }
  });

  const hideModal = () => {
    setModal(false)
    return modal
  }

  const hideTerms = () => {
    setTerms(false)
    return terms
  }
  
  const hideRedirectlogin = () => {
    setRedirect(false)
    return redirect
  }

  const NoAcceptedTerms = () => {
    Scrool(0,0);
    setModify('noaccepted');
    setTerms(false);
    setModal(true);
  }


  function handSubmit(values) { 
    let { year, month, day } = values
    let birth_date = year + "-" + month + "-" + day;
    values['birth_date'] = birth_date;

    let morethan18 = new Date(year + 18, month - 1, day);
    let now = new Date();
    
    if (morethan18 <=now) {
      setModify('morethan18')
      setModal(false);
      setTerms(true);
    } else {
      setModal(true);
    }

    setUsernew(values);
  }

  async function AcceptedTerms () {
    Scrool(0,0)
    info()
    await api.post('user/create/', usernew, {})
    .then((res) => {
      let user = {
        email: usernew.email,
        password: usernew.password,
      }
      
      setTimeout(() => {
        ReactGA.event({
          category: 'Usuário se cadastrou',
          action: `Usuário ${user.id} ${user.email} se cadastrou na easytools`,
          label: 'Sign'
        });
        Scrool(0,0);
        Authregister(user);
      }, 1000);      
      console.log(res)
    })
    .catch((err) => {
      console.log(err)
      if (err.response.data.fields.email) {
        ReactGA.event({
          category: 'Erro no cadastro do usuário',
          action: `Usuário não conseguiu logar, erro de api`,
          label: 'Sign'
        });
        setTerms(false);
        setRedirect(true);
      }
    })
  }

  const handleChangePhone = (input, event) => {
    setPhone(event.target.value)
    formik.values.phone = event.target.value
  }

  async function saveTentative(){
    const response = await api.get(`/tools_site/tool/${infouse.tool}`, {
    });

    var useridt =  response.data.tool[0].user_id

    var attempt = {
      user_lessor_id: useridt,
      tool_id: infouse.tool,
      startdate: moment(infouse.start).format('YYYY-MM-DD'),
      enddate: moment(infouse.end).format('YYYY-MM-DD'),
      tension: rentattemptuse.tension || '-',
      days: rentattemptuse.amount,
      month: rentattemptuse.amountmonth || 0,
      amount: infouse.am,
      period: rentattemptuse.type,
      price: rentattemptuse.priceNoamount.toFixed(2),
      cost: rentattemptuse.pricefull,
      priceperiod: rentattemptuse.price.toFixed(2),
      freight: 0,
      accept: 0,
    }

    if (red !== 'backp'){
      console.log('sem mes e sem data')
//      window.location.href = '/'
      console.log('caindo aqui')
      //Tracking('Tentativa de aluguel maior com mêses e dias falha', `Tentativa de aluguel maior com mêses e dias`, 'Tentativa de aluguel maior com mêses e dias')
    } else {
      await api.post('rent/attempt/add/', attempt, {})
      .then((res) => {
        var idbooking = res.data.rentattempt.idf
        var codeattempt = res.data.rentattempt.codeattempt
        Scrool()
        //Tracking('Tentativa de aluguel', ` Tentativa de aluguel criada idbooking: ${idbooking} codeattempt: ${codeattempt}`, 'Tentativa de aluguel')
        success()
        history.push(`/s/payment/rent-rules?rent_attempt=${idbooking}&init=${attempt.startdate}&finish=${attempt.enddate}&tool=${attempt.tool_id}&am=${infouse.am}&tension=${attempt.tension}&code_attempt=${codeattempt}`)
      }).catch((err) => {
       // history.push('/')
        console.log(err.response)
      })
    }
  }
  
  async function Authregister (user) {
    await api.post('auth/token/', user, {})
    .then((res) => {
      let { id, email, name, type } = res.data.user;
      let { token } = res.data;
      dispatch(Auth(email, name, type, token, id));
      Scrool(0,0);
      login(token, type);
      ReactGA.event({
        category: 'Autenticou depois do cadastro',
        action: `Usuário ${id} ${email} logou na easytools`,
        label: 'Sign'
      });

      if (red === 'backp') {
        saveTentative(id)
      } else{
        window.location.href = '/'
      }
  
   })
    .catch((error) => {
    })
  }

  return (
    <>
      <Helmet>
        <title>Crie sua conta | EasyTools</title>
        <meta
          name="description"
          content="Crie sua conta e alugue equipamentos e ferramentas na EasyTools."
        />
        <meta name="keywords" content="Aluguel, Crie uma conta easytools"/>
      </Helmet>
      <div className="has-text-centered">
        <Link to="/"><Span className="button-enter">Voltar!</Span></Link>
      </div>
      <div className="has-text-centered container-sign-up">
        <div className="sign-up">
          <Link to={'/'}>
            <img src={logo} alt="EasyTools Logo" className="logo-sing-up"/>
          </Link>     
          <h3 className="title-singup">
            Cadastre-se no Easytools!
          </h3>
          <div>
            <div className="container">
              <div className="column">
                <Form 
                  onSubmit={ values => {
                    Scrool();
                    formik.handleSubmit(values);
                  }} 
                  noValidate
                >
                  <Field className={'field'}>
                    <Label for={'email'}>
                      <Input 
                        name="email" 
                        type="email" 
                        placeholder="E-mail" 
                        className={formik.touched.email && formik.errors.email ? 'input border-warning' : 'input'}
                        onChange={formik.handleChange}
                        value={formik.values.email}
                      />
                      <Span className={'validation-warning'}>
                        {
                          formik.touched.email && formik.errors.email 
                        ? 
                          (<div>{formik.errors.email}</div>) 
                        : 
                          null
                        }
                      </Span>
                    </Label>
                  </Field>
                  <Field className={'field'}>
                    <Label for={'name'}>
                      <Input 
                        name="name" 
                        type="text" 
                        placeholder="Nome" 
                        className={formik.touched.name && formik.errors.name ? 'input border-warning' : 'input'}
                        onChange={formik.handleChange}
                        value={formik.values.name}
                      />
                      <Span className={'validation-warning'}>
                        {
                          formik.touched.name && formik.errors.name 
                        ? 
                          (<div>{formik.errors.name}</div>) 
                        : 
                          null
                        }
                      </Span>
                    </Label>
                  </Field>
                  <Field className={'field'}>
                    <Label for={'last_name'}>
                      <Input 
                        name="last_name" 
                        type="text" 
                        placeholder="Sobrenome" 
                        className={formik.touched.last_name && formik.errors.last_name ? 'input border-warning' : 'input'}
                        onChange={formik.handleChange}
                        value={formik.values.last_name}
                      />
                      <Span className={'validation-warning'}>
                        {
                          formik.touched.last_name && formik.errors.last_name 
                        ? 
                          (<div>{formik.errors.last_name}</div>) 
                        : 
                          null
                        }
                      </Span>
                    </Label>
                  </Field>
                  <Field className={'field'}>
                    <Label for={'phone'}>
                      <InputMask
                        name="phone"
                        type="text"
                        mask="(99) 9 9999-9999" 
                        maskChar=" "
                        placeholder="(41) 9 9999-9999" 
                        className={formik.touched.phone && formik.errors.phone ? 'input border-warning' : 'input'}
                        onChange={event => handleChangePhone('phone', event)}
                        value={phone}
                      />
                      <Span className={'validation-warning'}>
                        {
                          formik.touched.phone && formik.errors.phone 
                        ? 
                          (<div>{formik.errors.phone}</div>) 
                        : 
                          null
                        }
                      </Span>
                    </Label>
                  </Field>
                  <Field className={'field'}>
                    <Label for={'password'}>
                      <Input 
                        name="password" 
                        type="password" 
                        placeholder="Crie sua senha" 
                        className={formik.touched.password && formik.errors.password ? 'input border-warning' : 'input'}
                        onChange={formik.handleChange}
                        value={formik.values.password}
                      />
                      <Span className={'validation-warning'}>
                        {
                          formik.touched.password && formik.errors.password 
                        ? 
                          (<div>{formik.errors.password}</div>) 
                        : 
                          null
                        }
                      </Span>
                    </Label>
                  </Field>
                  <div className="container">
                    <Warningtext>Mínimo de 8 caracteres</Warningtext>
                    <Warningtext>Conter números e símbolos</Warningtext>
                    <Warningtext>Não conter partes do seu e-mail</Warningtext>
                    <Warningtext>Mínimo de 1 caracter maiúsculo</Warningtext>
                  </div>
                  <br/>
                  <Field className={'field'}>
                  <Label for={'birth_date'}>Data de nascimento</Label>
                    <div className="columns">
                      <div className="column">
                        <Field className={'field'}>
                          <Label for={'day'}>
                            <Select
                              className={formik.touched.day && formik.errors.day ? 'border-warning' : ''}
                              value={day}
                              onChange={selectedOption => {
                                handleDayChange(selectedOption);
                                formik.handleChange("day");
                              }}
                              options={days}
                              isSearchable={false}
                              placeholder={'Dia'}
                            />
                          </Label>
                        </Field>
                      </div> 
                      <div className="column">
                        <Field className={'field'}>
                          <Label for={'month'}>
                            <Select
                              className={formik.touched.month && formik.errors.month ? 'border-warning' : ''}
                              value={month}
                              onChange={selectedOption => {
                                handleMonthChange(selectedOption);
                                formik.handleChange("month");
                              }}
                              options={months}
                              isSearchable={false}
                              placeholder={'Mês'}
                            />
                          </Label>
                        </Field>
                      </div>                     
                      <div className="column">
                        <Field className={'field'}>
                          <Label for={'year'}>
                            <div className="">
                              <Select
                                className={formik.touched.year && formik.errors.year ? 'border-warning' : ''}
                                value={year}
                                onChange={selectedOption => {
                                  handleYearChange(selectedOption);
                                  formik.handleChange("year");
                                }}
                                options={years}
                                isSearchable={false}
                                placeholder={'Ano'}
                              />
                            </div>
                          </Label>
                        </Field>
                      </div>
                    </div>
                    <Span className={'validation-warning'}>
                        {
                        // eslint-disable-next-line
                        formik.touched.month && formik.errors.month || formik.touched.day && formik.errors.day || formik.touched.year && formik.errors.year
                        ? 
                          (<div>Por favor, adicione sua data de nascimento para prosseguirmos</div>) 
                        : 
                          null
                        }
                      </Span>
                  </Field>
                  <Field>
                    <Label>
                      <Warningtext>
                        Aceito receber emails, ofertas e marketing da EasyTools. Você pode desabilitar esta opção quando quiser, basta acessar nas configurações de sua conta.
                      </Warningtext>
                      <div className="offer">
                        <CheckboxIOS 
                          onChange={handleCheckIOS}
                          name="marketing"
                          value={formik.values.marketing} 
                          bind="checksignup"
                          ch={true}
                          off="" 
                          on="Sim"
                        />
                      </div>
                    </Label>
                  </Field>
                  <Field className={'field'}>
                    <Label for={'save'}>
                      <Button
                        type={'submit'}
                        className={'button is-fullwidth color-logo'} 
                        text={'Cadastre-se'}
                      />
                    </Label>
                  </Field>
                </Form>
              </div>
              <Hr/>
              <div className="">
                <Span>Já tem conta na EasyTools? </Span>
                <Link to="/?redirect"><Span className="button-enter-2">Entrar</Span></Link>
              </div>
            </div>
            <Modal 
              show={redirect} 
              onCloseModal={hideRedirectlogin}
              closeOnEsc={true} 
              closeOnOverlayClick={true}
            >
              <h2 className="title has-text-centered">Parece que você já tem uma conta com este usuário</h2>
              <div className="has-text-centered">
                <div className="">
                  <Span>Já tem conta da EasyTools? </Span>
                  <Link to="/signin"><Span className="button-enter">Entrar</Span></Link>
                </div>
              </div>
            </Modal>
            <Modal 
              show={terms} 
              onCloseModal={hideTerms}
              closeOnEsc={true} 
              closeOnOverlayClick={true}
            >
              <h2 className="title">Termos e condições de uso</h2>
              <div className="terms">
              <div className="container-full">
                Bem-vindo a Easytools!
                <br/><br/>
                Estes Termos de Uso regem seu uso na Easytools inscrita no Cadastro Nacional de Pessoas Jurídicas do Ministério da Fazenda (CNPJ/MF) 31.029.517/0001-37,  com sede na rua Pedro Baggio, n° 601, em Campina Grande do Sul, Araçatuba, Paraná, e fornecem informações sobre o Serviço da Easytools, descritos abaixo. Quando você cria uma conta em nosso website, aplicativo ou qualquer plataforma que seja de nossa autoria, você concorda com estes termos.
                <br/><br/>
                O Serviço Easytools Aluguel de equipamentos e ferramentas online, é um dos produtos da Easytools, fornecido a você. Estes Termos de Uso, por conseguinte, constituem um acordo entre você e a Easytools.
                <br/><br/>
                <b>POR FAVOR, LEIA COM ATENÇÃO ESTES TERMOS ANTES DE ACESSAR OU USAR OS SERVIÇOS.</b>
                <br/><br/>
                Ao acessar e usar os Serviços você concorda com os presentes termos e condições, que estabelecem o relacionamento contratual entre você, na qualidade de usuário(a), e a Easytools. Se você não concorda com estes Termos, você não pode acessar nem usar os Serviços. Mediante referido acesso e uso, estes Termos imediatamente encerram, substituem e superam todos os acordos, Termos e acertos anteriores entre você e qualquer Afiliada da Easytools. A Easytools poderá imediatamente encerrar estes Termos ou quaisquer Serviços em relação a você ou, de modo geral, deixar de oferecer ou negar acesso aos Serviços ou a qualquer parte deles, a qualquer momento e por qualquer motivo.
                <br/><br/>
                A Easytools poderá alterar os Termos relativos aos Serviços a qualquer momento. Aditamentos entrarão em vigor quando a Easytools fizer a postagem da versão atualizada dos Termos neste local ou das condições atualizadas ou Termos adicionais sobre o respectivo Serviço. O fato de você continuar a acessar ou usar os Serviços após essa postagem representa seu consentimento em vincular-se aos Termos alterados.
                <br/><br/>
                <p className="topics-terms">1. Os Serviços</p>
                Os Serviços integram uma plataforma de tecnologia que permite aos(às) Usuários(as) de aplicativos móveis ou sites de Internet da Easytools, fornecidos como parte dos Serviços, solicitar e programar serviços de aluguel de equipamentos e ferramentas.
                O serviço prestado a você, inclui diversas possibilidades. Nosso maior propósito é trazer facilidade e comodidade no aluguel de equipamentos e ferramentas de foma totalmente online mediante delivery. Quer seja para uso profissional ou uso pessoal.
                <br/><br/>
                <b><i>O serviço é composto pelas seguintes propostas:</i></b>
                <br/><br/>
                <b>Facilitar o aluguel de equipamentos e ferramentas necessárias para realizar qualquer empreendimento:</b>
                <br/>
                O mercado de aluguel de equipamentos e ferramentas existem a muito tempo, mas por ser tão antigo, também é muito arcaico e burocrático. Pensando nisso, a Easytools vem para facilitar o acesso a estes equipamentos para que de forma fácil, você possa consegui-los e usá-los de forma mais acessível e rápida. 
                Este serviço serve também para quem não tem a prática de alugar equipamentos e ferramentas, mas que em algum momento precisa realizar algo que dependa do mesmo, assim fornecendo a você a possibilidade de uso deste equipamento, através da economia colaborativa (“Aluguel”).
                <br/><br/>
                <b>Desburocratizar o aluguel de ferramentas e equipamentos:</b>
                <br/>
                Tecnologia serve para melhorar a vida de muitas pessoas. Nós temos como objetivo, trazer acessibilidade a este setor, trazer tecnologias e a capacidade de se locar um equipamento de forma simples e digital.
                <br/><br/>
                <b>Possibilidade de uso sem comprar:</b>
                <br/>
                Usar equipamentos e ferramentas através da economia colaborativa sem que vocẽ precisa gastar dinheiro comprando algo que não vai ser usado sempre. Contribuindo assim para um mundo mais coerente e sustentável.
                <br/><br/>
                <p className="topics-terms">2. Licença</p>

                Sujeito ao cumprimento destes Termos, a Easytools outorga a você uma licença limitada, não exclusiva, não passível de sub licença, revogável e não transferível para: (i) acesso e uso dos Aplicativos e Sites em seu dispositivo pessoal, exclusivamente para o seu uso dos Serviços; e (ii) acesso e uso de qualquer conteúdo, informação e material correlato que possa ser disponibilizado por meio dos Serviços, em cada caso, para seu uso pessoal, nunca comercial. Quaisquer direitos não expressamente outorgados por estes Termos são reservados à Easytools e suas afiliadas licenciadores.
                <br/><br/>

                <p className="topics-terms">3. Utilização da plataforma</p>
                3.1 Para acessar e usar a Plataforma da Easytools ou registrar uma conta na Easytools, é necessário que você seja um indivíduo com pelo menos 18 anos ou um negócio, organização ou outra entidade jurídica devidamente organizada e validamente existente em conformidade com as leis do país em que você está estabelecido, e que seja capaz de celebrar contratos vinculantes.
                <br/><br/>
                3.2 A Easytools pode tornar o acesso e o uso da Plataforma Easytools, ou certas áreas ou recursos da Plataforma Easytools sujeitos a determinadas condições ou exigências, como a conclusão de um processo de verificação, o atendimento a critérios de elegibilidade ou qualidade específicos, o atendimento de princípios de Avaliações ou Comentários, ou histórico de reserva e cancelamento de um Membro.
                <br/><br/>
                3.3 É difícil a verificação do Usuário na Internet, e não assumimos a responsabilidade pela confirmação de qualquer identidade de um Membro. Não obstante o disposto acima, para fins de transparência e prevenção de fraude, e conforme permitido pelas leis aplicáveis, nós podemos, mas não temos a obrigação de (i) solicitar aos Membros que forneçam alguma identificação oficial ou outras informações, ou realizem verificações adicionais para ajudar a verificar as identidades e os históricos de Membros, (ii) fazer uma amostragem de Membros comparada a bancos de dados de terceiros ou outras fontes e solicitar relatórios de prestadores de serviço, e (iii) quando tivermos informações suficientes para identificar um Membro, obter relatórios de registros públicos de condenações criminais ou registros de agressores sexuais ou uma versão equivalente de registros ou histórico do agressor sexual na jurisdição local (se disponível).
                <br/><br/>
                3.4 Caso você acesse ou faça download do Aplicativo da Apple App Store, você concorda com o Contrato de Licença de Usuário Final de Aplicativo Licenciado da Apple. Algumas partes da Plataforma Easytools executam os serviços de mapa do Google Maps/Earth, incluindo API(s) do Google Maps. O uso do Google Maps/Earth está sujeito aos Termos de Serviço Adicionais do Google Maps/Google Earth. Em caso de acesso pelo site, ao criar uma conta em nossas plataformas você aceita os usos e termos legais.
                <br/><br/>
                <p className="topics-terms">4. Uso dos serviços</p>

                <b><i>Conta de usuário</i></b>
                <br/><br/>
                Para utilizar grande parte dos Serviços, você deve registrar-se e manter uma conta pessoal de usuário de Serviços (“Conta”). Você deve ter pelo menos 18 anos para registrar uma Conta. O registro de Conta exige que a Easytools colete determinados dados pessoais, que podem incluir seu nome, endereço, número de telefone celular e data de nascimento, assim como pelo menos um método de pagamento válido (cartão de crédito ou parceiro de pagamento aceito pela Easytools). Você concorda em manter informações corretas, completas e atualizadas em sua Conta. Se você não mantiver informações corretas, completas e atualizadas em sua Conta, inclusive se o método de pagamento informado for inválido ou expirado, você poderá ficar impossibilitado(a) de acessar e usar os Serviços ou da Easytools poderá resolver estes Termos. Você é responsável por todas as atividades realizadas na sua Conta e concorda em manter sempre a segurança e confidencialidade do nome de usuário e senha da sua Conta. A menos que diversamente permitido pela Easytools por escrito, você poderá manter apenas uma Conta.
                <br/><br/>
                
                <b><i>Uso da plataforma</i></b> 
                <br/><br/>
                A plataforma é uma ambiente para anúncio e aluguel de equipamentos de ferramentas online. O intuito é facilitar e desburocratizar o setor de locação de equipamentos e ferramentas. Você como cliente poderá ser locatário(Parte que aluga o equipamento de outro), ou locador (Parte que disponibilizar seus equipamentos para outros). O aluguel de equipamentos é feito de forma online, e nós fazemos o delivery deste equipamento no local desejado por você, para que a entrega seja realizada, nós cobramos uma taxa de entrega com base na localidade e no km. Não temos lojas físicas por isso fica inviável ir buscar os equipamentos.
                Você pode locar quanto equipamentos e desejar, não temos limite. Após escolher e seguir os procedimentos de locação, você receberá a opção de pagamento para que possamos finalizar o processo de locação e entregar o equipamento escolhido no endereço desejado.
                <br/><br/>
                Pagamento feito, nós entregamos o equipamento e só buscaremos na data de devolução.
                <br/><br/>
                
                <b><i>Equipamentos e ferramentas</i></b>
                <br/><br/>
                Os equipamentos dos anúncios podem ser ou não de pfropriedade da Easytools. Alguns equipamentos são de empresas, e pessoas parceiras que queiram disponibilizar seus equipamentos e ferramentas. Consequentemente a entrega também fica a cargo do proprietário do equipamento, todos os parceiros são devidamente orientados e ensinados a realizar a entrega e a devolução da melhor maneira possível, tendo como foco a sua satisfação em nossos serviços.
                Os equipamentos e ferramentas são vistoriados, limpados e todos eles passam por manutenções preventivas para garantir que você possa usar o equipamento tranquilamente.
                <br/>
                O equipamento não pode ser modificado, alterado ou estragado por você. Qualquer coisa que possa acontecer com o equipamento no período do aluguel, será de responsabilidade sua.
                <br/><br/>
                <b><i>Entrega</i></b>
                <br/><br/>
                Após todo o processo de aluguel, nós nos comprometemos a entregar o equipamento alugado, em no máximo 2 horas, salvo em casos de problemas regionais e de trânsito e ou qualquer outra anormalidade no fluxo de entregas;
                Quando o equipamento for entre a você, teste o equipamento na frente do entregador. 
                Será feito também pela Easytools, um checkin do equipamento, garantindo que o equipamento foi entregue com a melhor qualidade possível e em pleno funcionamento.
                <br/><br/>
                <b><i>Devolução</i></b>
                <br/><br/>
                Você deve se programar para entregar o equipamento na data previamente acertada na locação do equipamento. A Easytools notificará a você por e-mail, telefone e notificações em nossa plataforma, 3 dias antes do dia da devolução. Cabe a você limpar e organizar o equipamento para ser devolvido. 
                No dia previamente acertado para devolução, A Easytools passará no endereço de entrega para buscar o equipamento.
                A Easytools fará um checkout do equipamento na sua frente para garantir que nada foi avariado. Em caso de avaria, você será notificado e o produto passará por uma análise profissional, em caso de diagnóstico positivo para mal uso, você deverá arcar com o conserto do equipamento ou em casos de perda total, você deverá arcar com o valor total do equipamento.
                <br/><br/>
                <b><i>Pagamento</i></b> 
                <br/><br/>
                Você entende que os serviços ou bens que você receber de um Parceiro Independente ou da Easytools, contratados por meio dos Serviços, poderão ser cobrados (“Preço”). Após você ter recebido serviços ou bens obtidos por meio do uso do Serviço, a Easytools facilitará o seu pagamento do respectivo Preço ao Parceiro Independente ou a Easytools, agindo na qualidade de agente limitado de cobrança do Parceiro Independente ou da Easytools. O pagamento do Preço feito dessa maneira será considerado pagamento feito diretamente por você ao Parceiro Independente ou para Easytools. O preço incluirá todos os tributos exigidos por lei. 
                O preço pago por você é final e não reembolsável, a menos que diversamente determinado pela Easytools. 
                O preço total é devido e deve ser pago imediatamente após a prestação do serviço ou entrega do bem pelo Parceiro Independente ou pela Easytools e o pagamento será facilitado pela Easytools mediante o método de pagamento indicado na sua Conta, após o que a Easytools enviará um recibo por e-mail. Se for verificado que o método de pagamento indicado na Conta expirou, é inválido ou não pode ser cobrado, você concorda que a Easytools poderá, na qualidade de agente limitado de cobrança do Parceiro Independente ou da Easytools, usar um método secundário de cobrança na Conta, se houver.
                <br/><br/>
                <b><i>Acesso à Rede e Equipamentos</i></b>
                <br/><br/>
                Você é responsável por obter o acesso a rede de dados necessário para usar os Serviços. As taxas e encargos de sua rede de dados e mensagens poderão se aplicar se você acessar ou usar os Serviços de um dispositivo sem fio e você será responsável por essas taxas e encargos. Você é responsável por adquirir e atualizar os equipamentos e dispositivos necessários para acessar e usar os Serviços e Aplicativos e quaisquer de suas atualizações. A Easytools NÃO GARANTE QUE OS SERVIÇOS, OU QUALQUER PARTE DELES, FUNCIONARÃO EM QUALQUER EQUIPAMENTO OU DISPOSITIVO EM PARTICULAR. Além disso, os Serviços poderão estar sujeitos a mau funcionamento e atrasos inerentes ao uso da Internet e de comunicações eletrônicas.
                <br/>
                Taxa de Reparos, avarias e perdas do equipamento.
                Você será responsável pelos custos de reparos a danos ou perdas de equipamentos de Parceiros Independentes e da Easytools resultantes do uso dos Serviços por meio da sua Conta que excedam os danos naturais decorrentes do uso (“Reparos ou perdas”). Caso um Parceiro Independente ou a Easytools relate a necessidade de Reparos ou recuperação do equipamento e essa solicitação seja confirmada pela Easytools, a critério razoável da Easytools, a Easytools reserva-se o direito de facilitar o pagamento desses Reparos ou perdas em nome do Parceiro Independente ou da Easytools usando o método de pagamento indicado em sua Conta. Será enviado a você um link para pagamento da reparos, avarias e perdas.
                <br/><br/>
                <p className="topics-terms">Recusa de Garantia</p>
                <br/><br/>
                OS SERVIÇOS SÃO PRESTADOS “NO ESTADO” E “COMO DISPONÍVEIS”. A EASYTOOLS  RECUSA TODAS AS DECLARAÇÕES E GARANTIAS, EXPRESSAS, IMPLÍCITAS OU LEGAIS, NÃO EXPRESSAMENTE CONTIDAS NESTES TERMOS, INCLUSIVE AS GARANTIAS IMPLÍCITAS DE COMERCIALIZAÇÃO, ADEQUAÇÃO A UMA FINALIDADE ESPECÍFICA E NÃO INFRINGÊNCIA. ADEMAIS, A EASYTOOLS NÃO FAZ NENHUMA DECLARAÇÃO NEM DÁ GARANTIA SOBRE A CONFIABILIDADE, PONTUALIDADE, QUALIDADE, ADEQUAÇÃO OU DISPONIBILIDADE DOS SERVIÇOS OU DE QUAISQUER SERVIÇOS OU BENS SOLICITADOS POR MEIO DO USO DOS SERVIÇOS, NEM QUE OS SERVIÇOS SERÃO ININTERRUPTOS OU LIVRES DE ERROS. A EASYTOOLS NÃO GARANTE A QUALIDADE, ADEQUAÇÃO, SEGURANÇA OU HABILIDADE DE PARCEIROS INDEPENDENTES. VOCÊ CONCORDA QUE TODO O RISCO DECORRENTE DO USO DOS SERVIÇOS E DE QUALQUER SERVIÇO OU BEM SOLICITADO POR MEIO DA TECNOLOGIA SERÁ SEMPRE SEU NA MÁXIMA MEDIDA PERMITIDA PELA LEI APLICÁVEL.
                <br/><br/>
                <p className="topics-terms">Limitação de Responsabilidade</p>
                A EASYTOOLS GARANTE A QUALIDADE DE , ATENDIMENTO, ENTREGA E DEVOLUÇÃO DOS EQUIPAMENTOS PERTINENTES A EASYTOOLS. NÃO GARANTIMOS A QUALIDADE DO EQUIPAMENTO DE PARCEIROS INDEPENDENTES QUE TENHAM SEUS EQUIPAMENTOS ANUNCIADOS NA EASYTOOLS. OS SERVIÇOS DA EASYTOOLS PODERÁ SER USADO POR VOCÊ PARA FACILITAR E PROGRAMAR SERVIÇOS DE LOCAÇÃO DE BENS MÓVEIS ATRAVÉS DA ECONOMIA COLABORATIVA COM ATIVOS DE EQUIPAMENTOS E FERRAMENTAS. VOCÊ CONCORDA QUE NÃO EASYTOOLS NÃO TEM RESPONSABILIDADE A VOCÊ EM RELAÇÃO A EQUIPAMENTOS E FERRAMENTAS DE PARCEIROS INDEPENDENTES, E QUE SÓ PODEMOS GARANTIR ESSA RESPONSABILIDADE COM EQUIPAMENTOS QUE SÃO PRÓPRIOS DA EASYTOOLS. TODOS OS PARCEIROS INDEPENDENTES SÃO ENSINADOS E INSTRUIDOS A ATENDER, CONVERSAR E A SERVIR OS CLIENTES DA MELHOR MANEIRA POSSÍVEL.
                <br/><br/>
                <p className="topics-terms">Avisos.</p>
              
                A Easytools poderá enviar avisos por meio de notificações gerais nos Serviços, correio eletrônico para seu endereço de e-mail em sua Conta, ou por comunicação escrita enviada ao endereço indicado em sua Conta. 
                <br/><br/>
                <p className="topics-terms">Disposições Gerais</p>
                Você não poderá ceder, nem tampouco transferir estes Termos, total ou parcialmente, sem prévia aprovação por escrito da Easytools. Você concorda que a Easytools ceda e transfira estes Termos, total ou parcialmente, inclusive: (i) para uma subsidiária ou afiliada; (ii) um adquirente das participações acionárias, negócios ou bens da Easytools; ou (iii) para um sucessor em razão de qualquer operação societária. Não existe joint-venture, sociedade, emprego ou relação de representação entre você, a Easytools ou quaisquer Parceiros Independentes como resultado do contrato entre você e a Easytools ou pelo uso dos Serviços.
                Caso qualquer disposição destes Termos seja tida como ilegal, inválida ou inexequível total ou parcialmente, por qualquer legislação, essa disposição ou parte dela será, naquela medida, considerada como não existente para os efeitos destes Termos, mas a legalidade, validade e exequibilidade das demais disposições contidas nestes Termos não serão afetadas. Nesse caso, as partes substituirão a disposição ilegal, inválida ou inexequível, ou parte dela, por outra que seja legal, válida e exequível e que, na máxima medida possível, tenha efeito similar à disposição tida como ilegal, inválida ou inexequível para fins de conteúdo e finalidade dos presentes Termos. Estes Termos constituem a totalidade do acordo e entendimento das partes sobre este assunto e substituem e prevalecem sobre todos os entendimentos e compromissos anteriores sobre este assunto. Nestes Termos, as palavras “inclusive” e “inclui” significam “incluindo, sem limitação”.
              </div>
              </div>
              <br/>
              <div className="has-text-centered">
                <Button
                  type={'input'}
                  className={'button is-success accepted-bt'} 
                  text={'Aceitar'}
                  onClick={AcceptedTerms}
                />
                <Button
                  type={'input'}
                  className={'button is-default'} 
                  text={'Não aceitar'}
                  onClick={NoAcceptedTerms}
                />
              </div>
            </Modal>
            <Modal 
              show={modal} 
              onCloseModal={hideModal} 
              closeOnEsc={true} 
              closeOnOverlayClick={true}
            >
              { 
              modify === 'morethan18' ? (
                <>
                  <h2 className="title has-text-centered title-modal">Ops! Lamentamos muito.</h2>
                  <br/>
                  <div className="has-text-centered">
                    <img src={baby} alt="Baby Logo" className="baby-cry"/>
                  </div>
                  <br/><br/>
                  <p className="has-text-centered text-modal">Para se cadastrar você precisa ter 18 anos ou mais.</p>
                </>                  

              ) : (
              ''
              )
            }

            {
              modify === 'noaccepted' ? (
                <>
                  <h2 className="title has-text-centered title-modal">Ops! Desculpa.</h2>
                  <br/>
                  <div className="has-text-centered">
                    <img src={man} alt="Man Logo" className="baby-cry"/>
                  </div>
                  <br/><br/>
                  <p className="has-text-centered text-modal">Para se cadastrar, você precisa aceitar os termos.</p>
                </>                  

              ) : (
              ''
              )              
            }
            </Modal>
          </div>
        </div>
      </div>
    </>
  )
}

export default Singup;
