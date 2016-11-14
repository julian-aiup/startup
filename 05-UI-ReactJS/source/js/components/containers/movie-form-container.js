import React from "react";
import { connect } from "react-redux";
import MovieForm from "../views/movie-form";
import { addMovie, updateMovie } from "../../actions/movie-actions.js"
import { bindActionCreators } from "redux";

const mapStateToProps = (state) => {
  return {
    movies: state.movieReducer.movies
  };
}

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({
    onSubmitAdd: addMovie,
    onSubmitUpdate: updateMovie
  }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MovieForm);
