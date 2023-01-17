import React, { useEffect, useState } from "react";
import "./Movies.css";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";
import * as mainApi from "../../utils/MainApi";
import { SCREEN_SIZE } from "../../constants/constants";
import filterMovies from "../../utils/filterMovies";
import { getMovies } from "../../utils/MoviesApi";
import { ERRORS } from "../../constants/constants";

export default function Movies({
  isLoggedIn,
  savedMovies,
  setSavedMovies,
}) {
  const [сountCards, setCountCards] = useState(null); // число карточек для отображения
  const [addCountCards, setAddCountCards] = useState(null); // число добавляемых карточек
  const [movies, setMovies] = useState([]); // фильмы, которые будут отображаться
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const { desktop, tablet, mobile } = SCREEN_SIZE;
  const [values, setValues] = useState({query: "", isShort: false});
  const [lastResult, setLastResult] = useState([]);
  const [foundMovies, setFoundMovies] = useState(lastResult || []);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleShort = (e) => setValues({ ...values, isShort: e.target.checked });

 const handleSearchChange = (value) => setValues({ ...values, query: value });

 useEffect(() => {
  if (localStorage.getItem("foundMovies")) {
    setFoundMovies(JSON.parse(localStorage.getItem("foundMovies")));
  }
  if (localStorage.getItem("values")) {
    setValues(localStorage.getItem("values"));
  }
  }, []);

  const resultList = (movies, query, isShort) => {
    const newMovies = filterMovies(movies, query, isShort);
    if (newMovies.length === 0) {
      setError(ERRORS.mov);
    } else {
      setError("");
      setFoundMovies(newMovies);
      setLastResult(newMovies);
      localStorage.setItem("foundMovies", JSON.stringify(newMovies));
    }
};

 const findMovies = () => {
  const movies = JSON.parse(localStorage.getItem("movies"));
  localStorage.setItem("values", JSON.stringify(values));
  setValues(values);
if (!movies || !movies.length) {
  setIsLoading(true);
  getMovies()
    .then(res => {
      localStorage.setItem("movies", JSON.stringify(res));
      const values = JSON.parse(localStorage.getItem("values"));
      const movies = JSON.parse(localStorage.getItem("movies"));
      resultList(movies, values.query, values.isShort);
    })
    .catch((err) => {
      setError(ERRORS.default);
      console.log(err);
    })
    .finally(() => {
      setIsLoading(false);
    });
  }  resultList(movies, values.query, values.isShort)
};

useEffect(() => {
  setFoundMovies(lastResult || []);
}, [lastResult]);

useEffect(() => {
  if (isLoggedIn) {
    const lastSearch = JSON.parse(localStorage.getItem("foundMovies"));
    if (lastSearch) setLastResult(lastSearch);
    const prevValues = JSON.parse(localStorage.getItem("values"));
    if (prevValues) setValues(prevValues);
  }
}, [isLoggedIn]);

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
    setMovies(newMovies);
  }, [сountCards, foundMovies]);

  const handleButtonMore = () => {
    setMovies(
      movies.concat(foundMovies.slice(movies.length, movies.length + addCountCards))
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
        value={values.query}
        isShort={values.isShort}
        onChange={handleSearchChange}
        onClickCheckBox={handleShort}
      />
      {isLoading ? (
        <Preloader />
      ) : error ? (
        <p className="movies__error">{error}</p>
      ) : (
        <>
          <MoviesCardList
            handleButtonMore={handleButtonMore}
            onDeleteMovie={handleDeleteMovie}
            onSaveMovie={handleSaveMovie}
            savedMovies={savedMovies}
            movies={movies}
            foundMovies={foundMovies}
          />
        </>
      )}
    </section>
  );
}
