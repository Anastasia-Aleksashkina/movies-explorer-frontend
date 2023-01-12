import './SearchForm.css';
import { useEffect, useState } from 'react';
import { PAGES } from '../../utils/constants';

function SearchForm({ location, formValues, searchMovies, searchSavedMovies }) {
  const [isInvalid, setIsInvalid] = useState(false);
  const [searchValue, setSearchValue] = useState(location.pathname === PAGES.MOVIES ? formValues.value : '');
  const [searchCheckbox, setCheckbox] = useState(location.pathname === PAGES.MOVIES ? formValues.checkbox : false);

  useEffect(() => {
    if (location.pathname === PAGES.MOVIES) {
      setSearchValue(formValues.value);
      setCheckbox(formValues.checkbox);
    }
  }, [formValues, location]);

  function handleSearchValue(e) {
    setSearchValue(e.target.value);
  }

  function handleSearchCheckbox(e) {
    setCheckbox(e.target.checked);
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (e.target[0].value === '' && location.pathname === PAGES.MOVIES) {
      console.log('0')
      setIsInvalid(true);
      return;
    }

    setIsInvalid(false);

    if (location.pathname === PAGES.SAVMOVIES) {
      searchSavedMovies(searchValue, searchCheckbox);
    } else {
      searchMovies(searchValue, searchCheckbox);
    }
  }

  return (
    <section className="search-form">
      <form className="search-form__form" onSubmit={handleSubmit}>
        <div className="search-form__icon" />
        <input
          className="search-form__input"
          type="text"
          placeholder='Фильм'
          name="search"
          value={searchValue}
          onChange={handleSearchValue}
        />
        <span className="search-form__error">{isInvalid && 'Нужно ввести ключевое слово'}</span>
        <button className="search-form__submit" type="submit">
          Найти
        </button>
        <label htmlFor="search-checkbox" className="search-form__label">
          <input
            className="search-form__checkbox"
            type="checkbox"
            name="checkbox"
            checked={searchCheckbox}
            onChange={handleSearchCheckbox}
            id="search-checkbox"
          />
          <span className="search-form__label-text">Короткометражки</span>
        </label>
      </form>
    </section>
  );
}

export default SearchForm;
