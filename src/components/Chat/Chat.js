import React from 'react';
import MessageBox from './MessageBox';
import Messages from './Messages';

const Chat = () => {
  return (
    <div>
      <div className="container-fluid">
        <div className="columns">
          <div className="column is-3">
            <div className="card">
              <div className="card-content">
                <div className="media">
                  <div className="media-left">
                    <img src="https://bulma.io/images/placeholders/48x48.png" alt="asdsad g"/>
                  </div>
                  <div className="media-content">
                    <p className="is-4">
                      Maria José
                    </p>
                    <p className="subtitle is-6">
                      última menssagem...
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="column">
            <Messages messages={[
              "Hello this is mesage1",
              "Hello this is mesage2",
              "Hello this is mesage3",
              "Hello this is mesage4",
              "Hello this is mesage5",
            ]}/>
            <MessageBox 
              onSendMessage={message => {
                alert('message sent:' + message)
              }}
            />
          </div>
        </div>
      </div>
    </div>
  ) 
};

export default Chat;