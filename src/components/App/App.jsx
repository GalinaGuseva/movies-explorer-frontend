import React, { useState, useEffect } from "react";
import { Route, Routes, Navigate, useNavigate, useLocation } from 'react-router-dom';
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
import { ERRORS } from "../../constants/constants";

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [errorText, setErrorText] = useState(false);
  const [success, setIsSuccess] = useState(false);
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [savedMovies, setSavedMovies] = useState([]);

  useEffect(() => {
    authCheck();
  }, []);

  const authCheck = () => {
    mainApi
      .getUser()
      .then(res => {
        if (res.name) {
          setLoggedIn(true);
          localStorage.setItem("isLoggedIn", true);
          setCurrentUser({ name: res.name, email: res.email });
        }
      })
      .catch((err) => {
        console.log(err);
        setLoggedIn(false);
        setCurrentUser({});
        localStorage.clear();
      });
  };

  const handleRegister = (data) => {
      mainApi
        .register(data)
        .then(() => {
          handleLogin(data);
        })
        .catch((err) => {
          console.log(err);
          setErrorText(ERRORS.reg);
          setTimeout(() => setErrorText(false), 2000);
        });
  };

  const handleLogin = (data) => {
      return mainApi
        .login(data)
        .then(() => {
          setIsSuccess(true);
          setTimeout(() => setIsSuccess(false), 2000);
          setTimeout(() => authCheck(), 2000);
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
        setCurrentUser({ name: "", email: "" });
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
          <Route path="/movies" element={<ProtectedRoute isLoggedIn={ isLoggedIn }>
            <Movies
             isLoggedIn={ isLoggedIn }
              savedMovies={savedMovies}
              setSavedMovies={setSavedMovies}
            />
          </ProtectedRoute>} />

          <Route path="/saved-movies" element={<ProtectedRoute isLoggedIn={ isLoggedIn }>
            <SavedMovies
              isLoggedIn={ isLoggedIn }
              initMovies={savedMovies}
              setSavedMovies={setSavedMovies}
            />
            </ProtectedRoute>} />
          <Route
            path="/profile"
            element={<ProtectedRoute isLoggedIn={ isLoggedIn }>
              <Profile
                isLoggedIn={ isLoggedIn }
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
            element={ isLoggedIn ? <Navigate to='/movies' /> :
              <EnterForm
                isLoggedIn={ isLoggedIn }
                path={location.pathname}
                title="Добро пожаловать!"
                buttonTitle="Зарегистрироваться"
                bottomText="Уже зарегистрированы? "
                bottomLink="Войти"
                link="/signin"
                onSubmit={handleRegister}
                errorText={errorText}
                success={success}
                /> } />
          <Route
            exact
            path="/signin"
            element={ isLoggedIn ? <Navigate to='/movies' /> :
              <EnterForm
                isLoggedIn={ isLoggedIn }
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
