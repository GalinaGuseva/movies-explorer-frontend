const filterMovies = (movies, query, isShort) => {
  const filteredMovies = movies.filter((item) => {
    return (
      (item?.nameRU
          ?.toLowerCase()
          .includes(query?.toLowerCase().trim()) ||
        item?.nameEN
          ?.toLowerCase()
          .includes(query?.toLowerCase().trim())) &&
      (isShort ? item.duration <= 40 : true)
    );
  });
  return filteredMovies;
}
export default filterMovies;
