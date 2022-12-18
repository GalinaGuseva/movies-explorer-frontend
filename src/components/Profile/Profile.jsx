import React from 'react';
import './Profile.css';

export default function Profile() {
  return (
    <form name="profile" className="profile" noValidate>
      <section className="profile__set">
        <h1 className="profile__title">Привет, userName!</h1>
        <div className="profile__field">
          <label className="profile__text">Имя</label>
          <input
            id="profile__name"
            name="name"
            type="text"
            className="profile__input"
            placeholder="Имя"
            minLength="2"
            required
          />
        </div>
        <div className="profile__field">
          <label className="profile__text">E-mail</label>
          <input
            id="profile__email"
            name="email"
            type="email"
            className="profile__input"
            placeholder="email"
            required
          />
        </div>
      </section>
      <div className="profile__bottom">
        <button type="submit" className="profile__submit-btn link">
          Редактировать
        </button>
        <button type="button" className="profile__button link">
          Выйти из аккаунта
        </button>
      </div>
    </form>
  );
}
