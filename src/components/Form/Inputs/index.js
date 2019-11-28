import React from 'react';

export class Input extends React.Component {
  render () {
    return (
      <>
        <input type={this.props.type}/>
      </>
    )
  }
}

export class TextArea extends React.Component {
  render () {
    return (
      <>
        <textarea></textarea>
      </>
    )
  }
}
