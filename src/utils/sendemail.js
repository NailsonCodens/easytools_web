import api from  '../services/api';

const Email = function (iduser, title, text, urllabel, maintext){
  console.log(iduser, title, text, maintext, urllabel, maintext)
  sendemail(iduser, title, text, urllabel, maintext)
}

async function sendemail (iduser, title, text, urllabel, maintext) {
  var email = {
    iduser: iduser,
    subject: title,
    text: text,
    maintext: maintext,
    urlLabel: urllabel
  }

  await api.post('/email/send', email, {})
  .then((res) => {
    console.log(res)
  }).catch((err) => {
  })
}

export default Email;