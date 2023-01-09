export const BASE_URL = "https://api.nomoreparties.co/";

export const PAGES = {
  SIGNIN: "/signin",
  SIGNUP: "/signup",
  MAIN: "/",
  MOVIES: "/movies",
  PROFILE: "/profile",
  SAVMOVIES: "/saved-movies",
};

export const VALIDATION_ATTRIBUTES = {
  REGEX: {
    NAME: /^[A-Za-zА-Яа-яЁё /s -]+$/i,
    EMAIL: /^\S+@\S+\.\S+$/i,
  },
  MESSAGES: {
    NAME: "Имя может состоять только из букв, пробелов и дефиса",
    EMAIL: "Неправильный формат e-mail",
  },
};

export const VALIDATION_CONFIG = {
  REGISTER_DATA: {
    INPUTS: ["name", "email"],
    REGEX: {
      name: VALIDATION_ATTRIBUTES.REGEX.NAME,
      email: VALIDATION_ATTRIBUTES.REGEX.EMAIL,
    },
    MESSAGES: {
      name: VALIDATION_ATTRIBUTES.MESSAGES.NAME,
      email: VALIDATION_ATTRIBUTES.MESSAGES.EMAIL,
    },
    LOGIN_DATA: {
      INPUTS: ["email"],
      REGEX: {
        email: VALIDATION_ATTRIBUTES.REGEX.EMAIL,
      },
      MESSAGES: {
        email: VALIDATION_ATTRIBUTES.MESSAGES.EMAIL,
      },
    },
  },
};

export const MESSAGES_ERROR =
  "Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз";

// Количество фильмов, добавляемых для отображения по клику на кнопку "Ещё"
export const DISPLAY_MOVIE = {
  DESKTOP: 3,
  TABLET_MOBILE: 2
};

export const SORT_DURATION = 40;