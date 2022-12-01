import React from "react";
import { Link } from "react-router-dom";
import Logo from "../Logo/Logo";
import "./Header.css";
import { PAGES } from "../../utils/constants";

function Header() {
  return (
    <header className="header">
      <div className="header__container">
        <Logo />
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
      </div>
    </header>
  );
}

export default Header;
