import React, { lazy, Suspense } from "react";
import { NavLink, Route, Switch } from "react-router-dom";
import makeStyles from "@material-ui/core/styles/makeStyles";
import createStyles from "@material-ui/core/styles/createStyles";

const Home = lazy(() => import('./home'));
const MovieApp = lazy(() => import('./movie'));
const Calculator = lazy(() => import('./calculator'));
const AirBoxApp = lazy(() => import('./airbox'));

export default function App() {
  return (
    <>
      <Header />
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/calc" component={Calculator} />
          <Route path="/movie" component={MovieApp} />
          <Route path="/airbox" component={AirBoxApp} />
        </Switch>
      </Suspense>
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
      <NavLink className={classes.navtab} to='/'>Home</NavLink>
      <NavLink className={classes.navtab} to='/calc'>Calc</NavLink>
      <NavLink className={classes.navtab} to='/movie'>Movie</NavLink>
      <NavLink className={classes.navtab} to='/airbox'>AirBox</NavLink>
    </nav>
  )
}