import React from 'react';
import './NavTab.css';

export default function NavTab() {
  return (
    <nav className="nav">
      <a href="#about-project" className="nav__link link_button">
        О&nbsp;проекте
      </a>
      <a href="#techs" className="nav__link link_button">
        Технологии
      </a>
      <a href="#about-me" className="nav__link link_button">
        Студент
      </a>
    </nav>
  );
}
