import React from 'react';
import './SearchForm.css';

export default function SearchForm() {
  return (
    <section className="search-form">
      <div className="search-form__container">
        <span className="search-form__magnifier icon link_button" />
        <form className="search-form__form">
          <input
            className="search-form__input"
            id="search-form-input"
            type="text"
            name="search-form-input"
            minLength="2"
            placeholder="Фильм"
          />
          <button
            type="submit"
            className="search-form__button link_button"
          ></button>
        </form>

        <label className="search-form__shortfilms">
          <input type="checkbox" className="search-form__checkbox" />
          <div className="search-form__pseudobox">
            <span className="search-form__box"></span>
          </div>
          <span className="search-form__text">Короткометражки</span>
        </label>
      </div>
      <label className="search-form__shortfilms_mobile">
        <input type="checkbox" className="search-form__checkbox" />
        <div className="search-form__pseudobox">
          <span className="search-form__box"></span>
        </div>
        <span className="search-form__text">Короткометражки</span>
      </label>
    </section>
  );
}
