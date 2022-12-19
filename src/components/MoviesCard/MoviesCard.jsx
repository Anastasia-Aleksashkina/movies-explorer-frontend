import "./MoviesCard.css";
import { PAGES } from "../../utils/constants";

function MoviesCard() {
  return (
    <>
      <ul className="movies-card">
        <img
          className="movies-card__img"
          src={require("../../images/img1.png")}
          alt="Постер"
        />
        <div className="movies-card__info">
          <p className="movies-card__name-film">33 слова о дизайне</p>
          {window.location.pathname === PAGES.MOVIES && (
            <button className="movies-card__like" type="button" />
          )}
          {window.location.pathname === PAGES.SAVMOVIES && (
            <button className="movies-card__delete" />
          )}
        </div>
        <p className="movies-card__film-duration">1ч 47м</p>
      </ul>
      <ul className="movies-card">
        <img
          className="movies-card__img"
          src={require("../../images/img2.png")}
          alt="Постер"
        />
        <div className="movies-card__info">
          <p className="movies-card__name-film">
            Киноальманах «100 лет дизайна»
          </p>
          {window.location.pathname === PAGES.MOVIES && (
            <button className="movies-card__like" type="button" />
          )}
          {window.location.pathname === PAGES.SAVMOVIES && (
            <button className="movies-card__delete" />
          )}
        </div>
        <p className="movies-card__film-duration">1ч 3м</p>
      </ul>
      <ul className="movies-card">
        <img
          className="movies-card__img"
          src={require("../../images/img3.png")}
          alt="Постер"
        />
        <div className="movies-card__info">
          <p className="movies-card__name-film">В погоне за Бенкси</p>
          {window.location.pathname === PAGES.MOVIES && (
            <button className="movies-card__like" type="button" />
          )}
          {window.location.pathname === PAGES.SAVMOVIES && (
            <button className="movies-card__delete" />
          )}
        </div>
        <p className="movies-card__film-duration">1ч 42м</p>
      </ul>
      <ul className="movies-card">
        <img
          className="movies-card__img"
          src={require("../../images/img4.png")}
          alt="Постер"
        />
        <div className="movies-card__info">
          <p className="movies-card__name-film">Баския: Взрыв реальности</p>
          {window.location.pathname === PAGES.MOVIES && (
            <button className="movies-card__like" type="button" />
          )}
          {window.location.pathname === PAGES.SAVMOVIES && (
            <button className="movies-card__delete" />
          )}
        </div>
        <p className="movies-card__film-duration">1ч 21м</p>
      </ul>
      <ul className="movies-card">
        <img
          className="movies-card__img"
          src={require("../../images/img5.png")}
          alt="Постер"
        />
        <div className="movies-card__info">
          <p className="movies-card__name-film">Бег это свобода</p>
          {window.location.pathname === PAGES.MOVIES && (
            <button
              className="movies-card__like movies-card__like_active"
              type="button"
            />
          )}
          {window.location.pathname === PAGES.SAVMOVIES && (
            <button className="movies-card__delete" />
          )}
        </div>
        <p className="movies-card__film-duration">1ч 44м</p>
      </ul>
    </>
  );
}

export default MoviesCard;
