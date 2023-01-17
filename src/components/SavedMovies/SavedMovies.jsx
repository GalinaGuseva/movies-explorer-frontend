import React, { useState, useEffect } from "react";
import "./SavedMovies.css";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import * as mainApi from "../../utils/MainApi";
import filterMovies from "../../utils/filterMovies";
import { ERRORS } from "../../constants/constants";

export default function SavedMovies({ savedMovies, setSavedMovies }) {
  const [values, setValues] = useState({query: "", isShort: false});
  const [error, setError] = useState("");
  const [filteredMovies, setFilteredMovies] = useState(savedMovies);

 const handleShort = (e) => setValues({ ...values, isShort: e.target.checked });

 const handleSearchChange = (value) => setValues({ ...values, query: value });

 const searchInSavedMovies = () => {
  if (savedMovies.length) {
   const foundMovies = filterMovies(savedMovies, values.query, values.isShort);
    if (foundMovies.length === 0) {
       setError(ERRORS.mov);
     } else {
       setError("");
       setFilteredMovies(foundMovies);
     }
   }
 };

 useEffect(() => {
   if (savedMovies.length) {
     const filteredMovies = filterMovies(savedMovies, values.query, values.isShort);
     setFilteredMovies(filteredMovies);
     if (filteredMovies.length === 0) {
       setError(ERRORS.mov);
     } else setError("");
   }
 }, [savedMovies, values.query, values.isShort]);

const handleDeleteMovie = (movieId) => {
  mainApi
    .deleteMovie(movieId)
    .then(() => {
      const newSavedMovies = savedMovies.filter((item) => item._id !== movieId);
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
        onChange={handleSearchChange}
        value={values.query}
        isShort={values.isShort}
        onClickCheckBox={handleShort}
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
