import React from 'react';
import {Movie} from './movie.js';

class MovieForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.state = {
      movie: new Movie()
    };
  }

  render() {
    let mode;
    this.state.movie.id ? mode = "editing" : mode = "creating";
    return (
      <div>
        <h3>Movie</h3>
        <h5 className="mode">You are {mode} a movie.</h5>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="title" className="movie-title">
            Title:
            <input onChange={this.handleChange.bind(this, "title")} value={this.state.movie.title} className="movie-title-input" />
          </label>
          <label htmlFor="year" className="movie-year">
            Year:
            <input onChange={this.handleChange.bind(this, "year")} value={this.state.movie.year} className="movie-year-input" />
          </label>
          <label htmlFor="duration" className="movie-duration">
            Duration:
            <input onChange={this.handleChange.bind(this, "duration")} value={this.state.movie.duration} className="movie-duration-input" />
          </label>
          <button type="submit" className="movie-button-save">Save movie</button>
          <button type="button" onClick={this.handleReset} className="movie-button-reset">Reset</button>
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
    this.props.onUserInput(this.state.movie);
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

export {MovieForm}
