import { NavLink } from "react-router-dom";

import "./Navigation.css";

import { PAGES } from "../../utils/constants";

function Navigation({location, menuActive }) {
  return (
    <>
      {window.screen.width > 768 ? (
        <nav className="navigation">
          <div className="navigation__auth">
            <div className="navigation__movies">
              <NavLink
                className="navigation__link"
                activeClassName="navigation__link_active"
                to={PAGES.MOVIES}
              >
                Фильмы
              </NavLink>
              <NavLink
                className="navigation__link"
                activeClassName="navigation__link_active"
                to={PAGES.SAVMOVIES}
              >
                Сохранённые фильмы
              </NavLink>
            </div>
            <div className="navigation__profile">
              <NavLink
                className="navigation__link navigation__link_profile"
                activeClassName="navigation__link_active"
                to={PAGES.PROFILE}
              >
                Аккаунт
              </NavLink>
            </div>
          </div>
        </nav>
      ) : (
        <nav className={`navigation ${menuActive ? "navigation_active" : ""}`}>
          <div
            className={`navigation__auth ${
              menuActive ? "navigation__auth_active" : ""
            }`}
          >
            <div className="navigation__links">
              <NavLink className="navigation__link" to={PAGES.MAIN}>
                Главная
                {location.pathname === PAGES.MAIN && (
                  <span className="navigation__underline" />
                )}
              </NavLink>
              <NavLink className="navigation__link" to={PAGES.MOVIES}>
                Фильмы
                {location.pathname === PAGES.MOVIES && (
                  <span className="navigation__underline" />
                )}
              </NavLink>
              <NavLink className="navigation__link" to={PAGES.SAVMOVIES}>
                Сохранённые фильмы
                {location.pathname === PAGES.SAVMOVIES && (
                  <span className="navigation__underline" />
                )}
              </NavLink>
            </div>
            <div className="navigation__profile">
              <NavLink
                className="navigation__link navigation__link_profile"
                to={PAGES.PROFILE}
              >
                Аккаунт
              </NavLink>
            </div>
          </div>
        </nav>
      )}
    </>
  );
}

export default Navigation;
