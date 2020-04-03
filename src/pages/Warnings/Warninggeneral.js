import React from 'react'

const Warninggeneral = props => {
  return (
    <div className="warning-unavailable">
      <div className="columns">
        <div className="column">
          { props.children }
        </div>
        <div className="column is-2">
          {
            /*           <div className="is-pulled-right close-unavailable" onClick={props.close}></div>
 */
          }
        </div>
      </div>
  </div>
  )
}

export default Warninggeneral
