import MoviesCard from "../MoviesCard/MoviesCard";
import Preloader from "../Preloader/Preloader";
import "./MoviesCardList.css";
import { MESSAGES_ERROR } from "../../utils/constants";

function MoviesCardList({
  isLoading,
  showMovies,
  savedMovie,
  onLikeMovie,
  resStatus,
}) {
  return (
    <section className="movies-card-list">
      {isLoading ? (
        <Preloader />
      ) : !resStatus ? (
        <p className="movies-card-list__error-message">{MESSAGES_ERROR}</p>
      ) : (
        <>
          {showMovies.map((movie) => (
            <MoviesCard
              movie={movie}
              key={movie.id || movie._id}
              savedMovie={savedMovie}
              onLikeMovie={onLikeMovie}
            />
          ))}
        </>
      )}
    </section>
  );
}

export default MoviesCardList;
