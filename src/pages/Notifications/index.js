import React, { useState, useEffect } from 'react'
import Notication from '../../components/Notification/index'
import api from '../../services/api';
import './style.css'
import { Button } from '../../components/Form/Button';
import { useDispatch, useSelector } from "react-redux";
import { Notification as Notificationrd } from '../../store/actions/notification';
import {Titlepage} from '../../components/Titles/Titlepages';
import Scroll from '../../utils/scroll';

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

  const goNotification = (rent_attempt_id, id, type) => {
    Scroll()
    if (type === 'Pagar') {
      history.push(`/s/payment/payment-view/${rent_attempt_id}`);
      goUpdatenotifiy(id);
    } else {
      if (current_user.type_user === 'Lessor') {
        goUpdatenotifiy(id);
        history.push(`/lessor/rents/detail/${rent_attempt_id}`);
      } else {
        goUpdatenotifiy(id);
        history.push(`/s/renter/myrent/details/${rent_attempt_id}`);
      }
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
    if (current_user.type_user === 'Lessor') {
      history.push(`/lessor/notifications`);
    } else {
      history.push(`/s/renter/notifications`);
    }

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
            
            <div key={index} className={notify.done === null ? 'columns is-mobile column-notify new-notify' : "columns is-mobile column-notify"}>
              <div className="column is-2">
                <div className="avatar-notify">
                  <img src={notify.usersend.url} alt={notify.usersend.url} className="" />
                </div>
              </div>
              <div className="column">
                <p className="title-notification"> { notify.title }</p>
                <div className="columns is-mobile">
                  <div className="column">
                    <Button
                      className={'button is-small is-default bt-overhead'}
                            text={notify.title.indexOf('Pagamento') === 0 ? 'Pagar' : 'Ver'}
                            onClick={event => goNotification(notify.rent_attempt_id, notify.id, notify.title.indexOf('Pagamento') === 0 ? 'Pagar' : 'Ver')}

                    />    
                  </div>
                </div>
              </div>
            </div>
            ))
          }
        {
          notification.length === 0 ? 
          (
            <div className="notfound has-text-centered">
              Nenhuma notificação por enquanto!
            </div>
          )
          :
          (
            <div className="has-text-centered">
            </div>
          )
        }

        </div>
        </div>
      </div>
    </div>
  )
}

export default Allnotification
