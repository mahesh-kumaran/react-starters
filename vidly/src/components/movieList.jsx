import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import LikeHeart from "./like";

class MoviesList extends Component {
  state = {
    movies: getMovies()
  };

  handler = index => {
    let updatedList = this.state.movies.filter(movie => {
      return movie._id !== index;
    });
    this.setState({ movies: updatedList });
  };

  handleLike = movie => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };

  render() {
    console.log("Props", this.props);

    let { length: count } = this.state.movies;
    if (count === 0) {
      return <h2> There are no movies in the database</h2>;
    }

    return (
      <div>
        <h1> Hey, Welcome to Show Man </h1>
        <h4>
          Available number of movies in our collection :{" "}
          {this.state.movies.length}
        </h4>
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Genre</th>
              <th>Stock</th>
              <th>RentalRate</th>
            </tr>
          </thead>
          <tbody>
            {this.state.movies.map(movie => {
              return (
                <tr key={movie._id}>
                  <td>{movie.title}</td>
                  <td>{movie.genre.name}</td>
                  <td>{movie.numberInStock}</td>
                  <td>{movie.dailyRentalRate}</td>
                  <td>
                    <LikeHeart
                      movie={movie}
                      onLikeToggle={() => {
                        this.handleLike(movie);
                      }}
                    />
                  </td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => {
                        this.handler(movie._id);
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default MoviesList;
