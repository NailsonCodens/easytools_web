import React from 'react'

const Warninggeneral = props => {
  return (
    <div className="warning-unavailable">
      <div className="columns">
        <div className="column is-10">
          { props.text }
        </div>
        <div className="column">
          <div className="is-pulled-right close-unavailable" onClick={event => props.close}></div>
        </div>
      </div>
  </div>
  )
}

export default Warninggeneral
