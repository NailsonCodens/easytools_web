import React, { useRef, useState, useEffect } from 'react'
import { Ul } from '../../components/List/index';
import { isAuthenticated } from "../../services/auth";
import Notification from '../../components/Notification/index';
import { Notification as Notificationrd } from '../../store/actions/notification';
import api from '../../services/api';
import { useDispatch } from "react-redux";

const Droppure = ({ children, classCuston, classMenu, text, countn }) => {
  const dispatch = useDispatch();	

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
      async function getCountnotification () {
        if (isAuthenticated()) {
          const response = await api.get(`/notifications/count`, {
          });
          console.log(response.data.notification)
          dispatch(Notificationrd(response.data.notification))
        }
      }
      getCountnotification()

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