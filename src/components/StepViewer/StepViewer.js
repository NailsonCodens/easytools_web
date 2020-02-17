import React from 'react';
import './main.css';


/*
    Params:
        items = holds quantity of items the progress bar must have
        active = holds the position of the active item not zero based 
    made by: Cleverson Matias - MatiasWebDev
*/

const StepViewer = props => {
    const {items, active} = props;
    let count = 1;
    let html = [];
  
    while (count <= items) {
      html.push(<li key={count} className={active === count ? 'active' : ''}></li>);
      count++;
    }
  
    return (
      <div className="stepViewer">
          <ul className="progressbar">
              {html}
          </ul>
      </div>
    ) 
  }

  export default StepViewer;