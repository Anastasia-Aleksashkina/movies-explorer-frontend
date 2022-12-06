import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import "./SavedMovies.css";

function SavedMovies() {
  return (
    <>
      <Header />
      <SearchForm />
      <MoviesCardList />
      <div className="saved-movies__interval"></div>
      <Footer />
    </>
  );
}

export default SavedMovies;
