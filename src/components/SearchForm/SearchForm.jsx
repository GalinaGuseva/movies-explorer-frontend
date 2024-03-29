import React, { useState } from "react";
import "./SearchForm.css";
import { regExp } from "../../constants/RegExp";
import { BUTTONMESSAGE } from "../../constants/constants";
import { ERRORS } from "../../constants/constants";

export default function SearchForm({ handleSearch, onChange, value, isShort, onClickCheckBox, isLoading }) {

  const [message, setMessage] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!value) {
      setError(ERRORS.search)
      setTimeout(() => setError(""), 2000);
      return
      } else {
      setError("");
      handleSearch();
    }
  };

  const handleChange = (e) => onChange(e.target.value);

  const handleMessage =() => {
     setMessage(BUTTONMESSAGE);
     setTimeout(() => setMessage(false), 2000);
  }
  return (
    <section className="search-form">
      <div className="search-form__container">
        <form className="search-form__form" onSubmit={handleSubmit}>
          <div className="search-form__wrapper">
             <span className="search-form__button icon link_button" onClick={handleMessage}/>
               <input
                 className={`search-form__input ${
                  isLoading ? "search-form__input_disabled" : ""
                }`}
                 type="text"
                 name="search"
                 minLength="1"
                 maxLength="70"
                 pattern={regExp.search}
                 placeholder="Фильм"
                 disabled={isLoading}
                 onChange={handleChange}
                 value={value}
                 required
               />
          </div>
          <button
            type="submit"
            aria-label="Кнопка поиска фильмов"
            className={`search-form__btn-submit link_button ${
              error || isLoading ? "search-form__btn-submit link_button_disabled" : ""
            }`}
            onClick={handleSubmit}
          ></button>
        </form>

        <label className={`search-form__shortfilms ${
          isLoading && "search-form__shortfilms_disabled"
        }`}>
          <input
            type="checkbox"
            className="search-form__checkbox"
            name="checkbox"
            checked={isShort}
            value={isShort}
            onChange={onClickCheckBox}
            disabled={isLoading}
          />
          <div className="search-form__pseudobox">
            <span className="search-form__box"></span>
          </div>
          <span className="search-form__text">Короткометражки</span>
        </label>
      </div>
      <label className="search-form__shortfilms_mobile">
        <input
          type="checkbox"
          className="search-form__checkbox"
          name="checkbox"
          checked={isShort}
          value={isShort}
          onChange={onClickCheckBox}
          disabled={isLoading}
        />
        <div className="search-form__pseudobox">
          <span className="search-form__box"></span>
        </div>
        <span className="search-form__text">Короткометражки</span>
      </label>
      <span className="search-form__input-error">{error}</span>
      <span className="search-form__message">{message}</span>
    </section>
  );
}
