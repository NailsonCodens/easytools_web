import React, { useEffect, useState } from 'react';
import Iframe from 'react-iframe'
import api from '../../../../services/api';
import { useParams } from "react-router-dom";

const Paymentme = () => {
  let { id } = useParams();
  const [rent, setRent] = useState([]);

  useEffect(() => { 
    async function loadRent () {
      const response = await api.get(`renter/rents/${id}`, {});
      setRent(response.data.rentattempt)
    }
    loadRent()
    
    return () => {
    };
  }, [])

  return (
    <div className="container explorer">
      {
        rent.map((rent, index) => (
          <div key="rent">
            <h3>Pagamento do aluguel de { rent.tool.title }</h3>
            <br/>
            <Iframe url={rent.linkpayment}
              width="100%"
              height="1000px"
              id="myId"
              loading={"Olá tudo bemadjusadhu"}
              className="has-text-centered"
              display="initial"
              position="relative"/>
          </div>
        ))
      }
    </div>
  );
};

export default Paymentme;