import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./MoviesCard.css";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { formatDuration } from "../../utils/formatDuration";
import { MOVIES_URL } from "../../constants/constants";

export default function MoviesCard({ movie, savedMovies, isSaved, onDelete, onSave }) {
  const location = useLocation();
  const { image, nameRU, duration, trailerLink } = movie;
  const [saved, setSaved] = React.useState(isSaved);
  const { _id } = useContext(CurrentUserContext);
  const [isUrl, setUrl] = useState("");

  useEffect(() => {
    // окрашиваем кнопку, если фильм нашелся в сохраненных
    const isSaved = savedMovies.find((item) => item.movieId === movie.id);
    setSaved(isSaved);
  }, [movie, savedMovies]);

  const handleMovieCardClick = () => {
    window.open(trailerLink, "_blank");
  };

  const handleSaveOrDelete = (e) => {
    if (saved) {
      const { _id } = savedMovies.find((item) => item.movieId === movie.id);
      onDelete(_id);
    } else {
      onSave(movie, _id);
      setSaved(true);
    }
  };

  const handleDelete = (e) => {
    const { _id } = movie;
    onDelete(_id);
    setSaved(false);
  };

  useEffect(() => {
    const url =
      location.pathname === "/saved-movies" ? image : MOVIES_URL + image.url;
    setUrl(url);
  }, [image, location.pathname]);

  return (
    <li className="movies-card">
      <div className="movies-card__header">
        <div className="movies-card__description">
          <h2 className="movies-card__title">{nameRU}</h2>
          <p className="movies-card__duration">{formatDuration(duration)}</p>
        </div>

        {location.pathname === "/movies" && (
          <button type="button" aria-label={!saved ? 'Сохранить фильм' : 'Удалить из сохраненных'}
            onClick={handleSaveOrDelete}
            className={` ${
              saved
                ? "movies-card__saved icon link_button"
                : "movies-card__unsaved icon link_button"
            }`}
          />
        )}
        {location.pathname === "/saved-movies" && (
          <button
            className="movies-card__delete icon link_button"
            aria-label={'Удалить фильм из сохраненных'}
            onClick={handleDelete}
          ></button>
        )}
      </div>
      <div className="movies-card__film">
        <img className="movies-card__image" alt={nameRU} src={isUrl} onClick={handleMovieCardClick} />
      </div>
    </li>
  );
}
