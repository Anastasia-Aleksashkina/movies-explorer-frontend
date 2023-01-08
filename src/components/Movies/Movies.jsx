import { PAGES } from "../../utils/constants";
import Footer from "../Footer/Footer";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import "./Movies.css";

function Movies({
  searchMovies,
  searchThisQueryMoviesLocal,
  allMovies,
  filtredMovies,
  isLoading,
  resStatus,
  showMovies,
  savedMovie,
  onLikeMovie,
  onButtonMore,
}) {
  return (
    <>
      <main className="main">
        <SearchForm
          searchMovies={searchMovies}
          searchThisQuery={searchThisQueryMoviesLocal}
        />
        {!allMovies.length
          ? ""
          : !filtredMovies.length && (
              <p className="movies__error-message">Ничего не найдено.</p>
            )}
        <MoviesCardList
          isLoading={isLoading}
          showMovies={showMovies}
          savedMovie={savedMovie}
          onLikeMovie={onLikeMovie}
          resStatus={resStatus}
        />
        {window.location.pathname === PAGES.MOVIES &&
          filtredMovies.length !== showMovies.length && (
            <button
              className="movies__more-button"
              type="button"
              onClick={onButtonMore}
            >
              Ещё
            </button>
          )}
      </main>
      <Footer />
    </>
  );
}

export default Movies;
