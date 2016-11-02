import React from "react";
import ReactDOM from "react-dom";
import {Movie} from "./js/movie.js";
import {MovieList} from "./js/movieList.js";
import {MovieForm} from "./js/movieForm.js";

class MovieApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: JSON.parse(localStorage["movies"] || "[]"),
      selectedMovie: new Movie()
    };
    this.handleUserInput = this.handleUserInput.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.storeMovies = this.storeMovies.bind(this);
  }

  render() {
    return (
      <div>
        <MovieForm
          onUserInput={this.handleUserInput}
          selectedMovie={this.state.selectedMovie}
          onReset={this.handleReset}
        />
        <MovieList
          movies={this.state.movies}
          onEdit={this.handleEdit}
          onDelete={this.handleDelete}
        />
      </div>
    );
  }

  handleUserInput(movie) {
    let movies = this.state.movies;
    let editMovie;
    if(!movie.id) {
      // Create movie
      movie["id"] = Date.now();
      movies = movies.concat(movie);
    } else {
      // Edit movie
      editMovie = movies.find(function(arrayMovie) {
        return arrayMovie.id === movie.id;
      });
      Object.assign(editMovie, movie);
      this.handleReset();
    }
    this.setState({
        movies: movies
      },
        this.storeMovies
    );
  }

  handleEdit(movie) {
    this.setState({
      selectedMovie: movie
    });
  }

  handleDelete(movie) {
    let filteredMovies = this.state.movies.filter(function(arrayMovie) {
      if (arrayMovie !== movie) {
        return arrayMovie;
      }
    });
    this.setState({
        movies: filteredMovies
      },
        this.storeMovies
    );
  }

  handleReset() {
    this.setState({
      selectedMovie: new Movie()
    });
  }

  storeMovies() {
    localStorage.setItem("movies", JSON.stringify(this.state.movies));
  }
}

ReactDOM.render(<MovieApp />, document.getElementById("app"));
