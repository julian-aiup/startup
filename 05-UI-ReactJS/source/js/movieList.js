import React from 'react';

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
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {this.props.movies.map(movie => (
              <tr key={movie.id}>
                <th>{movie.title}</th>
                <th>{movie.year}</th>
                <th>{movie.duration}</th>
                <th><button onClick={() => { this.props.onEdit(movie) }}>Edit</button></th>
                <th><button onClick={() => { this.props.onDelete(movie) }}>Delete</button></th>
              </tr>
            ))}
          </tbody>
        </table>
      );
    }
  }
}

export {MovieList}
