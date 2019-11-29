import React from 'react';

export const Form = props => (
  <form action={props.type} className={props.class}>
    {props.children}
  </form>
);

export const Field = props => (
  <div className={props.class}>
    {props.children}
  </div>
);

export const Label = props => (
  <label htmlFor={props.for} className={props.class}>
    {props.children}
  </label>
);
