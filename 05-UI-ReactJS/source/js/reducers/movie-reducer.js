import * as types from "../actions/action-types";

const initialState = {
  movies: JSON.parse(localStorage["movies"] || "[]")
};

export default (state = initialState, action) => {

  switch(action.type) {

    case types.ADD_MOVIE:
      let newMovies = state.movies.concat(action.movie);
      return Object.assign({}, state, { movies: newMovies });

    case types.UPDATE_MOVIE:
      let updateMovies = state.movies;
      let editMovie = updateMovies.find(movie => {
        return movie.id === action.movie.id;
      });
      return Object.assign({}, state, { movies: updateMovies });

    case types.DELETE_MOVIE:
      const deleteMovies = state.movies.filter(movie => {
        if(movie.id != action.movieId) {
          return movie
        }
      });
      return Object.assign({}, state, { movies: deleteMovies });

    default:
      return state;

  }
}
