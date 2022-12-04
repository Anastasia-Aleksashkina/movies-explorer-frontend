import "./SearchForm.css";

function SearchForm() {
  return (
    <section className="search-form">
      <form className="search-form__form" noValidate>
        <div className="search-form__icon"></div>
        <input
          className="search-form__input"
          type="text"
          placeholder="Фильм"
          name="film"
          required
        />
        <button className="search-form__button-text" type="submit">
          Найти
        </button>
        <div htmlFor="search-switch" className="search-form__switch">
          <input
            className="search-form__checkbox"
            type="checkbox"
            name="filter"
            id="filter"
          />
          <label htmlFor="filter"></label>
          <span className="search-form__switch-text">Короткометражки</span>
        </div>
      </form>
    </section>
  );
}

export default SearchForm;
