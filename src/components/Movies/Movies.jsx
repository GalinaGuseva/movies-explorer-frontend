import React, { useEffect, useState } from "react";
import "./Movies.css";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";
import * as mainApi from "../../utils/MainApi";
import { SCREEN_SIZE } from "../../constants/constants";

export default function Movies({
  savedMovies,
  setSavedMovies,
  foundMovies,
  isLoading,
  search,
  onClickCheckBox,
  isShort,
  handleChange,
  handleSubmit,
  error,
  filmError
}) {
  const [сountCards, setCountCards] = useState(null); // число карточек для отображения
  const [addCountCards, setAddCountCards] = useState(null); // число добавляемых карточек
  const [visibleMovies, setVisibleMovies] = useState([]); // фильмы, которые будут отображаться
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const { desktop, tablet, mobile } = SCREEN_SIZE;

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
    if (screenWidth > desktop.width) {
        setCountCards(desktop.cards);
        setAddCountCards(desktop.addCards);
    } else if (screenWidth <= desktop.width && screenWidth > desktop.mobile) {
        setCountCards(tablet.cards);
        setAddCountCards(tablet.addCards);
    } else {
      setCountCards(mobile.cards);
      setAddCountCards(mobile.addCards);
    }
  }, [screenWidth, desktop, tablet, mobile]);

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
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        isLoading={isLoading}
        search={search}
        errorText={error}
        isShort={isShort}
        onClickCheckBox={onClickCheckBox}
      />
      {isLoading ? (
        <Preloader />
      ) : filmError ? (
        <p className="movies__error">{filmError}</p>
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
