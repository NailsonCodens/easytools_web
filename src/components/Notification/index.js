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
  const current_user = useSelector(state => state.auth);
  const dispatch = useDispatch();	

  useEffect(() => {
    async function notification () {
      const response = await api.get(`notifications`, {
      });
      setNotification(response.data.notification)
      const rent = await api.get(`/rents/${response.data.notification[0].rent_attempt_id}`, {});
      setRent(response.data.rentattempt);
    }
    notification()

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

  const goAccept = () => {
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
      <li>
        {
          nt.map((notify, index) => (
            <div key={index} className="columns column-notify">
              <div className="column is-3">
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
                  <div className="column">
                    <Button
                      className={'button is-small is-info bt-overhead'}
                      text={'Aceitar'}
                      onClick={event => goAccept()}
                    />
                  </div>
                  <div className="column">
                    <Button
                      className={'button is-small is-warning bt-overhead'}
                      text={'Não aceitar'}
                      onClick={event => goAccept()}
                    />    
                  </div>
                </div>
              </div>
            </div>
          ))
        }
        {
          nt.length === 0 ?
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
                text={'Ver mais'}
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