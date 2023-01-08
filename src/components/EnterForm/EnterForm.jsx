import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./EnterForm.css";
import Logo from "../Logo/Logo";
import { useFormWithValidation } from "../../utils/UseFormWithValidation";
import { regExp } from "../../constants/RegExp";

export default function EnterForm({
  name,
  path,
  title,
  buttonTitle,
  bottomText,
  bottomLink,
  link,
  onSubmit,
  errorText,
  success,
}) {
  const { values, handleChange, errors, isValid, resetForm } = useFormWithValidation({
    name: "",
    email: "",
    password: "",
  });

  const [isDisabled, setIsDisabled] = useState(true);

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(values);
  }

  useEffect(() => {
    if (path === "/signup") {
      setIsDisabled(
        !values.name || !values.email || !values.password || !isValid
      );
    } else {
      setIsDisabled(!values.email || !values.password || !isValid);
    }
  }, [handleChange, path, isValid, values]);

  useEffect(() => {
    resetForm();
  }, [resetForm]);

  return (
    <form
      name={name}
      className="enter-form"
      onSubmit={handleSubmit}
      noValidate
    >
      <div className="enter-form__logo">
        <Link to="/">
          <Logo />
        </Link>
      </div>
      <h2 className="enter-form__greeting">{title}</h2>
      <fieldset className="enter-form__set">
        {path === "/signup" ? (
          <label className="enter-form__field">
            <span className="enter-form__label">Имя</span>
            <input
              name="name"
              type="name"
              className="enter__input"
              placeholder="Ваше имя"
              minLength="2"
              maxLength="30"
              pattern={regExp.name}
              onChange={handleChange}
              value={values.name || ""}
              required
            />
            <span className="enter-form__input-error">{errors.name}</span>
          </label>
        ) : null}
        <label className="enter-form__field">
          <span className="enter-form__label">E-mail</span>
          <input
            value={values.email || ""}
            onChange={handleChange}
            name="email"
            type="email"
            className="enter__input"
            placeholder="pochta@yandex.ru"
            pattern={regExp.email}
            required
          />
          <span className="enter-form__input-error">{errors.email}</span>
        </label>
        <label className="enter-form__field">
          <span className="enter-form__label">Пароль</span>
          <input
            value={values.password || ""}
            onChange={handleChange}
            name="password"
            type="password"
            className="enter__input"
            placeholder="••••••••••"
            minLength="2"
            pattern={regExp.password}
            required
          />
          <span className="enter-form__input-error">{errors.password}</span>
        </label>
      </fieldset>
      <div className="enter-form__bottom">
        {errorText && <span className="enter-form__error">{errorText}</span>}
        {success && <span className="enter-form__success">Вы успешно авторизованы</span>}
        <button
          type="submit"
          className={
            isDisabled
              ? "enter__submit-btn link enter__submit-btn_disabled"
              : "enter__submit-btn link"
          }
          disabled={isDisabled}
        >
          {buttonTitle}
        </button>
        <p className="enter__text">
          {bottomText}
          <Link to={link} className="enter__link link">
            {bottomLink}
          </Link>
        </p>
      </div>
    </form>
  );
}
