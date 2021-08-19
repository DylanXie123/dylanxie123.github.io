import React, { lazy, Suspense } from "react";
import { NavLink, Redirect, Route, Switch, useLocation } from "react-router-dom";
import makeStyles from "@material-ui/core/styles/makeStyles";
import createStyles from "@material-ui/core/styles/createStyles";
import { haveKey } from "./login/auth";

const Home = lazy(() => import('./home'));
const MovieApp = lazy(() => import('./movie'));
const Calculator = lazy(() => import('./calculator'));
const AirBoxApp = lazy(() => import('./airbox'));
const Login = lazy(() => import('./login'));

export default function App() {
  return (
    <>
      <Header />
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/calc" component={Calculator} />
          <PrivateRoute path="/movie" component={MovieApp} />
          <PrivateRoute path="/airbox" component={AirBoxApp} />
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

interface PrivateRouteProp {
  path: string,
  component: React.ComponentType,
}

function PrivateRoute(props: PrivateRouteProp) {
  const location = useLocation();
  if (haveKey()) {
    return (<Route path={props.path} component={props.component} />);
  } else {
    return (<Route path={props.path} render={() => <Redirect to={{ pathname: "/login", state: location.pathname }} />} />);
  }
}
