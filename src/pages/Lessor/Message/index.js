import React from 'react';
import Chat from '../../../components/Chat/Chat';
import Title from '../../../utils/title';

const Message = () => {
  document.title = Title('Mensagens');

  return (
    <>
      <Chat/>
    </>
  )
};

export default Message;
