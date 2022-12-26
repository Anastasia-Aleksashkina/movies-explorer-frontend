// export const BASE_URL = "https://api.aleksashkina.movies.nomoredomains.club";
export const BASE_URL = "http://localhost:3001/";

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
    method: "GET"
  });
};

// Обновление данных пользователя
export const updateUser = (name, email) => {
  return request({
    url: 'users/me',
    method: 'PATCH',
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
