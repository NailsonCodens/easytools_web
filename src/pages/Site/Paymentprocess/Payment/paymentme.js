import React, { useEffect, useState } from 'react';
import Iframe from 'react-iframe'
import api from '../../../../services/api';
import { useParams } from "react-router-dom";
import { Button } from '../../../../components/Form/Button';
import Wootric from '../../../../components/Wootric';
import brands from '../../../../assets/images/brand.png';
import {Helmet} from 'react-helmet';

const Paymentme = () => {
  let { id } = useParams();
  const [rent, setRent] = useState([]);
  const [setopennps, setOpennps] = useState(false);

  useEffect(() => { 
    async function loadRent () {
      const response = await api.get(`renter/rents/${id}`, {});
      setRent(response.data.rentattempt)
    }
    loadRent()
    
    return () => {
    };
  }, [])

  const openNps = () => {
    setOpennps(true)
  }

  return (
    <>
      <Helmet>
        <title>{ 'Pagamento do aluguel' }</title>
      </Helmet>
      <div className="container explorer container-mobile-paymentme">
        {
          rent.map((rent, index) => (
            <div key="rent">
              <h3>Pagamento do aluguel de { rent.tool.title }</h3>
              <br/>
              <div className="columns">
                <div className="column no-padding-paymentme">
                  <Iframe url={rent.linkpayment}
                    width="100%"
                    height="600px"
                    id="myId"
                    loading={"Olá tudo bem?"}
                    className="has-text-centered"
                    display="initial"
                    position="relative"/>                  
                </div>
                <div className="column is-4">
                  <p className="feedback">Pague e em seguida nos ajude com o seu feedback. Clique em "Feedback?"</p>
                  <img src={brands} alt="Payments allowed" className=""/>
                  <div>
                    <img src={brands} alt={brands} className="brands-tools"/>
                    <br/>
                    <p>Apenas cartão de <b>crédito</b>. 
                    <br/>
                    Para reservas com 3 dias de antecedências, disponível <b>boleto</b>.</p>
                  </div>
              </div>
              </div>
            </div>
          ))
        }
        <Button 
          type={'button'}
          className={'button is-pulled-right color-logo feedback-button'}
          text={'Feedback'}                                    
          onClick={event => openNps()}
        />
        {
          setopennps === true ? 
          (
            <Wootric/>
          )
          :
          ('')
        }
      </div>
    </>
  );
};

export default Paymentme;