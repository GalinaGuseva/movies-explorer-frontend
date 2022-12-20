import React from 'react';
import { useLocation } from 'react-router-dom';
import './MoviesCard.css';
import image from '../../images/3.jpg';

export default function MoviesCard() {
  const location = useLocation();
  const [isSaved, setSaved] = React.useState(false);

  function toggleIcon() {
    setSaved(!isSaved);
  }

  return (
    <li className="movies-card">
      <div className="movies-card__header">
        <div className="movies-card__description">
          <h2 className="movies-card__title">33 слова о дизайне</h2>
          <p className="movies-card__duration">1ч 47м</p>
        </div>

        {location.pathname === '/movies' && (
          <button
            onClick={toggleIcon}
            className={` ${
              isSaved
                ? 'movies-card__saved icon link_button'
                : 'movies-card__unsaved icon link_button'
            }`}
          />
        )}
        {location.pathname === '/saved-movies' && (
          <button className="movies-card__delete icon link_button"></button>
        )}
      </div>
      <div className="movies-card__film">
        <img className="movies-card__image" alt="Фильм" src={image} />
      </div>
    </li>
  );
}
