import React from "react";
import { Link, Route, Switch } from "react-router-dom";
import Calculator from "./calculator";
import Home from "./home";
import Movie from "./movie";

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

function Header() {
  return (
    <nav>
      <Link to='/'>Home</Link>
      <Link to='/calc'>Calc</Link>
      <Link to='/movie'>Movie</Link>
    </nav>
  )
}