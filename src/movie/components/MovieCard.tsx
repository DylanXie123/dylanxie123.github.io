import React from "react";
import { Movie } from "../model/movie_model";

interface MovieCardProp {
  movie: Movie
}

const MovieCard = (prop: MovieCardProp) => {
  return (
    <div style={{ border: '1px solid' }}>
      <img
        src={prop.movie.poster}
        alt={prop.movie.title}
      />
      <p> {prop.movie.title} </p>
    </div>
  );
}

export default MovieCard