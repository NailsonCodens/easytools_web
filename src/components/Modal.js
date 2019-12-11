import React from 'react';
import ModalApp from 'react-responsive-modal';

const Modal = ({ onCloseModal, show, children }) => {
  return (
    <>
      <ModalApp open={show} onClose={onCloseModal} center className="modal">
        { children }
      </ModalApp>
    </>
  )
}

export default Modal;