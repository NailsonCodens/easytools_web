import React, { useState } from 'react';
import { Form, Input } from '@rocketseat/unform';

import './style.css';

const MessageBox = ({ onSendMessage: pushSendMessage }) => {

  const [message, setMessage] = useState([]);

  return (
    <>
      <Form>
        <div className="columns">
          <div className="column is-10">
            <Input multiline
              name="description"
              type="text"
              className='input-chat input '
              placeholder=""
              onChange={event => setMessage(event.target.value)}
              onKeyDown={event => {
                if (event.key === 'Enter') {
                  event.preventDefault();
                  pushSendMessage(message);
                  setMessage("");
                }
              }}
              value={message}
            />
          </div>
          <div className="column">
            <div className="control">
              <span className="button is-info">
                Send
              </span>
            </div>
          </div>
        </div>
      </Form>
    </>
  )
};

export default MessageBox;