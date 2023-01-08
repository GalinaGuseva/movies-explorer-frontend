export const filterMovies = (movies, filter) => {
  const filteredMovies = movies.filter((item) => {
    const lowerCaseNameRU = item.nameRU?.toLowerCase() || "";
    const lowerCaseNameEN = item.nameEN?.toLowerCase() || "";
  return (
    (lowerCaseNameRU.includes(filter?.query?.toLowerCase()) ||
    lowerCaseNameEN.includes(filter?.query?.toLowerCase())) &&
    (filter.isShort ? item.duration <= 40 : true)
    )
  });
  return filteredMovies;
}
