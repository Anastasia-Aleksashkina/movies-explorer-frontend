import "./SearchForm.css";
import { useEffect, useState } from "react";
import { useFormWithValidation } from "../../hooks/useFormValidation";

function SearchForm({ searchMovies, searchThisQuery }) {
  const initialValues = {
    movie: '',
    filter: false,
  };

  const { values, isValid, handleChange, setValues, setIsValid } = useFormWithValidation(initialValues);

  const [isSearchError, setIsSearchError] = useState(false); // Состояние ошибки поиска 

  useEffect(() => {
    const searchQuery = searchThisQuery.load()

    setValues(searchQuery)
    if (searchQuery) setIsValid(true)
  }, [searchThisQuery, setIsValid, setValues]);

  // Обработка состояния чекбокса
  function handleCheckbox(e) {
    const newValues = { ...values, filter: e.target.checked }

    handleChange(e)
    searchMovies(newValues)
    searchThisQuery.save(newValues)
  }
  
  function handleSearchForm(e) {
    e.preventDefault()
    searchThisQuery.save(values)

    if (!isValid) {
      setIsSearchError(true)
    } else {
      setIsSearchError(false)
      searchMovies(values)
    }
  }

  return (
    <section className="search-form">
      <form className="search-form__form" onSubmit={handleSearchForm}>
        <div className="search-form__icon"></div>
        <input
          className="search-form__input"
          type="text"
          placeholder="Фильм"
          name="movie"
          onInput={handleChange}
          value={values.movie || ""}
          required
        />
        <span className="search-form__error">{isSearchError && 'Нужно ввести ключевое слово'}</span>
        <button className="search-form__button-text" type="submit">
          Найти
        </button>
        <div htmlFor="search-switch" className="search-form__switch">
          <input
            className="search-form__checkbox"
            type="checkbox"
            name="filter"
            checked={values.filter}
            onChange={handleCheckbox}
          />
          <label htmlFor="filter"></label>
          <span className="search-form__switch-text">Короткометражки</span>
        </div>
      </form>
    </section>
  );
}

export default SearchForm;
