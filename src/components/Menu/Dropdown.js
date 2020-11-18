import React, { useRef, useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom';
import { useSelector } from "react-redux";
import { logout } from '../../services/auth';
import { Ul } from '../../components/List/index';
import api from '../../services/api';
import { isAuthenticated } from "../../services/auth";

import {
  isMobile
} from "react-device-detect";

const MenuRenter = ({ children, classCuston }) => {
	const wrapperRef = useRef(null);
	useOutsideAlerter(wrapperRef);

	const current_user = useSelector(state => state.auth);
  let history = useHistory();

  let [active, setActiveMenu] = useState('');
	const [perfil, setPerfil] = useState([]);
	
	function useOutsideAlerter(ref) {
		function handleClickOutside(event) {
			if (ref.current && !ref.current.contains(event.target)) {
				setActiveMenu('');
			}
		}
	
		useEffect(() => {
			document.addEventListener("mousedown", handleClickOutside);

      async function loadPerfil () {
        if(isAuthenticated()) {
          const response = await api.get(`/perfil`, {
          });
          setPerfil(response.data.user[0].url)  
        }
      }
      loadPerfil()

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

  const Logout = () => {
    logout()
    history.push("/");
  }

	return (
    <>

      {
        current_user.name === null || current_user.name === undefined ? 
        (
          ''
        ) 
        : 
        (
          <div className={'dropdown  dropdown-user-mobile is-right ' + active } ref={wrapperRef}>
            <div className="dropdown-trigger btn-user">
              <span aria-haspopup="true" aria-controls="dropdown-menu6" onClick={Dropdown}>
                <div className="navbar-item">
                  {
                    isMobile ? 
                    (
                      <>
                        <span className="">
                          <img src={perfil} alt={perfil} className="logouser-menu"/>
                          <div className="text-box text-box-cs text-boxe-cs-user">
                            { current_user.name }
                          </div>
                        </span>
                      </>
                    )
                    :
                    (
                      <>
                        <span className="user-dropdown">
                          Olá { current_user.name }
                        </span>
                      </>
                    )
                  }
                <span className="icon is-small">
                  <i className="fas fa-angle-down" aria-hidden="true"></i>
                </span>
                </div>
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
        )
      }
    </>
	)
}

export default MenuRenter