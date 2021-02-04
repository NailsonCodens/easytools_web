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
        classNames={{
          overlay: '',
          modal: className !== 'superior' ? "modal-app-large" : "modal-app superior",
        }}
      >
        { children }
      </ModalApp>
    </>
  )
}

export default Modal;