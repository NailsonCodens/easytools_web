import React from 'react';

export class Ul extends React.Component {
  render () {
    return (
      <>
        <ul>
          { this.props.children }
        </ul>
      </>
    )
  }
}
