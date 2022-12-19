import Footer from "../Footer/Footer";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import "./SavedMovies.css";

function SavedMovies() {
  return (
    <>
      <main className="main">
        <SearchForm />
        <MoviesCardList />
        <div className="saved-movies__interval"></div>
      </main>
      <Footer />
    </>
  );
}

export default SavedMovies;
