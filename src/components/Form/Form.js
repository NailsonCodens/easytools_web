import React from 'react';

export const Form = props => (
  <form action={props.type} className={props.className}>
    {props.children}
  </form>
);

export const Field = props => (
  <div className={props.className}>
    {props.children}
  </div>
);

export const Label = props => (
  <label htmlFor={props.for} className={props.className}>
    {props.children}
  </label>
);
