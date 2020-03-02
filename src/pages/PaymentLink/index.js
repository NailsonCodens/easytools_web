import api from '../../services/api';

async function linkpayment (idattempt) {

  const objectpayment = { 
    id_rent_attempt: idattempt,
    name: "Link pagamento de teste da api",
    amount: "12055",
    items: [
      {
        id: "566363de-2a12-4177-a74d-cb7d067ae58a",
        title: "Serra Tico Tico Makita",
        unit_price: "12055",
        quantity: "1",
        tangible: "true"
      }
    ],
    payment_config: {
      boleto: {
        enabled: true,
        expires_in: 1
      },
      credit_card: {
        enabled: true,
        free_installments: 1,
        interest_rate: 0.01,
        max_installments: 1
      },
      default_payment_method: "credit_card"
    },
    customer_config: {
      customer: {
        external_id: "12333",
        name: "Nailson Israel",
        type: "individual",
        country: "br",
        email: "nailson.ivs@gmail.com",
        documents:[
          {
            type: "cpf",
            number: "71404665560"
          }
        ],
        phone_numbers:[
          "+5141991695587",
          "+5541991695587"
        ],
        birthday: "1996-01-09"
      },
      billing:{
        name: "Nailson Israel",
        address: {
          country: "br",
          state: "PR",
          city: "Paraná",
          neighborhood: "Cic",
          street: "Rua alvares de azevedo",
          street_number: "298",
          zipcode:  "81250300"
        }
      }
    },
    expires_in: "60",
    review_informations: true
  }

  return await api.post('/pyment/generatelink', objectpayment)
}


export const Paymentlink = (idattempt) => {
  return linkpayment(idattempt);
}