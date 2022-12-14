import React from 'react';
import './Navigation.css';
import { NavLink } from 'react-router-dom';

export default function Navigation() {
  return (
    <nav className="navigation">
      <NavLink
        to="/movies"
        className={({ isActive }) =>
          isActive ? 'navigation__link_active' : 'navigation__link link'
        }
      >
        Фильмы
      </NavLink>
      <NavLink
        to="/saved-movies"
        className={({ isActive }) =>
          isActive ? 'navigation__link_active' : 'navigation__link link'
        }
      >
        Сохранённые фильмы
      </NavLink>
    </nav>
  );
}
