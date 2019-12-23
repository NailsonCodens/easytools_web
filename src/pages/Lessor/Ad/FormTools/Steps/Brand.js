import React from 'react';
import { Button } from '../../../../../components/Form/Button';

const Branc = ({nextStep, prevStep}) => {
  const saveAndContinue = (e) => {
    e.preventDefault()
    nextStep()
  }

  const back = (e) => {
    e.preventDefault();
    prevStep();
  }

  return (
    <>
      <p>Brand</p>
      <Button
        type={'submit'}
        className={'button color-logo-lessor'}
        text={'Salvar Alterações da marca'}
        onClick={saveAndContinue}
      />
      <Button
        type={'submit'}
        className={'button color-logo-lessor'}
        text={'voltar'}
        onClick={back}
      />
    </>
  )
}

export default Branc;