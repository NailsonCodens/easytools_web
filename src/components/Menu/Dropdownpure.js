import React, { useRef, useState, useEffect } from 'react'
import { Ul } from '../../components/List/index';

const Droppure = ({ children, classCuston, classMenu, text, countn }) => {
  const wrapperRef = useRef(null);
	useOutsideAlerter(wrapperRef);
  let [active, setActiveMenu] = useState('');
	function useOutsideAlerter(ref) {
		function handleClickOutside(event) {
			if (ref.current && !ref.current.contains(event.target)) {
				setActiveMenu('');
			}
		}
	
		useEffect(() => {
			document.addEventListener("mousedown", handleClickOutside);
			return () => {
				document.removeEventListener("mousedown", handleClickOutside);
			};
		});
	}

  const Dropdown = () => {
    if (active === 'is-active') {
      setActiveMenu('')
    } else {
      setActiveMenu('is-active')
    }
  }

	return (
    <>
      <div className={'dropdown is-right ' + active } ref={wrapperRef}>
        <div className="dropdown-trigger btn-user">
          <span aria-haspopup="true" aria-controls="dropdown-menu6" className={classMenu}  onClick={Dropdown}>
            {
              countn === 0 ? 
              ('')
               :
              (
                <div className="count">
                  <span>{ countn }</span>
                </div> 
              )
            }
            <span className={"user-dropdown "}>
              { text }
            </span>
            <span className="icon is-small">
              <i className="fas fa-angle-down" aria-hidden="true"></i>
            </span>
          </span>
        </div>
        <div className="dropdown-menu dropdown-user" id="dropdown-menu6" role="menu">
          <div className={'dropdown-content' + classCuston}>
            <div className="dropdown-item">
              <Ul>
                { children }
              </Ul>
            </div>
          </div>
        </div>
      </div>
    </>
	)
}

export default Droppure