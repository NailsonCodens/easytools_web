import React from 'react';

import { Warningtext } from '../../components/Warningtext';

const Warning = () => {
  return (
    <div>
      <Warningtext class="warning-cad">
        <b>Leia com atenção:</b>
        <br/>
        <span>Seu equipamento será avaliado e dentro de 24 horas a EasyTools liberará seu equipamento para aluguel.</span>
      </Warningtext>
    </div>
  );
};

export default Warning;