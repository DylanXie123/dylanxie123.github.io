import { Movie } from "./movie_model";

const MovieAPI = {
  find: async (id: string): Promise<Movie> => {
    let response = await fetch(`http://www.omdbapi.com/?i=${id}&apikey=${process.env.REACT_APP_OMDb_API}`)
    let data = await response.json();
    return {
      id: data.imdbID as string,
      poster: data.Poster as string,
      year: parseInt(data.Year) as number,
      released: data.Released as string,
      runtime: parseInt(data.Runtime) as number,
      genre: data.Genre as string,
      director: data.Director as string,
      writer: data.Writer as string,
      actors: data.Actors as string,
      plot: data.Plot as string,
      language: data.Language as string,
      country: data.Country as string,
      awards: data.Awards as string,
      imdb: parseFloat(data.imdbRating) as number,
      rottenTomatoes: parseInt(data.Ratings[1].Value)/100 as number,
      title: data.Title as string,
    }
  },
  search: async (title: string): Promise<Array<SearchedMovie>> => {
    let response = await fetch(`http://www.omdbapi.com/?s=${title}&apikey=${process.env.REACT_APP_OMDb_API}`)
    let data = await response.json();
    return (data.Search as Array<any>).map((d) => ({
      title: d.Title as string,
      year: d.Year as number,
      id: d.imdbID as string,
      poster: d.Poster as string,
    }));
  },
  searchFullMovie: async (title: string): Promise<Array<Movie>> => {
    let items = await MovieAPI.search(title);
    let movies: Array<Movie> = [];
    for (const item of items) {
      movies.push(await MovieAPI.find(item.id));
    }
    return movies;
  }
}

export interface SearchedMovie {
  title: string,
  year: number,
  id: string,
  poster: string,
}

export default MovieAPI;