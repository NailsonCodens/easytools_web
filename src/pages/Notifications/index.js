import React, { useState, useEffect } from 'react'
import Notication from '../../components/Notification/index'
import api from '../../services/api';
import './style.css'

const Allnotification = () => {
  const [notification, setNotification] = useState([])

  useEffect(() => {
    async function getNotification () {
      const response = await api.get(`/notifications`, {
      });
      setNotification(response.data.notification)
    }
    getNotification()

    return () => {
    };
  }, [])

  return (
    <div>
    <div className="container container-page">
      <div className="columns is-desktop">
          <div className="column is-6 box-inter padding-notification">
          </div>     
          <div className="column box-inter">
            adasdsa
          </div>
        </div>
      </div>
    </div>
  )
}

export default Allnotification
