export const filterMovies = (
  movies,
  shortDuration,
  { movie: searchQuery, filter: isFilter }
) => {
  return movies.filter((movie) => {
    const isShortFilm = movie.duration <= shortDuration;
    const filmName = movie.nameRU.toLowerCase();
    const search = searchQuery.toLowerCase();

    return isFilter
      ? filmName.includes(search) && isShortFilm
      : filmName.includes(search);
  });
};
