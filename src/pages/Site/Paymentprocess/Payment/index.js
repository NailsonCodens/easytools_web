import React, { useState, useEffect } from 'react';
import { Button } from '../../../../components/Form/Button';
import api from '../../../../services/api';
import socketio from '../../../../services/socketio';
import { useSelector } from "react-redux";
import queryString from 'query-string';
import { useParams, useLocation } from "react-router-dom";
import moment from 'moment';
import 'moment/locale/pt-br';
moment.locale('pt-BR');

const Payment = () => {
  const [rentattempt, setRentattemp] = useState();
  let values = queryString.parse(useLocation().search);
  const current_user = useSelector(state => state.auth);

  useEffect(() => {
    async function loadRentattempt () {
      const response = await api.get(`rent/attempt/${values.rent_attempt}/${values.code_attempt}`, {
      });

      setRentattemp(response.data.rentattempt[0])
    }
    loadRentattempt();

    return () => {
    };
  }, [])

  const paymentRent = () => {

    sendNotification()
  }

  async function sendNotification () {
    var titletool = rentattempt.tool.title
    var lessor = rentattempt.userlessor.name
    var renter = rentattempt.userrenter.name
    var tension = rentattempt.tension
    var startdate = moment(rentattempt.startdate).format('DD/MM/YYYY');
    var enddate = moment(rentattempt.enddate).format('DD/MM/YYYY');
    var title = `Seu equipamento foi alugado por ${renter}`;
    var message = `Olá ${lessor}, ${renter} alugou sua ${titletool} com tensão em ${tension} para o período de ${startdate} á ${enddate}`;

    var notification = {
      rent_attempt_id: rentattempt.id,
      user_recipient_id: rentattempt.user_lessor_id,
      title: title
    }

    await api.post('/notifications/send', notification, {})
    .then((res) => {
      socketio.emit('private_chat',{
        to : rentattempt.user_lessor_id,
        title: title,
        message : message
      });
    }).catch((err) => {
      console.log(err.response)
    }) 
  }

  return (
    <div className="container">
      <div className="columns">
        <div className="column is-two-thirds">
          <p className="title-tool-only"> Pagamento & Cancelamento </p>
          <Button 
            type={'button'}
            className={'button is-pulled-left color-logo'}
            text={'Pagar'}                                    
            onClick={event => paymentRent()}
          />
        </div>
        <div className="column">
          Rental box para com valores finais
        </div>
      </div>
    </div>
  );
};

export default Payment;
