const baseUrl = "https://api.nomoreparties.co/beatfilm-movies";

export const getMovies = () => {
  return fetch(`${baseUrl}`, {}).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(new Error(`Ошибка ${res.status}`));
  });
};
