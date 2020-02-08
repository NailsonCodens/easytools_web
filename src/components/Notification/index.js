import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { useHistory } from 'react-router-dom';
import './style.css';
import { Button } from '../../components/Form/Button';
import { useSelector } from "react-redux";

const Notification = ({nt}) => {
	let history = useHistory();
  const [notification, setNotification] = useState(nt);
  const current_user = useSelector(state => state.auth);

  useEffect(() => {
    async function notification () {
      const response = await api.get(`notifications`, {
      });
      setNotification(response.data.notification)
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

  async function goUpdatenotifiy (id) {
    const response = await api.put(`/notifications/update/${id}`, {
    });  
  }

  const goAllnotification = () => {
    console.log('vai para todas as notificações')
  }

  return (
    <div>
      <li>
        {
          nt.map((notify, index) => (
            <div key={index} className="columns column-notify" onClick={event => goNotification(notify.rent_attempt_id, notify.id)}>
              <div className="column is-3">
                <div className="avatar-notify">
                  <img src={notify.usersend.url} alt={notify.usersend.url} className="" />
                </div>
              </div>
              <div className="column">
                <b>{ notify.title }</b>
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