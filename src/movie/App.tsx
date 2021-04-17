import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect } from 'react';
import MovieAPI from './model/movie_api';
import { movieModel, MovieModelContext } from './model/movie_model';

function App() {

  useEffect(() => { movieModel.fetchDB() });

  return (
    <MovieModelContext.Provider value={movieModel}>
      <Board />
      <UpdatingIndicator />
      <button onClick={() => {
        MovieAPI.find('tt3896198')
          .then(v => console.log(v))
      }}>Fetch</button>
      <button onClick={() => {
        movieModel.clearTimer()
      }}>Stop</button>
      <button onClick={async () => {
        let movies = await MovieAPI.searchFullMovie('harry');
        movieModel.create([movies[1]]);
      }}>Searh&Add</button>
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

const UpdatingIndicator = observer(() => {
  const movieModel = useContext(MovieModelContext);
  if (movieModel.isUpdating) {
    return <p>Updating...</p>
  } else {
    return null;
  }
})

export default App;
