import MovieAPI from './movie_api';

describe('OMDB API Test', () => {

  test('Find API', async () => {
    let movie = await MovieAPI.find('tt3896198');
    expect(movie.id).toBe('tt3896198');
    expect(movie.poster).toBe('https://m.media-amazon.com/images/M/MV5BNjM0NTc0NzItM2FlYS00YzEwLWE0YmUtNTA2ZWIzODc2OTgxXkEyXkFqcGdeQXVyNTgwNzIyNzg@._V1_SX300.jpg');
    expect(movie.year).toBe(2017);
    expect(movie.released).toBe('05 May 2017');
    expect(movie.runtime).toBe(136);
    expect(movie.genre).toBe('Action, Adventure, Comedy, Sci-Fi');
    expect(movie.director).toBe('James Gunn');
    expect(movie.writer).toContain('James Gunn');
    expect(movie.actors).toBe('Chris Pratt, Zoe Saldana, Dave Bautista, Vin Diesel');
    expect(movie.plot).toContain('The Guardians struggle to keep together as a team while');
    expect(movie.language).toBe('English');
    expect(movie.country).toBe('USA');
    expect(movie.awards).toBe('Nominated for 1 Oscar. Another 15 wins & 57 nominations.');
    expect(movie.imdb).toBe(7.6);
    expect(movie.rottenTomatoes).toBe(0.85);
    expect(movie.title).toBe('Guardians of the Galaxy Vol. 2');
  });

  test('Search API', async () => {
    let search = await MovieAPI.search('harry');
    expect(search).toBeInstanceOf(Array);
    expect(search[0].poster).toContain('http');
  })

  test('searchFullMovie API', async () => {
    jest.setTimeout(100);
    let search = await MovieAPI.searchFullMovie('harry');
    expect(search).toBeInstanceOf(Array);
    expect(search[0].language).toBe('English');
  })

})