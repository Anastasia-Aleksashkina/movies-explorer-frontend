import React from "react";
import { Link } from "react-router-dom";
import Logo from "../Logo/Logo";
import "./Header.css";
import { PAGES } from "../../utils/constants";
import Navigation from "../Navigation/Navigation";

function Header({ menuActive, onMenu }) { 
  return (
    <header className="header">
      <div className="header__container">
        {(window.location.pathname === PAGES.MOVIES ||
          window.location.pathname === PAGES.SAVMOVIES ||
          window.location.pathname === PAGES.PROFILE ||
          window.location.pathname === PAGES.MAIN) && <Logo />}
        {window.location.pathname === PAGES.MAIN && (
          <div className="header__auth-container">
            <Link className="header__button" to={PAGES.SIGNUP}>
              Регистрация
            </Link>
            <Link
              className="header__button header__button_green"
              to={PAGES.SIGNIN}
            >
              Войти
            </Link>
          </div>
        )}
        {/* {menuActive && (
          <>
            <div
              onClick={onMenu}
              className={`header__menu-container ${
                menuActive ? "header__menu-container_mobile" : ""
              }`}
            >
              <span
                className={`header__menu ${
                  menuActive ? "header__menu_active" : ""
                }`}
              />
            </div>
          </>
        )} */}
        {(window.location.pathname === PAGES.MOVIES ||
          window.location.pathname === PAGES.SAVMOVIES ||
          window.location.pathname === PAGES.PROFILE) && (
          <>
            <Navigation menuActive={menuActive} />
            <div
              onClick={onMenu}
              className={`header__menu-container ${
                menuActive ? "header__menu-container_mobile" : ""
              }`}
            >
              <span
                className={`header__menu ${
                  menuActive ? "header__menu_active" : ""
                }`}
              />
            </div>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
