import React, { useEffect } from 'react';
import { movieModel, MovieModelContext } from './model/movie_model';
import UpdatingIndicator from './components/UpdatingIndicator'
import MovieBoard from './components/MovieBoard'

function MovieApp() {

  useEffect(() => {
    return () => {
      movieModel.unSubscribe();
    };
  })

  return (
    <MovieModelContext.Provider value={movieModel}>
      <MovieBoard />
      <UpdatingIndicator />
    </MovieModelContext.Provider>
  );
}

export default MovieApp;
