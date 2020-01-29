import React, { useEffect, useState } from 'react';
import Basic from '../FormTools/Steps/Basic';
import Brand from '../FormTools/Steps/Brand';
import Address from '../FormTools/Steps/Address';
import Additionals from '../FormTools/Steps/Additionals';
import Finish from '../FormTools/Steps/Finish';
import { useParams } from "react-router-dom";
import api from '../../../../services/api';
import { useFormik } from 'formik';

import './Steps/style.css';

const Main = ({history, tool}) => {
  let { id } = useParams();
  // eslint-disable-next-line
  const [step, setStep] = useState(1);
  // eslint-disable-next-line
  const [title, setTitle] = useState('');
  // eslint-disable-next-line
  const [description, setDescription] = useState('');
  // eslint-disable-next-line
  const [brand, setBrand] = useState('');
  // eslint-disable-next-line
  const [type_spec, setTypespec] = useState('');
  // eslint-disable-next-line
  const [category, setCategory] = useState('');
  // eslint-disable-next-line
  const [feed, setFeed] = useState('');
  // eslint-disable-next-line
  const [tension, setTension] = useState('');
  // eslint-disable-next-line
  const [tension2, setTension2] = useState('');
  // eslint-disable-next-line
  const [tension3, setTension3] = useState('');
  // eslint-disable-next-line
  const [power, setPower] = useState('');
  // eslint-disable-next-line
  const [use_indication, setUseindication] = useState('');
  // eslint-disable-next-line
  const [prices, setPrices] = useState('');
  // eslint-disable-next-line
  const [insurance, setInsurance] = useState('');
  // eslint-disable-next-line
  const [delivery, setDelivery] = useState('');
  // eslint-disable-next-line
  const [contract, setContract] = useState('');
  // eslint-disable-next-line
  const [devolution, setDevolution] = useState('');
  // eslint-disable-next-line
  const [price1, setPrice1] = useState('');
  // eslint-disable-next-line
  const [price2, setPrice2] = useState('');
  // eslint-disable-next-line
  const [price3, setPrice3] = useState('');
  // eslint-disable-next-line
  const [price4, setPrice4] = useState('');
  // eslint-disable-next-line
  const [location, setLocation] = useState('');
  // eslint-disable-next-line
  const [neighboor, setNeighboor] = useState('');
  // eslint-disable-next-line
  const [address, setAddress] = useState('');
  // eslint-disable-next-line
  const [number, setNumber] = useState('');
  // eslint-disable-next-line
  const [complement, setComplement] = useState('');
  // eslint-disable-next-line
  const [uf, setUf] = useState('');
  // eslint-disable-next-line
  const [city, setCity] = useState('');
  // eslint-disable-next-line
  const [follow, setFollow] = useState('');
  // eslint-disable-next-line
  const [accessory, setAccessory] = useState('');
  // eslint-disable-next-line
  const [edit, setEdit] = useState(false);

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      category: "",
      type_spec: "",
      feed: "",
      accessory: "",
      brand: "",
      follow: "",
      use_indication: "",
      power: "",
      tension1: "",
      tension2: "",
      tension3: "",
      prices: "",
      price1: "0",
      price2: "0",
      price3: "0",
      price4: "0",
      insurance: "Y",
      delivery: "Y",
      contract: "Y",
      devolution: "Y",
      location: "",
      neighboor: "",
      address: "",
      number: "",
      complement: "",
      uf: "",
      city: "",
      lat: 0,
      lng: 0,
    },
    onSubmit: value => {
    }
  })

  useEffect(() => {
    if (id !== undefined) {
      async function loadTool() { 
        const response = await api.get(`/tools/tool/${id}`, {
        });
        response.data.tool.map(function (tool) {
          formik.values.title = tool.title
          formik.values.description = tool.description
          formik.values.brand = tool.brand
          formik.values.type_spec = tool.type_spec
          formik.values.category = { value: tool.category, label: tool.category }
          formik.values.feed = { value: tool.feed, label: tool.feed }
          formik.values.power = tool.power
          tool.tension.split('/').map((tension, index) => {
            if (index === 0 ) {
                formik.values.tension1 = tension
            }
            if (index === 1 ) {
              if (tension === 'Tri') {
                formik.values.tension3 = tension
              } else {
                formik.values.tension2 = tension
              }
            }
            return ''
          })
          formik.values.accessory = tool.accessory
          formik.values.follow = tool.follow
          formik.values.use_indication = tool.use_indication
          tool.prices.split(';').map((price, index) => {
            if (index === 0) {
              formik.values.price1 = price
            }
            if (index === 1) {
              formik.values.price2 = price
            }
            if (index === 2) {
              formik.values.price3 = price
            }
            if (index === 3) {
              formik.values.price4 = price
            }
            return ''
          })
          formik.values.contract = tool.contract
          formik.values.insurance = tool.insurance
          formik.values.delivery = tool.delivery
          formik.values.devolution = tool.devolution
          formik.values.location = tool.location
          formik.values.address = tool.address
          formik.values.number = tool.number
          formik.values.complement = tool.complement
          formik.values.uf = tool.uf
          formik.values.city = tool.city
          formik.values.neighboor = tool.neighboor
          formik.values.lat = tool.lat
          formik.values.lng = tool.lng
          setEdit(true)
          return ''
        })
      }
      loadTool();
    }
  }, [formik.values, id]);

  const nextStep = () => {
    const stepnew  = step
    setStep(stepnew + 1)
  }

  const prevStep = () => {
    const stepnew  = step
    setStep(stepnew - 1)
  }

  const handleTitleChange = (title) => {
    setTitle(title)
    formik.values.title = title
  }

  const handleDescriptionChange = (description) => {
    setDescription(description)
    formik.values.description = description
  }

  const handleBrandChange = (brand) => {
    setBrand(brand)
    formik.values.brand = brand
  }

  const handleTypespecChange = (type_spec) => {
    setTypespec(type_spec)
    formik.values.type_spec = type_spec
  }

  const handleCategoryChange = (category) => {
    setCategory(category)
    formik.values.category = { value: category, label: category }
  }

  const handleFeedChange = (feed) => {
    setFeed(feed)
    formik.values.feed = { value: feed, label: feed }
  }

  const handlePowerChange = (power) => {
    setPower(power)
    formik.values.power = power
  }

  const handleTensionChange = (tension) => {
    setTension(tension)
    formik.values.tension1 = tension
  }

  const handleTensionChange2 = (tension) => {
    setTension2(tension)
    formik.values.tension2 = tension
  }

  const handleTensionChange3 = (tension) => {
    setTension3(tension)
    formik.values.tension3 = tension
  }

  const handleUseindicationChange = (use_indication) => {
    setUseindication(use_indication)
    formik.values.use_indication = use_indication
  }

  const handlePrice1Change = (price1) => {
    setPrice1(price1)
    formik.values.price1 = price1
  }

  const handlePrice2Change = (price2) => {
    setPrice1(price2)
    formik.values.price2 = price2
  }

  const handlePrice3Change = (price3) => {
    setPrice1(price3)
    formik.values.price3 = price3
  }

  const handlePrice4Change = (price4) => {
    setPrice4(price4)
    formik.values.price4 = price4
  }

  const handleContractChange = (contract) => {
    const target = contract;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const cnew = value ? 'Y' : 'N'
    setContract(cnew)
    formik.values.contract = cnew
  }

  const handleInsuranceChange = (insurance) => {
    const target = insurance;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const inew = value ? 'Y' : 'N'
    setInsurance(inew)
    formik.values.insurance = inew
  }

  const handleDeliveryChange = (delivery) => {
    const target = delivery;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const dnew = value ? 'Y' : 'N'
    setDelivery(dnew)
    formik.values.delivery = dnew
  }

  const handleDevolutionChange = (devolution) => {
    const target = devolution;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const dvnew = value ? 'Y' : 'N'
    setDelivery(dvnew)
    formik.values.devolution = dvnew
  }

  const handleLocationChange = (location) => {
    setLocation(location)
    formik.values.location = location
  }

  const handleNeighboorChange = (neighboor) => {
    setNeighboor(neighboor)
    formik.values.neighboor = neighboor
  }

  const handleAddressChange = (address) => {
    setAddress(address)
    formik.values.address = address
  }

  const handleNumberChange = (number) => {
    setNumber(number)
    formik.values.number = number
  }

  const handleComplementChange = (complement) => {
    setComplement(complement)
    formik.values.complement = complement
  }

  const handleCityChange = (city) => {
    setCity(city)
    formik.values.city = city
  }

  const handleUfChange = (uf) => {
    setUf(uf)
    formik.values.uf = uf
  }

  const handleFollowChange = (follow) => {
    setFollow(follow)
    formik.values.follow = follow
  }

  const handleAccessoryChange = (accessory) => {
    setAccessory(accessory)
    formik.values.accessory = accessory
  }

  const handleChange = (input, event) => {
    switch(input){
      case 'title': 
        handleTitleChange(event)
        break;
      case 'description':
        handleDescriptionChange(event)
        break;
      case 'brand':
        handleBrandChange(event)
        break;
      case 'type_spec':
        handleTypespecChange(event)
        break;
      case 'category':
        handleCategoryChange(event)
        break;
      case 'feed':
        handleFeedChange(event)
        break;
      case 'power':
        handlePowerChange(event)
        break;
      case 'tension1':
        handleTensionChange(event)
        handleTensionChange3('')
        break;
      case 'tension2':
        handleTensionChange2(event)
        handleTensionChange3('')
        break;
      case 'tension3':
        handleTensionChange3(event)
        handleTensionChange2('')
        handleTensionChange('')
        break;
      case 'use_indication':
        handleUseindicationChange(event)
        break;
      case 'price1':
        handlePrice1Change(event)
        break;
      case 'price2':
        handlePrice2Change(event)
        break;
      case 'price3':
        handlePrice3Change(event)
        break;
      case 'price4':
        handlePrice4Change(event)
        break;
      case 'contract':
        handleContractChange(event)
        break;
      case 'insurance':
        handleInsuranceChange(event)
        break;
      case 'delivery':
        handleDeliveryChange(event)
        break;
      case 'devolution':
        handleDevolutionChange(event)
        break;
      case 'location':
        handleLocationChange(event)
        break;
      case 'neighboor':
        handleNeighboorChange(event)
        break;
      case 'address':
        handleAddressChange(event)
        break;
      case 'number':
        handleNumberChange(event)
        break;
      case 'complement':
        handleComplementChange(event)
        break;
      case 'city':
          handleCityChange(event)
          break;
      case 'uf':
          handleUfChange(event)
          break;
      case 'follow':
          handleFollowChange(event)
          break;
      case 'accessory':
          handleAccessoryChange(event)
          break;
      default: 
        return ''
    }
  }

  const renderSteps = () => { 
    if (edit === true) {
      switch(step) {
        //update
        case 1:
          return <Basic nextStep={nextStep} handleChange={handleChange} values={formik.values}/> 
        case 2: 
          return <Brand nextStep={nextStep} handleChange={handleChange} prevStep={prevStep} values={formik.values}/>
        case 3: 
          return <Additionals nextStep={nextStep} handleChange={handleChange} prevStep={prevStep} values={formik.values}/>
        case 4: 
          return <Address nextStep={nextStep} handleChange={handleChange} prevStep={prevStep} values={formik.values}/>
        case 5: 
          return <Finish handleChange={handleChange} prevStep={prevStep} values={formik.values}/>
        default: 
          return <Basic nextStep={nextStep} values={formik.values}/>
      }
    } else {
      //create
      switch(step) {
        case 1:
          return <Basic nextStep={nextStep} handleChange={handleChange} values={formik.values}/> 
        case 2: 
          return <Brand nextStep={nextStep} handleChange={handleChange} prevStep={prevStep} values={formik.values}/>
        case 3: 
          return <Additionals nextStep={nextStep} handleChange={handleChange} prevStep={prevStep} values={formik.values}/>
        case 4: 
          return <Address nextStep={nextStep} handleChange={handleChange} prevStep={prevStep} values={formik.values}/>
        case 5: 
          return <Finish handleChange={handleChange} prevStep={prevStep} values={formik.values}/>
        default: 
          return <Basic nextStep={nextStep} values={formik.values}/>
      }
    }
  }

  const renderTips = () => {
    switch(step) {
      case 1:
        return (
          <>
            <h3 className="title-tips">Dicas para chamar atenção!</h3>
            <p className="text-tips">
              Insira no título o nome da ferramenta e a marca dela.
              Assim o cliente sabe exatamtente o que é o seu produto.
            </p>
          </>
        )
      case 2: 
        return (
          <>
            <h3 className="title-tips">Inseira a marca, a categoria e para que serve.</h3>
            <p className="text-tips">
              Exemplo: 
              <br/>
              <b>Marca:</b>
              Makita, 
              <br/>
              <b>Tipo:</b> 
              Corte,
              <br/>
              <b>Categoria:</b> 
              Cortante, 
              <br/>
              <b>Potência:</b> 150W
              <br/>
              <b>Tensão:</b> 110V
              <br/>
              <b>Acompanha:</b> Carregador
              <br/>
              <b>Vai junto(Brindes):</b> Serras
            </p>
          </>
        )
        case 3: 
          return (
            <>
              <h3 className="title-tips">Adicione mais informações para facilitar a vida dos seus clientes!</h3>
              <p className="text-tips">
                <b>Indicação de uso:</b> Madeiras e chapas de ferro finas.
                <br/><br/>
                <b>Preços - </b> Adicione os preços que você utiliza para este equipamento
                <br/><br/>
                E por fim, informe se sua ferramenta tem contrato, seguro, entrega e devolução. 
                Estas informações são importantes para proteger seus equipamentos. 
                <br/>
                <br/>
                <b>Contrato:</b> Seu equipamento só pode ser alugado mediante contrato no ato da entrega;
                <br/>
                <b>Seguro:</b> Seu equipamento tem seguro contra avarias e roubos;
                <br/>
                <b>Entrega:</b> Você faz a entrega do equipamento para o locatário;
                <br/>
                <b>Devolução:</b> Você busca o equipamento com o locatários ao fim do aluguel;
              </p>
            </>
          )
        case 4: 
          return (
            <>
              <h3 className="title-tips">Adicione o endereço de onde sua ferramenta está. Isso vai ajudar na pesquisa dos locatários. </h3>
              <p className="text-tips">
                Você pode usar seu endereço padrão para tudo que você deseja alugar. 
                Caso não queira usar outro, não tem problema. Destive o botão de endereço padrão e use o endereço que desejar.
              </p>
            </>
          )
        case 5: 
          return (
            <>
              <h3 className="title-tips">Pronto, basta confirmar as informações. </h3>
              <p className="text-tips">
                Confirme as informações do seu anúncio, se quiser corrigir algo, basta voltar na seção desejada.
              </p>
            </>
          )
        default: 
      return (
        <>
          <h3 className="title-tips">Dicas para chamar atenção!</h3>
          <p className="text-tips">
            Insira no título o nome da ferramenta e a marca dela.
            Assim o cliente sabe exatamtente o que é o seu produto.
          </p>
        </>
      )
    }
  }

  return (
    <>
      <div className="columns is-desktop ">
        <div className="column is-three-fifths box-inter">
          <div className="container">
            {
              renderSteps()
            }            
          </div>
        </div>
        <div className="column box-inter">
          {
            renderTips()
          }
        </div>
      </div>
    </>
  )
}

export default Main;