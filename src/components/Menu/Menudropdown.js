import React, { useRef, useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom';
import { useSelector } from "react-redux";
import { logout } from '../../services/auth';
import { Ul } from '../List/index';
import api from '../../services/api';
import { isAuthenticated } from "../../services/auth";

import {
  isMobile
} from "react-device-detect";

const Menudropdown = ({ children, classCuston }) => {
	const wrapperRef = useRef(null);
	useOutsideAlerter(wrapperRef);

	const current_user = useSelector(state => state.auth);
  let history = useHistory();

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
    if (isMobile) {
      if (current_user.type_user === 'Lessor') {
        history.push('/lessor/user-option');
      } else {
        history.push('/s/renter/user-option');
      }
    } else {
      if (active === 'is-active') {
        setActiveMenu('')
      } else {
        setActiveMenu('is-active')
      }
    }
  }


	return (
    <>
      <div className={'dropdown  dropdown-user-mobile is-right ' + active } ref={wrapperRef}>
        <div className="dropdown-trigger btn-user">
          <span aria-haspopup="true" aria-controls="dropdown-menu6" onClick={Dropdown}>
          </span>
        </div>
        <div className="dropdown-menu dropdown-user" id="dropdown-menu6" role="menu">
          <div className={'dropdown-content' + classCuston}>
            <div className="dropdown-item">
              <Ul>
                { children }
                <li className="li-drop" onClick={Logout}>
                  <Link to={''} className="navbar-item">
                    Sair
                  </Link>
                </li>
              </Ul>
            </div>
          </div>
        </div>
      </div>
    </>
	)
}

export default Menudropdown