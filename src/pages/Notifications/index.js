import React, { useState, useEffect } from 'react'
import Notication from '../../components/Notification/index'
import api from '../../services/api';
import './style.css'
import { Button } from '../../components/Form/Button';
import { useDispatch, useSelector } from "react-redux";
import { Notification as Notificationrd } from '../../store/actions/notification';
import {Titlepage} from '../../components/Titles/Titlepages';

const Allnotification = ({history}) => {
  const [notification, setNotification] = useState([])
  const current_user = useSelector(state => state.auth);
  const dispatch = useDispatch();	

  useEffect(() => {
    async function getNotification () {
      const response = await api.get(`/notifications/all`, {
      });
      setNotification(response.data.notification)
    }
    getNotification()

    return () => {
    };
  }, [])

  const goNotification = (rent_attempt_id, id) => {
    if (current_user.type_user === 'Lessor') {
      goUpdatenotifiy(id);
      history.push(`/lessor/rents/detail/${rent_attempt_id}`);
    } else {
      console.log('Renter')
    }
  }

  async function goUpdatenotifiy (id) {
    const response = await api.put(`/notifications/update/${id}`, {
    });
    updatecount()
  }

  async function updatecount () {
    const response = await api.get(`/notifications/count`, {
    });
    dispatch(Notificationrd(response.data.notification))
  }

  const goAllnotification = () => {
    history.push(`/lessor/notifications`);
  }

  return (
    <div>
    <div className="container container-page">
      <div className="columns is-desktop">
        <div className="column box-inter padding-notification">
          <Titlepage>Notificações </Titlepage>
          <br/><br/>
          {
            notification.map((notify, index) => (
            <div key={index} className="columns column-notify">
              <div className="column is-1">
                <div className="avatar-notify">
                  <img src={notify.usersend.url} alt={notify.usersend.url} className="" />
                </div>
              </div>
              <div className="column">
                {
                  notify.done === null ? 
                  (
                    <b>* { notify.title }</b>

                  )
                  :
                  (
                    <p>{ notify.title }</p>
                  )
                }

                { /* mostrar este botão, só quando a tentativa
                  de locação, for nova, sabendo assim, pelo accept
                */ }
                <div className="columns">
                  <div className="column">
                    <Button
                      className={'button is-small is-default bt-overhead'}
                      text={'Ver'}
                      onClick={event => goNotification(notify.rent_attempt_id, notify.id)}
                    />    
                  </div>
                </div>
              </div>
            </div>
            ))
          }
        </div>
        </div>
      </div>
    </div>
  )
}

export default Allnotification
