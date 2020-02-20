import api from  '../services/api';

const Email = function (iduser, title, text){
  console.log(iduser, title, text)
  sendemail(iduser, title, text)
}

async function sendemail (iduser, title, text) {
  var email = {
    iduser: iduser,
    subject: title,
    text: text
  }

  await api.post('/email/send', email, {})
  .then((res) => {
    console.log(res)
  }).catch((err) => {
  })
}

export default Email;