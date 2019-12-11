import React from 'react';
import ModalApp from 'react-responsive-modal';

const Modal = ({ onCloseModal, show, closeEscAllowed, closeOnAllowed, children }) => {
  return (
    <>
      <ModalApp 
        open={show} 
        onClose={onCloseModal} 
        closeOnEsc={closeEscAllowed} 
        closeOnOverlayClick={closeOnAllowed} 
        center 
        className="modal-app"
      >
        { children }
      </ModalApp>
    </>
  )
}

export default Modal;