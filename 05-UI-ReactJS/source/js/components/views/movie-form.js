import React, { PropTypes } from "react";
import Movie from "../../movie.js";
import store from "../../store";
import { browserHistory } from 'react-router';

export default class MovieForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      movie: new Movie()
    };
  }

  render() {
    let mode;
    this.state.movie.id ? mode = "editing" : mode = "creating";
    return (
      <div className="movie-form">
        <h3>Movie Form</h3>
        <h5 className="mode">You are {mode} a movie.</h5>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="title" className="movie-label">
            Title:
            <input onChange={this.handleChange.bind(this, "title")} value={this.state.movie.title} className="movie-input" />
          </label>
          <label htmlFor="year" className="movie-label">
            Year:
            <input onChange={this.handleChange.bind(this, "year")} value={this.state.movie.year} className="movie-input" />
          </label>
          <label htmlFor="duration" className="movie-label">
            Duration:
            <input onChange={this.handleChange.bind(this, "duration")} value={this.state.movie.duration} className="movie-input" />
          </label>
          <div className="movie-buttons">
            <button type="submit" className="movie-button">Save movie</button>
          </div>
        </form>
      </div>
    );
  }

  componentDidMount() {
    if(this.props.params.movieId) {
      let movie = this.props.movies.find((movie) => {
        if(this.props.params.movieId === movie.id.toString()) {
          return movie;
        }
      });
      this.setState({
        movie
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.location.pathname === "/movie") {
      this.setState({
        movie: new Movie()
      });
    }
  }

  handleChange(key, event) {
    let movieState = this.state.movie;
    movieState[key] = event.target.value;
    this.setState(movieState);
  }

  handleSubmit(event) {
    event.preventDefault();
    let movie;
    if(!this.state.movie.id) {
      movie = this.state.movie;
      movie.id = Date.now();
      this.props.onSubmitAdd(this.state.movie);
    } else {
      this.props.onSubmitUpdate(this.state.movie);
    }
    browserHistory.push("/movies");
  }
}

MovieForm.propTypes = {
  movies: PropTypes.array.isRequired,
  onSubmitAdd: PropTypes.func.isRequired,
  onSubmitUpdate: PropTypes.func.isRequired
};
