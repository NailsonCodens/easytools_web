import React from 'react';

export const Input = props => (
  <input type={props.type} min={props.min} className="input"  placeholder={props.placeholder}/>
);

export const TextArea = props => (
  <textarea className={props.class} aceholder={props.placeholder} rows={props.rows}></textarea>
);

export const Select = props => (
  <div className="select">
    <select className={props.class} name={props.name} onChange={console.log(props.onChange)}>
      { props.options.map(option => <option key={option.value} value={option.value} >{ option.label }</option>) }
    </select>
  </div>
);

export const Selectdisabled = props => (
  <div className="select">
    <select className={props.class} name={props.name} onChange={console.log(props.onChange)}>
      { props.options.map(option => <option key={option.value} value={option.value} disalbed>{ option.label }</option>) }
    </select>
  </div>
);
