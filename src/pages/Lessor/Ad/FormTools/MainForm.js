import React, { useState } from 'react';
import Basic from '../FormTools/Steps/Basic';
import Brand from '../FormTools/Steps/Brand';
import { useFormik } from 'formik';

const Main = ({history}) => {
  const [step, setStep] = useState(1);
  const [state, setState] = useState({
    title: "sadsad",
    description: "",
    category: "",
    type_spec: "",
    accessory: "",
    brand: "",
    follow: "",
    use_indication: "",
    power: "",
    tension: "",
    prices: "",
    insurance: "Y",
    delivery: "Y",
    contract: "y",
    location: "",
    lat: "",
    lng: "",
  });

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      category: "",
      type_spec: "",
      accessory: "",
      brand: "",
      follow: "",
      use_indication: "",
      power: "",
      tension: "",
      prices: "",
      insurance: "Y",
      delivery: "Y",
      contract: "y",
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

  const handleChange = (input, event) => {
    setState({[input]: event.target.value})
    formik.values.title = event.target.value
  }

  const renderSteps = () => { 
    switch(step) {
      case 1:
        return <Basic nextStep={nextStep} handleChange={handleChange} values={state}/> 
      case 2: 
        return <Brand nextStep={nextStep} handleChange={handleChange} prevStep={prevStep} values={formik.values}/>
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
          'tips2' 
        )
      default: 
        return ('')
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