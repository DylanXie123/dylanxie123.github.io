import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect } from 'react';
import { movieModel, MovieModelContext } from './model/movie_model';

function App() {
  
  useEffect(() => {movieModel.update()});

  return (
    <MovieModelContext.Provider value={movieModel}>
      <Board/>
    </MovieModelContext.Provider>
  );
}

const Board = observer(() => {
  const movieModel = useContext(MovieModelContext);
  return (
    <ul>
      {movieModel.movies.map((movie) => (<li>{movie.title}</li>))}
    </ul>
  );
})

export default App;
