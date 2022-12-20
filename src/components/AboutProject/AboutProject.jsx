import React from 'react';
import './AboutProject.css';

export default function AboutProject() {
  return (
    <section id="about-project" className="about-project">
      <h3 className="about-project__section section">О проекте</h3>
      <ul className="about-project__list">
        <li className="about-project__item">
          <h4 className="about-project__subtitle">
            Дипломный проект включал 5 этапов
          </h4>
          <p className="about-project__text">
            Составление плана, работу над бэкендом, вёрстку, добавление
            функциональности и финальные доработки.
          </p>
        </li>
        <li className="about-project__item">
          <h3 className="about-project__subtitle">
            На выполнение диплома ушло 5 недель
          </h3>
          <p className="about-project__text">
            У каждого этапа был мягкий и&nbsp;жёсткий дедлайн, которые нужно
            было соблюдать, чтобы успешно защититься.
          </p>
        </li>
      </ul>
      <ul className="about-project__term">
        <li>
          <p className="about-project__week about-project__week_green">
            1 неделя
          </p>
        </li>
        <li>
          <p className="about-project__week">4 недели</p>
        </li>
        <li>
          <p className="about-project__direction">Back-end</p>
        </li>
        <li>
          <p className="about-project__direction">Front-end</p>
        </li>
      </ul>
    </section>
  );
}
