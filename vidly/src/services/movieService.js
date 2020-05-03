import http from "./httpService";

export function getMovies() {
  return http.get("http://localhost:3900/api/movies");
}

export function saveMovie(movie) {
  const body = { ...movie };
  delete body._id;
  body["genreId"] = movie["genre"]["_id"];
  delete body["genre"];

  if (movie._id) {
    return http.put("http://localhost:3900/api/movies/" + movie._id, body);
  }
  return http.post("http://localhost:3900/api/movies", body);
}

export function getMovie(id) {
  return http.get("http://localhost:3900/api/movies/" + id);
}

export function deleteMovie(movieId) {
  return http.delete("http://localhost:3900/api/movies/" + movieId);
}
