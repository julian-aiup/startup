import React from 'react';
import ReactDOM from 'react-dom';
import {Movie} from './js/movie.js';
import {MovieList} from './js/movieList.js';
import {MovieCreate} from './js/movieCreate.js';

class MovieApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: JSON.parse(localStorage["movies"] || "[]")
    };
    this.handleUserInput = this.handleUserInput.bind(this);
  }

  handleUserInput(movie) {
    let movies = this.state.movies.concat(movie);
    this.setState({
      movies: movies
    });
    localStorage.setItem("movies", JSON.stringify(movies));
  }

  render() {
    return (
      <div>
        <MovieCreate onUserInput={this.handleUserInput} />
        <MovieList movies={this.state.movies} />
      </div>
    );
  }
}

ReactDOM.render(<MovieApp />, document.getElementById('app'));
