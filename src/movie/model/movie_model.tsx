import { action, computed, makeObservable, observable } from "mobx";
import React from "react";
import LC from 'leanengine';
import CryptoJS from 'crypto-js';

export default class MovieModel {
  @observable
  private model: Array<MoviewithRef> = [];

  @observable
  private updating: boolean = false;

  private liveQuery!: LC.LiveQuery<LC.Queriable>;

  constructor() {
    makeObservable(this);
    if (LC.applicationId === undefined || LC.applicationKey === undefined) {
      LC.init({
        appId: this.decrypt(process.env.REACT_APP_LEAN_MOVIE_ID),
        appKey: this.decrypt(process.env.REACT_APP_LEAN_MOVIE_KEY),
      });
    }
  }

  private decrypt = (cipher: string | undefined) => {
    const key = localStorage.getItem('private key');
    if (!key || key.length === 0 || !cipher || cipher.length === 0) {
      throw Error(`decrypt ${cipher} failed`);
    } else {
      return CryptoJS.AES.decrypt(cipher, key).toString(CryptoJS.enc.Utf8)
    }
  }

  subscribe = (init = true) => {
    const query = new LC.Query('Movie');
    if (init) {
      query.find().then(movies => {
        this.model = movies.map(movie => this.db2model(movie))
      });
    }
    query.subscribe().then(liveQuery => {
      this.liveQuery = liveQuery;
      liveQuery.on('create', (newItem) => {
        if (newItem !== undefined) {
          const movie = this.db2model(newItem);
          this.updating = false;
          this.model.push(movie);
        }
      });
      liveQuery.on('update', (item) => {
        if (item !== undefined) {
          const movieItem = this.db2model(item);
          const index = this.model.indexOf(movieItem);
          if (index > -1) {
            this.model[index] = movieItem;
          }
        }
      })
      liveQuery.on('delete', (item) => {
        if (item !== undefined) {
          const index = this.model.indexOf(this.db2model(item));
          if (index > -1) {
            this.model.splice(index, 1);
          }
        }
      });
    });
  }

  unSubscribe = () => {
    this.liveQuery?.unsubscribe();
  }

  private db2model(record: LC.Queriable): MoviewithRef {
    return {
      id: record.get('id') as string,
      poster: record.get('poster') as string,
      year: record.get('year') as number,
      released: record.get('released') as string,
      runtime: record.get('runtime') as number,
      genre: record.get('genre') as string,
      director: record.get('director') as string,
      writer: record.get('writer') as string,
      actors: record.get('actors') as string,
      plot: record.get('plot') as string,
      language: record.get('language') as string,
      country: record.get('country') as string,
      awards: record.get('awards') as string,
      imdb: record.get('imdbd') as number,
      douban: record.get('douban') as number,
      rottenTomatoes: record.get('rottenTomatoes') as number,
      rating: record.get('rating') as number,
      title: record.get('title') as string,
      ref: record.get('objectId') as string,
    };
  }

  @action
  create = async (movie: Movie) => {
    this.updating = true;
    const MovieDB = LC.Object.extend('Movie');
    const movieDB = new MovieDB();
    movieDB.set('id', movie.id);
    movieDB.set('poster', movie.poster);
    movieDB.set('year', movie.year);
    movieDB.set('released', movie.released);
    movieDB.set('runtime', movie.runtime);
    movieDB.set('genre', movie.genre);
    movieDB.set('director', movie.director);
    movieDB.set('writer', movie.writer);
    movieDB.set('actors', movie.actors);
    movieDB.set('plot', movie.plot);
    movieDB.set('language', movie.language);
    movieDB.set('country', movie.country);
    movieDB.set('awards', movie.awards);
    movieDB.set('imdb', movie.imdb);
    movieDB.set('douban', movie.douban);
    movieDB.set('rottenTomatoes', movie.rottenTomatoes);
    movieDB.set('rating', movie.rating);
    movieDB.set('title', movie.title);
    return movieDB.save();
  }

  @action
  delete = (id: string) => {
    this.updating = true;
    const movieDB = LC.Object.createWithoutData('Movie', id);
    movieDB.destroy();
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

interface MoviewithRef extends Movie {
  ref: string;
}

const movieModel = new MovieModel();
export const MovieModelContext = React.createContext<MovieModel>(movieModel);
