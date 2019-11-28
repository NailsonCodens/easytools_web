import React from 'react';

export class Form extends React.Component {
  render () {
    return (
      <>
        <form action={this.props.type} className={this.props.style}>
          { this.props.children }
        </form>
      </>
    )
  }
}

export class Field extends React.Component {
  render () {
    console.log(this.props.style);
    return (
      <>
        <div className={this.props.style}>
          { this.props.children }
        </div>
      </>
    )
  }
}

export class Label extends React.Component {
  render () {
    return (
      <>
        <label htmlFor={this.props.for} className={this.props.style}>
          { this.props.children }
        </label>
      </>
    )
  }
}