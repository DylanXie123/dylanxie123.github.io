import Airtable from 'airtable';
import React from 'react';

const base = new Airtable({apiKey: process.env.REACT_APP_AIRTABLE_KEY}).base(process.env.REACT_APP_AIRTABLE_BASE as string);

base('Table 1').create([
  {
    "fields": {
      "ID": "tt3896198",
      "Poster": "https://m.media-amazon.com/images/M/MV5BNjM0NTc0NzItM2FlYS00YzEwLWE0YmUtNTA2ZWIzODc2OTgxXkEyXkFqcGdeQXVyNTgwNzIyNzg@._V1_SX300.jpg",
      "Year": 2017,
      "Released": "2017-05-05",
      "Runtime": 8160,
      "Genre": "Action, Adventure, Comedy, Sci-Fi",
      "Director": "James Gunn",
      "Writer": "James Gunn, Dan Abnett (based on the Marvel comics by), Andy Lanning (based on the Marvel comics by), Steve Englehart (Star-Lord created by), Steve Ga...",
      "Actors": "Chris Pratt, Zoe Saldana, Dave Bautista, Vin Diesel",
      "Plot": "The Guardians struggle to keep together as a team while dealing with their personal family issues, notably Star-Lord's encounter with his father the a...",
      "Language": "English",
      "Country": "USA",
      "Awards": "Nominated for 1 Oscar. Another 15 wins & 57 nominations.",
      "IMDB": 7.6,
      "Rotten Tomatoes": 0.85,
      "Rating": 3,
      "Title": "Guardians of the Galaxy Vol. 2"
    }
  },
]);


function App() {
  return (
    <div>
    </div>
  );
}

export default App;
