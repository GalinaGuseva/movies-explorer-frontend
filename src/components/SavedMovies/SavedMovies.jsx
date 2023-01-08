import React, { useState, useEffect } from "react";
import "./SavedMovies.css";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import * as mainApi from "../../utils/MainApi";
import { filterMovies } from "../../utils/filterMovies";
import { errorMessages } from "../../constants/constants";

export default function SavedMovies({ initialMovies, setSavedMovies }) {
  const [filteredMovies, setFilteredMovies] = useState(initialMovies);
  const [filter, setFilter] = useState({ query: "", isShort: false });
  const [error, setError] = useState("");

  const searchInSavedMovies = (filter) => {
    if (initialMovies.length) {
      const filteredMovies = filterMovies(initialMovies, filter);
      setFilteredMovies(filteredMovies);
      if (filteredMovies.length === 0) {
        setError(errorMessages.mov);
      } else setError("");
    }  setFilter(filter);
  };

  useEffect(() => {
    if (initialMovies.length) {
      const filteredMovies = filterMovies(initialMovies, filter);
      setFilteredMovies(filteredMovies);
      if (filteredMovies.length === 0) {
        setError(errorMessages.mov);
      } else setError("");
    }
  }, [initialMovies, filter]);

  const handleDeleteMovie = (movieId) => {
    mainApi
      .deleteMovie(movieId)
      .then(() => {
        const newSavedMovies = initialMovies.filter((item) => item._id !== movieId);
        const newFilteredMovies = filteredMovies.filter(
          (item) => item._id !== movieId
        );
        setSavedMovies(newSavedMovies);
        setFilteredMovies(newFilteredMovies);
        localStorage.setItem("savedMovies", JSON.stringify(newSavedMovies));
      })
      .catch((err) => console.log(err));
  };

  return (
    <section className="saved-movies">
      <SearchForm
        handleSearch={searchInSavedMovies}
        filter={filter}
        setFilter={setFilter}
      />
       {error && <p className="saved-movies__error">{error}</p>}
        <MoviesCardList
            movies={filteredMovies}
            onDeleteMovie={handleDeleteMovie}
            savedMovies={filteredMovies}
            />
    </section>
  );
};
