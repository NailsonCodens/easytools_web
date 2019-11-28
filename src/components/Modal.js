import React from 'react';
import ModalApp from 'react-responsive-modal';

export default class Modal extends React.Component {
  state = {
    open: false,
  };
 
  onOpenModal = () => {
    this.setState({ open: true });
  };
 
  onCloseModal = () => {
    this.setState({ open: false });
  };

  render () {
    const { open } = this.state;

    return (
      <>
        <span onClick={this.onOpenModal}>{ this.props.name }</span>
        <ModalApp open={open} onClose={this.onCloseModal} center className="modal">
          { this.props.children }
        </ModalApp>
      </>
    )  
  }
}
