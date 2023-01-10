import Footer from "../Footer/Footer";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import "./SavedMovies.css";

function SavedMovies({
  displayMovies,
  savedMovies,
  savedFilteredMovies,
  resStatus,
  isSavedSearchMovies,
  formValues,
  handleSearchSavedMovies,
  onLikeMovie,
}) {
  return (
    <>
      <main className="main">
        <SearchForm
          searchSavedMovies={handleSearchSavedMovies}
          formValues={formValues}
        />
        {!savedMovies.length
          ? ""
          : !savedFilteredMovies.length &&
            isSavedSearchMovies && (
              <p className="saved-movies__error-message">
                Нет сохраненных фильмов.
              </p>
            )}
        <MoviesCardList
          displayMovies={displayMovies}
          savedMovies={savedMovies}
          savedFilteredMovies={savedFilteredMovies}
          onLikeMovie={onLikeMovie}
          resStatus={resStatus}
        />
        <div className="saved-movies__interval"></div>
      </main>
      <Footer />
    </>
  );
}

export default SavedMovies;
