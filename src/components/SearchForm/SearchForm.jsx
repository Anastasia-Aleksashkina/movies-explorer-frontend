import "./SearchForm.css";
import { useEffect, useState } from "react";
import { PAGES } from "../../utils/constants";

function SearchForm({ formValues, searchMovies, searchSavedMovies }) {
  const [isInvalid, setInvalid] = useState(false);
  const [searchValue, setSearchValue] = useState(
    window.location.pathname === PAGES.MOVIES ? formValues.value : ""
  );
  const [searchCheckbox, setCheckbox] = useState(
    window.location.pathname === PAGES.MOVIES ? formValues.checkbox : false
  );

  console.log(window.location.pathname === PAGES.MOVIES);

  useEffect(() => {
    if (window.location.pathname === PAGES.MOVIES) {
      console.log(formValues.value);
      console.log(formValues.checkbox);
      setSearchValue(formValues.value);
      setCheckbox(formValues.checkbox);
    }
  }, [formValues]);

  function handleSearchValue(e) {
    setSearchValue(e.target.value);
  }

  function handleSearchCheckbox(e) {
    setCheckbox(e.target.checked);
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (e.target[0].value === "" && window.location.pathname === PAGES.MOVIES) {
      setInvalid(true);
      return;
    }

    setInvalid(false);

    if (window.location.pathname === PAGES.SAVMOVIES) {
      searchSavedMovies(searchValue, searchCheckbox);
    } else {
      searchMovies(searchValue, searchCheckbox);
    }
  }

  return (
    <section className="search-form">
      <form className="search-form__form" onSubmit={handleSubmit}>
        <div className="search-form__icon"></div>
        <input
          className="search-form__input"
          type="text"
          placeholder="Фильм"
          name="search"
          value={searchValue}
          onChange={handleSearchValue}
          required
        />
        <span className="search-form__error">
          {isInvalid && "Нужно ввести ключевое слово"}
        </span>
        <button className="search-form__button-text" type="submit">
          Найти
        </button>
        <label htmlFor="search-switch" className="search-form__switch">
          <input
            className="search-form__checkbox"
            type="checkbox"
            name="checkbox"
            checked={searchCheckbox}
            onChange={handleSearchCheckbox}
            id="checkbox"
          />
          <span className="search-form__switch-text">Короткометражки</span>
        </label>
      </form>
    </section>
  );
}

export default SearchForm;
