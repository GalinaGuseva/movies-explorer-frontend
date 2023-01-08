import React from 'react';
import './Footer.css';
import { useRoutes } from 'react-router-dom';

function FooterShow() {
  return (
    <footer className="footer">
      <p className="footer__text">
        Учебный проект Яндекс.Практикум х BeatFilm.
      </p>
      <div className="footer__bottom">
        <p className="footer__copyright">© 2022</p>
        <ul className="footer__links">
          <li>
            <a
              className="footer__link link"
              href="https://practicum.yandex.ru"
              target="_blank"
              rel="noopener noreferrer"
            >
              Яндекс.Практикум
            </a>
          </li>
          <li>
            <a
              className="footer__link link"
              href="https://github.com/GalinaGuseva"
              target="_blank"
              rel="noopener noreferrer"
            >
              Github
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}

export default function Footer() {
  return useRoutes([
    { path: '/', element: <FooterShow /> },
    { path: '/movies', element: <FooterShow /> },
    { path: '/saved-movies', element: <FooterShow /> },
    { path: '/signup', element: '' },
    { path: '/signin', element: '' },
    { path: '/profile', element: '' },
  ]);
}
