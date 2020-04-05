import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import LikeHeart from "./common/like";
import Pagination from "./common/paginate";
import paginate from "../utils/paginate";

class MoviesList extends Component {
  state = {
    movies: getMovies(),
    currentPage: 1,
    pageCount: 4,
  };

  handler = (index) => {
    let updatedList = this.state.movies.filter((movie) => {
      return movie._id !== index;
    });
    this.setState({ movies: updatedList });
  };

  handleLike = (movie) => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };

  handlePageChange = (pageNo) => {
    this.setState({ currentPage: pageNo });
  };

  render() {
    const { length: count } = this.state.movies;

    const { currentPage, pageCount, movies: totalMovies } = this.state;

    const movies = paginate(totalMovies, pageCount, currentPage);

    console.log(movies);

    if (count === 0) {
      return <h2> There are no movies in the database</h2>;
    }

    return (
      <div>
        <h1> Hey, Welcome to Show Man </h1>
        <h4>Available number of movies in our collection : {count}</h4>
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
            {movies.map((movie) => {
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
        <Pagination
          itemsCount={count}
          pageCount={pageCount}
          currentPage={currentPage}
          onPageChange={this.handlePageChange}
        />
      </div>
    );
  }
}

export default MoviesList;
