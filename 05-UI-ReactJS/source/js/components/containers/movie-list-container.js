import React from "react";
import { connect } from "react-redux";
import MovieList from "../views/movie-list";
import { deleteMovie } from "../../actions/movie-actions.js"

const mapStateToProps = (state) => {
  return {
    movies: state.movieReducer.movies
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onDelete: (movieId) => {
      dispatch(deleteMovie(movieId));
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MovieList);
