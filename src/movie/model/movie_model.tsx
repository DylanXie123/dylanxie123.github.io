import { action, computed, observable } from "mobx";
import Airtable from 'airtable';
import React from "react";

export default class MovieModel {
  @observable
  model: Array<Movie> = [];

  @action
  update = () => {
    const base = new Airtable({ apiKey: process.env.REACT_APP_AIRTABLE_KEY, }).base(process.env.REACT_APP_AIRTABLE_BASE as string);

    base('Table 1').select().eachPage((record, fetchNextPage)=>{
      record.forEach((record) => this.model.push({ 
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
    },(error) => {
      console.log('Done');
    });
  }


  @computed get movies(): Array<Movie> {
    return this.model;
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

  douban: number;

  rottenTomatoes: number;

  rating: number;

  title: string;
}

export const movieModel = new MovieModel();
export const MovieModelContext = React.createContext<MovieModel>(movieModel);
