import React from 'react';
import ReactDOM from 'react-dom';

class Movie {
  constructor(title, year, duration) {
    this.title = title;
    this.year = year;
    this.duration = duration;
  }

  getData() {
    return "Movie " + this.title + " from " + this.year + ". Duration: " + this.duration + ".";
  }
}

class MovieCreate extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = { title: '', year: '', duration: '' };
  }

  render() {
    return (
      <div>
        <h3>Movie</h3>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="title" id="movie-title">
            Title:
            <input onChange={this.handleChange("title")} value={this.state.title} id="movie-title-input" />
          </label>
          <label htmlFor="year" id="movie-year">
            Year:
            <input onChange={this.handleChange("year")} value={this.state.year} id="movie-year-input" />
          </label>
          <label htmlFor="duration" id="movie-duration">
            Duration:
            <input onChange={this.handleChange("duration")} value={this.state.duration} id="movie-duration-input" />
          </label>
          <button id="movie-button">Create movie</button>
        </form>
      </div>
    );
  }

  handleChange(key) {
    return function(event) {
      let state = {};
      state[key] = event.target.value;
      this.setState(state);
    }.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    let newMovie = new Movie(this.state.title, this.state.year, this.state.duration);
    this.setState((prevState) => ({
      title: '',
      year: '',
      duration: ''
    }));
    console.log("New movie created: " + newMovie.getData());
  }
}

ReactDOM.render(<MovieCreate />, document.getElementById('app'));
