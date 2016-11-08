import React, { PropTypes } from "react";
import { Link } from "react-router";

export default class MovieList extends React.Component {
  render() {
    if(!this.props.movies.length) {
      return (
        <div className="movies-table">
          <h3 className="no-movies">No movies to show</h3>
        </div>
      );
    } else {
      return (
        <div className="movies-table">
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Year</th>
                <th>Duration</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {this.props.movies.map((movie) => {
                return(
                  <tr key={movie.id}>
                    <th>{movie.title}</th>
                    <th>{movie.year}</th>
                    <th>{movie.duration}</th>
                    <th><Link to={`/movie/${movie.id}`}>Edit</Link></th>
                    <th><button onClick={this.props.onDelete.bind(null, movie.id)}>Delete</button></th>
                  </tr>
              )})}
            </tbody>
          </table>
        </div>
      );
    }
  }
}

MovieList.propTypes = {
  movies: PropTypes.array.isRequired,
  onDelete: PropTypes.func.isRequired
};
