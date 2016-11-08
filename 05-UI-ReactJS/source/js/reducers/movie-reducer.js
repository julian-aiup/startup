import * as types from "../actions/action-types";

const initialState = {
  movies: JSON.parse(localStorage["movies"] || "[]")
};

export default (state = initialState, action) => {

  switch(action.type) {

    case types.ADD_MOVIE:
      return [
        ...state,
        action.movie
      ]

    case types.UPDATE_MOVIE:
      let newMovies = state.movies;
      let editMovie = movies.find(movie => {
        return movie.id === action.movie.id;
      });
      return Object.assign({}, state, { movies: newMovies });

    case types.DELETE_MOVIE:
      const newMovies = state.movies.filter(movie => {
        if(movie.id != action.movieId) {
          return movie
        }
      });
      return Object.assign({}, state, { movies: newMovies });

    default:
      return state;

  }
}
