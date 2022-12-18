import React from 'react';
import { Link } from 'react-router-dom';
import './EnterForm.css';
import Logo from '../Logo/Logo';

export default function EnterForm(props) {
  return (
    <form name={props.name} className="enter-form" noValidate>
      <div className="enter-form__logo">
        <Link to="/">
          <Logo />
        </Link>
      </div>
      <h2 className="enter-form__greeting">{props.title}</h2>
      <fieldset className="enter-form__set">
        {props.children}
        <label className="enter-form__field">
          <span className="enter-form__label">E-mail</span>
          <input
            name="emailInput"
            type="email"
            className="enter__input"
            placeholder="pochta@yandex.ru"
            required
          />
        </label>
        <label className="enter-form__field">
          <span className="enter-form__label">Пароль</span>
          <input
            name="passwordInput"
            type="password"
            className="enter__input"
            placeholder="••••••••••"
            minLength="2"
            required
          />
        </label>
        <span className="enter-form__error"></span>
        <span className="enter-form__error_server"></span>
      </fieldset>
      <div className="enter-form__bottom">
        <button type="submit" className="enter__submit-btn link">
          {props.buttonTitle}
        </button>
        <p className="enter__text">
          {props.bottomText}
          <Link to="/signin" className="enter__link link">
            {props.bottomLink}
          </Link>
        </p>
      </div>
    </form>
  );
}
