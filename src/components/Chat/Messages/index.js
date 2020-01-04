import React from 'react';

const Messages = ({ messages }) => {
  return (
    <>
      {
        messages.flatMap((message, index) => [(
          <div className="card" key={index}>
            <div className="card-content">
              <div className="media">
                <div className="media-left">
                  <img src="https://bulma.io/images/placeholders/64x64.png" alt="asdsad g"/>
                </div>
                <div className="content">
                  <p className="is-4">
                    {message}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )])
      }
    </>
  )
};

export default Messages;
