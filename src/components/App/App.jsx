import React, { useState, useEffect } from "react";
import { Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import EnterForm from "../EnterForm/EnterForm";
import Menu from "../Menu/Menu";
import NotFound from "../NotFound/NotFound";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import * as mainApi from "../../utils/MainApi";
import { getMovies } from "../../utils/MoviesApi";
import { ERRORS } from "../../constants/constants";
import { filterMovies, filterShortMovies } from "../../utils/filterMovies";

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [errorText, setErrorText] = useState(false);
  const [searchError, setSearchError] = useState(false);
  const [filmError, setFilmError] = useState(false);
  const [success, setIsSuccess] = useState(false);
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [savedMovies, setSavedMovies] = useState([]);
  const [isShort, setIsShort] = useState(false);
  const [search, setSearch] = useState("");
  const [initMovies, setInitMovies] = useState([]);
  const [foundMovies, setFoundMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);


  const authCheck = () => {
    mainApi
      .getUser()
      .then((res) => {
        if (res) {
          setLoggedIn(true);
          setCurrentUser(res);
        }
      })
      .catch((err) => {
        console.log(err);
        setLoggedIn(false);
        localStorage.clear();
        setCurrentUser({});
      });
  };

  useEffect(() => {
    authCheck();
  }, []);

  const handleRegister = (data) => {
      mainApi
        .register(data)
        .then(() => handleLogin(data))
        .catch(err => {
          if (err === "Ошибка 409") {
            setErrorText(ERRORS.conf);
            setTimeout(() => setErrorText(false), 2000);
          } else {
            setErrorText(ERRORS.reg);
            setTimeout(() => setErrorText(false), 2000);
          }
          console.log(err);
        });
  };

  const handleLogin = (data) => {
      return mainApi
        .login(data)
        .then(() => {
          setIsSuccess(true);
          setTimeout(() => setIsSuccess(false), 2000);
          setTimeout(() => setLoggedIn(true), 2000);
        })
        .catch(err => {
          if (err === "Ошибка: 401") {
            setErrorText(ERRORS.err);
            setTimeout(() => setErrorText(false), 2000);
          } else {
            setErrorText(ERRORS.auth);
            setTimeout(() => setErrorText(false), 2000);
          }
          console.log(err);
        });
  };

  const handleSignOut = () => {
    mainApi
      .logout()
      .then(() => {
        setLoggedIn(false);
        localStorage.clear();
        setCurrentUser({});
        navigate("/");
      })
      .catch((err) => {
        setErrorText(true);
        console.log(err);
      })
  };

  function handleUpdateUser(data) {
      mainApi
        .updateUser(data)
        .then((res) => {
          setCurrentUser(res);
          setIsSuccess(true);
          setErrorText(false);
          setTimeout(() => setIsSuccess(false), 2000);
        })
        .catch(err => {
          if (err) {
            setErrorText(ERRORS.prof);
            setTimeout(() => setErrorText(false), 3000);
          }
          console.log(err);
        });
  };

  function toggleMenu() {
    setIsMenuOpen(!isMenuOpen);
  };

  const checkShortMovies = (isShort) => {
    setIsShort(isShort);
    localStorage.setItem("onlyShort", JSON.stringify(isShort));
};

  const checkSearch = (search) => {
    setSearch(search);
    localStorage.setItem("search", search);
};

const checkMovies = (movies) => {
  setInitMovies(movies);
  localStorage.setItem('movies', JSON.stringify(movies));
};

const checkFoundMovies = (initMovies, search, isShort) => {
  if (search) {
     const newMovies = filterMovies(initMovies, search);
     const shortMovies = filterShortMovies(newMovies);
     const filteredMovies = isShort ? shortMovies : newMovies;
     setFoundMovies(filteredMovies);
     localStorage.setItem("foundMovies", JSON.stringify(filteredMovies));
      if (filteredMovies.length === 0) {
        setFilmError(ERRORS.mov);
      } else {
        setFilmError("");
      }
    }
 };

  useEffect(() => {
    const movies = JSON.parse(localStorage.getItem("movies"));
    checkMovies(movies);
    checkFoundMovies(JSON.parse(localStorage.getItem("foundMovies")));
    if (search) {
    checkSearch(localStorage.getItem("search"));
  }
  if (isShort) {
    checkShortMovies(JSON.parse(localStorage.getItem("onlyShort")));
  }
    if (!movies || !movies.length) {
      setIsLoading(true);
      getMovies()
        .then(movies => {
          checkMovies(movies);
          checkFoundMovies(movies);
        })
        .catch((err) => {
          setErrorText(ERRORS.default);
          console.log(err);
        })
        .finally(() => {
          setIsLoading(false);
        });
      }
  }, [search, isShort]);

  const findMoviesSubmit = (e) => {
    e.preventDefault();
    if (!search) {
      setSearchError(ERRORS.search)
      setTimeout(() => setSearchError(""), 2000);
      return
    }
      checkFoundMovies(initMovies, search, isShort);
    };

  useEffect(() => {
    if (localStorage.getItem("savedMovies")) {
      setSavedMovies(JSON.parse(localStorage.getItem("savedMovies")));
    } else {
      mainApi
        .getSavedMovies()
        .then((res) => {
          setSavedMovies(res);
          localStorage.setItem("savedMovies", JSON.stringify(res));
        })
        .catch((err) => console.log(err));
    }
  }, [isLoggedIn]);

  useEffect(() => {
    if ((location.pathname === "/signup" || location.pathname === "/signin") && isLoggedIn) {
      navigate("/movies")};
  }, [ isLoggedIn, location.pathname, navigate]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
    <div className="App">
        <Header isLoggedIn={isLoggedIn} openMenu={toggleMenu} />
        <Menu isOpen={isMenuOpen} onClose={toggleMenu} />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/movies" element={<ProtectedRoute path="/movies" isLoggedIn={isLoggedIn}>
            <Movies
              isLoading={isLoading}
              search={search}
              isShort={isShort}
              onClickCheckBox={checkShortMovies}
              foundMovies={foundMovies}
              savedMovies={savedMovies}
              setSavedMovies={setSavedMovies}
              handleChange={checkSearch}
              handleSubmit={findMoviesSubmit}
              error={searchError}
              filmError={filmError}
            />
          </ProtectedRoute>} />

          <Route path="/saved-movies" element={<ProtectedRoute path="/saved-movies" isLoggedIn={isLoggedIn}>
            <SavedMovies
              initMovies={savedMovies}
              setSavedMovies={setSavedMovies}
            />
            </ProtectedRoute>} />
          <Route
            path="/profile"
            element={<ProtectedRoute isLoggedIn={isLoggedIn}>
              <Profile
                handleProfile={handleUpdateUser}
                errorText={errorText}
                success={success}
                handleLogout={handleSignOut}
              />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/signup"
            element={
              <EnterForm
                path={location.pathname}
                title="Добро пожаловать!"
                buttonTitle="Зарегистрироваться"
                bottomText="Уже зарегистрированы? "
                bottomLink="Войти"
                link="/signin"
                onSubmit={handleRegister}
                errorText={errorText}
                success={success}
              />
            }
          />
          <Route
            exact
            path="/signin"
            element={
              <EnterForm
                path={location.pathname}
                title="Рады видеть!"
                buttonTitle="Войти"
                bottomText="Ещё не зарегистрированы? "
                bottomLink="Регистрация"
                link="/signup"
                onSubmit={handleLogin}
                errorText={errorText}
                success={success}
              />
            }
          />
          <Route path="/*" element={<NotFound />} />
        </Routes>
        <Footer />
    </div>
    </CurrentUserContext.Provider>
  );
}
