import * as types from "../actions/action-types";

export function getMovie(movieId) {
  return {
    type: types.GET_MOVIE,
    movieId
  };
}

export function addMovie(movie) {
  return {
    type: types.ADD_MOVIE,
    movie
  }
}

export function updateMovie(movie) {
  return {
    type: types.UPDATE_MOVIE,
    movie
  }
}


export function deleteMovie(movieId) {
  return {
    type: types.DELETE_MOVIE,
    movieId
  };
}
