const BASE_URL = process.env.NODE_ENV === 'production'
? "https://api.gal.nomoredomains.club"
: "http://localhost:3002";

const request = ({ url, method = "POST", data }) => {
  return fetch(`${BASE_URL}${url}`, {
    method: method,
    credentials: "include",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(new Error(`Ошибка ${res.status}`));
  });
};

export function register({ name, email, password }) {
  return request({
    url: "/signup",
    data: { name, email, password },
  });
}

export function login({ email, password }) {
  return request({
    url: "/signin",
    data: { email, password },
  });
}

export function logout() {
  return request({
    url: "/signout",
  });
}

export function getUser() {
  return request({
    url: "/users/me",
    method: "GET",
  });
}

export function updateUser({ name, email }) {
  return request({
    url: "/users/me",
    method: "PATCH",
    data: { name, email },
  });
}

export function getSavedMovies() {
  return request({
    url: "/movies",
    method: "GET",
  });
}

export function saveMovie(movie) {
  return request({
    url: "/movies",
    data: {
      country: movie.country || " ",
      director: movie.director || " ",
      duration: movie.duration || 0,
      year: movie.year || " ",
      description: movie.description || " ",
      image: "https://api.nomoreparties.co" + movie.image.url,
      trailerLink: movie.trailerLink,
      thumbnail:
        "https://api.nomoreparties.co" + movie.image.formats.thumbnail.url,
      movieId: movie.id,
      nameRU: movie.nameRU || " ",
      nameEN: movie.nameEN || " ",
    },
  });
}

export function deleteMovie(movieId) {
  return request({
    url: `/movies/${movieId}`,
    method: "DELETE",
  });
}
