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
import { api } from "../../utils/MoviesApi";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import LoacalStorage from "../../utils/LoacalStorage";
import { filterMovies } from "../../utils/filterMovies";

const newLocal = new LoacalStorage("movies");

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Проверка авторизации пользователяСостояние входа в профиль
  const [currentUser, setCurrentUser] = useState({}); // Данные текущего пользоволетя

  const [isLoading, setIsLoading] = useState(false); // Состояние загрузки данных с сервера
  const [allMovies, setAllMovies] = useState([]); // Полный список фильмов с сервера MoviesApi
  const [showMovies, setShowMovies] = useState([]); // Список отображаемых фильмов в movieCardList
  const [filtredMovies, setFiltredMovies] = useState([]); // Отфильтрованный список фильмов в Movies
  const [resStatus, setResStatus] = useState(true); // Статус ответа от сервера
  const [searchValues, setSearchValues] = useState(""); // Состояние значений поискового запроса

  const moviesLocal = newLocal;
  const searchThisQueryMoviesLocal = new LoacalStorage("search-query-movies", {
    movie: "",
    filter: false,
  });

  const [menuActive, setmenuActive] = useState(false); // Меню в мобильной версии
  const history = useHistory(); // Обработка маршрутов по url

  // Очистка LoacalStorage
  function clearLoacalStorage() {
    searchThisQueryMoviesLocal.delete();
    moviesLocal.delete();
  }

  // Запрос всех фильмов с сервера
  function getAllMovies() {
    setIsLoading(true);
    return api
      .getMovies()
      .then((movies) => {
        setAllMovies(movies);
        setIsLoading(false);
        setResStatus(true);
      })
      .catch(() => {
        setResStatus(false);
      });
  }

  // Поиск фильмов
  function searchMovies(values) {
    if (!allMovies.length) getAllMovies();
    setSearchValues(values);
    console.log(values);
  }

  // Фильтрация фильмов по короткометражкам
  useEffect(() => {
    if (allMovies?.length && searchValues) {
      const movies = filterMovies(allMovies, 40, searchValues);
      moviesLocal.save(movies);
      setFiltredMovies(movies);
    }
  }, [allMovies, moviesLocal, searchValues]);

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

  // Проверка токена, подстановка данных пользователя
  // Проверка наличия фильмов в LoacalStorage и добавление в стейт
  useEffect(() => {
    if (!isLoggedIn) return;

    // Получение данных пользователя
    function getUserInfo() {
      return MainApi.checkToken()
        .then((user) => {
          setIsLoggedIn(true);
          setCurrentUser(user);
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`);
        });
    }
    getUserInfo();
  }, [isLoggedIn, moviesLocal]);

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
        // Очищаем все стейты
        setIsLoggedIn(false);
        setCurrentUser({}); // Cтейт с данными пользователя
        clearLoacalStorage(); // Очищаем LoacalStorage
        setShowMovies([]);
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
              <Movies
                searchMovies={searchMovies}
                searchThisQueryMoviesLocal={searchThisQueryMoviesLocal}
                moviesLocal={moviesLocal}
                allMovies={allMovies}
                isLoading={isLoading}
                resStatus={resStatus}
                filtredMovies={filtredMovies}
                showMovies={showMovies}
                // savedMovie={savedMovie}
                // onLikeMovie={onLikeMovie}
                // onButtonMore={onButtonMore}
              />
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
