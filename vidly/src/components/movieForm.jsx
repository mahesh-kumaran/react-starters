import React, { Component } from "react";
import { getGenres } from "../services/genreService";
import { saveMovie, getMovie } from "../services/movieService";

class MovieForm extends Component {
  state = {
    data: {
      _id: "",
      title: "",
      genre: { _id: "", name: "" },
      numberInStock: "",
      dailyRentalRate: "",
    },
    genres: [],
  };

  handleSave = (e) => {
    e.preventDefault();

    saveMovie(this.state.data);
    this.props.history.push("/movies");
  };

  maptoViewModal(movie) {
    let data = { ...this.state.data };
    data._id = movie._id;
    data.title = movie.title;
    data.genre._id = movie.genre._id;
    data.genre.name = movie.genre.name;
    data.numberInStock = movie.numberInStock;
    data.dailyRentalRate = movie.dailyRentalRate;
    return data;
  }

  handleInputChange = ({ currentTarget: input }) => {
    const data = { ...this.state.data };
    data[input.name] = input.value;
    this.setState({ data });
  };

  handleSelect = ({ currentTarget: select }) => {
    const data = { ...this.state.data };
    const genre = this.state.genres.find((m) => m._id === select.value);
    data[select.name] = { ...genre };
    this.setState({ data });
  };

  async componentDidMount() {
    const { data: genres } = await getGenres();
    this.setState({ genres });

    const movieId = this.props.match.params.movieId;
    if (movieId === "new") return;

    const { data: movie } = await getMovie(movieId);

    if (!movie) return this.props.history.replace("/not-found");

    this.setState({ data: this.maptoViewModal(movie) });
  }

  render() {
    return (
      <div style={{ margin: 40 }}>
        <h2>Movie Form</h2>
        <form onSubmit={this.handleSave}>
          <div className="form-group">
            <label>Movie Name</label>
            <input
              type="text"
              className="form-control"
              name="title"
              value={this.state.data.title}
              onChange={this.handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="formGroupExampleInput2">Genre</label>
            <select
              className="custom-select mr-sm-2"
              name="genre"
              onChange={this.handleSelect}
            >
              <option value={this.state.data.genre._id}>
                {this.state.data.genre.name}
              </option>
              {this.state.genres.map((genre) => {
                return (
                  <option value={genre._id} key={genre._id}>
                    {genre.name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="form-group">
            <label>Number in Stock</label>
            <input
              type="text"
              className="form-control"
              name="numberInStock"
              value={this.state.data.numberInStock}
              onChange={this.handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Rate</label>
            <input
              type="text"
              className="form-control"
              name="dailyRentalRate"
              value={this.state.data.dailyRentalRate}
              onChange={this.handleInputChange}
            />
          </div>

          <button className="btn btn-primary">Save</button>
        </form>
      </div>
    );
  }
}

export default MovieForm;
