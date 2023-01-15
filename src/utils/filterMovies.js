export const filterShortMovies = (movies) => {
  return movies.filter((item) => item.duration <= 40);
};

export const filterMovies = (movies, search) => {
  const filteredMovies = movies.filter((item) => {
    return (
      (item.nameRU.toLowerCase().includes(search.toLowerCase()) ||
        item.nameEN.toLowerCase().includes(search.toLowerCase()))
    );
  });
  return filteredMovies;
}
