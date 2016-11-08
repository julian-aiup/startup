import React from "react";
import { connect } from "react-redux";
import MovieForm from "../views/movie-list";
import { addMovie } from "../../actions/movie-actions.js"

const mapStateToProps = (state) => {
  return {
    movies: state.movieReducer.movies
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSubmit: (movie) => {
      dispatch(addMovie(movie));
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MovieForm);
