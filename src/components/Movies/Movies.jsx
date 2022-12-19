import Footer from "../Footer/Footer";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import "./Movies.css";

function Movies() {
  return (
    <>
      <main className="main">
        <SearchForm />
        <MoviesCardList />
        <button className="movies__more-button" type="button">
          Ещё
        </button>
      </main>
      <Footer />
    </>
  );
}

export default Movies;
