import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../Logo/Logo';
import './Header.css';

export default function HeaderLanding() {
  return (
    <header className="header">
      <Link to="/">
        <Logo />
      </Link>
      <div className="header__links">
        <Link to="/signup" className="header__link link">
          <p>Регистрация</p>
        </Link>
        <Link to="/signin" className="header__link header__link_login link">
          Войти
        </Link>
      </div>
    </header>
  );
}
