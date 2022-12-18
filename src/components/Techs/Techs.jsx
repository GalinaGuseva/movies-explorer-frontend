import React from 'react';
import './Techs.css';

export default function Techs() {
  return (
    <section id="techs" className="techs">
      <div className="techs__center">
        <h3 className="techs__section section section__mobile">Технологии</h3>
        <h2 className="techs__title">7 технологий</h2>
        <p className="techs__subtitle">
          На курсе веб-разработки мы освоили технологии, которые применили в
          дипломном проекте.
        </p>
        <ul className="techs__list">
          <li className="techs__item">
            <p>HTML</p>
          </li>
          <li className="techs__item">
            <p>CSS</p>
          </li>
          <li className="techs__item">
            <p>JS</p>
          </li>
          <li className="techs__item">
            <p>React</p>
          </li>
          <li className="techs__item">
            <p>Git</p>
          </li>
          <li className="techs__item">
            <p>Express.js</p>
          </li>
          <li className="techs__item">
            <p>MongoDB</p>
          </li>
        </ul>
      </div>
    </section>
  );
}
