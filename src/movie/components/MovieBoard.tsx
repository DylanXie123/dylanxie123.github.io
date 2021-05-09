import React, { useContext } from 'react';
import { MovieModelContext } from '../model/movie_model';
import { observer } from 'mobx-react-lite';
import MovieCard from './MovieCard';
import GridList from '@material-ui/core/GridList/GridList';
import makeStyles from '@material-ui/core/styles/makeStyles';
import createStyles from '@material-ui/core/styles/createStyles';
import { GridListTile } from '@material-ui/core';

const useStyles = makeStyles(() =>
  createStyles({
    grid: {
      padding: 10,
    },
  }),
);

const MovieBoard = observer(() => {
  const movieModel = useContext(MovieModelContext);
  const classes = useStyles();

  return (
    <GridList className={classes.grid} spacing={10} cols={4}>
      {movieModel.movies.map(
        movie => (
          <GridListTile>
            <MovieCard movie={movie} />
          </GridListTile>
        )
      )}
    </GridList>
  );
})

export default MovieBoard