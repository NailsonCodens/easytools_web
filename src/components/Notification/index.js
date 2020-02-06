import React, { useState, useEffect } from 'react';

const Notification = () => {
  const [notification, setNotification] = useState();

  console.log(Math.random())

  useEffect(() => {
    return () => {
    
    };
  }, [])

  return (
    <div>
      <li>
        <div className="columns">
          <div className="column">
            { Math.random() }
          </div>
          <div className="column">
            texto
          </div>
        </div>
      </li>
    </div>
  );
};

export default Notification;