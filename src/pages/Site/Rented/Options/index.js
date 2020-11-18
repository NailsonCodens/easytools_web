import React from 'react'
import { useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import Scrool from '../../../../utils/scroll';
import { logout } from '../../../../services/auth';
import './style.css';

function Index({history}) {
  const current_user = useSelector(state => state.auth);
  
  const Logout = () => {
    logout()
    history.push("/");
  }

  return (
    <div className="container optionuser-container">
      <div className="columns">
        <div className="column">
          {
            current_user.type_user === 'Lessor' ? 
            (
              <div className="optionsuser">
                <li className="li-drop">
                  <Link to={'/lessor/perfil'} onClick={event => Scrool() } className="navbar-item">
                    Perfil
                  </Link>
                </li>
                <li className="li-drop">
                  <Link to={'/lessor/account'} onClick={event => Scrool() } className="navbar-item">
                    Conta
                  </Link>
                </li>
                <li className="li-drop">
                  <Link to={'/lessor/dashboard'} onClick={event => Scrool() } className="navbar-item">
                    Ver meus alugueis
                  </Link>
                </li>
                <li className="li-drop">
                  <Link to={'/'} onClick={event => Scrool() } className="navbar-item">
                    Como ser um bom vizinho?
                  </Link>
                </li>
                <li className="li-drop">
                  <p onClick={Logout} className="navbar-item">
                    Sair
                  </p>
                </li>
              </div>
            )
            :
            (
              <div className="optionsuser">
                <br/><br/><br/>
                <Link to={'/s/renter/perfil'} onClick={event => Scrool() } className="navbar-item">
                  Perfil
                </Link>
                <p onClick={Logout} className="navbar-item">
                  Sair
                </p>
              </div>
            )
          }
        </div>
      </div>
    </div>
  )
}

export default Index
