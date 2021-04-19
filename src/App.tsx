import React from "react";
import { Route, Switch } from "react-router-dom";
import Calculator from "./calculator";
import Home from "./home";
import Movie from "./movie";
import makeStyles from "@material-ui/core/styles/makeStyles";
import createStyles from "@material-ui/core/styles/createStyles";

export default function App() {
  return (
    <>
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/calc" component={Calculator} />
        <Route path="/movie" component={Movie} />
      </Switch>
    </>
  );
}

const useStyles = makeStyles(() =>
  createStyles({
    header: {
      backgroundColor: '#1b1c1d',
      padding: 8,
    },
    navtab: {
      color: 'white',
      fontSize: 20,
      textDecoration: 'none',
      padding: 8,
    },
  }),
);

function Header() {
  const classes = useStyles();
  return (
    <nav className={classes.header}>
      <a className={classes.navtab} href='/'>Home</a>
      <a className={classes.navtab} href='/calc'>Calc</a>
      <a className={classes.navtab} href='/movie'>Movie</a>
    </nav>
  )
}