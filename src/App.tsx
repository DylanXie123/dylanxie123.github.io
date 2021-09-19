import React, { Suspense } from "react";
import { NavLink, Redirect, Route, Switch, useLocation } from "react-router-dom";
import { haveKey } from "./login/auth";
import Home from './home';
import Calculator from './calculator';
import Movie from './movie';
import AirBox from './airbox';
import Login from './login';
import { css } from "@emotion/css";

export default function App() {
  return (
    <>
      <Header />
      <div style={{ flex: '1 auto' }}>
        <Suspense fallback={<div>Loading...</div>}>
          <Switch>
            <Route exact path="/" render={() => <Home />} />
            <Route path="/login" render={() => <Login />} />
            <Route path="/calc" render={() => <Calculator />} />
            <RedirectRoute path="/movie" defaultComponent={Movie} />
            <RedirectRoute path="/airbox" defaultComponent={AirBox} />
          </Switch>
        </Suspense>
      </div>
    </>
  );
}

function Header() {
  const linkStyle = css`
    color: white;
    font-size: 20px;
    padding-inline: 8px;
    text-decoration: transparent underline 3px;
    transition: all ease-in-out 200ms;
    &:hover {
      background-color: white;
      color: black;
    };
  `;
  return (
    <nav style={{ backgroundColor: '#1b1c1d', padding: '8px' }}>
      <NavLink className={linkStyle} to='/'>Home</NavLink>
      <NavLink className={linkStyle} to='/calc'>Calc</NavLink>
      <NavLink className={linkStyle} to='/movie'>Movie</NavLink>
      <NavLink className={linkStyle} to='/airbox'>AirBox</NavLink>
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
