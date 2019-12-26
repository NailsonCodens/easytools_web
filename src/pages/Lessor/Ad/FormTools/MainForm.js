import React, { useState } from 'react';
import Basic from '../FormTools/Steps/Basic';
import Brand from '../FormTools/Steps/Brand';
import Address from '../FormTools/Steps/Address';
import Additionals from '../FormTools/Steps/Additionals';

import { useFormik } from 'formik';

import './Steps/style.css';

const Main = ({history}) => {
  const [step, setStep] = useState(3);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [brand, setBrand] = useState('');
  const [type_spec, setTypespec] = useState('');
  const [category, setCategory] = useState('');
  const [feed, setFeed] = useState('');
  const [tension, setTension] = useState('');
  const [power, setPower] = useState('');
  const [use_indication, setUseindication] = useState('');
  const [prices, setPrices] = useState('');
  const [insurance, setInsurance] = useState('');
  const [delivery, setDelivery] = useState('');
  const [contract, setContract] = useState('');
  const [devolution, setDevolution] = useState('');
  const [price1, setPrice1] = useState('');
  const [price2, setPrice2] = useState('');
  const [price3, setPrice3] = useState('');

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
      tension: "",
      prices: "",
      price1: "",
      price2: "",
      price3: "",
      insurance: "Y",
      delivery: "Y",
      contract: "Y",
      devolution: "Y",
      location: "",
      lat: "",
      lng: "",
    },
    onSubmit: value => {
      console.log(value)
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
  }

    //formik.values.title = event.target.value
  }

  const handleSubmit = (teste) => {
    console.log(teste)
  }

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