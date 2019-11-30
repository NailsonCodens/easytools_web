import React from 'react';

export const Button = props => (
  <button type={props.type} className={props.class}>{ props.text }</button>
);

