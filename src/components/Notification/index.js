import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { useHistory } from 'react-router-dom';
import './style.css';
import { Button } from '../../components/Form/Button';
import { useDispatch, useSelector } from "react-redux";
import { Notification as Notificationrd } from '../../store/actions/notification';

const Notification = ({nt}) => {
  let history = useHistory();
  const [notification, setNotification] = useState(nt);
  const [rent, setRent] = useState([]);
  const [define, setDefine] = useState(false);
  const current_user = useSelector(state => state.auth);
  const notificationrd = useSelector(state => state.notification);
  const dispatch = useDispatch();	

  useEffect(() => {
    async function notification () {
      const response = await api.get(`notifications`, {
      });
      
      setNotification(response.data.notification)
      if (response.data.notification.length > 0) {
        setDefine(true);
        const rent = await api.get(`/rents/${response.data.notification[0].rent_attempt_id}`, {});
        setRent(response.data.rentattempt);  
      }
    }
    notification()

    return () => {

    };
  }, [])

  const goNotification = (rent_attempt_id, id, type) => {
    if (type === 'Pagar') {
      history.push({
       pathname: `/s/payment/payment-view/${rent_attempt_id}`,
       target: "_blank"
      });
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
    updateNotficationsshow()
  }

  async function updateNotficationsshow () {
    const response = await api.get(`notifications`, {
    });

    if (response.data.notification.length > 0) {
      setNotification(response.data.notification)
      const rent = await api.get(`/rents/${response.data.notification[0].rent_attempt_id}`, {});
      setRent(response.data.rentattempt);  
    }
  }

  async function updatecount () {
    if (current_user.length > 0) {
      const response = await api.get(`/notifications/count`, {
      });
      dispatch(Notificationrd(response.data.notification))  
    }
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
      <li>
        {
          nt.length > 0 ? 
          (
            <>
              {
                nt.map((notify, index) => (
                  <div key={index} className={notify.done === null ? 'columns is-mobile column-notify new-notify' : "columns is-mobile column-notify"}>
                    <div className="column is-2">
                      <div className="avatar-notify">
                        <img src={notify.usersend.url} alt={notify.usersend.url} className="" />
                      </div>
                    </div>
                    <div className="column">
                      <p className="title-notification">{ notify.title }</p>

                      { /* mostrar este botão, só quando a tentativa
                        de locação, for nova, sabendo assim, pelo accept
                      */ }
                      <div className="columns">
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
            </>
          ):
          (
            <>
              {
                notification.map((notify, index) => (
                  <div key={index} className="columns column-notify">
                    <div className="column is-2">
                      <div className="avatar-notify">
                        <img src={notify.usersend.url} alt={notify.usersend.url} className="" />
                      </div>
                    </div>
                    <div className="column">
                      {
                        notify.done === null ? 
                        (
                          <b className="title-notification">* { notify.title }</b>

                        )
                        :
                        (
                          <p className="title-notification">{ notify.title }</p>
                        )
                      }

                      { /* mostrar este botão, só quando a tentativa
                        de locação, for nova, sabendo assim, pelo accept
                      */ }
                      <div className="columns">
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
            </>
          )
        }
        {
          nt.length === 0 && define === false ? 
          (
            <div className="notfound has-text-centered">
              Nenhuma notificação por enquanto!
            </div>
          )
          :
          (
            <div className="has-text-centered">
              <br/>
              <Button
                className={'button is-small is-info'}
                text={'Ver mais' + ' (' + notificationrd + ') '}
                onClick={event => goAllnotification()}
              /> 
            </div>
          )
        }
      </li>
    </div>
  );
};

export default Notification;