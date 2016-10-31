import React from 'react';
import ReactDOM from 'react-dom';
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
    if(this.state.movie.id) {
      mode = "editing";
    } else {
      mode = "creating";
    }
    return (
      <div>
        <h3>Movie</h3>
        <h5 id="mode">You are {mode} a movie.</h5>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="title" id="movie-title">
            Title:
            <input onChange={this.handleChange("title")} value={this.state.movie.title} id="movie-title-input" />
          </label>
          <label htmlFor="year" id="movie-year">
            Year:
            <input onChange={this.handleChange("year")} value={this.state.movie.year} id="movie-year-input" />
          </label>
          <label htmlFor="duration" id="movie-duration">
            Duration:
            <input onChange={this.handleChange("duration")} value={this.state.movie.duration} id="movie-duration-input" />
          </label>
          <button type="submit" id="movie-button-save">Save movie</button>
          <button type="button" onClick={this.handleReset} id="movie-button-reset">Reset</button>
        </form>
      </div>
    );
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      movie: nextProps.selectedMovie
    });
  }

  handleChange(key) {
    return function(event) {
      let movieState = this.state.movie;
      movieState[key] = event.target.value;
      this.setState(movieState);
    }.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.onUserInput(this.state.movie);
    this.handleReset();
  }

  handleReset() {
    this.setState({
      movie: new Movie()
    });
    this.props.onReset();
  }
}

export {MovieForm}
