import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../Logo/Logo';
import './Header.css';
import { PAGES } from '../../utils/constants';
import Navigation from '../Navigation/Navigation';

function Header({ isLoggedIn, location, menuActive, onMenu }) {
  const authUrls = ['/signin', '/signup'];

  return (
    <header className="header">
      <div className="header__container">
        {(location.pathname === PAGES.MOVIES ||
          location.pathname === PAGES.SAVMOVIES ||
          location.pathname === PAGES.PROFILE ||
          location.pathname === PAGES.MAIN) && <Logo />}
        {!isLoggedIn ? (
          <>
            {!authUrls.includes(location.pathname) && (
              <div className="header__auth-container">
                <Link className="header__button" to={PAGES.SIGNUP}>
                  Регистрация
                </Link>
                <Link className="header__button header__button_green" to={PAGES.SIGNIN}>
                  Войти
                </Link>
              </div>
            )}
          </>
        ) : (
          <>
            <Navigation location={location} menuActive={menuActive} />
            <div
              onClick={onMenu}
              className={`header__menu-container ${menuActive ? 'header__menu-container_mobile' : ''}`}
            >
              <span className={`header__menu ${menuActive ? 'header__menu_active' : ''}`} />
            </div>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
