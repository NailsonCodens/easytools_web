import React from 'react';

import { Input } from '../../../components/Form/Inputs';
import Modal from '../../../components/Modal';

export default class Login extends React.Component {
  render () {
    return (
      <>
        <Modal name={this.props.name}>
          Login
          <Input type="text"></Input>
          <Input type="email"></Input>
          <br></br>
          <Input type="number"></Input>          
        </Modal>
      </>
    )  
  }
}
