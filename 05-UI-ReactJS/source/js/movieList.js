import React from 'react';
import ReactDOM from 'react-dom';

class MovieList extends React.Component {
  render() {
    if(!this.props.movies.length) {
      return (<h3 className="no-movies">No movies to show</h3>);
    } else {
      return (
        <table className="movies-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Year</th>
              <th>Duration</th>
            </tr>
          </thead>
          <tbody>
            {this.props.movies.map(movie => (
              <tr key={movie.id}>
                <th>{movie.title}</th>
                <th>{movie.year}</th>
                <th>{movie.duration}</th>
              </tr>
            ))}
          </tbody>
        </table>
      );
    }
  }
}

export {MovieList}
