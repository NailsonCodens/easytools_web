import React from 'react';
import { CheckboxIOS } from '../../../components/Form/Button';
import api from '../../../services/api';

const btAvailability = ({idtool, availability}) => {
  const handleChangeAvailability = (name, event, type) => {
    const idtool = name.split('_')[1]
    const typecheck = event.target.type === 'checkbox' ? event.target.checked : event.target.value;

    const value = typecheck === true ? "Y" : "N"

    update(idtool, value)
  }

  async function update (idtool, value) {
    const vals = {
      availability: value
    }

    await api.put(`tools/update/availability/${idtool}`, vals, {})
    .then((res) => {
    }).catch((err) => {
      console.log(err.response)
    })
  }

  return (
    <div className="container-checkbox-lessor">
      {
        idtool !== undefined && availability !== undefined ?
        (
          <>
            <CheckboxIOS 
              onChange={event => handleChangeAvailability(`availability_${idtool}`, event, 'checkbox')}
              name={`availability_${idtool}`}
              bind={`checkavailability_${idtool}`} 
              id={`checkavailability_${idtool}`}
              ch={availability === 'Y' ? true : false}
              off="Indisponível" 
              on="Disponível"
            />
          </>
        ) : 
        ('')
      }
    </div>
  );
};

export default btAvailability;