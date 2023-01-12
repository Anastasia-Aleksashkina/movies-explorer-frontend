import { Route, Switch, useHistory, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Main from '../Main/Main';
import { PAGES, SORT_DURATION, DISPLAY_MOVIE } from '../../utils/constants';
import './App.css';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Header from '../Header/Header';
import NotFound from '../NotFound/NotFound';
import InfoTooltip from '../InfoTooltip/InfoTooltip';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import * as MainApi from '../../utils/MainApi';
import { api } from '../../utils/MoviesApi';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import LocalStorage from '../../utils/LocalStorage';

const moviesLocal = new LocalStorage('movies'); // Получаем массив всех фильмов из LocalStorage
const valueLocal = new LocalStorage('search-value'); // Получаем строку поиска из LocalStorage
const checkboxLocal = new LocalStorage('search-checkbox'); // Получаем состояние чебокса из LocalStorage

function App() {
  const location = useLocation();
  const history = useHistory(); // Обработка маршрутов по url
  const [menuActive, setmenuActive] = useState(false); // Меню в мобильной версии

  const [isLoggedIn, setIsLoggedIn] = useState(true); // Проверка авторизации пользователяСостояние входа в профиль
  const [currentUser, setCurrentUser] = useState({}); // Данные текущего пользоволетя

  const [allMovies, setAllMovies] = useState([]); // Полный список фильмов с MoviesApi
  const [filteredMovies, setFilteredMovies] = useState([]); // Отфильтрованный список фильмов в Movies
  const [savedMovies, setSavedMovies] = useState([]); // Список сохраненных фильмов
  const [savedFilteredMovies, setSavedFilteredMovies] = useState([]); // Отфильтрованный список фильмов в saved-movies
  const [displayMovies, setDisplayMovies] = useState([]); // Список отображаемых фильмов в movieCardList

  const [isLoading, setIsLoading] = useState(false); // Состояние загрузки данных с сервера
  const [isInfoTooltip, setIsInfoTooltip] = useState(false); // Попап с ответом
  const [resMessage, setResMessage] = useState(''); // Сообщение в попапе с ответом
  const [resStatus, setResStatus] = useState(true); // Статус ответа от сервера

  const [isSavedSearch, setIsSavedSearch] = useState(false); // Поиск в saved-movies

  const [stepDisplayMovies, setStepDisplayMovies] = useState(DISPLAY_MOVIE.FIRST_REQUEST.DESKTOP); // Количество отображаемых фильмов при клике на кнопку "Еще"

  const [formValues, setFormValues] = useState({
    // Значения поиска и фильтра по короткометражкам
    value: '',
    checkbox: '',
  });

  // Проверка токена, подстановка данных пользователя
  // Проверка наличия фильмов в LocalStorage и добавление в стейт
  useEffect(() => {
    if (moviesLocal) {
      setAllMovies(moviesLocal.load());
    }

    // Проверка наличия значений для поиска в LocalStorage добавление в форму
    if (valueLocal || checkboxLocal) {
      setFormValues({
        value: valueLocal.load(),
        checkbox: checkboxLocal.load(),
      });
    }

    // Проверка токена, подстановка данных пользователя
    function getContent() {
      return MainApi.checkToken()
        .then((user) => {
          setIsLoggedIn(true);
          setCurrentUser(user);
        })
        .catch((err) => {
          console.log(err);
          setIsLoggedIn(false);
          setCurrentUser({});
        });
    }

    getContent();
  }, []);

  // Подставляем данные из LocalStorage в поиск и производим его
  useEffect(() => {
    if (formValues.value && allMovies.length && location.pathname === PAGES.MOVIES) {
      handleSearchMovies(formValues.value, formValues.checkbox);
    }
    // eslint-disable-next-line
  }, [allMovies]);

  // Зашрузка сохраненных фильмов пользователя с сервера
  useEffect(() => {
    if (location.pathname === PAGES.SIGNIN || location.pathname === PAGES.SIGNUP) return;
    // Если пользователь залогинен и массив сохраненных фильмов пуст, выполняем запрос к API
    if (
      isLoggedIn &&
      !savedMovies.length &&
      (location.pathname === PAGES.MOVIES || location.pathname === PAGES.SAVMOVIES)
    ) {
      MainApi.getMovies()
        .then((movies) => {
          setSavedMovies(movies.reverse());
        })
        .catch((err) => console.log(err));
    }
  }, [isLoggedIn, savedMovies.length, location]);

  // Изменение количества отображаемых фильмов в зависимости от разрешения экрана
  useEffect(() => {
    if (location.pathname === PAGES.MOVIES) {
      window.addEventListener('resize', () => {
        setTimeout(() => {
          window.screen.width < 767
            ? setStepDisplayMovies(DISPLAY_MOVIE.FIRST_REQUEST.MOBILE)
            : window.screen.width > 1280
            ? setStepDisplayMovies(DISPLAY_MOVIE.FIRST_REQUEST.DESKTOP)
            : setStepDisplayMovies(DISPLAY_MOVIE.FIRST_REQUEST.TABLET);
        }, 3000);
      });
    } else {
      window.removeEventListener('resize', () => {});
    }
  }, [location]);

  // Изменение отображаемого списка фильмов в зависимости от локации и поисков
  useEffect(() => {
    setDisplayMovies(
      location.pathname === PAGES.MOVIES
        ? filteredMovies.slice(0, stepDisplayMovies)
        : isSavedSearch
        ? savedFilteredMovies
        : savedMovies
    );
  }, [filteredMovies, savedMovies, isSavedSearch, savedFilteredMovies, stepDisplayMovies, location]);

  // Фильтрация фильмов по значениям из инпута "Поиск" и фильтра по короткометражкам
  // Если в LocalStorage нет фильмов, получение их из movieApi
  function handleSearchMovies(value, checkbox) {
    setIsSavedSearch(false); // Поиск не на странице сохраненных фильмов

    // Устанавливаем в форму значения до получения даныых из LocalStorage
    setFormValues({
      value: value,
      checkbox: checkbox,
    });

    valueLocal.save(value);
    checkboxLocal.save(checkbox);

    function filter(movies) {
      // Изменяем количество добавляемых карточек с фильмами в зависимости от ширины экрана
      window.screen.width < 767
        ? setStepDisplayMovies(DISPLAY_MOVIE.FIRST_REQUEST.MOBILE)
        : window.screen.width > 1280
        ? setStepDisplayMovies(DISPLAY_MOVIE.FIRST_REQUEST.DESKTOP)
        : setStepDisplayMovies(DISPLAY_MOVIE.FIRST_REQUEST.TABLET);

      setFilteredMovies(
        movies.filter((i) => {
          if (checkbox) {
            return (
              // Фильтр для короткометражек
              i.nameRU.toLowerCase().includes(value.toLowerCase()) && i.duration <= SORT_DURATION
            );
          } else {
            return i.nameRU.toLowerCase().includes(value.toLowerCase()); // Фильтр для поля "Поиск"
          }
        })
      );
    }

    if (!allMovies.length) {
      setIsLoading(true);
      api
        .getMovies()
        .then((movies) => {
          setAllMovies(movies); // Сохраняем все фильмы в стейте и локальном хранилище
          moviesLocal.save(movies);
          filter(movies); // Фильтруем все фильмы
          setIsLoading(false);
          setResStatus(true);
        })
        .catch(() => {
          setResStatus(false);
          setIsInfoTooltip(true);
          setResMessage('Произошла ошибка запроса.');
        });
    } else {
      // фильтруем все фильмы
      filter(allMovies);
    }
  }

  // Фильтрация сохраненных фильмов по значениям из формы
  function handleSearchSavedMovies(value, checkbox) {
    setIsSavedSearch(true); // Поиск на странице с сохраненными фильмами

    // Отфильтрованные сохраненные фильмы
    const savedSearch = savedMovies.filter((i) => i.nameRU.toLowerCase().includes(value.toLowerCase()));

    // Отфильтрованные сохраненные короткометражные фильмы
    const savedShortSearch = savedMovies.filter(
      (i) => i.nameRU.toLowerCase().includes(value.toLowerCase()) && i.SORT_DURATION <= SORT_DURATION
    );

    if (savedSearch || savedShortSearch) {
      if (checkbox && savedShortSearch) {
        setSavedFilteredMovies([...savedShortSearch]); // Короткометражные сохраненные фильмы
      } else if (savedSearch) {
        setSavedFilteredMovies([...savedSearch]); // Cохраненные фильмы
      }
    }
  }

  // Установить/удалить лайк/фильм
  function handleMovieLike(movie) {
    const savedMovie = savedMovies.find((i) => i.movieId === movie.id || movie.movieId); // Фильм ищем в массиве с сохраненными фильмами

    return MainApi.changeLikeMovieStatus(
      savedMovie && location.pathname === PAGES.MOVIES ? savedMovie : movie,
      savedMovie
    )
      .then((req) => {
        if (!savedMovie) {
          setSavedMovies([req, ...savedMovies]); // Фильм не сохранен, добавляем в сохраненные
        } else if (location.pathname === PAGES.MOVIES) {
          setSavedMovies((state) => state.filter((c) => c.movieId !== movie.id)); // Фильм сохранён и находимся на странице movies - убираем лайк
        } else {
          setSavedMovies((state) => state.filter((c) => c.movieId !== movie.movieId)); // Фильм сохранен и находимся на странице saved-movies - удаляем фильм из сохраненных
        }
      })
      .catch(() => {
        setIsInfoTooltip(true);
        setResStatus(false);
        setResMessage('Произошла ошибка запроса.');
      });
  }

  // Обработчик кнопки "Ещё"
  function handleButtonMore() {
    // В зависимости от разрешения экрана добавляем разное количество фильмов
    const step =
      window.screen.width < 1280 ? DISPLAY_MOVIE.NEXT_REQUEST.TABLET_MOBILE : DISPLAY_MOVIE.NEXT_REQUEST.DESKTOP;
    // В стейт устанавливаем значение исходя из длинны массива и показываемых фильмов плюс шаг
    setStepDisplayMovies(displayMovies.length + step);
  }

  // Регистрация
  function handleRegister(name, email, password) {
    return MainApi.register(name, email, password)
      .then((data) => {
        if (!data) return
        setFormValues({
          value: '',
          checkbox: '',
        });
        handleLogin({ email, password });
        setIsLoggedIn(true);
      })
      .catch(() => {
        setIsLoggedIn(false);
        setIsInfoTooltip(true);
        setResStatus(false);
        setResMessage('Произошла ошибка запроса.');
      });
  }

  // Авторизация
  function handleLogin({ email, password }) {
    setIsLoggedIn(true);
    return MainApi.login(email, password)
      .then((data) => {
        if (!data) return;
        setFormValues({
          value: '',
          checkbox: '',
        });
        setCurrentUser(data); // Определяем данные пользователя
        setIsLoggedIn(true);
        setIsInfoTooltip(true);
        setResStatus(true);
        setResMessage('Вы успешно вошли.');
        history.push(PAGES.MOVIES);
      })
      .catch(() => {
        setCurrentUser({});
        setIsLoggedIn(false);
        setIsInfoTooltip(true);
        setResStatus(false);
        setResMessage('Произошла ошибка запроса.');
      });
  }

  // Редактирование данных пользователя
  function handleUpdateUser({ name, email }) {
    return MainApi.updateUser(name, email)
      .then((data) => {
        setCurrentUser(data);
        setIsInfoTooltip(true);
        setResStatus(true);
        setResMessage("Вы изменили данные профиля.");
      })
      .catch(() => {
        setIsInfoTooltip(true);
        setResStatus(false);
        setResMessage('Произошла ошибка запроса.');
      });
  }

  // Очистка LocalStorage
  function clearLocalStorage() {
    moviesLocal.delete();
    valueLocal.delete();
    checkboxLocal.delete();
  }

  // Деавторизация
  function handleLogout() {
    return MainApi.logout()
      .then((data) => {
        if (!data) return;
        // Очищаем все стейты
        setIsLoggedIn(false);
        setCurrentUser({}); // Cтейт с данными пользователя
        setAllMovies([]);
        setFilteredMovies([]);
        setSavedMovies([]);
        setSavedFilteredMovies([]);
        setDisplayMovies([]);
        setFormValues({
          value: '',
          checkbox: '',
        });
        clearLocalStorage(); // LocalStorage
        history.push(PAGES.MAIN);
      })
      .catch(() => {
        setIsLoggedIn(false);
        setIsInfoTooltip(true);
        setResStatus(false);
        setResMessage('Произошла ошибка запроса.');
      });
  }

  // Переключение кнопки меню в мобильной версии
  function handleMenu() {
    setmenuActive((active) => !active);
  }
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="app">
        <Header isLoggedIn={isLoggedIn} location={location} menuActive={menuActive} onMenu={handleMenu} />
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
                location={location}
                allMovies={allMovies}
                displayMovies={displayMovies}
                filteredMovies={filteredMovies}
                savedMovies={savedMovies}
                resStatus={resStatus}
                isLoading={isLoading}
                formValues={formValues}
                onSearchMovies={handleSearchMovies}
                onLikeMovie={handleMovieLike}
                onButtonMore={handleButtonMore}
              />
            </ProtectedRoute>
            <ProtectedRoute isLoggedIn={isLoggedIn} path={PAGES.SAVMOVIES} exact>
              <SavedMovies
                location={location}
                displayMovies={displayMovies}
                savedMovies={savedMovies}
                savedFilteredMovies={savedFilteredMovies}
                resStatus={resStatus}
                isSavedSearchMovies={isSavedSearch}
                formValues={formValues}
                handleSearchSavedMovies={handleSearchSavedMovies}
                onLikeMovie={handleMovieLike}
              />
            </ProtectedRoute>
            <ProtectedRoute isLoggedIn={isLoggedIn} path={PAGES.PROFILE} exact>
              <Profile onUpdateUser={handleUpdateUser} onLogout={handleLogout} />
            </ProtectedRoute>
            <Route path="*">
              <NotFound />
            </Route>
          </Switch>
        </main>
        <InfoTooltip
          isOpen={isInfoTooltip}
          onClose={() => {
            setIsInfoTooltip(false);
          }}
          resStatus={resStatus}
          resMessage={resMessage}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
