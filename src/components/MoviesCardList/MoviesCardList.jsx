import MoviesCard from '../MoviesCard/MoviesCard';
import Preloader from '../Preloader/Preloader';
import './MoviesCardList.css';
import { MESSAGES_ERROR } from '../../utils/constants';

function MoviesCardList({ isLoading, displayMovies, savedMovies, onLikeMovie, resStatus, location }) {
  return (
    <section className="movies-card-list">
      {isLoading ? (
        <Preloader />
      ) : !resStatus ? (
        <p className="movies-card-list__error-message">{MESSAGES_ERROR}</p>
      ) : (
        <>
          {displayMovies.map((movie) => {
              return (
                <MoviesCard
                  location={location}
                  movie={movie}
                  key={movie.id || movie._id}
                  savedMovie={savedMovies}
                  onLikeMovie={onLikeMovie}
                />
              );
          })}
        </>
      )}
    </section>
  );
}

export default MoviesCardList;
