import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../Logo/Logo';
import Navigation from '../Navigation/Navigation';
import './Header.css';

export default function HeaderMain({ onShowMenu }) {
  return (
    <header className="header header__main">
      <Link to="/">
        <Logo />
      </Link>
      <div className="header__menu">
        <Navigation />
        <Link to="/profile">
          <p className="header__profile link">Аккаунт</p>
        </Link>
        <button onClick={onShowMenu} className="header__btn-menu link"></button>
      </div>
    </header>
  );
}
