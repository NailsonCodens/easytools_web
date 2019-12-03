import React from 'react';

export const Input = props => (
  <input type={props.type} className="input"  placeholder={props.placeholder}/>
);

export const TextArea = props => (
  <textarea></textarea>
);

export const Select = props => (
  <div className="select">
    <select className={props.class} name={props.name} onChange={console.log(props.onChange)}>
      { props.options.map(option => <option key={option.value} value={option.value}>{ option.label }</option>) }
    </select>
  </div>
);
