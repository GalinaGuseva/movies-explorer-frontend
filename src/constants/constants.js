export const MOVIES_URL = "https://api.nomoreparties.co/";

export const SCREEN_SIZE = {
  desktop: {
    width: 1024,
    cards: 12,
    addCards: 3,
    },
  tablet: {
    width: 501,
    cards: 8,
    addCards: 2,
  },
  mobile: {
    width: 500,
    cards: 5,
    addCards: 1,
  },
};

export const ERRORS = {
  reg: "При регистрации пользователя произошла ошибка",
  auth: "При авторизации произошла ошибка. Переданный токен некорректен.",
  err: "Вы ввели неправильный логин или пароль.",
  conf: "Пользователь с таким email уже существует.",
  prof: "При обновлении профиля произошла ошибка.",
  mov: "Ничего не найдено",
  search: "Нужно ввести ключевое слово",
  default: "Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз",
};

export const BUTTONMESSAGE = "Для поиска введите слово и нажмите синюю кнопку со стрелкой";
