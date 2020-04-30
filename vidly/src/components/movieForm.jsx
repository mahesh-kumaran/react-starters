import React from "react";

const MovieForm = ({ match }) => {
  return <h2>{match.params.movieId}</h2>;
};

export default MovieForm;
