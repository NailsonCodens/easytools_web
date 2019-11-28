import React from 'react';

import { Input } from '../../../components/Form/Inputs';
import Modal from '../../../components/Modal';

export default class Register extends React.Component {
  render () {
    return (
      <>
        <Modal name={this.props.name}>
          Register
          <Input type="text"></Input>
        </Modal>
      </>
    )  
  }
}
