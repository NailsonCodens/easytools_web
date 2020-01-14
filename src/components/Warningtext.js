import React from 'react';

export const Warningtext = props => (
  <p className={props.class === '' ? 'warning-text' : `warning-text-no-aling ${props.class}`}>{props.children}</p>
);

