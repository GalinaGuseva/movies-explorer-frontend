import React from 'react';
import './AboutMe.css';
import photo from '../../images/Мое фото.jpg';

export default function AboutMe() {
  return (
    <section id="about-me" className="about-me">
      <h3 className="about-me__section section">Студентка</h3>
      <div className="about-me__container">
        <div className="about-me__info">
          <h2 className="about-me__title">Галина</h2>
          <p className="about-me__subtitle">Фронтенд-разработчик, 65 лет</p>
          <p className="about-me__text">
            Я живу в городе Березники Пермского края. Последние 20 лет работала
            журналистом, сейчас на пенсии и решила исполнить давнее желание
            научиться самой создавать сайты. Рада, что онлайн-образование стало
            доступно и бабушке из провинции. Не жалею, что пошла на курс "Яндекс
            Практикума".
          </p>
          <div>
            <a
              className="about-me__link link"
              href="https://github.com/GalinaGuseva"
              target="_blank"
              rel="noopener noreferrer"
            >
              Github
            </a>
          </div>
        </div>
        <div className="about-me__photo-container">
          <img src={photo} alt="Моя фотография" className="about-me__photo" />
        </div>
      </div>
    </section>
  );
}
