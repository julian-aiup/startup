import React from "react";
import Movie from "./movie.js";

export default class MovieForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.state = {
      movie: new Movie()
    };
  }

  componentDidMount() {
    if(this.props.params) {
      let movie = JSON.parse(localStorage["movies"]).find((element) => {
        if(this.props.params.movieId === element.id.toString()) {
          return element;
        }
      });
      this.setState({
        // route components are rendered with useful information, like URL params
        movie: movie
      });
    }
  }

  render() {
    let mode;
    this.state.movie.id ? mode = "editing" : mode = "creating";
    return (
      <div className="movie-form">
        <h3>Movie</h3>
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
            <button type="button" onClick={this.handleReset} className="movie-button">Reset</button>
          </div>
        </form>
      </div>
    );
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      movie: nextProps.selectedMovie
    });
  }

  handleChange(key, event) {
    let movieState = this.state.movie;
    movieState[key] = event.target.value;
    this.setState(movieState);
  }

  handleSubmit(event) {
    event.preventDefault();
    if(this.props.onUserInput) {
      this.props.onUserInput(this.state.movie);
    }
    this.handleReset();
  }

  handleReset() {
    if(this.props.onReset && this.state.movie.id) {
      this.props.onReset();
    }
    this.setState({
      movie: new Movie()
    });
  }
}
