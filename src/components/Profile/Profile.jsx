import React, { useContext, useState, useEffect } from "react";
import "./Profile.css";
import { useFormWithValidation } from "../../utils/UseFormWithValidation";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { regExp } from "../../constants/RegExp";

export default function Profile({
  handleProfile,
  handleLogout,
  errorText,
  success,
}) {
  const inputs = { name: '', email: '' };
  const { values, setValues, handleChange, errors, setIsValid, isValid } = useFormWithValidation(inputs);
  const { name, email } = useContext(CurrentUserContext);
  const [isDisabled, setIsDisabled] = useState(true);
  useEffect(() => {
    setValues({ name, email });
    setIsValid(true);
  }, [name, email, setValues, setIsValid]);

  const handleSubmit = (e) => {
    e.preventDefault();
    handleProfile(values);
  };

  useEffect(() => {
    setIsDisabled((values.name === name && values.email === email) || !isValid)
}, [handleProfile, isValid, values, name, email]);

  return (
    <form name="profile" className="profile" onSubmit={handleSubmit} noValidate>
      <section className="profile__set">
        <h1 className="profile__title">Привет, {name}!</h1>
        <div className="profile__field">
          <label className="profile__text">Имя</label>
          <input
            id="profile-name"
            name="name"
            type="text"
            className="profile__input"
            placeholder="Имя"
            minLength="2"
            maxLength="30"
            onChange={handleChange}
            value={values.name || ''}
            pattern={regExp.name}
            required
          />
          <span className="profile__input-error">{errors.name}</span>
        </div>
        <div className="profile__field">
          <label className="profile__text">E-mail</label>
          <input
            id="profile__email"
            name="email"
            type="email"
            className="profile__input"
            placeholder="email"
            onChange={handleChange}
            value={values.email || ''}
            pattern={regExp.email}
            required
          />
          <span className="profile__input-error">{errors.email}</span>
        </div>
      </section>
      <div className="profile__bottom">
        {errorText && <span className="profile__error">{errorText}</span>}
        {success && <span className="profile__success">Данные профиля успешно обновлены</span>}
        <button
          type="submit"
          onClick={handleSubmit}
          disabled={isDisabled}
          className={
            isDisabled
            ? "profile__submit-btn profile__submit-btn_disabled"
            : "profile__submit-btn link"
          }
        >
          Редактировать
        </button>
        <button
          type="button"
          className="profile__button link"
          onClick={handleLogout}
        >
          Выйти из аккаунта
        </button>
      </div>
      </form>
  );
}
