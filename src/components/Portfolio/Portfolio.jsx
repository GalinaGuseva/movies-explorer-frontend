import React from "react";
import "./Portfolio.css";

export default function Portfolio() {
  return (
    <div className="portfolio">
      <p className="portfolio__title">Портфолио</p>
      <ul className="portfolio__list">
        <li className="portfolio__item">
          <a
            className="portfolio__link link"
            href="https://galinaguseva.github.io/how-to-learn/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <p className="portfolio_site">Статичный сайт</p>
            <span className="portfolio__icon">&#8599;</span>
          </a>
        </li>
        <li className="portfolio__item">
          <a
            className="portfolio__link link"
            href="https://galinaguseva.github.io/russian-travel/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <p className="portfolio_site">Адаптивный сайт</p>
            <span className="portfolio__icon">&#8599;</span>
          </a>
        </li>
        <li className="portfolio__item">
          <a
            className="portfolio__link link"
            href="https://github.com/GalinaGuseva/react-mesto-api-full"
            target="_blank"
            rel="noopener noreferrer"
          >
            <p className="portfolio_site">Одностраничное приложение</p>
            <span className="portfolio__icon">&#8599;</span>
          </a>
        </li>
      </ul>
    </div>
  );
}
