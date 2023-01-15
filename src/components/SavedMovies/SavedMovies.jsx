import React, { useState, useEffect } from "react";
import "./SavedMovies.css";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import * as mainApi from "../../utils/MainApi";
import { filterMovies, filterShortMovies } from "../../utils/filterMovies";
import { ERRORS } from "../../constants/constants";

export default function SavedMovies({ initMovies, setSavedMovies }) {
  const [filteredMovies, setFilteredMovies] = useState(initMovies);
  const [isShort, setIsShort] = useState(false);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  const checkShortSaved = (isShort) => setIsShort(isShort);

 const checkFilteredMovies = (initMovies, search, isShort) => {
     const newMovies = filterMovies(initMovies, search);
      const shortMovies = filterShortMovies(newMovies);
      const foundMovies = isShort ? shortMovies : newMovies;
      setFilteredMovies(foundMovies);
      if (foundMovies.length === 0) {
        setError(ERRORS.mov);
      } else setError("");
 }

 const searchInSavedMovies = (search) => {
  if (search.length && initMovies.length) {
      setSearch(search);
      checkFilteredMovies(initMovies, search, isShort);
      checkShortSaved(isShort);
    }
  };

  useEffect(() => {
   if (initMovies.length) {
      checkFilteredMovies(initMovies, search, isShort);
    }
  }, [initMovies, search, isShort]);

  const handleDeleteMovie = (movieId) => {
    mainApi
      .deleteMovie(movieId)
      .then(() => {
        const newSavedMovies = initMovies.filter((item) => item._id !== movieId);
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
        search={search}
        setSearch={setSearch}
        isShort={isShort}
        onClickCheckBox={checkShortSaved}
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
