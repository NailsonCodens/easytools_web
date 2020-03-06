import api from '../../../services/api';

const ChangeAccept = (data, id) => {
  console.log(data)
  var type = '';

  if (data === 'accept') {
    type = '1';
  } else {
    type = 'N';
  }

  return endpoint(data, id)
}

async function endpoint (data, id) {
  return await api.put(`/rents/${data}/${id}`, {
  });
}

export default ChangeAccept