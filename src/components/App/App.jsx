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
import { filterMovies } from "../../utils/filterMovies";
import { errorMessages } from "../../constants/constants";

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [errorText, setErrorText] = useState(false);
  const [success, setIsSuccess] = useState(false);
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [initialMovies, setInitialMovies] = useState([]);
  const [foundMovies, setFoundMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filter, setFilter] = useState({ query: "", isShort: false });

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
        .then(() => {
            setIsSuccess(true);
            setTimeout(() => setIsSuccess(false), 1000);
            handleLogin(data)
         })
         .catch(err => {
          if (err === "Ошибка 409") {
            setErrorText(errorMessages.conf);
            setTimeout(() => setErrorText(false), 2000);
          } else {
            setErrorText(errorMessages.reg);
            setTimeout(() => setErrorText(false), 2000);
          }
          console.log(err);
        });
  };

  const handleLogin = (data) => {
      return mainApi
        .login(data)
        .then(() => {
          setInitialMovies([]);
          setFoundMovies([]);
          setFilter({ query: "", isShort: false });
          setIsSuccess(true);
          setTimeout(() => setIsSuccess(false), 2000);
          setLoggedIn(true);
          authCheck();
          setTimeout(() => navigate("/movies"), 2000);
        })
        .catch(err => {
          if (err === "Ошибка: 401") {
            setErrorText(errorMessages.err);
            setTimeout(() => setErrorText(false), 2000);
          } else {
            setErrorText(errorMessages.auth);
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
            setErrorText(errorMessages.prof);
            setTimeout(() => setErrorText(false), 3000);
          }
          console.log(err);
        });
  };

    function toggleMenu() {
    setIsMenuOpen(!isMenuOpen);
  }

  useEffect(() => {
    if (initialMovies.length && isLoggedIn) {
      const filteredMovies = filterMovies(initialMovies, filter);
      setFoundMovies(filteredMovies);
      localStorage.setItem("foundMovies", JSON.stringify(filteredMovies));
      if (filteredMovies.length === 0) {
        setErrorText(errorMessages.mov);
      } else setErrorText("");
    }
  }, [initialMovies, filter, isLoggedIn]);

  useEffect(() => {
    if (localStorage.getItem("foundMovies")) {
      setFoundMovies(JSON.parse(localStorage.getItem("foundMovies")));
    }
    if (localStorage.getItem("filter")) {
      setFilter(JSON.parse(localStorage.getItem("filter")));
    }
  }, [isLoggedIn]);


  const findMovies = (req) => {
    if (!initialMovies.length) {
      setIsLoading(true);
      getMovies()
        .then((res) => {
          setInitialMovies(res);
          localStorage.setItem("movies", JSON.stringify(res));
        })
        .catch((err) => {
          setErrorText(errorMessages.default);
          console.log(err);
        })
        .finally(() => {
          setIsLoading(false);
        });
      }
      setFilter(req);
         localStorage.setItem("filter", JSON.stringify(req));
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
              filter={filter}
              setFilter={setFilter}
              findMovies={findMovies}
              foundMovies={foundMovies}
              savedMovies={savedMovies}
              setSavedMovies={setSavedMovies}
              error={errorText}
            />
          </ProtectedRoute>} />

          <Route path="/saved-movies" element={<ProtectedRoute path="/saved-movies" isLoggedIn={isLoggedIn}>
            <SavedMovies
              initialMovies={savedMovies}
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
