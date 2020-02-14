import React, { useState, useEffect } from 'react';
import { Button } from '../../../../components/Form/Button';
import api from '../../../../services/api';
import socketio from '../../../../services/socketio';
import { useSelector } from "react-redux";
import queryString from 'query-string';
import Rentruesblock from '../../../Warnings/Rentrulesblock';
import NotAvailable from '../../../Warnings/NotAvailable';
import { useParams, useLocation } from "react-router-dom";
import moment from 'moment';
import 'moment/locale/pt-br';
moment.locale('pt-BR');

const Payment = ({history}) => {
  const [rentattempt, setRentattemp] = useState();
  const [ok, setOk] = useState(true);
  const [okattempt, setOkAttempt] = useState(true);

  let values = queryString.parse(useLocation().search);
  const current_user = useSelector(state => state.auth);

  useEffect(() => {
    async function loadRentattempt () {
      const response = await api.get(`rent/attempt/${values.rent_attempt}/${values.code_attempt}`, {
      });
      if (response.data.rentattempt.length > 0) {
        setRentattemp(response.data.rentattempt[0]);
        setOkAttempt(true)
      } else {
        setOkAttempt(false)
      }
    }
    loadRentattempt();

    return () => {
    };
  }, [])

  const paymentRent = () => {

    sendNotification()
  }

  async function sendNotification () {
    verifyAvailabletool()
  }

  async function verifyAvailabletool() { 
    const response = await api.get(`/tools_site/tool/${rentattempt.tool_id}`, {
    });
    if (response.data.tool[0].availability === 'Y') {
      var titletool = rentattempt.tool.title
      var lessor = rentattempt.userlessor.name
      var renter = rentattempt.userrenter.name
      var tension = rentattempt.tension
      var startdate = moment(rentattempt.startdate).format('DD/MM/YYYY');
      var enddate = moment(rentattempt.enddate).format('DD/MM/YYYY');
      var title = `${renter} alugou seu equipamento`;
      var message = `Olá ${lessor}, ${renter} alugou sua ${titletool} com tensão em ${tension} para o período de ${startdate} á ${enddate}`;
  
      var notification = {
        rent_attempt_id: rentattempt.id,
        user_recipient_id: rentattempt.user_lessor_id,
        message: message,
        title: title
      }
  
      await api.post('/notifications/send', notification, {})
      .then((res) => {
        socketio.emit('notify',{
          to : rentattempt.user_lessor_id,
          title: title,
          message : message
        });
      }).catch((err) => {
        console.log(err.response)
      }) 
    } else {
      history.push(`/?t=unavailable`);
    }
  }


  return (
    <div className="container">
      {
        okattempt === true ? 
        (
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
        )
        :
        (
          <Rentruesblock/>
        )
      }
    </div>
  );
};

export default Payment;
