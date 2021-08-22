import React, { lazy, Suspense } from "react";
import { NavLink, Redirect, Route, Switch, useLocation } from "react-router-dom";
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
          <Route exact path="/" render={() => <Home />} />
          <Route path="/login" render={() => <Login />} />
          <Route path="/calc" render={() => <Calculator />} />
          <RedirectRoute path="/movie" defaultComponent={MovieApp} />
          <RedirectRoute path="/airbox" defaultComponent={AirBoxApp} />
        </Switch>
      </Suspense>
    </>
  );
}

function Header() {
  const linkStyle: React.CSSProperties = {
    color: 'white',
    fontSize: 20,
    textDecoration: 'none',
    padding: 8,
  };
  return (
    <nav style={{ backgroundColor: '#1b1c1d', padding: 8 }}>
      <NavLink style={linkStyle} to='/'>Home</NavLink>
      <NavLink style={linkStyle} to='/calc'>Calc</NavLink>
      <NavLink style={linkStyle} to='/movie'>Movie</NavLink>
      <NavLink style={linkStyle} to='/airbox'>AirBox</NavLink>
    </nav>
  )
}

interface RedirectRouteProp {
  defaultComponent: React.ComponentType
}

const RedirectRoute = (props: React.ComponentProps<typeof Route> & RedirectRouteProp) => {
  const location = useLocation();

  return (
    <Route
      {...props}
      path={props.path}
      render={() => {
        return haveKey() ? <props.defaultComponent /> :
          <Redirect to={{ pathname: "/login", state: location.pathname }} />
      }}
    />
  );
}
