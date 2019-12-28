import React, { useState } from 'react';
import Basic from '../FormTools/Steps/Basic';
import Brand from '../FormTools/Steps/Brand';
import Address from '../FormTools/Steps/Address';
import Additionals from '../FormTools/Steps/Additionals';
import Finish from '../FormTools/Steps/Finish';

import { useFormik } from 'formik';

import './Steps/style.css';

const Main = ({history}) => {
  // eslint-disable-next-line
  const [step, setStep] = useState(4);
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

  const formik = useFormik({
    initialValues: {
      title: "sadasdsad",
      description: "wewqewqe",
      category: "weqe",
      type_spec: "wqewqe",
      feed: "wqewqe",
      accessory: "wqewqe",
      brand: "wqewqe",
      follow: "qwewqe",
      use_indication: "qweqwe",
      power: "qwewqe",
      tension: "23",
      prices: "",
      price1: "34",
      price2: "34",
      price3: "45",
      insurance: "Y",
      delivery: "Y",
      contract: "Y",
      devolution: "Y",
      location: "81.250-300",
      neighboor: "asdas",
      address: "asdasdsadsadasdasd asdas",
      number: "233",
      complement: "dasdasdas",
      uf: "Paraná",
      city: "Curitiba ",
      lat: "",
      lng: "",
    },
    onSubmit: value => {
    }
  })

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
    formik.values.category = category
  }

  const handleFeedChange = (feed) => {
    console.log(feed)
    setFeed(feed)
    formik.values.feed = feed
  }

  const handlePowerChange = (power) => {
    setPower(power)
    formik.values.power = power
  }

  const handleTensionChange = (tension) => {
    setTension(tension)
    formik.values.tension = tension
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
      case 'tension':
        handleTensionChange(event)
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

  console.log(formik.values)

  const renderSteps = () => { 
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
            </p>
          </>
        )
        case 3: 
          return (
            <>
              <h3 className="title-tips">Adicione mais informações para facilitar a vida dos seus clientes!</h3>
              <p className="text-tips">

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