import { Route, Switch, useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import Main from "../Main/Main";
import { PAGES } from "../../utils/constants";
import "./App.css";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import Register from "../Register/Register";
import Login from "../Login/Login";
import Header from "../Header/Header";
import NotFound from "../NotFound/NotFound";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import * as MainApi from "../../utils/MainApi";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
// import { MoviesApi } from "../../utils/MoviesApi";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Проверка авторизации пользователяСостояние входа в профиль
  const [currentUser, setCurrentUser] = useState({}); // Данные текущего пользоволетя
  const [menuActive, setmenuActive] = useState(false); // Меню в мобильной версии
  const history = useHistory(); // Обработка маршрутов по url

  // Регистрация
  function handleRegister(name, email, password) {
    return MainApi.register(name, email, password)
      .then(() => {
        handleLogin(email, password);
        setIsLoggedIn(true);
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }

  // Авторизация
  function handleLogin({ email, password }) {
    return MainApi.login(email, password)
      .then((data) => {
        if (!data) return;
        setCurrentUser(data); // Определяем данные пользователя
        history.push(PAGES.MOVIES);
        setIsLoggedIn(true);
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }

  useEffect(() => {
    if (!isLoggedIn) return;
    // Получение данных пользователя
    function getUserInfo() {
      return MainApi.checkToken()
        .then((data) => {
          setIsLoggedIn(true);
          setCurrentUser(data);
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`);
        });
    }
    getUserInfo();
  }, [isLoggedIn]);

  // Обновление данных пользователя
  function handleUpdateUser({ name, email }) {
    return MainApi.updateUser(name, email)
      .then((data) => {
        setCurrentUser(data);
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }

  // Деавторизация
  function handleLogout() {
    return MainApi.logout()
      .then((data) => {
        if (!data) return;
        setIsLoggedIn(false);
        setCurrentUser({}); // Очищаем стейт с данными пользователя
        history.push(PAGES.MAIN);
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }

  // Переключение кнопки меню в мобильной версии
  function handleMenu() {
    setmenuActive((active) => !active);
  }
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="app">
        <Header menuActive={menuActive} onMenu={handleMenu} />
        <main className="content">
          <Switch>
            <Route path={PAGES.MAIN} exact>
              <Main />
            </Route>
            <Route path={PAGES.SIGNUP} exact>
              <Register onRegister={handleRegister} />
            </Route>
            <Route path={PAGES.SIGNIN} exact>
              <Login onLogin={handleLogin} />
            </Route>
            <ProtectedRoute isLoggedIn={isLoggedIn} path={PAGES.MOVIES} exact>
              <Movies />
            </ProtectedRoute>
            <ProtectedRoute
              isLoggedIn={isLoggedIn}
              path={PAGES.SAVMOVIES}
              exact
            >
              <SavedMovies />
            </ProtectedRoute>
            <ProtectedRoute isLoggedIn={isLoggedIn} path={PAGES.PROFILE} exact>
              <Profile
                onUpdateUser={handleUpdateUser}
                onLogout={handleLogout}
              />
            </ProtectedRoute>
            <Route path="*">
              <NotFound />
            </Route>
          </Switch>
        </main>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
