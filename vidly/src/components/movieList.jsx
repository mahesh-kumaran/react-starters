import React, { Component } from "react";
import { getMovies, deleteMovie } from "../services/movieService";
import LikeHeart from "./common/like";
import Pagination from "./common/paginate";
import paginate from "../utils/paginate";
import ListGroup from "./common/listGroup";
import { getGenres } from "../services/genreService";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

class MoviesList extends Component {
  state = {
    movies: [],
    genres: [],
    currentPage: 1,
    pageCount: 4,
    selectedGenre: "0",
  };

  async componentDidMount() {
    const { data: moviesList } = await getMovies();
    this.setState({ movies: moviesList });

    const { data: genresList } = await getGenres();
    this.setState({ genres: genresList });
  }

  handleDelete = async (index) => {
    console.log("Handle Delete", index);
    const originalMovies = this.state.movies;
    const updatedList = this.state.movies.filter((m) => m._id !== index);
    this.setState({ movies: updatedList });

    try {
      await deleteMovie(index);
    } catch (error) {
      if (error.response && error.response.status === 404)
        toast.error("No such Movie exists in records!");
      this.setState({ movies: originalMovies });
    }
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

  handleGenreGroup = async (genreId) => {
    const { data: allMovies } = await getMovies();
    const movies = genreId
      ? allMovies.filter((movie) => movie.genre._id === genreId)
      : allMovies;
    this.setState({ movies, currentPage: 1, selectedGenre: genreId });
  };

  handleSearch = async ({ currentTarget: search }) => {
    const { movies } = this.state;

    let movieList = movies.filter((movie) => {
      return movie.title
        .toLocaleLowerCase()
        .includes(search.value.toLocaleLowerCase());
    });

    if (search.value === "") {
      let { data: movieList } = await getMovies();
      this.setState({ movies: movieList });
    } else {
      this.setState({ movies: movieList });
    }
  };

  render() {
    const { length: count } = this.state.movies;

    const { currentPage, pageCount, movies: totalMovies } = this.state;

    const movies = paginate(totalMovies, pageCount, currentPage);

    const genres = [{ name: "All Genres" }, ...this.state.genres];

    if (count === 0) {
      return <h2> There are no movies in the database</h2>;
    }

    return (
      <div>
        <h1> Hey, Welcome to Show Man </h1>

        <h4>Available number of movies in our collection : {count}</h4>

        <div className="row">
          <div className="col-3">
            <ListGroup
              genres={genres}
              onGroupList={this.handleGenreGroup}
              selectedItem={this.state.selectedGenre}
            />
          </div>
          <div className="col-9">
            <Link to={{ pathname: "/movies/new", props: { ...this.state } }}>
              <button className="btn btn-primary" style={{ margin: 20 }}>
                {" "}
                New Movie
              </button>
            </Link>
            <form>
              <div className="form-group">
                <input
                  type="text"
                  placeholder="Search..."
                  className="form-control"
                  onChange={this.handleSearch}
                />
              </div>
            </form>

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
                      <td>
                        <Link to={`/movies/${movie._id}`}>{movie.title}</Link>
                      </td>
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
                            this.handleDelete(movie._id);
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
        </div>
      </div>
    );
  }
}

export default MoviesList;
