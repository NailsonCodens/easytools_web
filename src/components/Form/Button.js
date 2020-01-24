import React from 'react';
import './button.css';

export const Button = props => (
  <button 
    type={props.type}
    onClick={props.onClick}
    className={props.className}
    disabled={props.disabled}
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
          id={props.bind}
          className={"ios-toggle " + props.className} 
          onChange={props.onChange} 
          defaultChecked={props.ch}
        />
        <label htmlFor={props.bind} className="checkbox-label" data-off={props.off} data-on={props.on}></label>
      </div>
    </>
  )
};