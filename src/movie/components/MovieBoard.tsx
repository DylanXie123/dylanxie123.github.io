import React, { useContext } from 'react';
import { MovieModelContext } from '../model/movie_model';
import { observer } from 'mobx-react-lite';
import MovieCard from './MovieCard';

const MovieBoard = observer(() => {
  const movieModel = useContext(MovieModelContext);

  return (
    <div style={{ display: 'grid', gridTemplateColumns: `repeat(5, 1fr)`, gap: 20, padding: 10 }}>
      {movieModel.movies.map(
        movie => <MovieCard movie={movie} key={movie.id} />
      )}
    </div>
  );
})

export default MovieBoard