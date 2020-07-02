import React from 'react';
import ModalApp from 'react-responsive-modal';

const Modal = ({ onCloseModal, show, closeEscAllowed, closeOnAllowed, children, showCloseIcon }) => {
  return (
    <>
      <ModalApp 
        open={show} 
        onClose={onCloseModal} 
        closeOnEsc={closeEscAllowed} 
        showCloseIcon={showCloseIcon}
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