import React from 'react';
import EnterForm from '../EnterForm/EnterForm';

export default function Login() {
  return (
    <EnterForm
      name="login"
      title="Рады видеть!"
      buttonTitle="Войти"
      bottomText="Ещё не зарегистрированы? "
      bottomLink="Регистрация"
    />
  );
}
