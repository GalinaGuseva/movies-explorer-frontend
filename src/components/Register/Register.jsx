import React from 'react';
import EnterForm from '../EnterForm/EnterForm';

export default function Register() {
  return (
    <div className="register">
      <EnterForm
        name="register"
        title="Добро пожаловать!"
        buttonTitle="Зарегистрироваться"
        bottomText="Уже зарегистрированы? "
        bottomLink="Войти"
        children={
          <label className="enter-form__field">
            <span className="enter-form__label">Имя</span>
            <input
              name="nameInput"
              type="name"
              className="enter__input"
              placeholder="Ваше имя"
              minLength="2"
              maxLength="30"
              id="register-name"
              required
            />
          </label>
        }
      />
    </div>
  );
}
