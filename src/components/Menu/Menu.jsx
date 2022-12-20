import React from "react";
import "./Menu.css";
import { Link, NavLink } from "react-router-dom";

export default function Menu({ isOpen, onClose }) {
  return (
    <section
      className={`menu ${isOpen ? "menu_active" : ""}`}
      onClick={onClose}
    >
      <div
        className={`menu__container ${
          isOpen ? "menu__container_visible" : "menu__container_hidden"
        }`}
      >
        <div className="menu__bar">
          <button onClick={onClose} className="menu__btn-close link"></button>
          <nav className="menu__nav">
            <NavLink to="/" onClick={onClose} className="menu__link link">
              Главная
            </NavLink>
            <NavLink
              to="/movies"
              className={({ isActive }) =>
                isActive
                  ? "menu__link menu__link_active-movies"
                  : "menu__link link"
              }
            >
              Фильмы
            </NavLink>
            <NavLink
              onClick={onClose}
              to="/saved-movies"
              className={({ isActive }) =>
                isActive ? "menu__link menu__link_active" : "menu__link link"
              }
            >
              Сохранённые фильмы
            </NavLink>
          </nav>
        </div>
        <Link
          to="/profile"
          className="menu__profile-link link"
          onClick={onClose}
        >
          Аккаунт
        </Link>
      </div>
    </section>
  );
}
