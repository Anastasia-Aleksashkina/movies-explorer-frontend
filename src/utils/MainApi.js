export const BASE_URL = "https://api.aleksashkina.movies.nomoredomains.club/";
// export const BASE_URL = "http://localhost:3001/";

function request({ url, method = "POST", data, token }) {
  return fetch(`${BASE_URL}${url}`, {
    credentials: "include",
    mode: "cors",
    method: method,
    headers: {
      "Content-Type": "application/json",
      ...(!!token && { Authorization: `Bearer ${token}` }),
    },
    ...(!!data && { body: JSON.stringify(data) }),
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
}

// Регистрация
export const register = (name, email, password) => {
  return request({
    url: "signup",
    data: { name, email, password },
  });
};

// Авторизация
export const login = (email, password) => {
  return request({
    url: "signin",
    data: { email, password },
  });
};

// Получение данных пользователя
export const checkToken = () => {
  return request({
    url: "users/me",
    method: "GET",
  });
};

// Обновление данных пользователя
export const updateUser = (name, email) => {
  return request({
    url: "users/me",
    method: "PATCH",
    data: { name, email },
  });
};

// Деавторизация
export const logout = () => {
  return request({
    url: "signout",
    method: "DELETE",
  });
};

// Получение фильмов
export const getMovies = () => {
  return request({
    url: "movies",
    method: "GET",
  });
};

// Постановка лайка/сохранение фильма
const saveMovie = (movie) => {
  return request({
    url: "movies",
    data: {
      country: movie.country,
      director: movie.director,
      duration: movie.duration,
      year: movie.year,
      description: movie.description,
      image:
        movie.image instanceof Object
          ? `https://api.nomoreparties.co/${movie.image.url}`
          : movie.image,
      thumbnail:
        movie.image instanceof Object
          ? `https://api.nomoreparties.co/${movie.image.formats.thumbnail.url}`
          : movie.thumbnail,
      trailerLink: movie.trailerLink,
      movieId: movie.id,
      nameRU: movie.nameRU,
      nameEN: movie.nameEN,
    },
  });
};

// Удаление сохраненного фильма
const deleteSaveMovies = (id) => {
  return request({
    url: `movies/${id}`,
    method: "DELETE",
  });
};

export const changeLikeMovieStatus = (movie, isLiked) => {
  return !isLiked ? saveMovie(movie) : deleteSaveMovies(movie._id);
};
