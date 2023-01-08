import React, { useState } from "react";
import "./SearchForm.css";
import { regExp } from "../../constants/RegExp";
import { buttonMessage } from "../../constants/constants";
import { valMessages } from "../../constants/valMessages";

export default function SearchForm({ handleSearch, filter, setFilter, isLoading }) {
  const [message, setMessage] = useState(false);
  const [errorText, setErrorText] = useState("");
  const [values, setValues] = useState(filter);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!values.query) {
      setErrorText(valMessages.search);
      setTimeout(() => setErrorText(""), 3000);
    } else {
      setErrorText("");
      handleSearch(values);
      setFilter(values);
    }
  };

  const handleChange = (e) => {
    setValues({...values, query: e.target.value });
  };

  const onClickCheckBox = (e) => {
    setValues({...values, isShort: e.target.checked});
    setFilter({...values, isShort: e.target.checked});
  };

  const handleMessage =() => {
     setMessage(buttonMessage);
     setTimeout(() => setMessage(false), 2000);
   }

  return (
    <section className="search-form">
      <div className="search-form__container">
        <form className="search-form__form" onSubmit={handleSubmit}>
          <div className="search-form__wrapper">
             <span className="search-form__button icon link_button" onClick={handleMessage}/>
               <input
                 className="search-form__input"
                 type="text"
                 name="query"
                 minLength="1"
                 maxLength="70"
                 pattern={regExp.search}
                 placeholder="Фильм"
                 onChange={handleChange}
                 value={values.query}
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

        <label className="search-form__shortfilms">
          <input
            type="checkbox"
            className="search-form__checkbox"
            name="checkbox"
            checked={values.isShort}
            onChange={onClickCheckBox}
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
          checked={values.isShort}
          onChange={onClickCheckBox}
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
