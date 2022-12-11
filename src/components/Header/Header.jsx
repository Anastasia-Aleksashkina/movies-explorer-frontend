import React from "react";
import { Link } from "react-router-dom";
import Logo from "../Logo/Logo";
import "./Header.css";
import { PAGES } from "../../utils/constants";
import Navigation from "../Navigation/Navigation";

function Header() {
  return (
    <header className="header">
      <div className="header__container">
        <Logo />
        {window.location.pathname === PAGES.MAIN && (
          <div className="header__auth-button">
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
        {(window.location.pathname === PAGES.MOVIES ||
          window.location.pathname === PAGES.SAVMOVIES ||
          window.location.pathname === PAGES.PROFILE) && <Navigation />}
      </div>
    </header>
  );
}

export default Header;
