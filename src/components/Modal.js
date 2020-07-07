import React from 'react';
import ModalApp from 'react-responsive-modal';

const Modal = ({ onCloseModal, show, className, closeEscAllowed, closeOnAllowed, children, showCloseIcon }) => {
  return (
    <>
      <ModalApp 
        open={show} 
        onClose={onCloseModal} 
        closeOnEsc={closeEscAllowed} 
        showCloseIcon={showCloseIcon}
        closeOnOverlayClick={closeOnAllowed} 
        center 
        className={ className !== 'superior' ? "modal-app" : "modal-app superior"}
      >
        { children }
      </ModalApp>
    </>
  )
}

export default Modal;