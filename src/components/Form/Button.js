import React from 'react';
import './button.css';

export const Button = props => (
  <button 
    type={props.type}
    onClick={props.onClick}
    className={props.class}
  >
    { props.text }
  </button>
);

export const CheckboxIOS = (props) => {
  return (
    <>
      <div id="toggles">
        <input 
          type="checkbox" 
          name={props.name} 
          id="checkbox1" 
          className={"ios-toggle " + props.class} 
          onChange={props.onChange} 
          defaultChecked
        />
        <label htmlFor="checkbox1" className="checkbox-label" data-off={props.off} data-on={props.on}></label>
      </div>
    </>
  )
};