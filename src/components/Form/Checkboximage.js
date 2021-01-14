import React, { useState } from 'react';

const Checkboximage = ({check, id, price, onChange}) => {
  const [checkvar, checkvarStatus] = useState(true);

  const checkeredChange = (name, event, type, id, price) => {
    console.log(name, event, type)

    event.target.checked === true ? check = 'Y' : check = 'N'

    console.log(event.target.checked, id, price)
  }

  return (
    <>
      <input 
      type="checkbox" 
      class="inputadons" 
      id={'idck'+id}
      name={'ck'+id}
      defaultChecked={check !== 'Y' ? false : true}
      onChange={onChange}
      />
    </>
  );
};

export default Checkboximage;