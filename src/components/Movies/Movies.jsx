import React, { useEffect, useState } from "react";
import "./Movies.css";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";
import * as mainApi from "../../utils/MainApi";

export default function Movies({
  savedMovies,
  setSavedMovies,
  foundMovies,
  isLoading,
  filter,
  setFilter,
  findMovies,
  error
}) {
  const [сountCards, setCountCards] = useState(null); // число карточек для отображения
  const [addCountCards, setAddCountCards] = useState(null); // число добавляемых карточек
  const [visibleMovies, setVisibleMovies] = useState([]); // фильмы, которые будут отображаться
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setTimeout(() => setScreenWidth(window.innerWidth), 500);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (screenWidth > 1024) {
        setCountCards(12);
        setAddCountCards(3);
    } else if (screenWidth <= 1024 && screenWidth > 500) {
        setCountCards(8);
        setAddCountCards(2);
    } else {
        setCountCards(5);
        setAddCountCards(1);
    }
  }, [screenWidth, foundMovies]);

  useEffect(() => {
    const newMovies = foundMovies.slice(0, сountCards);
    setVisibleMovies(newMovies);
  }, [сountCards, foundMovies]);

  const handleButtonMore = () => {
    setVisibleMovies(
      visibleMovies.concat(foundMovies.slice(visibleMovies.length, visibleMovies.length + addCountCards))
  );
  };

  const handleSaveMovie = (movie) => {
    mainApi
      .saveMovie(movie)
      .then((res) => {
        const newSavedMovies = [...savedMovies, res];
        setSavedMovies(newSavedMovies);
        localStorage.setItem("savedMovies", JSON.stringify(newSavedMovies));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDeleteMovie = (movieId) => {
    mainApi
      .deleteMovie(movieId)
      .then(() => {
        const filteredMovies = savedMovies.filter(
          (item) => item._id !== movieId
        );
        setSavedMovies(filteredMovies);
        localStorage.setItem("savedMovies", JSON.stringify(filteredMovies));
      })
      .catch((err) => console.log(err));
  };

  return (
    <section className="movies">
      <SearchForm
        handleSearch={findMovies}
        isLoading={isLoading}
        filter={filter}
        setFilter={setFilter}
      />
      {isLoading ? (
        <Preloader />
      ) : error ? (
        <p className="movies__error">{error}</p>
      ) : (
        <>
          <MoviesCardList
            movies={visibleMovies}
            handleButtonMore={handleButtonMore}
            onDeleteMovie={handleDeleteMovie}
            onSaveMovie={handleSaveMovie}
            savedMovies={savedMovies}
            visibleMovies={visibleMovies}
            foundMovies={foundMovies}
          />
        </>
      )}
    </section>
  );
}
