import React, {useState} from "react";
import logo from "../images/Logo.svg";
import { Route, Switch, Link } from 'react-router-dom';

function Header({email, onLogout}) {

  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="Место" />
      <Switch>
        <Route path="/sign-up">
          <Link className="header__link header__link_auth" to='/sign-in'>Войти</Link>
        </Route>
        <Route path="/sign-in">
          <Link className="header__link header__link_auth" to="/sign-up">Регистрация</Link>
        </Route>
        <Route exact path='/'>
          <div className="header__auth">
            <p className="header__text">{email}</p>
            <Link to='/sign-in' className="header__link" onClick={onLogout}>Выйти</Link>
          </div>
        </Route>
      </Switch>
    </header>
  ); 
}

export default Header;
