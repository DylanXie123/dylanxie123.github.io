import { action, computed, observable } from "mobx";
import Airtable from 'airtable';
import React from "react";
import Record from "airtable/lib/record";

export default class MovieModel {
  @observable
  private model: Array<MovieDB> = [];

  @observable
  private updating: boolean = false;

  private base = new Airtable({ apiKey: process.env.REACT_APP_AIRTABLE_KEY }).base(process.env.REACT_APP_AIRTABLE_BASE as string);

  private timeoutID!: NodeJS.Timeout;

  private startTimer() {
    this.timeoutID = setTimeout(() => {
      this.fetchDB();
      this.startTimer();
      console.log('hello');
    }, 500);
  }

  clearTimer() {
    clearTimeout(this.timeoutID);
  }

  constructor() {
    this.startTimer();
  }

  private db2model(record: Record): MovieDB {
    return {
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
      ref: record.getId(),
    };
  }

  private model2db(movie: Movie) {
    return {
      "ID": movie.id,
      "Poster": movie.poster,
      "Year": movie.year,
      "Released": movie.released,
      "Runtime": movie.runtime,
      "Genre": movie.genre,
      "Director": movie.director,
      "Writer": movie.writer,
      "Actors": movie.actors,
      "Plot": movie.plot,
      "Language": movie.language,
      "Country": movie.country,
      "Awards": movie.awards,
      "IMDB": movie.imdb,
      "Douban": movie.douban,
      "Rotten Tomatoes": movie.rottenTomatoes,
      "Rating": movie.rating,
      "Title": movie.title,
    }
  };

  @action
  fetchDB = () => {
    let dbMovies: Array<MovieDB> = [];
    this.base('Table 1').select().eachPage((records, fetchNextPage) => {
      records.forEach(r => dbMovies.push(this.db2model(r)));
      fetchNextPage();
    }, () => {
      this.model = dbMovies;
      this.updating = false;
    });
  }

  @action
  create = (movies: Array<Movie>) => {
    this.updating = true;
    this.base('Table 1').create(
      movies.map(movie => ({ "fields": this.model2db(movie) })),
      (err: any, records: Record[]) => {
        if (err) {
          console.log(err);
          return;
        }
      })
  }

  @action
  delete = (id: string) => {
    this.updating = true;
    this.base('Table 1').destroy(id);
  }

  @computed get movies() {
    return this.model;
  }

  @computed get isUpdating() {
    return this.updating;
  }

}

export interface Movie {
  id: string;

  poster: string;

  year: number;

  released: string;

  runtime: number;

  genre: string;

  director: string;

  writer: string;

  actors: string;

  plot: string;

  language: string;

  country: string;

  awards: string;

  imdb: number;

  douban?: number;

  rottenTomatoes: number;

  rating?: number;

  title: string;
}

interface MovieDB extends Movie {
  ref: string;
}

export const movieModel = new MovieModel();
export const MovieModelContext = React.createContext<MovieModel>(movieModel);
