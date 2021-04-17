import Airtable from 'airtable';
import { Movie } from './movie_model';

describe('Airtable CURD Test', () => {
  let base = new Airtable({ apiKey: process.env.REACT_APP_AIRTABLE_KEY }).base(process.env.REACT_APP_AIRTABLE_BASE!);

  test('Create', () => { });
  test('Update', () => { });

  test('Retrieve', async () => {
    let dbMovies: Array<Movie> = [];
    await base('Table 1').select().eachPage((record, fetchNextPage) => {
      record.forEach((record) => dbMovies.push({
        id: record.get('ID') as string,
        poster: record.get('Poster') as string,
        year: record.get('Year') as number,
        released: record.get('Released') as string,
        runtime: record.get('Runtime') as number,
        genre: record.get('Genre') as string,
        director: record.get('Director') as string,
        writer: record.get('Writer') as string,
        actors: record.get('Actors') as string,
        plot: record.get('Plot') as string,
        language: record.get('Language') as string,
        country: record.get('Country') as string,
        awards: record.get('Awards') as string,
        imdb: record.get('IMDB') as number,
        douban: record.get('Douban') as number,
        rottenTomatoes: record.get('Rotten Tomatoes') as number,
        rating: record.get('Rating') as number,
        title: record.get('Title') as string,
      }));
      fetchNextPage();
    });
    dbMovies.every(movie => expect(movie.poster).toContain('http'))
  });

  test('Delete', async () => {
    // await base('Table 1').destroy('recDL1W7r5AppYel7');
  });

})