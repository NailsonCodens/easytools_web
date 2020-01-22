import React from 'react';
import { useSelector } from "react-redux";

const Rentalbox = () => {
  const rentinfo = useSelector(state => state.rentinfo);

  return (
    <>
      <div className="rental-box">
        <div className="columns">
          <div className="column">
            <img src={rentinfo.picture1} alt={rentinfo.picture1} className="" />
          </div>
          <div className="column">
            <img src={rentinfo.picture2} alt={rentinfo.picture2} className="" />
          </div>
          <div className="column">
            <img src={rentinfo.picture3} alt={rentinfo.picture3} className="" />
          </div>
        </div>
        <p className="title-tool-rules">{ rentinfo.title }</p>
        <b className="category">{ rentinfo.category }</b>
      </div>
    </>
  );
};

export default Rentalbox;