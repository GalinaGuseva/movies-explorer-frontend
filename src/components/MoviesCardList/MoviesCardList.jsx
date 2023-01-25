import React from "react";
import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";
import { useLocation } from "react-router-dom";

export default function MoviesCardList({
  movies,
  foundMovies,
  handleButtonMore,
  onDeleteMovie,
  onSaveMovie,
  savedMovies
}) {
  const location = useLocation();

 return (
  <section className="movies-list">
  <ul className="movies-list__cards">
    {movies.map((item) => (
      <MoviesCard
        movie={item}
        key={item.id || item.movieId}
        onDelete={onDeleteMovie}
        onSave={onSaveMovie}
        savedMovies={savedMovies}
      />
    ))}
  </ul>
  {location.pathname === "/movies" && (movies.length < foundMovies.length) && (
    <button
      className="movies-list__button-more link_button" aria-label="Загрузить еще фильмы"
      onClick={handleButtonMore}
    >
      Ещё
    </button>
  )}
</section>
);
}
