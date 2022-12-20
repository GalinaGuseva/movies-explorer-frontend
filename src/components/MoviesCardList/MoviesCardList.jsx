import React from 'react';
import { useLocation } from 'react-router-dom';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';

export default function MoviesCardList() {
  const location = useLocation();

  return (
    <section className="movies-list">
      <ul className="movies-list__cards">
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
      </ul>
      {location.pathname === '/movies' && (
        <button className="movies-list__button-more link_button"> Ещё</button>
      )}
    </section>
  );
}
