import api from '../../services/api';

async function linkpayment (idattempt, rent) {
  console.log(rent)

  var title = "Aluguel de " + rent.tool.title;

  if (rent.period === 'days') {
    title += " Por " + rent.days + ' Dias ';
  } else if (rent.period === 'biweekly') {
    title += " Para " + rent.days + ' Dias - Quinzenal ';
  } else if (rent.period === 'weekend') {
    title += " Por " + rent.days + ' Dias - Semana ';
  } else if (rent.period === 'month') {
    if (rent.days === '1' || rent.days === 1) {
      title += " Por " + rent.days + ' Mês ';
    } else {
      title += " Por " + rent.days + ' Mêses ';
    }
  }

  const renderValuefinal = () => {
    var value = parseFloat(rent.cost) + parseFloat(rent.freight)
    var vl = value.toString()
    return vl * 100
  }

  const renderTypedocument = () => {
    var typedoc = rent.userrenter.cpfcnpj > 14 ? 'cnpj' : 'cpf'
    return typedoc
  }

  const renderCpfcnpj = () => {
    return rent.userrenter.cpfcnpj.replace(/[^\d]+/g,'')
  }

  const renderZipcode = () => {
    if (rent.userrenter.location !== null) {
      return rent.userrenter.location.replace(/[^\d]+/g,'')
    } else {
      return '00000000'
    }
  }

  const renderPhone = () => {
    if (rent.userrenter.phone !== null) {
      var phone = rent.userrenter.phone.replace(/[^\w\s]/gi, '')
      return phone.replace(/\s+/g, '')
    } else {
      return ''
    }
  }

  const objectpayment = { 
    id_rent_attempt: idattempt,
    name: "Link pagamento de teste da api",
    amount: renderValuefinal() * rent.amount,
    items: [
      {
        id: rent.tool.id,
        title: title,
        unit_price: renderValuefinal(),
        quantity: rent.amount,
        tangible: "true"
      }
    ],
    payment_config: {
      /*boleto: {
        enabled: true,
        expires_in: 1
      },*/
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
        external_id: rent.userrenter.id,
        name: rent.userrenter.name + ' ' + rent.userrenter.last_name,
        type: "individual",
        country: "br",
        email: rent.userrenter.email,
        documents:[
          {
            type: renderTypedocument(),
            number: renderCpfcnpj()
          }
        ],
        phone_numbers:[
          renderPhone()
        ],
        birthday: rent.userrenter.birth_date
      },
      billing:{
        name: rent.userrenter.name + ' ' + rent.userrenter.last_name,
        address: {
          country: "br",
          state: rent.userrenter.uf !== null ? rent.userrenter.uf : 'Paraná',
          city: rent.userrenter.city !== null ? rent.userrenter.city : 'Curitiba',
          neighborhood: rent.userrenter.neighboor !== null ? rent.userrenter.neighboor : '-',
          street: rent.userrenter.address !== null ? rent.userrenter.address : 'Rua',
          street_number: rent.userrenter.number !== null ? rent.userrenter.number : '1',
          zipcode: renderZipcode()
        }
      }
    },
    expires_in: "60",
    review_informations: true
  }
  console.log(objectpayment)
  return await api.post('/pyment/generatelink', objectpayment)
}


export const Paymentlink = (idattempt, rent) => {
  return linkpayment(idattempt, rent);
}