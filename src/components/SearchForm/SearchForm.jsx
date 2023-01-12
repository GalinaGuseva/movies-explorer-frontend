import React, { useState } from "react";
import "./SearchForm.css";
import { regExp } from "../../constants/RegExp";
import { BUTTONMESSAGE } from "../../constants/constants";

export default function SearchForm({ handleChange, handleSubmit, search, isShort, onClickCheckBox, isLoading, errorText }) {
  const [message, setMessage] = useState(false);

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
                 onChange={e => handleChange(e.target.value)}
                 value={search}
                 required
               />
          </div>
          <button
            type="submit"
            aria-label="Кнопка поиска фильмов"
            className={`search-form__btn-submit link_button ${
              errorText || isLoading ? "search-form__btn-submit link_button_disabled" : ""
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
            onChange={() => onClickCheckBox(!isShort)}
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
          onChange={() => onClickCheckBox(!isShort)}
          disabled={isLoading}
        />
        <div className="search-form__pseudobox">
          <span className="search-form__box"></span>
        </div>
        <span className="search-form__text">Короткометражки</span>
      </label>
      <span className="search-form__input-error">{errorText}</span>
      <span className="search-form__message">{message}</span>
    </section>
  );
}
