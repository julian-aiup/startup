import React from "react";
import { Link } from "react-router";

export default class MovieList extends React.Component {
  constructor(props) {
    super(props);
    this.renderList = this.renderList.bind(this);
    this.renderEmptyBlock = this.renderEmptyBlock.bind(this);
  }

  render() {
    return (this.props.movies.length) ? this.renderList() : this.renderEmptyBlock();
  }

  renderList() {
    return (
      <div className="movies-table">
        <h3>Movie List</h3>
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

  renderEmptyBlock() {
    return (
      <div className="movies-table">
        <h3>Movie List</h3>
        <h3 className="no-movies">No movies to show</h3>
      </div>
    );
  }
}

MovieList.propTypes = {
  movies: React.PropTypes.array.isRequired,
  onDelete: React.PropTypes.func.isRequired
};
