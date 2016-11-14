import React from "react";
import Movie from "../../movie.js";
import { browserHistory } from 'react-router';

export default class MovieForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getInput = this.getInput.bind(this);
    this.state = {
      movie: new Movie()
    };
  }

  render() {
    let mode;
    mode = (this.state.movie.id) ? "editing" : "creating";
    return (
      <div className="movie-form">
        <h3>Movie Form</h3>
        <h5 className="mode">You are {mode} a movie.</h5>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="title" className="movie-label">
            Title:
            {this.getInput("title")}
          </label>
          <label htmlFor="year" className="movie-label">
            Year:
            {this.getInput("year")}
          </label>
          <label htmlFor="duration" className="movie-label">
            Duration:
            {this.getInput("duration")}
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

  getInput(key) {
    const props = {
      onChange: this.handleChange.bind(this, key),
      value: this.state.movie[key],
      className: "movie-input"
    }
    return <input {...props} />;
  }
}

MovieForm.propTypes = {
  movies: React.PropTypes.array.isRequired,
  onSubmitAdd: React.PropTypes.func.isRequired,
  onSubmitUpdate: React.PropTypes.func.isRequired
};
