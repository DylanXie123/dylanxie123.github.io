import Card from "@material-ui/core/Card/Card";
import CardContent from "@material-ui/core/CardContent/CardContent";
import CardMedia from "@material-ui/core/CardMedia/CardMedia";
import createStyles from "@material-ui/core/styles/createStyles";
import makeStyles from "@material-ui/core/styles/makeStyles";
import React from "react";
import { Movie } from "../model/movie_model";

const useStyles = makeStyles(() =>
  createStyles({
    card: {
      width: 160,
      height: 200,
    },
    media: {
      height: 120,
    },
    content: {
      height: 80,
    }
  }),
);

interface MovieCardProp {
  movie: Movie
}

const MovieCard = (prop: MovieCardProp) => {
  const classes = useStyles();

  return (
    <Card className={classes.card} raised={true}>
      <CardMedia
        className={classes.media}
        title={prop.movie.title}
        image={prop.movie.poster}
      />
      <CardContent className={classes.content}>
        {prop.movie.title}
      </CardContent>
    </Card>
  );
}

export default MovieCard